import React, { useMemo } from 'react'
import {
  AbsoluteFill,
  Audio,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion'
import { asset, colors, fonts, person, projectImage, projects } from '../brand'
import { CueSheet, cueFrames } from '../cues'
import { Distort, Shake, glitchEnvelope } from '../fx/Distort'
import { NeuralNet } from '../fx/NeuralNet'
import { Flash, Grain, Vignette } from '../fx/Overlays'
import {
  Dust,
  ParticleMorph,
  burst,
  scatter,
  useImagePoints,
  useTextPoints,
} from '../fx/Particles'
import { ShaderBackground } from '../fx/Shader'
import {
  AGLogo,
  Chip,
  MacWindow,
  RevealText,
  clamp,
  easeIn,
  easeInOut,
  easeOut,
} from '../ui/Primitives'
import sheet from './CodeToReality.cues.json'

const cues = sheet as CueSheet
const CYAN_GRADIENT =
  'linear-gradient(120deg, #3ad6ff 0%, #2997ff 50%, #7b5cff 100%)'

// GitHub-dark palette: recognisable to developers at a glance
const syntax = {
  keyword: '#ff7b72',
  string: '#a5d6ff',
  type: '#ffa657',
  prop: '#79c0ff',
  fn: '#d2a8ff',
  plain: '#e6edf3',
  muted: '#8b949e',
}

const CODE = `import { Developer } from '@/career'

const antoine = new Developer({
  role: 'Fullstack × IA',
  stack: ['Vue', 'Nuxt', 'TypeScript', 'Python'],
  experience: 'Digitaleo · 2,5 ans',
  degree: 'MSc IA · Epitech Rennes',
  status: 'disponible',
})

antoine.build()`

const CODE_SIZE = 28
const CODE_LH = CODE_SIZE * 1.55
const EDITOR = { x: 60, y: 260, w: 960, h: 700 }
const CODE_X = EDITOR.x + 96
const CODE_Y = EDITOR.y + 44 + 34

type Token = { text: string; color: string; start: number }

const tokenize = (src: string): Token[] => {
  const re =
    /('[^'\n]*'?)|\b(import|from|const|new)\b|\b([A-Z][A-Za-z]+)\b|\b([a-z]+)(?=:)|\b([a-z]+)(?=\()|(\s+|.)/g
  const out: Token[] = []
  let m: RegExpExecArray | null
  while ((m = re.exec(src))) {
    const color = m[1]
      ? syntax.string
      : m[2]
        ? syntax.keyword
        : m[3]
          ? syntax.type
          : m[4]
            ? syntax.prop
            : m[5]
              ? syntax.fn
              : syntax.plain
    out.push({ text: m[0], color, start: m.index })
  }
  return out
}

const Highlighted: React.FC<{ code: string; visible: number }> = ({
  code,
  visible,
}) => {
  const tokens = useMemo(() => tokenize(code), [code])
  return (
    <>
      {tokens
        .filter((t) => t.start < visible)
        .map((t, i) => (
          <span key={i} style={{ color: t.color }}>
            {t.text.slice(0, visible - t.start)}
          </span>
        ))}
    </>
  )
}

const Caret: React.FC<{ on: boolean }> = ({ on }) => (
  <span
    style={{
      display: 'inline-block',
      width: '0.55em',
      height: '1.2em',
      verticalAlign: 'text-bottom',
      background: colors.cyan,
      opacity: on ? 1 : 0,
      boxShadow: `0 0 12px ${colors.cyan}`,
    }}
  />
)

/** Typed text: `cps` characters per second from `start`. */
const useTyped = (text: string, start: number, cps: number) => {
  const f = useCurrentFrame()
  const { fps } = useVideoConfig()
  const n = Math.max(
    0,
    Math.min(text.length, Math.floor(((f - start) / fps) * cps))
  )
  return { n, done: n >= text.length, blink: Math.floor(f / 15) % 2 === 0 }
}

const Check: React.FC<{ color?: string; size?: number }> = ({
  color = colors.green,
  size = 24,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
    <path
      d="M4 12.5l5 5L20 6.5"
      fill="none"
      stroke={color}
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const TerminalChrome: React.FC<{
  x: number
  y: number
  w: number
  h: number
  title?: string
  children: React.ReactNode
  style?: React.CSSProperties
}> = ({ x, y, w, h, title = 'antoine — zsh', children, style }) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      width: w,
      height: h,
      borderRadius: 18,
      overflow: 'hidden',
      background: 'rgba(22,24,30,0.94)',
      boxShadow:
        '0 40px 120px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.12), 0 0 80px rgba(58,214,255,0.12)',
      ...style,
    }}
  >
    <div
      style={{
        height: 44,
        display: 'flex',
        alignItems: 'center',
        gap: 9,
        padding: '0 18px',
        background: 'rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        position: 'relative',
      }}
    >
      {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
        <div
          key={c}
          style={{ width: 14, height: 14, borderRadius: 7, background: c }}
        />
      ))}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          textAlign: 'center',
          fontFamily: fonts.body,
          fontSize: 17,
          fontWeight: 600,
          color: '#8b949e',
        }}
      >
        {title}
      </div>
    </div>
    {children}
  </div>
)

