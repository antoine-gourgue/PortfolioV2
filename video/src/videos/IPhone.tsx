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
import { fonts, person } from '../brand'
import { Grain, Vignette } from '../fx/Overlays'
import { Wallpaper, footage } from '../scenes/OsScenes'
import {
  AGAppIcon,
  Banner,
  Bubble,
  ClosingCard,
  Icon,
  MessagesThread,
  PHONE_RATIO,
  Phone,
  Tap,
} from '../ui/Apps'
import { RevealText, clamp, easeIn, easeInOut } from '../ui/Primitives'

const PW = 560
const SW = PW - PW * 0.064
const SH = Math.round(SW * PHONE_RATIO)
const PHONE_TOP = 158

const BUBBLES: Bubble[] = [
  {
    from: 'them',
    text: 'Bonjour ! Je suis disponible en CDI dès octobre 2026.',
    at: 0,
  },
  {
    from: 'me',
    text: 'Bonjour Antoine ! Quel poste recherchez-vous ?',
    at: 64,
  },
  {
    from: 'them',
    text: 'Développeur Fullstack, avec une vraie compétence IA.',
    at: 108,
  },
  { from: 'me', text: 'Votre stack ?', at: 148 },
  {
    from: 'them',
    text: 'Vue, Nuxt, TypeScript et Node.js côté web. Python, CNN et NLP côté IA.',
    at: 186,
  },
  { from: 'me', text: 'Une expérience en entreprise ?', at: 242 },
  {
    from: 'them',
    text: "2,5 ans d'alternance chez Digitaleo : 37 000 utilisateurs actifs sur l'app.",
    at: 280,
  },
  { from: 'me', text: 'Je peux voir vos projets ?', at: 338 },
  {
    from: 'them',
    text: '',
    at: 372,
    link: {
      image: staticFile('footage/desktop.jpg'),
      title: 'Antoine Gourgue — Portfolio',
      domain: 'antoinegourgue.dev',
    },
  },
  { from: 'me', text: 'Où pouvez-vous travailler ?', at: 428 },
  { from: 'them', text: 'Anglet, Bordeaux, Paris ou Lille.', at: 462 },
  { from: 'me', text: "Parfait. On s'appelle cette semaine ?", at: 504 },
  { from: 'them', text: 'Avec plaisir !', at: 538 },
]

const Caption: React.FC<{ text: string; start: number; exit?: number }> = ({
  text,
  start,
  exit,
}) => (
  <div style={{ position: 'absolute', top: 44, width: '100%' }}>
    <RevealText text={text} start={start} exit={exit} size={58} />
  </div>
)

