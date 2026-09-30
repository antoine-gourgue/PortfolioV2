import React from 'react'
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion'
import { colors, fonts, person } from '../brand'
import {
  Banner,
  CalendarApp,
  ClosingCard,
  LightWindow,
  MailCompose,
  MapView,
  PHONE_RATIO,
  Phone,
  Tap,
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

export const footage = (name: string) => staticFile(`footage/${name}`)

export const OS_GRADIENT =
  'linear-gradient(120deg, #2997ff 0%, #7b5cff 55%, #ff4fd8 100%)'

/** Blurred portfolio wallpaper, the backdrop of every OS scene. */
export const Wallpaper: React.FC<{ dim?: number; zoom?: number }> = ({
  dim = 0.45,
  zoom = 1.15,
}) => (
  <AbsoluteFill>
    <Img
      src={footage('desktop-blur.jpg')}
      style={{
        position: 'absolute',
        height: '100%',
        left: '50%',
        transform: `translateX(-50%) scale(${zoom})`,
      }}
    />
    <AbsoluteFill style={{ background: `rgba(5,7,13,${dim})` }} />
  </AbsoluteFill>
)

const Caption: React.FC<{
  first: string
  second?: string
  start?: number
  size?: number
  top?: number
  exit?: number
}> = ({ first, second, start = 4, size = 70, top = 70, exit }) => (
  <div style={{ position: 'absolute', top, width: '100%' }}>
    <RevealText text={first} start={start} size={size} exit={exit} />
    {second && (
      <RevealText
        text={second}
        start={start + 8}
        size={size}
        exit={exit}
        gradient={OS_GRADIENT}
      />
    )}
  </div>
)

const WINDOWS: { file: string; label: string; ratio: number }[][] = [
  [
    { file: 'window-calendar.webp', label: 'Calendrier', ratio: 1664 / 1156 },
    { file: 'window-weather.webp', label: 'Météo', ratio: 698 / 1228 },
    { file: 'window-siri-answer.webp', label: 'Siri', ratio: 768 / 1128 },
  ],
  [
    { file: 'window-music.webp', label: 'Musique', ratio: 1558 / 1000 },
    { file: 'window-finder.webp', label: 'Finder', ratio: 1920 / 1416 },
  ],
  [
    { file: 'window-blog.webp', label: 'Blog', ratio: 1480 / 1416 },
    { file: 'window-projects.webp', label: 'Projets', ratio: 1638 / 1416 },
    { file: 'window-contact.webp', label: 'Contact', ratio: 1638 / 1416 },
  ],
]

/**
 * Mission Control: the portfolio's real windows fly out of a pile into a
 * justified grid, each labelled like macOS does.
 */
export const MissionControl: React.FC<{ duration: number }> = ({
  duration,
}) => {
  const f = useCurrentFrame()
  const { fps } = useVideoConfig()
  const W = 880
  const gap = 28
  const label = 40
  let y = 228
  const placed: {
    file: string
    label: string
    x: number
    y: number
    w: number
    h: number
  }[] = []
  for (const row of WINDOWS) {
    const h =
      (W - gap * (row.length - 1)) / row.reduce((a, r) => a + r.ratio, 0)
    let x = (1080 - W) / 2
    for (const r of row) {
      placed.push({ ...r, x, y, w: h * r.ratio, h })
      x += h * r.ratio + gap
    }
    y += h + label + gap
  }
  const exit = interpolate(f, [duration - 16, duration], [0, 1], {
    ...clamp,
    easing: easeIn,
  })
  const push = 1 + interpolate(f, [30, duration], [0, 0.04], clamp)
  return (
    <AbsoluteFill style={{ opacity: 1 - exit }}>
      <Wallpaper dim={0.55} />
      <Caption
        first="Chaque app"
        second="fonctionne vraiment."
        size={62}
        top={60}
      />
      <AbsoluteFill style={{ transform: `scale(${push + exit * 0.3})` }}>
        {placed.map((p, i) => {
          const s = spring({
            frame: f - 6 - i * 2.5,
            fps,
            config: { damping: 17, stiffness: 120 },
          })
          // Start piled up in the middle, like windows on a desktop
          const sx = 540 - p.w * 0.3 + ((i % 3) - 1) * 40
          const sy = 700 - p.h * 0.3 + ((i % 2) - 0.5) * 50
          const x = interpolate(s, [0, 1], [sx, p.x])
          const yy = interpolate(s, [0, 1], [sy, p.y])
          const scale = interpolate(s, [0, 1], [0.6, 1])
          return (
            <div
              key={p.file}
              style={{
                position: 'absolute',
                left: x,
                top: yy,
                width: p.w,
                transform: `scale(${scale})`,
                transformOrigin: 'top left',
                opacity: Math.min(1, s * 1.4),
              }}
            >
              <Img
                src={footage(p.file)}
                style={{
                  width: p.w,
                  height: p.h,
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))',
                }}
              />
              <div
                style={{
                  marginTop: 8,
                  textAlign: 'center',
                  fontFamily: fonts.body,
                  fontWeight: 600,
                  fontSize: 22,
                  color: '#fff',
                  opacity: interpolate(s, [0.7, 1], [0, 1], clamp),
                  textShadow: '0 2px 8px rgba(0,0,0,0.6)',
                }}
              >
                {p.label}
              </div>
            </div>
          )
        })}
      </AbsoluteFill>
    </AbsoluteFill>
  )
}

