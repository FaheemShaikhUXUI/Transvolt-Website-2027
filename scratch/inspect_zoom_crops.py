from PIL import Image
import numpy as np

for name in ['100_percent', '125_percent', '80_percent', 'laptop_1080p_125pct']:
    p = f'Transvolt Website V2/scratch/test_zoom_{name}.png'
    im = Image.open(p)
    print(f'{name} size:', im.size)

