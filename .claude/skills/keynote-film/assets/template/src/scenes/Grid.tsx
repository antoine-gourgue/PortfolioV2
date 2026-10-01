import React from 'react'
import {
  AbsoluteFill,
  Img,
  interpolate,
  random,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion'
import { CX, fonts } from '../config'
import { StageLight } from '../kit/light'
import { Body, Rise, ease, easeIn, fitSize, scatter3D } from '../kit/motion'
import { mediaSrc } from '../kit/screens'
import { Letters } from '../kit/type'
import type { Icon } from '../types'

const SIZE = 150
const GAP = 42

const columns = (n: number) => (n <= 4 ? n : n <= 6 || n === 9 ? 3 : 4)

const Tile: React.FC<{ icon: Icon }> = ({ icon }) =>
  icon.src ? (
    <Img
      src={mediaSrc(icon.src)}
      style={{
        width: '100%',
        height: '100%',
        objectFit: icon.pad ? 'contain' : 'cover',
        padding: icon.pad ? '14%' : 0,
        boxSizing: 'border-box',
      }}
    />
  ) : (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: fonts.display,
        fontWeight: 800,
        fontSize: SIZE * 0.42,
        letterSpacing: '-0.04em',
        color: '#fff',
      }}
    >
      {icon.label.slice(0, 1)}
    </div>
  )

/**
 * App icons converge out of deep space into a grid, ripple, then blow past
 * the camera.
 */
export const Grid: React.FC<{
  len: number
  title: string
  subtitle: string
  icons: Icon[]
}> = ({ len, title, subtitle, icons }) => {
  const f = useCurrentFrame()
  const { fps } = useVideoConfig()
  const cols = columns(icons.length)
  const rows = Math.ceil(icons.length / cols)
  const exit = ease(f, [len - 22, len + 4], [0, 1], easeIn)
  const settled = ease(f, [40, 60], [0, 1])
  return (
    <AbsoluteFill>
      <StageLight y={58} w={60} opacity={1 - exit} />
      <AbsoluteFill style={{ perspective: 1500, perspectiveOrigin: '50% 56%' }}>
        <div
          style={{
            position: 'absolute',
            left: CX,
            top: 770,
            transformStyle: 'preserve-3d',
            transform: `rotateX(${interpolate(f, [0, len], [16, -6])}deg) rotateY(${interpolate(f, [0, len], [24, -16])}deg)`,
          }}
        >
          {icons.map((icon, i) => {
            const col = i % cols
            const row = Math.floor(i / cols)
            const cx = (cols - 1) / 2
            const cy = (rows - 1) / 2
            const s = scatter3D(i, 'icons')
            const t = spring({
              frame: f - 2 - i * 2.5,
              fps,
              config: { damping: 18, stiffness: 60 },
            })
            const wave =
              Math.sin(f / 9 - Math.hypot(col - cx, row - cy) * 1.1) *
              26 *
              settled
            const spread = 1 + exit * 0.8
            const x = interpolate(t, [0, 1], [s.x, (col - cx) * (SIZE + GAP)])
            const y = interpolate(t, [0, 1], [s.y, (row - cy) * (SIZE + GAP)])
            const z =
              interpolate(t, [0, 1], [s.z, 0]) +
              wave +
              exit * (900 + random(`burst-${i}`) * 1400)
            return (
              <div
                key={icon.label + i}
                style={{
                  position: 'absolute',
                  left: -SIZE / 2,
                  top: -SIZE / 2,
                  width: SIZE,
                  height: SIZE,
                  transform: `translate3d(${x * spread}px, ${y * spread}px, ${z}px) rotateX(${s.rx * (1 - t)}deg) rotateY(${s.ry * (1 - t)}deg)`,
                  opacity:
                    Math.min(1, t * 2) *
                    (1 - ease(f, [len - 8, len + 4], [0, 1])),
                  borderRadius: '22%',
                  overflow: 'hidden',
                  background:
                    icon.bg ??
                    (icon.src
                      ? '#fff'
                      : `linear-gradient(160deg, ${icon.color ?? '#0a84ff'}, ${icon.color ?? '#0a84ff'}aa)`),
                  boxShadow:
                    '0 20px 50px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08)',
                }}
              >
                <Tile icon={icon} />
              </div>
            )
          })}
        </div>
      </AbsoluteFill>
      <div
        style={{
          position: 'absolute',
          top: 170,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          opacity: 1 - ease(f, [len - 24, len - 10], [0, 1]),
          transform: `scale(${1 + f * 0.0006})`,
        }}
      >
        <Letters text={title} at={26} size={fitSize(title, 124)} silver />
        <Rise at={48}>
          <Body size={44}>{subtitle}</Body>
        </Rise>
      </div>
    </AbsoluteFill>
  )
}
