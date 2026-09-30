import React from 'react'
import {
  AbsoluteFill,
  Audio,
  Img,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion'
import { fonts, person } from '../brand'
import { footage } from '../scenes/OsScenes'
import {
  Banner,
  Caret,
  ClosingCard,
  PHONE_RATIO,
  Phone,
  Tap,
  ui,
  useTyped,
} from '../ui/Apps'
import { RevealText, clamp, easeIn, easeInOut } from '../ui/Primitives'

const ink = '#1d1d1f'
const BLUE_TEXT = 'linear-gradient(120deg, #0071e3 0%, #7d4cdb 100%)'

const PW = 500
const SW = PW * 0.936
const SH = SW * PHONE_RATIO
const PX = 540 - PW / 2
const PY = 262
// Screen origin inside the phone frame (bezel)
const SX = PX + PW * 0.032
const SY = PY + PW * 0.032

const Stage: React.FC = () => (
  <AbsoluteFill
    style={{
      background:
        'radial-gradient(ellipse 90% 60% at 50% 35%, #ffffff 0%, #f2f2f5 55%, #e4e4ea 100%)',
    }}
  />
)

type Transition = 'launch' | 'push' | 'pop' | 'home' | 'fade' | 'unlock'

type Screen = {
  at: number
  src: string
  transition: Transition
  /** Where a launch zooms from, in screen fractions (the tapped icon). */
  origin?: [number, number]
}

// The whole iOS session: each entry is the screen shown from `at`
const SCREENS: Screen[] = [
  { at: 0, src: 'mobile-lockscreen.jpg', transition: 'fade' },
  { at: 64, src: 'mobile-home-clean.jpg', transition: 'unlock' },
  {
    at: 104,
    src: 'mobile-projects.jpg',
    transition: 'launch',
    origin: [0.16, 0.3],
  },
  { at: 154, src: 'mobile-appstore-emailEditor.jpg', transition: 'push' },
  { at: 232, src: 'mobile-projects.jpg', transition: 'pop' },
  { at: 262, src: 'mobile-appstore-mosaic.jpg', transition: 'push' },
  { at: 330, src: 'mobile-home-clean.jpg', transition: 'home' },
  {
    at: 354,
    src: 'mobile-about.jpg',
    transition: 'launch',
    origin: [0.385, 0.3],
  },
  { at: 394, src: 'mobile-about-digitaleo.jpg', transition: 'push' },
  { at: 490, src: 'mobile-home-clean.jpg', transition: 'home' },
  { at: 516, src: 'mobile-siri.jpg', transition: 'fade' },
  { at: 556, src: 'mobile-siri-answer.jpg', transition: 'fade' },
  { at: 640, src: 'mobile-home-clean.jpg', transition: 'home' },
  {
    at: 666,
    src: 'mobile-contact-compose.jpg',
    transition: 'launch',
    origin: [0.83, 0.3],
  },
  { at: 870, src: 'mobile-home-clean.jpg', transition: 'home' },
]

const TAPS: { at: number; x: number; y: number }[] = [
  { at: 60, x: 0.5, y: 0.37 },
  { at: 100, x: 0.16, y: 0.3 },
  { at: 150, x: 0.5, y: 0.3 },
  { at: 258, x: 0.35, y: 0.785 },
  { at: 350, x: 0.385, y: 0.3 },
  { at: 390, x: 0.5, y: 0.415 },
  { at: 512, x: 0.385, y: 0.517 },
  { at: 552, x: 0.5, y: 0.436 },
  { at: 662, x: 0.83, y: 0.3 },
  { at: 864, x: 0.913, y: 0.082 },
]

const TRANSITION = 14

const ScreenLayer: React.FC<{
  screen: Screen
  t: number
  /** Set on the outgoing screen: the transition of the one replacing it. */
  leaving?: Transition
}> = ({ screen, t, leaving }) => {
  const img = (
    <Img
      src={footage(screen.src)}
      style={{ width: SW, height: SH, display: 'block' }}
    />
  )
  const e = easeInOut(t)
  const base: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    overflow: 'hidden',
  }
  if (leaving) {
    // Pushed screens slide a third under the new one; an app sent home
    // shrinks away; anything else stays put under the incoming screen
    const style: React.CSSProperties =
      leaving === 'push'
        ? {
            transform: `translateX(${-e * 30}%)`,
            filter: `brightness(${1 - e * 0.15})`,
          }
        : leaving === 'home'
          ? {
              transform: `scale(${1 - e * 0.3})`,
              borderRadius: 60 * e,
              opacity: 1 - e,
            }
          : {}
    return <div style={{ ...base, ...style }}>{img}</div>
  }
  switch (screen.transition) {
    case 'launch': {
      const [ox, oy] = screen.origin ?? [0.5, 0.5]
      return (
        <div
          style={{
            ...base,
            left: SW * ox * (1 - e),
            top: SH * oy * (1 - e),
            right: 'auto',
            bottom: 'auto',
            width: SW,
            height: SH,
            transform: `scale(${0.1 + e * 0.9})`,
            transformOrigin: 'top left',
            borderRadius: 40 * (1 - e),
            opacity: Math.min(1, t * 3),
          }}
        >
          {img}
        </div>
      )
    }
    case 'push':
      return (
        <div
          style={{
            ...base,
            transform: `translateX(${(1 - e) * 100}%)`,
            boxShadow: '-10px 0 30px rgba(0,0,0,0.15)',
          }}
        >
          {img}
        </div>
      )
    case 'pop':
      return (
        <div style={{ ...base, transform: `translateX(${-(1 - e) * 30}%)` }}>
          {img}
        </div>
      )
    case 'home':
      return (
        <div
          style={{
            ...base,
            transform: `scale(${1.08 - e * 0.08})`,
            opacity: e,
          }}
        >
          {img}
        </div>
      )
    default:
      return <div style={{ ...base, opacity: e }}>{img}</div>
  }
}

