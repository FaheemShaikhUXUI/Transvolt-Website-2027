from PIL import Image
import numpy as np

for name in ['100_percent', '125_percent', 'laptop_1080p_125pct']:
    im = Image.open(f'Transvolt Website V2/scratch/test_zoom_{name}.png').convert('RGB')
    arr = np.array(im)
    h, w, _ = arr.shape
    # Check bottom 15% where grass is
    grass_y = int(h * 0.90)
    print(f'{name}: height={h}, grass area y={grass_y}')

