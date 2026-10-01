import React from 'react'
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion'
import { CX } from '../config'
import { AnamorphicFlare, StageLight } from '../kit/light'
import { LogoTrace, type Mark } from '../kit/mark'
import { Body, Rise, clamp, ease, easeIn, fitSize } from '../kit/motion'
import { Letters } from '../kit/type'

const LOGO_Y = 560
const LOGO_W = 420

/**
 * A point of light traces the mark, the name builds under it, then the
 * camera pushes through into the next scene.
 */
export const Opener: React.FC<{
  len: number
  name: string
  role: string
  mark: Mark
}> = ({ len, name, role, mark }) => {
  const f = useCurrentFrame()
  const push = interpolate(f, [0, len - 10], [0.9, 1.03])
  const exit = ease(f, [len - 20, len + 4], [0, 1], easeIn)
  const flare = interpolate(f, [50, 58, 86], [0, 0.9, 0], clamp)
  return (
    <AbsoluteFill style={{ background: '#000' }}>
      <StageLight
        y={42}
        opacity={interpolate(f, [40, 70], [0, 1], clamp) * (1 - exit)}
      />
      <AbsoluteFill
        style={{
          transform: `scale(${push * (1 + exit ** 2 * 11)})`,
          transformOrigin: `50% ${LOGO_Y}px`,
          opacity: 1 - ease(f, [len - 6, len + 4], [0, 1]),
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: CX - LOGO_W / 2,
            top: LOGO_Y - (LOGO_W * 3) / 8,
          }}
        >
          <LogoTrace mark={mark} at={4} size={LOGO_W} fillAt={58} />
        </div>
        <div style={{ position: 'absolute', top: 790, width: '100%' }}>
          <Letters text={name} at={68} size={fitSize(name, 92)} silver />
        </div>
        <Rise at={86} style={{ position: 'absolute', top: 910, width: '100%' }}>
          <Body>{role}</Body>
        </Rise>
      </AbsoluteFill>
      <AnamorphicFlare x={CX} y={LOGO_Y} opacity={flare} width={1700} />
    </AbsoluteFill>
  )
}