const Headline: React.FC = () => {
  const f = useCurrentFrame()
  const second = f >= 300
  return (
    <div style={{ position: 'absolute', top: 70, width: '100%' }}>
      <RevealText text="Je transforme du code" start={2} size={70} />
      {second && (
        <RevealText
          text="en produits réels."
          start={300}
          size={70}
          gradient={CYAN_GRADIENT}
        />
      )}
    </div>
  )
}

const Editor: React.FC = () => {
  const f = useCurrentFrame()
  const { n, done, blink } = useTyped(CODE, 4, 62)
  const lines = CODE.split('\n')
  const run = interpolate(f, [160, 178], [0, 1], clamp)
  const gone = f >= 180
  const enter = interpolate(f, [0, 14], [0, 1], { ...clamp, easing: easeOut })
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        opacity: gone ? 0 : enter,
        transform: `translateY(${(1 - enter) * 40}px)`,
      }}
    >
      <TerminalChrome
        x={EDITOR.x}
        y={EDITOR.y}
        w={EDITOR.w}
        h={EDITOR.h}
        title="antoine.ts — career"
        style={{
          boxShadow: `0 40px 120px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.12), 0 0 ${80 + run * 120}px rgba(58,214,255,${0.12 + run * 0.4})`,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 44 + 34,
            left: 0,
            width: 70,
            textAlign: 'right',
            fontFamily: fonts.mono,
            fontSize: CODE_SIZE * 0.8,
            lineHeight: `${CODE_LH}px`,
            color: '#484f58',
          }}
        >
          {lines.map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>
      </TerminalChrome>
      <div
        style={{
          position: 'absolute',
          left: CODE_X,
          top: CODE_Y,
          fontFamily: fonts.mono,
          fontSize: CODE_SIZE,
          lineHeight: `${CODE_LH}px`,
          whiteSpace: 'pre',
          filter:
            run > 0
              ? `brightness(${1 + run * 1.5}) drop-shadow(0 0 ${run * 12}px ${colors.cyan})`
              : undefined,
        }}
      >
        <Highlighted code={CODE} visible={n} />
        {!run && <Caret on={!done || blink} />}
      </div>
      <div
        style={{
          position: 'absolute',
          left: EDITOR.x,
          top: EDITOR.y + EDITOR.h + 24,
          width: EDITOR.w,
          fontFamily: fonts.mono,
          fontSize: 24,
          color: syntax.muted,
          opacity: interpolate(f, [150, 160], [0, 1], clamp),
        }}
      >
        <span
          style={{
            display: 'inline-block',
            width: 0,
            height: 0,
            borderTop: '9px solid transparent',
            borderBottom: '9px solid transparent',
            borderLeft: `14px solid ${colors.green}`,
            marginRight: 12,
          }}
        />
        running antoine.build()…
      </div>
    </div>
  )
}

const GRID = [
  { x: 60, y: 330 },
  { x: 550, y: 330 },
  { x: 60, y: 760 },
  { x: 550, y: 760 },
]
const CELL_W = 470
const CELL_H = 294 + 32

