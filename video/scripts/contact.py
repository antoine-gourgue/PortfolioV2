"""Tiles rendered stills into one contact sheet for quick review."""
import sys
from PIL import Image, ImageDraw

paths = sys.argv[2:]
out = sys.argv[1]
cols = 4
w, h = 432, 540
rows = (len(paths) + cols - 1) // cols
sheet = Image.new('RGB', (cols * w, rows * h), 'black')
draw = ImageDraw.Draw(sheet)
for i, p in enumerate(paths):
    im = Image.open(p).convert('RGB').resize((w, h), Image.LANCZOS)
    x, y = (i % cols) * w, (i // cols) * h
    sheet.paste(im, (x, y))
    draw.text((x + 8, y + 6), p.split('-')[-1].split('.')[0], fill='yellow')
sheet.save(out)
