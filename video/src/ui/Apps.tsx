import React from 'react'
import {
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion'
import { City, cities, colors, fonts, journey, person } from '../brand'
import mapData from '../data/france-map.json'
import { AGLogo, clamp, easeIn, easeInOut, easeOut } from './Primitives'

/**
 * Recreations of the portfolio's own apps (components/desktop/*), so the
 * videos show the same interface people get on antoinegourgue.dev, animated.
 */

// The portfolio uses Apple's system palette
export const ui = {
  blue: '#0A84FF',
  green: '#30D158',
  label: '#1d1d1f',
  secondary: 'rgba(60,60,67,0.6)',
  separator: 'rgba(60,60,67,0.18)',
  window: '#ffffff',
  sidebar: '#f5f5f7',
  toolbar: '#ececf0',
}

export const Icon: React.FC<{
  name: string
  size: number
  color?: string
  style?: React.CSSProperties
}> = ({ name, size, color = 'currentColor', style }) => (
  <i
    className="f7-icons"
    aria-hidden="true"
    style={{ fontSize: size, color, lineHeight: 1, ...style }}
  >
    {name}
  </i>
)

/** Linear interpolation through keyframes {f, v}, eased between each pair. */
export const keyframes = (
  frame: number,
  keys: { f: number; v: number }[],
  ease = easeInOut
) => {
  if (frame <= keys[0].f) return keys[0].v
  for (let i = 0; i < keys.length - 1; i++) {
    const a = keys[i]
    const b = keys[i + 1]
    if (frame <= b.f) {
      return interpolate(frame, [a.f, b.f], [a.v, b.v], {
        ...clamp,
        easing: ease,
      })
    }
  }
  return keys[keys.length - 1].v
}

/** Typed substring of `text`, `cps` characters per second from `start`. */
export const useTyped = (text: string, start: number, cps = 22) => {
  const f = useCurrentFrame()
  const { fps } = useVideoConfig()
  const n = Math.max(
    0,
    Math.min(text.length, Math.floor(((f - start) / fps) * cps))
  )
  return {
    text: text.slice(0, n),
    done: n >= text.length,
    started: n > 0,
    caret: n < text.length || Math.floor(f / 15) % 2 === 0,
  }
}

export const Caret: React.FC<{ on: boolean; color?: string }> = ({
  on,
  color = ui.blue,
}) => (
  <span
    style={{
      display: 'inline-block',
      width: 2.5,
      height: '1.05em',
      marginLeft: 2,
      verticalAlign: 'text-bottom',
      background: color,
      opacity: on ? 1 : 0,
    }}
  />
)

export const Cursor: React.FC<{
  x: number
  y: number
  pressed?: boolean
  opacity?: number
}> = ({ x, y, pressed = false, opacity = 1 }) => (
  <svg
    width={40}
    height={54}
    viewBox="0 0 22 30"
    style={{
      position: 'absolute',
      left: x,
      top: y,
      opacity,
      transform: `scale(${pressed ? 0.86 : 1})`,
      transformOrigin: '2px 2px',
      filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.45))',
      zIndex: 50,
    }}
  >
    <path
      d="M1 1 L1 23 L6.5 17.5 L10.5 27 L14 25.5 L10 16.5 L18 16.5 Z"
      fill="#000"
      stroke="#fff"
      strokeWidth={1.6}
      strokeLinejoin="round"
    />
  </svg>
)

/** iOS touch feedback: a soft disc that grows and fades where a finger taps. */
export const Tap: React.FC<{ x: number; y: number; at: number }> = ({
  x,
  y,
  at,
}) => {
  const f = useCurrentFrame()
  const t = (f - at) / 14
  if (t < -0.35 || t > 1) return null
  const press = t < 0 ? 1 + t / 0.35 : 1
  const r = t < 0 ? 26 * press : 26 + t * 34
  const o = t < 0 ? 0.55 * press : 0.55 * (1 - t)
  return (
    <div
      style={{
        position: 'absolute',
        left: x - r,
        top: y - r,
        width: r * 2,
        height: r * 2,
        borderRadius: '50%',
        background: `rgba(255,255,255,${o})`,
        border: `2px solid rgba(255,255,255,${o})`,
        boxShadow: `0 0 20px rgba(0,0,0,${o * 0.4})`,
        zIndex: 40,
      }}
    />
  )
}

export const TrafficLights: React.FC<{ size?: number }> = ({ size = 13 }) => (
  <div style={{ display: 'flex', gap: size * 0.62 }}>
    {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
      <div
        key={c}
        style={{
          width: size,
          height: size,
          borderRadius: size,
          background: c,
          boxShadow: 'inset 0 0 0 0.5px rgba(0,0,0,0.12)',
        }}
      />
    ))}
  </div>
)

