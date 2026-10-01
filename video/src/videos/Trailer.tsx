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
import { asset, colors, fonts, person, projectImage, projects } from '../brand'
import { CueSheet, cueFrames } from '../cues'
import { Distort, Shake } from '../fx/Distort'
import { NeuralNet } from '../fx/NeuralNet'
import {
  AnamorphicFlare,
  Flash,
  Grain,
  SoftImage,
  Vignette,
} from '../fx/Overlays'
import { Dust, ParticleMorph, scatter, useImagePoints } from '../fx/Particles'
import { ShaderBackground } from '../fx/Shader'
import {
  AGLogo,
  Counter,
  clamp,
  easeIn,
  easeInOut,
  easeOut,
} from '../ui/Primitives'
import sheet from './Trailer.cues.json'

const cues = sheet as CueSheet
const GOLD = '#ffcf8a'
const AMBER = '#ffb340'
const GOLD_TEXT = `linear-gradient(180deg, #fff6e6 0%, ${GOLD} 55%, #c98a3a 100%)`

/** Film-style line: fades in from blur while the tracking tightens. */
const TrailerLine: React.FC<{
  text: string
  start: number
  end: number
  size?: number
  weight?: number
  y?: number
}> = ({ text, start, end, size = 74, weight = 600, y = 675 }) => {
  const f = useCurrentFrame()
  const inT = interpolate(f, [start, start + 18], [0, 1], {
    ...clamp,
    easing: easeOut,
  })
  const outT = interpolate(f, [end - 10, end], [0, 1], {
    ...clamp,
    easing: easeIn,
  })
  const track = interpolate(f, [start, end], [0.14, 0.02], clamp)
  return (
    <div
      style={{
        position: 'absolute',
        top: y,
        left: 60,
        right: 60,
        transform: 'translateY(-50%)',
        textAlign: 'center',
        fontFamily: fonts.display,
        fontWeight: weight,
        fontSize: size,
        lineHeight: 1.1,
        letterSpacing: `${track}em`,
        color: colors.white,
        whiteSpace: 'pre-line',
        opacity: inT * (1 - outT),
        filter: `blur(${(1 - inT) * 14 + outT * 10}px)`,
      }}
    >
      {text}
    </div>
  )
}

const Intro: React.FC = () => (
  <AbsoluteFill style={{ background: '#030303' }}>
    <ShaderBackground
      preset="beams"
      colorA={GOLD}
      colorB="#2a1c0c"
      intensity={0.25}
    />
    <Dust color={GOLD} count={110} speed={0.5} opacity={0.6} />
    <TrailerLine text={'Certains écrivent\ndu code.'} start={6} end={56} />
    <TrailerLine
      text={"D'autres construisent\ndes expériences."}
      start={58}
      end={118}
    />
  </AbsoluteFill>
)

