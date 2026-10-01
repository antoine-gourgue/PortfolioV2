import type { Mark } from './kit/mark'
import type { Media } from './kit/screens'
import type { Beat } from './kit/type'

/** A screen with its proportions; `aspect` is width / height. */
export type Framed = { media: Media; aspect: number }

/**
 * A screen inside the hero's letters. `zoom` (default 1) magnifies it around
 * `focus` (fractions of the screen, default the centre), to fill the letters
 * with the colourful part of a mostly white UI.
 */
export type StripTile = Framed & { zoom?: number; focus?: [number, number] }

/** A phone in a lineup or on the cover. */
export type PhoneShot = { media: Media; android?: boolean }

/** An app icon: an image under `public/`, or a coloured tile with initials. */
export type Icon = {
  label: string
  src?: string
  color?: string
  bg?: string
  pad?: boolean
}

/** Part of a screenshot, as fractions of it: x, y, width, height. */
export type Crop = [number, number, number, number]

/** The one proof point under a showcase. */
export type Proof =
  | {
      kind: 'ring'
      value: number
      pct: number
      decimals?: number
      suffix?: string
      label: string
      sub?: string
      colors?: [string, string]
    }
  | { kind: 'stack'; items: string[] }
  | { kind: 'line'; text: string }

export type Showcase = {
  name: string
  tag: string
  /** `browser` (default): a desktop screen in a window; `phone`: a mobile screen in an iPhone. */
  device?: 'browser' | 'phone'
  android?: boolean
  media: Media
  /** Width / height of the screen (default 1.6); ignored on a phone. */
  aspect?: number
  /** UI blocks that hover above the screen before landing in place. */
  layers: Crop[]
  proof: Proof
}

export type StatVisual =
  | { kind: 'timeline'; from: string; to: string }
  | { kind: 'dots'; cols?: number; rows?: number }
  | { kind: 'window'; media: Media; aspect: number }
  /** A score out of `max` (≤ 10): segments lit up to the stat's value. */
  | { kind: 'meter'; max: number }

export type Stat = {
  kicker: string
  value: number
  decimals?: number
  suffix?: string
  unit?: string
  visual?: StatVisual
  /** Frames this stat holds; the last one runs to the end of the scene. */
  len?: number
}

/** A screen of the phone, opening from the point tapped (0-1) before it. */
export type PhoneStep = { at: number; media: Media; from?: [number, number] }

/**
 * Everything the film says and shows. A scene's content is only needed if
 * the timeline uses that scene.
 */
export type Content = {
  name: string
  role: string
  mark: Mark
  hero?: {
    word: string
    line: string
    /** Colourful screens scrolling inside the letters. */
    strip: StripTile[]
    /**
     * The point the camera flies through, in frame pixels: the centre of a
     * letter's hole, measured on a full-size still of the hero. It is the
     * fixed point of the scene's zoom, so any frame of it will do.
     */
    through?: [number, number]
  }
  laptop?: { screen: Media; beats: Beat[]; windows: Framed[] }
  grid?: { title: string; subtitle: string; icons: Icon[] }
  showcases: Showcase[]
  numbers?: { header: string; stats: Stat[] }
  phone?: {
    title: string
    flow: PhoneStep[]
    captions: { at: number; text: string }[]
    side: PhoneShot[]
  }
  oneMoreThing?: string
  end?: {
    word: string
    line: string
    sub: string
    lead: string
    beats: string[]
    cta: string
  }
  thumb: {
    hook: [string, string]
    foot: string
    sub: string
    /** Without a laptop, the cover shows two phones. */
    laptop?: Media
    phone: PhoneShot
    phone2?: PhoneShot
  }
}