/** Light macOS window as the portfolio draws it (MacWindow.vue). */
export const LightWindow: React.FC<{
  width: number
  height: number
  title?: string
  toolbar?: React.ReactNode
  children: React.ReactNode
  style?: React.CSSProperties
}> = ({ width, height, title, toolbar, children, style }) => (
  <div
    style={{
      position: 'absolute',
      width,
      height,
      borderRadius: 16,
      overflow: 'hidden',
      background: ui.window,
      boxShadow:
        '0 50px 120px rgba(0,0,0,0.45), 0 0 0 1px rgba(0,0,0,0.12), inset 0 0 0 1px rgba(255,255,255,0.6)',
      fontFamily: fonts.body,
      color: ui.label,
      ...style,
    }}
  >
    <div
      style={{
        height: 52,
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        padding: '0 20px',
        background: ui.toolbar,
        borderBottom: `1px solid ${ui.separator}`,
        position: 'relative',
      }}
    >
      <TrafficLights />
      {title && (
        <div style={{ fontSize: 19, fontWeight: 700, marginLeft: 6 }}>
          {title}
        </div>
      )}
      <div style={{ flex: 1 }} />
      {toolbar}
    </div>
    <div style={{ position: 'absolute', inset: '52px 0 0 0' }}>{children}</div>
  </div>
)

/**
 * macOS / iOS notification, the design of NotificationBanner.vue: app icon,
 * bold title, relative time, body.
 */
export const Banner: React.FC<{
  title: string
  body: string
  at: number
  width?: number
  dark?: boolean
  appIcon?: React.ReactNode
  style?: React.CSSProperties
}> = ({ title, body, at, width = 940, dark = true, appIcon, style }) => {
  const f = useCurrentFrame()
  const { fps } = useVideoConfig()
  const s = spring({
    frame: f - at,
    fps,
    config: { damping: 16, stiffness: 150 },
  })
  if (f < at) return null
  return (
    <div
      style={{
        position: 'absolute',
        width,
        padding: '24px 28px',
        borderRadius: 30,
        background: dark ? 'rgba(38,38,44,0.86)' : 'rgba(250,250,252,0.9)',
        border: `1px solid ${dark ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.08)'}`,
        boxShadow: '0 30px 80px rgba(0,0,0,0.45)',
        display: 'flex',
        gap: 22,
        alignItems: 'center',
        opacity: s,
        transform: `translateY(${(1 - s) * -180}px) scale(${0.92 + s * 0.08})`,
        fontFamily: fonts.body,
        color: dark ? '#fff' : ui.label,
        ...style,
      }}
    >
      {appIcon ?? <AGAppIcon size={84} />}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 29,
            fontWeight: 700,
          }}
        >
          {title}
          <span
            style={{
              fontWeight: 400,
              fontSize: 24,
              color: dark ? '#a1a1a6' : ui.secondary,
            }}
          >
            maintenant
          </span>
        </div>
        <div
          style={{
            fontSize: 27,
            marginTop: 6,
            color: dark ? '#d1d1d6' : '#3a3a3c',
            lineHeight: 1.3,
          }}
        >
          {body}
        </div>
      </div>
    </div>
  )
}

export const AGAppIcon: React.FC<{ size: number }> = ({ size }) => (
  <div
    style={{
      width: size,
      height: size,
      flexShrink: 0,
      borderRadius: size * 0.24,
      background: 'linear-gradient(160deg, #3a3a3e, #0d0d0f)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.12)',
    }}
  >
    <AGLogo size={size * 0.62} />
  </div>
)

export const PHONE_RATIO = 2532 / 1170

/** iPhone with Dynamic Island; children fill the screen. */
export const Phone: React.FC<{
  width: number
  children: React.ReactNode
  glow?: string
}> = ({ width, children, glow = 'rgba(41,151,255,0.35)' }) => {
  const bezel = width * 0.032
  const sw = width - bezel * 2
  const sh = Math.round(sw * PHONE_RATIO)
  return (
    <div
      style={{
        width,
        height: sh + bezel * 2,
        borderRadius: width * 0.15,
        padding: bezel,
        background: 'linear-gradient(145deg, #4a4a50, #121214 38%, #2e2e33)',
        boxShadow: `0 60px 140px rgba(0,0,0,0.6), 0 0 0 2px rgba(255,255,255,0.08), 0 0 120px ${glow}`,
      }}
    >
      <div
        style={{
          position: 'relative',
          width: sw,
          height: sh,
          borderRadius: width * 0.12,
          overflow: 'hidden',
          background: '#000',
        }}
      >
        {children}
        <div
          style={{
            position: 'absolute',
            top: sw * 0.034,
            left: sw / 2 - sw * 0.15,
            width: sw * 0.3,
            height: sw * 0.088,
            borderRadius: sw,
            background: '#000',
            zIndex: 30,
          }}
        />
      </div>
    </div>
  )
}