const Gallery: React.FC = () => {
  const f = useCurrentFrame()
  const yaw = interpolate(f, [0, 240], [-16, 14], { easing: easeInOut })
  const push = interpolate(f, [0, 240], [-500, 250], { easing: easeOut })
  const list = projects.slice(0, 12)
  const R = 1250
  const names = list.slice(0, 6)
  const nameIndex = Math.min(Math.floor(f / 40), names.length - 1)
  const nameT = (f % 40) / 40
  return (
    <AbsoluteFill style={{ background: '#030303' }}>
      <ShaderBackground
        preset="beams"
        colorA={GOLD}
        colorB="#3a2610"
        intensity={1.1}
      />
      <AbsoluteFill style={{ perspective: 1000 }}>
        <div
          style={{
            position: 'absolute',
            left: 540,
            top: 600,
            transformStyle: 'preserve-3d',
            transform: `translateZ(${push}px) rotateY(${yaw}deg)`,
          }}
        >
          {list.map((p, i) => {
            const row = i % 2
            const col = Math.floor(i / 2)
            const theta = (col - 2.5) * 24
            const rad = (theta * Math.PI) / 180
            const x = R * Math.sin(rad)
            const z = -R * Math.cos(rad) + 350
            // Cheap depth of field: panels far from the focal ring go soft
            const depth = Math.abs(theta + yaw)
            const blur = interpolate(depth, [10, 60], [0, 6], clamp)
            const appear = interpolate(f, [col * 6, col * 6 + 30], [0, 1], {
              ...clamp,
              easing: easeOut,
            })
            return (
              <div
                key={p.id}
                style={{
                  position: 'absolute',
                  left: -320,
                  top: -200 + (row ? 235 : -235),
                  width: 640,
                  height: 400,
                  borderRadius: 14,
                  overflow: 'hidden',
                  opacity: appear,
                  filter: `blur(${blur}px) brightness(${0.75 - depth / 250})`,
                  transform: `translate3d(${x}px, 0, ${z}px) rotateY(${-theta}deg)`,
                  boxShadow: `0 0 80px ${GOLD}33, 0 0 0 1px rgba(255,255,255,0.15)`,
                }}
              >
                <Img
                  src={projectImage(p)}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'top',
                  }}
                />
              </div>
            )
          })}
        </div>
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          background:
            'linear-gradient(to bottom, rgba(3,3,3,0.85) 0%, transparent 18%, transparent 62%, rgba(3,3,3,0.95) 82%)',
        }}
      />
      <AnamorphicFlare
        x={interpolate(f, [0, 60], [200, 900])}
        y={600}
        opacity={interpolate(f, [0, 4, 50], [0, 1, 0], clamp)}
        color={AMBER}
      />
      <TrailerLine
        text="Des produits réels."
        start={70}
        end={236}
        y={1090}
        size={70}
        weight={700}
      />
      <TrailerLine
        text="Pas des maquettes."
        start={96}
        end={236}
        y={1175}
        size={70}
        weight={300}
      />
      <div
        style={{
          position: 'absolute',
          top: 120,
          width: '100%',
          textAlign: 'center',
          fontFamily: fonts.display,
          fontWeight: 300,
          fontSize: 30,
          letterSpacing: '0.45em',
          color: GOLD,
          opacity:
            Math.sin(Math.PI * nameT) * interpolate(f, [0, 20], [0, 1], clamp),
        }}
      >
        {names[nameIndex].name.toUpperCase()}
      </div>
    </AbsoluteFill>
  )
}

const BigNumber: React.FC<{
  value: number
  decimals?: number
  suffix?: string
  label: string
  context: string
  image: string
}> = ({ value, decimals = 0, suffix = '', label, context, image }) => {
  const f = useCurrentFrame()
  const slam = interpolate(f, [0, 10], [0, 1], { ...clamp, easing: easeOut })
  const sweep = interpolate(f, [4, 46], [-40, 140], clamp)
  const out = interpolate(f, [52, 60], [0, 1], clamp)
  return (
    <AbsoluteFill style={{ background: '#030303' }}>
      <SoftImage
        src={image}
        blur={10}
        style={{ opacity: 0.16, transform: `scale(${1.1 + f * 0.002})` }}
        imgStyle={{
          width: '140%',
          left: '-20%',
          top: '28%',
          filter: 'saturate(0.4)',
        }}
      />
      <ShaderBackground
        preset="beams"
        colorA={GOLD}
        colorB="#2a1a0a"
        intensity={0.55}
      />
      <div
        style={{
          position: 'absolute',
          top: 560,
          width: '100%',
          textAlign: 'center',
          transform: `translateY(-50%) scale(${1.3 - slam * 0.3})`,
          opacity: slam * (1 - out),
          filter: `blur(${(1 - slam) * 18 + out * 10}px)`,
        }}
      >
        <div
          style={{
            fontFamily: fonts.display,
            fontWeight: 800,
            fontSize: 260,
            letterSpacing: '-0.05em',
            lineHeight: 1,
            backgroundImage: `linear-gradient(100deg, transparent ${sweep - 18}%, rgba(255,255,255,0.95) ${sweep}%, transparent ${sweep + 18}%), ${GOLD_TEXT}`,
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            filter: `drop-shadow(0 0 40px ${AMBER}55)`,
          }}
        >
          <Counter
            to={value}
            start={0}
            duration={16}
            decimals={decimals}
            suffix={suffix}
          />
        </div>
        <div
          style={{
            marginTop: 30,
            fontFamily: fonts.display,
            fontWeight: 300,
            fontSize: 48,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: colors.white,
          }}
        >
          {label}
        </div>
        <div
          style={{
            marginTop: 26,
            fontFamily: fonts.body,
            fontWeight: 500,
            fontSize: 28,
            color: '#a1a1a6',
            letterSpacing: '0.04em',
          }}
        >
          {context}
        </div>
      </div>
      <AnamorphicFlare
        x={540}
        y={520}
        opacity={interpolate(f, [0, 3, 30], [0, 1, 0], clamp)}
        color={AMBER}
        width={1600}
      />
    </AbsoluteFill>
  )
}

