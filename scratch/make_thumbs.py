from PIL import Image

for name in ['100pct', '125pct', '80pct', 'laptop_750']:
    im = Image.open(f'Transvolt Website V2/scratch/live_scale_{name}.png')
    thumb = im.resize((480, int(480 * im.height / im.width)))
    thumb.save(f'Transvolt Website V2/scratch/thumb_{name}.png')
print('Thumbnails saved!')