const Materialize: React.FC<{
  start: number
  src: string
  title: string
  stack: string
  x: number
  y: number
}> = ({ start, src, title, stack, x, y }) => {
  const f = useCurrentFrame()
  const l = f - start
  if (l < 0) return null
  const outline = interpolate(l, [0, 10], [0, 1], { ...clamp, easing: easeOut })
  const skeleton = interpolate(l, [6, 12, 26, 30], [0, 1, 1, 0], clamp)
  const scan = interpolate(l, [10, 28], [0, 1], { ...clamp, easing: easeInOut })
  const label = interpolate(l, [22, 32], [0, 1], clamp)
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: CELL_W }}>
      <div style={{ position: 'relative', width: CELL_W, height: CELL_H }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            clipPath: `inset(0 0 ${(1 - scan) * 100}% 0)`,
          }}
        >
          <MacWindow
            width={CELL_W}
            height={CELL_H}
            src={src}
            radius={12}
            glow={colors.cyan}
          />
        </div>
        <div style={{ position: 'absolute', inset: 0, opacity: skeleton }}>
          {[0.12, 0.3, 0.46, 0.62].map((top, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: 24,
                top: `${top * 100}%`,
                width: `${[60, 85, 40, 70][i]}%`,
                height: 18,
                borderRadius: 9,
                background: 'rgba(58,214,255,0.18)',
              }}
            />
          ))}
        </div>
        <svg
          width={CELL_W}
          height={CELL_H}
          style={{ position: 'absolute', inset: 0, overflow: 'visible' }}
        >
          <rect
            x={1}
            y={1}
            width={CELL_W - 2}
            height={CELL_H - 2}
            rx={12}
            fill="none"
            stroke={colors.cyan}
            strokeWidth={2}
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1 - outline}
            opacity={1 - scan * 0.85}
          />
        </svg>
        {scan > 0 && scan < 1 && (
          <div
            style={{
              position: 'absolute',
              left: -10,
              right: -10,
              top: `${scan * 100}%`,
              height: 3,
              background: '#fff',
              boxShadow: `0 0 20px 6px ${colors.cyan}`,
            }}
          />
        )}
      </div>
      <div
        style={{
          marginTop: 14,
          fontFamily: fonts.mono,
          fontSize: 20,
          color: syntax.muted,
          opacity: label,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        <span style={{ color: colors.white, fontWeight: 700 }}>{title}</span>
        {'  // '}
        {stack}
      </div>
    </div>
  )
}

const Build: React.FC = () => {
  const f = useCurrentFrame()
  const lines = CODE.split('\n')
  const code = useTextPoints(lines, {
    x: CODE_X,
    y: CODE_Y + (CODE_LH * lines.length) / 2,
    size: CODE_SIZE,
    font: '"JetBrains Mono Variable"',
    weight: 500,
    color: '#79c0ff',
    step: 3,
    lineHeight: 1.55,
    align: 'left',
  })
  const mosaic = projects[0]
  const imgW = 900
  const imgH = Math.round(imgW / 1.455)
  const winTop = 330
  const shot = useImagePoints(projectImage(mosaic), {
    x: 540,
    y: winTop + 38 + imgH / 2,
    width: imgW,
    step: 6,
  })
  const boom = useMemo(
    () =>
      burst(9000, 'ctr-burst', 540, 660, 430, [
        '#3ad6ff',
        '#2997ff',
        '#ffffff',
        '#7b5cff',
      ]),
    []
  )
  // Local frame 0 is global 180
  const t =
    f < 60
      ? interpolate(f, [0, 56], [0, 1], { ...clamp, easing: easeOut })
      : interpolate(f, [62, 118], [1, 2], clamp)
  const solid = interpolate(f, [112, 130], [0, 1], clamp)
  // Mosaic window shrinks into the top-left grid cell as the others build
  const toGrid = interpolate(f, [140, 166], [0, 1], {
    ...clamp,
    easing: easeInOut,
  })
  const scale = 1 - toGrid * (1 - CELL_W / imgW)
  const wx = interpolate(toGrid, [0, 1], [90, GRID[0].x])
  const wy = interpolate(toGrid, [0, 1], [winTop, GRID[0].y])
  return (
    <AbsoluteFill>
      <ParticleMorph
        stages={[code, boom, shot]}
        t={t}
        count={9000}
        size={t < 1.9 ? 3 : 2.2}
        jitter={t < 1 ? 60 : 160}
        stagger={0.5}
        opacity={1 - solid}
        seed="ctr-build"
      />
      <div
        style={{
          position: 'absolute',
          left: wx,
          top: wy,
          opacity: solid,
          transform: `scale(${scale})`,
          transformOrigin: '0 0',
          filter: `brightness(${1 + (1 - solid) * 1.5})`,
        }}
      >
        <MacWindow
          width={imgW}
          height={imgH + 38}
          src={projectImage(mosaic)}
          title="Mosaic"
          glow={colors.cyan}
        />
      </div>
      <div
        style={{
          position: 'absolute',
          left: GRID[0].x,
          top: GRID[0].y + CELL_H + 14,
          width: CELL_W,
          fontFamily: fonts.mono,
          fontSize: 20,
          color: syntax.muted,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          opacity: interpolate(f, [166, 176], [0, 1], clamp),
        }}
      >
        <span style={{ color: colors.white, fontWeight: 700 }}>Mosaic</span>
        {'  // '}
        {mosaic.stack}
      </div>
      {[5, 2, 4].map((pi, k) => (
        <Materialize
          key={pi}
          start={160 + k * 20}
          src={projectImage(projects[pi])}
          title={projects[pi].name}
          stack={projects[pi].stack}
          x={GRID[k + 1].x}
          y={GRID[k + 1].y}
        />
      ))}
    </AbsoluteFill>
  )
}

