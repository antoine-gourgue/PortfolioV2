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
export const PdfIcon: React.FC<{ size: number }> = ({ size }) => (
  <div
    style={{
      width: size * 0.78,
      height: size,
      position: 'relative',
      borderRadius: size * 0.06,
      background: '#fff',
      boxShadow:
        '0 6px 16px rgba(0,0,0,0.25), inset 0 0 0 1px rgba(0,0,0,0.08)',
      flexShrink: 0,
    }}
  >
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '52%',
        transform: 'translate(-50%, -50%)',
        padding: `${size * 0.03}px ${size * 0.07}px`,
        borderRadius: size * 0.04,
        background: '#E5484D',
        color: '#fff',
        fontFamily: fonts.body,
        fontWeight: 800,
        fontSize: size * 0.17,
      }}
    >
      PDF
    </div>
  </div>
)

export const MailCompose: React.FC<{
  width: number
  height: number
  subject: string
  body: string
  typeAt: number
  sendAt: number
  style?: React.CSSProperties
  /** Recipient chip label; defaults to Antoine (a recruiter writing). */
  to?: string
  /** A file chip that lands in the body at `at`. */
  attachment?: { name: string; at: number }
  cps?: number
}> = ({
  width,
  height,
  subject,
  body,
  typeAt,
  sendAt,
  style,
  to = `${person.firstName} ${person.lastName}`,
  attachment,
  cps = 34,
}) => {
  const f = useCurrentFrame()
  const subj = useTyped(subject, typeAt, 26)
  const bodyStart = typeAt + Math.ceil((subject.length / 26) * 30) + 6
  const txt = useTyped(body, bodyStart, cps)
  const attach = attachment
    ? interpolate(f, [attachment.at, attachment.at + 10], [0, 1], {
        ...clamp,
        easing: easeOut,
      })
    : 0
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
            {to}
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
        {attachment && attach > 0 && (
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 14,
              padding: '12px 20px 12px 14px',
              borderRadius: 14,
              background: 'rgba(0,0,0,0.04)',
              border: `1px solid ${ui.separator}`,
              opacity: attach,
              transform: `scale(${0.8 + attach * 0.2})`,
              transformOrigin: 'left center',
            }}
          >
            <PdfIcon size={44} />
            <div>
              <div style={{ fontSize: 21, fontWeight: 600 }}>
                {attachment.name}
              </div>
              <div style={{ fontSize: 17, color: ui.secondary }}>
                PDF · 1 page
              </div>
            </div>
          </div>
        )}
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
            marginTop: 44,
            fontFamily: fonts.display,
            fontWeight: 700,
            fontSize: 40,
            letterSpacing: '-0.02em',
            color: dark ? ui.green : '#248a3d',
          }}
        >
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

/**
 * Apple-style annotation: a hairline from a point of the interface to plain
 * type, a figure and its caption. No chip, no shadow, no colour coding.
 * `x, y` is the point on the interface, `lx, ly` where the line ends; the
 * label sits on the `placement` side of that end.
 */
export const Annotation: React.FC<{
  x: number
  y: number
  lx: number
  ly: number
  placement: 'left' | 'right' | 'above' | 'below'
  value: string
  caption?: string
  from: number
  to?: number
  dark?: boolean
  maxWidth?: number
}> = ({
  x,
  y,
  lx,
  ly,
  placement,
  value,
  caption,
  from,
  to = Infinity,
  dark = false,
  maxWidth = 250,
}) => {
  const f = useCurrentFrame()
  const out = to === Infinity ? 0 : interpolate(f, [to - 10, to], [0, 1], clamp)
  const ring = interpolate(f, [from, from + 8], [0, 1], {
    ...clamp,
    easing: easeOut,
  })
  const draw = interpolate(f, [from + 4, from + 16], [0, 1], {
    ...clamp,
    easing: easeInOut,
  })
  const label = interpolate(f, [from + 12, from + 26], [0, 1], {
    ...clamp,
    easing: easeOut,
  })
  if (ring <= 0 || out >= 1) return null
  const ink = dark ? '#f5f5f7' : ui.label
  const sub = dark ? '#a1a1a6' : '#6e6e73'
  const ex = x + (lx - x) * draw
  const ey = y + (ly - y) * draw
  const gap = 14
  const pos: React.CSSProperties =
    placement === 'left'
      ? { left: lx - gap, top: ly, transform: 'translate(-100%, -50%)' }
      : placement === 'right'
        ? { left: lx + gap, top: ly, transform: 'translateY(-50%)' }
        : placement === 'below'
          ? { left: lx, top: ly + gap, transform: 'translateX(-50%)' }
          : { left: lx, top: ly - gap, transform: 'translate(-50%, -100%)' }
  const align =
    placement === 'left' ? 'right' : placement === 'right' ? 'left' : 'center'
  // The label is revealed by a wipe running away from the line
  const wipe = (1 - label) * 100
  const clip =
    placement === 'left'
      ? `inset(0 0 0 ${wipe}%)`
      : placement === 'right'
        ? `inset(0 ${wipe}% 0 0)`
        : placement === 'below'
          ? `inset(0 0 ${wipe}% 0)`
          : `inset(${wipe}% 0 0 0)`
  return (
    <div style={{ position: 'absolute', inset: 0, opacity: 1 - out }}>
      <svg
        style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }}
        width={1}
        height={1}
      >
        {/* A pale halo under the hairline keeps it visible on dark screens */}
        <line
          x1={x}
          y1={y}
          x2={ex}
          y2={ey}
          stroke={dark ? '#000' : '#fff'}
          strokeOpacity={0.55}
          strokeWidth={4}
        />
        <line x1={x} y1={y} x2={ex} y2={ey} stroke={ink} strokeWidth={1.5} />
        <circle
          cx={x}
          cy={y}
          r={7 * ring}
          fill={dark ? '#000' : '#fff'}
          stroke={ink}
          strokeWidth={2}
        />
      </svg>
      <div
        style={{
          position: 'absolute',
          ...pos,
          width: 'max-content',
          maxWidth,
          textAlign: align,
          clipPath: clip,
          fontFamily: fonts.display,
        }}
      >
        <div
          style={{
            fontSize: 38,
            fontWeight: 700,
            letterSpacing: '-0.025em',
            lineHeight: 1.05,
            color: ink,
          }}
        >
          {value}
        </div>
        {caption && (
          <div
            style={{
              marginTop: 4,
              fontSize: 24,
              fontWeight: 500,
              lineHeight: 1.2,
              color: sub,
            }}
          >
            {caption}
          </div>
        )}
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