export type SpotlightResult = {
  title: string
  subtitle: string
  icon: React.ReactNode
}

/**
 * Spotlight as Spotlight.vue renders it: frosted bar, grouped results, the
 * selected row in system blue.
 */
export const SpotlightPanel: React.FC<{
  query: string
  typeAt: number
  results: SpotlightResult[]
  resultsAt: number
  selected?: number
  width?: number
}> = ({ query, typeAt, results, resultsAt, selected = 0, width = 900 }) => {
  const f = useCurrentFrame()
  const typed = useTyped(query, typeAt, 20)
  const reveal = interpolate(f, [resultsAt, resultsAt + 10], [0, 1], {
    ...clamp,
    easing: easeOut,
  })
  return (
    <div
      style={{
        width,
        borderRadius: 28,
        overflow: 'hidden',
        background: 'rgba(246,246,248,0.9)',
        boxShadow:
          '0 40px 120px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,0,0,0.1), inset 0 0 0 1px rgba(255,255,255,0.7)',
        fontFamily: fonts.body,
        color: ui.label,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 22,
          padding: '26px 30px',
          fontSize: 44,
        }}
      >
        <Icon name="search" size={40} color={ui.secondary} />
        <span>
          {typed.text}
          <Caret on={typed.caret} color={ui.label} />
        </span>
        {!typed.started && (
          <span style={{ color: 'rgba(60,60,67,0.35)', marginLeft: -12 }}>
            Recherche Spotlight
          </span>
        )}
      </div>
      <div
        style={{
          maxHeight: reveal * 520,
          overflow: 'hidden',
          borderTop: reveal > 0 ? `1px solid ${ui.separator}` : undefined,
        }}
      >
        <div
          style={{
            padding: '14px 30px 6px',
            fontSize: 20,
            fontWeight: 700,
            color: ui.secondary,
          }}
        >
          Meilleur résultat
        </div>
        {results.map((r, i) => {
          const on = i === selected
          const rowIn = interpolate(
            f,
            [resultsAt + i * 3, resultsAt + i * 3 + 8],
            [0, 1],
            clamp
          )
          return (
            <div
              key={r.title}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                margin: '4px 14px',
                padding: '14px 16px',
                borderRadius: 14,
                background: on ? ui.blue : 'transparent',
                color: on ? '#fff' : ui.label,
                opacity: rowIn,
                transform: `translateY(${(1 - rowIn) * 10}px)`,
              }}
            >
              {r.icon}
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 30, fontWeight: 600 }}>{r.title}</div>
                <div
                  style={{
                    fontSize: 23,
                    color: on ? 'rgba(255,255,255,0.8)' : ui.secondary,
                  }}
                >
                  {r.subtitle}
                </div>
              </div>
            </div>
          )
        })}
        <div style={{ height: 14 }} />
      </div>
    </div>
  )
}

/**
 * The portfolio's Calendar app ("Mon parcours"). `insertAt` slides a new
 * event in at the top and pushes the career down, the CDI to come.
 */
