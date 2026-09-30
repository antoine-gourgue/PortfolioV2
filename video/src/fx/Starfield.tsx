import React, { useLayoutEffect, useRef } from 'react'
import { random, useCurrentFrame, useVideoConfig } from 'remotion'

/**
 * Warp-speed star streaks towards the camera. Each star's depth is a pure
 * function of the frame (wrapped with fract), so any frame renders the same
 * no matter which browser tab or order it is rendered in.
 */
export const Starfield: React.FC<{
  count?: number
  speed?: number
  color?: string
  opacity?: number
  seed?: string
  cx?: number
  cy?: number
}> = ({
  count = 320,
  speed = 0.02,
  color = '180,210,255',
  opacity = 1,
  seed = 'stars',
  cx,
  cy,
}) => {
  const ref = useRef<HTMLCanvasElement>(null)
  const frame = useCurrentFrame()
  const { width, height } = useVideoConfig()
  const ox = cx ?? width / 2
  const oy = cy ?? height / 2

  useLayoutEffect(() => {
    const ctx = ref.current?.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, width, height)
    ctx.globalCompositeOperation = 'lighter'
    const focal = width * 0.45
    for (let i = 0; i < count; i++) {
      const x = (random(`${seed}-x-${i}`) - 0.5) * 2
      const y = (random(`${seed}-y-${i}`) - 0.5) * 2.4
      const z0 = random(`${seed}-z-${i}`)
      const phase = (((z0 - frame * speed) % 1) + 1) % 1
      const z = 0.03 + phase * 0.97
      const zPrev = Math.min(z + speed * 2.5, 1)
      const sx = ox + (x / z) * focal
      const sy = oy + (y / z) * focal
      const px = ox + (x / zPrev) * focal
      const py = oy + (y / zPrev) * focal
      const a = opacity * Math.min(1, (1 - z) * 1.6)
      ctx.strokeStyle = `rgba(${color},${a})`
      ctx.lineWidth = Math.max(0.6, 2.4 * (1 - z))
      ctx.beginPath()
      ctx.moveTo(px, py)
      ctx.lineTo(sx, sy)
      ctx.stroke()
    }
  }, [frame, width, height, count, speed, color, opacity, seed, ox, oy])

  return (
    <canvas
      ref={ref}
      width={width}
      height={height}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    />
  )
}
