import React, { useLayoutEffect, useRef } from 'react'
import { AbsoluteFill, useCurrentFrame } from 'remotion'

/**
 * A pool of cool stage light, the only thing ever lit behind the subject.
 * `x`, `y`, `w`, `h` are percentages of the frame.
 */
export const StageLight: React.FC<{
  x?: number
  y?: number
  w?: number
  h?: number
  opacity?: number
  style?: React.CSSProperties
}> = ({ x = 50, y = 50, w = 60, h = 45, opacity = 1, style }) => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      opacity,
      pointerEvents: 'none',
      background: `radial-gradient(ellipse ${w}% ${h}% at ${x}% ${y}%, rgba(170,200,255,0.16) 0%, rgba(120,150,220,0.05) 45%, transparent 75%)`,
      ...style,
    }}
  />
)

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

/** Film grain over the whole frame; keeps the black stage from banding. */
export const Grain: React.FC<{ opacity?: number }> = ({ opacity = 0.05 }) => {
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

/**
 * Horizontal motion smear for whip pans. An SVG blur on one axis only: a CSS
 * blur cannot be directional. Only mounted while `amount` is non-zero because
 * a filter on a full-frame layer is costly on the software renderer.
 */
export const Smear: React.FC<{
  id: string
  amount: number
  children: React.ReactNode
  style?: React.CSSProperties
}> = ({ id, amount, children, style }) => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      filter: amount > 0.5 ? `url(#${id})` : undefined,
      ...style,
    }}
  >
    {amount > 0.5 && (
      <svg width={0} height={0} style={{ position: 'absolute' }}>
        <filter id={id} x="-20%" y="0" width="140%" height="100%">
          <feGaussianBlur stdDeviation={`${amount} 0`} />
        </filter>
      </svg>
    )}
    {children}
  </div>
)
