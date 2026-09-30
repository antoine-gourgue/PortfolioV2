import { CameraMotionBlur } from '@remotion/motion-blur'
import React from 'react'
import {
  AbsoluteFill,
  Audio,
  Img,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
} from 'remotion'
import {
  asset,
  colors,
  digitaleo,
  fonts,
  person,
  projectImage,
  projects,
  stack,
} from '../brand'
import { CueSheet, cueFrames } from '../cues'
import { Distort, Shake, glitchEnvelope } from '../fx/Distort'
import { Flash, Grain, LightLeak, Vignette } from '../fx/Overlays'
import { Dust } from '../fx/Particles'
import { ShaderBackground } from '../fx/Shader'
import { Starfield } from '../fx/Starfield'
import {
  AGLogo,
  Chip,
  Counter,
  MacWindow,
  RevealText,
  TechIcon,
  clamp,
  easeIn,
  easeInOut,
  easeOut,
  useSpring,
} from '../ui/Primitives'
import {
  CareerCalendar,
  MissionControl,
  MobileTour,
  WhereMap,
  WriteAndClose,
} from '../scenes/OsScenes'
import sheet from './AntoineOS.cues.json'

const cues = sheet as CueSheet
const footage = (name: string) => staticFile(`footage/${name}`)

const GRADIENT =
  'linear-gradient(120deg, #2997ff 0%, #7b5cff 55%, #ff4fd8 100%)'
const AI_GRADIENT =
  'linear-gradient(120deg, #3ad6ff 0%, #7b5cff 60%, #c77dff 100%)'

const Hook: React.FC = () => {
  const f = useCurrentFrame()
  const zoom = interpolate(f, [0, 84], [1, 1.07])
  return (
    <AbsoluteFill style={{ background: colors.night }}>
      <ShaderBackground
        preset="aurora"
        intensity={interpolate(f, [0, 30], [0, 0.45], clamp)}
        colorA="#0b2a5c"
        colorB="#40208a"
      />
      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          gap: 8,
          transform: `scale(${zoom})`,
        }}
      >
        <RevealText
          text={"J'ai transformé\nmon CV"}
          start={3}
          size={104}
          exit={60}
        />
        <RevealText
          text={"en système\nd'exploitation."}
          start={14}
          size={104}
          exit={63}
          gradient={GRADIENT}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  )
}

const Boot: React.FC = () => {
  const f = useCurrentFrame()
  const bg = interpolate(f, [0, 8], [0, 1], clamp)
  const draw = interpolate(f, [4, 28], [0, 1], { ...clamp, easing: easeInOut })
  const fill = interpolate(f, [26, 34], [0, 1], clamp)
  const bar = interpolate(f, [30, 70], [0, 1], { ...clamp, easing: easeInOut })
  // Zoom through the logo into the desktop, whose wallpaper carries the
  // same monogram at its centre: a match cut
  const through = interpolate(f, [70, 84], [0, 1], { ...clamp, easing: easeIn })
  return (
    <AbsoluteFill style={{ background: '#000', opacity: bg * (1 - through) }}>
      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          transform: `scale(${1 + through * 7})`,
        }}
      >
        <div style={{ position: 'relative', width: 260, height: 195 }}>
          {draw < 1 && <AGLogo size={260} drawProgress={draw} />}
          <AGLogo
            size={260}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: fill,
              filter: `drop-shadow(0 0 ${fill * 30}px rgba(120,180,255,0.6))`,
            }}
          />
        </div>
        <div
          style={{
            marginTop: 110,
            width: 320,
            height: 7,
            borderRadius: 4,
            background: 'rgba(255,255,255,0.18)',
            overflow: 'hidden',
            opacity: interpolate(f, [26, 32], [0, 1], clamp) * (1 - through),
          }}
        >
          <div
            style={{
              width: `${bar * 100}%`,
              height: '100%',
              background: '#fff',
              boxShadow: '0 0 14px #fff',
            }}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  )
}

