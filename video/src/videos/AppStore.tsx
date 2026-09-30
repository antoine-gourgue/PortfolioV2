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
import { fonts, person, projectImage, projects } from '../brand'
import { footage } from '../scenes/OsScenes'
import {
  Banner,
  ClosingCard,
  Cursor,
  Icon,
  LightWindow,
  MailCompose,
  PHONE_RATIO,
  PdfIcon,
  Phone,
  Tap,
  keyframes,
  ui,
} from '../ui/Apps'
import { RevealText, clamp, easeIn, easeInOut, easeOut } from '../ui/Primitives'
import { Digitaleo } from './AntoineOS'

const ink = '#1d1d1f'
const BLUE_TEXT = 'linear-gradient(120deg, #0071e3 0%, #7d4cdb 100%)'

/** The light studio backdrop of the Digitaleo scene: white, no colour. */
const Stage: React.FC = () => (
  <AbsoluteFill
    style={{
      background:
        'radial-gradient(ellipse 90% 60% at 50% 30%, #ffffff 0%, #f2f2f5 55%, #e4e4ea 100%)',
    }}
  />
)

const Caption: React.FC<{
  first: string
  second?: string
  start: number
  exit?: number
  top?: number
  size?: number
}> = ({ first, second, start, exit, top = 90, size = 66 }) => (
  <div style={{ position: 'absolute', top, width: '100%' }}>
    <RevealText
      text={first}
      start={start}
      exit={exit}
      size={size}
      color={ink}
    />
    {second && (
      <RevealText
        text={second}
        start={start + 8}
        exit={exit}
        size={size}
        gradient={BLUE_TEXT}
      />
    )}
  </div>
)

// Geometry of the App Store window captures (1638×1416, 2x)
const CAP_RATIO = 1416 / 1638
const WIN_W = 940
const WIN_H = WIN_W * CAP_RATIO
const WIN_X = 70
const WIN_Y = 330
const GET = { x: 0.5415, y: 0.231, w: 0.132, h: 0.045 }
const APERCU = { x: 0.3144, y: 0.5085, w: 0.646, h: 0.392 }
const SIDEBAR_X = 0.137

type Stage3D = 'get' | 'progress' | 'open'

/** App Store "OBTENIR" → download ring → "OUVRIR", drawn over the capture. */
const GetButton: React.FC<{ getAt: number; openAt: number }> = ({
  getAt,
  openAt,
}) => {
  const f = useCurrentFrame()
  const state: Stage3D = f < getAt ? 'get' : f < openAt ? 'progress' : 'open'
  const progress = interpolate(f, [getAt + 2, openAt - 2], [0, 1], clamp)
  const press =
    (f >= getAt - 3 && f < getAt) || (f >= openAt + 8 && f < openAt + 11)
  const w = WIN_W * GET.w
  const h = WIN_H * GET.h
  const r = h / 2
  return (
    <div
      style={{
        position: 'absolute',
        left: WIN_W * GET.x - w / 2,
        top: WIN_H * GET.y - h / 2,
        width: w,
        height: h,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: `scale(${press ? 0.92 : 1})`,
      }}
    >
      {state === 'progress' ? (
        <svg
          width={h}
          height={h}
          viewBox="0 0 40 40"
          style={{ background: '#f2f2f7', borderRadius: '50%' }}
        >
          <circle
            cx={20}
            cy={20}
            r={15}
            fill="none"
            stroke="#d1d1d6"
            strokeWidth={3}
          />
          <circle
            cx={20}
            cy={20}
            r={15}
            fill="none"
            stroke={ui.blue}
            strokeWidth={3}
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray={`${progress} 1`}
            transform="rotate(-90 20 20)"
          />
          <rect x={16} y={16} width={8} height={8} rx={1.5} fill={ui.blue} />
        </svg>
      ) : (
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: r,
            background: state === 'get' ? ui.blue : '#e8e8ed',
            color: state === 'get' ? '#fff' : ui.blue,
            fontFamily: fonts.body,
            fontWeight: 800,
            fontSize: h * 0.44,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            letterSpacing: '0.02em',
          }}
        >
          {state === 'get' ? 'OBTENIR' : 'OUVRIR'}
        </div>
      )}
    </div>
  )
}