/** Incoming call screen; the green button is tapped at `acceptAt`. */
const CallScreen: React.FC<{ acceptAt: number }> = ({ acceptAt }) => {
  const f = useCurrentFrame()
  const pulse = 1 + Math.sin(f / 5) * 0.04
  const accepted = f >= acceptAt
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        fontFamily: fonts.body,
        color: '#fff',
        textAlign: 'center',
      }}
    >
      <Img
        src={footage('desktop-blur.jpg')}
        style={{ position: 'absolute', height: '100%', left: '-60%' }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.35)',
        }}
      />
      <div style={{ position: 'absolute', top: SH * 0.16, width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <AGAppIcon size={SW * 0.26} />
        </div>
        <div style={{ marginTop: 24, fontSize: SW * 0.085, fontWeight: 600 }}>
          {person.firstName} {person.lastName}
        </div>
        <div style={{ fontSize: SW * 0.045, opacity: 0.75, marginTop: 6 }}>
          {accepted ? '00:01' : 'Appel audio…'}
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: SH * 0.1,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'space-around',
        }}
      >
        {[
          { bg: '#FF3B30', icon: 'phone_down_fill', label: 'Refuser' },
          { bg: '#34C759', icon: 'phone_fill', label: 'Accepter' },
        ].map((b) => (
          <div
            key={b.label}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <div
              style={{
                width: SW * 0.19,
                height: SW * 0.19,
                borderRadius: '50%',
                background: b.bg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform:
                  b.label === 'Accepter' && !accepted
                    ? `scale(${pulse})`
                    : undefined,
              }}
            >
              <Icon name={b.icon} size={SW * 0.09} color="#fff" />
            </div>
            <div style={{ fontSize: SW * 0.038 }}>{b.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

const PhoneStory: React.FC = () => {
  const f = useCurrentFrame()
  const { fps } = useVideoConfig()
  const enter = spring({
    frame: f,
    fps,
    config: { damping: 16, stiffness: 100 },
  })
  // Tapping the notification unlocks straight into the thread
  const open = interpolate(f, [72, 88], [0, 1], { ...clamp, easing: easeInOut })
  const toCall = interpolate(f, [676, 690], [0, 1], {
    ...clamp,
    easing: easeInOut,
  })
  const exit = interpolate(f, [770, 790], [0, 1], { ...clamp, easing: easeIn })
  // The thread sits under the lock screen, so unlocking reveals it
  const threadStart = 72
  return (
    <AbsoluteFill>
      <Wallpaper dim={0.55} />
      <div style={{ opacity: 1 - exit }}>
        {f < 96 && <Caption text="Nouveau message." start={2} exit={84} />}
        {f >= 96 && f < 680 && (
          <Caption text="Posez-lui vos questions." start={100} exit={668} />
        )}
        {f >= 680 && <Caption text="On s'appelle ?" start={684} />}
      </div>
      <AbsoluteFill style={{ perspective: 1800 }}>
        <div
          style={{
            position: 'absolute',
            left: 540 - PW / 2,
            top: PHONE_TOP,
            opacity: enter * (1 - exit),
            transform: `translateY(${(1 - enter) * 500 + exit * 120}px) rotateY(${(1 - enter) * 24 - 3 + Math.sin(f / 60) * 2}deg) scale(${1 - exit * 0.1})`,
          }}
        >
          <Phone width={PW} glow="rgba(10,132,255,0.3)">
            <Sequence from={threadStart}>
              <MessagesThread
                bubbles={BUBBLES}
                contact={`${person.firstName} ${person.lastName}`}
                width={SW}
                height={SH}
              />
            </Sequence>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                transform: `translateY(${-open * 100}%)`,
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
                  top: SH * 0.34,
                  width: 840,
                  transform: `scale(${(SW * 0.92) / 840})`,
                  transformOrigin: 'top left',
                }}
              >
                <Banner
                  at={14}
                  width={840}
                  dark={false}
                  title={`${person.firstName} ${person.lastName}`}
                  body="Bonjour ! Je suis disponible en CDI dès octobre 2026."
                  style={{ position: 'relative' }}
                />
              </div>
              <Tap x={SW * 0.5} y={SH * 0.4} at={68} />
            </div>
            {f >= 676 && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  opacity: toCall,
                  transform: `scale(${1.06 - toCall * 0.06})`,
                }}
              >
                <Sequence from={676}>
                  <CallScreen acceptAt={740 - 676} />
                </Sequence>
                <Tap x={SW * 0.77} y={SH * 0.84} at={738} />
              </div>
            )}
          </Phone>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  )
}

export const IPhone: React.FC<{ withAudio?: boolean }> = ({
  withAudio = true,
}) => (
  <AbsoluteFill style={{ background: '#05070d' }}>
    <PhoneStory />
    <Sequence from={770} name="Closing">
      <ClosingCard
        start={0}
        background={<Wallpaper dim={0.55} zoom={1.25} />}
        accent="linear-gradient(120deg, #34C759 0%, #0A84FF 100%)"
      />
    </Sequence>
    <Vignette strength={0.45} />
    <Grain opacity={0.05} />
    {withAudio && <Audio src={staticFile('audio/iPhone.wav')} />}
  </AbsoluteFill>
)