/** Renders the iOS session, animating each change of screen. */
const Screens: React.FC = () => {
  const f = useCurrentFrame()
  let idx = 0
  SCREENS.forEach((s, i) => {
    if (f >= s.at) idx = i
  })
  const cur = SCREENS[idx]
  const prev = SCREENS[Math.max(idx - 1, 0)]
  const t = interpolate(f, [cur.at, cur.at + TRANSITION], [0, 1], clamp)
  const popping = cur.transition === 'pop' && t < 1
  if (cur.transition === 'unlock' && t < 1) {
    // The lock screen slides up and away, revealing the springboard
    return (
      <>
        <ScreenLayer screen={cur} t={1} />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            transform: `translateY(${-easeInOut(t) * 100}%)`,
          }}
        >
          <Img src={footage(prev.src)} style={{ width: SW, height: SH }} />
        </div>
      </>
    )
  }
  return (
    <>
      {idx > 0 && t < 1 && !popping && (
        <ScreenLayer screen={prev} t={t} leaving={cur.transition} />
      )}
      {popping && <ScreenLayer screen={cur} t={t} />}
      {popping && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            transform: `translateX(${easeInOut(t) * 100}%)`,
            boxShadow: '-10px 0 30px rgba(0,0,0,0.15)',
          }}
        >
          <Img src={footage(prev.src)} style={{ width: SW, height: SH }} />
        </div>
      )}
      {!popping && <ScreenLayer screen={cur} t={idx === 0 ? 1 : t} />}
    </>
  )
}

/** The real Contact form, filled in by a recruiter over the capture. */
const ComposeFill: React.FC = () => {
  const f = useCurrentFrame()
  if (f < 680 || f >= 870 + TRANSITION) return null
  // Leaves with the form when the app is sent home at 870
  const e = easeInOut(interpolate(f, [870, 870 + TRANSITION], [0, 1], clamp))
  const field = (
    y: number,
    text: string,
    start: number,
    cps: number,
    opts: { cover?: boolean; bold?: boolean; wrap?: boolean } = {}
  ) => <Field key={text} y={y} text={text} start={start} cps={cps} {...opts} />
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        transform: `scale(${1 - e * 0.3})`,
        opacity: 1 - e,
      }}
    >
      {field(0.21, 'vous@entreprise.fr', 690, 24, { cover: true })}
      {field(0.268, 'Équipe recrutement', 716, 24, { cover: true })}
      {field(0.325, 'Entretien — CDI Fullstack × IA', 742, 30, {
        cover: true,
        bold: true,
      })}
      {field(
        0.382,
        'Bonjour Antoine, votre profil nous intéresse. On s’appelle cette semaine ?',
        782,
        44,
        {
          cover: true,
          wrap: true,
        }
      )}
    </div>
  )
}