/** An annotation: a dot on the UI, a hairline, a white label. */
const Callout: React.FC<{
  x: number
  y: number
  dx: number
  dy: number
  text: string
  at: number
  color?: string
}> = ({ x, y, dx, dy, text, at, color = ui.blue }) => {
  const f = useCurrentFrame()
  const t = interpolate(f, [at, at + 14], [0, 1], { ...clamp, easing: easeOut })
  const line = interpolate(f, [at, at + 10], [0, 1], clamp)
  if (t <= 0) return null
  return (
    <>
      <svg
        style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }}
        width={1}
        height={1}
      >
        <line
          x1={x}
          y1={y}
          x2={x + dx * line}
          y2={y + dy * line}
          stroke={ink}
          strokeOpacity={0.35}
          strokeWidth={2}
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
          left: x + dx,
          top: y + dy,
          transform: `translate(${dx < 0 ? '-100%' : '0'}, -50%) scale(${0.9 + t * 0.1})`,
          opacity: t,
          padding: '14px 24px',
          borderRadius: 999,
          background: '#fff',
          boxShadow: '0 12px 30px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)',
          fontFamily: fonts.body,
          fontWeight: 700,
          fontSize: 28,
          color: ink,
          whiteSpace: 'nowrap',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <div
          style={{ width: 12, height: 12, borderRadius: 6, background: color }}
        />
        {text}
      </div>
    </>
  )
}

const Dock: React.FC<{ bounceAt: number; y: number }> = ({ bounceAt, y }) => {
  const f = useCurrentFrame()
  const { fps } = useVideoConfig()
  const rise = spring({
    frame: f - 4,
    fps,
    config: { damping: 18, stiffness: 120 },
  })
  const bounce =
    f >= bounceAt && f < bounceAt + 18
      ? Math.sin(((f - bounceAt) / 18) * Math.PI) * 26
      : 0
  const W = 1000
  const H = (W * 140) / 1990
  return (
    <div
      style={{
        position: 'absolute',
        left: 540 - W / 2,
        top: y,
        width: W,
        height: H,
        opacity: rise,
        transform: `translateY(${(1 - rise) * 160}px)`,
      }}
    >
      <Img
        src={footage('dock.webp')}
        style={{
          width: W,
          height: H,
          filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.18))',
        }}
      />
      {/* The App Store icon lifts on click, as the Dock does */}
      <div
        style={{
          position: 'absolute',
          left: W * 0.0986 - H * 0.42,
          top: H * 0.08 - bounce,
          width: H * 0.84,
          height: H * 0.84,
          overflow: 'hidden',
          borderRadius: H * 0.2,
          opacity: bounce > 0 ? 1 : 0,
        }}
      >
        <Img
          src={footage('dock.webp')}
          style={{
            position: 'absolute',
            left: -(W * 0.0986 - H * 0.42),
            top: -H * 0.08,
            width: W,
            height: H,
          }}
        />
      </div>
    </div>
  )
}

type Pick = {
  key: string
  sidebarY: number
  shot: string
  domain: string
  title: string
  subtitle: string
  callouts: {
    x: number
    y: number
    dx: number
    dy: number
    text: string
    color: string
  }[]
  refreshApercu?: string
}

const PICKS: Pick[] = [
  {
    key: 'medicalAi',
    sidebarY: 0.585,
    shot: projectImage(projects[1]),
    domain: 'medical-ai.antoinegourgue.dev',
    title: 'Zoidberg 2.0',
    subtitle: 'IA médicale, en ligne.',
    callouts: [
      {
        x: 0.5,
        y: 0.2,
        dx: -120,
        dy: -110,
        text: '91,2 % d’exactitude',
        color: ui.green,
      },
      {
        x: 0.5,
        y: 0.68,
        dx: 120,
        dy: 120,
        text: 'Verdict + Grad-CAM',
        color: '#1fb8a6',
      },
    ],
  },
  {
    key: 'tailtcg',
    sidebarY: 0.302,
    shot: staticFile('footage/tailtcg.jpg'),
    domain: 'tailtcg.antoinegourgue.dev',
    title: 'TailTCG',
    subtitle: 'Ta collection Pokémon.',
    callouts: [
      {
        x: 0.66,
        y: 0.45,
        dx: -60,
        dy: -200,
        text: 'Scan au téléphone',
        color: '#ff5a36',
      },
      {
        x: 0.2,
        y: 0.42,
        dx: 40,
        dy: 210,
        text: 'Cote Cardmarket chaque nuit',
        color: '#ff9f0a',
      },
    ],
    refreshApercu: staticFile('footage/tailtcg.jpg'),
  },
  {
    key: 'mosaic',
    sidebarY: 0.359,
    shot: projectImage(projects[0]),
    domain: 'mosaic.antoinegourgue.dev',
    title: 'Mosaic',
    subtitle: 'Des boards, en temps réel.',
    callouts: [
      {
        x: 0.5,
        y: 0.5,
        dx: -140,
        dy: 170,
        text: 'Boards collaboratifs',
        color: '#e60023',
      },
      {
        x: 0.28,
        y: 0.08,
        dx: 90,
        dy: -120,
        text: 'Next.js · Prisma · Auth.js',
        color: ink,
      },
    ],
  },
]
const PICK_LEN = 110

