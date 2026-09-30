import React from 'react'
import {
  AbsoluteFill,
  Audio,
  Img,
  Sequence,
  interpolate,
  random,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion'
import { asset, cities, fonts, person } from '../brand'
import { AnamorphicFlare, Grain } from '../fx/Overlays'
import {
  BeatWords,
  IPhone3D,
  Letters,
  LogoTrace,
  MacBook3D,
  Ring,
  Shot,
  SilverText,
  Smear,
  StageLight,
  scatter3D,
  stage,
} from '../keynote/Kit'
import { footage } from '../scenes/OsScenes'
import { TrafficLights } from '../ui/Apps'
import { DigitaleoEditor, DigitaleoWordmark } from '../ui/DigitaleoEditor'
import { Counter, clamp, easeIn, easeInOut, easeOut } from '../ui/Primitives'

// An Apple launch film: black stage, silver type, and nothing ever at rest.
// Every scene carries its own slow camera move so no frame is a still.

const ease = (
  f: number,
  range: [number, number],
  out: [number, number],
  easing = easeInOut
) => interpolate(f, range, out, { ...clamp, easing })

const Body: React.FC<{
  children: React.ReactNode
  size?: number
  color?: string
  weight?: number
  style?: React.CSSProperties
}> = ({ children, size = 42, color = stage.grey, weight = 500, style }) => (
  <div
    style={{
      fontFamily: fonts.display,
      fontSize: size,
      fontWeight: weight,
      letterSpacing: '-0.02em',
      lineHeight: 1.2,
      color,
      textAlign: 'center',
      ...style,
    }}
  >
    {children}
  </div>
)

/** Fade-up with a touch of blur, the build of every secondary line. */
const Rise: React.FC<{
  at: number
  children: React.ReactNode
  y?: number
  style?: React.CSSProperties
}> = ({ at, children, y = 30, style }) => {
  const f = useCurrentFrame()
  const t = ease(f, [at, at + 16], [0, 1], easeOut)
  return (
    <div
      style={{
        opacity: t,
        transform: `translateY(${(1 - t) * y}px)`,
        filter: t < 1 ? `blur(${(1 - t) * 8}px)` : undefined,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

const LOGO_Y = 560

/** A point of light traces the monogram, then the name builds under it. */
const Opener: React.FC = () => {
  const f = useCurrentFrame()
  const push = interpolate(f, [0, 110], [0.9, 1.03])
  const exit = ease(f, [100, 124], [0, 1], easeIn)
  const flare = interpolate(f, [50, 58, 86], [0, 0.9, 0], clamp)
  return (
    <AbsoluteFill style={{ background: '#000' }}>
      <StageLight
        y={42}
        opacity={interpolate(f, [40, 70], [0, 1], clamp) * (1 - exit)}
      />
      <AbsoluteFill
        style={{
          transform: `scale(${push * (1 + exit ** 2 * 11)})`,
          transformOrigin: `50% ${LOGO_Y}px`,
          opacity: 1 - ease(f, [114, 124], [0, 1]),
        }}
      >
        <div style={{ position: 'absolute', left: 330, top: LOGO_Y - 158 }}>
          <LogoTrace at={4} size={420} fillAt={58} />
        </div>
        <div style={{ position: 'absolute', top: 790, width: '100%' }}>
          <Letters text="Antoine Gourgue" at={68} size={92} silver />
        </div>
        <Rise at={86} style={{ position: 'absolute', top: 910, width: '100%' }}>
          <Body>{person.role}</Body>
        </Rise>
      </AbsoluteFill>
      <AnamorphicFlare x={540} y={LOGO_Y} opacity={flare} width={1700} />
    </AbsoluteFill>
  )
}

// Where the camera enters the "O" of AntoineOS, in the word's own box
const O_ORIGIN = '81% 54%'

// The strip of real screens scrolling inside the letters: [file, width at
// the strip height]. Only bright screens: dark ones sink the letters into
// the black stage.
const STRIP_H = 300
const STRIP: [string, number][] = [
  [asset('projects/mosaic.jpg'), (STRIP_H * 1400) / 962],
  [footage('desktop.jpg'), (STRIP_H * 2880) / 1800],
  [asset('projects/mosaic.jpg'), (STRIP_H * 1400) / 962],
]

/**
 * The name of the "OS", its letters cut out of the real desktop. Starts so
 * close the letters are abstract shapes, pulls back to the word, then flies
 * through the O.
 */
const Wordmark: React.FC = () => {
  const f = useCurrentFrame()
  const { fps } = useVideoConfig()
  const pull = spring({
    frame: f,
    fps,
    config: { damping: 200, stiffness: 30, mass: 1.4 },
  })
  const exit = ease(f, [100, 128], [0, 1], easeIn)
  const scale =
    (interpolate(pull, [0, 1], [5, 1]) + f * 0.0005) * Math.pow(60, exit)
  const sweep = interpolate(f, [44, 84], [-30, 130], clamp)
  const scroll = interpolate(f, [0, 130], [40, 520])
  const word: React.CSSProperties = {
    fontFamily: fonts.display,
    fontSize: 184,
    fontWeight: 800,
    letterSpacing: '-0.055em',
    lineHeight: 1.1,
    whiteSpace: 'nowrap',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
  }
  return (
    <AbsoluteFill style={{ background: '#000' }}>
      <StageLight y={45} w={70} opacity={0.8 * (1 - exit)} />
      <div
        style={{
          position: 'absolute',
          top: 520,
          left: 0,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            position: 'relative',
            transform: `scale(${scale})`,
            transformOrigin: O_ORIGIN,
          }}
        >
          <div
            style={{
              ...word,
              backgroundImage: STRIP.map(([src]) => `url(${src})`).join(', '),
              backgroundSize: STRIP.map(() => `auto ${STRIP_H}px`).join(', '),
              backgroundRepeat: 'no-repeat',
              backgroundPosition: STRIP.map(
                (_, i) =>
                  `${STRIP.slice(0, i).reduce((x, [, w]) => x + w, 0) - scroll}px 50%`
              ).join(', '),
            }}
          >
            AntoineOS
          </div>
          <div
            style={{
              ...word,
              position: 'absolute',
              inset: 0,
              backgroundImage: `linear-gradient(105deg, transparent ${sweep - 12}%, rgba(255,255,255,0.75) ${sweep}%, transparent ${sweep + 12}%)`,
            }}
          >
            AntoineOS
          </div>
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          top: 800,
          width: '100%',
          opacity: 1 - ease(f, [96, 108], [0, 1]),
        }}
      >
        <Rise at={50}>
          <Body size={46}>Le portfolio qui se prend pour un OS.</Body>
        </Rise>
      </div>
    </AbsoluteFill>
  )
}

const MAC_W = 700
const MAC_D = MAC_W * 0.68

// Windows of the portfolio flying out of the screen, in the machine's space
// (origin at the hinge centre, y up is negative)
const FLYOUT = [
  {
    src: 'window-about-card.png',
    w: 250,
    r: 950 / 998,
    x: -330,
    y: -470,
    z: 250,
    at: 70,
    ry: 16,
  },
  {
    src: 'window-terminal-neofetch.png',
    w: 270,
    r: 742 / 878,
    x: 320,
    y: -500,
    z: 340,
    at: 82,
    ry: -14,
  },
  {
    src: 'appstore-emailEditor.webp',
    w: 330,
    r: 1416 / 1638,
    x: -270,
    y: -170,
    z: 470,
    at: 94,
    ry: 10,
  },
  {
    src: 'window-music.webp',
    w: 260,
    r: 666 / 1038,
    x: 340,
    y: -180,
    z: 380,
    at: 106,
    ry: -18,
  },
  {
    src: 'window-calendar.webp',
    w: 300,
    r: 770 / 1109,
    x: 10,
    y: -500,
    z: 90,
    at: 118,
    ry: 4,
  },
]

/**
 * The MacBook rises out of the dark, orbits while its lid opens, the screen
 * wakes on the real desktop and its windows lift off into space.
 */
const MacScene: React.FC = () => {
  const f = useCurrentFrame()
  const { fps } = useVideoConfig()
  const enter = spring({
    frame: f,
    fps,
    config: { damping: 200, stiffness: 40 },
  })
  const lidT = spring({
    frame: f - 20,
    fps,
    config: { damping: 20, stiffness: 50, mass: 1.2 },
  })
  const orbit = ease(f, [0, 240], [38, -26])
  const tilt = interpolate(f, [0, 240], [-26, -14])
  const power = interpolate(f, [50, 60, 72], [0, 1.6, 1], clamp)
  const exit = ease(f, [200, 240], [0, 1], easeIn)
  const camZ = interpolate(enter, [0, 1], [-1100, 0]) + exit * 1500
  return (
    <AbsoluteFill style={{ background: '#000' }}>
      <StageLight y={62} w={70} h={40} opacity={enter} />
      <AbsoluteFill
        style={{
          perspective: 2000,
          perspectiveOrigin: '50% 48%',
          opacity: enter * (1 - ease(f, [226, 240], [0, 1])),
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 540 - MAC_W / 2,
            top: 900,
            width: MAC_W,
            height: 0,
            transformStyle: 'preserve-3d',
            transform: `translateZ(${camZ}px) rotateX(${tilt}deg) rotateY(${orbit}deg)`,
          }}
        >
          <div
            style={{
              transformStyle: 'preserve-3d',
              transform: `translateZ(${-MAC_D / 2}px)`,
            }}
          >
            <MacBook3D
              width={MAC_W}
              lid={lidT * 104}
              sheen={interpolate(f, [30, 220], [0, 1])}
              screen={
                <>
                  <Shot
                    src={footage('desktop.jpg')}
                    style={{ transform: `scale(${1.1 - f * 0.0004})` }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: power > 1 ? '#fff' : '#000',
                      opacity: power > 1 ? power - 1 : 1 - power,
                    }}
                  />
                </>
              }
            />
            {FLYOUT.map((w, i) => {
              const t = spring({
                frame: f - w.at,
                fps,
                config: { damping: 22, stiffness: 55 },
              })
              if (t <= 0.001) return null
              const h = w.w * w.r
              const x = interpolate(t, [0, 1], [w.x * 0.2, w.x])
              const y =
                interpolate(t, [0, 1], [-MAC_W * 0.32, w.y]) +
                Math.sin((f + i * 17) / 24) * 8 * t
              const z =
                interpolate(t, [0, 1], [8, w.z]) + exit * (600 + i * 180)
              return (
                <div
                  key={w.src}
                  style={{
                    position: 'absolute',
                    left: MAC_W / 2 + x - w.w / 2,
                    top: y - h / 2,
                    width: w.w,
                    height: h,
                    transform: `translateZ(${z}px) rotateY(${w.ry * t}deg) scale(${0.3 + t * 0.7})`,
                    opacity: Math.min(1, t * 3),
                    borderRadius: 12,
                    overflow: 'hidden',
                    boxShadow: '0 30px 70px rgba(0,0,0,0.55)',
                  }}
                >
                  <Img
                    src={footage(w.src)}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </AbsoluteFill>
      <div
        style={{
          position: 'absolute',
          top: 140,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <BeatWords
          size={100}
          until={200}
          words={[
            { text: 'Un portfolio.', at: 60 },
            { text: 'Un vrai OS.', at: 105, silver: true },
            { text: 'Dans le navigateur.', at: 150 },
          ]}
        />
      </div>
    </AbsoluteFill>
  )
}

const ICONS: { src: string; bg?: string; pad?: boolean }[] = [
  { src: 'medical-ai-icon.png' },
  { src: 'mosaic-icon.png' },
  { src: 'tailtcg-icon.png' },
  { src: 'thor-icon.png', bg: 'linear-gradient(#262626, #0a0a0a)', pad: true },
  { src: 'trelltech-icon.png' },
  { src: 'epihardware-icon.png' },
  { src: 'trinity-icon.png', pad: true },
  { src: 'jobboard-icon.png', pad: true },
  { src: 'echoconnect-icon.png', pad: true },
  {
    src: 'aurora-logo.png',
    bg: 'linear-gradient(#1e293b, #0b1220)',
    pad: true,
  },
  { src: 'sapia-icon.png' },
  { src: 'designSystem-icon.png' },
]

/**
 * Twelve project icons converge out of deep space into a grid, ripple, then
 * blow past the camera.
 */
const IconsScene: React.FC = () => {
  const f = useCurrentFrame()
  const { fps } = useVideoConfig()
  const size = 150
  const gap = 42
  const exit = ease(f, [94, 120], [0, 1], easeIn)
  const settled = ease(f, [40, 60], [0, 1])
  return (
    <AbsoluteFill style={{ background: '#000' }}>
      <StageLight y={58} w={60} opacity={1 - exit} />
      <AbsoluteFill style={{ perspective: 1500, perspectiveOrigin: '50% 56%' }}>
        <div
          style={{
            position: 'absolute',
            left: 540,
            top: 770,
            transformStyle: 'preserve-3d',
            transform: `rotateX(${interpolate(f, [0, 120], [16, -6])}deg) rotateY(${interpolate(f, [0, 120], [24, -16])}deg)`,
          }}
        >
          {ICONS.map((icon, i) => {
            const col = i % 4
            const row = Math.floor(i / 4)
            const s = scatter3D(i, 'icons')
            const t = spring({
              frame: f - 2 - i * 2.5,
              fps,
              config: { damping: 18, stiffness: 60 },
            })
            const wave =
              Math.sin(f / 9 - Math.hypot(col - 1.5, row - 1) * 1.1) *
              26 *
              settled
            const spread = 1 + exit * 0.8
            const x = interpolate(t, [0, 1], [s.x, (col - 1.5) * (size + gap)])
            const y = interpolate(t, [0, 1], [s.y, (row - 1) * (size + gap)])
            const z =
              interpolate(t, [0, 1], [s.z, 0]) +
              wave +
              exit * (900 + random(`burst-${i}`) * 1400)
            return (
              <div
                key={icon.src}
                style={{
                  position: 'absolute',
                  left: -size / 2,
                  top: -size / 2,
                  width: size,
                  height: size,
                  transform: `translate3d(${x * spread}px, ${y * spread}px, ${z}px) rotateX(${s.rx * (1 - t)}deg) rotateY(${s.ry * (1 - t)}deg)`,
                  opacity:
                    Math.min(1, t * 2) * (1 - ease(f, [108, 120], [0, 1])),
                  borderRadius: '22%',
                  overflow: 'hidden',
                  background: icon.bg ?? '#fff',
                  boxShadow:
                    '0 20px 50px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08)',
                }}
              >
                <Img
                  src={asset(`projects/${icon.src}`)}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: icon.pad ? 'contain' : 'cover',
                    padding: icon.pad ? '14%' : 0,
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            )
          })}
        </div>
      </AbsoluteFill>
      <div
        style={{
          position: 'absolute',
          top: 170,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          opacity: 1 - ease(f, [96, 110], [0, 1]),
          transform: `scale(${1 + f * 0.0006})`,
        }}
      >
        <Letters text="12 projets." at={26} size={124} silver />
        <Rise at={48}>
          <Body size={44}>Tous en ligne. Tous ouverts.</Body>
        </Rise>
      </div>
    </AbsoluteFill>
  )
}

type Crop = [number, number, number, number]

type Showcase = {
  name: string
  tag: string
  src: string
  ratio: number
  // Parts of the screenshot that hover above it before settling in place
  layers: Crop[]
  stat: 'ring' | 'stack'
  stack?: string[]
}

const SHOWCASES: Showcase[] = [
  {
    name: 'Zoidberg 2.0',
    tag: 'L’IA qui lit les radios.',
    src: asset('projects/medical-ai.jpg'),
    ratio: 875 / 1400,
    layers: [
      [0.14, 0.2, 0.72, 0.2],
      [0.28, 0.43, 0.44, 0.21],
      [0.28, 0.67, 0.44, 0.07],
    ],
    stat: 'ring',
  },
  {
    name: 'Mosaic',
    tag: 'Des boards, en temps réel.',
    src: asset('projects/mosaic.jpg'),
    ratio: 962 / 1400,
    layers: [
      [0, 0, 1, 0.1],
      [0.21, 0.19, 0.19, 0.28],
      [0.6, 0.19, 0.19, 0.28],
      [0.41, 0.54, 0.19, 0.3],
    ],
    stat: 'stack',
    stack: ['Next.js', 'Prisma', 'Auth.js', 'Docker'],
  },
  {
    name: 'TailTCG',
    tag: 'Ta collection Pokémon, à sa hauteur.',
    src: footage('tailtcg.jpg'),
    ratio: 1000 / 1600,
    layers: [
      [0.1, 0.32, 0.36, 0.28],
      [0.6, 0.14, 0.24, 0.8],
    ],
    stat: 'stack',
    stack: ['Next.js', 'TypeScript', 'PWA'],
  },
]

const SHOW_LEN = 80
const WHIP = 10
const WIN_W = 880
const WIN_BAR = 34

/** A screenshot in a browser window, its UI layers hovering then landing. */
const ExplodedWindow: React.FC<{ show: Showcase; t: number; f: number }> = ({
  show,
  t,
  f,
}) => {
  const h = WIN_W * show.ratio
  const lift = 1 - t
  return (
    <div
      style={{
        position: 'relative',
        width: WIN_W,
        height: h + WIN_BAR,
        transformStyle: 'preserve-3d',
        transform: `rotateX(${48 * lift + 6}deg) rotateZ(${-30 * lift}deg) rotateY(${interpolate(f, [0, SHOW_LEN], [-7, 7])}deg)`,
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
        <Img
          src={show.src}
          style={{ width: WIN_W, height: h, display: 'block' }}
        />
      </div>
      {show.layers.map(([x, y, w, lh], i) => (
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
          <Img
            src={show.src}
            style={{
              position: 'absolute',
              left: -x * WIN_W,
              top: -y * h,
              width: WIN_W,
              height: h,
            }}
          />
        </div>
      ))}
    </div>
  )
}

const Stat: React.FC<{ show: Showcase }> = ({ show }) => {
  const f = useCurrentFrame()
  if (show.stat === 'ring') {
    return (
      <Rise at={24} style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
        <div style={{ position: 'relative', width: 190, height: 190 }}>
          <Ring
            pct={0.912}
            at={26}
            size={190}
            stroke={20}
            from="#2ee6c8"
            to="#1fb8a6"
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: fonts.display,
              fontSize: 44,
              fontWeight: 700,
              color: stage.white,
              letterSpacing: '-0.03em',
            }}
          >
            <Counter
              to={91.2}
              start={26}
              duration={36}
              decimals={1}
              suffix=" %"
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
            de précision
          </Body>
          <Body size={34} style={{ textAlign: 'left' }}>
            CNN · Grad-CAM
          </Body>
        </div>
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
      {(show.stack ?? []).map((s, i) => {
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

/** One project: title, exploded window, proof point; whips in and out. */
const ShowcaseScene: React.FC<{ show: Showcase; index: number }> = ({
  show,
  index,
}) => {
  const f = useCurrentFrame()
  const { fps } = useVideoConfig()
  const land = spring({
    frame: f - 2,
    fps,
    config: { damping: 22, stiffness: 42 },
  })
  // Both shots ride the same pan so they stay butted edge to edge
  const whipIn = index === 0 ? 0 : 1 - ease(f, [0, WHIP], [0, 1])
  const whipOut = ease(f, [SHOW_LEN, SHOW_LEN + WHIP], [0, 1])
  const smear = Math.sin(Math.PI * (whipIn || whipOut)) * 70
  const fadeIn = index === 0 ? ease(f, [0, 12], [0, 1]) : 1
  const h = WIN_W * show.ratio
  return (
    <AbsoluteFill style={{ opacity: fadeIn }}>
      <Smear id={`whip-${index}`} amount={smear}>
        <AbsoluteFill
          style={{ transform: `translateX(${(whipIn - whipOut) * 1080}px)` }}
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
              transform: `translateX(${interpolate(f, [0, SHOW_LEN + WHIP], [260, -520])}px)`,
            }}
          >
            {show.name}
          </div>
          <div style={{ position: 'absolute', top: 150, width: '100%' }}>
            <Letters text={show.name} at={4} size={104} silver stagger={1.2} />
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
                left: 540 - WIN_W / 2,
                top: 740 - (h + WIN_BAR) / 2,
                transformStyle: 'preserve-3d',
                transform: `translateZ(${interpolate(land, [0, 1], [-500, 0]) + f * 0.8}px)`,
              }}
            >
              <ExplodedWindow show={show} t={land} f={f} />
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
            <Stat show={show} />
          </div>
        </AbsoluteFill>
      </Smear>
    </AbsoluteFill>
  )
}

// Stat slots of the Digitaleo scene; the editor one runs longer so its
// drag-and-drop and mobile switch can play out
const SLOT = { years: 0, users: 60, networks: 160 }
const EDITOR_W = 820

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

const BigNumber: React.FC<{ children: React.ReactNode; sweepAt: number }> = ({
  children,
  sweepAt,
}) => (
  <SilverText
    size={250}
    sweepAt={sweepAt}
    weight={800}
    style={{ textAlign: 'center' }}
  >
    {children}
  </SilverText>
)

/** Janv. 2024 to juil. 2026, drawn by a travelling light. */
const Timeline: React.FC<{ at: number }> = ({ at }) => {
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
        janv. 2024
      </Body>
      <Body
        size={30}
        color={t >= 1 ? stage.white : stage.grey}
        style={{ position: 'absolute', right: 0, top: 60, textAlign: 'right' }}
      >
        juil. 2026
      </Body>
    </div>
  )
}

/** 600 points, one per retail network, lit by a wave from the centre. */
const DotField: React.FC<{ at: number }> = ({ at }) => {
  const f = useCurrentFrame()
  const cols = 40
  const rows = 15
  const pitch = 20
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
              left: c * pitch + 5,
              top: r * pitch + 5,
              width: 9,
              height: 9,
              borderRadius: 5,
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

/**
 * The editor, rebuilt as a live page: typing, a block dropped in, the switch
 * to mobile, compressed to fit the slot.
 */
const EditorWindow: React.FC = () => {
  const f = useCurrentFrame()
  return (
    <div style={{ marginTop: 40, perspective: 1600 }}>
      <div
        style={{
          width: EDITOR_W,
          borderRadius: 14,
          overflow: 'hidden',
          background: '#fff',
          boxShadow:
            '0 50px 120px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.12)',
          transform: `rotateX(${10 - (f - SLOT.users) * 0.06}deg) rotateY(${interpolate(f, [SLOT.users, SLOT.networks], [-6, 6])}deg)`,
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
        <DigitaleoEditor width={EDITOR_W} start={SLOT.users - 5} speed={1.33} />
      </div>
    </div>
  )
}

const Kicker: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Body size={40} style={{ marginBottom: 6 }}>
    {children}
  </Body>
)

/** Digitaleo, told in three numbers. */
const NumbersScene: React.FC = () => {
  const f = useCurrentFrame()
  const exit = ease(f, [218, 234], [0, 1], easeIn)
  const col: React.CSSProperties = {
    position: 'absolute',
    top: 300,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
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
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 12,
          opacity: ease(f, [0, 14], [0, 1]),
        }}
      >
        <DigitaleoWordmark size={44} color={stage.white} />
        <Body size={40} color={stage.white} weight={600}>
          · Développeur Full Stack
        </Body>
      </div>
      <StatSlot at={SLOT.years} len={SLOT.users - SLOT.years}>
        <div style={col}>
          <Kicker>En alternance, pendant</Kicker>
          <BigNumber sweepAt={20}>
            <Counter
              to={2.5}
              start={2}
              duration={28}
              decimals={1}
              suffix=" ans"
            />
          </BigNumber>
          <div style={{ marginTop: 60 }}>
            <Timeline at={12} />
          </div>
        </div>
      </StatSlot>
      <StatSlot at={SLOT.users} len={SLOT.networks - SLOT.users}>
        <div style={col}>
          <Kicker>Des fonctionnalités utilisées par</Kicker>
          <BigNumber sweepAt={SLOT.users + 24}>
            <Counter to={37000} start={SLOT.users + 2} duration={32} />
          </BigNumber>
          <Body
            size={46}
            color={stage.white}
            weight={600}
            style={{ marginTop: -6 }}
          >
            utilisateurs actifs sur l’app
          </Body>
          <EditorWindow />
        </div>
      </StatSlot>
      <StatSlot at={SLOT.networks}>
        <div style={col}>
          <Kicker>Une plateforme déployée chez plus de</Kicker>
          <BigNumber sweepAt={SLOT.networks + 22}>
            <Counter to={600} start={SLOT.networks + 2} duration={26} />
          </BigNumber>
          <Body
            size={46}
            color={stage.white}
            weight={600}
            style={{ marginTop: -6 }}
          >
            réseaux d’enseignes
          </Body>
          <div style={{ marginTop: 60 }}>
            <DotField at={SLOT.networks + 10} />
          </div>
        </div>
      </StatSlot>
    </AbsoluteFill>
  )
}

const PHONE_W = 370
const PHONE_LEN = 240

type MobileStep = { at: number; src: string; from?: [number, number] }

// The main phone's session: home screen, the App Store of projects, then a
// project's site in responsive; `from` is the icon or row that was tapped
const MAIN_FLOW: MobileStep[] = [
  { at: 0, src: 'mobile-home.jpg' },
  { at: 66, src: 'mobile-projects.jpg', from: [0.16, 0.3] },
  { at: 112, src: 'tailtcg-mobile.jpg', from: [0.22, 0.69] },
]

const CAPTIONS = [
  { at: 66, text: 'L’App Store de mes projets.' },
  { at: 112, text: 'Chaque projet, en responsive.' },
  { at: 156, text: 'Mon parcours, et Siri pour répondre.' },
]

/** Screens of a phone, each opening from the spot tapped before it. */
const MobileFlow: React.FC<{ steps: MobileStep[] }> = ({ steps }) => {
  const f = useCurrentFrame()
  return (
    <>
      {steps.map((step, i) => {
        const next = steps[i + 1]
        if (f < step.at || (next && f >= next.at + 16)) return null
        if (!step.from) return <Shot key={step.src} src={footage(step.src)} />
        const t = ease(f, [step.at, step.at + 16], [0, 1])
        const [ox, oy] = step.from
        return (
          <div
            key={step.src}
            style={{
              position: 'absolute',
              left: `${ox * 100 * (1 - t)}%`,
              top: `${oy * 100 * (1 - t)}%`,
              width: '100%',
              height: '100%',
              transform: `scale(${0.1 + t * 0.9})`,
              transformOrigin: 'top left',
              borderRadius: 60 * (1 - t),
              overflow: 'hidden',
              opacity: Math.min(1, t * 3),
            }}
          >
            <Shot src={footage(step.src)} />
          </div>
        )
      })}
      {steps.slice(1).map((step) => {
        // A finger tap just before each screen opens
        const t = (f - step.at + 6) / 14
        if (!step.from || t < 0 || t > 1) return null
        return (
          <div
            key={`tap-${step.at}`}
            style={{
              position: 'absolute',
              left: `${step.from[0] * 100}%`,
              top: `${step.from[1] * 100}%`,
              width: 60,
              height: 60,
              marginLeft: -30,
              marginTop: -30,
              borderRadius: 30,
              background: `rgba(255,255,255,${0.5 * (1 - t)})`,
              transform: `scale(${0.6 + t * 0.8})`,
            }}
          />
        )
      })}
    </>
  )
}

/**
 * The mobile chapter. The iPhone turns out of the dark (back first so the
 * titanium and the camera catch the light), wakes facing us, then the
 * camera moves in while it navigates the portfolio; two more iPhones join
 * it in a lineup showing the other apps.
 */
const PhoneScene: React.FC = () => {
  const f = useCurrentFrame()
  const { fps } = useVideoConfig()
  const rise = spring({
    frame: f,
    fps,
    config: { damping: 200, stiffness: 40 },
  })
  const turn = ease(f, [0, 58], [0, 1], easeInOut)
  const zoom = ease(f, [58, 92], [0, 1])
  const line = spring({
    frame: f - 148,
    fps,
    config: { damping: 20, stiffness: 60 },
  })
  const exit = ease(f, [PHONE_LEN - 20, PHONE_LEN], [0, 1], easeIn)
  const ry =
    interpolate(turn, [0, 1], [-200, 0]) + Math.sin((f - 58) / 30) * 4 * turn
  const rx = interpolate(turn, [0, 1], [16, 3]) + Math.sin(f / 34) * 1.5
  const rz = interpolate(turn, [0, 1], [-12, 0])
  const mainScale = (1 + 0.15 * zoom) * (1 - 0.3 * line)
  const screenOn = interpolate(ry, [-60, -15], [0, 1], clamp)
  const side = (dir: -1 | 1, src: string, delay: number) => {
    const t = spring({
      frame: f - 150 - delay,
      fps,
      config: { damping: 20, stiffness: 60 },
    })
    if (t <= 0.001) return null
    const angle = dir * -22 * t + dir * -60 * (1 - t) + Math.sin(f / 30) * 3
    return (
      <div
        style={{
          position: 'absolute',
          left: 540 - PHONE_W / 2,
          top: 380,
          transformStyle: 'preserve-3d',
          transform: `translate3d(${dir * (340 + (1 - t) * 520)}px, ${40 + exit * 900}px, -60px) scale(0.8) rotateY(${angle}deg)`,
        }}
      >
        <IPhone3D
          width={PHONE_W}
          angle={angle}
          screen={<Shot src={footage(src)} />}
        />
      </div>
    )
  }
  const caption = [...CAPTIONS].reverse().find((c) => f >= c.at)
  const capT = caption ? ease(f, [caption.at, caption.at + 12], [0, 1]) : 0
  return (
    <AbsoluteFill>
      <StageLight y={60} w={60} h={42} opacity={rise * (1 - exit)} />
      <div
        style={{
          position: 'absolute',
          left: 540 - 300,
          top: 1180,
          width: 600,
          height: 70,
          borderRadius: '50%',
          background:
            'radial-gradient(ellipse, rgba(255,255,255,0.12), transparent 70%)',
          opacity: rise * (1 - exit),
        }}
      />
      {/* Opacity on the preserve-3d elements themselves would flatten them */}
      <AbsoluteFill
        style={{
          perspective: 2200,
          perspectiveOrigin: '50% 55%',
          opacity: Math.min(1, rise * 1.5) * (1 - exit),
        }}
      >
        {side(-1, 'mobile-about-digitaleo.jpg', 0)}
        {side(1, 'mobile-siri-answer.jpg', 8)}
        <div
          style={{
            position: 'absolute',
            left: 540 - PHONE_W / 2,
            top: 380,
            transformStyle: 'preserve-3d',
            transform: `translateY(${(1 - rise) * 520 + line * 40 + exit * 900}px) scale(${mainScale}) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg)`,
          }}
        >
          <IPhone3D
            width={PHONE_W}
            angle={ry}
            screenOn={screenOn}
            screen={<MobileFlow steps={MAIN_FLOW} />}
          />
        </div>
      </AbsoluteFill>
      <div
        style={{
          position: 'absolute',
          top: 120,
          width: '100%',
          opacity: 1 - exit,
        }}
      >
        <Letters text="Aussi sur iPhone." at={24} size={100} silver />
        <div style={{ height: 56, marginTop: 6 }}>
          {caption && (
            <div
              key={caption.at}
              style={{
                opacity: capT,
                transform: `translateY(${(1 - capT) * 16}px)`,
                filter: capT < 1 ? `blur(${(1 - capT) * 6}px)` : undefined,
              }}
            >
              <Body size={42}>{caption.text}</Body>
            </div>
          )}
        </div>
      </div>
    </AbsoluteFill>
  )
}

const OneMoreThing: React.FC = () => {
  const f = useCurrentFrame()
  return (
    <AbsoluteFill
      style={{
        background: '#000',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          transform: `scale(${1 + f * 0.0012})`,
          opacity: 1 - ease(f, [50, 62], [0, 1]),
        }}
      >
        <Letters
          text="One more thing…"
          at={6}
          size={92}
          weight={600}
          stagger={1.4}
          color="#d2d2d7"
        />
      </div>
    </AbsoluteFill>
  )
}

const CITY_AT = 84
const CITY_BEAT = 15
const CARD_AT = 168

/**
 * The job search as an Apple end card, in three movements of type:
 * availability, the cities one per beat, then the signature.
 */
const Availability: React.FC = () => {
  const f = useCurrentFrame()
  const { fps } = useVideoConfig()
  const word = ease(f, [4, 22], [0, 1], easeOut)
  const aOut = ease(f, [68, 82], [0, 1], easeIn)
  const allAt = CITY_AT + cities.length * CITY_BEAT
  const row = ease(f, [allAt, allAt + 14], [0, 1], easeOut)
  const bOut = ease(f, [CARD_AT - 12, CARD_AT], [0, 1], easeIn)
  const url = spring({
    frame: f - CARD_AT - 22,
    fps,
    config: { damping: 18, stiffness: 110 },
  })
  const fade = ease(f, [218, 240], [0, 1])
  const out = (t: number): React.CSSProperties => ({
    opacity: 1 - t,
    transform: `translateY(${-t * 70}px)`,
    filter: t > 0 ? `blur(${t * 10}px)` : undefined,
  })
  return (
    <AbsoluteFill style={{ opacity: 1 - fade }}>
      <StageLight y={44} w={62} h={38} opacity={ease(f, [0, 30], [0, 1])} />
      {f < CITY_AT && (
        <AbsoluteFill style={{ transform: `scale(${1 + f * 0.0006})` }}>
          <div
            style={{
              position: 'absolute',
              top: 420,
              width: '100%',
              ...out(aOut),
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                opacity: word,
                transform: `scale(${1.12 - word * 0.12})`,
                filter: word < 1 ? `blur(${(1 - word) * 14}px)` : undefined,
              }}
            >
              <SilverText size={190} sweepAt={26} weight={800}>
                Disponible.
              </SilverText>
            </div>
            <Rise at={24}>
              <Body size={62} color={stage.white} weight={700}>
                En CDI, dès octobre 2026.
              </Body>
            </Rise>
            <Rise at={36} style={{ marginTop: 14 }}>
              <Body size={40}>{person.role}</Body>
            </Rise>
          </div>
        </AbsoluteFill>
      )}
      {f >= CITY_AT - 6 && f < CARD_AT && (
        <div
          style={{
            position: 'absolute',
            top: 440,
            width: '100%',
            ...out(bOut),
          }}
        >
          <Rise at={CITY_AT - 6}>
            <Body size={44}>Pour un poste à</Body>
          </Rise>
          <div
            style={{
              marginTop: 18,
              height: 200,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <BeatWords
              size={170}
              until={allAt}
              words={cities.map((c, i) => ({
                text: `${c.name}.`,
                at: CITY_AT + i * CITY_BEAT,
                silver: true,
              }))}
            />
            {f >= allAt && (
              <div
                style={{
                  opacity: row,
                  transform: `scale(${1.08 - row * 0.08})`,
                  filter: row < 1 ? `blur(${(1 - row) * 10}px)` : undefined,
                }}
              >
                <Body size={60} color={stage.white} weight={700}>
                  {cities.map((c) => c.name).join(' · ')}
                </Body>
              </div>
            )}
          </div>
        </div>
      )}
      {f >= CARD_AT && (
        <AbsoluteFill
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            transform: `scale(${1 + (f - CARD_AT) * 0.0006})`,
          }}
        >
          <LogoTrace at={CARD_AT} size={200} fillAt={CARD_AT + 14} />
          <div style={{ marginTop: 34 }}>
            <Letters
              text="Antoine Gourgue"
              at={CARD_AT + 8}
              size={100}
              silver
            />
          </div>
          <div
            style={{
              marginTop: 40,
              padding: '20px 44px',
              borderRadius: 999,
              background: '#0071e3',
              fontFamily: fonts.display,
              fontSize: 46,
              fontWeight: 700,
              color: '#fff',
              letterSpacing: '-0.02em',
              boxShadow: '0 0 60px rgba(0,113,227,0.45)',
              transform: `scale(${0.85 + url * 0.15})`,
              opacity: Math.min(1, url * 1.5),
            }}
          >
            {person.url}
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  )
}

export const Keynote: React.FC<{ withAudio?: boolean }> = ({
  withAudio = true,
}) => (
  <AbsoluteFill style={{ background: '#000' }}>
    <Sequence from={0} durationInFrames={126} name="Opener">
      <Opener />
    </Sequence>
    <Sequence from={120} durationInFrames={130} name="AntoineOS">
      <Wordmark />
    </Sequence>
    <Sequence from={244} durationInFrames={240} name="MacBook">
      <MacScene />
    </Sequence>
    <Sequence from={480} durationInFrames={122} name="Icons">
      <IconsScene />
    </Sequence>
    {SHOWCASES.map((show, i) => (
      <Sequence
        key={show.name}
        from={600 + i * SHOW_LEN}
        durationInFrames={SHOW_LEN + WHIP}
        name={show.name}
      >
        <ShowcaseScene show={show} index={i} />
      </Sequence>
    ))}
    <Sequence from={848} durationInFrames={234} name="Numbers">
      <NumbersScene />
    </Sequence>
    <Sequence from={1080} durationInFrames={PHONE_LEN + 4} name="iPhone">
      <PhoneScene />
    </Sequence>
    <Sequence from={1320} durationInFrames={62} name="One more thing">
      <OneMoreThing />
    </Sequence>
    <Sequence from={1380} name="Availability">
      <Availability />
    </Sequence>
    <Grain opacity={0.05} />
    {withAudio && <Audio src={staticFile('audio/Keynote.wav')} />}
  </AbsoluteFill>
)