const SCREENS = [
  { at: 84, file: 'mobile-projects.jpg', label: 'App Store · 12 projets' },
  { at: 128, file: 'mobile-about.jpg', label: 'À propos · mon parcours' },
  { at: 168, file: 'mobile-siri.jpg', label: 'Siri · chatbot IA' },
  { at: 206, file: 'mobile-weather.jpg', label: 'Météo · données réelles' },
]

/**
 * The iOS side of the portfolio, as a user would live it: lock screen with
 * the availability notification, unlock, springboard, then a swipe through
 * the apps. Local timing is fixed; the scene lasts 240 frames.
 */
export const MobileTour: React.FC<{ caption?: boolean }> = ({
  caption = true,
}) => {
  const f = useCurrentFrame()
  const { fps } = useVideoConfig()
  const PW = 480
  const SW = PW - PW * 0.064
  const SH = Math.round(SW * PHONE_RATIO)
  const enter = spring({
    frame: f,
    fps,
    config: { damping: 16, stiffness: 100 },
  })
  const unlock = interpolate(f, [46, 58], [0, 1], {
    ...clamp,
    easing: easeInOut,
  })
  // App launch zooms out of the tapped icon (Projets, top-left of the grid)
  const launch = interpolate(f, [78, 90], [0, 1], { ...clamp, easing: easeOut })
  const iconX = SW * 0.16
  const iconY = SH * 0.3
  const exit = interpolate(f, [226, 240], [0, 1], { ...clamp, easing: easeIn })
  let swipe = 0
  for (let i = 1; i < SCREENS.length; i++) {
    swipe += interpolate(f, [SCREENS[i].at - 8, SCREENS[i].at + 4], [0, 1], {
      ...clamp,
      easing: easeInOut,
    })
  }
  const current =
    f < 58
      ? 'Écran verrouillé'
      : f < 84
        ? 'Écran d’accueil'
        : ([...SCREENS].reverse().find((s) => f >= s.at - 4)?.label ?? '')
  return (
    <AbsoluteFill style={{ opacity: 1 - exit }}>
      <Wallpaper dim={0.5} />
      {caption && (
        <Caption
          first="Et sur mobile,"
          second="c'est un iPhone."
          size={70}
          top={50}
        />
      )}
      <AbsoluteFill style={{ perspective: 1600 }}>
        <div
          style={{
            position: 'absolute',
            left: 540 - PW / 2,
            top: 250,
            opacity: enter,
            transform: `translateY(${(1 - enter) * 400}px) rotateY(${(1 - enter) * 30 - 4 + f * 0.03}deg) scale(${1 + exit * 0.3})`,
          }}
        >
          <Phone width={PW}>
            <Img
              src={footage('mobile-home.jpg')}
              style={{ position: 'absolute', width: SW, height: SH }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                transform: `translateY(${-unlock * 100}%)`,
              }}
            >
              <Img
                src={footage('mobile-lockscreen.jpg')}
                style={{ width: SW, height: SH }}
              />
              <div
                style={{
                  position: 'absolute',
                  left: SW * 0.04,
                  top: SH * 0.33,
                  width: 840,
                  transform: `scale(${(SW * 0.92) / 840})`,
                  transformOrigin: 'top left',
                }}
              >
                <Banner
                  at={12}
                  width={840}
                  dark={false}
                  title={`${person.firstName} ${person.lastName}`}
                  body="Disponible en CDI dès octobre 2026 — discutons-en !"
                  style={{ position: 'relative' }}
                />
              </div>
            </div>
            {f >= 78 && (
              <div
                style={{
                  position: 'absolute',
                  left: iconX * (1 - launch),
                  top: iconY * (1 - launch),
                  width: SW,
                  height: SH,
                  transform: `scale(${0.12 + launch * 0.88})`,
                  transformOrigin: 'top left',
                  borderRadius: 40 * (1 - launch),
                  overflow: 'hidden',
                  opacity: Math.min(launch * 3, 1),
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    width: SW * SCREENS.length,
                    transform: `translateX(${-swipe * SW}px)`,
                  }}
                >
                  {SCREENS.map((s) => (
                    <Img
                      key={s.file}
                      src={footage(s.file)}
                      style={{ width: SW, height: SH, flexShrink: 0 }}
                    />
                  ))}
                </div>
              </div>
            )}
            <Tap x={iconX} y={iconY} at={76} />
          </Phone>
        </div>
      </AbsoluteFill>
      <div
        style={{
          position: 'absolute',
          top: 262 + SH + PW * 0.064 + 26,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          opacity: enter,
        }}
      >
        <Chip color={ui.blue} style={{ fontSize: 28, padding: '12px 26px' }}>
          {current}
        </Chip>
      </div>
    </AbsoluteFill>
  )
}