const AppStoreWindow: React.FC<{
  shot: string
  apercu?: string
  children?: React.ReactNode
}> = ({ shot, apercu, children }) => (
  <div
    style={{
      position: 'absolute',
      left: 0,
      top: 0,
      width: WIN_W,
      height: WIN_H,
    }}
  >
    <Img
      src={shot}
      style={{
        width: WIN_W,
        height: WIN_H,
        filter: 'drop-shadow(0 40px 90px rgba(0,0,0,0.22))',
      }}
    />
    {apercu && (
      <Img
        src={apercu}
        style={{
          position: 'absolute',
          left: WIN_W * APERCU.x,
          top: WIN_H * APERCU.y,
          width: WIN_W * APERCU.w,
          height: WIN_H * APERCU.h,
          objectFit: 'cover',
          objectPosition: 'top',
          borderRadius: 12,
        }}
      />
    )}
    {children}
  </div>
)

const SafariWindow: React.FC<{ src: string; domain: string }> = ({
  src,
  domain,
}) => (
  <LightWindow
    width={960}
    height={640}
    style={{ position: 'relative' }}
    toolbar={
      <div
        style={{
          position: 'absolute',
          left: 200,
          right: 200,
          top: 9,
          height: 34,
          borderRadius: 10,
          background: 'rgba(0,0,0,0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          fontSize: 18,
          color: '#3a3a3c',
        }}
      >
        <Icon name="lock_fill" size={14} color="#8e8e93" />
        {domain}
      </div>
    }
  >
    <Img
      src={src}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'top',
      }}
    />
  </LightWindow>
)

/** Opening: the Dock, a click, the App Store grows out of its icon. */
const Launch: React.FC = () => {
  const f = useCurrentFrame()
  const dockY = 1180
  const iconX = 540 - 500 + 1000 * 0.0986
  const iconY = dockY + 35
  const open = interpolate(f, [68, 92], [0, 1], { ...clamp, easing: easeOut })
  const cx = keyframes(f, [
    { f: 20, v: 760 },
    { f: 52, v: iconX - 4 },
  ])
  const cy = keyframes(f, [
    { f: 20, v: 900 },
    { f: 52, v: iconY - 6 },
  ])
  return (
    <AbsoluteFill>
      <Caption
        first="Mes projets ?"
        second="Ouvrez mon App Store."
        start={4}
        exit={100}
      />
      <Dock bounceAt={58} y={dockY} />
      {f >= 66 && (
        <div
          style={{
            position: 'absolute',
            left: WIN_X,
            top: WIN_Y,
            opacity: open,
            transform: `translate(${(1 - open) * (iconX - WIN_X - WIN_W / 2)}px, ${(1 - open) * (iconY - WIN_Y - WIN_H / 2)}px) scale(${0.05 + open * 0.95})`,
          }}
        >
          <AppStoreWindow shot={footage('appstore-emailEditor.webp')} />
        </div>
      )}
      {f > 16 && f < 70 && <Cursor x={cx} y={cy} pressed={f >= 56 && f < 60} />}
    </AbsoluteFill>
  )
}