const Desktop: React.FC = () => {
  const f = useCurrentFrame()
  const cam = interpolate(f, [0, 50], [0, 1], { ...clamp, easing: easeOut })
  const tilt = interpolate(f, [10, 80], [0, 1], { ...clamp, easing: easeInOut })
  const drift = interpolate(f, [0, 180], [0, 1])
  const scale = 2.8 - 1.8 * cam
  const term = useSpring(40, { damping: 14 })
  const about = useSpring(52, { damping: 14 })
  const exit = interpolate(f, [164, 180], [0, 1], { ...clamp, easing: easeIn })
  const sheen = interpolate(f, [18, 70], [-60, 160], clamp)

  return (
    <AbsoluteFill style={{ background: colors.night }}>
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(ellipse 70% 45% at 50% 38%, #1d4fa8 0%, #0b1a3d 45%, #05070d 100%)',
          opacity: cam,
        }}
      />
      <Dust count={90} opacity={0.5} />
      <AbsoluteFill
        style={{
          perspective: 1400,
          transform: `translateZ(0) scale(${1 + exit * 0.6})`,
          opacity: 1 - exit,
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 540 - 490,
            top: 470 - 306,
            width: 980,
            height: 612,
            transformStyle: 'preserve-3d',
            transform: `scale(${scale}) rotateX(${tilt * 12}deg) rotateY(${tilt * -16 + drift * 6}deg) rotateZ(${tilt * 2}deg)`,
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 18,
              overflow: 'hidden',
              boxShadow:
                '0 60px 140px rgba(0,0,0,0.6), 0 0 0 1.5px rgba(255,255,255,0.18), 0 0 160px rgba(41,151,255,0.25)',
            }}
          >
            <Img
              src={footage('desktop.jpg')}
              style={{ width: '100%', height: '100%' }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: `linear-gradient(105deg, transparent ${sheen - 20}%, rgba(255,255,255,0.22) ${sheen}%, transparent ${sheen + 12}%)`,
              }}
            />
          </div>
          <Img
            src={footage('window-terminal-neofetch.png')}
            style={{
              position: 'absolute',
              width: 420,
              left: -40,
              top: 300,
              opacity: term,
              transform: `translateZ(${140 + (1 - term) * -300}px) scale(${0.7 + term * 0.3})`,
              filter: 'drop-shadow(0 30px 50px rgba(0,0,0,0.55))',
            }}
          />
          <Img
            src={footage('window-about-card.png')}
            style={{
              position: 'absolute',
              width: 400,
              left: 600,
              top: 190,
              opacity: about,
              transform: `translateZ(${220 + (1 - about) * -300}px) scale(${0.7 + about * 0.3})`,
              filter: 'drop-shadow(0 30px 50px rgba(0,0,0,0.55))',
            }}
          />
        </div>
      </AbsoluteFill>
      <div
        style={{
          position: 'absolute',
          top: 1000,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 26,
          opacity: 1 - exit,
        }}
      >
        <RevealText
          text={`${person.firstName} ${person.lastName}`}
          start={22}
          size={104}
        />
        <div
          style={{
            opacity: interpolate(f, [38, 50], [0, 1], clamp),
            transform: `translateY(${interpolate(f, [38, 56], [20, 0], { ...clamp, easing: easeOut })}px)`,
          }}
        >
          <Chip
            color={colors.sky}
            style={{ fontSize: 34, padding: '14px 28px' }}
          >
            {person.role}
          </Chip>
        </div>
      </div>
    </AbsoluteFill>
  )
}

const PERSPECTIVE = 1100
const SPACING = 600

