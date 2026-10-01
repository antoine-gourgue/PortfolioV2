import timeline from './timeline.json'

export type Cue = { type: string; at: number; len?: number; gain?: number }

export type SceneKind =
  | 'opener'
  | 'hero'
  | 'laptop'
  | 'grid'
  | 'showcase'
  | 'numbers'
  | 'phone'
  | 'oneMoreThing'
  | 'end'

/**
 * One scene of the film. `len` is its slot in frames; the next scene starts
 * right after it. `tail` (default 6) extends the scene over the next one so
 * exits and entrances overlap. `item` picks which showcase it shows. `sfx`
 * are sound cues in frames relative to the scene's start (audio/synth.py
 * reads the same file, so moving a scene moves its sounds).
 */
export type Slot = {
  kind: SceneKind
  len: number
  tail?: number
  item?: number
  sfx?: Cue[]
}

export const slots = timeline.scenes as Slot[]

export const placed = slots.map((s, i) => ({
  ...s,
  from: slots.slice(0, i).reduce((a, p) => a + p.len, 0),
}))

export const DURATION = slots.reduce((a, s) => a + s.len, 0)
export const FILM_ID = timeline.id