/** Digitaleo's page: OBTENIR, download, OUVRIR, and the app opens. */
const DigitaleoGet: React.FC = () => {
  const f = useCurrentFrame()
  const zoom = interpolate(f, [72, 84], [0, 1], { ...clamp, easing: easeIn })
  const bx = WIN_X + WIN_W * GET.x
  const by = WIN_Y + WIN_H * GET.y
  const cx = keyframes(f, [
    { f: 0, v: 700 },
    { f: 26, v: bx },
    { f: 66, v: bx + 4 },
  ])
  const cy = keyframes(f, [
    { f: 0, v: 1000 },
    { f: 26, v: by },
  ])
  return (
    <AbsoluteFill style={{ opacity: 1 - zoom }}>
      <Caption first="Chaque projet" second="s’ouvre pour de vrai." start={2} />
      <div
        style={{
          position: 'absolute',
          left: WIN_X,
          top: WIN_Y,
          transform: `scale(${1 + zoom * 1.6})`,
          transformOrigin: `${GET.x * 100}% ${GET.y * 100}%`,
        }}
      >
        <AppStoreWindow shot={footage('appstore-emailEditor.webp')}>
          <GetButton getAt={30} openAt={56} />
        </AppStoreWindow>
      </div>
      {f < 76 && (
        <Cursor
          x={cx}
          y={cy}
          pressed={(f >= 27 && f < 30) || (f >= 64 && f < 67)}
        />
      )}
    </AbsoluteFill>
  )
}

const ProjectPick: React.FC<{ pick: Pick; prevShot: string }> = ({
  pick,
  prevShot,
}) => {
  const f = useCurrentFrame()
  const { fps } = useVideoConfig()
  const back = interpolate(f, [0, 6], [0.3, 1], { ...clamp, easing: easeOut })
  const swap = interpolate(f, [22, 30], [0, 1], { ...clamp, easing: easeInOut })
  const launch = spring({
    frame: f - 66,
    fps,
    config: { damping: 18, stiffness: 120 },
  })
  const leave = interpolate(f, [PICK_LEN - 6, PICK_LEN], [0, 1], clamp)
  const sx = WIN_X + WIN_W * SIDEBAR_X
  const sy = WIN_Y + WIN_H * pick.sidebarY
  const bx = WIN_X + WIN_W * GET.x
  const by = WIN_Y + WIN_H * GET.y
  const cx = keyframes(f, [
    { f: 4, v: 820 },
    { f: 18, v: sx },
    { f: 38, v: bx },
  ])
  const cy = keyframes(f, [
    { f: 4, v: 1100 },
    { f: 18, v: sy },
    { f: 38, v: by },
  ])
  const shot = footage(`appstore-${pick.key}.webp`)
  const safariX = 60
  const safariY = 420
  return (
    <AbsoluteFill style={{ opacity: 1 - leave }}>
      <Caption first={pick.title} second={pick.subtitle} start={24} size={70} />
      <div
        style={{
          position: 'absolute',
          left: WIN_X,
          top: WIN_Y,
          opacity: back * (1 - launch),
          transform: `scale(${0.96 + back * 0.04 - launch * 0.06})`,
        }}
      >
        <AppStoreWindow shot={prevShot} />
        <div style={{ position: 'absolute', inset: 0, opacity: swap }}>
          <AppStoreWindow shot={shot} apercu={pick.refreshApercu}>
            <GetButton getAt={44} openAt={58} />
          </AppStoreWindow>
        </div>
      </div>
      {f >= 64 && (
        <div
          style={{
            position: 'absolute',
            left: safariX,
            top: safariY,
            opacity: launch,
            transform: `scale(${0.4 + launch * 0.6})`,
            transformOrigin: `${((bx - safariX) / 960) * 100}% ${((by - safariY) / 640) * 100}%`,
          }}
        >
          <SafariWindow src={pick.shot} domain={pick.domain} />
        </div>
      )}
      {f >= 64 &&
        pick.callouts.map((c, i) => (
          <Callout
            key={c.text}
            x={safariX + 960 * c.x}
            y={safariY + 52 + 588 * c.y}
            dx={c.dx}
            dy={c.dy}
            text={c.text}
            color={c.color}
            at={74 + i * 8}
          />
        ))}
      {f < 66 && (
        <Cursor
          x={cx}
          y={cy}
          pressed={
            (f >= 18 && f < 21) || (f >= 41 && f < 44) || (f >= 62 && f < 65)
          }
        />
      )}
    </AbsoluteFill>
  )
}

