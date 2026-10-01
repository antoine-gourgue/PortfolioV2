import React from 'react'
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion'
import { BEAT, CX } from '../config'
import { MacBook3D, type DeviceLogo } from '../kit/devices'
import { StageLight } from '../kit/light'
import { clamp, ease, easeIn, fitSize } from '../kit/motion'
import { Shot, type Media } from '../kit/screens'
import { BeatWords, type Beat } from '../kit/type'
import type { Framed } from '../types'

const MAC_W = 700
const MAC_D = MAC_W * 0.68

// Where the windows land, in the machine's space (origin at the hinge
// centre, y up is negative), in the order they lift off
const SLOTS = [
  { w: 250, x: -330, y: -470, z: 250, ry: 16 },
  { w: 270, x: 320, y: -500, z: 340, ry: -14 },
  { w: 330, x: -270, y: -170, z: 470, ry: 10 },
  { w: 260, x: 340, y: -180, z: 380, ry: -18 },
  { w: 300, x: 10, y: -500, z: 90, ry: 4 },
]

/**
 * The MacBook rises out of the dark, orbits while its lid opens, the screen
 * wakes and its windows lift off into space; one word per beat above it.
 */
export const Laptop: React.FC<{
  len: number
  screen: Media
  beats: Beat[]
  windows: Framed[]
  logo?: DeviceLogo
}> = ({ len, screen, beats, windows, logo }) => {
  const f = useCurrentFrame()
  const { fps } = useVideoConfig()
  const enter = spring({
    frame: f,
    fps,
    config: { damping: 200, stiffness: 40 },
  })
  const lidT = spring({
    frame: f - 20,
    fps,
    config: { damping: 20, stiffness: 50, mass: 1.2 },
  })
  const orbit = ease(f, [0, len + 4], [38, -26])
  const tilt = interpolate(f, [0, len + 4], [-26, -14])
  const power = interpolate(f, [50, 60, 72], [0, 1.6, 1], clamp)
  const exit = ease(f, [len - 36, len + 4], [0, 1], easeIn)
  const camZ = interpolate(enter, [0, 1], [-1100, 0]) + exit * 1500
  // Words on the beat grid, sharing the time before the exit
  const until = len - 36
  const step = Math.max(
    BEAT,
    Math.floor((until - 60) / beats.length / BEAT) * BEAT
  )
  const longest = beats.reduce(
    (a, b) => (b.text.length > a.length ? b.text : a),
    ''
  )
  return (
    <AbsoluteFill style={{ background: '#000' }}>
      <StageLight y={62} w={70} h={40} opacity={enter} />
      {/* Opacity on the preserve-3d elements themselves would flatten them */}
      <AbsoluteFill
        style={{
          perspective: 2000,
          perspectiveOrigin: '50% 48%',
          opacity: enter * (1 - ease(f, [len - 10, len + 4], [0, 1])),
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: CX - MAC_W / 2,
            top: 900,
            width: MAC_W,
            height: 0,
            transformStyle: 'preserve-3d',
            transform: `translateZ(${camZ}px) rotateX(${tilt}deg) rotateY(${orbit}deg)`,
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
              lid={lidT * 104}
              sheen={interpolate(f, [30, len - 16], [0, 1], clamp)}
              logo={logo}
              screen={
                <>
                  <Shot
                    media={screen}
                    style={{ transform: `scale(${1.1 - f * 0.0004})` }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: power > 1 ? '#fff' : '#000',
                      opacity: power > 1 ? power - 1 : 1 - power,
                    }}
                  />
                </>
              }
            />
            {windows.slice(0, SLOTS.length).map((win, i) => {
              const s = SLOTS[i]
              const t = spring({
                frame: f - 70 - i * 12,
                fps,
                config: { damping: 22, stiffness: 55 },
              })
              if (t <= 0.001) return null
              // Portrait screens get narrower, not taller: they would cover
              // the words above the machine
              const h = Math.min(s.w / win.aspect, s.w * 0.9)
              const w = h * win.aspect
              const x = interpolate(t, [0, 1], [s.x * 0.2, s.x])
              const y =
                interpolate(t, [0, 1], [-MAC_W * 0.32, s.y]) +
                Math.sin((f + i * 17) / 24) * 8 * t
              const z =
                interpolate(t, [0, 1], [8, s.z]) + exit * (600 + i * 180)
              return (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    left: MAC_W / 2 + x - w / 2,
                    top: y - h / 2,
                    width: w,
                    height: h,
                    transform: `translateZ(${z}px) rotateY(${s.ry * t}deg) scale(${0.3 + t * 0.7})`,
                    opacity: Math.min(1, t * 3),
                    borderRadius: 12,
                    overflow: 'hidden',
                    boxShadow: '0 30px 70px rgba(0,0,0,0.55)',
                  }}
                >
                  <Shot media={win.media} />
                </div>
              )
            })}
          </div>
        </div>
      </AbsoluteFill>
      <div
        style={{
          position: 'absolute',
          top: 140,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <BeatWords
          size={fitSize(longest, 100)}
          until={until}
          words={beats.map((b, i) => ({ ...b, at: 60 + i * step }))}
        />
      </div>
    </AbsoluteFill>
  )
}