const CodeRain: React.FC<{ opacity: number }> = ({ opacity }) => {
  const f = useCurrentFrame()
  const lines = [
    'app.post("/api/boards", auth, async (req, res) => {',
    '  const board = await prisma.board.create({ data })',
    '  io.to(room).emit("card:moved", payload)',
    'SELECT user_id, COUNT(*) FROM campaigns GROUP BY 1;',
    'docker compose up -d --build',
    'export default defineEventHandler(async (event) => {',
    '  return await $fetch("/api/projects")',
    'git push origin main  # lint, tests, build: passed',
  ]
  return (
    <AbsoluteFill style={{ opacity, overflow: 'hidden' }}>
      {Array.from({ length: 34 }, (_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: 40 + ((i * 137) % 300),
            top: ((((i * 41 - f * (2 + (i % 3))) % 1500) + 1500) % 1500) - 80,
            fontFamily: fonts.mono,
            fontSize: 24,
            color: i % 4 === 0 ? GOLD : '#6e6e73',
            whiteSpace: 'nowrap',
            opacity: 0.25 + (i % 5) * 0.1,
          }}
        >
          {lines[i % lines.length]}
        </div>
      ))}
    </AbsoluteFill>
  )
}

const Statements: React.FC = () => {
  const f = useCurrentFrame()
  const stage = f < 45 ? 0 : f < 90 ? 1 : 2
  const local = stage === 0 ? f : stage === 1 ? f - 45 : f - 90
  const slam = interpolate(local, [0, 9], [0, 1], { ...clamp, easing: easeOut })
  const texts = ['Du front-end.', 'Au back-end.', "Jusqu'à l'IA."]
  const fade = interpolate(f, [166, 180], [1, 0], clamp)
  return (
    <AbsoluteFill style={{ background: '#030303', opacity: fade }}>
      {stage === 0 && (
        <SoftImage
          src={projectImage(projects[10])}
          blur={6}
          style={{ opacity: 0.35, transform: `scale(${1 + local * 0.004})` }}
          imgStyle={{
            width: '160%',
            left: '-30%',
            top: '22%',
            filter: 'brightness(0.35)',
          }}
        />
      )}
      {stage === 1 && <CodeRain opacity={0.8} />}
      {stage === 2 && (
        <>
          <ShaderBackground
            preset="aurora"
            colorA="#2a1606"
            colorB={AMBER}
            intensity={interpolate(local, [0, 20], [0, 0.8], clamp)}
          />
          <NeuralNet
            layers={[5, 8, 8, 5, 3]}
            x={100}
            y={260}
            width={880}
            height={260}
            reveal={interpolate(local, [0, 60], [0, 1], clamp)}
            colorA={GOLD}
            colorB="#ff8a3d"
            seed="trailer-nn"
          />
        </>
      )}
      <div
        style={{
          position: 'absolute',
          top: stage === 2 ? 760 : 675,
          width: '100%',
          textAlign: 'center',
          transform: `translateY(-50%) scale(${1.25 - slam * 0.25})`,
          filter: `blur(${(1 - slam) * 16}px)`,
          opacity: slam,
          fontFamily: fonts.display,
          fontWeight: 800,
          fontSize: 124,
          letterSpacing: '-0.035em',
          ...(stage === 2
            ? {
                backgroundImage: GOLD_TEXT,
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }
            : { color: colors.white }),
        }}
      >
        {texts[stage]}
      </div>
    </AbsoluteFill>
  )
}

