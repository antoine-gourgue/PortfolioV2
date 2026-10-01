import React from 'react'
import { Easing, interpolate, useCurrentFrame } from 'remotion'
import { LOCALE, fonts, stage } from '../config'
import { clamp, easeOut } from './motion'

export const SILVER =
  'linear-gradient(180deg, #ffffff 0%, #d9d9de 45%, #8e8e93 100%)'

/**
 * Silver type with a specular highlight travelling across it: the light
 * sweep Apple puts on every hero word.
 */
export const SilverText: React.FC<{
  children: React.ReactNode
  size: number
  sweepAt?: number
  sweepDur?: number
  weight?: number
  tracking?: number
  style?: React.CSSProperties
}> = ({
  children,
  size,
  sweepAt = 0,
  sweepDur = 34,
  weight = 700,
  tracking = -0.045,
  style,
}) => {
  const f = useCurrentFrame()
  const p = interpolate(f, [sweepAt, sweepAt + sweepDur], [-40, 140], clamp)
  return (
    <div
      style={{
        fontFamily: fonts.display,
        fontSize: size,
        fontWeight: weight,
        letterSpacing: `${tracking}em`,
        lineHeight: 1.02,
        backgroundImage: `linear-gradient(100deg, transparent ${p - 14}%, rgba(255,255,255,0.95) ${p}%, transparent ${p + 14}%), ${SILVER}`,
        WebkitBackgroundClip: 'text',
        color: 'transparent',
        // Room for descenders, which background-clip would otherwise cut
        paddingBottom: size * 0.06,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

/** Letters rising and sharpening one after another. */
export const Letters: React.FC<{
  text: string
  at: number
  size: number
  stagger?: number
  color?: string
  weight?: number
  silver?: boolean
  style?: React.CSSProperties
}> = ({
  text,
  at,
  size,
  stagger = 1.6,
  color = stage.white,
  weight = 700,
  silver,
  style,
}) => {
  const f = useCurrentFrame()
  return (
    <div
      style={{
        fontFamily: fonts.display,
        fontSize: size,
        fontWeight: weight,
        letterSpacing: '-0.04em',
        lineHeight: 1.05,
        whiteSpace: 'pre',
        textAlign: 'center',
        ...style,
      }}
    >
      {Array.from(text).map((c, i) => {
        const t = interpolate(
          f,
          [at + i * stagger, at + i * stagger + 14],
          [0, 1],
          { ...clamp, easing: easeOut }
        )
        return (
          <span
            key={i}
            style={{
              display: 'inline-block',
              opacity: t,
              transform: `translateY(${(1 - t) * 0.5}em) scale(${1.2 - t * 0.2})`,
              filter: t < 1 ? `blur(${(1 - t) * 10}px)` : undefined,
              ...(silver
                ? {
                    backgroundImage: SILVER,
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                  }
                : { color }),
            }}
          >
            {c}
          </span>
        )
      })}
    </div>
  )
}

export type Beat = { text: string; silver?: boolean }

/**
 * One word per beat, each cutting the previous one: the rhythm of Apple's
 * launch films ("Pro. Beyond.").
 */
export const BeatWords: React.FC<{
  words: (Beat & { at: number })[]
  until: number
  size: number
}> = ({ words, until, size }) => {
  const f = useCurrentFrame()
  const current = [...words].reverse().find((w) => f >= w.at)
  if (!current || f >= until) return null
  const t = interpolate(f, [current.at, current.at + 8], [0, 1], {
    ...clamp,
    easing: easeOut,
  })
  return (
    <div
      style={{
        transform: `scale(${1.18 - t * 0.18})`,
        filter: t < 1 ? `blur(${(1 - t) * 14}px)` : undefined,
        opacity: t,
      }}
    >
      {current.silver ? (
        <SilverText size={size} sweepAt={current.at + 4}>
          {current.text}
        </SilverText>
      ) : (
        <div
          style={{
            fontFamily: fonts.display,
            fontSize: size,
            fontWeight: 700,
            letterSpacing: '-0.045em',
            color: stage.white,
            lineHeight: 1.02,
          }}
        >
          {current.text}
        </div>
      )}
    </div>
  )
}

export const formatNumber = (value: number, decimals = 0) =>
  new Intl.NumberFormat(LOCALE, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)

/** A number counting up, in tabular figures so it does not jitter. */
export const Counter: React.FC<{
  to: number
  start: number
  duration?: number
  prefix?: string
  suffix?: string
  decimals?: number
}> = ({ to, start, duration = 30, prefix = '', suffix = '', decimals = 0 }) => {
  const f = useCurrentFrame()
  const t = interpolate(f, [start, start + duration], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.2, 0.8, 0.2, 1),
  })
  return (
    <span style={{ fontVariantNumeric: 'tabular-nums' }}>
      {prefix}
      {formatNumber(to * t, decimals)}
      {suffix}
    </span>
  )
}
