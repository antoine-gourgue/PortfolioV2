export const FPS = 30
export const WIDTH = 1080
export const HEIGHT = 1350
/** Horizontal centre of the frame: every scene is laid out around it. */
export const CX = WIDTH / 2

// 120 BPM: a beat is 15 frames, a bar 60. Big cuts land on bars so the
// synthesised soundtrack (audio/synth.py) hits exactly on them.
export const BEAT = 15
export const BAR = 60

/** Number formatting of the counters (37 000, 91,2 %). */
export const LOCALE = 'fr-FR'

export const fonts = {
  display: '"Inter Tight Variable", "Inter Variable", sans-serif',
  body: '"Inter Variable", sans-serif',
}

export const stage = {
  white: '#f5f5f7',
  grey: '#86868b',
  dim: '#2c2c2e',
  blue: '#0071e3',
}