export const CalendarApp: React.FC<{
  width: number
  height: number
  insertAt: number
  style?: React.CSSProperties
}> = ({ width, height, insertAt, style }) => {
  const f = useCurrentFrame()
  const { fps } = useVideoConfig()
  const ins = spring({
    frame: f - insertAt,
    fps,
    config: { damping: 18, stiffness: 110 },
  })
  const glow = interpolate(f, [insertAt + 10, insertAt + 40], [1, 0.35], clamp)
  const eventH = 112
  const segments = ['Jour', 'Semaine', 'Mois', 'Année']
  const event = (
    e: { title: string; period: string; text: string; color: string },
    extra?: React.CSSProperties
  ) => (
    <div
      style={{
        borderRadius: 14,
        padding: '18px 22px',
        background: `${e.color}14`,
        borderLeft: `6px solid ${e.color}`,
        ...extra,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 16,
          fontSize: 23,
          fontWeight: 700,
          color: e.color,
        }}
      >
        <span style={{ minWidth: 0 }}>{e.title}</span>
        <span style={{ fontWeight: 600, fontSize: 21, whiteSpace: 'nowrap' }}>
          {e.period}
        </span>
      </div>
      <div
        style={{
          marginTop: 8,
          fontSize: 20,
          lineHeight: 1.4,
          color: '#48484a',
        }}
      >
        {e.text}
      </div>
    </div>
  )
  return (
    <LightWindow
      width={width}
      height={height}
      title="Mon parcours"
      style={style}
      toolbar={
        <div
          style={{
            display: 'flex',
            background: 'rgba(0,0,0,0.06)',
            borderRadius: 10,
            padding: 3,
            fontSize: 18,
          }}
        >
          {segments.map((s) => (
            <div
              key={s}
              style={{
                padding: '6px 16px',
                borderRadius: 8,
                background: s === 'Année' ? '#fff' : 'transparent',
                boxShadow:
                  s === 'Année' ? '0 1px 3px rgba(0,0,0,0.15)' : undefined,
                fontWeight: s === 'Année' ? 600 : 400,
              }}
            >
              {s}
            </div>
          ))}
        </div>
      }
    >
      <div style={{ display: 'flex', height: '100%' }}>
        <div
          style={{
            width: 210,
            background: ui.sidebar,
            borderRight: `1px solid ${ui.separator}`,
            padding: '26px 22px',
            fontSize: 21,
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          <div style={{ fontSize: 17, fontWeight: 700, color: ui.secondary }}>
            Calendrier
          </div>
          {[
            ['Travail', '#0A84FF'],
            ['Études sup', '#30A46C'],
            ['Lycée', '#E5484D'],
            ['À venir', '#AF52DE'],
          ].map(([name, c]) => (
            <div
              key={name}
              style={{ display: 'flex', alignItems: 'center', gap: 12 }}
            >
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 6,
                  background: c,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon name="checkmark_alt" size={14} color="#fff" />
              </div>
              {name}
            </div>
          ))}
        </div>
        <div
          style={{
            flex: 1,
            padding: 22,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <div
            style={{
              height: (eventH + 18) * ins,
              overflow: 'visible',
              opacity: ins,
              transform: `scale(${0.96 + ins * 0.04})`,
              transformOrigin: 'top center',
            }}
          >
            {event(
              {
                title: 'CDI — Développeur Fullstack × IA',
                period: 'dès oct. 2026',
                text: 'Votre équipe ? Front, back et IA · Anglet, Bordeaux, Paris ou Lille.',
                color: '#AF52DE',
              },
              {
                boxShadow: `0 0 0 3px rgba(175,82,222,${glow * 0.5}), 0 10px 40px rgba(175,82,222,${glow * 0.35})`,
                background: 'rgba(175,82,222,0.1)',
              }
            )}
          </div>
          {journey.map((e) => (
            <div key={e.title} style={{ marginBottom: 18 }}>
              {event(e)}
            </div>
          ))}
        </div>
      </div>
    </LightWindow>
  )
}

const mercY = (lat: number) =>
  Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360))

/** Projects lon/lat into a w×h box framing metropolitan France. */
export const franceProjection = (w: number, h: number, pad = 0.06) => {
  const bbox = { w: -5.4, e: 9.7, s: 41.2, n: 51.3 }
  const x0 = (bbox.w * Math.PI) / 180
  const x1 = (bbox.e * Math.PI) / 180
  const y0 = mercY(bbox.s)
  const y1 = mercY(bbox.n)
  const scale = Math.min(
    (w * (1 - pad * 2)) / (x1 - x0),
    (h * (1 - pad * 2)) / (y1 - y0)
  )
  const cx = (x0 + x1) / 2
  const cy = (y0 + y1) / 2
  return (lon: number, lat: number): [number, number] => [
    w / 2 + ((lon * Math.PI) / 180 - cx) * scale,
    h / 2 - (mercY(lat) - cy) * scale,
  ]
}

const Pin: React.FC<{ city: City; drop: number; size?: number }> = ({
  city,
  drop,
  size = 52,
}) => (
  <div
    style={{
      position: 'absolute',
      left: -size / 2,
      top: -size * 1.35,
      opacity: Math.min(drop * 2, 1),
      transform: `translateY(${(1 - drop) * -90}px) scale(${0.6 + drop * 0.4})`,
      transformOrigin: 'bottom center',
    }}
  >
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50% 50% 50% 0',
        transform: 'rotate(-45deg)',
        background: city.color,
        border: '4px solid #fff',
        boxShadow: '0 8px 18px rgba(0,0,0,0.35)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Icon
        name={city.icon}
        size={size * 0.44}
        color="#fff"
        style={{ transform: 'rotate(45deg)' }}
      />
    </div>
  </div>
)

/**
 * Maps (AppMaps.vue): Natural Earth land in the CARTO Voyager palette the
 * portfolio uses, the Apple-style pins, and the "Mes lieux" panel. Pins
 * drop one after another from `pinsAt`.
 */
export const MapView: React.FC<{
  width: number
  height: number
  pinsAt: number
  stagger?: number
  zoom?: number
  panel?: 'side' | 'sheet' | 'none'
}> = ({ width, height, pinsAt, stagger = 14, zoom = 1, panel = 'side' }) => {
  const f = useCurrentFrame()
  const { fps } = useVideoConfig()
  const project = franceProjection(width, height, 0.08)
  const drops = cities.map((_, i) =>
    spring({
      frame: f - pinsAt - i * stagger,
      fps,
      config: { damping: 11, stiffness: 140 },
    })
  )
  const home = project(cities[0].lon, cities[0].lat)
  const paths = mapData.polygons.map((p) => ({
    france: p.france,
    d:
      p.ring
        .map(([lon, lat], i) => {
          const [x, y] = project(lon, lat)
          return `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`
        })
        .join('') + 'Z',
  }))
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        background: '#d4e6ec',
        fontFamily: fonts.body,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `scale(${zoom})`,
          transformOrigin: `${(home[0] / width) * 100}% ${(home[1] / height) * 60}%`,
        }}
      >
        <svg width={width} height={height} style={{ position: 'absolute' }}>
          {paths.map((p, i) => (
            <path
              key={i}
              d={p.d}
              fill={p.france ? '#f7f4ee' : '#efece6'}
              stroke={p.france ? '#c7b8d8' : '#dcd3e3'}
              strokeWidth={p.france ? 2 : 1.2}
              strokeDasharray={p.france ? undefined : '6 5'}
              strokeLinejoin="round"
            />
          ))}
          {cities.slice(1).map((c, i) => {
            const [x, y] = project(c.lon, c.lat)
            const t = Math.min(drops[i + 1], 1)
            if (t <= 0.01) return null
            const mx = (home[0] + x) / 2 - (y - home[1]) * 0.18
            const my = (home[1] + y) / 2 + (x - home[0]) * 0.18
            const d = `M${home[0]},${home[1]} Q${mx},${my} ${x},${y}`
            // A dotted route that draws itself: the dots are the stroke,
            // a solid masked twin reveals them along the curve
            return (
              <g key={c.name}>
                <mask id={`route-${i}`}>
                  <path
                    d={d}
                    fill="none"
                    stroke="#fff"
                    strokeWidth={14}
                    pathLength={1}
                    strokeDasharray={`${t} 1`}
                  />
                </mask>
                <path
                  d={d}
                  fill="none"
                  stroke={c.color}
                  strokeWidth={5}
                  strokeLinecap="round"
                  strokeDasharray="0.1 14"
                  mask={`url(#route-${i})`}
                  opacity={0.85}
                />
              </g>
            )
          })}
        </svg>
        {cities.map((c, i) => {
          const [x, y] = project(c.lon, c.lat)
          const t = drops[i]
          return (
            <div key={c.name} style={{ position: 'absolute', left: x, top: y }}>
              <Pin city={c} drop={t} />
              <div
                style={{
                  position: 'absolute',
                  left: 34,
                  top: -42,
                  whiteSpace: 'nowrap',
                  fontSize: 26,
                  fontWeight: 700,
                  color: '#3a3a3c',
                  textShadow:
                    '0 0 4px #fff, 0 0 4px #fff, 0 0 8px #fff, 0 0 8px #fff',
                  opacity: interpolate(t, [0.6, 1], [0, 1], clamp),
                }}
              >
                {c.name}
              </div>
            </div>
          )
        })}
      </div>
      {panel !== 'none' && (
        <div
          style={{
            position: 'absolute',
            ...(panel === 'side'
              ? { right: 22, bottom: 22, width: 320, borderRadius: 20 }
              : {
                  left: 0,
                  right: 0,
                  bottom: 0,
                  borderRadius: '28px 28px 0 0',
                  paddingBottom: 40,
                }),
            padding: panel === 'side' ? 14 : '14px 18px 40px',
            background: 'rgba(255,255,255,0.9)',
            boxShadow: '0 12px 40px rgba(0,0,0,0.25)',
            color: ui.label,
          }}
        >
          {panel === 'sheet' && (
            <div
              style={{
                width: 60,
                height: 7,
                borderRadius: 4,
                background: 'rgba(0,0,0,0.2)',
                margin: '0 auto 12px',
              }}
            />
          )}
          <div
            style={{
              fontSize: 17,
              fontWeight: 700,
              letterSpacing: '0.06em',
              color: 'rgba(0,0,0,0.4)',
              padding: '4px 10px 10px',
            }}
          >
            OÙ JE PEUX TRAVAILLER
          </div>
          {cities.map((c, i) => {
            const on = drops[i] > 0.5
            const active =
              f >= pinsAt + i * stagger &&
              f <
                pinsAt + (i + 1) * stagger + (i === cities.length - 1 ? 999 : 0)
            return (
              <div
                key={c.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  padding: '10px 12px',
                  borderRadius: 14,
                  background: active ? ui.blue : 'transparent',
                  color: active ? '#fff' : ui.label,
                  opacity: on ? 1 : 0.35,
                }}
              >
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 21,
                    background: c.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon name={c.icon} size={20} color="#fff" />
                </div>
                <div>
                  <div style={{ fontSize: 23, fontWeight: 700 }}>{c.name}</div>
                  <div
                    style={{
                      fontSize: 18,
                      color: active ? 'rgba(255,255,255,0.8)' : ui.secondary,
                    }}
                  >
                    {c.note}
                  </div>
                </div>
              </div>
            )
          })}
          <div
            style={{
              marginTop: 10,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 14px',
              borderRadius: 12,
              background: 'rgba(52,199,89,0.12)',
              color: '#1b7a3a',
              fontSize: 19,
              fontWeight: 700,
            }}
          >
            <Icon name="car_fill" size={20} color="#1b7a3a" />
            CDI · dès octobre 2026
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * Contact app compose sheet (AppContact.vue): fields fill in, the cursor
 * presses "Envoyer le message", the sheet flies off.
 */
export const MailCompose: React.FC<{
  width: number
  height: number
  subject: string
  body: string
  typeAt: number
  sendAt: number
  style?: React.CSSProperties
}> = ({ width, height, subject, body, typeAt, sendAt, style }) => {
  const f = useCurrentFrame()
  const subj = useTyped(subject, typeAt, 26)
  const bodyStart = typeAt + Math.ceil((subject.length / 26) * 30) + 6
  const txt = useTyped(body, bodyStart, 34)
  const pressed = f >= sendAt && f < sendAt + 5
  const fly = interpolate(f, [sendAt + 5, sendAt + 20], [0, 1], {
    ...clamp,
    easing: easeIn,
  })
  const row = (label: string, value: React.ReactNode) => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        padding: '16px 0',
        borderBottom: `1px solid ${ui.separator}`,
        fontSize: 22,
      }}
    >
      <span style={{ width: 90, color: ui.secondary }}>{label}</span>
      {value}
    </div>
  )
  return (
    <LightWindow
      width={width}
      height={height}
      title="Nouveau message"
      style={{
        ...style,
        opacity: 1 - fly,
        transform: `${style?.transform ?? ''} translateY(${fly * -500}px) scale(${1 - fly * 0.5})`,
      }}
      toolbar={<Icon name="paperplane_fill" size={26} color={ui.blue} />}
    >
      <div
        style={{ padding: '6px 34px', height: '100%', position: 'relative' }}
      >
        {row(
          'À :',
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 14px',
              borderRadius: 999,
              background: 'rgba(10,132,255,0.12)',
              color: ui.blue,
              fontWeight: 600,
            }}
          >
            <Icon name="person_crop_circle_fill" size={24} color={ui.blue} />
            {person.firstName} {person.lastName}
          </span>
        )}
        {row(
          'Objet :',
          <span style={{ fontWeight: 600 }}>
            {subj.text}
            {!subj.done && <Caret on={subj.caret} />}
          </span>
        )}
        <div
          style={{
            padding: '22px 0',
            fontSize: 24,
            lineHeight: 1.5,
            color: '#3a3a3c',
            whiteSpace: 'pre-wrap',
          }}
        >
          {txt.text}
          {subj.done && !txt.done && <Caret on={txt.caret} />}
        </div>
        <div
          style={{
            position: 'absolute',
            right: 34,
            bottom: 30,
            padding: '16px 30px',
            borderRadius: 12,
            background: ui.blue,
            color: '#fff',
            fontWeight: 700,
            fontSize: 22,
            transform: `scale(${pressed ? 0.94 : 1})`,
            boxShadow: '0 6px 18px rgba(10,132,255,0.35)',
          }}
        >
          Envoyer le message
        </div>
      </div>
    </LightWindow>
  )
}