const Corridor: React.FC = () => {
  const f = useCurrentFrame()
  const list = projects.slice(0, 8)
  const camZ = interpolate(f, [0, 126], [0, 700 + list.length * SPACING], {
    ...clamp,
    easing: (t) => t * t * 0.25 + t * 0.75,
  })
  const titleIn = interpolate(f, [4, 20], [0, 1], { ...clamp, easing: easeOut })
  return (
    <AbsoluteFill style={{ background: colors.night }}>
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(circle at 50% 50%, #12306b 0%, #070b18 55%, #05070d 100%)',
        }}
      />
      <Starfield speed={0.035} count={260} />
      <AbsoluteFill style={{ perspective: PERSPECTIVE }}>
        <div
          style={{
            position: 'absolute',
            left: 540,
            top: 675,
            transformStyle: 'preserve-3d',
          }}
        >
          {list.map((p, i) => {
            const z = -700 - i * SPACING + camZ
            if (z > PERSPECTIVE - 180 || z < -4200) return null
            const side = i % 2 === 0 ? -1 : 1
            const fog = interpolate(z, [-4200, -2600], [0, 1], clamp)
            const near = interpolate(z, [500, PERSPECTIVE - 180], [1, 0], clamp)
            return (
              <div
                key={p.id}
                style={{
                  position: 'absolute',
                  left: -300,
                  top: -230,
                  opacity: fog * near,
                  transform: `translate3d(${side * 400}px, ${((i % 3) - 1) * 80}px, ${z}px) rotateY(${-side * 28}deg)`,
                }}
              >
                <MacWindow
                  width={600}
                  height={380}
                  title={p.name}
                  src={projectImage(p)}
                  glow={p.tint}
                />
                <div
                  style={{
                    marginTop: 18,
                    fontFamily: fonts.body,
                    fontSize: 30,
                    fontWeight: 600,
                    color: colors.white,
                  }}
                >
                  {p.name}
                  <span style={{ color: colors.gray, fontWeight: 400 }}>
                    {'  ·  '}
                    {p.stack}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </AbsoluteFill>
      <div
        style={{
          position: 'absolute',
          top: 90,
          width: '100%',
          opacity: titleIn,
          transform: `translateY(${(1 - titleIn) * -30}px)`,
          textAlign: 'center',
          fontFamily: fonts.display,
          fontWeight: 800,
          fontSize: 66,
          letterSpacing: '-0.03em',
          color: colors.white,
          textShadow: '0 4px 40px rgba(0,0,0,0.8)',
        }}
      >
        Chaque fenêtre est
        <br />
        <span
          style={{
            backgroundImage: GRADIENT,
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
        >
          un vrai site en ligne.
        </span>
      </div>
    </AbsoluteFill>
  )
}

const Wall: React.FC = () => {
  const f = useCurrentFrame()
  const pull = interpolate(f, [0, 80], [0, 1], { ...clamp, easing: easeOut })
  const cols = 3
  const w = 292
  const h = 184
  const gx = 24
  const gy = 64
  return (
    <AbsoluteFill style={{ background: colors.night }}>
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(ellipse 80% 55% at 50% 45%, #10275a 0%, #05070d 75%)',
        }}
      />
      <Dust count={80} opacity={0.4} />
      <AbsoluteFill style={{ perspective: 1600 }}>
        <div
          style={{
            position: 'absolute',
            left: 540 - (cols * w + (cols - 1) * gx) / 2,
            top: 110,
            width: cols * w + (cols - 1) * gx,
            transformStyle: 'preserve-3d',
            transform: `scale(${2.3 - 1.36 * pull}) rotateX(${16 + (1 - pull) * 20}deg) rotateY(${-14 + f * 0.05}deg) rotateZ(${-4 + pull * 2}deg)`,
            transformOrigin: '50% 40%',
          }}
        >
          {projects.map((p, i) => {
            const s = interpolate(f, [4 + i * 2.2, 22 + i * 2.2], [0, 1], {
              ...clamp,
              easing: easeOut,
            })
            return (
              <div
                key={p.id}
                style={{
                  position: 'absolute',
                  left: (i % cols) * (w + gx),
                  top: Math.floor(i / cols) * (h + gy),
                  opacity: s,
                  transform: `translateZ(${(1 - s) * 400}px)`,
                }}
              >
                <MacWindow
                  width={w}
                  height={h}
                  src={projectImage(p)}
                  radius={10}
                  glow={p.tint}
                />
                <div
                  style={{
                    marginTop: 10,
                    fontFamily: fonts.body,
                    fontSize: 22,
                    fontWeight: 600,
                    color: colors.white,
                    textAlign: 'center',
                  }}
                >
                  {p.name}
                </div>
              </div>
            )
          })}
        </div>
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          background:
            'linear-gradient(to bottom, transparent 62%, rgba(5,7,13,0.92) 80%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 1080,
          width: '100%',
          textAlign: 'center',
          fontFamily: fonts.display,
          fontWeight: 800,
          color: colors.white,
          letterSpacing: '-0.03em',
          opacity: interpolate(f, [18, 30], [0, 1], clamp),
        }}
      >
        <div style={{ fontSize: 150, lineHeight: 1 }}>
          <Counter to={projects.length} start={18} duration={34} />
          <span
            style={{
              backgroundImage: GRADIENT,
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            {' '}
            projets
          </span>
        </div>
        <div
          style={{
            fontFamily: fonts.body,
            fontWeight: 500,
            fontSize: 34,
            letterSpacing: 0,
            color: colors.gray,
            marginTop: 12,
          }}
        >
          Web · Temps réel · E-commerce · IA
        </div>
      </div>
    </AbsoluteFill>
  )
}

const AI: React.FC = () => {
  const f = useCurrentFrame()
  const siri = useSpring(34, { damping: 17, stiffness: 100 })
  const win = useSpring(54, { damping: 16, stiffness: 90 })
  const scan = interpolate(f, [80, 140], [0, 1], clamp)
  const chip = (d: number) => ({
    opacity: interpolate(f, [d, d + 10], [0, 1], clamp),
    transform: `translateY(${interpolate(f, [d, d + 16], [16, 0], { ...clamp, easing: easeOut })}px)`,
  })
  return (
    <AbsoluteFill style={{ background: '#04040c' }}>
      <ShaderBackground
        preset="aurora"
        colorA="#140a3a"
        colorB="#10688f"
        intensity={0.5}
        speed={1.2}
      />
      <div
        style={{
          position: 'absolute',
          top: 70,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 18,
        }}
      >
        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 26,
            fontWeight: 700,
            color: '#bdf3ff',
            opacity: interpolate(f, [4, 12], [0, 1], clamp),
            letterSpacing: '0.08em',
          }}
        >
          {'// MASTER OF SCIENCE'}
        </div>
        <RevealText
          text={'Intelligence\nArtificielle.'}
          start={8}
          size={104}
          gradient={AI_GRADIENT}
        />
        <div style={{ opacity: interpolate(f, [26, 38], [0, 1], clamp) }}>
          <Chip color={colors.cyan}>{person.school} · 2023 — 2026</Chip>
        </div>
      </div>
      <Img
        src={footage('window-siri-answer.webp')}
        style={{
          position: 'absolute',
          left: 60,
          top: 470,
          width: 400,
          opacity: siri,
          transform: `translateX(${(1 - siri) * -300}px) rotate(${(1 - siri) * -4}deg)`,
          filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.6))',
        }}
      />
      <div style={{ position: 'absolute', left: 60, top: 1080, ...chip(70) }}>
        <Chip color={colors.violet} style={{ fontSize: 26 }}>
          Siri du portfolio · LLM via Groq
        </Chip>
      </div>
      <AbsoluteFill style={{ perspective: 1400 }}>
        <div
          style={{
            position: 'absolute',
            left: 500,
            top: 500,
            opacity: win,
            transform: `translateX(${(1 - win) * 300}px) rotateY(${-10 + win * 4}deg)`,
          }}
        >
          <MacWindow
            width={520}
            height={362}
            title="Zoidberg 2.0"
            src={projectImage(projects[1])}
            glow={colors.teal}
          >
            <div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: `${scan * 100}%`,
                height: 3,
                background: colors.cyan,
                boxShadow: `0 0 24px 6px ${colors.cyan}`,
                opacity: scan > 0 && scan < 1 ? 1 : 0,
              }}
            />
          </MacWindow>
        </div>
      </AbsoluteFill>
      <div
        style={{
          position: 'absolute',
          left: 500,
          top: 900,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <div style={chip(96)}>
          <Chip color={colors.teal} style={{ fontSize: 26 }}>
            CNN · 91,2 % d&apos;exactitude
          </Chip>
        </div>
        <div style={chip(112)}>
          <Chip color={colors.sky} style={{ fontSize: 26 }}>
            THOR · Speech-to-Text · NLP
          </Chip>
        </div>
      </div>
    </AbsoluteFill>
  )
}

