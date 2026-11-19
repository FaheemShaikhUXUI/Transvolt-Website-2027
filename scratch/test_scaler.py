import subprocess, os

chrome = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
html = '''<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; overflow: hidden; background: #000; }
  #scaler {
    width: 1920px;
    height: 1080px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform-origin: center center;
    background: #fff;
  }
</style>
</head>
<body>
  <div id="scaler">
    <h1 style="padding:40px;">Test 1920x1080 Scaler</h1>
  </div>
  <script>
    function update() {
      const s = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
      document.getElementById('scaler').style.transform = 'translate(-50%, -50%) scale(' + s + ')';
    }
    window.addEventListener('resize', update);
    update();
  </script>
</body>
</html>'''

with open('Transvolt Website V2/scratch/test_scale_algo.html', 'w', encoding='utf-8') as f:
    f.write(html)

for w, h, name in [(1536, 864, '125pct'), (2400, 1350, '80pct'), (1536, 750, 'laptop')]:
    out = os.path.abspath(f'Transvolt Website V2/scratch/scale_{name}.png')
    subprocess.run([
        chrome, '--headless=new', '--disable-gpu',
        f'--screenshot={out}',
        f'--window-size={w},{h}',
        'file:///' + os.path.abspath('Transvolt Website V2/scratch/test_scale_algo.html')
    ])
    print(f'scale_{name}:', os.path.exists(out))

