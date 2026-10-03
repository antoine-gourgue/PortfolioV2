import React from 'react'
import { AbsoluteFill, Img } from 'remotion'
import { asset, fonts } from '../brand'
import {
  IPhone3D,
  MacBook3D,
  Shot,
  SilverText,
  StageLight,
  stage,
} from '../keynote/Kit'
import { footage } from '../scenes/OsScenes'

export const BANNER_W = 1584
export const BANNER_H = 396

// LinkedIn lays the profile photo over the bottom left of the banner, on
// desktop and even more on mobile: nothing that matters starts before this
const SAFE_LEFT = 500

type Float = {
  src: string
  x: number
  y: number
  w: number
  aspect: number
  opacity: number
  blur: number
  ry: number
  icon?: boolean
}

// The portfolio's windows and project icons drifting into the depth of the
// stage, as they lift off the MacBook in the film: the further, the smaller,
// dimmer and softer. They fill the left of the banner above the profile
// photo and stay out of the text.
const LEFT_FLOATS: Float[] = [
  {
    src: footage('window-calendar.webp'),
    x: 70,
    y: 168,
    w: 104,
    aspect: 1.44,
    opacity: 0.22,
    blur: 3.2,
    ry: 26,
  },
  {
    src: footage('window-terminal-neofetch.png'),
    x: 212,
    y: 72,
    w: 124,
    aspect: 1.183,
    opacity: 0.36,
    blur: 2.2,
    ry: 22,
  },
  {
    src: footage('window-about-card.png'),
    x: 392,
    y: 118,
    w: 150,
    aspect: 1.051,
    opacity: 0.58,
    blur: 1.1,
    ry: 18,
  },
  {
    src: asset('projects/medical-ai-icon.png'),
    x: 128,
    y: 38,
    w: 30,
    aspect: 1,
    opacity: 0.3,
    blur: 1.6,
    ry: 0,
    icon: true,
  },
  {
    src: asset('projects/mosaic-icon.png'),
    x: 470,
    y: 26,
    w: 38,
    aspect: 1,
    opacity: 0.55,
    blur: 0.6,
    ry: 0,
    icon: true,
  },
  {
    src: asset('projects/tailtcg-icon.png'),
    x: 300,
    y: 196,
    w: 34,
    aspect: 1,
    opacity: 0.4,
    blur: 1.4,
    ry: 0,
    icon: true,
  },
]

const FloatingShot: React.FC<{ f: Float }> = ({ f }) => {
  const h = f.w / f.aspect
  return (
    <div
      style={{
        position: 'absolute',
        left: f.x - f.w / 2,
        top: f.y - h / 2,
        width: f.w,
        height: h,
        opacity: f.opacity,
        filter: f.blur ? `blur(${f.blur}px)` : undefined,
        transform: `perspective(800px) rotateY(${f.ry}deg)`,
        borderRadius: f.icon ? '22%' : 8,
        overflow: 'hidden',
        background: f.icon ? '#fff' : undefined,
        boxShadow: '0 18px 40px rgba(0,0,0,0.6)',
      }}
    >
      <Img
        src={f.src}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </div>
  )
}

/** Black stage, a pool of light on each side, an optional ghost word. */
const Stage: React.FC<{
  ghost?: string
  floats?: Float[]
  children: React.ReactNode
}> = ({ ghost, floats = LEFT_FLOATS, children }) => (
  <AbsoluteFill style={{ background: '#000', fontFamily: fonts.display }}>
    <StageLight x={80} y={62} w={34} h={95} />
    <StageLight x={48} y={40} w={40} h={80} opacity={0.55} />
    {/* A word in giant dark type behind everything, as the showcases of the
        film carry their names */}
    {ghost && (
      <div
        style={{
          position: 'absolute',
          left: -20,
          top: 40,
          whiteSpace: 'nowrap',
          fontSize: 300,
          fontWeight: 800,
          letterSpacing: '-0.05em',
          lineHeight: 1,
          color: '#0d0d10',
        }}
      >
        {ghost}
      </div>
    )}
    {floats.map((f) => (
      <FloatingShot key={f.src} f={f} />
    ))}
    {children}
  </AbsoluteFill>
)

