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
import { fonts, projectImage, projects } from '../brand'
import { Grain, Vignette } from '../fx/Overlays'
import {
  CareerCalendar,
  Wallpaper,
  WhereMap,
  WriteAndClose,
  footage,
} from '../scenes/OsScenes'
import {
  AGAppIcon,
  Cursor,
  Icon,
  LightWindow,
  SpotlightPanel,
  keyframes,
  ui,
} from '../ui/Apps'
import {
  Chip,
  RevealText,
  clamp,
  easeIn,
  easeInOut,
  easeOut,
} from '../ui/Primitives'

const GRADIENT =
  'linear-gradient(120deg, #0A84FF 0%, #5E5CE6 60%, #BF5AF2 100%)'

const Caption: React.FC<{
  first: string
  second?: string
  start?: number
  size?: number
  top?: number
}> = ({ first, second, start = 4, size = 64, top = 64 }) => (
  <div style={{ position: 'absolute', top, width: '100%' }}>
    <RevealText text={first} start={start} size={size} />
    {second && (
      <RevealText
        text={second}
        start={start + 8}
        size={size}
        gradient={GRADIENT}
      />
    )}
  </div>
)

const MenuBar: React.FC = () => (
  <Img
    src={footage('menubar.webp')}
    style={{ position: 'absolute', top: 0, left: 0, width: 1080 }}
  />
)

const AppGlyph: React.FC<{ name: string; bg: string }> = ({ name, bg }) => (
  <div
    style={{
      width: 60,
      height: 60,
      borderRadius: 15,
      background: bg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    }}
  >
    <Icon name={name} size={32} color="#fff" />
  </div>
)

const Search: React.FC = () => {
  const f = useCurrentFrame()
  const out = interpolate(f, [100, 116], [0, 1], { ...clamp, easing: easeIn })
  const flash = f >= 96 && f < 100
  return (
    <AbsoluteFill>
      <Wallpaper dim={0.3} zoom={1.1} />
      <MenuBar />
      <div style={{ opacity: 1 - out }}>
        <Caption
          first="Vous cherchez"
          second="un profil Fullstack × IA ?"
          top={120}
        />
      </div>
      <div
        style={{
          position: 'absolute',
          left: 70,
          top: 470,
          opacity: 1 - out,
          transform: `scale(${1 - out * 0.08}) translateY(${out * -40}px)`,
          filter: flash ? 'brightness(1.08)' : undefined,
        }}
      >
        <SpotlightPanel
          width={940}
          query="développeur fullstack ia"
          typeAt={24}
          resultsAt={62}
          results={[
            {
              title: 'Antoine Gourgue',
              subtitle: 'Développeur Fullstack × IA · disponible en CDI',
              icon: <AGAppIcon size={60} />,
            },
            {
              title: '12 projets en ligne',
              subtitle: 'Mosaic, Zoidberg 2.0, TailTCG, THOR…',
              icon: <AppGlyph name="square_grid_2x2_fill" bg={ui.blue} />,
            },
            {
              title: 'Mon parcours',
              subtitle: 'Digitaleo · Epitech Rennes',
              icon: <AppGlyph name="calendar" bg="#FF453A" />,
            },
            {
              title: 'antoinegourgue.dev',
              subtitle: 'Ouvrir dans Safari',
              icon: <AppGlyph name="compass_fill" bg="#0A84FF" />,
            },
          ]}
        />
      </div>
    </AbsoluteFill>
  )
}

