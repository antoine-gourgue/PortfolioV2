---
name: keynote-film
description: Make an Apple-keynote-style motion design video in code (Remotion + React), from a ready-to-render template modelled on Antoine Gourgue's "Keynote" video CV. The look is a black stage, silver type, a 3D MacBook and iPhone, every shot moving, and a soundtrack synthesised on the beat. Use it whenever someone wants a motion design video, a video CV ("CV vidéo"), a launch film or teaser for an app, product, portfolio or side project, a "vidéo façon Apple / keynote", or a video for LinkedIn, Instagram or a website. Use it too when they ask to reuse "le modèle de la Keynote", even if they never mention Remotion or code.
---

# Keynote film

This skill produces a launch film in the style of an Apple event. Every frame is a React component rendered by [Remotion](https://www.remotion.dev).

The template in `assets/template/` renders as is, with demo content and stand-in screens drawn in code. The default film is:

- 54 seconds, 1080 × 1350 (4:5, the format that takes the most room in a LinkedIn or Instagram feed), 30 fps;
- an H.264 MP4 with music and sound effects.

The work is mostly editorial:

- **Copy and screens** go in `src/content.tsx`.
- **The pacing** lives in `src/timeline.json`.
- **Review frames** before you render.

The template comes from the film Antoine Gourgue made for his job search (`video/src/videos/Keynote.tsx` in the PortfolioV2 repository). Each rule below was paid for by a round of his feedback. Keep to them unless the user asks otherwise.

## The film

| Scene          | Default    | What happens                                                                      |
| -------------- | ---------- | --------------------------------------------------------------------------------- |
| `opener`       | 4 s        | A point of light traces the mark; the name builds letter by letter, then the role |
| `hero`         | 4 s        | One big word, screens scrolling inside its letters; the camera flies through it   |
| `laptop`       | 8 s        | A MacBook rises and opens, windows lift off its screen, three words on the beat   |
| `grid`         | 4 s        | App icons converge out of deep space into a grid: "9 projets."                    |
| `showcase` × 3 | 2.7 s each | A project: name, tagline, exploded 3D window, one proof point; whip pans between  |
| `numbers`      | 8 s        | Up to three big silver numbers counting up, each with a visual for scale          |
| `phone`        | 8 s        | An iPhone turns out of the dark, wakes, navigates; two more join it               |
| `oneMoreThing` | 2 s        | The pause: one line on black, the music drops out                                 |
| `end`          | 8 s        | "Disponible." → a list on the beat (cities, platforms…) → mark, name, link        |

Scenes are optional and can be reordered or repeated. The story comes first: a product launch might drop `numbers` and `grid`, a portfolio might add showcases. `references/scenes.md` gives each scene's props, timings and limits.

## Workflow

### 1. Brief

Collect what the film needs. Ask only for what is missing, in the user's language.

- **Purpose:** the goal (job search, launch, portfolio) and where it will be posted.
- **Hero:** the subject's name, role and mark (an SVG path, or initials), plus the hero word and its one-line promise.
- **Showcases:** two to four of them, each with a name, a tagline of six words at most, a screenshot and one proof (a stack, a score, a result).
- **Numbers:** up to three, each with its exact wording. If a figure describes a third party, such as an employer, a client or a platform, check it on the web and use its real unit. "37 000 points de vente" and "37 000 utilisateurs" are different claims.
- **Phone screens:** two or three screens, if there is a mobile story.
- **End card:** the headline, the list (cities, platforms) and the link.

**Screenshots:**

- Desktop around 2880 × 1800, mobile around 1170 × 2532.
- Light themes read best on the black stage.
- No screenshot yet? The mocks (`{ mock: 'web' | 'desktop' | 'mobile', title, accent }`) give a credible first cut.

### 2. Scaffold

```bash
cp -r <skill-dir>/assets/template <project>/film
cd <project>/film && npm install
pip install numpy scipy pillow     # soundtrack and contact sheets
```

- **Assets:** put screenshots and icons in `public/footage/` and reference them as `'footage/name.jpg'`.
- **Browser:** Remotion downloads a headless Chrome on first run. A Playwright install is picked up automatically, or `REMOTION_BROWSER` can point to one.

### 3. Write the content

`src/content.tsx` is the only file a first cut needs; `src/types.ts` documents every field. Copy is short:

- hero and scene titles: three words at most;
- taglines and captions: six words at most;
- one idea per line.

Write in the user's language with proper typography: ’ « » and French number spacing, which the counters already format through `LOCALE` in `config.ts`.

When a product is the heart of the story, rebuild its key screen as a React component and pass the element as the media. Antoine's film did this for the Digitaleo editor. The rebuilt UI stays crisp in 3D and can animate: typing, a block dropped in, a switch to mobile. A screenshot can't.

### 4. Pace the timeline

`src/timeline.json` lists the scenes in order:

- `kind` and `len` (frames);
- `tail`: frames the scene runs over the next one, for overlapping exits;
- `item`: which showcase to show;
- `sfx`: sound cues in frames relative to the scene.

`music` gives the soundtrack's sections in bars. The scenes and the soundtrack read this same file, so moving a scene moves its sounds. See `references/sound.md`.

**Pacing rules:**

- **The grid:** 120 BPM, so a beat is 15 frames and a bar 60. Scene lengths are multiples of 15. Big cuts land on a bar, or within 4 frames of one.
- **Reading time:** a line of text stays readable for at least 45 frames, and for at least 60 if it runs to seven words or more.
- **Screens:** a screen the viewer has to understand (a UI, a step of the phone flow) holds at least 30 frames once it has landed. Show no more than three phone screens in 8 seconds: the mobile chapter of the original felt rushed until it got this room.
- **Music:** the `music` bars should add up to the scenes' total; `npm run audio` warns otherwise.

### 5. Look before you render

```bash
npm run review              # out/review/sheet.png: 3 frames per scene, ~1 min
npm run still -- 640 980    # full-size frames into out/stills/
```

Open the contact sheet and look at it. Every rendered minute costs 15 to 20 minutes, and a still costs 2 seconds. Go through the QA checklist in `references/delivery.md`; the common misses are:

- text overflowing or colliding;
- a screen covering a title;
- a dark screen sinking into the stage;
- a scene with no motion between two frames.

Fix, re-run, repeat. Check a scene's motion by rendering several frames of it.

### 6. Sound, then render

```bash
npm run audio                         # public/audio/Film.wav from the timeline
npm run render                        # out/Film.mp4; run it in the background
FRAMES=840-1080 npm run render        # just one section, to check motion and sync
scripts/encode.sh out/Film.mp4        # out/Film-web.mp4, the most compatible upload
ID=Thumb npm run still -- 0           # cover image from src/Thumb.tsx
```

Re-run `npm run audio` after any timeline change. Render in the background and poll its log. If you have to stop it, kill the process by PID: `pkill -f` can match your own shell.

### 7. Deliver

Give the user:

- the MP4, plus the `-web` encode if they upload it somewhere;
- the duration and the size;
- what is a placeholder (mocks, demo figures) and still needs their input.

`references/delivery.md` covers platform specifics. One LinkedIn issue in particular: a custom thumbnail made the upload hang at 0 %.

## The look

These rules come from the original film's feedback rounds. `references/grammar.md` has the full motion vocabulary.

1. **Nothing is ever at rest.**
   - **Camera:** every scene carries its own slow camera move (push, orbit, drift), and every element enters with motion: letters rising out of a blur, a word cutting in on the beat, a window landing.
   - **Why:** a frame where nothing moves reads as a slideshow. "C'est juste des images" was the first and hardest note on the original.
2. **Screens never sit flat.** They are inside a device, in a window turning in 3D, inside letters, or exploded into floating layers. Never a full-frame screenshot.
3. **One stage, one light.**
   - **Stage:** black, with a single pool of cool light behind the subject.
   - **Type colours:** silver with a travelling highlight for hero words, white for statements, grey (`#86868b`) for secondary lines.
   - **Accent:** at most one, the blue of the call to action.
4. **Type carries the message.** No badges, pills, chips, glows, emoji or icon bullets. They made the original look AI-generated and were removed. A label is plain type in the accent colour; an annotation is a thin line and a word.
5. **No infographic gadgets.**
   - **What was cut:** an animated calendar and a timeline of cities were rejected outright.
   - **What works instead:** a list said one word per beat, or a big number with one visual for scale.
6. **Honest copy.** Keep the subject's role separate from their employer's product: "une plateforme utilisée par 37 000 points de vente", never "mon éditeur" for a product that isn't theirs. Use exact figures with their real unit, and the real city names the user gives.
7. **Verify every wordmark and logo letter by letter** on a full-size still. The original shipped a draft where the "D" of a logo did not render.

## Technical pitfalls

- **3D and opacity:** opacity or filter on an element with `transform-style: preserve-3d` flattens it. Animate the opacity of a plain wrapper around the 3D element, as `Laptop` and `Phone` do.
- **Pure frames:** use Remotion's `random(seed)`, never `Math.random()` or `Date`, so every frame is a pure function of its number.
- **Overlapping scenes:** they need transparent backgrounds where they overlap, or the later one hides the earlier one's exit. Showcases share one pan so the whip stays edge to edge.
- **Hand-offs:** in a screen-to-screen transition, the outgoing layer must animate as leaving, not re-enter. Otherwise the hand-off flashes black.
- **Filters:** large filters (blur, SVG) on full-frame layers are slow on the software renderer. Mount them only while they are visible, as `Smear` does for whips.
- **Fonts:** `src/fonts.ts` holds the render until fonts are loaded. Add any new face there, or the first frames render in a fallback font.
- **ffmpeg:** Remotion's bundled ffmpeg lacks several filters (`fps`, `setsar`, `fade`). `scripts/encode.sh` only uses options it supports, and prefers a system ffmpeg when there is one.

## Adapting the template

- **Another format (9:16, 16:9):** change `WIDTH`/`HEIGHT` in `src/config.ts`. Then re-place the vertical positions: the scenes are laid out in pixels for a 1350-pixel-high frame, and the horizontal centre already follows `CX`. Check every scene with `npm run review`.
- **A new scene:**

  1. Add `src/scenes/X.tsx`, taking `len` as a prop.
  2. Register its `kind` in `src/timeline.ts` and in the `switch` of `src/Film.tsx`.
  3. Place it in `timeline.json`.

  Follow the house structure: a black or transparent `AbsoluteFill`, a `StageLight`, one continuous camera move, an entrance from frame 0, and an exit over the last 15 to 25 frames that overlaps the next scene through `tail`.

- **The reference implementation:** in the PortfolioV2 repository, `video/src/videos/Keynote.tsx` is the original film. It also has extras such as the rebuilt Digitaleo editor in `video/src/ui/DigitaleoEditor.tsx`.

## References

- `references/scenes.md`: each scene's content, timings, default sounds and limits. Read it when filling the content or changing the timeline.
- `references/grammar.md`: the motion vocabulary (entrances, exits, camera, easing, springs, type scale, layout zones). Read it before writing or changing a scene.
- `references/sound.md`: the timeline format, music sections, sound-effect types and sync conventions.
- `references/delivery.md`: render times, the QA checklist, encoding, LinkedIn and web delivery, the cover image.
