import React from 'react'
import {
  Easing,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion'
import { asset, colors, fonts } from '../brand'

export const clamp = {
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
} as const

export const easeOut = Easing.bezier(0.16, 1, 0.3, 1)
export const easeInOut = Easing.bezier(0.65, 0, 0.35, 1)
export const easeIn = Easing.bezier(0.7, 0, 0.84, 0)

/** 0..1 over [start, start + duration] with the house ease-out. */
export const useProgress = (
  start: number,
  duration: number,
  ease = easeOut
) => {
  const frame = useCurrentFrame()
  return interpolate(frame, [start, start + duration], [0, 1], {
    ...clamp,
    easing: ease,
  })
}

export const useSpring = (
  delay: number,
  config: { damping?: number; stiffness?: number; mass?: number } = {}
) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  return spring({
    frame: frame - delay,
    fps,
    config: { damping: 18, stiffness: 120, mass: 1, ...config },
  })
}

/**
 * macOS window chrome around arbitrary content. Traffic lights and title bar
 * are drawn, not screenshotted, so they stay crisp at any 3D scale.
 */
export const MacWindow: React.FC<{
  width: number
  height: number
  title?: string
  dark?: boolean
  src?: string
  radius?: number
  children?: React.ReactNode
  style?: React.CSSProperties
  glow?: string
}> = ({
  width,
  height,
  title,
  dark = true,
  src,
  radius = 16,
  children,
  style,
  glow,
}) => {
  const bar = 38
  return (
    <div
      style={{
        width,
        height,
        borderRadius: radius,
        overflow: 'hidden',
        background: dark ? '#1c1c1e' : '#f5f5f7',
        boxShadow: `0 40px 120px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,${dark ? 0.12 : 0.5})${glow ? `, 0 0 90px ${glow}55` : ''}`,
        position: 'relative',
        ...style,
      }}
    >
      <div
        style={{
          height: bar,
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px',
          gap: 8,
          background: dark ? '#2a2a2d' : '#e8e8ed',
          borderBottom: `1px solid ${dark ? '#000' : '#d2d2d7'}`,
          position: 'relative',
        }}
      >
        {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
          <div
            key={c}
            style={{ width: 13, height: 13, borderRadius: 7, background: c }}
          />
        ))}
        {title && (
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              textAlign: 'center',
              fontFamily: fonts.body,
              fontWeight: 600,
              fontSize: 15,
              color: dark ? '#d1d1d6' : '#3a3a3c',
            }}
          >
            {title}
          </div>
        )}
      </div>
      <div
        style={{ position: 'absolute', top: bar, left: 0, right: 0, bottom: 0 }}
      >
        {src && (
          <Img
            src={src}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'top',
            }}
          />
        )}
        {children}
      </div>
    </div>
  )
}

/**
 * Words rising out of a mask one after another, the standard keynote
 * reveal. `exit` (frame) plays the reverse, words leaving upwards.
 */
export const RevealText: React.FC<{
  text: string
  start: number
  size: number
  weight?: number
  color?: string
  stagger?: number
  exit?: number
  font?: string
  tracking?: number
  align?: 'center' | 'left'
  gradient?: string
  lineHeight?: number
  style?: React.CSSProperties
}> = ({
  text,
  start,
  size,
  weight = 800,
  color = colors.white,
  stagger = 3,
  exit,
  font = fonts.display,
  tracking = -0.03,
  align = 'center',
  gradient,
  lineHeight = 1.02,
  style,
}) => {
  const frame = useCurrentFrame()
  const lines = text.split('\n')
  let index = 0
  return (
    <div
      style={{
        fontFamily: font,
        fontWeight: weight,
        fontSize: size,
        letterSpacing: `${tracking}em`,
        lineHeight,
        color,
        textAlign: align,
        ...style,
      }}
    >
      {lines.map((line, li) => (
        <div
          key={li}
          style={{
            display: 'flex',
            justifyContent: align === 'center' ? 'center' : 'flex-start',
            flexWrap: 'wrap',
            columnGap: '0.24em',
          }}
        >
          {line.split(' ').map((word, wi) => {
            const i = index++
            const inT = interpolate(
              frame,
              [start + i * stagger, start + i * stagger + 16],
              [0, 1],
              { ...clamp, easing: easeOut }
            )
            const outT =
              exit === undefined
                ? 0
                : interpolate(
                    frame,
                    [exit + i * 1.5, exit + i * 1.5 + 12],
                    [0, 1],
                    { ...clamp, easing: easeIn }
                  )
            const y = (1 - inT) * 105 - outT * 105
            return (
              <span
                key={wi}
                style={{
                  display: 'inline-block',
                  overflow: 'hidden',
                  // Room for descenders and the gradient clip
                  padding: '0.06em 0.02em 0.12em',
                  margin: '-0.06em -0.02em -0.12em',
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    transform: `translateY(${y}%)`,
                    filter: `blur(${(1 - inT) * 8 + outT * 8}px)`,
                    ...(gradient
                      ? {
                          backgroundImage: gradient,
                          WebkitBackgroundClip: 'text',
                          backgroundClip: 'text',
                          color: 'transparent',
                        }
                      : {}),
                  }}
                >
                  {word}
                </span>
              </span>
            )
          })}
        </div>
      ))}
    </div>
  )
}

