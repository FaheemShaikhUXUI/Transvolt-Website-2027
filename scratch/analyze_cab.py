from PIL import Image
import numpy as np

im = Image.open('Transvolt Website V2/scratch/all_vehicles_rendered.png').convert('L')
arr = np.array(im)
# Find dark pixels
dark = arr < 200

# Let's inspect column density:
dens = dark.sum(axis=0)
# Find gaps between vehicles (where dens is near 0)
gaps = np.where(dens == 0)[0]
print('Gaps:', gaps[:30])

# Let's look at the first vehicle (leftmost) and last vehicle (rightmost)
# First vehicle is roughly 0 to 180
# Last vehicle is roughly 750 to 970
# In a truck/bus, the cabin has a windshield. Let's see which side is the cabin!
veh_first = dark[:, 0:180]
veh_last = dark[:, 800:974]

# Where are wheels? Wheels are at the bottom (rows 70-100)
# Where is roof? Rows 10-30
print('First veh shape:', veh_first.shape, 'dark sum:', veh_first.sum())
print('Last veh shape:', veh_last.shape, 'dark sum:', veh_last.sum())

# Let's check center of mass of the top half (rows 10-50) vs bottom half (rows 50-90)
top_first = veh_first[10:50, :]
r_idx, c_idx = np.where(top_first)
print('First veh top center X:', c_idx.mean(), 'out of', veh_first.shape[1])

top_last = veh_last[10:50, :]
r_idx, c_idx = np.where(top_last)
print('Last veh top center X:', c_idx.mean(), 'out of', veh_last.shape[1])

