from PIL import Image
import numpy as np

tests = ['100pct', '125pct', '80pct', 'laptop_750']

for name in tests:
    p = f'Transvolt Website V2/scratch/live_scale_{name}.png'
    im = Image.open(p)
    arr = np.array(im)
    h, w, _ = arr.shape
    print(f'=== {name} ({w}x{h}) ===')
    # Check bottom 20 rows for grass color (green)
    bottom_grass = arr[-10, :, :3]
    is_green = (bottom_grass[:, 1] > bottom_grass[:, 0]) & (bottom_grass[:, 1] > bottom_grass[:, 2])
    print(f'Bottom row has grass: {is_green.mean():.1%}')
    # Check navbar area (top 40px)
    nav_area = arr[15, :, :3]
    # Check right menu button (rightmost 80px, top 40px)
    right_btn = arr[15, -60:, :3]
    print(f'Right action group present: {np.any(right_btn < 240)}')

