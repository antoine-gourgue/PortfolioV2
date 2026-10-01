import React from 'react'
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion'
import { stage } from '../config'
import { DotField, Timeline } from '../kit/charts'
import { StageLight } from '../kit/light'
import { Body, ease, easeIn, easeOut, fitSize } from '../kit/motion'
import { Shot, TrafficLights } from '../kit/screens'
import { Counter, SilverText, formatNumber } from '../kit/type'
import type { Stat, StatVisual } from '../types'

const WINDOW_W = 820

/** A stat that rises in, holds with a slow drift, then pushes up and away. */
const StatSlot: React.FC<{
  at: number
  len?: number
  children: React.ReactNode
}> = ({ at, len, children }) => {
  const f = useCurrentFrame()
  const last = len === undefined
  if (f < at - 2 || (!last && f > at + len)) return null
  const inT = ease(f, [at, at + 14], [0, 1], easeOut)
  const outT = last ? 0 : ease(f, [at + len - 10, at + len], [0, 1], easeIn)
  return (
    <AbsoluteFill
      style={{
        transform: `translateY(${(1 - inT) * 180 - outT * 220 - (f - at) * 0.4}px) scale(${1 + (f - at) * 0.0008})`,
        opacity: inT * (1 - outT),
        filter:
          inT < 1 || outT > 0 ? `blur(${(1 - inT + outT) * 10}px)` : undefined,
      }}
    >
      {children}
    </AbsoluteFill>
  )
}

const Visual: React.FC<{ visual: StatVisual; at: number; len: number }> = ({
  visual,
  at,
  len,
}) => {
  const f = useCurrentFrame()
  if (visual.kind === 'timeline') {
    return (
      <div style={{ marginTop: 60 }}>
        <Timeline at={at + 12} from={visual.from} to={visual.to} />
      </div>
    )
  }
  if (visual.kind === 'dots') {
    return (
      <div style={{ marginTop: 60 }}>
        <DotField at={at + 10} cols={visual.cols} rows={visual.rows} />
      </div>
    )
  }
  // A live screen of the product, tilting slowly while the number holds
  return (
    <div style={{ marginTop: 40, perspective: 1600 }}>
      <div
        style={{
          width: WINDOW_W,
          borderRadius: 14,
          overflow: 'hidden',
          background: '#fff',
          boxShadow:
            '0 50px 120px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.12)',
          transform: `rotateX(${10 - (f - at) * 0.06}deg) rotateY(${interpolate(f, [at, at + len], [-6, 6])}deg)`,
        }}
      >
        <div
          style={{
            height: 30,
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 12,
            background: '#e8e8ed',
          }}
        >
          <TrafficLights size={10} />
        </div>
        <div
          style={{
            position: 'relative',
            width: WINDOW_W,
            height: WINDOW_W / visual.aspect,
          }}
        >
          <Shot media={visual.media} />
        </div>
      </div>
    </div>
  )
}

/**
 * Experience told in up to three numbers, one at a time: a kicker, a big
 * silver number counting up, its unit, and a visual that gives it a scale.
 */
export const Numbers: React.FC<{
  len: number
  header: string
  stats: Stat[]
}> = ({ len, header, stats }) => {
  const f = useCurrentFrame()
  const exit = ease(f, [len - 22, len - 6], [0, 1], easeIn)
  const starts = stats.map((_, i) =>
    stats.slice(0, i).reduce((a, s) => a + (s.len ?? 60), 0)
  )
  return (
    <AbsoluteFill
      style={{ opacity: 1 - exit, transform: `translateY(${-exit * 120}px)` }}
    >
      <StageLight y={40} w={70} h={40} />
      <div
        style={{
          position: 'absolute',
          top: 150,
          width: '100%',
          opacity: ease(f, [0, 14], [0, 1]),
        }}
      >
        <Body size={40} color={stage.white} weight={600}>
          {header}
        </Body>
      </div>
      {stats.map((stat, i) => {
        const at = starts[i]
        const last = i === stats.length - 1
        const slot = last ? len - at : (stat.len ?? 60)
        const final =
          formatNumber(stat.value, stat.decimals) + (stat.suffix ?? '')
        return (
          <StatSlot key={i} at={at} len={last ? undefined : slot}>
            <div
              style={{
                position: 'absolute',
                top: 300,
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Body size={40} style={{ marginBottom: 6 }}>
                {stat.kicker}
              </Body>
              <SilverText
                size={fitSize(final, 250, 940, 0.66)}
                sweepAt={at + 22}
                weight={800}
                style={{ textAlign: 'center' }}
              >
                <Counter
                  to={stat.value}
                  start={at + 2}
                  duration={30}
                  decimals={stat.decimals}
                  suffix={stat.suffix}
                />
              </SilverText>
              {stat.unit && (
                <Body
                  size={46}
                  color={stage.white}
                  weight={600}
                  style={{ marginTop: -6 }}
                >
                  {stat.unit}
                </Body>
              )}
              {stat.visual && (
                <Visual visual={stat.visual} at={at} len={slot} />
              )}
            </div>
          </StatSlot>
        )
      })}
    </AbsoluteFill>
  )
}
