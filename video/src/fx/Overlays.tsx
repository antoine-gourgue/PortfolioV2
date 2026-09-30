import React, { useLayoutEffect, useRef } from 'react'
import { AbsoluteFill, Img, interpolate, useCurrentFrame } from 'remotion'

const GRAIN_W = 540
const GRAIN_H = 675
const GRAIN_TILES = 6
let grainCache: ImageData[] | null = null

// Pre-computed noise tiles: an SVG feTurbulence per frame costs seconds on
// the software rasteriser, blitting cached pixels costs nothing.
const grainTiles = () => {
  if (grainCache) return grainCache
  let seed = 1234567
  const rnd = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0
    return seed / 4294967296
  }
  grainCache = Array.from({ length: GRAIN_TILES }, () => {
    const img = new ImageData(GRAIN_W, GRAIN_H)
    for (let i = 0; i < img.data.length; i += 4) {
      // Sum of uniforms: roughly gaussian, like real film grain
      const v = 128 + (rnd() + rnd() + rnd() - 1.5) * 150
      img.data[i] = img.data[i + 1] = img.data[i + 2] = v
      img.data[i + 3] = 255
    }
    return img
  })
  return grainCache
}

export const Grain: React.FC<{ opacity?: number }> = ({ opacity = 0.08 }) => {
  const frame = useCurrentFrame()
  const ref = useRef<HTMLCanvasElement>(null)
  useLayoutEffect(() => {
    const ctx = ref.current?.getContext('2d')
    if (ctx) ctx.putImageData(grainTiles()[frame % GRAIN_TILES], 0, 0)
  }, [frame])
  return (
    <AbsoluteFill
      style={{ pointerEvents: 'none', mixBlendMode: 'overlay', opacity }}
    >
      <canvas
        ref={ref}
        width={GRAIN_W}
        height={GRAIN_H}
        style={{ width: '100%', height: '100%' }}
      />
    </AbsoluteFill>
  )
}

export const Vignette: React.FC<{ strength?: number }> = ({
  strength = 0.65,
}) => (
  <AbsoluteFill
    style={{
      pointerEvents: 'none',
      background: `radial-gradient(ellipse 75% 65% at 50% 50%, transparent 45%, rgba(0,0,0,${strength}) 100%)`,
    }}
  />
)

export const Scanlines: React.FC<{ opacity?: number }> = ({
  opacity = 0.12,
}) => (
  <AbsoluteFill
    style={{
      pointerEvents: 'none',
      opacity,
      backgroundImage:
        'repeating-linear-gradient(0deg, rgba(0,0,0,0.9) 0px, rgba(0,0,0,0.9) 1px, transparent 1px, transparent 4px)',
    }}
  />
)

/** White (or tinted) flash peaking at `at` and decaying over `decay` frames. */
export const Flash: React.FC<{
  at: number
  decay?: number
  attack?: number
  color?: string
  max?: number
}> = ({ at, decay = 12, attack = 2, color = '#fff', max = 1 }) => {
  const frame = useCurrentFrame()
  const opacity =
    frame < at
      ? interpolate(frame, [at - attack, at], [0, max], {
          extrapolateLeft: 'clamp',
        })
      : max * Math.exp(-(frame - at) / (decay / 3))
  if (opacity < 0.002) return null
  return (
    <AbsoluteFill
      style={{ background: color, opacity, mixBlendMode: 'screen' }}
    />
  )
}

/**
 * Soft coloured light sweeping across the frame, the digital stand-in for a
 * film light leak. Pure gradients: a CSS blur this large is too slow on the
 * software renderer.
 */
export const LightLeak: React.FC<{
  start: number
  duration: number
  colors?: [string, string]
  intensity?: number
  direction?: 1 | -1
}> = ({
  start,
  duration,
  colors = ['#ff8a3d', '#ff4fd8'],
  intensity = 0.8,
  direction = 1,
}) => {
  const frame = useCurrentFrame()
  const t = (frame - start) / duration
  if (t < 0 || t > 1) return null
  const envelope = Math.sin(Math.PI * t) ** 1.5 * intensity
  const x = interpolate(t, [0, 1], direction === 1 ? [-30, 130] : [130, -30])
  return (
    <AbsoluteFill
      style={{
        pointerEvents: 'none',
        mixBlendMode: 'screen',
        opacity: envelope,
        background: `radial-gradient(ellipse 55% 70% at ${x}% 35%, ${colors[0]}cc 0%, ${colors[0]}33 40%, transparent 70%),
          radial-gradient(ellipse 40% 50% at ${x + 25 * direction}% 75%, ${colors[1]}aa 0%, transparent 65%)`,
      }}
    />
  )
}

/** Horizontal anamorphic streak, the blue lens flare of a keynote shot. */
export const AnamorphicFlare: React.FC<{
  x: number
  y: number
  opacity: number
  color?: string
  width?: number
}> = ({ x, y, opacity, color = '#6fb6ff', width = 1400 }) => {
  if (opacity <= 0.001) return null
  return (
    <div
      style={{
        position: 'absolute',
        left: x - width / 2,
        top: y - 40,
        width,
        height: 80,
        opacity,
        mixBlendMode: 'screen',
        pointerEvents: 'none',
        background: `radial-gradient(ellipse 50% 6% at 50% 50%, #ffffff 0%, ${color} 30%, transparent 100%),
          radial-gradient(ellipse 8% 45% at 50% 50%, #ffffffcc 0%, transparent 100%)`,
      }}
    />
  )
}

/**
 * Heavily blurred background image. Blurs a quarter-size copy and scales it
 * up: same look as a large CSS blur for a sixteenth of the pixels.
 */
export const SoftImage: React.FC<{
  src: string
  blur: number
  style?: React.CSSProperties
  imgStyle?: React.CSSProperties
}> = ({ src, blur, style, imgStyle }) => (
  <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', ...style }}>
    <div
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '25%',
        height: '25%',
        transform: 'scale(4)',
        transformOrigin: '0 0',
        filter: `blur(${blur / 4}px)`,
      }}
    >
      <Img
        src={src}
        style={{
          position: 'absolute',
          ...imgStyle,
        }}
      />
    </div>
  </div>
)
