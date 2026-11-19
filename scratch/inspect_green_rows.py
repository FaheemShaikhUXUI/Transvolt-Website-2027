from PIL import Image
import numpy as np

im = Image.open('Transvolt Website V2/scratch/thumb_125pct.png')
print('thumb_125pct size:', im.size)
arr = np.array(im)
# Find where green pixels are in thumb_125pct
mask = (arr[:, :, 1] > arr[:, :, 0] + 20) & (arr[:, :, 1] > arr[:, :, 2] + 20)
rows, cols = np.where(mask)
if len(rows):
    print('Green pixels row range in thumb_125pct:', rows.min(), 'to', rows.max(), 'out of', im.size[1])
else:
    print('No green pixels found in thumb_125pct!')

im100 = Image.open('Transvolt Website V2/scratch/thumb_100pct.png')
arr100 = np.array(im100)
mask100 = (arr100[:, :, 1] > arr100[:, :, 0] + 20) & (arr100[:, :, 1] > arr100[:, :, 2] + 20)
rows100, cols100 = np.where(mask100)
if len(rows100):
    print('Green pixels row range in thumb_100pct:', rows100.min(), 'to', rows100.max(), 'out of', im100.size[1])