/** The type column: kicker, silver headline, statement, footer line. */
const Copy: React.FC<{
  kicker: string
  headline: string
  size?: number
  line: string
  lineSize?: number
  foot: string[]
}> = ({ kicker, headline, size = 84, line, lineSize = 36, foot }) => (
  <div
    style={{
      position: 'absolute',
      left: SAFE_LEFT,
      top: 0,
      height: BANNER_H,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }}
  >
    <div
      style={{
        fontSize: 30,
        fontWeight: 500,
        letterSpacing: '-0.01em',
        color: stage.grey,
        marginBottom: 2,
      }}
    >
      {kicker}
    </div>
    {/* A still is frame 0: start the sweep early so its highlight sits on
        the words */}
    <SilverText size={size} weight={800} sweepAt={-14}>
      {headline}
    </SilverText>
    <div
      style={{
        fontSize: lineSize,
        fontWeight: 600,
        letterSpacing: '-0.02em',
        color: stage.white,
        marginTop: 2,
      }}
    >
      {line}
    </div>
    <Foot items={foot} />
  </div>
)

/** Grey items separated by dots; the last one, the link, in blue. */
const Foot: React.FC<{ items: string[]; style?: React.CSSProperties }> = ({
  items,
  style,
}) => (
  <div
    style={{
      marginTop: 16,
      fontSize: 24,
      fontWeight: 500,
      letterSpacing: '-0.005em',
      color: stage.grey,
      ...style,
    }}
  >
    {items.map((item, i) => (
      <React.Fragment key={item}>
        {i > 0 && <span style={{ margin: '0 12px', color: '#48484a' }}>·</span>}
        <span style={i === items.length - 1 ? { color: '#2997ff' } : undefined}>
          {item}
        </span>
      </React.Fragment>
    ))}
  </div>
)

const MAC_W = 360
const MAC_D = MAC_W * 0.69

/**
 * Version 1. The role in silver, and the portfolio itself on a MacBook and
 * an iPhone, a window lifting off the screen.
 */
export const Banner: React.FC = () => (
  <Stage
    ghost="AntoineOS"
    floats={[
      ...LEFT_FLOATS,
      {
        src: footage('appstore-emailEditor.webp'),
        x: 1064,
        y: 76,
        w: 104,
        aspect: 1.157,
        opacity: 0.92,
        blur: 0,
        ry: 12,
      },
    ]}
  >
    <Copy
      kicker="Développeur"
      headline="Fullstack × IA."
      line="Du pixel au déploiement."
      foot={['Disponible en CDI', 'antoinegourgue.dev']}
    />
    <AbsoluteFill style={{ perspective: 1600, perspectiveOrigin: '74% 45%' }}>
      <div
        style={{
          position: 'absolute',
          left: 1060,
          top: 318,
          width: MAC_W,
          height: 0,
          transformStyle: 'preserve-3d',
          transform: 'rotateX(-14deg) rotateY(-24deg)',
        }}
      >
        <div
          style={{
            transformStyle: 'preserve-3d',
            transform: `translateZ(${-MAC_D / 2}px)`,
          }}
        >
          <MacBook3D
            width={MAC_W}
            lid={104}
            sheen={0.5}
            screen={<Shot src={footage('desktop.jpg')} />}
          />
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 1352,
          top: 112,
          transformStyle: 'preserve-3d',
          transform: 'translateZ(90px) rotateY(-18deg) rotateZ(4deg)',
        }}
      >
        <IPhone3D
          width={118}
          angle={-18}
          screen={<Shot src={footage('mobile-home.jpg')} />}
        />
      </div>
    </AbsoluteFill>
  </Stage>
)

// The portfolio's desktop behind the letters, large enough that its blue
// wallpaper fills them: a darker or busier screen breaks the word up
const WORD_FILL = footage('desktop.jpg')
const WORD_SIZE = 178

/**
 * Version 2. The portfolio's own name, its letters cut out of its screens,
 * the promise underneath.
 */
