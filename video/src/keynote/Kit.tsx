import React from 'react'
import {
  Img,
  interpolate,
  random,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion'
import { fonts } from '../brand'
import { PHONE_RATIO, Phone } from '../ui/Apps'
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

/**
 * iPhone with a back (glass, camera plateau, logo) and titanium edges, so
 * it can spin a full turn in 3D.
 */
export const IPhone3D: React.FC<{
  width: number
  screen: React.ReactNode
}> = ({ width: W, screen }) => {
  const SW = W * 0.936
  const H = SW * PHONE_RATIO + W * 0.064
  const T = W * 0.05
  const face: React.CSSProperties = {
    position: 'absolute',
    left: 0,
    top: 0,
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
  }
  return (
    <div
      style={{
        position: 'relative',
        width: W,
        height: H,
        transformStyle: 'preserve-3d',
      }}
    >
      <div style={{ ...face, transform: `translateZ(${T / 2}px)` }}>
        <Phone width={W} glow="rgba(255,255,255,0.05)">
          {screen}
        </Phone>
      </div>
      <div
        style={{
          ...face,
          width: W,
          height: H,
          borderRadius: W * 0.15,
          transform: `rotateY(180deg) translateZ(${T / 2}px)`,
          background:
            'linear-gradient(160deg, #3a3a3e 0%, #1c1c1e 55%, #2c2c30 100%)',
          boxShadow: 'inset 0 0 0 3px #5a5a5f',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: W * 0.06,
            top: W * 0.06,
            width: W * 0.42,
            height: W * 0.42,
            borderRadius: W * 0.1,
            background: 'rgba(255,255,255,0.06)',
            boxShadow: 'inset 0 0 0 2px rgba(255,255,255,0.08)',
          }}
        >
          {[
            [0.27, 0.27],
            [0.27, 0.73],
            [0.73, 0.5],
          ].map(([x, y], i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: `${x * 100}%`,
                top: `${y * 100}%`,
                width: W * 0.14,
                height: W * 0.14,
                marginLeft: -W * 0.07,
                marginTop: -W * 0.07,
                borderRadius: '50%',
                background:
                  'radial-gradient(circle at 40% 40%, #3a4a6a 0%, #0a0a0c 55%, #000 100%)',
                boxShadow: '0 0 0 3px #48484a',
              }}
            />
          ))}
        </div>
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <AGLogo size={W * 0.26} color="#6e6e73" />
        </div>
      </div>
      {[0, 1].map((side) => (
        <div
          key={side}
          style={{
            position: 'absolute',
            left: side ? W - T / 2 : -T / 2,
            top: W * 0.1,
            width: T,
            height: H - W * 0.2,
            transform: `rotateY(${side ? 90 : -90}deg)`,
            background: 'linear-gradient(90deg, #6e6e73, #c7c7cc, #6e6e73)',
          }}
        />
      ))}
    </div>
  )
}

/** Growing bars, the last one lit: Apple's "more, every year" chart. */
export const BarChart: React.FC<{
  values: number[]
  at: number
  width: number
  height: number
}> = ({ values, at, width, height }) => {
  const f = useCurrentFrame()
  const max = Math.max(...values)
  const gap = width * 0.025
  const bw = (width - gap * (values.length - 1)) / values.length
  return (
    <div style={{ position: 'relative', width, height }}>
      {values.map((v, i) => {
        const t = interpolate(f, [at + i * 2, at + i * 2 + 18], [0, 1], {
          ...clamp,
          easing: easeOut,
        })
        const last = i === values.length - 1
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: i * (bw + gap),
              bottom: 0,
              width: bw,
              height: (v / max) * height * t,
              borderRadius: `${bw * 0.25}px ${bw * 0.25}px 0 0`,
              background: last
                ? 'linear-gradient(180deg, #ffffff, #8e8e93)'
                : '#2c2c2e',
              boxShadow: last ? '0 0 40px rgba(255,255,255,0.35)' : undefined,
            }}
          />
        )
      })}
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

/** Apple Calendar icon whose page flips from `fromMonth` to `toMonth`. */
export const CalendarIcon: React.FC<{
  size: number
  flipAt: number
  fromMonth: string
  toMonth: string
  label: string
}> = ({ size, flipAt, fromMonth, toMonth, label }) => {
  const f = useCurrentFrame()
  const { fps } = useVideoConfig()
  const flip = spring({
    frame: f - flipAt,
    fps,
    config: { damping: 14, stiffness: 110 },
  })
  const page = (m: string, extra?: React.CSSProperties) => (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        borderRadius: size * 0.22,
        background: '#fff',
        overflow: 'hidden',
        backfaceVisibility: 'hidden',
        ...extra,
      }}
    >
      <div
        style={{
          height: size * 0.28,
          background: '#ff3b30',
          color: '#fff',
          fontFamily: fonts.body,
          fontWeight: 700,
          fontSize: size * 0.16,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          letterSpacing: '0.04em',
        }}
      >
        {m}
      </div>
      <div
        style={{
          fontFamily: fonts.display,
          fontWeight: 600,
          fontSize: size * (label.length > 2 ? 0.3 : 0.42),
          color: '#1d1d1f',
          textAlign: 'center',
          lineHeight: `${size * 0.66}px`,
          letterSpacing: '-0.03em',
        }}
      >
        {label}
      </div>
    </div>
  )
  return (
    <div
      style={{
        position: 'relative',
        width: size,
        height: size,
        perspective: size * 4,
      }}
    >
      {page(toMonth)}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transformOrigin: 'top center',
          transform: `rotateX(${flip * 180}deg)`,
          transformStyle: 'preserve-3d',
          opacity: flip < 0.98 ? 1 : 0,
        }}
      >
        {page(fromMonth)}
      </div>
    </div>
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
