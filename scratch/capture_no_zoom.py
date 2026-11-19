import subprocess, os

chrome = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
out = os.path.abspath('Transvolt Website V2/scratch/no_zoom_full.png')
subprocess.run([
    chrome, '--headless=new', '--disable-gpu',
    f'--screenshot={out}',
    '--window-size=1920,1080',
    'http://localhost:5173/'
])
print('Screenshot created:', os.path.exists(out), 'size:', os.path.getsize(out) if os.path.exists(out) else 0)

