export type Cue = { type: string; at: number; len?: number }

export type CueSheet = {
  id: string
  durationInFrames: number
  bpm: number
  /** Frame of the first downbeat; cues before it are a pickup. */
  gridOffset: number
  style: string
  sections: { name: string; from: number; to: number }[]
  sfx: Cue[]
}

/** Frames of every cue of the given type(s), for syncing visuals to SFX. */
export const cueFrames = (sheet: CueSheet, ...types: string[]) =>
  sheet.sfx.filter((c) => types.includes(c.type)).map((c) => c.at)
