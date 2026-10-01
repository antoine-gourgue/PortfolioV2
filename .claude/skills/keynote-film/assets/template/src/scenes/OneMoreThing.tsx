import React from 'react'
import { AbsoluteFill, useCurrentFrame } from 'remotion'
import { ease, fitSize } from '../kit/motion'
import { Letters } from '../kit/type'

/** The pause before the payoff: one line on black, the music drops out. */
export const OneMoreThing: React.FC<{ len: number; text: string }> = ({
  len,
  text,
}) => {
  const f = useCurrentFrame()
  return (
    <AbsoluteFill
      style={{
        background: '#000',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          transform: `scale(${1 + f * 0.0012})`,
          opacity: 1 - ease(f, [len - 10, len + 2], [0, 1]),
        }}
      >
        <Letters
          text={text}
          at={6}
          size={fitSize(text, 92)}
          weight={600}
          stagger={1.4}
          color="#d2d2d7"
        />
      </div>
    </AbsoluteFill>
  )
}
