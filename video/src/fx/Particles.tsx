import { noise3D } from '@remotion/noise'
import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  cancelRender,
  continueRender,
  delayRender,
  random,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion'

/** A particle target, in composition pixels, with an RGB colour. */
export type Pt = { x: number; y: number; r: number; g: number; b: number }

const hexToRgb = (hex: string): [number, number, number] => {
  const h = hex.replace('#', '')
  const n = parseInt(
    h.length === 3
      ? h
          .split('')
          .map((c) => c + c)
          .join('')
      : h,
    16
  )
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

export const scatter = (
  n: number,
  seed: string,
  box: { x: number; y: number; w: number; h: number },
  palette: string[]
): Pt[] =>
  Array.from({ length: n }, (_, i) => {
    const [r, g, b] = hexToRgb(
      palette[Math.floor(random(`${seed}-c-${i}`) * palette.length)]
    )
    return {
      x: box.x + random(`${seed}-x-${i}`) * box.w,
      y: box.y + random(`${seed}-y-${i}`) * box.h,
      r,
      g,
      b,
    }
  })

/** Points radiating out of a centre, for "explode into particles" beats. */
export const burst = (
  n: number,
  seed: string,
  cx: number,
  cy: number,
  radius: number,
  palette: string[]
): Pt[] =>
  Array.from({ length: n }, (_, i) => {
    const a = random(`${seed}-a-${i}`) * Math.PI * 2
    const d = radius * (0.35 + random(`${seed}-d-${i}`) ** 0.6 * 0.9)
    const [r, g, b] = hexToRgb(
      palette[Math.floor(random(`${seed}-c-${i}`) * palette.length)]
    )
    return { x: cx + Math.cos(a) * d, y: cy + Math.sin(a) * d, r, g, b }
  })

const sampleCanvas = (
  canvas: HTMLCanvasElement,
  offsetX: number,
  offsetY: number,
  step: number,
  keep: (r: number, g: number, b: number, a: number) => boolean,
  tint?: [number, number, number]
): Pt[] => {
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  if (!ctx) return []
  const { data, width, height } = ctx.getImageData(
    0,
    0,
    canvas.width,
    canvas.height
  )
  const out: Pt[] = []
  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      const i = (y * width + x) * 4
      const [r, g, b, a] = [data[i], data[i + 1], data[i + 2], data[i + 3]]
      if (!keep(r, g, b, a)) continue
      out.push({
        x: offsetX + x,
        y: offsetY + y,
        r: tint ? tint[0] : r,
        g: tint ? tint[1] : g,
        b: tint ? tint[2] : b,
      })
    }
  }
  return out
}

/**
 * Samples an image, centred on (x, y), into particle targets. Returns null
 * until the image is
 * decoded; the render is held with delayRender meanwhile.
 *
 * `keep` decides which pixels become particles (default: opaque ones), which
 * lets a cut-out portrait drop its background.
 */
export const useImagePoints = (
  src: string,
  opts: {
    x: number
    y: number
    width: number
    step?: number
    keep?: (r: number, g: number, b: number, a: number) => boolean
    colorize?: (r: number, g: number, b: number) => [number, number, number]
  }
): Pt[] | null => {
  const [pts, setPts] = useState<Pt[] | null>(null)
  const [handle] = useState(() => delayRender(`Sampling ${src}`))
  const { x, y, width, step = 6 } = opts
  const keepRef = useRef(opts.keep)
  const colorizeRef = useRef(opts.colorize)

  useEffect(() => {
    const img = new Image()
    img.onload = () => {
      const h = Math.round((img.height / img.width) * width)
      const c = document.createElement('canvas')
      c.width = width
      c.height = h
      c.getContext('2d')?.drawImage(img, 0, 0, width, h)
      const keep = keepRef.current ?? ((_r, _g, _b, a) => a > 128)
      const raw = sampleCanvas(c, x - width / 2, y - h / 2, step, keep)
      const colorize = colorizeRef.current
      setPts(
        colorize
          ? raw.map((p) => {
              const [r, g, b] = colorize(p.r, p.g, p.b)
              return { ...p, r, g, b }
            })
          : raw
      )
      continueRender(handle)
    }
    img.onerror = () => cancelRender(new Error(`Cannot load ${src}`))
    img.src = src
  }, [src, x, y, width, step, handle])

  return pts
}

