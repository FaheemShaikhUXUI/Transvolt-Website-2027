import subprocess, os

chrome = r'C:\Program Files\Google\Chrome\Application\chrome.exe'

# Let's test injecting zoom via Chrome devtools or a test wrapper
html = '''<!DOCTYPE html>
<html>
<head>
<script>
  // Dynamic Auto-Scale for Desktop
  function setDesktopScale() {
    if (window.innerWidth >= 1024) {
      const scale = window.innerWidth / 1920;
      document.documentElement.style.zoom = scale;
    } else {
      document.documentElement.style.zoom = '1';
    }
  }
  window.addEventListener('resize', setDesktopScale);
  setDesktopScale();
</script>
</head>
<body style="margin:0; background:#f0fdf4;">
  <div style="width:1920px; height:1080px; position:relative; background:white; border:4px solid green; box-sizing:border-box;">
    <h1 style="font-size:48px; margin:40px;">Header at 1920x1080</h1>
    <div style="position:absolute; bottom:50px; left:50px; font-size:24px;">Bottom element at bottom:50px</div>
    <div style="position:fixed; top:20px; right:20px; background:black; color:white; padding:10px 20px; border-radius:999px;">Fixed Top Right Button</div>
  </div>
</body>
</html>'''

with open('Transvolt Website V2/scratch/test_direct_zoom.html', 'w', encoding='utf-8') as f:
    f.write(html)

for w, h, name in [(1920, 1080, '100pct'), (1536, 864, '125pct'), (2400, 1350, '80pct'), (1536, 750, 'laptop_750')]:
    out = os.path.abspath(f'Transvolt Website V2/scratch/direct_zoom_{name}.png')
    subprocess.run([
        chrome, '--headless=new', '--disable-gpu',
        f'--screenshot={out}',
        f'--window-size={w},{h}',
        'file:///' + os.path.abspath('Transvolt Website V2/scratch/test_direct_zoom.html')
    ])
    print(f'direct_zoom_{name}:', os.path.exists(out))

