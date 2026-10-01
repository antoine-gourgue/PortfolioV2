# Delivery

## Contents

- [Render times](#render-times)
- [QA checklist](#qa-checklist)
- [Encoding](#encoding)
- [LinkedIn](#linkedin)
- [On a website](#on-a-website)
- [Cover image](#cover-image)

## Render times

On a 4-core machine with no GPU, measured on the template's 54-second demo:

| Command                                | Time                                    |
| -------------------------------------- | --------------------------------------- |
| `npm run review` (33 half-size frames) | about 1 min                             |
| `npm run review -- cuts` (30 frames)   | about 1 min                             |
| `npm run still -- <frame>`             | 2–5 s                                   |
| `npm run audio`                        | about 30 s                              |
| `npm run render` (1620 frames)         | about 15 min                            |
| A `FRAMES=a-b` render                  | about 0.55 s a frame, plus the bundling |

Full-frame blurs and 3D-heavy scenes (laptop, phone) cost more than type scenes.

Run full renders in the background and poll their log. Iterate on stills and short ranges, not full renders.

## QA checklist

Go through it on `out/review/sheet.png`, then on full-size stills of anything doubtful.

- **Text:** nothing overflows the frame or the 60 px side margins, no two text blocks collide, and no heading wraps unexpectedly.
- **Spelling:** every word is spelled right, with real apostrophes (’) and the user's language conventions. Read numbers aloud: "37 000", not "37000".
- **Logos and wordmarks:** every letter renders. Check them at full size.
- **Screens:**
  - none covers a title;
  - none sinks into the black (dark screenshots), especially inside the hero letters;
  - the device screens face the camera long enough to be read.
- **Motion:** two frames 15 apart differ in every shot. If not, add a drift.
- **Transitions:**
  - `npm run review -- cuts` renders every cut: 4 frames before, on it, 4 after;
  - nothing pops or flashes, there is no black frame, and nothing from the previous scene is left over.
- **Timing:**
  - every line stays at least 45 frames;
  - each phone screen has at least 30 frames after it lands;
  - the end card holds about 2 s before the fade.
- **Facts:**
  - figures, units and names match what the user gave or what you verified;
  - the subject's role is not confused with their employer's product.
- **Sound:**
  - the WAV was regenerated after the last timeline change;
  - listen to a `FRAMES` render around the drop and the end card.

## Encoding

`npm run render` writes an H.264 file (CRF 19, slow preset, AAC 320k), which is visually lossless: the 54-second demo weighs 11.5 MB. For uploads, run:

```bash
scripts/encode.sh out/Film.mp4
```

This writes `out/Film-web.mp4` in the most compatible profile:

- H.264 High@4.0, yuv420p;
- BT.709, limited range;
- AAC 48 kHz stereo;
- the `moov` atom first.

At its default CRF 20 the demo comes out at 8.2 MB. Use `CRF=24` for a lighter file to self-host.

## LinkedIn

- **Format:** the 4:5 vertical format takes the most room in the feed, on mobile and on desktop. Use 1080 × 1350.
- **Size:** the encoded file weighs a few tens of MB at most, well within what LinkedIn accepts.
- **Thumbnail:** don't upload a custom thumbnail. On the original film, adding one made the upload hang at 0 % in both Safari and Chrome; without it the upload went through.
  - **What LinkedIn shows instead:** the first frame, which is black for the default opener.
  - **Is that a problem?** No: the feed autoplays muted, so the image moves almost at once.
  - **If a still cover matters:** open the film on a designed frame. Start the opener later, or add a short title card scene first.
- **Silent autoplay:** the film works without sound, because all the meaning is in the type. Don't add subtitles.
- **Links:** put them in the first comment, not in the post, and say so in the post ("Portfolio et CV en premier commentaire").
- **Scheduling:** posts can be scheduled with the clock icon next to "Publier". The first comment can't be scheduled; post it right after publication.

## On a website

- **File:** self-host the `CRF=24` encode.
- **Tag:** use `<video controls playsinline preload="none" poster="…">`, so nothing downloads until the visitor asks for it.
- **Poster:** render it from the film (`npm run still -- <frame>`) or from `Thumb`, then resize to 720 × 900 and save as JPEG at quality 80 or so.
- **Autoplay:** browsers allow it only muted. A player opened by a click can start with sound.

## Cover image

`src/Thumb.tsx` (`ID=Thumb npm run still -- 0`) composes:

- the hook in silver type;
- the MacBook and iPhone with real screens;
- the availability line.

Use it as a poster, an Open Graph image or a carousel slide. It was designed as a LinkedIn thumbnail, but see the warning above.
