import React, { useMemo } from 'react'
import { interpolate, random, useCurrentFrame } from 'remotion'

/**
 * Layered neural network: edges draw on progressively (`reveal` 0..1) and
 * signal pulses run through them once drawn. Node positions are jittered
 * so it feels organic rather than like a textbook diagram.
 */
export const NeuralNet: React.FC<{
  layers: number[]
  x: number
  y: number
  width: number
  height: number
  reveal: number
  colorA?: string
  colorB?: string
  seed?: string
}> = ({
  layers,
  x,
  y,
  width,
  height,
  reveal,
  colorA = '#3ad6ff',
  colorB = '#7b5cff',
  seed = 'nn',
}) => {
  const frame = useCurrentFrame()

  const { nodes, edges } = useMemo(() => {
    const nodes: { x: number; y: number; l: number }[][] = layers.map(
      (count, l) =>
        Array.from({ length: count }, (_, i) => ({
          x:
            x +
            (width * l) / (layers.length - 1) +
            (random(`${seed}-nx-${l}-${i}`) - 0.5) * 30,
          y:
            y +
            (height * (i + 0.5)) / count +
            (random(`${seed}-ny-${l}-${i}`) - 0.5) * 24,
          l,
        }))
    )
    const edges: {
      a: (typeof nodes)[0][0]
      b: (typeof nodes)[0][0]
      k: number
    }[] = []
    for (let l = 0; l < layers.length - 1; l++) {
      nodes[l].forEach((a, i) =>
        nodes[l + 1].forEach((b, j) => {
          // Drop some edges: a fully connected mesh reads as grey mush
          if (random(`${seed}-e-${l}-${i}-${j}`) < 0.62) {
            edges.push({ a, b, k: random(`${seed}-k-${l}-${i}-${j}`) })
          }
        })
      )
    }
    return { nodes, edges }
  }, [layers, x, y, width, height, seed])

  const L = layers.length - 1

  return (
    <svg
      width="100%"
      height="100%"
      style={{ position: 'absolute', inset: 0, overflow: 'visible' }}
    >
      <defs>
        <linearGradient id={`${seed}-grad`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor={colorA} />
          <stop offset="100%" stopColor={colorB} />
        </linearGradient>
        <radialGradient id={`${seed}-glow`}>
          <stop offset="0%" stopColor="#fff" stopOpacity={1} />
          <stop offset="35%" stopColor={colorA} stopOpacity={0.9} />
          <stop offset="100%" stopColor={colorA} stopOpacity={0} />
        </radialGradient>
      </defs>
      {edges.map((e, i) => {
        const start = e.a.l / L
        const local = interpolate(
          reveal,
          [start * 0.8, start * 0.8 + 0.3],
          [0, 1],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        )
        if (local <= 0) return null
        const bx = e.a.x + (e.b.x - e.a.x) * local
        const by = e.a.y + (e.b.y - e.a.y) * local
        const period = 34 + Math.round(e.k * 40)
        const phase = ((frame + e.k * 200) % period) / period
        const pulse = local >= 1 && e.k > 0.55
        return (
          <g key={i}>
            <line
              x1={e.a.x}
              y1={e.a.y}
              x2={bx}
              y2={by}
              stroke={`url(#${seed}-grad)`}
              strokeOpacity={0.14 + e.k * 0.22}
              strokeWidth={1.2}
            />
            {pulse && (
              <circle
                cx={e.a.x + (e.b.x - e.a.x) * phase}
                cy={e.a.y + (e.b.y - e.a.y) * phase}
                r={3.2}
                fill="#fff"
                opacity={Math.sin(Math.PI * phase)}
              />
            )}
          </g>
        )
      })}
      {nodes.flat().map((n, i) => {
        const appear = interpolate(
          reveal,
          [(n.l / L) * 0.8, (n.l / L) * 0.8 + 0.12],
          [0, 1],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        )
        if (appear <= 0) return null
        const fire =
          0.5 + 0.5 * Math.sin(frame * 0.15 + random(`${seed}-f-${i}`) * 20)
        return (
          <g key={`n${i}`} opacity={appear}>
            <circle
              cx={n.x}
              cy={n.y}
              r={16 + fire * 10}
              fill={`url(#${seed}-glow)`}
              opacity={0.35 + fire * 0.4}
            />
            <circle cx={n.x} cy={n.y} r={5 * appear} fill="#fff" />
          </g>
        )
      })}
    </svg>
  )
}
