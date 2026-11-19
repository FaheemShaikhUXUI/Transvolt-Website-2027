import cv2
import numpy as np
import os
import subprocess

INPUT = r"c:\Users\LENOVO\OneDrive - Transvolt Mobility Private Limited\2 - Project 2\1 - Antigravity All Project\3 - Transvolt Website Re-Design - 2027\Transvolt Website V2\Website Assets\home_Page2-BG-Video.mp4"
STABILIZED_RAW = r"c:\Users\LENOVO\OneDrive - Transvolt Mobility Private Limited\2 - Project 2\1 - Antigravity All Project\3 - Transvolt Website Re-Design - 2027\Transvolt Website V2\scratch\stabilized_raw.mp4"
SEAMLESS_OUT = r"c:\Users\LENOVO\OneDrive - Transvolt Mobility Private Limited\2 - Project 2\1 - Antigravity All Project\3 - Transvolt Website Re-Design - 2027\Transvolt Website V2\public\home_page2_bg_video.mp4"
DIST_OUT = r"c:\Users\LENOVO\OneDrive - Transvolt Mobility Private Limited\2 - Project 2\1 - Antigravity All Project\3 - Transvolt Website Re-Design - 2027\Transvolt Website V2\dist\home_page2_bg_video.mp4"
FFMPEG = r"C:\Users\LENOVO\AppData\Local\Programs\Python\Python311\Lib\site-packages\imageio_ffmpeg\binaries\ffmpeg-win64-v4.2.2.exe"

cap = cv2.VideoCapture(INPUT)
fps = cap.get(cv2.CAP_PROP_FPS) or 24.0
w = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
h = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

start_frame = int(2.50 * fps)
end_frame = int(10.00 * fps)
total_frames = end_frame - start_frame

print(f"FPS: {fps}, W: {w}, H: {h}, Start Frame: {start_frame}, End Frame: {end_frame}, Total: {total_frames}")

cap.set(cv2.CAP_PROP_POS_FRAMES, start_frame)
ret, ref_frame = cap.read()
if not ret:
    print("Failed to read reference frame!")
    exit(1)

ref_gray = cv2.cvtColor(ref_frame, cv2.COLOR_BGR2GRAY)
# Feature detector on reference frame (ORB with high point count)
orb = cv2.ORB_create(nfeatures=2000)
kp_ref, des_ref = orb.detectAndCompute(ref_gray, None)

# Mask out road / vehicles if needed, or use robust RANSAC to lock onto stationary buildings/trees
matcher = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=False)

fourcc = cv2.VideoWriter_fourcc(*'mp4v')
out = cv2.VideoWriter(STABILIZED_RAW, fourcc, fps, (w, h))

# Write first frame
out.write(ref_frame)

prev_M = np.eye(2, 3, dtype=np.float32)

cap.set(cv2.CAP_PROP_POS_FRAMES, start_frame + 1)
frame_idx = start_frame + 1

while frame_idx < end_frame:
    ret, frame = cap.read()
    if not ret:
        break
    
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    kp_cur, des_cur = orb.detectAndCompute(gray, None)
    
    if des_cur is not None and len(kp_cur) > 10:
        matches = matcher.knnMatch(des_cur, des_ref, k=2)
        good = []
        for m, n in matches:
            if m.distance < 0.75 * n.distance:
                good.append(m)
        
        if len(good) >= 15:
            src_pts = np.float32([kp_cur[m.queryIdx].pt for m in good]).reshape(-1, 1, 2)
            dst_pts = np.float32([kp_ref[m.trainIdx].pt for m in good]).reshape(-1, 1, 2)
            
            # Estimate partial affine (translation, uniform scale, rotation)
            M, inliers = cv2.estimateAffinePartial2D(src_pts, dst_pts, method=cv2.RANSAC, ransacReprojThreshold=3.0)
            if M is not None:
                prev_M = M
    
    # Warp frame to match reference frame exactly
    warped = cv2.warpAffine(frame, prev_M, (w, h), flags=cv2.INTER_LANCZOS4, borderMode=cv2.BORDER_REFLECT)
    out.write(warped)
    frame_idx += 1

cap.release()
out.release()
print("Stabilized video written!")

# Now make seamless loop using ffmpeg crossfade on the stabilized video
# Duration is total_frames / fps ~ 7.5s. Crossfade 1.0s -> 6.5s loop.
filter_complex = (
    "[0:v]split=2[b1][tail];"
    f"[b1]trim=start=0:end=6.5,setpts=PTS-STARTPTS[main];"
    f"[tail]trim=start=6.5:end=7.5,setpts=PTS-STARTPTS,format=yuva420p,fade=t=out:st=0:d=1.0:alpha=1[faded_tail];"
    "[main][faded_tail]overlay=0:0:enable='between(t,0,1.0)'[outv]"
)

cmd = [
    FFMPEG, "-y",
    "-i", STABILIZED_RAW,
    "-filter_complex", filter_complex,
    "-map", "[outv]",
    "-c:v", "libx264",
    "-crf", "19",
    "-preset", "medium",
    "-an",
    "-movflags", "+faststart",
    SEAMLESS_OUT
]

res = subprocess.run(cmd, capture_output=True, text=True)
if res.returncode == 0:
    import shutil
    shutil.copy2(SEAMLESS_OUT, DIST_OUT)
    shutil.copy2(SEAMLESS_OUT, os.path.join(os.path.dirname(SEAMLESS_OUT), "home_Page2-BG-Video.mp4"))
    print("Complete success! Stabilized & seamless loop deployed.")
else:
    print("FFmpeg error:", res.stderr)

