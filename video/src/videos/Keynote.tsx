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
import { asset, fonts, person } from '../brand'
import { footage } from '../scenes/OsScenes'
import { PHONE_RATIO, Phone } from '../ui/Apps'
import {
  AGLogo,
  Counter,
  TechIcon,
  clamp,
  easeIn,
  easeInOut,
  easeOut,
} from '../ui/Primitives'

// Apple product-page palette: near-white page, grey tiles, one accent
const page = '#fbfbfd'
const ink = '#1d1d1f'
const grey = '#6e6e73'
const tile = '#f2f2f5'
const blue = '#0071e3'
const NEW = '#bf4800'
const HERO_GRADIENT =
  'linear-gradient(90deg, #0071e3 0%, #7d4cdb 50%, #d6336c 100%)'

const useIn = (d: number, dur = 20) => {
  const f = useCurrentFrame()
  const t = interpolate(f, [d, d + dur], [0, 1], { ...clamp, easing: easeOut })
  return {
    opacity: t,
    transform: `translateY(${(1 - t) * 40}px)`,
  }
}

const Hero: React.FC = () => {
  const f = useCurrentFrame()
  const lift = interpolate(f, [96, 120], [0, 1], { ...clamp, easing: easeIn })
  const eyebrow = useIn(4)
  const title = useIn(10, 24)
  const sub = useIn(26)
  const tag = useIn(40)
  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontFamily: fonts.display,
        color: ink,
        opacity: 1 - lift,
        transform: `translateY(${lift * -120}px)`,
      }}
    >
      <div
        style={{
          ...eyebrow,
          color: NEW,
          fontSize: 36,
          fontWeight: 600,
          fontFamily: fonts.body,
        }}
      >
        Nouveau
      </div>
      <div
        style={{
          ...title,
          marginTop: 10,
          fontSize: 132,
          fontWeight: 800,
          letterSpacing: '-0.045em',
          lineHeight: 1,
        }}
      >
        Antoine
        <br />
        Gourgue
      </div>
      <div
        style={{
          ...sub,
          marginTop: 30,
          fontSize: 60,
          fontWeight: 700,
          letterSpacing: '-0.02em',
          backgroundImage: HERO_GRADIENT,
          WebkitBackgroundClip: 'text',
          color: 'transparent',
        }}
      >
        Fullstack. IA. Tout-en-un.
      </div>
      <div
        style={{
          ...tag,
          marginTop: 22,
          fontSize: 38,
          fontWeight: 500,
          color: grey,
          fontFamily: fonts.body,
        }}
      >
        Disponible en octobre.
      </div>
    </AbsoluteFill>
  )
}

/** CSS MacBook whose lid opens on the portfolio desktop. */
const Devices: React.FC = () => {
  const f = useCurrentFrame()
  const { fps } = useVideoConfig()
  const rise = spring({ frame: f, fps, config: { damping: 20, stiffness: 90 } })
  const lid = interpolate(f, [10, 46], [-92, 0], {
    ...clamp,
    easing: easeInOut,
  })
  const phone = spring({
    frame: f - 46,
    fps,
    config: { damping: 16, stiffness: 110 },
  })
  const exit = interpolate(f, [146, 160], [0, 1], { ...clamp, easing: easeIn })
  const title = useIn(2)
  const sub = useIn(12)
  const W = 900
  const H = 562
  return (
    <AbsoluteFill
      style={{ opacity: 1 - exit, fontFamily: fonts.display, color: ink }}
    >
      <div
        style={{
          position: 'absolute',
          top: 110,
          width: '100%',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            ...title,
            fontSize: 88,
            fontWeight: 800,
            letterSpacing: '-0.04em',
          }}
        >
          AntoineOS 26.
        </div>
        <div
          style={{
            ...sub,
            fontSize: 44,
            fontWeight: 600,
            color: grey,
            marginTop: 8,
          }}
        >
          Sur Mac. Et sur iPhone.
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 540 - W / 2,
          top: 430,
          width: W,
          perspective: 2000,
          opacity: rise,
          transform: `translateY(${(1 - rise) * 300}px) scale(${0.96 + f * 0.0003})`,
        }}
      >
        <div
          style={{
            width: W,
            height: H,
            borderRadius: '26px 26px 6px 6px',
            background: '#0d0d0f',
            padding: 16,
            boxSizing: 'border-box',
            transformOrigin: 'bottom center',
            transform: `rotateX(${lid}deg)`,
            boxShadow: '0 30px 60px rgba(0,0,0,0.18)',
          }}
        >
          <Img
            src={footage('desktop.jpg')}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 10,
              objectFit: 'cover',
              filter: `brightness(${interpolate(lid, [-40, 0], [0.2, 1], clamp)})`,
            }}
          />
        </div>
        <div
          style={{
            width: W * 1.12,
            marginLeft: -W * 0.06,
            height: 30,
            borderRadius: '0 0 30px 30px',
            background: 'linear-gradient(180deg, #d9d9de 0%, #a9a9b0 100%)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              width: 150,
              height: 10,
              marginLeft: -75,
              borderRadius: '0 0 10px 10px',
              background: '#9a9aa1',
            }}
          />
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 790,
          top: 700,
          opacity: phone,
          transform: `translateX(${(1 - phone) * 200}px) rotate(${(1 - phone) * 8}deg)`,
        }}
      >
        <Phone width={230} glow="rgba(0,0,0,0.08)">
          <Img
            src={footage('mobile-home.jpg')}
            style={{ width: 230 * 0.936, height: 230 * 0.936 * PHONE_RATIO }}
          />
        </Phone>
      </div>
    </AbsoluteFill>
  )
}

