import cv2
import numpy as np
import os
import subprocess

INPUT = r"c:\Users\LENOVO\OneDrive - Transvolt Mobility Private Limited\2 - Project 2\1 - Antigravity All Project\3 - Transvolt Website Re-Design - 2027\Transvolt Website V2\Website Assets\home_Page2-BG-Video.mp4"
STABILIZED_RAW = r"c:\Users\LENOVO\OneDrive - Transvolt Mobility Private Limited\2 - Project 2\1 - Antigravity All Project\3 - Transvolt Website Re-Design - 2027\Transvolt Website V2\scratch\smooth_stabilized.mp4"
SEAMLESS_OUT = r"c:\Users\LENOVO\OneDrive - Transvolt Mobility Private Limited\2 - Project 2\1 - Antigravity All Project\3 - Transvolt Website Re-Design - 2027\Transvolt Website V2\public\home_page2_bg_video.mp4"
DIST_OUT = r"c:\Users\LENOVO\OneDrive - Transvolt Mobility Private Limited\2 - Project 2\1 - Antigravity All Project\3 - Transvolt Website Re-Design - 2027\Transvolt Website V2\dist\home_page2_bg_video.mp4"
FFMPEG = r"C:\Users\LENOVO\AppData\Local\Programs\Python\Python311\Lib\site-packages\imageio_ffmpeg\binaries\ffmpeg-win64-v4.2.2.exe"

cap = cv2.VideoCapture(INPUT)
fps = cap.get(cv2.CAP_PROP_FPS) or 24.0
w = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
h = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

start_frame = int(2.50 * fps) # 60
end_frame = 239 # 10.00s
N = end_frame - start_frame # 179 frames

print(f"Total frames to process: {N}, start: {start_frame}, end: {end_frame}")

# Measure exact endpoints using multiple high-confidence points on stationary background
cap.set(cv2.CAP_PROP_POS_FRAMES, start_frame)
_, f_start = cap.read()
cap.set(cv2.CAP_PROP_POS_FRAMES, end_frame)
_, f_end = cap.read()

orb = cv2.ORB_create(5000)
kp1, des1 = orb.detectAndCompute(cv2.cvtColor(f_start, cv2.COLOR_BGR2GRAY), None)
kp2, des2 = orb.detectAndCompute(cv2.cvtColor(f_end, cv2.COLOR_BGR2GRAY), None)

matcher = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=False)
matches = matcher.knnMatch(des2, des1, k=2)
good = [m for m, n in matches if m.distance < 0.7 * n.distance]

src = np.float32([kp2[m.queryIdx].pt for m in good]).reshape(-1, 1, 2)
dst = np.float32([kp1[m.trainIdx].pt for m in good]).reshape(-1, 1, 2)

M_end, inliers = cv2.estimateAffinePartial2D(src, dst, method=cv2.RANSAC, ransacReprojThreshold=1.5)
scale_end = np.sqrt(M_end[0, 0]**2 + M_end[0, 1]**2)
angle_end = np.arctan2(M_end[0, 1], M_end[0, 0])
tx_end = M_end[0, 2]
ty_end = M_end[1, 2]

print(f"Measured end-to-start correction: scale={scale_end:.6f}, angle={np.degrees(angle_end):.4f} deg, tx={tx_end:.2f}, ty={ty_end:.2f}")

# Center of image
cx, cy = w / 2.0, h / 2.0

fourcc = cv2.VideoWriter_fourcc(*'mp4v')
out = cv2.VideoWriter(STABILIZED_RAW, fourcc, fps, (w, h))

cap.set(cv2.CAP_PROP_POS_FRAMES, start_frame)

for i in range(N):
    ret, frame = cap.read()
    if not ret:
        break
    
    # Perfectly smooth linear progression: ZERO vibration, ZERO frame jitter
    t = i / float(N - 1)
    
    # Interpolated counter-transform values
    s = 1.0 + t * (scale_end - 1.0)
    theta = t * angle_end
    
    # Rotation + scale around center
    alpha = s * np.cos(theta)
    beta = s * np.sin(theta)
    
    # Combined translation: shift center, rotate/scale, shift back + smooth linear translation
    tx = (1.0 - alpha) * cx - beta * cy + t * tx_end
    ty = beta * cx + (1.0 - alpha) * cy + t * ty_end
    
    M = np.array([
        [alpha, beta, tx],
        [-beta, alpha, ty]
    ], dtype=np.float32)
    
    warped = cv2.warpAffine(frame, M, (w, h), flags=cv2.INTER_CUBIC, borderMode=cv2.BORDER_REFLECT)
    out.write(warped)

cap.release()
out.release()
print("Smoothly stabilized video written!")

# Now make seamless loop crossfade (1.0s crossfade duration)
duration_sec = N / fps # 7.46s
loop_sec = duration_sec - 1.0 # 6.46s

filter_complex = (
    "[0:v]split=2[b1][tail];"
    f"[b1]trim=start=0:end={loop_sec:.3f},setpts=PTS-STARTPTS[main];"
    f"[tail]trim=start={loop_sec:.3f}:end={duration_sec:.3f},setpts=PTS-STARTPTS,format=yuva420p,fade=t=out:st=0:d=1.0:alpha=1[faded_tail];"
    "[main][faded_tail]overlay=0:0:enable='between(t,0,1.0)'[outv]"
)

cmd = [
    FFMPEG, "-y",
    "-i", STABILIZED_RAW,
    "-filter_complex", filter_complex,
    "-map", "[outv]",
    "-c:v", "libx264",
    "-crf", "18",
    "-preset", "slow",
    "-an",
    "-movflags", "+faststart",
    SEAMLESS_OUT
]

res = subprocess.run(cmd, capture_output=True, text=True)
if res.returncode == 0:
    import shutil
    shutil.copy2(SEAMLESS_OUT, DIST_OUT)
    shutil.copy2(SEAMLESS_OUT, os.path.join(os.path.dirname(SEAMLESS_OUT), "home_Page2-BG-Video.mp4"))
    print("Ultra-smooth stabilized video deployed successfully!")
else:
    print("FFmpeg error:", res.stderr)

