from PIL import Image
import numpy as np

for side, fn in [('left', 'Transvolt Website V2/scratch/left_veh.png'), ('right', 'Transvolt Website V2/scratch/right_veh.png')]:
    im = Image.open(fn)
    arr = np.array(im)
    # print non-white pixels profile horizontally
    mask = (arr[:, :, 0] < 240) | (arr[:, :, 1] < 240) | (arr[:, :, 2] < 240)
    col_counts = mask.sum(axis=0)
    print(side, 'col counts shape:', col_counts.shape)

