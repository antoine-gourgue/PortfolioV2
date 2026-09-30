import React from 'react'
import { Img, interpolate, random, useCurrentFrame } from 'remotion'
import { fonts } from '../brand'
import { AGLogo, AG_PATH, clamp, easeInOut, easeOut } from '../ui/Primitives'

export const stage = {
  white: '#f5f5f7',
  grey: '#86868b',
  dim: '#2c2c2e',
}

const SILVER = 'linear-gradient(180deg, #ffffff 0%, #d9d9de 45%, #8e8e93 100%)'

/**
 * Silver type with a specular highlight travelling across it: the light
 * sweep Apple puts on every hero word.
 */
export const SilverText: React.FC<{
  children: React.ReactNode
  size: number
  sweepAt?: number
  sweepDur?: number
  weight?: number
  tracking?: number
  style?: React.CSSProperties
}> = ({
  children,
  size,
  sweepAt = 0,
  sweepDur = 34,
  weight = 700,
  tracking = -0.045,
  style,
}) => {
  const f = useCurrentFrame()
  const p = interpolate(f, [sweepAt, sweepAt + sweepDur], [-40, 140], clamp)
  return (
    <div
      style={{
        fontFamily: fonts.display,
        fontSize: size,
        fontWeight: weight,
        letterSpacing: `${tracking}em`,
        lineHeight: 1.02,
        backgroundImage: `linear-gradient(100deg, transparent ${p - 14}%, rgba(255,255,255,0.95) ${p}%, transparent ${p + 14}%), ${SILVER}`,
        WebkitBackgroundClip: 'text',
        color: 'transparent',
        paddingBottom: size * 0.06,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

/** Letters rising and sharpening one after another. */
export const Letters: React.FC<{
  text: string
  at: number
  size: number
  stagger?: number
  color?: string
  weight?: number
  silver?: boolean
  style?: React.CSSProperties
}> = ({
  text,
  at,
  size,
  stagger = 1.6,
  color = stage.white,
  weight = 700,
  silver,
  style,
}) => {
  const f = useCurrentFrame()
  return (
    <div
      style={{
        fontFamily: fonts.display,
        fontSize: size,
        fontWeight: weight,
        letterSpacing: '-0.04em',
        lineHeight: 1.05,
        whiteSpace: 'pre',
        textAlign: 'center',
        ...style,
      }}
    >
      {text.split('').map((c, i) => {
        const t = interpolate(
          f,
          [at + i * stagger, at + i * stagger + 14],
          [0, 1],
          {
            ...clamp,
            easing: easeOut,
          }
        )
        return (
          <span
            key={i}
            style={{
              display: 'inline-block',
              opacity: t,
              transform: `translateY(${(1 - t) * 0.5}em) scale(${1.2 - t * 0.2})`,
              filter: `blur(${(1 - t) * 10}px)`,
              ...(silver
                ? {
                    backgroundImage: SILVER,
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                  }
                : { color }),
            }}
          >
            {c}
          </span>
        )
      })}
    </div>
  )
}

/**
 * One word per beat, each cutting the previous one: the rhythm of Apple's
 * launch films ("Pro. Beyond.").
 */
export const BeatWords: React.FC<{
  words: { text: string; at: number; silver?: boolean }[]
  until: number
  size: number
}> = ({ words, until, size }) => {
  const f = useCurrentFrame()
  const current = [...words].reverse().find((w) => f >= w.at)
  if (!current || f >= until) return null
  const t = interpolate(f, [current.at, current.at + 8], [0, 1], {
    ...clamp,
    easing: easeOut,
  })
  return (
    <div
      style={{
        transform: `scale(${1.18 - t * 0.18})`,
        filter: `blur(${(1 - t) * 14}px)`,
        opacity: t,
      }}
    >
      {current.silver ? (
        <SilverText size={size} sweepAt={current.at + 4}>
          {current.text}
        </SilverText>
      ) : (
        <div
          style={{
            fontFamily: fonts.display,
            fontSize: size,
            fontWeight: 700,
            letterSpacing: '-0.045em',
            color: stage.white,
            lineHeight: 1.02,
          }}
        >
          {current.text}
        </div>
      )}
    </div>
  )
}

/**
 * The AG monogram drawn by a travelling point of light, then filled in
 * silver: the logo reveal of an Apple event opener.
 */
export const LogoTrace: React.FC<{
  at: number
  size: number
  fillAt: number
}> = ({ at, size, fillAt }) => {
  const f = useCurrentFrame()
  const draw = interpolate(f, [at, fillAt], [0, 1], {
    ...clamp,
    easing: easeInOut,
  })
  const fill = interpolate(f, [fillAt, fillAt + 16], [0, 1], clamp)
  const sweep = interpolate(f, [fillAt + 6, fillAt + 40], [-40, 140], clamp)
  const head = 0.05
  return (
    <div style={{ position: 'relative', width: size, height: (size * 3) / 4 }}>
      <svg
        viewBox="0 0 400 300"
        width={size}
        height={(size * 3) / 4}
        style={{ position: 'absolute', overflow: 'visible' }}
      >
        <defs>
          <linearGradient id="lt-silver" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#8e8e93" />
          </linearGradient>
          <linearGradient id="lt-sweep" x1="0" x2="1" y1="0" y2="0.3">
            <stop
              offset={`${(sweep - 14) / 100}`}
              stopColor="#fff"
              stopOpacity={0}
            />
            <stop offset={`${sweep / 100}`} stopColor="#fff" stopOpacity={1} />
            <stop
              offset={`${(sweep + 14) / 100}`}
              stopColor="#fff"
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
        <g transform="translate(0,300) scale(0.1,-0.1)">
          <path
            d={AG_PATH}
            fill="none"
            stroke="#8e8e93"
            strokeWidth={14}
            pathLength={1}
            strokeDasharray={`${draw} 1`}
            opacity={1 - fill}
          />
          {draw > 0 && draw < 1 && (
            <path
              d={AG_PATH}
              fill="none"
              stroke="#fff"
              strokeWidth={34}
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray={`${head} 1`}
              strokeDashoffset={-(draw - head)}
              style={{
                filter:
                  'drop-shadow(0 0 12px #fff) drop-shadow(0 0 30px #9fc8ff)',
              }}
            />
          )}
          <path d={AG_PATH} fill="url(#lt-silver)" opacity={fill} />
          <path d={AG_PATH} fill="url(#lt-sweep)" opacity={fill} />
        </g>
      </svg>
    </div>
  )
}

/**
 * MacBook Pro in real CSS 3D: aluminium deck with keyboard and trackpad,
 * a lid hinged on the back edge (screen in front, logo on the back), and a
 * soft stage light under it. The parent sets the orbit.
 */
export const MacBook3D: React.FC<{
  width: number
  lid: number
  screen: React.ReactNode
  sheen?: number
}> = ({ width: W, lid, screen, sheen = 0 }) => {
  const H = W * 0.64
  const D = W * 0.68
  const T = W * 0.018
  const bezel = W * 0.017
  const face: React.CSSProperties = {
    position: 'absolute',
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
  }
  return (
    <div
      style={{
        position: 'relative',
        width: W,
        height: 0,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Stage light pooling under the machine */}
      <div
        style={{
          position: 'absolute',
          left: -W * 0.4,
          top: 0,
          width: W * 1.8,
          height: D * 1.8,
          transformOrigin: 'top center',
          transform: `translateY(${T}px) rotateX(90deg) translateY(${-D * 0.4}px)`,
          background:
            'radial-gradient(ellipse 50% 40% at 50% 45%, rgba(255,255,255,0.10), transparent 70%)',
        }}
      />
      {/* Deck */}
      <div
        style={{
          ...face,
          left: 0,
          top: 0,
          width: W,
          height: D,
          transformOrigin: 'top center',
          transform: 'rotateX(90deg)',
          borderRadius: W * 0.02,
          background:
            'linear-gradient(180deg, #b9b9be 0%, #d6d6db 60%, #c4c4c9 100%)',
          backfaceVisibility: 'visible',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: W * 0.08,
            right: W * 0.08,
            top: D * 0.08,
            height: D * 0.42,
            borderRadius: W * 0.01,
            background: '#1c1c1e',
            backgroundImage:
              'repeating-linear-gradient(90deg, transparent 0, transparent 6.2%, #3a3a3c 6.2%, #3a3a3c 6.6%), repeating-linear-gradient(0deg, transparent 0, transparent 16%, #3a3a3c 16%, #3a3a3c 17.5%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: W * 0.3,
            right: W * 0.3,
            top: D * 0.56,
            height: D * 0.36,
            borderRadius: W * 0.012,
            background: 'linear-gradient(180deg, #cfcfd4, #bcbcc1)',
            boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.08)',
          }}
        />
      </div>
      {/* Front edge of the deck */}
      <div
        style={{
          ...face,
          left: 0,
          top: 0,
          width: W,
          height: T,
          transform: `translateZ(${D}px)`,
          background: 'linear-gradient(180deg, #d1d1d6, #8e8e93)',
          borderRadius: `0 0 ${T}px ${T}px`,
          backfaceVisibility: 'visible',
        }}
      />
      {/* Lid, hinged on the back edge */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: -H,
          width: W,
          height: H,
          transformOrigin: 'bottom center',
          transform: `rotateX(${lid - 90}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        <div
          style={{
            ...face,
            inset: 0,
            borderRadius: `${W * 0.028}px ${W * 0.028}px ${W * 0.006}px ${W * 0.006}px`,
            background: '#0b0b0c',
            padding: bezel,
            boxSizing: 'border-box',
            boxShadow: '0 0 0 1.5px #48484a',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              overflow: 'hidden',
              borderRadius: W * 0.008,
              background: '#000',
            }}
          >
            {screen}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: `linear-gradient(115deg, transparent ${sheen * 100 - 30}%, rgba(255,255,255,0.16) ${sheen * 100}%, transparent ${sheen * 100 + 20}%)`,
              }}
            />
          </div>
        </div>
        <div
          style={{
            ...face,
            inset: 0,
            transform: 'rotateY(180deg)',
            borderRadius: `${W * 0.028}px ${W * 0.028}px ${W * 0.006}px ${W * 0.006}px`,
            background: `linear-gradient(${120 + sheen * 60}deg, #9a9aa0 0%, #d8d8dd 45%, #a5a5ab 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <AGLogo size={W * 0.12} color="#6e6e73" />
        </div>
      </div>
    </div>
  )
}

// Natural titanium, lit by a key light at the front upper left
const TITANIUM = [182, 177, 168]
const metal = (k: number) => {
  const m = Math.max(0.28, Math.min(1.32, k))
  return `rgb(${TITANIUM.map((c) => Math.round(Math.min(255, c * m))).join(',')})`
}

/**
 * iPhone in natural titanium, built as a real volume: the frame is a stack
 * of rounded slices (so the edge stays solid and rounded at any angle),
 * glass front with the live screen, frosted back with a raised camera
 * plateau, and side buttons. `angle` is the rotateY the parent applies,
 * used to light the flanks and slide the reflections.
 */
export const IPhone3D: React.FC<{
  width: number
  screen: React.ReactNode
  angle?: number
  screenOn?: number
}> = ({ width: W, screen, angle = 0, screenOn = 1 }) => {
  const H = W * 2.07
  const R = W * 0.17
  const T = W * 0.105
  const N = 12
  const th = (angle * Math.PI) / 180
  const lit = (d: number) => 0.5 + 0.8 * Math.max(0, d)
  const leftK = lit(0.5 * Math.cos(th) + 0.8 * Math.sin(th))
  const rightK = lit(-0.5 * Math.cos(th) - 0.8 * Math.sin(th))
  const glint = 50 + ((((angle % 360) + 540) % 360) - 180) * 0.9
  const rim = W * 0.014
  const bezel = W * 0.04
  const face: React.CSSProperties = {
    position: 'absolute',
    left: 0,
    top: 0,
    width: W,
    height: H,
    borderRadius: R,
    overflow: 'hidden',
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
  }
  const P = W * 0.46
  const lens = (x: number, y: number, d: number, key: string) => (
    <div
      key={key}
      style={{
        position: 'absolute',
        left: x * P - d / 2,
        top: y * P - d / 2,
        width: d,
        height: d,
        borderRadius: '50%',
        background:
          'radial-gradient(circle, #121214 0 50%, #54514c 51% 60%, #1c1b1a 61% 68%, #9a968e 69% 100%)',
        boxShadow: '0 3px 6px rgba(0,0,0,0.45)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: '26%',
          borderRadius: '50%',
          background:
            'radial-gradient(circle at 36% 34%, rgba(150,170,255,0.75) 0 7%, rgba(70,40,120,0.65) 18%, #06060a 46%)',
        }}
      />
    </div>
  )
  const button = (side: -1 | 1, top: number, len: number) => (
    <div
      key={`${side}-${top}`}
      style={{
        position: 'absolute',
        left: side < 0 ? -1.5 - T * 0.25 : W + 1.5 - T * 0.25,
        top: H * top,
        width: T * 0.5,
        height: H * len,
        borderRadius: T * 0.25,
        background: metal((side < 0 ? leftK : rightK) * 0.95),
        transform: `rotateY(${side * 90}deg)`,
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
      }}
    />
  )
  return (
    <div
      style={{
        position: 'relative',
        width: W,
        height: H,
        transformStyle: 'preserve-3d',
      }}
    >
      {Array.from({ length: N }, (_, i) => {
        const t = (i / (N - 1)) * 2 - 1
        // Rounded profile: outer slices step inwards like a radiused edge
        const inset = (1 - Math.sqrt(1 - t * t)) * T * 0.28
        const k = 1 - Math.abs(t) * 0.22
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: inset,
              top: inset,
              width: W - inset * 2,
              height: H - inset * 2,
              borderRadius: R - inset,
              transform: `translateZ(${(t * T) / 2}px)`,
              background: `linear-gradient(180deg, rgba(255,255,255,0.12), rgba(0,0,0,0.18)), linear-gradient(90deg, ${metal(leftK * k)}, ${metal(0.95 * k)} 50%, ${metal(rightK * k)})`,
            }}
          />
        )
      })}
      {button(-1, 0.19, 0.045)}
      {button(-1, 0.27, 0.075)}
      {button(-1, 0.37, 0.075)}
      {button(1, 0.29, 0.11)}
      {/* The glass sits just inside the frame so a titanium rim shows */}
      <div
        style={{
          ...face,
          left: rim,
          top: rim,
          width: W - rim * 2,
          height: H - rim * 2,
          borderRadius: R - rim,
          transform: `translateZ(${T / 2 + 0.6}px)`,
          background: '#050506',
          boxShadow: `inset 0 0 0 ${W * 0.004}px #2c2c2e`,
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: bezel,
            top: bezel,
            right: bezel,
            bottom: bezel,
            borderRadius: R - bezel,
            overflow: 'hidden',
            background: '#000',
          }}
        >
          {screen}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: '#000',
              opacity: 1 - screenOn,
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: W * 0.03,
              left: '50%',
              width: W * 0.3,
              height: W * 0.085,
              marginLeft: -W * 0.15,
              borderRadius: W,
              background: '#000',
            }}
          />
        </div>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(115deg, transparent ${glint - 22}%, rgba(255,255,255,0.13) ${glint}%, transparent ${glint + 22}%)`,
          }}
        />
      </div>
      <div
        style={{
          ...face,
          transform: `rotateY(180deg) translateZ(${T / 2 + 0.6}px)`,
          background:
            'linear-gradient(160deg, #d9d5cd 0%, #c3beb4 45%, #aea99f 100%)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(115deg, transparent ${100 - glint - 25}%, rgba(255,255,255,0.35) ${100 - glint}%, transparent ${100 - glint + 25}%)`,
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: W * 0.05,
            top: W * 0.05,
            width: P,
            height: P,
            borderRadius: W * 0.13,
            background: 'linear-gradient(145deg, #cfcac1, #aca79e)',
            boxShadow:
              '0 4px 10px rgba(0,0,0,0.35), inset 0 0 0 1.5px rgba(255,255,255,0.45), inset 0 -2px 3px rgba(0,0,0,0.15)',
          }}
        >
          {lens(0.29, 0.27, P * 0.42, 'wide')}
          {lens(0.29, 0.73, P * 0.42, 'ultra')}
          {lens(0.73, 0.5, P * 0.42, 'tele')}
          <div
            style={{
              position: 'absolute',
              left: 0.73 * P - P * 0.065,
              top: 0.16 * P - P * 0.065,
              width: P * 0.13,
              height: P * 0.13,
              borderRadius: '50%',
              background:
                'radial-gradient(circle, #fff8e2, #d8cfb4 60%, #9c958a)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 0.73 * P - P * 0.06,
              top: 0.84 * P - P * 0.06,
              width: P * 0.12,
              height: P * 0.12,
              borderRadius: '50%',
              background: 'radial-gradient(circle, #2a2a2e, #0c0c0e)',
            }}
          />
        </div>
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            filter: 'drop-shadow(0 1px 0 rgba(255,255,255,0.5))',
          }}
        >
          <AGLogo size={W * 0.26} color="#9a958c" />
        </div>
      </div>
    </div>
  )
}