const AIScene: React.FC = () => {
  const f = useCurrentFrame()
  const line = 'model.fit(radiographies, epochs=30)'
  const { n, done, blink } = useTyped(line, 4, 48)
  const train = interpolate(f, [36, 100], [0, 1], { ...clamp, easing: easeOut })
  const epoch = Math.max(1, Math.round(train * 30))
  const acc = 0.61 + (0.912 - 0.61) * train
  const slam = interpolate(f, [120, 130], [0, 1], { ...clamp, easing: easeOut })
  const win = interpolate(f, [132, 160], [0, 1], { ...clamp, easing: easeOut })
  return (
    <AbsoluteFill style={{ background: '#03060c' }}>
      <ShaderBackground
        preset="aurora"
        colorA="#04202a"
        colorB="#1fb8a6"
        intensity={0.55}
        speed={1.4}
      />
      <TerminalChrome
        x={90}
        y={110}
        w={900}
        h={210}
        title="zoidberg.py — training"
      >
        <div
          style={{
            padding: '22px 28px',
            fontFamily: fonts.mono,
            fontSize: 26,
            lineHeight: 1.6,
            whiteSpace: 'pre',
          }}
        >
          <div style={{ color: syntax.plain }}>
            <span style={{ color: syntax.fn }}>
              {line.slice(0, Math.min(n, 9))}
            </span>
            {line.slice(9, Math.max(9, n))}
            {!done && <Caret on={blink || !done} />}
          </div>
          {f > 36 && (
            <div style={{ color: syntax.muted }}>
              Epoch {String(epoch).padStart(2, ' ')}/30 · accuracy{' '}
              <span style={{ color: colors.teal }}>{acc.toFixed(3)}</span>
            </div>
          )}
          {f > 36 && (
            <div
              style={{
                marginTop: 8,
                height: 10,
                borderRadius: 5,
                background: 'rgba(255,255,255,0.1)',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${train * 100}%`,
                  height: '100%',
                  background: `linear-gradient(90deg, ${colors.teal}, ${colors.cyan})`,
                  boxShadow: `0 0 14px ${colors.cyan}`,
                }}
              />
            </div>
          )}
        </div>
      </TerminalChrome>
      <NeuralNet
        layers={[5, 8, 8, 6, 2]}
        x={110}
        y={380}
        width={860}
        height={250}
        reveal={interpolate(f, [10, 90], [0, 1], clamp)}
        colorA={colors.cyan}
        colorB={colors.teal}
        seed="ctr-nn"
      />
      <div
        style={{
          position: 'absolute',
          top: 660,
          width: '100%',
          textAlign: 'center',
          opacity: slam,
          transform: `scale(${1.3 - slam * 0.3})`,
          filter: `blur(${(1 - slam) * 14}px)`,
        }}
      >
        <div
          style={{
            fontFamily: fonts.display,
            fontWeight: 800,
            fontSize: 170,
            letterSpacing: '-0.04em',
            lineHeight: 1,
            backgroundImage: `linear-gradient(120deg, #bdf3ff, ${colors.teal})`,
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
        >
          91,2 %
        </div>
        <div
          style={{
            marginTop: 10,
            fontFamily: fonts.body,
            fontWeight: 600,
            fontSize: 32,
            color: '#d1f7f2',
          }}
        >
          d&apos;exactitude — détection de pneumonie par CNN
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 540 - 330,
          top: 930,
          opacity: win,
          transform: `translateY(${(1 - win) * 200}px) perspective(1400px) rotateX(${10 - win * 4}deg)`,
        }}
      >
        <MacWindow
          width={660}
          height={380}
          src={projectImage(projects[1])}
          title="Zoidberg 2.0"
          glow={colors.teal}
        />
      </div>
    </AbsoluteFill>
  )
}

const LOG = [
  'BTS SNIR — Lycée Saint Joseph, Hasparren · 2021-2023',
  'Master of Science IA — Epitech Rennes · 2023-2026',
  'Alternance Digitaleo — Full Stack · 2024-2026',
  "37 000 utilisateurs actifs · 600+ réseaux d'enseignes",
  "CNN pneumonie · 91,2 % d'exactitude",
  '12 projets en production, tous en ligne',
]

const TerminalScene: React.FC = () => {
  const f = useCurrentFrame()
  const cmd = 'npm run career'
  const { n, done } = useTyped(cmd, 4, 30)
  const bar = interpolate(f, [112, 138], [0, 1], {
    ...clamp,
    easing: easeInOut,
  })
  const ok = interpolate(f, [140, 148], [0, 1], clamp)
  const enter = interpolate(f, [0, 12], [0, 1], { ...clamp, easing: easeOut })
  const out = interpolate(f, [168, 180], [0, 1], { ...clamp, easing: easeIn })
  const prompt = (
    <>
      <span style={{ color: '#30d158' }}>antoine@macbook</span>
      <span style={{ color: '#8b949e' }}> ~ % </span>
    </>
  )
  return (
    <AbsoluteFill style={{ background: colors.night }}>
      <ShaderBackground
        preset="grid"
        colorA="#2997ff"
        colorB="#3ad6ff"
        intensity={0.45}
      />
      <TerminalChrome
        x={50}
        y={210}
        w={980}
        h={880}
        style={{
          opacity: enter * (1 - out),
          transform: `translateY(${(1 - enter) * 60}px) scale(${1 - out * 0.08})`,
        }}
      >
        <div
          style={{
            padding: '30px 34px',
            fontFamily: fonts.mono,
            fontSize: 25,
            lineHeight: 1.75,
            color: syntax.plain,
            whiteSpace: 'pre',
          }}
        >
          <div>
            {prompt}
            {cmd.slice(0, n)}
            {!done && <Caret on />}
          </div>
          {f > 24 && (
            <div style={{ color: syntax.muted }}>
              {'> career@2026.10.0 build\n> vite build --mode production'}
            </div>
          )}
          <div style={{ height: 16 }} />
          {LOG.map((l, i) => {
            const at = 32 + i * 15
            if (f < at) return null
            const s = interpolate(f, [at, at + 6], [0, 1], clamp)
            return (
              <div
                key={l}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  opacity: s,
                  transform: `translateX(${(1 - s) * -20}px)`,
                }}
              >
                <Check />
                <span>{l}</span>
              </div>
            )
          })}
          {f > 108 && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                marginTop: 18,
              }}
            >
              <div
                style={{
                  flex: 1,
                  height: 16,
                  borderRadius: 8,
                  background: 'rgba(255,255,255,0.08)',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${bar * 100}%`,
                    height: '100%',
                    background: `linear-gradient(90deg, ${colors.blue}, ${colors.cyan})`,
                    boxShadow: `0 0 16px ${colors.cyan}`,
                  }}
                />
              </div>
              <span style={{ color: syntax.muted }}>
                {Math.round(bar * 100)} %
              </span>
            </div>
          )}
          {f > 140 && (
            <div
              style={{
                marginTop: 26,
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                fontWeight: 700,
                fontSize: 30,
                color: colors.green,
                opacity: ok,
                textShadow: `0 0 ${ok * 18}px ${colors.green}`,
              }}
            >
              <Check size={30} />
              build réussi — prêt pour la production
            </div>
          )}
        </div>
      </TerminalChrome>
    </AbsoluteFill>
  )
}

const luminancePalette = (
  r: number,
  g: number,
  b: number
): [number, number, number] => {
  const l = Math.pow((0.3 * r + 0.59 * g + 0.11 * b) / 255, 0.8)
  // Deep blue shadows to icy highlights: the black hoodie stays readable
  return [23 + (200 - 23) * l, 71 + (247 - 71) * l, 255]
}

const Face: React.FC = () => {
  const f = useCurrentFrame()
  const face = useImagePoints(asset('profile.png'), {
    x: 540,
    y: 640,
    width: 1250,
    step: 6,
    colorize: luminancePalette,
  })
  const name = useTextPoints(['ANTOINE', 'GOURGUE'], {
    x: 540,
    y: 600,
    size: 190,
    color: '#c8f7ff',
    step: 5,
    lineHeight: 1.0,
  })
  const cloud = useMemo(
    () =>
      scatter(8000, 'ctr-face', { x: 0, y: 0, w: 1080, h: 1350 }, [
        '#2997ff',
        '#3ad6ff',
        '#7b5cff',
      ]),
    []
  )
  const t =
    f < 90
      ? interpolate(f, [0, 70], [0, 1], { ...clamp, easing: easeOut })
      : interpolate(f, [96, 146], [1, 2], clamp)
  const sub = interpolate(f, [146, 162], [0, 1], { ...clamp, easing: easeOut })
  return (
    <AbsoluteFill style={{ background: '#02040a' }}>
      <ShaderBackground
        preset="grid"
        colorA="#2997ff"
        colorB="#7b5cff"
        intensity={0.3}
      />
      <ParticleMorph
        stages={[cloud, face, name]}
        t={t}
        count={8000}
        size={3}
        jitter={200}
        seed="ctr-face"
      />
      <div
        style={{
          position: 'absolute',
          top: 860,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          opacity: sub,
          transform: `translateY(${(1 - sub) * 20}px)`,
        }}
      >
        <Chip
          color={colors.cyan}
          style={{ fontSize: 36, padding: '14px 30px' }}
        >
          {person.role}
        </Chip>
      </div>
    </AbsoluteFill>
  )
}

const Deploy: React.FC = () => {
  const f = useCurrentFrame()
  const cmd = 'deploy antoine --to=votre-equipe'
  const { n, done } = useTyped(cmd, 4, 40)
  const bar = interpolate(f, [32, 58], [0, 1], { ...clamp, easing: easeInOut })
  const card = (d: number) => ({
    opacity: interpolate(f, [d, d + 14], [0, 1], clamp),
    transform: `translateY(${interpolate(f, [d, d + 22], [26, 0], { ...clamp, easing: easeOut })}px)`,
  })
  return (
    <AbsoluteFill style={{ background: colors.night }}>
      <ShaderBackground
        preset="grid"
        colorA="#2997ff"
        colorB="#3ad6ff"
        intensity={0.5}
      />
      <Dust count={70} opacity={0.4} />
      <TerminalChrome x={60} y={90} w={960} h={290}>
        <div
          style={{
            padding: '24px 30px',
            fontFamily: fonts.mono,
            fontSize: 26,
            lineHeight: 1.75,
            color: syntax.plain,
            whiteSpace: 'pre',
          }}
        >
          <div>
            <span style={{ color: '#30d158' }}>antoine@macbook</span>
            <span style={{ color: '#8b949e' }}> ~ % </span>
            {cmd.slice(0, n)}
            {!done && <Caret on />}
          </div>
          {f > 30 && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                color: syntax.muted,
              }}
            >
              Déploiement
              <div
                style={{
                  flex: 1,
                  height: 14,
                  borderRadius: 7,
                  background: 'rgba(255,255,255,0.08)',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${bar * 100}%`,
                    height: '100%',
                    background: `linear-gradient(90deg, ${colors.blue}, ${colors.cyan})`,
                  }}
                />
              </div>
              {Math.round(bar * 100)} %
            </div>
          )}
          {f > 60 && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                color: colors.green,
                fontWeight: 700,
                fontSize: 30,
              }}
            >
              <Check size={30} /> Prêt à déployer dans votre équipe.
            </div>
          )}
        </div>
      </TerminalChrome>
      <div
        style={{
          position: 'absolute',
          top: 470,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <div style={card(62)}>
          <AGLogo size={150} />
        </div>
        <div
          style={{
            ...card(68),
            marginTop: 34,
            fontFamily: fonts.display,
            fontWeight: 800,
            fontSize: 104,
            letterSpacing: '-0.035em',
            color: colors.white,
            lineHeight: 1,
          }}
        >
          {person.firstName} {person.lastName}
        </div>
        <div
          style={{
            ...card(74),
            marginTop: 16,
            fontFamily: fonts.display,
            fontWeight: 700,
            fontSize: 54,
            backgroundImage: CYAN_GRADIENT,
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
        >
          {person.role}
        </div>
        <div
          style={{
            ...card(82),
            marginTop: 40,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <Chip
            color={colors.green}
            style={{ fontSize: 34, padding: '14px 28px' }}
          >
            {person.availability}
          </Chip>
          <div
            style={{
              fontFamily: fonts.body,
              fontSize: 30,
              fontWeight: 500,
              color: '#a1a1a6',
            }}
          >
            {person.mobility}
          </div>
        </div>
        <div
          style={{
            ...card(92),
            marginTop: 50,
            padding: '24px 60px',
            borderRadius: 999,
            border: `2px solid ${colors.cyan}`,
            background: 'rgba(58,214,255,0.1)',
            fontFamily: fonts.mono,
            fontWeight: 700,
            fontSize: 40,
            color: colors.white,
            boxShadow: `0 0 50px rgba(58,214,255,0.35)`,
          }}
        >
          {person.url}
        </div>
      </div>
    </AbsoluteFill>
  )
}

export const CodeToReality: React.FC<{ withAudio?: boolean }> = ({
  withAudio = true,
}) => {
  const frame = useCurrentFrame()
  const g = glitchEnvelope(frame, cueFrames(cues, 'glitch'), 9)
  const impacts = cueFrames(cues, 'impact', 'hit')
  return (
    <AbsoluteFill style={{ background: colors.night }}>
      <Shake hits={impacts} amount={12}>
        <Distort displace={g * 90} split={g * 18} seed={7}>
          <Sequence from={0} durationInFrames={420} name="Code + build">
            <AbsoluteFill style={{ background: colors.night }}>
              <ShaderBackground
                preset="grid"
                colorA="#2997ff"
                colorB="#3ad6ff"
                intensity={0.35}
              />
              <Headline />
              <Editor />
              <Sequence from={180} name="Particles">
                <Build />
              </Sequence>
            </AbsoluteFill>
          </Sequence>
          <Sequence from={420} durationInFrames={180} name="AI">
            <AIScene />
          </Sequence>
          <Sequence from={600} durationInFrames={180} name="Terminal">
            <TerminalScene />
          </Sequence>
          <Sequence from={780} durationInFrames={180} name="Face">
            <Face />
          </Sequence>
          <Sequence from={960} durationInFrames={180} name="Deploy">
            <Deploy />
          </Sequence>
          <Flash at={180} decay={14} color="#bdf3ff" />
          <Flash at={420} decay={12} max={0.6} color="#bdf3ff" />
          <Flash at={600} decay={10} max={0.5} />
          <Flash at={1020} decay={18} color="#bdf3ff" />
        </Distort>
      </Shake>
      <Vignette strength={0.55} />
      <Grain opacity={0.06} />
      {withAudio && <Audio src={staticFile('audio/CodeToReality.wav')} />}
    </AbsoluteFill>
  )
}