/** Samples rendered text into particle targets, centred on (x, y). */
export const useTextPoints = (
  lines: string[],
  opts: {
    x: number
    y: number
    size: number
    font?: string
    weight?: number
    color?: string
    step?: number
    lineHeight?: number
    /** 'left' treats x as the left edge, for code blocks. */
    align?: 'center' | 'left'
  }
): Pt[] | null => {
  const [pts, setPts] = useState<Pt[] | null>(null)
  const [handle] = useState(() => delayRender(`Sampling "${lines[0]}"`))
  const {
    x,
    y,
    size,
    font = '"Inter Tight Variable"',
    weight = 800,
    color = '#ffffff',
    step = 5,
    lineHeight = 1.05,
    align = 'center',
  } = opts
  // Joined so callers can pass an inline array without re-sampling each render
  const key = lines.join('\n')

  useEffect(() => {
    const spec = `${weight} ${size}px ${font}`
    document.fonts
      .load(spec, key)
      .then(() => {
        const w = 1080
        const lh = size * lineHeight
        const h = Math.ceil(lh * lines.length + size * 0.4)
        const c = document.createElement('canvas')
        c.width = w
        c.height = h
        const ctx = c.getContext('2d')
        if (!ctx) return
        ctx.font = spec
        ctx.textAlign = align
        ctx.textBaseline = 'middle'
        ctx.fillStyle = '#fff'
        key.split('\n').forEach((line, i) => {
          ctx.fillText(
            line,
            align === 'left' ? 0 : w / 2,
            lh * (i + 0.5) + size * 0.2
          )
        })
        setPts(
          sampleCanvas(
            c,
            align === 'left' ? x : x - w / 2,
            y - h / 2,
            step,
            (_r, _g, _b, a) => a > 140,
            hexToRgb(color)
          )
        )
        continueRender(handle)
      })
      .catch((e) => cancelRender(e))
  }, [key, x, y, size, font, weight, color, step, lineHeight, align, handle])

  return pts
}

const resample = (pts: Pt[], n: number, seed: string): Pt[] => {
  if (pts.length === 0) return []
  // Shuffle deterministically so neighbouring particles don't travel as a
  // rigid block, then wrap around if the stage has fewer points than `n`.
  const order = pts
    .map((_, i) => ({ i, k: random(`${seed}-o-${i}`) }))
    .sort((a, b) => a.k - b.k)
    .map((o) => o.i)
  return Array.from({ length: n }, (_, i) => pts[order[i % order.length]])
}

const easeInOutCubic = (x: number) =>
  x < 0.5 ? 4 * x * x * x : 1 - (-2 * x + 2) ** 3 / 2

/**
 * Particles morphing through a list of shapes. `t` runs from 0 to
 * stages.length - 1; at integer values the cloud sits exactly on a stage,
 * in between each particle travels on its own delay with curl-like noise so
 * the transition swirls instead of sliding.
 */
