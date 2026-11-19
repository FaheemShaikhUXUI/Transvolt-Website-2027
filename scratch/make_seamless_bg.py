import subprocess
import os

FFMPEG = r"C:\Users\LENOVO\AppData\Local\Programs\Python\Python311\Lib\site-packages\imageio_ffmpeg\binaries\ffmpeg-win64-v4.2.2.exe"
INPUT = r"c:\Users\LENOVO\OneDrive - Transvolt Mobility Private Limited\2 - Project 2\1 - Antigravity All Project\3 - Transvolt Website Re-Design - 2027\Transvolt Website V2\Website Assets\home_Page2-BG-Video.mp4"
OUTPUT = r"c:\Users\LENOVO\OneDrive - Transvolt Mobility Private Limited\2 - Project 2\1 - Antigravity All Project\3 - Transvolt Website Re-Design - 2027\Transvolt Website V2\public\home_page2_bg_video.mp4"
DIST_OUTPUT = r"c:\Users\LENOVO\OneDrive - Transvolt Mobility Private Limited\2 - Project 2\1 - Antigravity All Project\3 - Transvolt Website Re-Design - 2027\Transvolt Website V2\dist\home_page2_bg_video.mp4"

# We want from 2.50 to 10.00 sec. Total duration = 7.50 sec.
# Crossfade duration D = 1.0 sec.
# Resulting loop length = 6.50 sec.
# Filter graph:
# 1. Trim input to [2.5, 10.0], setpts=PTS-STARTPTS -> [base]
# 2. Split [base] into:
#    - [main]: trim=0:6.5, setpts=PTS-STARTPTS
#    - [tail]: trim=6.5:7.5, setpts=PTS-STARTPTS
# 3. Apply fade-out to [tail]: fade=t=out:st=0:d=1.0:alpha=1 -> [faded_tail]
# 4. Overlay [faded_tail] onto [main] at t=0: overlay=0:0:enable='between(t,0,1.0)' -> [outv]

filter_complex = (
    "[0:v]trim=start=2.5:end=10.0,setpts=PTS-STARTPTS[base];"
    "[base]split=2[b1][tail];"
    "[b1]trim=start=0:end=6.5,setpts=PTS-STARTPTS[main];"
    "[tail]trim=start=6.5:end=7.5,setpts=PTS-STARTPTS,format=yuva420p,fade=t=out:st=0:d=1.0:alpha=1[faded_tail];"
    "[main][faded_tail]overlay=0:0:enable='between(t,0,1.0)'[outv]"
)

cmd = [
    FFMPEG, "-y",
    "-i", INPUT,
    "-filter_complex", filter_complex,
    "-map", "[outv]",
    "-c:v", "libx264",
    "-crf", "20",
    "-preset", "slow",
    "-an", # background video should be silent
    "-movflags", "+faststart",
    OUTPUT
]

print("Running command:", " ".join(cmd))
res = subprocess.run(cmd, capture_output=True, text=True)
print("Return code:", res.returncode)
if res.returncode != 0:
    print("Stderr:", res.stderr)
else:
    print("Success! Output size:", os.path.getsize(OUTPUT))
    # Also copy to dist if dist exists
    if os.path.exists(os.path.dirname(DIST_OUTPUT)):
        import shutil
        shutil.copy2(OUTPUT, DIST_OUTPUT)
        print("Copied to dist!")

