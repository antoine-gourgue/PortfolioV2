# Scenes

Every scene receives `len` (its slot in frames, from `timeline.json`) and the matching part of `content.tsx`. Times below are frames from the start of the scene, at 30 fps.

| Scene                         | Content                               | Default length (frames) | Note                                    |
| ----------------------------- | ------------------------------------- | ----------------------- | --------------------------------------- |
| [opener](#opener)             | `name`, `role`, `mark`                | 120                     |                                         |
| [hero](#hero)                 | `content.hero`                        | 124                     |                                         |
| [laptop](#laptop)             | `content.laptop`                      | 236                     |                                         |
| [grid](#grid)                 | `content.grid`                        | 120                     |                                         |
| [showcase](#showcase)         | `content.showcases[item]`             | 80 each                 | `tail` 10 when another showcase follows |
| [numbers](#numbers)           | `content.numbers`                     | 240                     |                                         |
| [phone](#phone)               | `content.phone`                       | 240                     |                                         |
| [oneMoreThing](#onemorething) | `content.oneMoreThing`                | 60                      |                                         |
| [end](#end)                   | `content.end`, plus `name` and `mark` | 240                     | `tail` 0                                |

## opener

**Content:** `name`, `role`, `mark`. Default length 120.

**Timeline:**

| Frame   | What happens                                                                                |
| ------- | ------------------------------------------------------------------------------------------- |
| 4       | The point of light starts tracing the mark (420 px wide, centred at y 560).                 |
| 58      | The mark fills in silver; the anamorphic flare peaks at 58 and is gone by 86.               |
| 68      | The name rises letter by letter (silver, up to 92 px).                                      |
| 86      | The role fades up in grey.                                                                  |
| last 22 | The whole group pushes towards the camera, scaling up to about 12×, and is gone by the cut. |

**Mark:**

- Initials (`{ text: 'CD' }`) draw a ring with the letters inside.
- A real logo is one SVG path: `{ path, viewBox, transform, unit }`. `unit` is path units per viewBox unit, for example 10 for a potrace export wrapped in `scale(0.1,-0.1)`.
- Check the trace on stills at frames 30, 58 and 80.

**Default sounds:** `swell` 0 (58 frames), `chime` 58.

## hero

**Content:** `content.hero` (`word`, `line`, `strip`, `through`). Default length 124.

**Word:**

- One word, ten characters at most: it is set up to 184 px and shrinks to fit 1000 px.
- It is a name or a promise in one word, never a sentence. Examples: the portfolio's name ("AntoineOS"), or for a product whose name the opener already shows, its promise ("Ensemble" for a budget app for couples).

**Strip:**

- The screens shown inside the letters, as `{ media, aspect, zoom?, focus? }`. They are repeated until they outlast the scroll.
- Fill the letters with colour:
  - A dark screenshot makes parts of letters vanish into the stage.
  - A mostly white UI makes plain white letters with specks.
  - Pick colourful screens: hero images, cards, charts, gradients. Or zoom into their colourful part: `zoom: 2.5, focus: [0.7, 0.3]` magnifies the screen 2.5× around a point 70 % across and 30 % down.

**Through:**

- The point the camera flies through, in frame pixels `[x, y]`: the centre of a letter's hole (an O, D, A, b, e…). The demo's "Studio" uses `[746, 638]`, the hole of its final "o".
- Both zooms (the pull-back at the start and the fly-through at the end) use this point, so the hole stays still on screen while everything else scales around it.
- **To set it:**
  1. Render a full-size still in the middle of the scene (`npm run still -- <start + 90>`).
  2. Measure the hole's centre in pixels and set `through`.
  3. Render again: if the hole moved, set `through` to its new position. One or two passes converge.
  4. Check the last frames before the cut (`len-8` to `len-1`): the camera must fall into black, not into a stroke. At 60× a few pixels matter.
- Without `through`, the camera aims at the centre of the word, which is usually a stroke.

**Timeline:**

| Frame   | What happens                                                                                      |
| ------- | ------------------------------------------------------------------------------------------------- |
| 0       | Starts at 5×, so the letters are abstract shapes.                                                 |
| 0–80    | A spring pulls back to 1×.                                                                        |
| 44–84   | A specular sweep crosses the word.                                                                |
| 50      | The line rises below it, at y 800.                                                                |
| last 26 | The camera flies through the letter's hole, done by the cut. After `len` the scene draws nothing. |

**Default sounds:** `whoosh` 0.

## laptop

**Content:** `content.laptop` (`screen`, `beats`, `windows`), plus `logo`. Default length 236.

**Timeline:**

| Frame                           | What happens                                                                         |
| ------------------------------- | ------------------------------------------------------------------------------------ |
| 0                               | The MacBook rises from deep in the scene.                                            |
| 0–len                           | It orbits from 38° to −26°.                                                          |
| 20                              | The lid opens on a spring.                                                           |
| 50–72                           | The screen powers on: black, a flash of white, then the image.                       |
| 70, 82, 94, 106, 118            | The windows lift off the screen one by one into five fixed slots around the machine. |
| 60, then one step after another | The words cut in on the beat.                                                        |
| last 36                         | The machine flies past the camera, the windows scattering.                           |

**Beats:**

- Two to four short words or phrases, like "Un portfolio." / "Un vrai OS." / "Dans le navigateur."
- Mark one `silver: true`: the one that matters.
- They share the time from 60 to `len-36`, on the beat grid.

**Windows:**

- Up to five, landscape (aspect 1.1 to 1.6) reads best.
- Portrait screens are shrunk in width so they never cover the words.
- Use the subject's real windows: an about card, a terminal, an app.

**Default sounds:**

- `hit` −4 (the drop);
- `whoosh` 0;
- `swoosh` 26;
- `tick` 60 (power on);
- one `swoosh` per window at 74, 86, 98, 110, 122;
- `whoosh` 232.

## grid

**Content:** `content.grid` (`title`, `subtitle`, `icons`). Default length 120.

**Icons:**

- 4 to 12. The grid is 3 or 4 columns, centred at y 770.
- An icon is either `{ label, src, pad?, bg? }` or `{ label, color }`, which gives a coloured tile with the initial.
- Use `pad: true` for logos that need breathing room on a tile.

**Timeline:**

| Frame             | What happens                                |
| ----------------- | ------------------------------------------- |
| 2, then every 2.5 | Icons converge from scattered 3D positions. |
| from 40           | A ripple runs through the settled grid.     |
| 26                | The title rises letter by letter.           |
| 48                | The subtitle rises.                         |
| last 26           | The icons burst past the camera.            |

**Title:** a count and a noun ("12 projets."). The subtitle qualifies it ("Tous en ligne. Tous ouverts.").

**Default sounds:** `swell` 0 (30), `hit` 45, `whoosh` 110.

## showcase

**Content:** `content.showcases[item]`. Default length 80. Repeat the scene in the timeline, once per project or feature. Give `tail` 10 to every showcase followed by another one: that is the whip.

**Fields:**

| Field             | What it holds                                                                                                                                                                                                                                                                                                                         |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`            | The project name, up to 104 px silver. A giant dark copy drifts behind the window.                                                                                                                                                                                                                                                    |
| `tag`             | Six words at most: what it is for, not how it is built.                                                                                                                                                                                                                                                                               |
| `device`          | `'browser'` (default): the screen in a browser window 880 px wide. `'phone'`: a mobile screen in an iPhone that turns towards us; add `android: true` for an Android phone.                                                                                                                                                           |
| `media`, `aspect` | The screenshot, and for a browser its width / height (default 1.6).                                                                                                                                                                                                                                                                   |
| `layers`          | 1 to 4 crops `[x, y, w, h]`, as fractions of the screenshot: its main UI blocks (a header, a card, a chart). They hover at different depths, then land in place as the window settles. On a phone they also drift outwards before landing. Pick blocks that make sense on their own: measure them on a full-size still of the screen. |
| `proof`           | One proof point, shown from frame 24 (see below).                                                                                                                                                                                                                                                                                     |

**Proof:**

- `{ kind: 'stack', items }`: the technologies, one per beat. Three or four at most.
- `{ kind: 'ring', value, pct, suffix, label, sub }`: a score filling a ring, its number counting up.
- `{ kind: 'line', text }`: one short sentence.

**Whip:** a showcase that follows another whips in from the right; the first one fades in. A showcase followed by another whips out over its `tail`. The last of a run lifts away and blurs out over its last 8 frames instead, so it never smears across the next scene's entrance.

**Default sounds:** a stack gets a `pop` per item at 24, 30, 36…, a ring gets a `counter` at 26 (36 frames). The whip out is a `whoosh` at 82, and the last showcase's lift is a `swoosh` at 76.

## numbers

**Content:** `content.numbers` (`header`, `stats`). Default length 240.

**Header:** stays at the top: "Company · Role".

**Each stat:**

- `kicker`: the grey line above, which reads into the number ("Une plateforme utilisée par").
- `value`, `decimals`, `suffix`: the number counts from 0 over 30 frames, from the start of its slot plus 2.
- `unit`: the white line below it ("points de vente").
- `visual`: optional, see below.
- `len`: its slot length. The last stat runs to the end of the scene.

**Visuals:**

- `{ kind: 'timeline', from, to }`: a span of time drawn by light. Use it for durations.
- `{ kind: 'window', media, aspect }`: the product itself, tilting. Use it for "used by N". It needs a slot of about 100 frames.
- `{ kind: 'dots', cols, rows }`: one point per unit, lit by a wave. Use it for counts up to a few thousand; small counts get bigger dots.
- `{ kind: 'meter', max }`: a score out of `max` (10 at most), segments lighting up in step with the counter. Use it for a rating such as "4,8 / 5" (with `decimals: 1, suffix: ' / 5'`). A ring reads as a loading spinner there.

Each stat is centred vertically under the header, so a short visual doesn't leave the bottom of the frame empty.

**Exit:** each stat pushes up and blurs out over the last 10 frames of its slot, and the whole scene lifts away from `len-16` into its tail.

**Default sounds:** a `counter` at each stat's start + 2, a `swoosh` when a window rises, a `scan` when dots light up.

## phone

**Content:** `content.phone` (`title`, `flow`, `captions`, `side`), plus `logo`. Default length 240.

**Timeline:**

| Frame   | What happens                                                                                                                |
| ------- | --------------------------------------------------------------------------------------------------------------------------- |
| 0–58    | The iPhone turns from its back, so the titanium and camera catch the light. Its screen wakes as it faces us.                |
| 58–92   | The camera moves in.                                                                                                        |
| 24      | The title rises letter by letter.                                                                                           |
| 150     | The two `side` phones arrive on springs, and the main phone steps back into a lineup of three.                              |
| last 14 | Everything drops out of frame, into the tail; the title clears first, by `len-4`, so it never meets the next scene's title. |

**Flow:**

- The main phone's screens: `{ at, media, from }`. Each one opens from the point `from` (fractions of the screen) that was tapped just before. A tap ring shows 6 frames earlier.
- Three steps fit: 0, 66, 112.

**Captions:** `{ at, text }`, one at a time under the title. Time each one with its screen.

**Side phones:** two `{ media, android? }`. For an app on both stores, make one of them Android: three iPhones would say iOS only.

**Placement:** for an app, put this scene right after the hero, on the drop: the phone is the product reveal.

**Default sounds:** `whoosh` 6, a `tap` 4 frames before each step, a `swoosh` for each side phone at 152 and 160.

## oneMoreThing

**Content:** `content.oneMoreThing`. Default length 60.

**What happens:** one grey line, letter by letter, on pure black, slowly growing. The music section `hush` sits under it. Use it before the payoff only, never twice.

**Default sounds:** `sub` 0.

## end

**Content:** `content.end` (`word`, `line`, `sub`, `lead`, `beats`, `cta`), plus `name` and `mark`. Default length 240, with `tail` 0.

**Three movements:**

1. **Headline, 0–84:**
   - `word` in big silver ("Disponible."), with a scale-in from blur.
   - `line` in white below it ("En CDI, dès octobre 2026.").
   - `sub` in grey.
2. **List, from 84:**
   - `lead` ("Pour un poste à"), then each `beats` item alone, one per beat (15 frames), silver, with a final period.
   - Then all of them on one line, separated by " · ".
3. **Card:**
   - Starts at `84 + 15 × beats + 24`.
   - The mark is traced again, the name rises, and the link pops in on a blue pill. The pill is the one accent of the film.

**Length:** keep `beats` to five at most. With more, lengthen the scene so the card still holds about 2 seconds before the final fade (the last 22 frames).

**Default sounds** (for three beats):

- `hit` 4;
- one `pop` per beat at 84, 99, 114;
- `swoosh` when the row forms;
- `whoosh` at the card;
- `chime` at the card + 14;
- `click` at the card + 24.

Recompute them in `timeline.json` when the number of beats changes.
