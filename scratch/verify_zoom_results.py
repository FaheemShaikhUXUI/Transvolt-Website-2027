from PIL import Image
import numpy as np

for name in ['100pct', '125pct', '80pct', 'laptop_750']:
    im = Image.open(f'Transvolt Website V2/scratch/direct_zoom_{name}.png').convert('RGB')
    arr = np.array(im)
    h, w, _ = arr.shape
    # Check if the green border (top right pixel of 1920x1080) aligns exactly with window width
    # In each image, the green border at the top right should be at x = w - 1
    top_row = arr[1, :, :]
    green_cols = np.where((top_row[:, 0] < 50) & (top_row[:, 1] > 100) & (top_row[:, 2] < 50))[0]
    print(f'{name} ({w}x{h}): green border right col = {green_cols.max() if len(green_cols) else "none"} (expected {w-1})')

