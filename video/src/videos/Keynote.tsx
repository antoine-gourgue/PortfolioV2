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
import { PHONE_RATIO, Phone } from '../ui/Apps'
import {
  AGLogo,
  Counter,
  clamp,
  easeIn,
  easeInOut,
  easeOut,
} from '../ui/Primitives'

// An Apple event stage: black, white type, one grey for secondary lines
const white = '#f5f5f7'
const grey = '#86868b'
const link = '#2997ff'
const SILVER = 'linear-gradient(180deg, #ffffff 20%, #9a9aa0 100%)'

/** Apple's slide build: fade up from 24px, then hold, then dissolve out. */
const useBuild = (start: number, end?: number) => {
  const f = useCurrentFrame()
  const t = interpolate(f, [start, start + 18], [0, 1], {
    ...clamp,
    easing: easeOut,
  })
  const o =
    end === undefined
      ? 0
      : interpolate(f, [end - 10, end], [0, 1], { ...clamp, easing: easeIn })
  return {
    opacity: t * (1 - o),
    transform: `translateY(${(1 - t) * 24}px)`,
  }
}

const Title: React.FC<{
  children: React.ReactNode
  size?: number
  color?: string
  weight?: number
  style?: React.CSSProperties
}> = ({ children, size = 110, color = white, weight = 700, style }) => (
  <div
    style={{
      fontFamily: fonts.display,
      fontSize: size,
      fontWeight: weight,
      letterSpacing: '-0.035em',
      lineHeight: 1.04,
      color,
      textAlign: 'center',
      ...style,
    }}
  >
    {children}
  </div>
)

/** MacBook Pro silhouette: black bezel, aluminium base, lid hinge. */
export const MacBook: React.FC<{
  width: number
  lid?: number
  children: React.ReactNode
}> = ({ width, lid = 0, children }) => {
  const H = width * 0.625
  return (
    <div style={{ width, perspective: 2400 }}>
      <div
        style={{
          width,
          height: H,
          borderRadius: `${width * 0.03}px ${width * 0.03}px ${width * 0.006}px ${width * 0.006}px`,
          background: '#0b0b0c',
          padding: width * 0.018,
          boxSizing: 'border-box',
          transformOrigin: 'bottom center',
          transform: `rotateX(${lid}deg)`,
          boxShadow: '0 0 0 1.5px #3a3a3e, 0 40px 120px rgba(255,255,255,0.06)',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: width * 0.008,
            overflow: 'hidden',
            position: 'relative',
            background: '#000',
            filter: `brightness(${interpolate(lid, [-50, 0], [0.15, 1], clamp)})`,
          }}
        >
          {children}
        </div>
      </div>
      <div
        style={{
          width: width * 1.14,
          marginLeft: -width * 0.07,
          height: width * 0.032,
          borderRadius: `0 0 ${width * 0.04}px ${width * 0.04}px`,
          background:
            'linear-gradient(180deg, #8e8e93 0%, #3a3a3c 70%, #1c1c1e 100%)',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            width: width * 0.16,
            height: width * 0.01,
            marginLeft: -width * 0.08,
            borderRadius: `0 0 ${width * 0.01}px ${width * 0.01}px`,
            background: '#2c2c2e',
          }}
        />
      </div>
    </div>
  )
}

export const Screen: React.FC<{ src: string; position?: string }> = ({
  src,
  position = 'top',
}) => (
  <Img
    src={src}
    style={{
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: position,
    }}
  />
)

const Opening: React.FC = () => {
  const f = useCurrentFrame()
  const logo = interpolate(f, [4, 30, 44, 56], [0, 1, 1, 0], clamp)
  // "Bonjour." written left to right, a nod to the Macintosh "hello"
  const wipe = interpolate(f, [58, 96], [0, 1], { ...clamp, easing: easeInOut })
  const out = interpolate(f, [108, 120], [0, 1], clamp)
  const mask = `linear-gradient(90deg, #000 ${wipe * 100}%, transparent ${wipe * 100 + 8}%)`
  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
      <div
        style={{
          position: 'absolute',
          opacity: logo,
          transform: `scale(${0.96 + logo * 0.04})`,
        }}
      >
        <AGLogo size={220} color={white} />
      </div>
      <div
        style={{
          opacity: 1 - out,
          WebkitMaskImage: mask,
          maskImage: mask,
        }}
      >
        <Title
          size={170}
          weight={600}
          style={{
            backgroundImage: SILVER,
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Bonjour.
        </Title>
      </div>
    </AbsoluteFill>
  )
}

const OSSlide: React.FC = () => {
  const f = useCurrentFrame()
  const { fps } = useVideoConfig()
  const rise = spring({
    frame: f - 6,
    fps,
    config: { damping: 22, stiffness: 80 },
  })
  const lid = interpolate(f, [16, 56], [-88, 0], {
    ...clamp,
    easing: easeInOut,
  })
  const title = useBuild(4, 120)
  const sub = useBuild(18, 120)
  const out = interpolate(f, [110, 120], [0, 1], clamp)
  return (
    <AbsoluteFill>
      <div style={{ position: 'absolute', top: 150, width: '100%' }}>
        <div style={title}>
          <Title size={128}>AntoineOS 26</Title>
        </div>
        <div style={{ ...sub, marginTop: 20 }}>
          <Title size={46} weight={600} color={grey}>
            Un portfolio qui est un vrai système.
          </Title>
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 540 - 430,
          top: 580,
          opacity: rise * (1 - out),
          transform: `translateY(${(1 - rise) * 260}px) rotateY(${-6 + f * 0.06}deg)`,
        }}
      >
        <MacBook width={860} lid={lid}>
          <Screen src={footage('desktop.jpg')} />
        </MacBook>
      </div>
    </AbsoluteFill>
  )
}