const MobileAppStore: React.FC = () => {
  const f = useCurrentFrame()
  const { fps } = useVideoConfig()
  const PW = 470
  const SW = PW * 0.936
  const SH = SW * PHONE_RATIO
  const rise = spring({
    frame: f - 2,
    fps,
    config: { damping: 18, stiffness: 100 },
  })
  const launch = interpolate(f, [70, 86], [0, 1], { ...clamp, easing: easeOut })
  const exit = interpolate(f, [168, 180], [0, 1], { ...clamp, easing: easeIn })
  const btn = { x: 0.862, y: 0.68 }
  const PX = 540 - PW / 2
  const PY = 330
  return (
    <AbsoluteFill style={{ opacity: 1 - exit }}>
      <Caption first="Et sur iPhone," second="la même expérience." start={4} />
      <div
        style={{
          position: 'absolute',
          left: PX,
          top: PY,
          opacity: rise,
          transform: `translateY(${(1 - rise) * 400}px) rotateY(${-6 + f * 0.05}deg)`,
        }}
      >
        <Phone width={PW} glow="rgba(0,0,0,0.12)">
          <Img
            src={footage('mobile-projects.jpg')}
            style={{ width: SW, height: SH }}
          />
          {f >= 70 && (
            <div
              style={{
                position: 'absolute',
                left: SW * btn.x * (1 - launch),
                top: SH * btn.y * (1 - launch),
                width: SW,
                height: SH,
                transform: `scale(${0.08 + launch * 0.92})`,
                transformOrigin: 'top left',
                borderRadius: 40 * (1 - launch),
                overflow: 'hidden',
                opacity: Math.min(1, launch * 3),
              }}
            >
              <Img
                src={footage('tailtcg-mobile.jpg')}
                style={{ width: SW, height: SH }}
              />
            </div>
          )}
          <Tap x={SW * btn.x} y={SH * btn.y} at={52} />
          <Tap x={SW * btn.x} y={SH * btn.y} at={66} />
        </Phone>
      </div>
      <Callout
        x={PX + 16 + SW * 0.2}
        y={PY + 16 + SH * 0.68}
        dx={-60}
        dy={-160}
        text="Même App Store"
        at={30}
        color={ui.blue}
      />
      <Callout
        x={PX + 16 + SW * 0.5}
        y={PY + 16 + SH * 0.3}
        dx={-80}
        dy={-40}
        text="TailTCG, en responsive"
        at={100}
        color="#ff5a36"
      />
    </AbsoluteFill>
  )
}

const JOB_MAIL = {
  subject: 'Recherche d’emploi — CDI Fullstack × IA',
  body: 'Bonjour, diplômé d’un Master of Science en IA (Epitech Rennes) après 2,5 ans chez Digitaleo, je recherche un CDI de développeur Fullstack × IA dès octobre 2026, à Anglet, Bordeaux, Paris ou Lille.',
}