export const ParticleMorph: React.FC<{
  stages: (Pt[] | null)[]
  t: number
  count: number
  seed?: string
  size?: number
  jitter?: number
  stagger?: number
  drift?: number
  opacity?: number
  additive?: boolean
}> = ({
  stages,
  t,
  count,
  seed = 'morph',
  size = 2.4,
  jitter = 140,
  stagger = 0.45,
  drift = 0,
  opacity = 1,
  additive = true,
}) => {
  const ref = useRef<HTMLCanvasElement>(null)
  const frame = useCurrentFrame()
  const { width, height } = useVideoConfig()
  const ready = stages.every(Boolean)

  const sampled = useMemo(
    () =>
      ready
        ? (stages as Pt[][]).map((s, k) => resample(s, count, `${seed}-${k}`))
        : null,
    [ready, stages, count, seed]
  )
  const delays = useMemo(
    () => Array.from({ length: count }, (_, i) => random(`${seed}-dl-${i}`)),
    [count, seed]
  )

  useLayoutEffect(() => {
    const ctx = ref.current?.getContext('2d')
    if (!ctx || !sampled) return
    ctx.clearRect(0, 0, width, height)
    ctx.globalCompositeOperation = additive ? 'lighter' : 'source-over'
    const last = sampled.length - 1
    const tt = Math.min(Math.max(t, 0), last)
    const k = Math.min(Math.floor(tt), Math.max(last - 1, 0))
    const f = last === 0 ? 0 : tt - k
    const A = sampled[k]
    const B = sampled[Math.min(k + 1, last)]
    for (let i = 0; i < count; i++) {
      const local = Math.min(
        Math.max((f - delays[i] * stagger) / (1 - stagger), 0),
        1
      )
      const e = easeInOutCubic(local)
      const swirl = Math.sin(Math.PI * e) * jitter
      const nx = noise3D(`${seed}nx`, i * 0.013, frame * 0.012, k)
      const ny = noise3D(`${seed}ny`, i * 0.013, frame * 0.012, k + 7)
      const d = drift
        ? noise3D(`${seed}dr`, i * 0.05, frame * 0.01, 3) * drift
        : 0
      const x = A[i].x + (B[i].x - A[i].x) * e + nx * swirl + d
      const y = A[i].y + (B[i].y - A[i].y) * e + ny * swirl + d * 0.6
      const r = A[i].r + (B[i].r - A[i].r) * e
      const g = A[i].g + (B[i].g - A[i].g) * e
      const b = A[i].b + (B[i].b - A[i].b) * e
      // Particles in flight are brighter and slightly bigger: reads as energy
      const s = size * (1 + Math.sin(Math.PI * e) * 0.8)
      ctx.globalAlpha = opacity * (0.55 + 0.45 * random(`${seed}-a-${i}`))
      ctx.fillStyle = `rgb(${r | 0},${g | 0},${b | 0})`
      ctx.fillRect(x - s / 2, y - s / 2, s, s)
    }
  }, [
    sampled,
    delays,
    t,
    frame,
    width,
    height,
    count,
    seed,
    size,
    jitter,
    stagger,
    drift,
    opacity,
    additive,
  ])

  return (
    <canvas
      ref={ref}
      width={width}
      height={height}
      style={{ position: 'absolute', inset: 0 }}
    />
  )
}

/**
 * Ambient floating specks with parallax depth: near ones are bigger,
 * blurrier (drawn as soft discs) and faster.
 */
export const Dust: React.FC<{
  count?: number
  color?: string
  seed?: string
  speed?: number
  opacity?: number
}> = ({
  count = 140,
  color = '#9fc8ff',
  seed = 'dust',
  speed = 1,
  opacity = 0.7,
}) => {
  const ref = useRef<HTMLCanvasElement>(null)
  const frame = useCurrentFrame()
  const { width, height } = useVideoConfig()
  const [cr, cg, cb] = hexToRgb(color)

  useLayoutEffect(() => {
    const ctx = ref.current?.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, width, height)
    ctx.globalCompositeOperation = 'lighter'
    for (let i = 0; i < count; i++) {
      const z = random(`${seed}-z-${i}`)
      const bx = random(`${seed}-x-${i}`) * width
      const by = random(`${seed}-y-${i}`) * height
      const vy = -(0.15 + z * 0.9) * speed
      const x =
        bx + noise3D(`${seed}w`, i * 0.1, frame * 0.004, 0) * 60 * (0.3 + z)
      const y = (((by + frame * vy) % height) + height) % height
      const r = 0.6 + z * z * 5
      const tw = 0.5 + 0.5 * Math.sin(frame * 0.08 + i)
      const a = opacity * (0.15 + 0.6 * (1 - z) * tw + 0.25 * z)
      const grad = ctx.createRadialGradient(x, y, 0, x, y, r * 2.2)
      grad.addColorStop(0, `rgba(${cr},${cg},${cb},${a})`)
      grad.addColorStop(1, `rgba(${cr},${cg},${cb},0)`)
      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.arc(x, y, r * 2.2, 0, Math.PI * 2)
      ctx.fill()
    }
  }, [frame, width, height, count, seed, speed, opacity, cr, cg, cb])

  return (
    <canvas
      ref={ref}
      width={width}
      height={height}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    />
  )
}
