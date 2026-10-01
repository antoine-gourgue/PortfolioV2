import React from 'react'
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion'
import { CX, fonts, stage } from '../config'
import { Ring } from '../kit/charts'
import { Smear, StageLight } from '../kit/light'
import { Body, Rise, ease, easeIn, easeOut, fitSize } from '../kit/motion'
import { Shot, TrafficLights, type Media } from '../kit/screens'
import { Counter, Letters, formatNumber } from '../kit/type'
import type { Crop, Proof, Showcase as ShowcaseData } from '../types'

/** Frames of the whip pan between two showcases. */
export const WHIP = 10
const WIN_W = 880
const WIN_BAR = 34

/** A screen in a browser window, its UI blocks hovering then landing. */
const ExplodedWindow: React.FC<{
  media: Media
  aspect: number
  layers: Crop[]
  t: number
  f: number
  len: number
}> = ({ media, aspect, layers, t, f, len }) => {
  const h = WIN_W / aspect
  const lift = 1 - t
  return (
    <div
      style={{
        position: 'relative',
        width: WIN_W,
        height: h + WIN_BAR,
        transformStyle: 'preserve-3d',
        transform: `rotateX(${48 * lift + 6}deg) rotateZ(${-30 * lift}deg) rotateY(${interpolate(f, [0, len], [-7, 7])}deg)`,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 14,
          overflow: 'hidden',
          background: '#1c1c1e',
          boxShadow:
            '0 50px 120px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.1)',
        }}
      >
        <div
          style={{
            height: WIN_BAR,
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 14,
            background: '#2c2c2e',
          }}
        >
          <TrafficLights size={11} />
        </div>
        <div style={{ position: 'relative', width: WIN_W, height: h }}>
          <Shot media={media} />
        </div>
      </div>
      {layers.map(([x, y, w, lh], i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: x * WIN_W,
            top: WIN_BAR + y * h,
            width: w * WIN_W,
            height: lh * h,
            overflow: 'hidden',
            borderRadius: 8,
            transform: `translateZ(${lift * (90 + i * 70)}px)`,
            boxShadow: `0 ${lift * 40}px ${lift * 60}px rgba(0,0,0,${0.6 * lift})`,
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: -x * WIN_W,
              top: -y * h,
              width: WIN_W,
              height: h,
            }}
          >
            <Shot media={media} />
          </div>
        </div>
      ))}
    </div>
  )
}

const ProofLine: React.FC<{ proof: Proof }> = ({ proof }) => {
  const f = useCurrentFrame()
  if (proof.kind === 'ring') {
    const [from, to] = proof.colors ?? ['#2ee6c8', '#1fb8a6']
    const label =
      formatNumber(proof.value, proof.decimals) + (proof.suffix ?? '')
    return (
      <Rise at={24} style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
        <div style={{ position: 'relative', width: 190, height: 190 }}>
          <Ring
            pct={proof.pct}
            at={26}
            size={190}
            stroke={20}
            from={from}
            to={to}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: fonts.display,
              fontSize: fitSize(label, 44, 140),
              fontWeight: 700,
              color: stage.white,
              letterSpacing: '-0.03em',
            }}
          >
            <Counter
              to={proof.value}
              start={26}
              duration={36}
              decimals={proof.decimals}
              suffix={proof.suffix}
            />
          </div>
        </div>
        <div>
          <Body
            size={44}
            color={stage.white}
            weight={700}
            style={{ textAlign: 'left' }}
          >
            {proof.label}
          </Body>
          {proof.sub && (
            <Body size={34} style={{ textAlign: 'left' }}>
              {proof.sub}
            </Body>
          )}
        </div>
      </Rise>
    )
  }
  if (proof.kind === 'line') {
    return (
      <Rise at={24}>
        <Body size={40} color="#d2d2d7" weight={600}>
          {proof.text}
        </Body>
      </Rise>
    )
  }
  // The stack reads as a line of type, each name landing on its own beat
  return (
    <div
      style={{
        display: 'flex',
        fontFamily: fonts.display,
        fontSize: 38,
        fontWeight: 600,
        letterSpacing: '-0.015em',
        color: '#d2d2d7',
      }}
    >
      {proof.items.map((s, i) => {
        const t = ease(f, [24 + i * 6, 36 + i * 6], [0, 1], easeOut)
        return (
          <span
            key={s}
            style={{
              opacity: t,
              transform: `translateY(${(1 - t) * 16}px)`,
              filter: t < 1 ? `blur(${(1 - t) * 6}px)` : undefined,
            }}
          >
            {i > 0 && (
              <span style={{ margin: '0 18px', color: '#48484a' }}>·</span>
            )}
            {s}
          </span>
        )
      })}
    </div>
  )
}

