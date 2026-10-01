import React from 'react'

/** Draws the subject's mark on a device back, at a size and in a colour. */
export type DeviceLogo = (size: number, color: string) => React.ReactNode

// Silver aluminium; `k` scales the lightness for shading
const ALU = [214, 216, 220]
const alu = (k: number) =>
  `rgb(${ALU.map((c) => Math.round(Math.max(0, Math.min(255, c * k)))).join(',')})`

// Keyboard rows as key widths in units, laid out across the well
const KEY_ROWS: { h: number; keys: number[] }[] = [
  { h: 0.034, keys: [1.4, ...Array(13).fill(1)] },
  { h: 0.062, keys: [...Array(13).fill(1), 1.5] },
  { h: 0.062, keys: [1.5, ...Array(13).fill(1)] },
  { h: 0.062, keys: [1.8, ...Array(11).fill(1), 1.7] },
  { h: 0.062, keys: [2.3, ...Array(10).fill(1), 2.2] },
  { h: 0.062, keys: [1, 1, 1, 1.25, 5.3, 1.25, 1, 3] },
]

/**
 * MacBook Pro in real CSS 3D. The base is a solid aluminium slab (stacked
 * slices with a rounded underside) whose deck carries a key-by-key
 * keyboard, speaker grilles and a glass trackpad; the lid has thickness,
 * a notched display with slim bezels and a logo on its back. Hinged on the
 * back edge; the parent sets the orbit. `sheen` (0-1) sweeps the light
 * across the aluminium; `logo` draws the mark on the back of the lid.
 */