/** Availability notification + the Calendar gaining its next event. */
export const CareerCalendar: React.FC<{ duration: number }> = ({
  duration,
}) => {
  const f = useCurrentFrame()
  const { fps } = useVideoConfig()
  const win = spring({
    frame: f - 10,
    fps,
    config: { damping: 18, stiffness: 90 },
  })
  const exit = interpolate(f, [duration - 14, duration], [0, 1], {
    ...clamp,
    easing: easeIn,
  })
  return (
    <AbsoluteFill style={{ opacity: 1 - exit }}>
      <Wallpaper dim={0.35} />
      <Banner
        at={4}
        title={`${person.firstName} ${person.lastName}`}
        body="Diplômé en septembre, disponible en CDI dès octobre 2026 — discutons-en !"
        style={{ left: 70, top: 60 }}
      />
      <CalendarApp
        width={960}
        height={960}
        insertAt={44}
        style={{
          left: 60,
          top: 320,
          opacity: win,
          transform: `translateY(${(1 - win) * 260}px) scale(${0.94 + win * 0.06 - exit * 0.04})`,
        }}
      />
    </AbsoluteFill>
  )
}

/** "Où ?" — the Maps app with a pin per city. */
export const WhereMap: React.FC<{ duration: number }> = ({ duration }) => {
  const f = useCurrentFrame()
  const { fps } = useVideoConfig()
  const win = spring({
    frame: f - 4,
    fps,
    config: { damping: 18, stiffness: 90 },
  })
  const exit = interpolate(f, [duration - 14, duration], [0, 1], {
    ...clamp,
    easing: easeIn,
  })
  return (
    <AbsoluteFill style={{ opacity: 1 - exit }}>
      <Wallpaper dim={0.45} />
      <Caption
        first="Où ?"
        second="Anglet, Bordeaux, Paris ou Lille."
        size={60}
        top={60}
      />
      <LightWindow
        width={960}
        height={930}
        title="Plans"
        style={{
          left: 60,
          top: 330,
          opacity: win,
          transform: `translateY(${(1 - win) * 260}px)`,
        }}
      >
        <MapView
          width={960}
          height={878}
          pinsAt={26}
          stagger={14}
          zoom={interpolate(f, [0, duration], [1.12, 1], {
            ...clamp,
            easing: easeOut,
          })}
        />
      </LightWindow>
    </AbsoluteFill>
  )
}

/** Contact compose sheet, sent, then the closing card takes over. */
export const WriteAndClose: React.FC<{
  mailDuration: number
  closingBackground?: React.ReactNode
}> = ({ mailDuration, closingBackground }) => {
  const f = useCurrentFrame()
  const { fps } = useVideoConfig()
  const win = spring({ frame: f, fps, config: { damping: 18, stiffness: 120 } })
  const sendAt = mailDuration - 16
  return (
    <AbsoluteFill>
      {f < mailDuration + 6 && (
        <AbsoluteFill>
          <Wallpaper dim={0.45} />
          <MailCompose
            width={960}
            height={620}
            subject="Entretien — CDI Fullstack × IA"
            body="On aimerait vous rencontrer !"
            typeAt={4}
            sendAt={sendAt}
            style={{
              left: 60,
              top: 380,
              opacity: win,
              transform: `translateY(${(1 - win) * 200}px)`,
            }}
          />
        </AbsoluteFill>
      )}
      <ClosingCard
        start={mailDuration - 4}
        background={closingBackground ?? <Wallpaper dim={0.55} zoom={1.25} />}
      />
    </AbsoluteFill>
  )
}

export { colors }
