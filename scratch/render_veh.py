import subprocess, os

chrome = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
html_path = os.path.abspath('Transvolt Website V2/scratch/test_veh.html')
with open(html_path, 'w', encoding='utf-8') as f:
    f.write('<!DOCTYPE html><html><body style="background:#fff;margin:0;"><img src="../public/Vehicles-1.svg" style="height:100px;"></body></html>')

out = os.path.abspath('Transvolt Website V2/scratch/veh_facing.png')
res = subprocess.run([chrome, '--headless=new', '--disable-gpu', f'--screenshot={out}', '--window-size=1000,200', f'file:///{html_path}'], capture_output=True, text=True)
print('Screenshot created:', os.path.exists(out), 'size:', os.path.getsize(out) if os.path.exists(out) else 0)