const Digitaleo: React.FC = () => {
  const f = useCurrentFrame()
  const win = useSpring(50, { damping: 18, stiffness: 80 })
  const orange = '#f26a36'
  const stat = (delay: number) => ({
    opacity: interpolate(f, [delay, delay + 12], [0, 1], clamp),
    transform: `translateY(${interpolate(f, [delay, delay + 18], [30, 0], { ...clamp, easing: easeOut })}px)`,
  })
  return (
    <AbsoluteFill
      style={{
        background:
          'radial-gradient(ellipse 90% 60% at 50% 30%, #ffffff 0%, #f2f2f5 55%, #e4e4ea 100%)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 96,
          width: '100%',
          textAlign: 'center',
          fontFamily: fonts.body,
          fontWeight: 600,
          fontSize: 30,
          color: '#6e6e73',
          ...stat(2),
        }}
      >
        <span style={{ color: orange }}>Digitaleo</span> · Développeur Full
        Stack · 2024 — 2026
      </div>
      <div
        style={{
          position: 'absolute',
          top: 150,
          width: '100%',
          textAlign: 'center',
          fontFamily: fonts.display,
          fontWeight: 800,
          fontSize: 230,
          letterSpacing: '-0.05em',
          color: colors.ink,
          lineHeight: 1.05,
        }}
      >
        <Counter to={digitaleo.users} start={10} duration={42} />
      </div>
      <div
        style={{
          position: 'absolute',
          top: 400,
          width: '100%',
          textAlign: 'center',
          fontFamily: fonts.display,
          fontWeight: 700,
          fontSize: 54,
          letterSpacing: '-0.02em',
          color: orange,
          ...stat(16),
        }}
      >
        utilisateurs actifs sur l’app
      </div>
      <AbsoluteFill style={{ perspective: 1500 }}>
        <div
          style={{
            position: 'absolute',
            left: 540 - 450,
            top: 530,
            opacity: win,
            transform: `translateY(${(1 - win) * 300}px) rotateX(${(1 - win) * 30 + 8}deg) rotateY(${-8 + f * 0.04}deg)`,
          }}
        >
          <MacWindow
            width={900}
            height={400}
            dark={false}
            title="Éditeur d'email — Digitaleo"
            src={asset(`projects/${digitaleo.image}`)}
          />
        </div>
      </AbsoluteFill>
      <div
        style={{
          position: 'absolute',
          top: 1040,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          gap: 90,
          fontFamily: fonts.display,
          color: colors.ink,
          textAlign: 'center',
        }}
      >
        <div style={stat(92)}>
          <div
            style={{ fontSize: 110, fontWeight: 800, letterSpacing: '-0.04em' }}
          >
            600+
          </div>
          <div style={{ fontSize: 32, fontWeight: 500, color: '#6e6e73' }}>
            réseaux d&apos;enseignes
          </div>
        </div>
        <div style={stat(108)}>
          <div
            style={{ fontSize: 110, fontWeight: 800, letterSpacing: '-0.04em' }}
          >
            {digitaleo.years}
          </div>
          <div style={{ fontSize: 32, fontWeight: 500, color: '#6e6e73' }}>
            d&apos;alternance
          </div>
        </div>
      </div>
    </AbsoluteFill>
  )
}

