import subprocess, os

chrome = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
resolutions = [
    ('100_percent', 1920, 1080),
    ('125_percent', 1536, 864),
    ('80_percent', 2400, 1350),
    ('laptop_1080p_125pct', 1536, 750)
]

for name, w, h in resolutions:
    out = os.path.abspath(f'Transvolt Website V2/scratch/test_zoom_{name}.png')
    subprocess.run([
        chrome, '--headless=new', '--disable-gpu',
        f'--screenshot={out}',
        f'--window-size={w},{h}',
        'http://localhost:5173/'
    ])
    print(f'{name} ({w}x{h}): generated {os.path.exists(out)}')