/**
 * One project: title, exploded window, one proof point. Consecutive
 * showcases are joined by a whip pan: both shots ride the same pan so they
 * stay butted edge to edge, which is why the scene background is transparent.
 * The last of a run lifts away instead, so it does not smear across the
 * next scene's entrance.
 */
export const Showcase: React.FC<{
  len: number
  show: ShowcaseData
  id: string
  whipIn: boolean
  whipOut: boolean
}> = ({ len, show, id, whipIn, whipOut }) => {
  const f = useCurrentFrame()
  const { fps } = useVideoConfig()
  const land = spring({
    frame: f - 2,
    fps,
    config: { damping: 22, stiffness: 42 },
  })
  const inT = whipIn ? 1 - ease(f, [0, WHIP], [0, 1]) : 0
  const outT = whipOut ? ease(f, [len, len + WHIP], [0, 1]) : 0
  const smear = Math.sin(Math.PI * (inT || outT)) * 70
  const fadeIn = whipIn ? 1 : ease(f, [0, 12], [0, 1])
  const lift = whipOut ? 0 : ease(f, [len - 8, len + 4], [0, 1], easeIn)
  const h = WIN_W / show.aspect
  return (
    <AbsoluteFill
      style={{
        opacity: fadeIn * (1 - lift),
        transform: lift ? `translateY(${-lift * 120}px)` : undefined,
        filter: lift ? `blur(${lift * 10}px)` : undefined,
      }}
    >
      <Smear id={`whip-${id}`} amount={smear}>
        <AbsoluteFill
          style={{ transform: `translateX(${(inT - outT) * 1080}px)` }}
        >
          <StageLight y={55} w={70} />
          <div
            style={{
              position: 'absolute',
              top: 560,
              left: 0,
              whiteSpace: 'nowrap',
              fontFamily: fonts.display,
              fontSize: 330,
              fontWeight: 800,
              letterSpacing: '-0.05em',
              color: '#131316',
              transform: `translateX(${interpolate(f, [0, len + WHIP], [260, -520])}px)`,
            }}
          >
            {show.name}
          </div>
          <div style={{ position: 'absolute', top: 150, width: '100%' }}>
            <Letters
              text={show.name}
              at={4}
              size={fitSize(show.name, 104)}
              silver
              stagger={1.2}
            />
            <Rise at={14}>
              <Body size={42}>{show.tag}</Body>
            </Rise>
          </div>
          <AbsoluteFill
            style={{ perspective: 1800, perspectiveOrigin: '50% 45%' }}
          >
            <div
              style={{
                position: 'absolute',
                left: CX - WIN_W / 2,
                top: 740 - (h + WIN_BAR) / 2,
                transformStyle: 'preserve-3d',
                transform: `translateZ(${interpolate(land, [0, 1], [-500, 0]) + f * 0.8}px)`,
              }}
            >
              <ExplodedWindow
                media={show.media}
                aspect={show.aspect}
                layers={show.layers}
                t={land}
                f={f}
                len={len}
              />
            </div>
          </AbsoluteFill>
          <div
            style={{
              position: 'absolute',
              top: 1130,
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <ProofLine proof={show.proof} />
          </div>
        </AbsoluteFill>
      </Smear>
    </AbsoluteFill>
  )
}
