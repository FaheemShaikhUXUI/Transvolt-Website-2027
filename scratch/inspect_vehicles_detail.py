from PIL import Image

# Let's inspect the vehicles in veh_facing.png
im = Image.open('Transvolt Website V2/scratch/veh_facing.png')
print('Size:', im.size)
# The vehicles are in columns 0 to 973, rows 0 to 99
# Let's check where the windshields are:
# Usually windshield is slanted. Let's look at the shape of the rightmost vehicle vs leftmost vehicle
im_cropped = im.crop((0, 0, 974, 100))
im_cropped.save('Transvolt Website V2/scratch/all_vehicles_rendered.png')
print('Saved all_vehicles_rendered.png')