/** Monospace typing with a block caret. `cps` is characters per second. */
export const Typewriter: React.FC<{
  text: string
  start: number
  cps?: number
  caret?: boolean
  style?: React.CSSProperties
  render?: (visible: string) => React.ReactNode
}> = ({ text, start, cps = 28, caret = true, style, render }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const n = Math.max(0, Math.floor(((frame - start) / fps) * cps))
  const visible = text.slice(0, n)
  const typing = n > 0 && n < text.length
  const blink = typing || Math.floor(frame / 15) % 2 === 0
  return (
    <span style={{ whiteSpace: 'pre', ...style }}>
      {render ? render(visible) : visible}
      {caret && (
        <span
          style={{
            display: 'inline-block',
            width: '0.6em',
            height: '1.15em',
            verticalAlign: 'text-bottom',
            background: colors.sky,
            opacity: blink ? 1 : 0,
            marginLeft: 2,
          }}
        />
      )}
    </span>
  )
}

export const Counter: React.FC<{
  to: number
  start: number
  duration?: number
  prefix?: string
  suffix?: string
  decimals?: number
  style?: React.CSSProperties
}> = ({
  to,
  start,
  duration = 40,
  prefix = '',
  suffix = '',
  decimals = 0,
  style,
}) => {
  const frame = useCurrentFrame()
  const t = interpolate(frame, [start, start + duration], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.2, 0.8, 0.2, 1),
  })
  return (
    <span style={{ fontVariantNumeric: 'tabular-nums', ...style }}>
      {prefix}
      {new Intl.NumberFormat('fr-FR', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }).format(to * t)}
      {suffix}
    </span>
  )
}

/** Monochrome simple-icons SVG, recoloured through a CSS mask. */
export const TechIcon: React.FC<{
  icon: string
  size: number
  color?: string
  style?: React.CSSProperties
}> = ({ icon, size, color = colors.white, style }) => {
  const url = `url(${asset(icon)})`
  return (
    <div
      style={{
        width: size,
        height: size,
        background: color,
        WebkitMaskImage: url,
        maskImage: url,
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
        ...style,
      }}
    />
  )
}

/** The AG monogram, same path as components/ui/AGLogo.vue. */
export const AGLogo: React.FC<{
  size: number
  color?: string
  style?: React.CSSProperties
  drawProgress?: number
  strokeWidth?: number
}> = ({
  size,
  color = colors.white,
  style,
  drawProgress,
  strokeWidth = 45,
}) => {
  const drawing = drawProgress !== undefined && drawProgress < 1
  return (
    <svg
      viewBox="0 0 400 300"
      width={size}
      height={(size * 3) / 4}
      style={{ overflow: 'visible', ...style }}
    >
      <g transform="translate(0,300) scale(0.1,-0.1)">
        <path
          d={AG_PATH}
          fill={drawing ? 'none' : color}
          stroke={drawing ? color : 'none'}
          strokeWidth={drawing ? strokeWidth : 0}
          pathLength={1}
          strokeDasharray={drawing ? 1 : undefined}
          strokeDashoffset={drawing ? 1 - (drawProgress ?? 0) : undefined}
        />
      </g>
    </svg>
  )
}

export const AG_PATH =
  'M1440 2260 c0 -34 37 -97 72 -122 33 -23 38 -23 368 -29 308 -5 340 -7 392 -27 114 -42 199 -120 251 -231 27 -56 32 -80 35 -163 l4 -98 -348 0 c-192 0 -366 -3 -387 -6 -20 -4 -61 -21 -90 -38 -135 -81 -164 -271 -60 -387 75 -83 79 -84 416 -87 l297 -3 0 85 0 86 -271 0 c-174 0 -277 4 -291 11 -25 13 -50 72 -41 96 3 10 15 28 26 41 l20 22 366 0 366 0 -3 -260 -3 -260 -342 0 c-189 0 -371 5 -407 11 -230 37 -381 225 -368 457 10 180 143 341 322 388 37 10 125 14 329 14 182 0 277 4 277 10 0 19 -50 86 -81 109 -60 44 -100 51 -303 51 -212 0 -278 -11 -380 -60 -135 -65 -256 -200 -306 -341 -31 -89 -39 -259 -15 -349 52 -201 208 -365 410 -431 68 -23 81 -23 558 -27 l487 -3 0 480 c0 289 -4 511 -11 558 -32 233 -195 422 -429 499 -48 16 -103 18 -457 22 l-403 3 0 -21z'

/**
 * Label for stacks and facts, set as plain type in the accent colour: no
 * capsule, no glow.
 */
export const Chip: React.FC<{
  children: React.ReactNode
  color?: string
  style?: React.CSSProperties
}> = ({ children, color = colors.sky, style }) => (
  <div
    style={{
      display: 'inline-block',
      fontFamily: fonts.display,
      fontWeight: 600,
      fontSize: 26,
      letterSpacing: '-0.01em',
      color,
      ...style,
      padding: 0,
    }}
  >
    {children}
  </div>
)