const Tile: React.FC<{
  x: number
  y: number
  w: number
  h: number
  at: number
  children: React.ReactNode
  dark?: boolean
}> = ({ x, y, w, h, at, children, dark }) => {
  const f = useCurrentFrame()
  const { fps } = useVideoConfig()
  const s = spring({
    frame: f - at,
    fps,
    config: { damping: 18, stiffness: 120 },
  })
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: w,
        height: h,
        borderRadius: 32,
        background: dark ? '#000' : tile,
        color: dark ? '#f5f5f7' : ink,
        overflow: 'hidden',
        opacity: s,
        transform: `translateY(${(1 - s) * 60}px) scale(${0.95 + s * 0.05})`,
        padding: 40,
        boxSizing: 'border-box',
        fontFamily: fonts.display,
      }}
    >
      {children}
    </div>
  )
}

const Big: React.FC<{
  children: React.ReactNode
  gradient: string
  size?: number
}> = ({ children, gradient, size = 120 }) => (
  <div
    style={{
      fontSize: size,
      fontWeight: 800,
      letterSpacing: '-0.045em',
      lineHeight: 1,
      backgroundImage: gradient,
      WebkitBackgroundClip: 'text',
      color: 'transparent',
      paddingBottom: 6,
    }}
  >
    {children}
  </div>
)

const Label: React.FC<{ children: React.ReactNode; small?: string }> = ({
  children,
  small,
}) => (
  <div style={{ marginTop: 12 }}>
    <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: '-0.02em' }}>
      {children}
    </div>
    {small && (
      <div
        style={{
          fontSize: 24,
          fontWeight: 500,
          color: grey,
          marginTop: 6,
          fontFamily: fonts.body,
        }}
      >
        {small}
      </div>
    )}
  </div>
)

const ICONS = [
  'mosaic-icon.png',
  'medical-ai-icon.png',
  'tailtcg-icon.png',
  'jobboard-icon.png',
  'trelltech-icon.png',
  'epihardware-icon.png',
  'echoconnect-icon.png',
  'sapia-icon.png',
]

const TECH = [
  { icon: 'vuedotjs.svg', color: '#42b883' },
  { icon: 'nuxt.svg', color: '#00DC82' },
  { icon: 'typescript.svg', color: '#3178C6' },
  { icon: 'nodedotjs.svg', color: '#5FA04E' },
  { icon: 'python.svg', color: '#3776AB' },
  { icon: 'docker.svg', color: '#2496ED' },
  { icon: 'tailwindcss.svg', color: '#06B6D4' },
  { icon: 'git.svg', color: '#F05032' },
]

