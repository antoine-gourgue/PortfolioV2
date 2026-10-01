# Keynote film

A launch film in the style of an Apple event, coded with
[Remotion](https://www.remotion.dev). Every frame is a React component, and
the soundtrack is synthesised from the same timeline as the visuals. The
output is 1080 × 1350 (4:5), 30 fps.

```bash
npm install
pip install numpy scipy pillow   # soundtrack and contact sheets
npm run review                   # contact sheet of the whole film: out/review/sheet.png
npm run still -- 640             # one full-size frame: out/stills/
npm run audio                    # public/audio/Film.wav from src/timeline.json
npm run render                   # out/Film.mp4; FRAMES=600-860 for a section
scripts/encode.sh out/Film.mp4   # out/Film-web.mp4, for uploads
ID=Thumb npm run still -- 0      # cover image
npm run studio                   # live preview with a timeline
```

- `src/content.tsx`: every word and every screen. Types are in `src/types.ts`.
- `src/timeline.json`: the scenes in order with their lengths, the music in bars, and the sound cues.
- `src/scenes/`: one component per scene, built from the kit in `src/kit/` (type, light, devices, screens, charts).
- `public/footage/`: screenshots and icons, referenced as `'footage/name.jpg'`.
