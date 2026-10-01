import React from 'react'
import { AbsoluteFill, Audio, Sequence, staticFile } from 'remotion'
import { fonts, stage } from './config'
import { content } from './content'
import type { DeviceLogo } from './kit/devices'
import { Grain } from './kit/light'
import { Monogram } from './kit/mark'
import { EndCard } from './scenes/EndCard'
import { Grid } from './scenes/Grid'
import { Hero } from './scenes/Hero'
import { Laptop } from './scenes/Laptop'
import { Numbers } from './scenes/Numbers'
import { OneMoreThing } from './scenes/OneMoreThing'
import { Opener } from './scenes/Opener'
import { Phone } from './scenes/Phone'
import { Showcase } from './scenes/Showcase'
import { FILM_ID, placed, type Slot } from './timeline'

// An Apple launch film: black stage, silver type, and nothing ever at rest.
// Every scene carries its own slow camera move so no frame is a still.

const logo: DeviceLogo = (size, color) => (
  <Monogram mark={content.mark} size={size} color={color} />
)

/** Content of a scene the timeline uses; missing content is a clear error. */
const need = <T,>(value: T | undefined, slot: Slot): T => {
  if (value === undefined) {
    throw new Error(
      `timeline.json has a "${slot.kind}" scene but content.tsx has nothing for it`
    )
  }
  return value
}

const scene = (slot: Slot, i: number) => {
  const { len } = slot
  const c = content
  switch (slot.kind) {
    case 'opener':
      return <Opener len={len} name={c.name} role={c.role} mark={c.mark} />
    case 'hero':
      return <Hero len={len} {...need(c.hero, slot)} />
    case 'laptop':
      return <Laptop len={len} {...need(c.laptop, slot)} logo={logo} />
    case 'grid':
      return <Grid len={len} {...need(c.grid, slot)} />
    case 'showcase':
      return (
        <Showcase
          len={len}
          id={String(i)}
          show={need(c.showcases[slot.item ?? 0], slot)}
          whipIn={placed[i - 1]?.kind === 'showcase'}
          whipOut={placed[i + 1]?.kind === 'showcase'}
        />
      )
    case 'numbers':
      return <Numbers len={len} {...need(c.numbers, slot)} />
    case 'phone':
      return <Phone len={len} {...need(c.phone, slot)} logo={logo} />
    case 'oneMoreThing':
      return <OneMoreThing len={len} text={need(c.oneMoreThing, slot)} />
    case 'end':
      return (
        <EndCard len={len} {...need(c.end, slot)} name={c.name} mark={c.mark} />
      )
  }
}

export const Film: React.FC<{ withAudio?: boolean }> = ({
  withAudio = true,
}) => (
  // A default face and colour, so no text can fall back to the browser's serif
  <AbsoluteFill
    style={{ background: '#000', fontFamily: fonts.body, color: stage.white }}
  >
    {placed.map((slot, i) => (
      <Sequence
        key={i}
        from={slot.from}
        durationInFrames={slot.len + (slot.tail ?? 6)}
        name={
          slot.kind === 'showcase' ? `showcase ${slot.item ?? 0}` : slot.kind
        }
      >
        {scene(slot, i)}
      </Sequence>
    ))}
    <Grain opacity={0.05} />
    {withAudio && <Audio src={staticFile(`audio/${FILM_ID}.wav`)} />}
  </AbsoluteFill>
)