const Bento: React.FC = () => {
  const f = useCurrentFrame()
  const pan = interpolate(f, [70, 250], [0, -420], {
    ...clamp,
    easing: easeInOut,
  })
  const exit = interpolate(f, [246, 260], [0, 1], { ...clamp, easing: easeIn })
  const title = useIn(0)
  const L = 50
  const C = 478
  const G = 24
  return (
    <AbsoluteFill style={{ opacity: 1 - exit }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `translateY(${pan}px)`,
        }}
      >
        <div
          style={{
            ...title,
            position: 'absolute',
            top: 90,
            left: L,
            fontFamily: fonts.display,
            fontSize: 84,
            fontWeight: 800,
            letterSpacing: '-0.04em',
            color: ink,
          }}
        >
          Points forts.
        </div>
        <Tile x={L} y={230} w={980} h={300} at={10}>
          <Big gradient="linear-gradient(90deg, #ff6a00, #ee0979)" size={150}>
            <Counter to={37000} start={14} duration={36} />
          </Big>
          <Label small="Digitaleo · éditeur d'email · alternance 2024 — 2026">
            utilisateurs actifs sur l’app
          </Label>
        </Tile>
        <Tile x={L} y={554} w={C} h={360} at={24}>
          <Big gradient="linear-gradient(90deg, #11998e, #38ef7d)">91,2 %</Big>
          <Label small="Zoidberg 2.0 · CNN · détection de pneumonie">
            d’exactitude
          </Label>
        </Tile>
        <Tile x={L + C + G} y={554} w={C} h={360} at={32}>
          <Big gradient="linear-gradient(90deg, #0071e3, #7d4cdb)">12</Big>
          <Label>projets en ligne</Label>
          <div
            style={{
              marginTop: 18,
              display: 'grid',
              gridTemplateColumns: 'repeat(8, 1fr)',
              gap: 8,
            }}
          >
            {ICONS.map((i) => (
              <Img
                key={i}
                src={asset(`projects/${i}`)}
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 10,
                  objectFit: 'cover',
                }}
              />
            ))}
          </div>
        </Tile>
        <Tile x={L} y={938} w={C} h={564} at={44} dark>
          <div
            style={{ fontSize: 40, fontWeight: 800, letterSpacing: '-0.03em' }}
          >
            Aussi sur iPhone.
          </div>
          <div
            style={{
              fontSize: 24,
              color: '#a1a1a6',
              marginTop: 6,
              fontFamily: fonts.body,
            }}
          >
            Chaque app, en version iOS.
          </div>
          <div style={{ position: 'absolute', left: 120, top: 150 }}>
            <Phone width={240} glow="rgba(10,132,255,0.25)">
              <Img
                src={footage('mobile-projects.jpg')}
                style={{
                  width: 240 * 0.936,
                  height: 240 * 0.936 * PHONE_RATIO,
                }}
              />
            </Phone>
          </div>
        </Tile>
        <Tile x={L + C + G} y={938} w={C} h={280} at={52}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 22,
            }}
          >
            {TECH.map((t) => (
              <TechIcon key={t.icon} icon={t.icon} size={46} color={t.color} />
            ))}
          </div>
          <Label small="Vue · Nuxt · TS · Node · Python">
            Front, back et IA
          </Label>
        </Tile>
        <Tile x={L + C + G} y={1242} w={C} h={260} at={60}>
          <Big gradient="linear-gradient(90deg, #7d4cdb, #d6336c)" size={96}>
            MSc IA
          </Big>
          <Label small="Master of Science · 2023 — 2026">Epitech Rennes</Label>
        </Tile>
        <Tile x={L} y={1526} w={C} h={200} at={70}>
          <Big gradient="linear-gradient(90deg, #ff6a00, #ffb347)" size={88}>
            2,5 ans
          </Big>
          <Label>d’alternance</Label>
        </Tile>
        <Tile x={L + C + G} y={1526} w={C} h={200} at={76}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: 11,
                background: '#34c759',
                boxShadow: `0 0 ${10 + Math.sin(f / 8) * 6}px #34c759`,
              }}
            />
            <div
              style={{
                fontSize: 56,
                fontWeight: 800,
                letterSpacing: '-0.03em',
              }}
            >
              Disponible
            </div>
          </div>
          <Label>CDI · octobre 2026</Label>
        </Tile>
      </div>
    </AbsoluteFill>
  )
}

const SPECS: [string, string][] = [
  ['Rôle', 'Développeur Fullstack × IA'],
  ['Front-end', 'Vue, Nuxt, TypeScript, Tailwind'],
  ['Back-end', 'Node.js, Prisma, PostgreSQL, Docker'],
  ['IA', 'Python, CNN, NLP, LLM'],
  ['Formation', 'Master of Science IA — Epitech Rennes'],
  ['Expérience', 'Digitaleo — 2,5 ans d’alternance'],
  ['Langues', 'Français (natif), anglais technique'],
  ['Disponibilité', 'CDI — octobre 2026'],
  ['Mobilité', 'Anglet · Bordeaux · Paris · Lille'],
]