export const BannerOS: React.FC = () => {
  const word: React.CSSProperties = {
    fontSize: WORD_SIZE,
    fontWeight: 800,
    letterSpacing: '-0.055em',
    lineHeight: 1.08,
    whiteSpace: 'nowrap',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
    // Negative tracking pulls the box in past the last glyph: pad it back
    padding: '0 0.06em',
  }
  return (
    <Stage>
      <div
        style={{
          position: 'absolute',
          left: SAFE_LEFT - 12,
          top: 0,
          height: BANNER_H,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <div style={{ position: 'relative' }}>
          <div
            style={{
              ...word,
              backgroundImage: `url(${WORD_FILL})`,
              backgroundSize: '1180px auto',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: '-60px 38%',
            }}
          >
            AntoineOS
          </div>
          <div
            style={{
              ...word,
              position: 'absolute',
              inset: 0,
              backgroundImage:
                'linear-gradient(105deg, transparent 22%, rgba(255,255,255,0.7) 34%, transparent 46%)',
            }}
          >
            AntoineOS
          </div>
        </div>
        <div style={{ paddingLeft: 12 }}>
          <div
            style={{
              fontSize: 36,
              fontWeight: 600,
              letterSpacing: '-0.02em',
              color: stage.white,
              marginTop: -4,
            }}
          >
            Le portfolio qui se prend pour un OS.
          </div>
          <Foot items={['Développeur Fullstack × IA', 'antoinegourgue.dev']} />
        </div>
      </div>
    </Stage>
  )
}

const ICONS: { src: string; bg?: string; pad?: boolean }[] = [
  { src: 'medical-ai-icon.png' },
  { src: 'mosaic-icon.png' },
  { src: 'tailtcg-icon.png' },
  { src: 'thor-icon.png', bg: 'linear-gradient(#262626, #0a0a0a)', pad: true },
  { src: 'trelltech-icon.png' },
  { src: 'epihardware-icon.png' },
  { src: 'trinity-icon.png', pad: true },
  { src: 'jobboard-icon.png', pad: true },
  { src: 'echoconnect-icon.png', pad: true },
  {
    src: 'aurora-logo.png',
    bg: 'linear-gradient(#1e293b, #0b1220)',
    pad: true,
  },
  { src: 'sapia-icon.png' },
  { src: 'designSystem-icon.png' },
]
const ICON = 66
const ICON_GAP = 20

/**
 * Version 3. The work itself: the twelve projects as an app grid tilted in
 * space, the count in silver.
 */
export const BannerProjects: React.FC = () => (
  <Stage ghost="12 projets">
    <Copy
      kicker="Développeur Fullstack × IA"
      headline="12 projets."
      size={96}
      line="Tous en ligne. Tous ouverts."
      foot={['Disponible en CDI', 'antoinegourgue.dev']}
    />
    <AbsoluteFill style={{ perspective: 1300, perspectiveOrigin: '78% 50%' }}>
      <div
        style={{
          position: 'absolute',
          left: 1290,
          top: 196,
          transformStyle: 'preserve-3d',
          transform: 'rotateX(16deg) rotateY(-26deg) rotateZ(-3deg)',
        }}
      >
        {ICONS.map((icon, i) => {
          const col = i % 4
          const row = Math.floor(i / 4)
          // A slight wave through the grid, frozen mid-ripple
          const z = Math.sin(col * 0.9 + row * 1.3) * 26
          return (
            <div
              key={icon.src}
              style={{
                position: 'absolute',
                left: (col - 1.5) * (ICON + ICON_GAP) - ICON / 2,
                top: (row - 1) * (ICON + ICON_GAP) - ICON / 2,
                width: ICON,
                height: ICON,
                transform: `translateZ(${z}px)`,
                borderRadius: '22%',
                overflow: 'hidden',
                background: icon.bg ?? '#fff',
                boxShadow:
                  '0 16px 36px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08)',
              }}
            >
              <Img
                src={asset(`projects/${icon.src}`)}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: icon.pad ? 'contain' : 'cover',
                  padding: icon.pad ? '14%' : 0,
                  boxSizing: 'border-box',
                }}
              />
            </div>
          )
        })}
      </div>
    </AbsoluteFill>
  </Stage>
)

const LINEUP: { src: string; x: number; ry: number; z: number }[] = [
  { src: 'mobile-projects.jpg', x: 1180, ry: 24, z: -40 },
  { src: 'mobile-about.jpg', x: 1420, ry: -24, z: -40 },
  { src: 'mobile-home.jpg', x: 1300, ry: 0, z: 40 },
]
const LINEUP_W = 106

/**
 * Version 4. The job search up front, as the film's end card: the word in
 * silver, the cities, and a lineup of iPhones on the portfolio.
 */
export const BannerAvailable: React.FC = () => (
  <Stage ghost="Disponible">
    <Copy
      kicker="Développeur Fullstack × IA"
      headline="Disponible."
      size={96}
      line="En CDI · Biarritz · Bordeaux · Paris · Lille"
      lineSize={28}
      foot={['Web, mobile et IA', 'antoinegourgue.dev']}
    />
    <AbsoluteFill style={{ perspective: 1500, perspectiveOrigin: '82% 50%' }}>
      {LINEUP.map((p) => (
        <div
          key={p.src}
          style={{
            position: 'absolute',
            left: p.x - LINEUP_W / 2,
            top: 86,
            transformStyle: 'preserve-3d',
            transform: `translateZ(${p.z}px) rotateY(${p.ry}deg)`,
          }}
        >
          <IPhone3D
            width={LINEUP_W}
            angle={p.ry}
            screen={<Shot src={footage(p.src)} />}
          />
        </div>
      ))}
    </AbsoluteFill>
  </Stage>
)