export const MacBook3D: React.FC<{
  width: number
  lid: number
  screen: React.ReactNode
  sheen?: number
  logo?: DeviceLogo
}> = ({ width: W, lid, screen, sheen = 0, logo }) => {
  const D = W * 0.69
  const Tb = W * 0.028
  const Hl = W * 0.66
  const Tl = W * 0.011
  const r = W * 0.03
  const bz = W * 0.014
  const chin = W * 0.03
  const glare = sheen * 140 - 20
  const flat: React.CSSProperties = {
    position: 'absolute',
    left: 0,
    top: 0,
    width: W,
    height: D,
    transformOrigin: 'top center',
    borderRadius: r,
  }
  const wellX = 0.085 * W
  const wellW = 0.83 * W
  const keyGap = 0.006 * W
  let rowY = 0.05 * D
  return (
    <div
      style={{
        position: 'relative',
        width: W,
        height: 0,
        transformStyle: 'preserve-3d',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: -W * 0.45,
          top: 0,
          width: W * 1.9,
          height: D * 1.9,
          transformOrigin: 'top center',
          transform: `translateY(${Tb + 2}px) rotateX(90deg) translateY(${-D * 0.45}px)`,
          background:
            'radial-gradient(ellipse 34% 32% at 50% 50%, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 60%, transparent 100%), radial-gradient(ellipse 50% 46% at 50% 50%, rgba(190,210,255,0.13) 0%, transparent 72%)',
        }}
      />
      {Array.from({ length: 6 }, (_, i) => {
        const t = (i + 1) / 6
        // The underside rolls in, like the machined edge of the real base
        const inset = t * t * Tb * 0.7
        return (
          <div
            key={i}
            style={{
              ...flat,
              left: inset,
              width: W - inset * 2,
              height: D - inset,
              transform: `translateY(${Tb * t}px) rotateX(90deg)`,
              background: `linear-gradient(90deg, ${alu(0.62 - t * 0.2)}, ${alu(0.86 - t * 0.25)} 50%, ${alu(0.62 - t * 0.2)})`,
            }}
          />
        )
      })}
      <div
        style={{
          ...flat,
          transform: 'rotateX(90deg)',
          overflow: 'hidden',
          background: `linear-gradient(180deg, ${alu(0.97)}, ${alu(0.9)})`,
          boxShadow: `inset 0 0 0 1px ${alu(1.05)}`,
        }}
      >
        {[0.022, 0.908].map((x) => (
          <div
            key={x}
            style={{
              position: 'absolute',
              left: x * W,
              top: 0.05 * D,
              width: 0.07 * W,
              height: 0.4 * D,
              backgroundImage:
                'radial-gradient(circle, rgba(0,0,0,0.5) 0.9px, transparent 1.3px)',
              backgroundSize: '5px 5px',
            }}
          />
        ))}
        <div
          style={{
            position: 'absolute',
            left: wellX - 4,
            top: 0.05 * D - 4,
            width: wellW + 8,
            height: 0.39 * D + 8,
            borderRadius: 8,
            background: '#2a2a2d',
          }}
        />
        {KEY_ROWS.map((row, ri) => {
          const units = row.keys.reduce((a, k) => a + k, 0)
          const unit = (wellW - keyGap * (row.keys.length - 1)) / units
          const y = rowY
          rowY += row.h * D + 0.008 * D
          let x = wellX
          return row.keys.map((k, ki) => {
            const left = x
            x += k * unit + keyGap
            return (
              <div
                key={`${ri}-${ki}`}
                style={{
                  position: 'absolute',
                  left,
                  top: y,
                  width: k * unit,
                  height: row.h * D,
                  borderRadius: 3,
                  background: '#0f0f11',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.09)',
                }}
              />
            )
          })
        })}
        <div
          style={{
            position: 'absolute',
            left: 0.29 * W,
            top: 0.52 * D,
            width: 0.42 * W,
            height: 0.41 * D,
            borderRadius: 0.014 * W,
            background: `linear-gradient(180deg, ${alu(0.99)}, ${alu(0.94)})`,
            boxShadow:
              'inset 0 0 0 1px rgba(0,0,0,0.12), inset 0 1px 2px rgba(255,255,255,0.6)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 0.455 * W,
            bottom: -0.012 * D,
            width: 0.09 * W,
            height: 0.03 * D,
            borderRadius: '50%',
            background: 'rgba(0,0,0,0.14)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(100deg, transparent ${glare - 18}%, rgba(255,255,255,0.32) ${glare}%, transparent ${glare + 18}%)`,
          }}
        />
      </div>
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: -Hl - 1,
          width: W,
          height: Hl,
          transformOrigin: 'bottom center',
          transform: `rotateX(${lid - 90}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {Array.from({ length: 4 }, (_, j) => (
          <div
            key={j}
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: `${r}px ${r}px ${r * 0.4}px ${r * 0.4}px`,
              transform: `translateZ(${(-Tl * (j + 0.5)) / 4}px)`,
              background: `linear-gradient(90deg, ${alu(0.6)}, ${alu(0.82)} 50%, ${alu(0.6)})`,
            }}
          />
        ))}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: `${r}px ${r}px ${r * 0.4}px ${r * 0.4}px`,
            overflow: 'hidden',
            background: '#08080a',
            boxShadow: `inset 0 0 0 1.5px ${alu(0.55)}`,
            transform: 'translateZ(0.6px)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: bz,
              right: bz,
              top: bz,
              bottom: chin,
              borderRadius: r * 0.45,
              overflow: 'hidden',
              background: '#000',
            }}
          >
            {screen}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: `linear-gradient(115deg, transparent ${glare - 26}%, rgba(255,255,255,0.12) ${glare}%, transparent ${glare + 26}%)`,
              }}
            />
          </div>
          <div
            style={{
              position: 'absolute',
              left: W / 2 - W * 0.05,
              top: bz - 1,
              width: W * 0.1,
              height: W * 0.022,
              borderRadius: `0 0 ${W * 0.009}px ${W * 0.009}px`,
              background: '#08080a',
            }}
          />
        </div>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: `${r}px ${r}px ${r * 0.4}px ${r * 0.4}px`,
            transform: `rotateY(180deg) translateZ(${Tl + 0.6}px)`,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            background: `linear-gradient(${150 + sheen * 50}deg, ${alu(0.82)} 0%, ${alu(1.02)} 48%, ${alu(0.86)} 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {logo && (
            <div
              style={{ filter: 'drop-shadow(0 1px 0 rgba(255,255,255,0.6))' }}
            >
              {logo(W * 0.13, alu(0.7))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Natural titanium, lit by a key light at the front upper left
const TITANIUM = [182, 177, 168]
// A darker anodised frame, so an Android phone in a lineup does not read as
// another iPhone
const GRAPHITE = [112, 116, 124]
const metal = (k: number, base = TITANIUM) => {
  const m = Math.max(0.28, Math.min(1.32, k))
  return `rgb(${base.map((c) => Math.round(Math.min(255, c * m))).join(',')})`
}

/**
 * iPhone in natural titanium, built as a real volume: the frame is a stack
 * of rounded slices (so the edge stays solid and rounded at any angle),
 * glass front with the live screen, frosted back with a raised camera
 * plateau, and side buttons. `angle` is the rotateY the parent applies,
 * used to light the flanks and slide the reflections.
 */
export const IPhone3D: React.FC<{
  width: number
  screen: React.ReactNode
  angle?: number
  screenOn?: number
  logo?: DeviceLogo
  /** A generic Android phone instead: graphite frame, punch-hole camera. */
  android?: boolean
}> = ({ width: W, screen, angle = 0, screenOn = 1, logo, android }) => {
  const frame = android ? GRAPHITE : TITANIUM
  const H = W * 2.07
  const R = W * 0.17
  const T = W * 0.105
  const N = 12
  const th = (angle * Math.PI) / 180
  const lit = (d: number) => 0.5 + 0.8 * Math.max(0, d)
  const leftK = lit(0.5 * Math.cos(th) + 0.8 * Math.sin(th))
  const rightK = lit(-0.5 * Math.cos(th) - 0.8 * Math.sin(th))
  const glint = 50 + ((((angle % 360) + 540) % 360) - 180) * 0.9
  const rim = W * 0.014
  const bezel = W * 0.04
  const face: React.CSSProperties = {
    position: 'absolute',
    left: 0,
    top: 0,
    width: W,
    height: H,
    borderRadius: R,
    overflow: 'hidden',
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
  }
  const P = W * 0.46
  const lens = (x: number, y: number, d: number, key: string) => (
    <div
      key={key}
      style={{
        position: 'absolute',
        left: x * P - d / 2,
        top: y * P - d / 2,
        width: d,
        height: d,
        borderRadius: '50%',
        background:
          'radial-gradient(circle, #121214 0 50%, #54514c 51% 60%, #1c1b1a 61% 68%, #9a968e 69% 100%)',
        boxShadow: '0 3px 6px rgba(0,0,0,0.45)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: '26%',
          borderRadius: '50%',
          background:
            'radial-gradient(circle at 36% 34%, rgba(150,170,255,0.75) 0 7%, rgba(70,40,120,0.65) 18%, #06060a 46%)',
        }}
      />
    </div>
  )
  const button = (side: -1 | 1, top: number, len: number) => (
    <div
      key={`${side}-${top}`}
      style={{
        position: 'absolute',
        left: side < 0 ? -1.5 - T * 0.25 : W + 1.5 - T * 0.25,
        top: H * top,
        width: T * 0.5,
        height: H * len,
        borderRadius: T * 0.25,
        background: metal((side < 0 ? leftK : rightK) * 0.95, frame),
        transform: `rotateY(${side * 90}deg)`,
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
      }}
    />
  )
  return (
    <div
      style={{
        position: 'relative',
        width: W,
        height: H,
        transformStyle: 'preserve-3d',
      }}
    >
      {Array.from({ length: N }, (_, i) => {
        const t = (i / (N - 1)) * 2 - 1
        // Rounded profile: outer slices step inwards like a radiused edge
        const inset = (1 - Math.sqrt(1 - t * t)) * T * 0.28
        const k = 1 - Math.abs(t) * 0.22
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: inset,
              top: inset,
              width: W - inset * 2,
              height: H - inset * 2,
              borderRadius: R - inset,
              transform: `translateZ(${(t * T) / 2}px)`,
              background: `linear-gradient(180deg, rgba(255,255,255,0.12), rgba(0,0,0,0.18)), linear-gradient(90deg, ${metal(leftK * k, frame)}, ${metal(0.95 * k, frame)} 50%, ${metal(rightK * k, frame)})`,
            }}
          />
        )
      })}
      {button(-1, 0.19, 0.045)}
      {button(-1, 0.27, 0.075)}
      {button(-1, 0.37, 0.075)}
      {button(1, 0.29, 0.11)}
      {/* The glass sits just inside the frame so a titanium rim shows */}
      <div
        style={{
          ...face,
          left: rim,
          top: rim,
          width: W - rim * 2,
          height: H - rim * 2,
          borderRadius: R - rim,
          transform: `translateZ(${T / 2 + 0.6}px)`,
          background: '#050506',
          boxShadow: `inset 0 0 0 ${W * 0.004}px #2c2c2e`,
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: bezel,
            top: bezel,
            right: bezel,
            bottom: bezel,
            borderRadius: R - bezel,
            overflow: 'hidden',
            background: '#000',
          }}
        >
          {screen}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: '#000',
              opacity: 1 - screenOn,
            }}
          />
          <div
            style={{
              position: 'absolute',
              // The Dynamic Island, or a punch-hole camera on Android
              top: android ? W * 0.032 : W * 0.03,
              left: '50%',
              width: android ? W * 0.04 : W * 0.3,
              height: android ? W * 0.04 : W * 0.085,
              marginLeft: android ? -W * 0.02 : -W * 0.15,
              borderRadius: W,
              background: '#000',
            }}
          />
        </div>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(115deg, transparent ${glint - 22}%, rgba(255,255,255,0.13) ${glint}%, transparent ${glint + 22}%)`,
          }}
        />
      </div>
      <div
        style={{
          ...face,
          transform: `rotateY(180deg) translateZ(${T / 2 + 0.6}px)`,
          background:
            'linear-gradient(160deg, #d9d5cd 0%, #c3beb4 45%, #aea99f 100%)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(115deg, transparent ${100 - glint - 25}%, rgba(255,255,255,0.35) ${100 - glint}%, transparent ${100 - glint + 25}%)`,
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: W * 0.05,
            top: W * 0.05,
            width: P,
            height: P,
            borderRadius: W * 0.13,
            background: 'linear-gradient(145deg, #cfcac1, #aca79e)',
            boxShadow:
              '0 4px 10px rgba(0,0,0,0.35), inset 0 0 0 1.5px rgba(255,255,255,0.45), inset 0 -2px 3px rgba(0,0,0,0.15)',
          }}
        >
          {lens(0.29, 0.27, P * 0.42, 'wide')}
          {lens(0.29, 0.73, P * 0.42, 'ultra')}
          {lens(0.73, 0.5, P * 0.42, 'tele')}
          <div
            style={{
              position: 'absolute',
              left: 0.73 * P - P * 0.065,
              top: 0.16 * P - P * 0.065,
              width: P * 0.13,
              height: P * 0.13,
              borderRadius: '50%',
              background:
                'radial-gradient(circle, #fff8e2, #d8cfb4 60%, #9c958a)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 0.73 * P - P * 0.06,
              top: 0.84 * P - P * 0.06,
              width: P * 0.12,
              height: P * 0.12,
              borderRadius: '50%',
              background: 'radial-gradient(circle, #2a2a2e, #0c0c0e)',
            }}
          />
        </div>
        {logo && (
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              filter: 'drop-shadow(0 1px 0 rgba(255,255,255,0.5))',
            }}
          >
            {logo(W * 0.26, '#9a958c')}
          </div>
        )}
      </div>
    </div>
  )
}
