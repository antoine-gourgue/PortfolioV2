import { noise2D } from '@remotion/noise'
import React, { useId } from 'react'
import { random, useCurrentFrame } from 'remotion'

/**
 * Digital glitch + chromatic aberration as a single SVG filter pass.
 *
 * - `displace` (px): horizontal band tearing. Bands come from 1D noise
 *   quantised by a discrete transfer table, so most bands stay neutral (0.5)
 *   and only a few tear, like a corrupted video signal.
 * - `split` (px): red/blue channel offset.
 *
 * With both at 0 the children render untouched, so this can wrap a whole
 * scene permanently and be driven by keyframes.
 */
export const Distort: React.FC<{
  displace?: number
  split?: number
  seed?: number
  children: React.ReactNode
  style?: React.CSSProperties
}> = ({ displace = 0, split = 0, seed = 0, children, style }) => {
  const frame = useCurrentFrame()
  const id = `fx-distort-${useId().replace(/[^a-zA-Z0-9]/g, '')}`
  const active = Math.abs(displace) > 0.3 || Math.abs(split) > 0.3

  // Glitches read as "digital" when they hold for 2 frames then jump
  const step = Math.floor(frame / 2) + seed * 131
  const freqY = 0.004 + random(`fy-${step}`) * 0.03

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        filter: active ? `url(#${id})` : undefined,
        ...style,
      }}
    >
      {active && (
        <svg style={{ position: 'absolute', width: 0, height: 0 }}>
          <filter
            id={id}
            x="-5%"
            y="0%"
            width="110%"
            height="100%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency={`0.00001 ${freqY}`}
              numOctaves={1}
              seed={step % 1000}
              result="noise"
            />
            <feComponentTransfer in="noise" result="bands">
              <feFuncR
                type="discrete"
                tableValues="0.5 0.5 0.15 0.5 0.5 0.85 0.5 0.3 0.5 0.5 0.7 0.5"
              />
              <feFuncG type="linear" slope={0} intercept={0.5} />
              <feFuncB type="linear" slope={0} intercept={0.5} />
              <feFuncA type="linear" slope={0} intercept={1} />
            </feComponentTransfer>
            <feDisplacementMap
              in="SourceGraphic"
              in2="bands"
              scale={displace}
              xChannelSelector="R"
              yChannelSelector="G"
              result="torn"
            />
            <feColorMatrix
              in="torn"
              type="matrix"
              values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
              result="r"
            />
            <feOffset in="r" dx={split} dy={0} result="rs" />
            <feColorMatrix
              in="torn"
              type="matrix"
              values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"
              result="g"
            />
            <feColorMatrix
              in="torn"
              type="matrix"
              values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"
              result="b"
            />
            <feOffset in="b" dx={-split} dy={0} result="bs" />
            <feBlend in="rs" in2="g" mode="screen" result="rg" />
            <feBlend in="rg" in2="bs" mode="screen" />
          </filter>
        </svg>
      )}
      {children}
    </div>
  )
}

/**
 * Envelope for glitch bursts: returns 0..1, spiking on the given frames and
 * flickering while it decays (a clean exponential looks too smooth).
 */
export const glitchEnvelope = (
  frame: number,
  hits: number[],
  length = 8
): number => {
  let v = 0
  for (const at of hits) {
    const d = frame - at
    if (d >= 0 && d < length) {
      const decay = 1 - d / length
      const flicker = random(`g-${at}-${d}`) > 0.35 ? 1 : 0.25
      v = Math.max(v, decay * flicker)
    }
  }
  return v
}

/**
 * Camera shake that kicks on impact frames and settles; smooth noise rather
 * than random jumps so it reads as a physical camera.
 */
export const Shake: React.FC<{
  hits: number[]
  amount?: number
  decay?: number
  children: React.ReactNode
}> = ({ hits, amount = 18, decay = 14, children }) => {
  const frame = useCurrentFrame()
  let a = 0
  for (const at of hits) {
    const d = frame - at
    if (d >= 0 && d < decay * 3) a = Math.max(a, Math.exp(-d / (decay / 2)))
  }
  const x = noise2D('shake-x', frame * 0.35, 0) * amount * a
  const y = noise2D('shake-y', frame * 0.35, 5) * amount * a
  const r = noise2D('shake-r', frame * 0.3, 9) * 0.6 * a
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        transform: `translate(${x}px, ${y}px) rotate(${r}deg) scale(${1 + a * 0.02})`,
      }}
    >
      {children}
    </div>
  )
}
