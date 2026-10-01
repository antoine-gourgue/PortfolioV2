import type { Mark } from './kit/mark'
import type { Media } from './kit/screens'
import type { Beat } from './kit/type'

/** A screen with its proportions; `aspect` is width / height. */
export type Framed = { media: Media; aspect: number }

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
  media: Media
  aspect: number
  /** UI blocks that hover above the screen before landing in place. */
  layers: Crop[]
  proof: Proof
}

export type StatVisual =
  | { kind: 'timeline'; from: string; to: string }
  | { kind: 'dots'; cols?: number; rows?: number }
  | { kind: 'window'; media: Media; aspect: number }

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

export type Content = {
  name: string
  role: string
  mark: Mark
  hero: {
    word: string
    line: string
    /** Bright screens scrolling inside the letters. */
    strip: Framed[]
    /** Transform-origin the camera flies through, inside the word's box. */
    through?: string
  }
  laptop: { screen: Media; beats: Beat[]; windows: Framed[] }
  grid: { title: string; subtitle: string; icons: Icon[] }
  showcases: Showcase[]
  numbers: { header: string; stats: Stat[] }
  phone: {
    title: string
    flow: PhoneStep[]
    captions: { at: number; text: string }[]
    side: Media[]
  }
  oneMoreThing: string
  end: {
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
    laptop: Media
    phone: Media
  }
}
