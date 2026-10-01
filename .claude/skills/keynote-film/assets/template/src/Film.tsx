import React from 'react'
import { AbsoluteFill, Audio, Sequence, staticFile } from 'remotion'
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

const scene = (slot: Slot, i: number) => {
  const { len } = slot
  const c = content
  switch (slot.kind) {
    case 'opener':
      return <Opener len={len} name={c.name} role={c.role} mark={c.mark} />
    case 'hero':
      return <Hero len={len} {...c.hero} />
    case 'laptop':
      return <Laptop len={len} {...c.laptop} logo={logo} />
    case 'grid':
      return <Grid len={len} {...c.grid} />
    case 'showcase': {
      const prev = placed[i - 1]
      return (
        <Showcase
          len={len}
          id={String(i)}
          show={c.showcases[slot.item ?? 0]}
          whipIn={prev?.kind === 'showcase'}
        />
      )
    }
    case 'numbers':
      return <Numbers len={len} {...c.numbers} />
    case 'phone':
      return <Phone len={len} {...c.phone} logo={logo} />
    case 'oneMoreThing':
      return <OneMoreThing len={len} text={c.oneMoreThing} />
    case 'end':
      return <EndCard len={len} {...c.end} name={c.name} mark={c.mark} />
  }
}

export const Film: React.FC<{ withAudio?: boolean }> = ({
  withAudio = true,
}) => (
  <AbsoluteFill style={{ background: '#000' }}>
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
