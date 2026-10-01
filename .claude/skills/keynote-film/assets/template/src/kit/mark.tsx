import React, { useId } from 'react'
import { interpolate, useCurrentFrame } from 'remotion'
import { fonts } from '../config'
import { clamp, easeInOut } from './motion'

/**
 * The subject's mark. Either initials, drawn as a ring with the letters
 * inside, or a real logo as one SVG path. `unit` is how many path units make
 * one viewBox unit (10 for a potrace path under `scale(0.1,-0.1)`), so the
 * traced stroke keeps the same weight whatever the path's own scale.
 */
export type Mark =
  | { text: string }
  | { path: string; viewBox?: string; transform?: string; unit?: number }

// A circle of radius 130 centred in the 400 × 300 box, starting at the top
const RING = 'M200 20 A130 130 0 1 1 199.99 20 Z'
const RING_BOX = '0 0 400 300'

const box = (mark: Mark) => {
  const vb = ('path' in mark && mark.viewBox) || RING_BOX
  const [, , w, h] = vb.split(/\s+/).map(Number)
  return { vb, w, h }
}

/** The mark at rest, flat colour: logos on the back of the devices. */
export const Monogram: React.FC<{
  mark: Mark
  size: number
  color: string
}> = ({ mark, size, color }) => {
  const { vb, w, h } = box(mark)
  return (
    <svg
      viewBox={vb}
      width={size}
      height={(size * h) / w}
      style={{ overflow: 'visible' }}
    >
      {'path' in mark ? (
        <g transform={mark.transform}>
          <path d={mark.path} fill={color} />
        </g>
      ) : (
        <>
          <path d={RING} fill="none" stroke={color} strokeWidth={8} />
          <text
            x={200}
            y={150}
            textAnchor="middle"
            dominantBaseline="central"
            fontFamily={fonts.display}
            fontWeight={800}
            fontSize={124}
            letterSpacing={-5}
            fill={color}
          >
            {mark.text}
          </text>
        </>
      )}
    </svg>
  )
}

/**
 * The mark drawn by a travelling point of light, then filled in silver with
 * a specular sweep: the logo reveal of an Apple event opener.
 */
export const LogoTrace: React.FC<{
  mark: Mark
  at: number
  size: number
  fillAt: number
}> = ({ mark, at, size, fillAt }) => {
  const f = useCurrentFrame()
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '')
  const draw = interpolate(f, [at, fillAt], [0, 1], {
    ...clamp,
    easing: easeInOut,
  })
  const fill = interpolate(f, [fillAt, fillAt + 16], [0, 1], clamp)
  const sweep = interpolate(f, [fillAt + 6, fillAt + 40], [-40, 140], clamp)
  const head = 0.05
  const { vb, w, h } = box(mark)
  const isPath = 'path' in mark
  const d = isPath ? mark.path : RING
  const unit = isPath ? (mark.unit ?? 1) : 1
  const stroke = w * 0.0035 * unit
  const silver = `url(#silver-${uid})`
  const shine = `url(#sweep-${uid})`
  return (
    <svg
      viewBox={vb}
      width={size}
      height={(size * h) / w}
      style={{ overflow: 'visible', display: 'block' }}
    >
      <defs>
        <linearGradient id={`silver-${uid}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#8e8e93" />
        </linearGradient>
        <linearGradient id={`sweep-${uid}`} x1="0" x2="1" y1="0" y2="0.3">
          <stop
            offset={`${(sweep - 14) / 100}`}
            stopColor="#fff"
            stopOpacity={0}
          />
          <stop offset={`${sweep / 100}`} stopColor="#fff" stopOpacity={1} />
          <stop
            offset={`${(sweep + 14) / 100}`}
            stopColor="#fff"
            stopOpacity={0}
          />
        </linearGradient>
      </defs>
      <g transform={isPath ? mark.transform : undefined}>
        <path
          d={d}
          fill="none"
          stroke="#8e8e93"
          strokeWidth={stroke * (isPath ? 1 : 1.6)}
          pathLength={1}
          strokeDasharray={`${draw} 1`}
          opacity={isPath ? 1 - fill : 1}
        />
        {draw > 0 && draw < 1 && (
          <path
            d={d}
            fill="none"
            stroke="#fff"
            strokeWidth={stroke * 2.4}
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray={`${head} 1`}
            strokeDashoffset={-(draw - head)}
            style={{
              filter:
                'drop-shadow(0 0 12px #fff) drop-shadow(0 0 30px #9fc8ff)',
            }}
          />
        )}
        {isPath ? (
          <>
            <path d={d} fill={silver} opacity={fill} />
            <path d={d} fill={shine} opacity={fill} />
          </>
        ) : (
          <>
            <path
              d={d}
              fill="none"
              stroke={silver}
              strokeWidth={stroke * 1.6}
              opacity={fill}
            />
            {[silver, shine].map((paint) => (
              <text
                key={paint}
                x={200}
                y={150}
                textAnchor="middle"
                dominantBaseline="central"
                fontFamily={fonts.display}
                fontWeight={800}
                fontSize={124}
                letterSpacing={-5}
                fill={paint}
                opacity={fill}
              >
                {(mark as { text: string }).text}
              </text>
            ))}
          </>
        )}
      </g>
    </svg>
  )
}