/** The job search as an email: typed, CV attached, sent, received on iPhone. */
const JobMail: React.FC = () => {
  const f = useCurrentFrame()
  const { fps } = useVideoConfig()
  const win = spring({ frame: f, fps, config: { damping: 18, stiffness: 110 } })
  // CV.pdf dragged in from the left edge by the cursor
  const dragT = interpolate(f, [118, 146], [0, 1], {
    ...clamp,
    easing: easeInOut,
  })
  const dragX = interpolate(dragT, [0, 1], [-60, 190])
  const dragY = interpolate(dragT, [0, 1], [1180, 830])
  const sendAt = 162
  const phone = spring({
    frame: f - 178,
    fps,
    config: { damping: 18, stiffness: 100 },
  })
  const insert = interpolate(f, [196, 210], [0, 1], {
    ...clamp,
    easing: easeOut,
  })
  const PW = 420
  const SW = PW * 0.936
  const SH = SW * PHONE_RATIO
  const rowTop = SH * 0.154
  const rowH = SH * 0.11
  const cx = keyframes(f, [
    { f: 150, v: 330 },
    { f: 160, v: 60 + 960 - 150 },
  ])
  const cy = keyframes(f, [
    { f: 150, v: 860 },
    { f: 160, v: 330 + 700 - 60 },
  ])
  return (
    <AbsoluteFill>
      <Caption
        first="Ma recherche,"
        second="en un e-mail."
        start={2}
        exit={172}
      />
      {f >= 176 && (
        <Caption first="Envoyée." second="Reçue sur iPhone." start={180} />
      )}
      <MailCompose
        width={960}
        height={700}
        to="Votre équipe"
        subject={JOB_MAIL.subject}
        body={JOB_MAIL.body}
        typeAt={8}
        cps={62}
        sendAt={sendAt}
        attachment={{ name: 'CV-Antoine-Gourgue.pdf', at: 146 }}
        style={{
          left: 60,
          top: 330,
          opacity: win,
          transform: `translateY(${(1 - win) * 200}px)`,
        }}
      />
      {f >= 118 && f < 148 && (
        <div
          style={{
            position: 'absolute',
            left: dragX,
            top: dragY,
            transform: `rotate(${(1 - dragT) * -8}deg)`,
          }}
        >
          <PdfIcon size={90} />
          <Cursor x={52} y={50} />
        </div>
      )}
      {f >= 148 && f < 166 && (
        <Cursor x={cx} y={cy} pressed={f >= sendAt && f < sendAt + 4} />
      )}
      {f >= 178 && (
        <div
          style={{
            position: 'absolute',
            left: 540 - PW / 2,
            top: 330,
            opacity: phone,
            transform: `translateY(${(1 - phone) * 420}px)`,
          }}
        >
          <Phone width={PW} glow="rgba(0,0,0,0.12)">
            <Img
              src={footage('mobile-contact.jpg')}
              style={{
                position: 'absolute',
                width: SW,
                height: SH,
                clipPath: `inset(0 0 ${(1 - rowTop / SH) * 100}% 0)`,
              }}
            />
            <Img
              src={footage('mobile-contact.jpg')}
              style={{
                position: 'absolute',
                width: SW,
                height: SH,
                clipPath: `inset(${(rowTop / SH) * 100}% 0 0 0)`,
                transform: `translateY(${insert * rowH}px)`,
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: rowTop,
                width: SW,
                height: rowH * insert,
                overflow: 'hidden',
                background: '#fff',
                fontFamily: fonts.body,
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  left: SW * 0.052,
                  top: rowH * 0.2,
                  width: SW * 0.022,
                  height: SW * 0.022,
                  borderRadius: '50%',
                  background: ui.blue,
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  left: SW * 0.238,
                  top: rowH * 0.1,
                  right: SW * 0.05,
                  fontSize: SW * 0.043,
                  lineHeight: 1.3,
                  color: ink,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontWeight: 700,
                  }}
                >
                  {person.firstName} {person.lastName}
                  <span style={{ fontWeight: 400, color: '#8e8e93' }}>
                    maintenant
                  </span>
                </div>
                <div style={{ fontSize: SW * 0.04 }}>
                  Recherche d’emploi — CDI Fullstack × IA
                </div>
                <div
                  style={{
                    fontSize: SW * 0.037,
                    color: '#8e8e93',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                  }}
                >
                  Bonjour, diplômé d’un Master of Science en IA…
                </div>
              </div>
            </div>
            <div
              style={{
                position: 'absolute',
                left: SW * 0.03,
                top: SH * 0.05,
                width: 840,
                transform: `scale(${(SW * 0.94) / 840})`,
                transformOrigin: 'top left',
              }}
            >
              <Banner
                at={188}
                width={840}
                dark={false}
                title={`${person.firstName} ${person.lastName}`}
                body="Recherche d’emploi — CDI Fullstack × IA"
                style={{ position: 'relative' }}
              />
            </div>
          </Phone>
        </div>
      )}
    </AbsoluteFill>
  )
}

export const AppStore: React.FC<{ withAudio?: boolean }> = ({
  withAudio = true,
}) => (
  <AbsoluteFill style={{ background: '#f2f2f5' }}>
    <Stage />
    <Sequence from={0} durationInFrames={104} name="Launch">
      <Launch />
    </Sequence>
    <Sequence from={100} durationInFrames={86} name="Digitaleo get">
      <DigitaleoGet />
    </Sequence>
    <Sequence from={180} durationInFrames={150} name="Digitaleo">
      <Digitaleo />
    </Sequence>
    {PICKS.map((p, i) => (
      <Sequence
        key={p.key}
        from={330 + i * PICK_LEN}
        durationInFrames={PICK_LEN}
        name={p.title}
      >
        <Stage />
        <ProjectPick
          pick={p}
          prevShot={footage(
            i === 0
              ? 'appstore-emailEditor.webp'
              : `appstore-${PICKS[i - 1].key}.webp`
          )}
        />
      </Sequence>
    ))}
    <Sequence from={660} durationInFrames={180} name="Mobile App Store">
      <Stage />
      <MobileAppStore />
    </Sequence>
    <Sequence from={840} durationInFrames={250} name="Job mail">
      <Stage />
      <JobMail />
    </Sequence>
    <Sequence from={1080} name="Closing">
      <ClosingCard
        start={0}
        dark={false}
        background={<Stage />}
        accent={BLUE_TEXT}
      />
    </Sequence>
    {withAudio && <Audio src={staticFile('audio/AppStore.wav')} />}
  </AbsoluteFill>
)