const About: React.FC = () => {
  const f = useCurrentFrame()
  const { fps } = useVideoConfig()
  const open = spring({
    frame: f,
    fps,
    config: { damping: 18, stiffness: 110 },
  })
  const exit = interpolate(f, [108, 120], [0, 1], { ...clamp, easing: easeIn })
  const W = 820
  const H = (W * 950) / 998
  const X = 130
  const Y = 360
  // Highlighter pen over the "Statut" line, as a recruiter would mark it
  const mark = interpolate(f, [52, 70], [0, 1], { ...clamp, easing: easeInOut })
  const mark2 = interpolate(f, [70, 76], [0, 1], {
    ...clamp,
    easing: easeInOut,
  })
  const cx = keyframes(f, [
    { f: 20, v: 900 },
    { f: 50, v: X + W * 0.4 },
    { f: 70, v: X + W * 0.79 },
  ])
  const cy = keyframes(f, [
    { f: 20, v: 1250 },
    { f: 50, v: Y + H * 0.745 },
    { f: 70, v: Y + H * 0.745 },
    { f: 76, v: Y + H * 0.79 },
  ])
  return (
    <AbsoluteFill style={{ opacity: 1 - exit }}>
      <Wallpaper dim={0.35} zoom={1.1} />
      <MenuBar />
      <Caption
        first="Master IA à Epitech."
        second="2,5 ans chez Digitaleo."
        top={90}
      />
      <div
        style={{
          position: 'absolute',
          left: X,
          top: Y,
          width: W,
          height: H,
          opacity: open,
          transform: `scale(${0.86 + open * 0.14})`,
        }}
      >
        <Img
          src={footage('window-about-card.png')}
          style={{
            width: W,
            height: H,
            filter: 'drop-shadow(0 40px 80px rgba(0,0,0,0.5))',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: W * 0.39,
            top: H * 0.722,
            width: W * 0.415 * mark,
            height: H * 0.04,
            background: 'rgba(255,214,10,0.45)',
            borderRadius: 4,
            mixBlendMode: 'multiply',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: W * 0.39,
            top: H * 0.765,
            width: W * 0.07 * mark2,
            height: H * 0.04,
            background: 'rgba(255,214,10,0.45)',
            borderRadius: 4,
            mixBlendMode: 'multiply',
          }}
        />
      </div>
      {f > 18 && <Cursor x={cx} y={cy} />}
    </AbsoluteFill>
  )
}

const QUICKLOOK = [
  { project: projects[0], at: 50 },
  { project: projects[1], at: 84 },
  { project: projects[2], at: 118 },
  { project: projects[3], at: 152 },
]

const Projects: React.FC = () => {
  const f = useCurrentFrame()
  const { fps } = useVideoConfig()
  const finder = spring({
    frame: f,
    fps,
    config: { damping: 18, stiffness: 110 },
  })
  const exit = interpolate(f, [168, 180], [0, 1], { ...clamp, easing: easeIn })
  const FW = 940
  const FH = (FW * 944) / 1280
  const FX = 70
  const FY = 380
  const target = { x: FX + FW * 0.695, y: FY + FH * 0.318 }
  const cx = keyframes(f, [
    { f: 8, v: 980 },
    { f: 38, v: target.x },
  ])
  const cy = keyframes(f, [
    { f: 8, v: 1280 },
    { f: 38, v: target.y },
  ])
  const pressed = (f >= 42 && f < 45) || (f >= 47 && f < 50)
  const ql = spring({
    frame: f - 50,
    fps,
    config: { damping: 16, stiffness: 120 },
  })
  const current =
    [...QUICKLOOK].reverse().find((q) => f >= q.at) ?? QUICKLOOK[0]
  const idx = QUICKLOOK.indexOf(current)
  const swap = interpolate(f, [current.at, current.at + 8], [0, 1], {
    ...clamp,
    easing: easeOut,
  })
  const QW = 900
  const QH = 640
  return (
    <AbsoluteFill style={{ opacity: 1 - exit }}>
      <Wallpaper dim={0.35} zoom={1.1} />
      <MenuBar />
      <Caption first="12 projets." second="Tous en ligne." top={90} />
      <Img
        src={footage('window-finder.webp')}
        style={{
          position: 'absolute',
          left: FX,
          top: FY,
          width: FW,
          height: FH,
          opacity: finder,
          transform: `translateY(${(1 - finder) * 200}px) scale(${1 - ql * 0.04})`,
          filter: `drop-shadow(0 40px 80px rgba(0,0,0,0.5)) brightness(${1 - ql * 0.25})`,
        }}
      />
      {f >= 50 && (
        <div
          style={{
            position: 'absolute',
            left: 540 - QW / 2,
            top: 430,
            opacity: ql,
            transform: `scale(${0.3 + ql * 0.7})`,
            transformOrigin: `${((target.x - (540 - QW / 2)) / QW) * 100}% ${((target.y - 430) / QH) * 100}%`,
          }}
        >
          <LightWindow
            width={QW}
            height={QH}
            title={current.project.name}
            style={{ position: 'relative' }}
            toolbar={
              <div
                style={{
                  padding: '8px 18px',
                  borderRadius: 999,
                  background: 'rgba(0,0,0,0.06)',
                  fontSize: 18,
                  fontWeight: 600,
                  color: ui.blue,
                }}
              >
                Ouvrir dans Safari
              </div>
            }
          >
            <Img
              key={current.project.id}
              src={projectImage(current.project)}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'top',
                opacity: idx === 0 ? 1 : swap,
                transform: `translateX(${idx === 0 ? 0 : (1 - swap) * 60}px)`,
              }}
            />
          </LightWindow>
          <div
            style={{
              marginTop: 22,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Chip color={current.project.tint} style={{ fontSize: 28 }}>
              {current.project.name} · {current.project.stack}
            </Chip>
          </div>
        </div>
      )}
      {f < 56 && <Cursor x={cx} y={cy} pressed={pressed} />}
    </AbsoluteFill>
  )
}