const Field: React.FC<{
  y: number
  text: string
  start: number
  cps: number
  cover?: boolean
  bold?: boolean
  wrap?: boolean
}> = ({ y, text, start, cps, cover, bold, wrap }) => {
  const typed = useTyped(text, start, cps)
  const f = useCurrentFrame()
  if (f < start - 2) return null
  const left = wrap ? 0.066 : 0.242
  return (
    <div
      style={{
        position: 'absolute',
        // Cover a little wider than the text so no glyph of the capture shows
        left: SW * (left - 0.025),
        paddingLeft: SW * 0.025,
        top: SH * (y - 0.016),
        width: SW * (0.95 - left),
        minHeight: SH * 0.032,
        background: cover ? '#fff' : undefined,
        fontFamily: fonts.body,
        fontSize: SW * 0.036,
        fontWeight: bold ? 600 : 400,
        color: ink,
        lineHeight: 1.35,
        whiteSpace: wrap ? 'normal' : 'nowrap',
      }}
    >
      {typed.text}
      {!typed.done && <Caret on={typed.caret} />}
    </div>
  )
}

const Callout: React.FC<{
  sx: number
  sy: number
  side: 'left' | 'right'
  dy?: number
  text: string
  from: number
  to: number
  color?: string
}> = ({ sx, sy, side, dy = 0, text, from, to, color = ui.blue }) => {
  const f = useCurrentFrame()
  const t = interpolate(f, [from, from + 14, to - 10, to], [0, 1, 1, 0], clamp)
  if (t <= 0) return null
  const x = SX + SW * sx
  const y = SY + SH * sy
  const px = side === 'left' ? PX - 24 : PX + PW + 24
  const py = y + dy
  return (
    <>
      <svg
        style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }}
        width={1}
        height={1}
      >
        <path
          d={`M${x},${y} L${px},${py}`}
          stroke={ink}
          strokeOpacity={0.3 * t}
          strokeWidth={2}
          fill="none"
        />
        <circle
          cx={x}
          cy={y}
          r={8 * t}
          fill={color}
          stroke="#fff"
          strokeWidth={3}
        />
      </svg>
      <div
        style={{
          position: 'absolute',
          left: px,
          top: py,
          transform: `translate(${side === 'left' ? '-100%' : '0'}, -50%) scale(${0.9 + t * 0.1})`,
          opacity: t,
          maxWidth: 250,
          padding: '14px 20px',
          borderRadius: 22,
          background: '#fff',
          boxShadow: '0 12px 30px rgba(0,0,0,0.14), 0 0 0 1px rgba(0,0,0,0.05)',
          fontFamily: fonts.body,
          fontWeight: 700,
          fontSize: 24,
          lineHeight: 1.25,
          color: ink,
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: 5,
            background: color,
            marginBottom: 6,
          }}
        />
        {text}
      </div>
    </>
  )
}

const CAPTIONS: { from: number; to: number; first: string; second: string }[] =
  [
    { from: 0, to: 104, first: 'Mon portfolio,', second: 'version iPhone.' },
    { from: 104, to: 336, first: 'Mes projets,', second: 'dans l’App Store.' },
    { from: 336, to: 496, first: 'Mon parcours,', second: 'dans À propos.' },
    { from: 496, to: 646, first: 'Une question ?', second: 'Siri répond.' },
    {
      from: 646,
      to: 880,
      first: 'Un message ?',
      second: 'Le formulaire est réel.',
    },
  ]