export type Bubble = {
  from: 'me' | 'them'
  text: string
  at: number
  /** Renders an iMessage rich link preview instead of plain text. */
  link?: { image: string; title: string; domain: string }
}

/**
 * iMessage thread (the portfolio's Messages app). Each bubble is preceded by
 * a typing indicator on the sender's side; the thread scrolls by the real
 * height of what is on screen, so long answers push the conversation up.
 */
export const MessagesThread: React.FC<{
  bubbles: Bubble[]
  contact: string
  width: number
  height: number
}> = ({ bubbles, contact, width, height }) => {
  const f = useCurrentFrame()
  const { fps } = useVideoConfig()
  const font = width * 0.05
  const padY = width * 0.024
  const gap = width * 0.022
  const charsPerLine = (width * 0.76 - width * 0.072) / (font * 0.5)
  const bubbleH = (b: Bubble) =>
    b.link
      ? width * 0.62 + gap
      : Math.ceil(b.text.length / charsPerLine) * font * 1.3 + padY * 2 + gap
  const typingH = font * 1.3 + padY * 2 + gap
  const top = height * 0.15
  const inputH = height * 0.085
  const avail = height - top - inputH - gap
  const contentAt = (t: number) =>
    bubbles.filter((b) => t >= b.at).reduce((h, b) => h + bubbleH(b), 0) +
    (bubbles.some((b) => t >= b.at - 18 && t < b.at) ? typingH : 0)
  // Box-filtered target: a 10-frame glide instead of a jump
  let scroll = 0
  for (let k = 0; k < 10; k++) scroll += Math.max(0, contentAt(f - k) - avail)
  scroll /= 10
  const visible = bubbles.filter((b) => f >= b.at)
  const typing = bubbles.find((b) => f >= b.at - 18 && f < b.at)
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: '#fff',
        fontFamily: fonts.body,
        width,
        height,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: top,
          padding: `0 ${width * 0.04}px`,
          display: 'flex',
          flexDirection: 'column',
          gap,
          transform: `translateY(${-scroll}px)`,
        }}
      >
        {visible.map((b, i) => {
          const s = spring({
            frame: f - b.at,
            fps,
            config: { damping: 15, stiffness: 180 },
          })
          const me = b.from === 'me'
          const common: React.CSSProperties = {
            alignSelf: me ? 'flex-end' : 'flex-start',
            opacity: s,
            transform: `scale(${0.7 + s * 0.3})`,
            transformOrigin: me ? 'bottom right' : 'bottom left',
          }
          if (b.link) {
            return (
              <div
                key={i}
                style={{
                  ...common,
                  width: width * 0.7,
                  borderRadius: width * 0.045,
                  overflow: 'hidden',
                  background: '#e9e9eb',
                }}
              >
                <Img
                  src={b.link.image}
                  style={{
                    width: '100%',
                    height: width * 0.4,
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
                <div
                  style={{ padding: `${width * 0.025}px ${width * 0.035}px` }}
                >
                  <div
                    style={{
                      fontSize: font * 0.85,
                      fontWeight: 700,
                      color: ui.label,
                    }}
                  >
                    {b.link.title}
                  </div>
                  <div style={{ fontSize: font * 0.75, color: ui.secondary }}>
                    {b.link.domain}
                  </div>
                </div>
              </div>
            )
          }
          return (
            <div
              key={i}
              style={{
                ...common,
                maxWidth: '76%',
                padding: `${padY}px ${width * 0.036}px`,
                borderRadius: width * 0.05,
                background: me ? ui.blue : '#e9e9eb',
                color: me ? '#fff' : ui.label,
                fontSize: font,
                lineHeight: 1.3,
              }}
            >
              {b.text}
            </div>
          )
        })}
        {typing && (
          <div
            style={{
              alignSelf: typing.from === 'me' ? 'flex-end' : 'flex-start',
              padding: `${width * 0.03}px ${width * 0.04}px`,
              borderRadius: width * 0.05,
              background: typing.from === 'me' ? ui.blue : '#e9e9eb',
              display: 'flex',
              gap: width * 0.012,
            }}
          >
            {[0, 1, 2].map((k) => (
              <div
                key={k}
                style={{
                  width: width * 0.018,
                  height: width * 0.018,
                  borderRadius: '50%',
                  background: typing.from === 'me' ? '#fff' : '#8e8e93',
                  opacity: 0.4 + 0.6 * Math.max(0, Math.sin((f / 4 - k) * 1.2)),
                }}
              />
            ))}
          </div>
        )}
      </div>
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: top - gap,
          paddingTop: height * 0.055,
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 4,
          background: 'rgba(249,249,249,0.97)',
          borderBottom: `1px solid ${ui.separator}`,
        }}
      >
        <AGAppIcon size={width * 0.12} />
        <div style={{ fontSize: width * 0.032, color: ui.label }}>
          {contact}
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: inputH,
          padding: `${width * 0.02}px ${width * 0.04}px`,
          boxSizing: 'border-box',
          background: 'rgba(249,249,249,0.97)',
          display: 'flex',
          alignItems: 'flex-start',
          gap: width * 0.03,
        }}
      >
        <Icon name="plus_circle_fill" size={width * 0.075} color="#c7c7cc" />
        <div
          style={{
            flex: 1,
            height: width * 0.075,
            borderRadius: width * 0.04,
            border: '1.5px solid #d1d1d6',
            fontSize: width * 0.035,
            color: '#c7c7cc',
            display: 'flex',
            alignItems: 'center',
            paddingLeft: width * 0.03,
          }}
        >
          iMessage
        </div>
      </div>
    </div>
  )
}