/** Activity-style ring filling to `pct`, with a bright leading cap. */
export const Ring: React.FC<{
  pct: number
  at: number
  size: number
  stroke: number
  from: string
  to: string
}> = ({ pct, at, size, stroke, from, to }) => {
  const f = useCurrentFrame()
  const t = interpolate(f, [at, at + 36], [0, pct], {
    ...clamp,
    easing: easeOut,
  })
  const r = (size - stroke) / 2
  return (
    <svg width={size} height={size} style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id="ring-grad" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
      </defs>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="#1c1c1e"
        strokeWidth={stroke}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="url(#ring-grad)"
        strokeWidth={stroke}
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray={`${t} 1`}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ filter: `drop-shadow(0 0 18px ${to}88)` }}
      />
    </svg>
  )
}

/** Deterministic 3D start positions for things that fly into a layout. */
export const scatter3D = (i: number, seed: string) => ({
  x: (random(`${seed}-x-${i}`) - 0.5) * 2200,
  y: (random(`${seed}-y-${i}`) - 0.5) * 1800,
  z: -1200 - random(`${seed}-z-${i}`) * 2400,
  rx: (random(`${seed}-rx-${i}`) - 0.5) * 180,
  ry: (random(`${seed}-ry-${i}`) - 0.5) * 360,
})

