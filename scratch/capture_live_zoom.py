import subprocess, os, time

chrome = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
tests = [
    ('100pct', 1920, 1080),
    ('125pct', 1536, 864),
    ('80pct', 2400, 1350),
    ('laptop_750', 1536, 750)
]

for name, w, h in tests:
    out = os.path.abspath(f'Transvolt Website V2/scratch/live_scale_{name}.png')
    subprocess.run([
        chrome, '--headless=new', '--disable-gpu',
        f'--screenshot={out}',
        f'--window-size={w},{h}',
        'http://localhost:5173/'
    ])
    print(f'live_scale_{name}: {os.path.exists(out)} size: {os.path.getsize(out) if os.path.exists(out) else 0}')

