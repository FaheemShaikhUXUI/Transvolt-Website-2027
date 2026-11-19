from PIL import Image
import numpy as np

im = Image.open('Transvolt Website V2/scratch/no_zoom_full.png')
print('Size:', im.size)
arr = np.array(im)

# Check the rightmost column x = 1919 across all rows
right_col = arr[:, 1919, :3]
# Check bottom row y = 1079 across all columns
bottom_row = arr[1079, :, :3]

# In grass at bottom, is bottom row green?
print('Bottom row green percentage:', ((bottom_row[:, 1] > bottom_row[:, 0]) & (bottom_row[:, 1] > bottom_row[:, 2])).mean())
# Is rightmost column at bottom green?
print('Bottom-right pixel RGB:', arr[1079, 1919, :3])

