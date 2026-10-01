import React from 'react'
import { Easing, interpolate, random, useCurrentFrame } from 'remotion'
import { fonts, stage } from '../config'

export const clamp = {
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
} as const

export const easeOut = Easing.bezier(0.16, 1, 0.3, 1)
export const easeInOut = Easing.bezier(0.65, 0, 0.35, 1)
export const easeIn = Easing.bezier(0.7, 0, 0.84, 0)

/** Clamped, eased interpolation: the one curve call every scene uses. */
export const ease = (
  f: number,
  range: [number, number],
  out: [number, number],
  easing = easeInOut
) => interpolate(f, range, out, { ...clamp, easing })

/**
 * Largest font size, up to `max`, at which `text` fits in `width` pixels.
 * Templated copy changes length; a heading that overflows the frame is the
 * first thing a viewer notices. `em` is the average glyph width: 0.56 for
 * words, about 0.66 for bold figures.
 */
export const fitSize = (text: string, max: number, width = 960, em = 0.56) =>
  Math.min(max, Math.floor(width / (Array.from(text).length * em)))

/** Secondary copy: grey, medium weight, centred. */
export const Body: React.FC<{
  children: React.ReactNode
  size?: number
  color?: string
  weight?: number
  style?: React.CSSProperties
}> = ({ children, size = 42, color = stage.grey, weight = 500, style }) => (
  <div
    style={{
      fontFamily: fonts.display,
      fontSize: size,
      fontWeight: weight,
      letterSpacing: '-0.02em',
      lineHeight: 1.2,
      color,
      textAlign: 'center',
      ...style,
    }}
  >
    {children}
  </div>
)

/** Fade-up with a touch of blur, the build of every secondary line. */
export const Rise: React.FC<{
  at: number
  children: React.ReactNode
  y?: number
  style?: React.CSSProperties
}> = ({ at, children, y = 30, style }) => {
  const f = useCurrentFrame()
  const t = ease(f, [at, at + 16], [0, 1], easeOut)
  return (
    <div
      style={{
        opacity: t,
        transform: `translateY(${(1 - t) * y}px)`,
        filter: t < 1 ? `blur(${(1 - t) * 8}px)` : undefined,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

/** Deterministic 3D start positions for things that fly into a layout. */
export const scatter3D = (i: number, seed: string) => ({
  x: (random(`${seed}-x-${i}`) - 0.5) * 2200,
  y: (random(`${seed}-y-${i}`) - 0.5) * 1800,
  z: -1200 - random(`${seed}-z-${i}`) * 2400,
  rx: (random(`${seed}-rx-${i}`) - 0.5) * 180,
  ry: (random(`${seed}-ry-${i}`) - 0.5) * 360,
})