const Story: React.FC = () => {
  const f = useCurrentFrame()
  const { fps } = useVideoConfig()
  const rise = spring({
    frame: f,
    fps,
    config: { damping: 18, stiffness: 100 },
  })
  const unlock = interpolate(f, [62, 76], [0, 1], {
    ...clamp,
    easing: easeInOut,
  })
  const exit = interpolate(f, [880, 900], [0, 1], { ...clamp, easing: easeIn })
  const sway = Math.sin(f / 70) * 2.5
  return (
    <AbsoluteFill style={{ opacity: 1 - exit }}>
      {CAPTIONS.map((c) => (
        <Sequence key={c.first} from={c.from} durationInFrames={c.to - c.from}>
          <div style={{ position: 'absolute', top: 60, width: '100%' }}>
            <RevealText
              text={c.first}
              start={2}
              exit={c.to - c.from - 14}
              size={62}
              color={ink}
            />
            <RevealText
              text={c.second}
              start={10}
              exit={c.to - c.from - 14}
              size={62}
              gradient={BLUE_TEXT}
            />
          </div>
        </Sequence>
      ))}
      <AbsoluteFill style={{ perspective: 1800 }}>
        <div
          style={{
            position: 'absolute',
            left: PX,
            top: PY,
            opacity: rise,
            transform: `translateY(${(1 - rise) * 500 + exit * 80}px) rotateY(${(1 - rise) * 20 + sway}deg)`,
          }}
        >
          <Phone width={PW} glow="rgba(0,0,0,0.1)">
            <Screens />
            {f < 80 && (
              <div
                style={{
                  position: 'absolute',
                  left: SW * 0.04,
                  top: SH * 0.33,
                  width: 840,
                  transform: `scale(${(SW * 0.92) / 840}) translateY(${-unlock * 1500}px)`,
                  transformOrigin: 'top left',
                }}
              >
                <Banner
                  at={14}
                  width={840}
                  dark={false}
                  title={`${person.firstName} ${person.lastName}`}
                  body="Disponible en CDI dès octobre 2026 — discutons-en !"
                  style={{ position: 'relative' }}
                />
              </div>
            )}
            <ComposeFill />
            {TAPS.map((t) => (
              <Tap key={t.at} x={SW * t.x} y={SH * t.y} at={t.at} />
            ))}
          </Phone>
        </div>
      </AbsoluteFill>
      <Callout
        sx={0.5}
        sy={0.37}
        side="left"
        dy={-60}
        text="Notification de disponibilité"
        from={24}
        to={62}
        color={ui.green}
      />
      <Callout
        sx={0.5}
        sy={0.78}
        side="left"
        dy={40}
        text="37 000 utilisateurs actifs"
        from={176}
        to={232}
        color="#f26a36"
      />
      <Callout
        sx={0.5}
        sy={0.36}
        side="right"
        dy={-80}
        text="Marketing SaaS · 2024 — 2026"
        from={184}
        to={232}
      />
      <Callout
        sx={0.5}
        sy={0.85}
        side="right"
        dy={-40}
        text="Next.js · Prisma · Auth.js"
        from={284}
        to={330}
        color="#e60023"
      />
      <Callout
        sx={0.5}
        sy={0.4}
        side="left"
        dy={-40}
        text="2,5 ans d’alternance"
        from={414}
        to={490}
        color="#5E5CE6"
      />
      <Callout
        sx={0.5}
        sy={0.7}
        side="right"
        dy={40}
        text="Vue.js · TypeScript · Design System"
        from={426}
        to={490}
      />
      <Callout
        sx={0.5}
        sy={0.2}
        side="left"
        dy={-30}
        text="Disponible en CDI"
        from={576}
        to={640}
        color={ui.green}
      />
      <Callout
        sx={0.9}
        sy={0.94}
        side="right"
        dy={-120}
        text="Chatbot IA du portfolio"
        from={588}
        to={640}
        color="#AF52DE"
      />
      <Callout
        sx={0.913}
        sy={0.082}
        side="right"
        dy={120}
        text="Envoi direct à Antoine"
        from={846}
        to={880}
      />
    </AbsoluteFill>
  )
}

export const IPhone: React.FC<{ withAudio?: boolean }> = ({
  withAudio = true,
}) => (
  <AbsoluteFill style={{ background: '#f2f2f5' }}>
    <Stage />
    <Story />
    <Sequence from={890} name="Closing">
      <ClosingCard
        start={0}
        dark={false}
        background={<Stage />}
        accent={BLUE_TEXT}
      />
    </Sequence>
    {withAudio && <Audio src={staticFile('audio/iPhone.wav')} />}
  </AbsoluteFill>
)