const Specs: React.FC = () => {
  const f = useCurrentFrame()
  const exit = interpolate(f, [186, 200], [0, 1], { ...clamp, easing: easeIn })
  const title = useIn(0)
  return (
    <AbsoluteFill
      style={{ opacity: 1 - exit, fontFamily: fonts.display, color: ink }}
    >
      <div
        style={{
          ...title,
          position: 'absolute',
          top: 90,
          left: 50,
          right: 50,
          fontSize: 76,
          fontWeight: 800,
          letterSpacing: '-0.04em',
          lineHeight: 1.05,
        }}
      >
        Caractéristiques
        <br />
        techniques.
      </div>
      <div style={{ position: 'absolute', top: 330, left: 50, right: 50 }}>
        {SPECS.map(([k, v], i) => {
          const d = 16 + i * 11
          const t = interpolate(f, [d, d + 16], [0, 1], {
            ...clamp,
            easing: easeOut,
          })
          return (
            <div
              key={k}
              style={{
                display: 'flex',
                gap: 30,
                padding: '24px 0',
                borderTop: `1px solid rgba(0,0,0,${0.12 * t})`,
                opacity: t,
                transform: `translateY(${(1 - t) * 18}px)`,
              }}
            >
              <div style={{ width: 300, fontSize: 28, fontWeight: 700 }}>
                {k}
              </div>
              <div
                style={{
                  flex: 1,
                  fontSize: 30,
                  fontWeight: 500,
                  color: '#3a3a3c',
                  fontFamily: fonts.body,
                }}
              >
                {v}
              </div>
            </div>
          )
        })}
      </div>
    </AbsoluteFill>
  )
}

const Buy: React.FC = () => {
  const f = useCurrentFrame()
  const a = useIn(4, 24)
  const b = useIn(16)
  const c = useIn(28)
  const d = useIn(40)
  const e = useIn(52)
  const breathe = 1 + f * 0.0003
  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontFamily: fonts.display,
        color: ink,
        transform: `scale(${breathe})`,
      }}
    >
      <div style={a}>
        <AGLogo size={130} color={ink} />
      </div>
      <div
        style={{
          ...b,
          marginTop: 34,
          fontSize: 112,
          fontWeight: 800,
          letterSpacing: '-0.045em',
          lineHeight: 1,
        }}
      >
        Disponible
        <br />
        en octobre.
      </div>
      <div
        style={{
          ...c,
          marginTop: 26,
          fontSize: 40,
          fontWeight: 600,
          color: grey,
        }}
      >
        {person.role}
      </div>
      <div
        style={{
          ...d,
          marginTop: 50,
          display: 'flex',
          gap: 26,
          alignItems: 'center',
        }}
      >
        <div
          style={{
            padding: '24px 52px',
            borderRadius: 999,
            background: blue,
            color: '#fff',
            fontFamily: fonts.body,
            fontWeight: 600,
            fontSize: 38,
          }}
        >
          Me contacter
        </div>
        <div
          style={{
            fontFamily: fonts.body,
            fontWeight: 600,
            fontSize: 36,
            color: blue,
          }}
        >
          {person.url} ›
        </div>
      </div>
      <div
        style={{
          ...e,
          marginTop: 50,
          fontFamily: fonts.body,
          fontSize: 26,
          color: grey,
        }}
      >
        Livraison : octobre 2026 · Anglet, Bordeaux, Paris ou Lille.
      </div>
    </AbsoluteFill>
  )
}

export const Keynote: React.FC<{ withAudio?: boolean }> = ({
  withAudio = true,
}) => (
  <AbsoluteFill style={{ background: page }}>
    <Sequence from={0} durationInFrames={122} name="Hero">
      <Hero />
    </Sequence>
    <Sequence from={104} durationInFrames={160} name="Devices">
      <Devices />
    </Sequence>
    <Sequence from={260} durationInFrames={262} name="Bento">
      <Bento />
    </Sequence>
    <Sequence from={520} durationInFrames={200} name="Specs">
      <Specs />
    </Sequence>
    <Sequence from={716} name="Buy">
      <Buy />
    </Sequence>
    {withAudio && <Audio src={staticFile('audio/Keynote.wav')} />}
  </AbsoluteFill>
)