const Stack: React.FC = () => {
  const f = useCurrentFrame()
  const spin =
    f * 1.1 + interpolate(f, [70, 120], [0, 160], { ...clamp, easing: easeIn })
  const zoom = interpolate(f, [80, 120], [1, 2.6], { ...clamp, easing: easeIn })
  const words = [
    { text: 'Front.', at: 0 },
    { text: 'Back.', at: 30 },
    { text: 'IA.', at: 60 },
  ]
  const radius = 330
  return (
    <AbsoluteFill style={{ background: colors.night }}>
      <ShaderBackground
        preset="grid"
        colorA="#2997ff"
        colorB="#7b5cff"
        intensity={0.8}
      />
      <AbsoluteFill
        style={{
          perspective: 1300,
          transform: `scale(${zoom})`,
          transformOrigin: '50% 34%',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 540,
            top: 450,
            transformStyle: 'preserve-3d',
            transform: `rotateX(-14deg) rotateY(${spin}deg)`,
          }}
        >
          {stack.map((s, i) => {
            const a = (360 / stack.length) * i
            // Tiles turned away from camera recede instead of showing mirrored
            const facing = Math.cos(((a + spin) * Math.PI) / 180)
            return (
              <div
                key={s.name}
                style={{
                  position: 'absolute',
                  left: -65,
                  top: -65,
                  width: 130,
                  height: 130,
                  borderRadius: 32,
                  opacity: 0.25 + 0.75 * Math.max(facing, 0),
                  background: 'rgba(255,255,255,0.07)',
                  border: '1.5px solid rgba(255,255,255,0.18)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: `rotateY(${a}deg) translateZ(${radius}px)`,
                  boxShadow: '0 0 40px rgba(41,151,255,0.25)',
                }}
              >
                <TechIcon icon={s.icon} size={66} />
              </div>
            )
          })}
        </div>
      </AbsoluteFill>
      <div
        style={{
          position: 'absolute',
          top: 760,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          fontFamily: fonts.display,
          fontWeight: 800,
          fontSize: 150,
          letterSpacing: '-0.04em',
          lineHeight: 1.02,
          color: colors.white,
          opacity: interpolate(f, [100, 118], [1, 0], clamp),
        }}
      >
        {words.map((w, i) => {
          const s = interpolate(f, [w.at, w.at + 8], [0, 1], {
            ...clamp,
            easing: easeOut,
          })
          return (
            <div
              key={w.text}
              style={{
                opacity: s,
                transform: `scale(${1.5 - s * 0.5})`,
                filter: `blur(${(1 - s) * 12}px)`,
                ...(i === 2
                  ? {
                      backgroundImage: AI_GRADIENT,
                      WebkitBackgroundClip: 'text',
                      color: 'transparent',
                    }
                  : {}),
              }}
            >
              {w.text}
            </div>
          )
        })}
      </div>
    </AbsoluteFill>
  )
}

