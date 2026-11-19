import subprocess, os

chrome = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
html = '''<!DOCTYPE html>
<html>
<head>
<script>
  (function() {
    function setScale() {
      if (window.innerWidth >= 1024) {
        var s = Math.min(window.innerWidth / 1920, window.innerHeight / 960);
        document.documentElement.style.zoom = s;
      } else {
        document.documentElement.style.zoom = '1';
      }
    }
    setScale();
    window.addEventListener('resize', setScale);
  })();
</script>
<style>
  body { margin:0; padding:0; background:#fff; overflow:hidden; }
  .box {
    width: 1920px;
    height: 960px;
    border: 4px solid red;
    box-sizing: border-box;
    position: relative;
  }
</style>
</head>
<body>
  <div class="box">
    <h1>Testing DocumentElement Zoom</h1>
    <div style="position:absolute; bottom:20px; right:20px;">Bottom Right Element</div>
  </div>
</body>
</html>'''

with open('Transvolt Website V2/scratch/test_doc_zoom.html', 'w', encoding='utf-8') as f:
    f.write(html)

for w, h, name in [(1920, 1080, '100pct'), (1536, 864, '125pct'), (2400, 1350, '80pct')]:
    out = os.path.abspath(f'Transvolt Website V2/scratch/doc_zoom_{name}.png')
    subprocess.run([
        chrome, '--headless=new', '--disable-gpu',
        f'--screenshot={out}',
        f'--window-size={w},{h}',
        'file:///' + os.path.abspath('Transvolt Website V2/scratch/test_doc_zoom.html')
    ])
    print(f'doc_zoom_{name}:', os.path.exists(out))

