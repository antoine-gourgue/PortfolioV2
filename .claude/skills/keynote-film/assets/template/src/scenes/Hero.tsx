import React from 'react'
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion'
import { fonts } from '../config'
import { StageLight } from '../kit/light'
import { Body, Rise, clamp, ease, easeIn, fitSize } from '../kit/motion'
import { Shot } from '../kit/screens'
import type { Framed } from '../types'

const STRIP_H = 300

/**
 * The hero word, its letters cut out of real screens scrolling inside them.
 * Starts so close the letters are abstract shapes, pulls back to the word,
 * then flies through one of its letters.
 */
export const Hero: React.FC<{
  len: number
  word: string
  line: string
  strip: Framed[]
  through?: string
}> = ({ len, word, line, strip, through = '50% 55%' }) => {
  const f = useCurrentFrame()
  const { fps } = useVideoConfig()
  const pull = spring({
    frame: f,
    fps,
    config: { damping: 200, stiffness: 30, mass: 1.4 },
  })
  const exit = ease(f, [len - 24, len + 4], [0, 1], easeIn)
  const scale =
    (interpolate(pull, [0, 1], [5, 1]) + f * 0.0005) * Math.pow(60, exit)
  const sweep = interpolate(f, [44, 84], [-30, 130], clamp)
  const scroll = interpolate(f, [0, len + 6], [40, 520])
  const size = fitSize(word, 184, 1000)
  const type: React.CSSProperties = {
    fontFamily: fonts.display,
    fontSize: size,
    fontWeight: 800,
    letterSpacing: '-0.055em',
    lineHeight: 1.1,
    whiteSpace: 'nowrap',
    // Negative tracking pulls the box in past the last glyph: pad it back
    padding: '0 0.08em',
  }
  // Repeat the screens until the strip outlasts the scroll
  const tiles: Framed[] = []
  for (let w = 0; w < 2600 && strip.length; ) {
    const t = strip[tiles.length % strip.length]
    tiles.push(t)
    w += STRIP_H * t.aspect
  }
  return (
    <AbsoluteFill style={{ background: '#000' }}>
      <div
        style={{
          position: 'absolute',
          top: 520,
          left: 0,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {/* White letters on black, the screens multiplied over them: the
            screens only show through the letters, and any media works,
            not just images a background-clip could take */}
        <div
          style={{
            position: 'relative',
            transform: `scale(${scale})`,
            transformOrigin: through,
            background: '#000',
            isolation: 'isolate',
          }}
        >
          <div style={{ ...type, color: '#fff' }}>{word}</div>
          {/* Kept inside the box's edge: where the scaled box is
              antialiased its black is partly transparent, and the
              multiply would leak the screens there as a thin outline */}
          <div
            style={{
              position: 'absolute',
              inset: 3,
              overflow: 'hidden',
              mixBlendMode: 'multiply',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '50%',
                marginTop: -STRIP_H / 2,
                left: -scroll,
                height: STRIP_H,
                display: 'flex',
              }}
            >
              {tiles.map((t, i) => (
                <div
                  key={i}
                  style={{
                    position: 'relative',
                    width: STRIP_H * t.aspect,
                    height: STRIP_H,
                    flexShrink: 0,
                  }}
                >
                  <Shot media={t.media} />
                </div>
              ))}
            </div>
          </div>
          <div
            style={{
              ...type,
              position: 'absolute',
              inset: 0,
              backgroundImage: `linear-gradient(105deg, transparent ${sweep - 12}%, rgba(255,255,255,0.75) ${sweep}%, transparent ${sweep + 12}%)`,
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            {word}
          </div>
        </div>
      </div>
      {/* Light added over everything, so the word's black box never shows */}
      <StageLight
        y={45}
        w={70}
        opacity={0.8 * (1 - exit)}
        style={{ mixBlendMode: 'screen' }}
      />
      <div
        style={{
          position: 'absolute',
          top: 800,
          width: '100%',
          opacity: 1 - ease(f, [len - 28, len - 16], [0, 1]),
        }}
      >
        <Rise at={50}>
          <Body size={46}>{line}</Body>
        </Rise>
      </div>
    </AbsoluteFill>
  )
}
