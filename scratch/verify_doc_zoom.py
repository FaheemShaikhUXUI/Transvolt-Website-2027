from PIL import Image
import numpy as np

for name in ['100pct', '125pct', '80pct']:
    im = Image.open(f'Transvolt Website V2/scratch/doc_zoom_{name}.png').convert('RGB')
    arr = np.array(im)
    h, w, _ = arr.shape
    # Check top row for red border
    top_row = arr[1, :, :]
    red_cols = np.where((top_row[:, 0] > 180) & (top_row[:, 1] < 50) & (top_row[:, 2] < 50))[0]
    print(f'{name} ({w}x{h}): red border right col = {red_cols.max() if len(red_cols) else "none"} (expected {w-1})')