const Terminal: React.FC = () => {
  const f = useCurrentFrame()
  const { fps } = useVideoConfig()
  const open = spring({
    frame: f,
    fps,
    config: { damping: 18, stiffness: 110 },
  })
  const exit = interpolate(f, [108, 120], [0, 1], { ...clamp, easing: easeIn })
  const W = 900
  const H = (W * 742) / 878
  // Lines of the real terminal capture reveal as if printed
  const reveal = keyframes(
    f,
    [
      { f: 12, v: 0.12 },
      { f: 24, v: 0.2 },
      { f: 40, v: 0.52 },
      { f: 56, v: 0.6 },
      { f: 70, v: 0.72 },
      { f: 84, v: 1 },
    ],
    easeOut
  )
  return (
    <AbsoluteFill style={{ opacity: 1 - exit }}>
      <Wallpaper dim={0.4} zoom={1.1} />
      <MenuBar />
      <Caption first="Son statut ?" second="Dans le terminal." top={90} />
      <div
        style={{
          position: 'absolute',
          left: 540 - W / 2,
          top: 380,
          width: W,
          height: H,
          opacity: open,
          transform: `scale(${0.9 + open * 0.1})`,
          filter: 'drop-shadow(0 40px 80px rgba(0,0,0,0.55))',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 22,
            background: '#1e1e1e',
          }}
        />
        <Img
          src={footage('window-terminal-neofetch.png')}
          style={{
            position: 'absolute',
            width: W,
            height: H,
            clipPath: `inset(0 0 ${(1 - reveal) * 100}% 0)`,
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: W * 0.04,
            top: H * 0.61,
            width: W * 0.92,
            height: H * 0.12,
            borderRadius: 8,
            boxShadow: `0 0 0 3px rgba(48,209,88,${interpolate(f, [86, 96], [0, 0.9], clamp)})`,
          }}
        />
      </div>
    </AbsoluteFill>
  )
}

export const Spotlight: React.FC<{ withAudio?: boolean }> = ({
  withAudio = true,
}) => (
  <AbsoluteFill style={{ background: '#05070d', fontFamily: fonts.body }}>
    <Sequence from={0} durationInFrames={120} name="Search">
      <Search />
    </Sequence>
    <Sequence from={116} durationInFrames={124} name="About">
      <About />
    </Sequence>
    <Sequence from={240} durationInFrames={180} name="Projects">
      <Projects />
    </Sequence>
    <Sequence from={420} durationInFrames={120} name="Terminal">
      <Terminal />
    </Sequence>
    <Sequence from={540} durationInFrames={120} name="Calendar">
      <CareerCalendar duration={120} />
    </Sequence>
    <Sequence from={660} durationInFrames={120} name="Maps">
      <WhereMap duration={120} />
    </Sequence>
    <Sequence from={780} name="Mail + closing">
      <WriteAndClose mailDuration={96} />
    </Sequence>
    <Vignette strength={0.45} />
    <Grain opacity={0.05} />
    {withAudio && <Audio src={staticFile('audio/Spotlight.wav')} />}
  </AbsoluteFill>
)