/**
 * The calm closing card shared by the OS-style videos: nothing slams, the
 * lines settle one after another and the frame keeps breathing until the
 * last frame so the video doesn't end on a hard stop.
 */
export const ClosingCard: React.FC<{
  start: number
  background?: React.ReactNode
  dark?: boolean
  accent?: string
}> = ({
  start,
  background,
  dark = true,
  accent = 'linear-gradient(120deg, #2997ff 0%, #7b5cff 55%, #ff4fd8 100%)',
}) => {
  const f = useCurrentFrame()
  const line = (d: number) => {
    const t = interpolate(f, [start + d, start + d + 22], [0, 1], {
      ...clamp,
      easing: easeOut,
    })
    return {
      opacity: t,
      transform: `translateY(${(1 - t) * 24}px)`,
      filter: `blur(${(1 - t) * 6}px)`,
    }
  }
  const fg = dark ? colors.white : ui.label
  const sub = dark ? '#a1a1a6' : ui.secondary
  const breathe = 1 + (f - start) * 0.0004
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        opacity: interpolate(f, [start, start + 12], [0, 1], clamp),
      }}
    >
      {background}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          transform: `scale(${breathe})`,
          fontFamily: fonts.display,
          color: fg,
        }}
      >
        <div style={line(4)}>
          <AGLogo size={150} color={fg} />
        </div>
        <div
          style={{
            ...line(10),
            marginTop: 40,
            fontWeight: 800,
            fontSize: 104,
            letterSpacing: '-0.035em',
            lineHeight: 1,
          }}
        >
          {person.firstName} {person.lastName}
        </div>
        <div
          style={{
            ...line(16),
            marginTop: 18,
            fontWeight: 700,
            fontSize: 54,
            letterSpacing: '-0.02em',
            backgroundImage: accent,
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
        >
          {person.role}
        </div>
        <div
          style={{
            ...line(26),
            marginTop: 46,
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            padding: '16px 30px',
            borderRadius: 999,
            fontFamily: fonts.body,
            fontWeight: 600,
            fontSize: 34,
            background: 'rgba(48,209,88,0.14)',
            border: '1.5px solid rgba(48,209,88,0.5)',
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 7,
              background: ui.green,
              boxShadow: `0 0 ${10 + Math.sin(f / 8) * 6}px ${ui.green}`,
            }}
          />
          {person.availability}
        </div>
        <div
          style={{
            ...line(32),
            marginTop: 20,
            fontFamily: fonts.body,
            fontSize: 31,
            fontWeight: 500,
            color: sub,
          }}
        >
          {person.mobility}
        </div>
        <div
          style={{
            ...line(40),
            marginTop: 56,
            padding: '24px 60px',
            borderRadius: 999,
            background: ui.blue,
            fontFamily: fonts.body,
            fontWeight: 700,
            fontSize: 42,
            color: '#fff',
            boxShadow: '0 12px 40px rgba(10,132,255,0.45)',
          }}
        >
          {person.url}
        </div>
      </div>
    </div>
  )
}

/** Screenshot of a real portfolio window, with the macOS drop shadow. */
export const Shot: React.FC<{
  src: string
  width: number
  style?: React.CSSProperties
}> = ({ src, width, style }) => (
  <Img
    src={src}
    style={{
      position: 'absolute',
      width,
      filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.5))',
      ...style,
    }}
  />
)

export { easeInOut, easeIn, easeOut }
