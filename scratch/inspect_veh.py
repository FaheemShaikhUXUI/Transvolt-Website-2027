from PIL import Image

im = Image.open('Transvolt Website V2/scratch/veh_facing.png')
# crop left vehicle (cols 0-300) and right vehicle (cols 650-980)
left_veh = im.crop((0, 0, 300, 100))
left_veh.save('Transvolt Website V2/scratch/left_veh.png')

right_veh = im.crop((680, 0, 980, 100))
right_veh.save('Transvolt Website V2/scratch/right_veh.png')
print('Cropped vehicles saved!')

