from PIL import Image
import numpy as np

for name in ['100pct', '125pct', '80pct', 'laptop_750']:
    im = Image.open(f'Transvolt Website V2/scratch/final_scale_{name}.png').convert('RGB')
    arr = np.array(im)
    h, w, _ = arr.shape
    # Check bottom 25% where grass is
    grass_band = arr[int(h * 0.85):, :, :3]
    has_green = (grass_band[:, :, 1] > grass_band[:, :, 0] + 15) & (grass_band[:, :, 1] > grass_band[:, :, 2] + 15)
    print(f'{name} ({w}x{h}): grass pixels found = {has_green.sum()} (density {has_green.mean():.1%})')