const Portrait: React.FC = () => {
  const f = useCurrentFrame()
  const photo = useImagePoints(asset('profile.png'), {
    x: 540,
    y: 560,
    width: 960,
    step: 5,
  })
  const cloud = React.useMemo(
    () =>
      scatter(6000, 'tr-portrait', { x: -200, y: -200, w: 1480, h: 1750 }, [
        GOLD,
        '#ffffff',
        AMBER,
      ]),
    []
  )
  const t = interpolate(f, [0, 80], [0, 1], { ...clamp, easing: easeInOut })
  const reveal = interpolate(f, [70, 100], [0, 1], {
    ...clamp,
    easing: easeInOut,
  })
  const particles = interpolate(f, [90, 130], [1, 0.12], clamp)
  const name = interpolate(f, [96, 126], [0, 1], { ...clamp, easing: easeOut })
  const sub = interpolate(f, [112, 136], [0, 1], { ...clamp, easing: easeOut })
  return (
    <AbsoluteFill style={{ background: '#030303' }}>
      <ShaderBackground
        preset="beams"
        colorA={GOLD}
        colorB="#1a1208"
        intensity={0.5 * reveal + 0.15}
      />
      <Img
        src={asset('profile.png')}
        style={{
          position: 'absolute',
          width: 960,
          left: 60,
          top: 560 - 361,
          opacity: reveal,
          filter: `contrast(1.08) saturate(0.85) drop-shadow(0 0 30px ${AMBER}66) blur(${(1 - reveal) * 8}px)`,
          transform: `scale(${1 + f * 0.0006})`,
        }}
      />
      <ParticleMorph
        stages={[cloud, photo]}
        t={t}
        count={6000}
        size={2.2}
        jitter={220}
        opacity={particles}
        drift={f > 90 ? (f - 90) * 1.2 : 0}
        seed="tr-portrait"
      />
      <AbsoluteFill
        style={{
          background:
            'linear-gradient(to bottom, transparent 44%, #030303 60%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 1010,
          width: '100%',
          textAlign: 'center',
          fontFamily: fonts.display,
          fontWeight: 300,
          fontSize: 68,
          color: colors.white,
          letterSpacing: `${0.55 - name * 0.25}em`,
          opacity: name,
          filter: `blur(${(1 - name) * 10}px)`,
          // Tracking adds trailing space after the last letter; compensate
          paddingLeft: `${0.55 - name * 0.25}em`,
        }}
      >
        {`${person.firstName} ${person.lastName}`.toUpperCase()}
      </div>
      <div
        style={{
          position: 'absolute',
          top: 1110,
          width: '100%',
          textAlign: 'center',
          fontFamily: fonts.display,
          fontWeight: 600,
          fontSize: 44,
          backgroundImage: GOLD_TEXT,
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          opacity: sub,
          transform: `translateY(${(1 - sub) * 20}px)`,
        }}
      >
        {person.role}
      </div>
    </AbsoluteFill>
  )
}

const Finale: React.FC = () => {
  const f = useCurrentFrame()
  const slam = interpolate(f, [0, 12], [0, 1], { ...clamp, easing: easeOut })
  const line = (d: number) => ({
    opacity: interpolate(f, [d, d + 16], [0, 1], clamp),
    transform: `translateY(${interpolate(f, [d, d + 22], [24, 0], { ...clamp, easing: easeOut })}px)`,
  })
  const breathe = 1 + Math.sin(f / 18) * 0.004
  return (
    <AbsoluteFill style={{ background: '#030303' }}>
      <ShaderBackground
        preset="beams"
        colorA={GOLD}
        colorB="#3a2610"
        intensity={1.2}
      />
      <Dust color={GOLD} count={90} speed={0.4} opacity={0.5} />
      <div
        style={{
          position: 'absolute',
          top: 470,
          width: '100%',
          textAlign: 'center',
          transform: `translateY(-50%) scale(${(1.2 - slam * 0.2) * breathe})`,
          opacity: slam,
          filter: `blur(${(1 - slam) * 16}px) drop-shadow(0 0 50px ${AMBER}66)`,
          fontFamily: fonts.display,
          fontWeight: 800,
          fontSize: 158,
          letterSpacing: '-0.03em',
          backgroundImage: GOLD_TEXT,
          WebkitBackgroundClip: 'text',
          color: 'transparent',
        }}
      >
        Disponible.
      </div>
      <div
        style={{
          position: 'absolute',
          top: 610,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 22,
          fontFamily: fonts.display,
          color: colors.white,
        }}
      >
        <div
          style={{
            ...line(30),
            fontSize: 52,
            fontWeight: 600,
            letterSpacing: '0.02em',
          }}
        >
          CDI · Octobre 2026
        </div>
        <div
          style={{
            ...line(42),
            fontSize: 32,
            fontWeight: 300,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#c7c7cc',
          }}
        >
          {person.mobility}
        </div>
        <div style={{ ...line(60), marginTop: 90 }}>
          <AGLogo size={120} color={GOLD} />
        </div>
        <div
          style={{
            ...line(66),
            fontSize: 40,
            fontWeight: 300,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            paddingLeft: '0.3em',
          }}
        >
          {`${person.firstName} ${person.lastName}`}
        </div>
        <div
          style={{
            ...line(78),
            marginTop: 26,
            padding: '20px 54px',
            borderRadius: 999,
            border: `1.5px solid ${GOLD}`,
            fontFamily: fonts.body,
            fontWeight: 600,
            fontSize: 38,
            color: GOLD,
            boxShadow: `0 0 40px ${AMBER}33`,
          }}
        >
          {person.url}
        </div>
      </div>
    </AbsoluteFill>
  )
}

