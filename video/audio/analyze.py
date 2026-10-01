"""Visual QA for a rendered soundtrack: spectrogram + RMS curve with the
cue frames overlaid, since the renders are checked without speakers."""
import json
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw
from scipy.io import wavfile
from scipy.signal import spectrogram

vid = sys.argv[1]
root = Path(__file__).resolve().parent.parent
sr, x = wavfile.read(root / "public" / "audio" / f"{vid}.wav")
x = x.astype(float) / 32768
mono = x.mean(axis=1)
sheet = json.loads((root / "src" / "videos" / f"{vid}.cues.json").read_text())

f, t, S = spectrogram(mono, sr, nperseg=2048, noverlap=1024)
S = 10 * np.log10(S + 1e-12)
keep = f < 12000
S = S[keep][::-1]
S = np.clip((S - S.max() + 90) / 90, 0, 1)
W, H = 1600, 500
img = Image.fromarray((S * 255).astype(np.uint8)).resize((W, H))
img = Image.merge("RGB", (img, img.point(lambda v: v * 0.6), img.point(lambda v: 255 - v // 2)))
canvas = Image.new("RGB", (W, H + 200), "black")
canvas.paste(img, (0, 0))
d = ImageDraw.Draw(canvas)
dur = len(mono) / sr
win = sr // 10
rms = [np.sqrt(np.mean(mono[i : i + win] ** 2)) for i in range(0, len(mono) - win, win)]
pts = [(i * win / sr / dur * W, H + 190 - min(r * 600, 180)) for i, r in enumerate(rms)]
d.line(pts, fill="lime", width=2)
for c in sheet["sfx"]:
    px = c["at"] / 30 / dur * W
    d.line([(px, 0), (px, H)], fill="yellow" if c["type"] in ("impact", "hit") else "gray")
    d.text((px + 2, H + 2), c["type"][:4], fill="white")
canvas.save(root / "out" / f"audio-{vid}.png")
peak = np.max(np.abs(x))
print(f"peak {20*np.log10(peak):.1f} dBFS, rms {20*np.log10(np.sqrt(np.mean(mono**2))):.1f} dBFS, dc {mono.mean():.4f}")
for s in sheet["sections"]:
    seg = mono[int(s['from']/30*sr):int(s['to']/30*sr)]
    print(f"{s['name']:>9}: rms {20*np.log10(np.sqrt(np.mean(seg**2))+1e-9):.1f} dBFS")