export const Shot: React.FC<{ src: string; style?: React.CSSProperties }> = ({
  src,
  style,
}) => (
  <Img
    src={src}
    style={{
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'top',
      ...style,
    }}
  />
)

/**
 * Horizontal motion smear for whip pans. An SVG blur on one axis only: a CSS
 * blur cannot be directional. Only mounted while `amount` is non-zero because
 * a filter on a full-frame layer is costly on the software renderer.
 */
export const Smear: React.FC<{
  id: string
  amount: number
  children: React.ReactNode
  style?: React.CSSProperties
}> = ({ id, amount, children, style }) => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      filter: amount > 0.5 ? `url(#${id})` : undefined,
      ...style,
    }}
  >
    {amount > 0.5 && (
      <svg width={0} height={0} style={{ position: 'absolute' }}>
        <filter id={id} x="-20%" y="0" width="140%" height="100%">
          <feGaussianBlur stdDeviation={`${amount} 0`} />
        </filter>
      </svg>
    )}
    {children}
  </div>
)

/** A pool of cool stage light, the only thing ever lit behind the subject. */
export const StageLight: React.FC<{
  x?: number
  y?: number
  w?: number
  h?: number
  opacity?: number
}> = ({ x = 50, y = 50, w = 60, h = 45, opacity = 1 }) => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      opacity,
      background: `radial-gradient(ellipse ${w}% ${h}% at ${x}% ${y}%, rgba(170,200,255,0.16) 0%, rgba(120,150,220,0.05) 45%, transparent 75%)`,
    }}
  />
)