const Letterbox: React.FC = () => {
  const bar = {
    position: 'absolute' as const,
    left: 0,
    right: 0,
    height: 56,
    background: '#000',
  }
  return (
    <>
      <div style={{ ...bar, top: 0 }} />
      <div style={{ ...bar, bottom: 0 }} />
    </>
  )
}

export const Trailer: React.FC<{ withAudio?: boolean }> = ({
  withAudio = true,
}) => {
  const frame = useCurrentFrame()
  const hits = cueFrames(cues, 'impact', 'hit')
  // Chromatic aberration only, no tearing: this piece is film, not glitch
  let split = 0
  for (const h of hits) {
    const d = frame - h
    if (d >= 0 && d < 10) split = Math.max(split, (1 - d / 10) * 14)
  }
  const numbers = [
    {
      value: 37000,
      label: 'utilisateurs actifs',
      context: 'Éditeur d’email Digitaleo — mon alternance',
      image: asset('projects/digitaleo-editor.jpg'),
    },
    {
      value: 600,
      suffix: '+',
      label: 'réseaux d’enseignes',
      context: 'sur la plateforme Digitaleo',
      image: asset('projects/digitaleo-editor.jpg'),
    },
    {
      value: 91.2,
      decimals: 1,
      suffix: ' %',
      label: 'd’exactitude',
      context: 'Zoidberg 2.0 — CNN de détection de pneumonie',
      image: projectImage(projects[1]),
    },
    {
      value: 2.5,
      decimals: 1,
      suffix: ' ans',
      label: 'd’alternance',
      context: 'Digitaleo · 2024 — 2026',
      image: asset('projects/digitaleo-editor.jpg'),
    },
  ]
  return (
    <AbsoluteFill style={{ background: '#030303' }}>
      <Shake hits={hits} amount={12}>
        <Distort split={split}>
          <Sequence from={0} durationInFrames={120} name="Intro">
            <Intro />
          </Sequence>
          <Sequence from={120} durationInFrames={240} name="Gallery">
            <Gallery />
          </Sequence>
          {numbers.map((n, i) => (
            <Sequence
              key={n.label}
              from={360 + i * 60}
              durationInFrames={60}
              name={`Number ${i + 1}`}
            >
              <BigNumber {...n} />
            </Sequence>
          ))}
          <Sequence from={600} durationInFrames={180} name="Statements">
            <Statements />
          </Sequence>
          <Sequence from={780} durationInFrames={180} name="Portrait">
            <Portrait />
          </Sequence>
          <Sequence from={960} durationInFrames={180} name="Finale">
            <Finale />
          </Sequence>
          <Flash at={120} decay={20} color="#fff3dd" />
          <Flash at={360} decay={14} max={0.7} color="#fff3dd" />
          <Flash at={690} decay={16} max={0.6} color="#fff3dd" />
          <Flash at={960} decay={24} color="#fff3dd" />
        </Distort>
      </Shake>
      <Vignette strength={0.7} />
      <Grain opacity={0.1} />
      <Letterbox />
      {withAudio && <Audio src={staticFile('audio/Trailer.wav')} />}
    </AbsoluteFill>
  )
}
