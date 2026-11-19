import subprocess, os

chrome = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
html = '''<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  #root-container {
    width: 100%;
    height: 100%;
    zoom: var(--desktop-scale, 1);
  }
</style>
</head>
<body>
  <div id="root-container">
    <iframe src="http://localhost:5173/" style="width:100%; height:100%; border:none;"></iframe>
  </div>
  <script>
    function update() {
      if (window.innerWidth >= 1024) {
        const s = window.innerWidth / 1920;
        document.documentElement.style.setProperty('--desktop-scale', s);
      } else {
        document.documentElement.style.setProperty('--desktop-scale', '1');
      }
    }
    window.addEventListener('resize', update);
    update();
  </script>
</body>
</html>'''

with open('Transvolt Website V2/scratch/test_zoom_frame.html', 'w', encoding='utf-8') as f:
    f.write(html)

for w, h, name in [(1920, 1080, '100pct'), (1536, 864, '125pct'), (2400, 1350, '80pct'), (1536, 750, 'laptop_750')]:
    out = os.path.abspath(f'Transvolt Website V2/scratch/scaled_view_{name}.png')
    subprocess.run([
        chrome, '--headless=new', '--disable-gpu',
        f'--screenshot={out}',
        f'--window-size={w},{h}',
        'file:///' + os.path.abspath('Transvolt Website V2/scratch/test_zoom_frame.html')
    ])
    print(f'scaled_view_{name}: generated', os.path.exists(out))

