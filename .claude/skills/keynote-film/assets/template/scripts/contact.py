"""Tiles stills into one contact sheet: contact.py out.png img1 label1 img2 label2 ..."""
import sys
from PIL import Image, ImageDraw

out = sys.argv[1]
pairs = list(zip(sys.argv[2::2], sys.argv[3::2]))
# Cuts come in threes (before, on, after): keep each on one row
cols = 6
w, h = 288, 360
rows = (len(pairs) + cols - 1) // cols
sheet = Image.new("RGB", (cols * w, rows * h), "black")
draw = ImageDraw.Draw(sheet)
for i, (path, label) in enumerate(pairs):
    im = Image.open(path).convert("RGB").resize((w, h), Image.LANCZOS)
    x, y = (i % cols) * w, (i // cols) * h
    sheet.paste(im, (x, y))
    draw.rectangle([x, y, x + w - 1, y + h - 1], outline=(40, 40, 40))
    draw.text((x + 6, y + 4), label, fill="yellow")
sheet.save(out)
