# Sound

The soundtrack is synthesised by `audio/synth.py` from `src/timeline.json`, the same file the scenes are placed from. It is royalty-free by construction, and every effect lands on its frame.

## The timeline format

```json
{
  "id": "Film",
  "bpm": 120,
  "style": "pop",
  "music": [{ "name": "intro", "bars": 2 }, …],
  "scenes": [
    { "kind": "laptop", "len": 236, "sfx": [{ "type": "hit", "at": -4, "gain": 0.8 }] },
    { "kind": "showcase", "item": 0, "len": 80, "tail": 10, "sfx": […] }
  ]
}
```

| Field          | Meaning                                                                                                                                                          |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`           | The composition ID, so also the names of `public/audio/<id>.wav` and `out/<id>.mp4`.                                                                             |
| `bpm`          | Stays at 120: the layouts assume 15 frames per beat.                                                                                                             |
| `style`        | `pop`, or `soft` for the same with lighter drums.                                                                                                                |
| `music`        | Sections in bars (60 frames each), played back to back from frame 0. They should add up to the total of the scenes' `len`; the synth prints a warning otherwise. |
| `scenes[].sfx` | Cues in frames relative to the scene's start. They can be negative to land just before the cut, like the drop under the laptop at −4.                            |

`gain` scales a cue (default 1) and `len` sets the length of the sustained ones.

## Music sections

The section decides what plays. Here is what each section plays:

| Section   | Layers                                                  | Use                                      |
| --------- | ------------------------------------------------------- | ---------------------------------------- |
| `intro`   | pad, soft arpeggio                                      | the opener                               |
| `build`   | pad, kick, accelerating snare roll, arpeggio            | the bar before the drop                  |
| `groove`  | pad, kick, clap, hat, bass, arpeggio                    | the main body                            |
| `groove2` | `groove` with an open hat and the arpeggio an octave up | lift for the showcases                   |
| `lite`    | pad, half-time kick, hat, bass, arpeggio                | the phone chapter: lighter, still moving |
| `break`   | pad, kick on 1, hat, darker chords                      | a breath mid-film                        |
| `hush`    | pad only                                                | "One more thing…"                        |
| `finale`  | pad, kick, hat, bass, arpeggio                          | the end card                             |
| `outro`   | one held tonic chord, faded over the last 1.5 s         | the last bar                             |

The chord loop is vi–IV–I–V in C, bright but not saccharine. The kick ducks the pads and bass (sidechain), and so do `hit` and `impact` cues.

**Drops:** a cut that matters, such as the laptop rising after the hero, should land on the first beat of a new section. Add a `hit` there.

## Sound effects

| Type                               | Sound                                                  | Cue it at                                                                         |
| ---------------------------------- | ------------------------------------------------------ | --------------------------------------------------------------------------------- |
| `whoosh`                           | an airy sweep, 0.8 s                                   | the peak of a big move (a fly-through, a whip, an exit); it starts before its cue |
| `swoosh`                           | a short sweep, 0.45 s                                  | small moves: a window lifting, a phone sliding in                                 |
| `hit`                              | a punchy low thump                                     | drops and big landings                                                            |
| `impact`                           | a heavier hit with a sub tail                          | rare: one per film at most                                                        |
| `swell`                            | a rising pad, `len` frames                             | an opener, the start of a reveal                                                  |
| `riser`                            | noise and a tone rising over `len` frames from the cue | the bar before a drop, ending on it                                               |
| `chime`                            | a bell                                                 | a mark completing, the card appearing                                             |
| `pop`                              | a soft, pitched click                                  | each item of a list or stack landing                                              |
| `tick`                             | a tiny click                                           | a screen powering on                                                              |
| `counter`                          | fast ticks, `len` frames                               | a number counting up (match the counter's duration)                               |
| `scan`                             | a filtered sweep                                       | a field of dots lighting up                                                       |
| `tap`                              | a finger tap                                           | a tap on a phone screen (4 frames before the screen opens)                        |
| `click`                            | a UI click                                             | a button, the CTA appearing                                                       |
| `type`                             | keyboard typing, `len` frames                          | text typed in a UI                                                                |
| `drop`                             | a soft landing                                         | a block dropped into a layout                                                     |
| `notify`, `send`, `ring`, `unlock` | iOS-style cues                                         | notifications and phone moments                                                   |
| `sub`                              | a low drop                                             | silence falling ("One more thing…")                                               |
| `glitch`, `braam`, `tom`, `tail`   | trailer sounds                                         | avoid in the keynote style                                                        |

Whooshes are the quietest bus: they should be felt more than heard. Too many swooshes in a row blur together, so keep them at least 8 frames apart.

## Syncing

- After any change to `timeline.json`, run `npm run audio` before rendering. A stale WAV is the usual cause of sounds landing a beat off.
- When content changes a scene's internal timing, update that scene's cues. For example, the number of end-card beats moves the card. `references/scenes.md` gives the frame of each event.
- To hear a section without rendering everything:

  ```bash
  FRAMES=600-860 npm run render -- out/check.mp4
  ```

## Licensed music instead

Drop the track in `public/audio/` and point the `<Audio>` of `src/Film.tsx` at it. Keep it at 120 BPM with its first downbeat on frame 0, or shift the `Sequence`s, so cuts stay on the beat.

To keep the synthesised effects under it:

1. Set `music` to an empty list; the synth then writes the effects alone. It warns that the music is shorter than the scenes, which is expected here.
2. Play the track and the effects as two `<Audio>` elements, which Remotion mixes.