const Chapter: React.FC<{ text: string; duration: number }> = ({
  text,
  duration,
}) => {
  const s = useBuild(2, duration)
  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
      <div style={s}>
        <Title size={150}>{text}</Title>
      </div>
    </AbsoluteFill>
  )
}

type ProjectSlide = {
  eyebrow: string
  name: string
  subtitle: string
  lines: [string, string]
  screen: string
  position?: string
}

const SLIDES: ProjectSlide[] = [
  {
    eyebrow: 'Digitaleo · alternance',
    name: 'Éditeur d’email',
    subtitle: 'Le cœur de la plateforme, utilisé chaque jour.',
    lines: ['37 000 utilisateurs actifs', '600+ réseaux d’enseignes'],
    screen: staticFile('assets/projects/digitaleo-editor.jpg'),
    position: 'left top',
  },
  {
    eyebrow: 'IA médicale',
    name: 'Zoidberg 2.0',
    subtitle: 'Détecte une pneumonie sur une radio thoracique.',
    lines: ['91,2 % d’exactitude', 'CNN · Grad-CAM'],
    screen: projectImage(projects[1]),
  },
  {
    eyebrow: 'Web · temps réel',
    name: 'Mosaic',
    subtitle: 'Découvrir, enregistrer, organiser ses idées.',
    lines: ['Boards collaboratifs', 'Next.js · Prisma · Auth.js'],
    screen: projectImage(projects[0]),
  },
  {
    eyebrow: 'Web app · mobile',
    name: 'TailTCG',
    subtitle: 'Ta collection Pokémon, enfin à sa hauteur.',
    lines: ['Scan, cote, classeurs', 'Next.js · TypeScript'],
    screen: footage('tailtcg-mobile.jpg'),
  },
]
const PER = 90

/**
 * Four product slides with Keynote's Magic Move: the MacBook stays put while
 * its screen dissolves to the next project, the copy rebuilds line by line,
 * and the last slide morphs the MacBook into an iPhone.
 */