export const AntoineOS: React.FC<{ withAudio?: boolean }> = ({
  withAudio = true,
}) => {
  const frame = useCurrentFrame()
  const glitchHits = [...cueFrames(cues, 'glitch'), 927, 933]
  const g = glitchEnvelope(frame, glitchHits, 9)
  const impacts = cueFrames(cues, 'impact', 'hit')

  return (
    <AbsoluteFill style={{ background: colors.night }}>
      <Shake hits={impacts} amount={14}>
        <Distort displace={g * 110} split={g * 22 + 0} seed={3}>
          <Sequence from={150} durationInFrames={180} name="Desktop">
            <Desktop />
          </Sequence>
          <Sequence from={0} durationInFrames={84} name="Hook">
            <Hook />
          </Sequence>
          <Sequence from={72} durationInFrames={90} name="Boot">
            <Boot />
          </Sequence>
          <Sequence from={326} durationInFrames={124} name="Mission Control">
            <MissionControl duration={124} />
          </Sequence>
          <Sequence from={450} durationInFrames={240} name="Mobile">
            <MobileTour />
          </Sequence>
          <Sequence from={690} durationInFrames={126} name="Corridor">
            <CameraMotionBlur samples={3} shutterAngle={180}>
              <Corridor />
            </CameraMotionBlur>
          </Sequence>
          <Sequence from={810} durationInFrames={122} name="Wall">
            <Wall />
          </Sequence>
          <Sequence from={930} durationInFrames={180} name="AI">
            <AI />
          </Sequence>
          <Sequence from={1110} durationInFrames={180} name="Digitaleo">
            <Digitaleo />
          </Sequence>
          <Sequence from={1290} durationInFrames={122} name="Stack">
            <Stack />
          </Sequence>
          <Sequence from={1410} durationInFrames={120} name="Calendar">
            <CareerCalendar duration={120} />
          </Sequence>
          <Sequence from={1530} durationInFrames={120} name="Maps">
            <WhereMap duration={120} />
          </Sequence>
          <Sequence from={1650} name="Mail + closing">
            <WriteAndClose mailDuration={96} />
          </Sequence>
          <Flash at={150} decay={16} max={0.9} />
          <Flash at={810} decay={10} max={0.5} color="#9fc8ff" />
          <Flash at={1110} decay={18} max={0.8} />
          <Flash at={1290} decay={10} max={0.5} />
          <LightLeak start={150} duration={60} />
          <LightLeak
            start={1740}
            duration={90}
            colors={['#2997ff', '#7b5cff']}
            direction={-1}
            intensity={0.5}
          />
        </Distort>
      </Shake>
      <Vignette strength={0.55} />
      <Grain opacity={0.07} />
      {withAudio && <Audio src={staticFile('audio/AntoineOS.wav')} />}
    </AbsoluteFill>
  )
}
