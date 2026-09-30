# Promo videos

Three LinkedIn promo videos (1080×1350, 4:5, 30 fps) coded with
[Remotion](https://www.remotion.dev): every frame is a React component, every
effect is code, and the soundtrack is synthesised from the same timing data as
the visuals.

| Composition     | Concept                                                                    | Length |
| --------------- | -------------------------------------------------------------------------- | ------ |
| `AntoineOS`     | The portfolio is an OS: boot, real desktop, 3D project fly-through, CTA    | 41 s   |
| `Trailer`       | Dark cinematic trailer: volumetric light, big numbers, particle portrait   | 38 s   |
| `CodeToReality` | Typed code explodes into particles and rebuilds as real apps, then deploys | 38 s   |

## Render

```bash
cd video
npm ci
pip install numpy scipy pillow   # soundtrack synthesis only
npm run audio                    # writes public/audio/*.wav from the cue sheets
npm run render                   # all three MP4s into out/; or: npm run render -- Trailer
npm run studio                   # live preview with a timeline scrubber
npm run still -- AntoineOS 120   # single frames into out/stills/ for review
```

On a machine without a GPU the WebGL shaders run on SwiftShader; renders take
roughly 10–20 minutes per video on 4 cores. `REMOTION_BROWSER` can point to a
Chrome headless shell if Remotion should not download its own.

## How it is organised

- `src/brand.ts` — colours, fonts, and every piece of copy (name, availability,
  projects, numbers). Change the text here, not in the scenes.
- `src/videos/<Id>.tsx` — one file per video, one component per scene.
- `src/videos/<Id>.cues.json` — the timing spine: sections and sound effects by
  frame. Scenes read impact/glitch frames from it and `audio/synth.py` builds the
  music and SFX from it, so moving a cue moves both.
- `src/fx/` — the VFX: RGB-split glitch, film grain, light leaks, anamorphic
  flares, camera shake, GLSL backgrounds (aurora, volumetric beams, grid),
  morphing particle systems, warp starfield, animated neural network.
- `src/ui/` — macOS window chrome, kinetic type, counters, chips, logo.
- `public/footage/` — screenshots of the live portfolio used in `AntoineOS`.
  Assets from `../public/assets` are copied in at render time.

## Replacing the music

The soundtrack is procedural (royalty-free by construction). To use a licensed
track instead, drop it in `public/audio/` and point the `<Audio>` of the
composition at it; keep it at 120 BPM with the first downbeat on the cue
sheet's `gridOffset` frame so cuts stay on the beat.
