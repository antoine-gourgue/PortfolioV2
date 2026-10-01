import React, { useId } from 'react'
import { interpolate, useCurrentFrame } from 'remotion'
import { stage } from '../config'
import { Body, clamp, ease, easeOut } from './motion'

/** Activity-style ring filling to `pct` (0-1), with a glowing leading edge. */
export const Ring: React.FC<{
  pct: number
  at: number
  size: number
  stroke: number
  from: string
  to: string
}> = ({ pct, at, size, stroke, from, to }) => {
  const f = useCurrentFrame()
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '')
  const t = interpolate(f, [at, at + 36], [0, pct], {
    ...clamp,
    easing: easeOut,
  })
  const r = (size - stroke) / 2
  return (
    <svg width={size} height={size} style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id={`ring-${uid}`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
      </defs>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="#1c1c1e"
        strokeWidth={stroke}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={`url(#ring-${uid})`}
        strokeWidth={stroke}
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray={`${t} 1`}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ filter: `drop-shadow(0 0 18px ${to}88)` }}
      />
    </svg>
  )
}

/** A field of points lit by a wave from the centre: "N of something". */
export const DotField: React.FC<{
  at: number
  cols?: number
  rows?: number
}> = ({ at, cols = 40, rows = 15 }) => {
  const f = useCurrentFrame()
  // Small counts get bigger dots so the field still fills the slot
  const pitch = Math.min(48, Math.floor(800 / cols))
  const dot = pitch * 0.45
  return (
    <div
      style={{
        position: 'relative',
        width: cols * pitch,
        height: rows * pitch,
      }}
    >
      {Array.from({ length: cols * rows }, (_, i) => {
        const c = i % cols
        const r = Math.floor(i / cols)
        const d = Math.hypot((c - cols / 2) / 1.6, r - rows / 2) * 1.3
        const t = interpolate(f - at - d, [0, 8], [0, 1], clamp)
        const glow = Math.max(0, 1 - Math.abs(f - at - d - 4) / 6)
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: c * pitch + (pitch - dot) / 2,
              top: r * pitch + (pitch - dot) / 2,
              width: dot,
              height: dot,
              borderRadius: dot,
              background:
                t > 0
                  ? `rgba(255,255,255,${0.25 + t * 0.55 + glow * 0.2})`
                  : '#161618',
              transform: `scale(${1 + glow * 0.6})`,
            }}
          />
        )
      })}
    </div>
  )
}

/** A span of time drawn by a travelling light, ticks lighting up as it passes. */
export const Timeline: React.FC<{ at: number; from: string; to: string }> = ({
  at,
  from,
  to,
}) => {
  const f = useCurrentFrame()
  const w = 820
  const t = ease(f, [at, at + 34], [0, 1])
  return (
    <div style={{ position: 'relative', width: w, height: 110 }}>
      <div
        style={{
          position: 'absolute',
          top: 30,
          left: 0,
          width: w,
          height: 4,
          background: '#1c1c1e',
          borderRadius: 2,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 30,
          left: 0,
          width: w * t,
          height: 4,
          borderRadius: 2,
          background: 'linear-gradient(90deg, #3a3a3c, #ffffff)',
          boxShadow: '0 0 18px rgba(255,255,255,0.6)',
        }}
      />
      {Array.from({ length: 11 }, (_, i) => {
        const on = t >= i / 10
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: (i / 10) * w - 6,
              top: 26,
              width: 12,
              height: 12,
              borderRadius: 6,
              background: on ? '#fff' : '#2c2c2e',
              boxShadow: on ? '0 0 14px #fff' : undefined,
            }}
          />
        )
      })}
      <Body
        size={30}
        style={{ position: 'absolute', left: 0, top: 60, textAlign: 'left' }}
      >
        {from}
      </Body>
      <Body
        size={30}
        color={t >= 1 ? stage.white : stage.grey}
        style={{ position: 'absolute', right: 0, top: 60, textAlign: 'right' }}
      >
        {to}
      </Body>
    </div>
  )
}