const Projects: React.FC = () => {
  const f = useCurrentFrame()
  const i = Math.min(Math.floor(f / PER), SLIDES.length - 1)
  const local = f - i * PER
  const slide = SLIDES[i]
  const prev = SLIDES[Math.max(i - 1, 0)]
  const dissolve = interpolate(local, [0, 14], [i === 0 ? 1 : 0, 1], {
    ...clamp,
    easing: easeInOut,
  })
  const last = SLIDES.length * PER
  const toPhone = interpolate(f, [3 * PER - 4, 3 * PER + 16], [0, 1], {
    ...clamp,
    easing: easeInOut,
  })
  const enter = interpolate(f, [0, 20], [0, 1], { ...clamp, easing: easeOut })
  const out = interpolate(f, [last - 10, last], [0, 1], clamp)
  const build = (d: number) => {
    const t = interpolate(local, [d, d + 16], [0, 1], {
      ...clamp,
      easing: easeOut,
    })
    const o =
      i === SLIDES.length - 1
        ? 0
        : interpolate(local, [PER - 10, PER], [0, 1], clamp)
    return {
      opacity: t * (1 - o),
      transform: `translateY(${(1 - t) * 20}px)`,
    }
  }
  const drift = Math.sin(f / 50) * 3
  const PW = 330
  const SW = PW * 0.936
  // The Mac keeps showing the last Mac project while the iPhone takes over
  const macScreen = i === 3 ? SLIDES[2] : slide
  return (
    <AbsoluteFill style={{ opacity: 1 - out }}>
      <div
        style={{
          position: 'absolute',
          top: 150,
          left: 70,
          right: 70,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            ...build(0),
            fontFamily: fonts.body,
            fontSize: 30,
            fontWeight: 600,
            color: grey,
          }}
        >
          {slide.eyebrow}
        </div>
        <div style={{ ...build(4), marginTop: 10 }}>
          <Title size={112}>{slide.name}</Title>
        </div>
        <div style={{ ...build(10), marginTop: 16 }}>
          <Title size={40} weight={600} color={grey}>
            {slide.subtitle}
          </Title>
        </div>
        <div
          style={{
            ...build(20),
            marginTop: 30,
            display: 'flex',
            justifyContent: 'center',
            gap: 40,
            fontFamily: fonts.body,
            fontSize: 30,
            fontWeight: 600,
            color: white,
          }}
        >
          <span>{slide.lines[0]}</span>
          <span style={{ color: grey }}>{slide.lines[1]}</span>
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 540 - 430,
          top: 600,
          opacity: enter * (1 - toPhone),
          transform: `translateY(${(1 - enter) * 120 + toPhone * 80}px) scale(${1 - toPhone * 0.2}) rotateY(${drift}deg)`,
        }}
      >
        <MacBook width={860}>
          <Screen src={prev.screen} position={prev.position} />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: i === 3 ? 1 : dissolve,
              transform: `scale(${i === 3 ? 1 : 1.04 - dissolve * 0.04})`,
            }}
          >
            <Screen src={macScreen.screen} position={macScreen.position} />
          </div>
        </MacBook>
      </div>
      {toPhone > 0 && (
        <div
          style={{
            position: 'absolute',
            left: 540 - PW / 2,
            top: 560,
            opacity: toPhone,
            transform: `translateY(${(1 - toPhone) * 120}px) scale(${0.85 + toPhone * 0.15}) rotateY(${drift}deg)`,
          }}
        >
          <Phone width={PW} glow="rgba(255,255,255,0.05)">
            <Img
              src={SLIDES[3].screen}
              style={{ width: SW, height: SW * PHONE_RATIO }}
            />
          </Phone>
        </div>
      )}
    </AbsoluteFill>
  )
}

const STATS = [
  {
    value: 37000,
    decimals: 0,
    suffix: '',
    label: 'utilisateurs actifs sur l’app',
  },
  {
    value: 91.2,
    decimals: 1,
    suffix: ' %',
    label: 'd’exactitude pour Zoidberg 2.0',
  },
  { value: 12, decimals: 0, suffix: '', label: 'projets en ligne' },
  {
    value: 2.5,
    decimals: 1,
    suffix: ' ans',
    label: 'd’alternance chez Digitaleo',
  },
]

const Stat: React.FC<{ s: (typeof STATS)[0]; duration: number }> = ({
  s,
  duration,
}) => {
  const num = useBuild(0, duration)
  const label = useBuild(8, duration)
  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
      <div style={num}>
        <div
          style={{
            fontFamily: fonts.display,
            fontSize: 250,
            fontWeight: 700,
            letterSpacing: '-0.05em',
            lineHeight: 1,
            backgroundImage: SILVER,
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            paddingBottom: 10,
          }}
        >
          <Counter
            to={s.value}
            start={0}
            duration={20}
            decimals={s.decimals}
            suffix={s.suffix}
          />
        </div>
      </div>
      <div style={{ ...label, marginTop: 20 }}>
        <Title size={48} weight={600} color={grey}>
          {s.label}
        </Title>
      </div>
    </AbsoluteFill>
  )
}

const IPhoneSlide: React.FC = () => {
  const f = useCurrentFrame()
  const { fps } = useVideoConfig()
  const rise = spring({
    frame: f - 4,
    fps,
    config: { damping: 20, stiffness: 80 },
  })
  const swipe = interpolate(f, [58, 72], [0, 1], {
    ...clamp,
    easing: easeInOut,
  })
  const title = useBuild(2, 120)
  const sub = useBuild(12, 120)
  const out = interpolate(f, [110, 120], [0, 1], clamp)
  const PW = 400
  const SW = PW * 0.936
  const SH = SW * PHONE_RATIO
  return (
    <AbsoluteFill>
      <div style={{ position: 'absolute', top: 100, width: '100%' }}>
        <div style={title}>
          <Title size={104}>Aussi sur iPhone.</Title>
        </div>
        <div style={{ ...sub, marginTop: 14 }}>
          <Title size={42} weight={600} color={grey}>
            Chaque app, en version iOS.
          </Title>
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 540 - PW / 2,
          top: 400,
          opacity: rise * (1 - out),
          transform: `translateY(${(1 - rise) * 400}px) rotateY(${-8 + f * 0.1}deg)`,
        }}
      >
        <Phone width={PW} glow="rgba(255,255,255,0.05)">
          <div
            style={{
              display: 'flex',
              width: SW * 2,
              transform: `translateX(${-swipe * SW}px)`,
            }}
          >
            <Img
              src={footage('mobile-home.jpg')}
              style={{ width: SW, height: SH }}
            />
            <Img
              src={footage('mobile-projects.jpg')}
              style={{ width: SW, height: SH }}
            />
          </div>
        </Phone>
      </div>
    </AbsoluteFill>
  )
}

