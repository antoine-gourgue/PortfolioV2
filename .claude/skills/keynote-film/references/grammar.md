# Motion grammar

The vocabulary the scenes are written in. New scenes and changes should speak it too, so the film stays one piece.

## Contents

- [Stage and colour](#stage-and-colour)
- [Type](#type)
- [Layout zones (1080 × 1350)](#layout-zones-1080--1350)
- [Entrances](#entrances)
- [Holds](#holds)
- [Exits and transitions](#exits-and-transitions)
- [Easing and springs](#easing-and-springs)
- [3D](#3d)
- [Rejected on the original, and why](#rejected-on-the-original-and-why)

## Stage and colour

- **Background:** pure black (`#000`) everywhere. `Grain` at 5 % over the whole film keeps gradients from banding after H.264 compression.
- **Light:**
  - Each scene has one `StageLight`: a pool of cool light (`rgba(170,200,255,0.16)`) behind or under the subject, never a coloured backdrop.
  - The `AnamorphicFlare` (a horizontal blue streak) marks a reveal: once in the opener, at most once more.
- **Type colours:**

  | Use                           | Colour                                                 |
  | ----------------------------- | ------------------------------------------------------ |
  | Hero words                    | silver gradient (`SILVER`) with a travelling highlight |
  | Statements                    | white `#f5f5f7`                                        |
  | Secondary lines               | grey `#86868b`                                         |
  | Separators and inactive marks | `#48484a`                                              |

- **Accent:** one per film, the CTA blue (`#0071e3`). Product colours only appear inside the products' own screens.

## Type

Inter Tight, tight tracking (−0.04 to −0.055 em on display sizes), always centred unless it sits beside a visual.

| Role          | Size    | Weight  | Notes                             |
| ------------- | ------- | ------- | --------------------------------- |
| Hero word     | 184     | 800     | `fitSize` shrinks it to the frame |
| Big number    | 250     | 800     | silver, tabular figures           |
| Scene title   | 100–124 | 700     | silver `Letters`                  |
| End-card word | 170–190 | 800     | silver                            |
| Statement     | 46–62   | 600–700 | white                             |
| Secondary     | 38–44   | 500     | grey                              |

`fitSize(text, max, width, em)` keeps templated copy inside the frame. Any new heading should go through it.

## Layout zones (1080 × 1350)

| Zone         | y (px)          | What sits there                                   |
| ------------ | --------------- | ------------------------------------------------- |
| Title        | 120–360         | scene title, then its subtitle or caption         |
| Subject      | 380–1120        | the device, the window, the grid; centred on `CX` |
| Proof        | 1130–1250       | the one line that proves the scene                |
| Safe margins | 60 px each side | feeds crop and round the corners                  |

Keep at most one block of text per zone. When a device and a title meet, the device moves, not the title.

## Entrances

| Component          | Motion                                                                                                  | Use for                                         |
| ------------------ | ------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| `Letters`          | each letter rises 0.5 em, sharpens from a 10 px blur, scales from 1.2; staggered 1.2–1.6 frames         | titles                                          |
| `Rise`             | 30 px fade-up out of an 8 px blur over 16 frames                                                        | every secondary line                            |
| `BeatWords`        | one word at a time, each cutting the last on its beat; scales from 1.18 out of a 14 px blur in 8 frames | slogans, lists (the "Pro. Beyond." rhythm)      |
| `SilverText` sweep | a specular highlight crossing the word over 34 frames                                                   | once per hero word, a few frames after it lands |
| `LogoTrace`        | a point of light with a blue glow draws the mark, then the fill and a sweep                             | the opener and the end card                     |
| `Counter`          | 0 → value over 30 frames, fast then settling (bezier 0.2, 0.8, 0.2, 1)                                  | numbers; pair it with a `counter` sound         |
| Spring landing     | windows, devices and icons arrive on springs from far away (z −500 to −2400)                            | objects, never text                             |

Stagger related elements by 6 to 12 frames. Never start everything on the same frame.

## Holds

Something always keeps moving while the viewer reads:

- **The camera drifts:** `scale(1 + f × 0.0006)` on a text block, or `translateZ(f × 0.8)` on a window.
- **Objects move:** devices orbit (`rotateY` interpolated across the scene), windows bob (`sin(f / 24) × 8`), grids ripple.

The rule is simple: compare frame `n` and frame `n + 15` of any shot, and something must have moved.

## Exits and transitions

| Exit         | How                                                                                                                             | Where                                             |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| Push-through | the group scales up hard (to ~12×, or `60^t` for flying through a letter's hole) with an ease-in, done by the cut               | opener → hero, hero → next                        |
| Fly-past     | the 3D group moves towards the camera (`translateZ` +1500) while it fades                                                       | laptop, grid icons bursting                       |
| Whip pan     | both shots translate by the frame width on the same eased curve, with a horizontal `Smear` peaking at 70 px mid-whip; 10 frames | between showcases                                 |
| Push-up      | the content rises 120–220 px, blurs and fades in 10–16 frames                                                                   | stat slots, the numbers scene, end-card movements |
| Drop         | devices fall out of frame (+900 px) while the stage light dims                                                                  | phone                                             |

Scene backgrounds are transparent and scenes overlap by their `tail` (6 frames by default), so an exit dissolves into the next entrance. An exit that ends exactly at the cut before a scene that fades in leaves black frames: run it into the tail. Cuts to black are reserved for "One more thing…".

## Easing and springs

| Curve       | Value                   | Use                          |
| ----------- | ----------------------- | ---------------------------- |
| `easeOut`   | bezier 0.16, 1, 0.3, 1  | entrances: fast, long settle |
| `easeIn`    | bezier 0.7, 0, 0.84, 0  | exits: slow start, fast away |
| `easeInOut` | bezier 0.65, 0, 0.35, 1 | camera moves, orbits, whips  |

| Spring config                    | Character        | Use                                             |
| -------------------------------- | ---------------- | ----------------------------------------------- |
| `damping 200, stiffness 40`      | heavy, no bounce | a device rising                                 |
| `damping 20–22, stiffness 42–60` | a light settle   | windows, side phones, a showcase window landing |
| `damping 18, stiffness 60–110`   | a little bounce  | icons, the CTA pill                             |

## 3D

- **Perspective:** set it on an `AbsoluteFill` (1500 to 2200 px). The children use `transformStyle: 'preserve-3d'`.
- **Solid volumes:** `MacBook3D` and `IPhone3D` are built from stacked slices, so their edges stay solid at any angle. Pass `angle` (the parent's `rotateY`) to `IPhone3D` so its flanks and reflections follow the light.
- **Fades:** fade a 3D group by animating the opacity of the plain wrapper around the `preserve-3d` element, never the element itself, which would flatten.
- **Showing a screen:** prefer one of these:
  - turn the device so the screen faces the camera for at least 30 frames;
  - land the window flat, then drift by a few degrees only.

## Rejected on the original, and why

| Rejected                                  | Why                                   | Instead                                                             |
| ----------------------------------------- | ------------------------------------- | ------------------------------------------------------------------- |
| A flat sequence of screenshots            | read as "just images"                 | every screen in a device, window or letters, with a camera move     |
| Badges, pills, glowing chips, "AI" labels | looked machine-made                   | plain type; one accent                                              |
| A screenshot of the employer's product UI | blurry, static, and implied ownership | the UI rebuilt in code, animated, with honest copy ("utilisée par") |
| An animated calendar                      | buggy-looking and slow to read        | a big number of years, with a span of light                         |
| A timeline of cities                      | busy, said little                     | the cities one per beat, then on one line                           |
| A rushed mobile chapter                   | the screens could not be read         | 8 s for three screens, captions per screen, a lineup at the end     |
