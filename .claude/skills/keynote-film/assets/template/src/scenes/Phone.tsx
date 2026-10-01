import React from 'react'
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion'
import { CX } from '../config'
import { IPhone3D, type DeviceLogo } from '../kit/devices'
import { StageLight } from '../kit/light'
import { Body, clamp, ease, easeIn, easeInOut, fitSize } from '../kit/motion'
import { Shot, type Media } from '../kit/screens'
import { Letters } from '../kit/type'
import type { PhoneStep } from '../types'

const PHONE_W = 370
/** When the two side phones join the main one, in frames into the scene. */
const SIDE_AT = 150

/** Screens of a phone, each opening from the spot tapped before it. */
const MobileFlow: React.FC<{ steps: PhoneStep[] }> = ({ steps }) => {
  const f = useCurrentFrame()
  return (
    <>
      {steps.map((step, i) => {
        const next = steps[i + 1]
        if (f < step.at || (next && f >= next.at + 16)) return null
        if (!step.from) return <Shot key={i} media={step.media} />
        const t = ease(f, [step.at, step.at + 16], [0, 1])
        const [ox, oy] = step.from
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${ox * 100 * (1 - t)}%`,
              top: `${oy * 100 * (1 - t)}%`,
              width: '100%',
              height: '100%',
              transform: `scale(${0.1 + t * 0.9})`,
              transformOrigin: 'top left',
              borderRadius: 60 * (1 - t),
              overflow: 'hidden',
              opacity: Math.min(1, t * 3),
            }}
          >
            <Shot media={step.media} />
          </div>
        )
      })}
      {steps.slice(1).map((step) => {
        // A finger tap just before each screen opens
        const t = (f - step.at + 6) / 14
        if (!step.from || t < 0 || t > 1) return null
        return (
          <div
            key={`tap-${step.at}`}
            style={{
              position: 'absolute',
              left: `${step.from[0] * 100}%`,
              top: `${step.from[1] * 100}%`,
              width: 60,
              height: 60,
              marginLeft: -30,
              marginTop: -30,
              borderRadius: 30,
              background: `rgba(120,120,128,${0.55 * (1 - t)})`,
              transform: `scale(${0.6 + t * 0.8})`,
            }}
          />
        )
      })}
    </>
  )
}

/**
 * The mobile chapter. The iPhone turns out of the dark (back first so the
 * titanium and the camera catch the light), wakes facing us, then the camera
 * moves in while it navigates; two more iPhones join it in a lineup.
 */
export const Phone: React.FC<{
  len: number
  title: string
  flow: PhoneStep[]
  captions: { at: number; text: string }[]
  side: Media[]
  logo?: DeviceLogo
}> = ({ len, title, flow, captions, side, logo }) => {
  const f = useCurrentFrame()
  const { fps } = useVideoConfig()
  const rise = spring({
    frame: f,
    fps,
    config: { damping: 200, stiffness: 40 },
  })
  const turn = ease(f, [0, 58], [0, 1], easeInOut)
  const zoom = ease(f, [58, 92], [0, 1])
  const line = side.length
    ? spring({
        frame: f - SIDE_AT + 2,
        fps,
        config: { damping: 20, stiffness: 60 },
      })
    : 0
  const exit = ease(f, [len - 20, len], [0, 1], easeIn)
  const ry =
    interpolate(turn, [0, 1], [-200, 0]) + Math.sin((f - 58) / 30) * 4 * turn
  const rx = interpolate(turn, [0, 1], [16, 3]) + Math.sin(f / 34) * 1.5
  const rz = interpolate(turn, [0, 1], [-12, 0])
  const mainScale = (1 + 0.15 * zoom) * (1 - 0.3 * line)
  const screenOn = interpolate(ry, [-60, -15], [0, 1], clamp)
  const sidePhone = (dir: -1 | 1, media: Media, delay: number) => {
    const t = spring({
      frame: f - SIDE_AT - delay,
      fps,
      config: { damping: 20, stiffness: 60 },
    })
    if (t <= 0.001) return null
    const angle = dir * -22 * t + dir * -60 * (1 - t) + Math.sin(f / 30) * 3
    return (
      <div
        style={{
          position: 'absolute',
          left: CX - PHONE_W / 2,
          top: 380,
          transformStyle: 'preserve-3d',
          transform: `translate3d(${dir * (340 + (1 - t) * 520)}px, ${40 + exit * 900}px, -60px) scale(0.8) rotateY(${angle}deg)`,
        }}
      >
        <IPhone3D
          width={PHONE_W}
          angle={angle}
          logo={logo}
          screen={<Shot media={media} />}
        />
      </div>
    )
  }
  const caption = [...captions].reverse().find((c) => f >= c.at)
  const capT = caption ? ease(f, [caption.at, caption.at + 12], [0, 1]) : 0
  return (
    <AbsoluteFill>
      <StageLight y={60} w={60} h={42} opacity={rise * (1 - exit)} />
      <div
        style={{
          position: 'absolute',
          left: CX - 300,
          top: 1180,
          width: 600,
          height: 70,
          borderRadius: '50%',
          background:
            'radial-gradient(ellipse, rgba(255,255,255,0.12), transparent 70%)',
          opacity: rise * (1 - exit),
        }}
      />
      {/* Opacity on the preserve-3d elements themselves would flatten them */}
      <AbsoluteFill
        style={{
          perspective: 2200,
          perspectiveOrigin: '50% 55%',
          opacity: Math.min(1, rise * 1.5) * (1 - exit),
        }}
      >
        {side[0] && sidePhone(-1, side[0], 0)}
        {side[1] && sidePhone(1, side[1], 8)}
        <div
          style={{
            position: 'absolute',
            left: CX - PHONE_W / 2,
            top: 380,
            transformStyle: 'preserve-3d',
            transform: `translateY(${(1 - rise) * 520 + line * 40 + exit * 900}px) scale(${mainScale}) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg)`,
          }}
        >
          <IPhone3D
            width={PHONE_W}
            angle={ry}
            screenOn={screenOn}
            logo={logo}
            screen={<MobileFlow steps={flow} />}
          />
        </div>
      </AbsoluteFill>
      <div
        style={{
          position: 'absolute',
          top: 120,
          width: '100%',
          opacity: 1 - exit,
        }}
      >
        <Letters text={title} at={24} size={fitSize(title, 100)} silver />
        <div style={{ height: 56, marginTop: 6 }}>
          {caption && (
            <div
              key={caption.at}
              style={{
                opacity: capT,
                transform: `translateY(${(1 - capT) * 16}px)`,
                filter: capT < 1 ? `blur(${(1 - capT) * 6}px)` : undefined,
              }}
            >
              <Body size={42}>{caption.text}</Body>
            </div>
          )}
        </div>
      </div>
    </AbsoluteFill>
  )
}