const OneMoreThing: React.FC<{ duration: number }> = ({ duration }) => {
  const s = useBuild(6, duration)
  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
      <div style={s}>
        <Title size={84} weight={600} color={grey}>
          One more thing…
        </Title>
      </div>
    </AbsoluteFill>
  )
}

const Available: React.FC = () => {
  const f = useCurrentFrame()
  const { fps } = useVideoConfig()
  const a = useBuild(4)
  const b = useBuild(16)
  const c = useBuild(70)
  const d = useBuild(82)
  const mac = spring({
    frame: f - 26,
    fps,
    config: { damping: 22, stiffness: 80 },
  })
  const phone = spring({
    frame: f - 40,
    fps,
    config: { damping: 20, stiffness: 90 },
  })
  const PW = 180
  const SW = PW * 0.936
  return (
    <AbsoluteFill>
      <div style={{ position: 'absolute', top: 120, width: '100%' }}>
        <div style={a}>
          <Title size={120}>Disponible en CDI.</Title>
        </div>
        <div style={{ ...b, marginTop: 16 }}>
          <Title
            size={60}
            weight={600}
            style={{
              backgroundImage: SILVER,
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Dès octobre 2026.
          </Title>
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 540 - 340,
          top: 470,
          opacity: mac,
          transform: `translateY(${(1 - mac) * 200}px)`,
        }}
      >
        <MacBook width={640}>
          <Screen src={footage('desktop.jpg')} />
        </MacBook>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 740,
          top: 610,
          opacity: phone,
          transform: `translateY(${(1 - phone) * 200}px)`,
        }}
      >
        <Phone width={PW} glow="rgba(255,255,255,0.05)">
          <Img
            src={footage('mobile-home.jpg')}
            style={{ width: SW, height: SW * PHONE_RATIO }}
          />
        </Phone>
      </div>
      <div style={{ position: 'absolute', top: 1010, width: '100%' }}>
        <div style={c}>
          <Title size={44} weight={600}>
            {person.role}
          </Title>
          <Title size={34} weight={500} color={grey} style={{ marginTop: 12 }}>
            {person.mobility}
          </Title>
        </div>
        <div style={{ ...d, marginTop: 34 }}>
          <Title size={44} weight={600} color={link}>
            {person.url} ›
          </Title>
        </div>
      </div>
    </AbsoluteFill>
  )
}

const End: React.FC<{ duration: number }> = ({ duration }) => {
  const f = useCurrentFrame()
  const o = interpolate(
    f,
    [0, 16, duration - 24, duration],
    [0, 1, 1, 0],
    clamp
  )
  return (
    <AbsoluteFill
      style={{ justifyContent: 'center', alignItems: 'center', opacity: o }}
    >
      <AGLogo size={200} color={white} />
    </AbsoluteFill>
  )
}

export const Keynote: React.FC<{ withAudio?: boolean }> = ({
  withAudio = true,
}) => (
  <AbsoluteFill style={{ background: '#000' }}>
    <Sequence from={0} durationInFrames={120} name="Opening">
      <Opening />
    </Sequence>
    <Sequence from={120} durationInFrames={120} name="AntoineOS 26">
      <OSSlide />
    </Sequence>
    <Sequence from={240} durationInFrames={60} name="Chapter">
      <Chapter text="Projets." duration={60} />
    </Sequence>
    <Sequence from={300} durationInFrames={360} name="Projects">
      <Projects />
    </Sequence>
    {STATS.map((s, i) => (
      <Sequence
        key={s.label}
        from={660 + i * 45}
        durationInFrames={45}
        name={`Stat ${i + 1}`}
      >
        <Stat s={s} duration={45} />
      </Sequence>
    ))}
    <Sequence from={840} durationInFrames={120} name="iPhone">
      <IPhoneSlide />
    </Sequence>
    <Sequence from={960} durationInFrames={60} name="One more thing">
      <OneMoreThing duration={60} />
    </Sequence>
    <Sequence from={1020} durationInFrames={180} name="Available">
      <Available />
    </Sequence>
    <Sequence from={1200} durationInFrames={90} name="End">
      <End duration={90} />
    </Sequence>
    {withAudio && <Audio src={staticFile('audio/Keynote.wav')} />}
  </AbsoluteFill>
)
