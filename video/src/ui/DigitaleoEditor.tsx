import React from 'react'
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion'
import { fonts } from '../brand'
import { Cursor, Icon, keyframes } from './Apps'
import { clamp, easeInOut, easeOut } from './Primitives'

// Native design size; the component scales it to the requested width
const W = 1440
const H = 760

const orange = '#f26a36'
const navy = '#2b2a5c'
const line = '#dfe1e6'
const text = '#2d2f36'
const muted = '#8a8f99'

// When things happen, in editor frames (see `speed`)
const T = {
  step: 6,
  subject: 12,
  preheader: 40,
  cursorIn: 50,
  grab: 62,
  drop: 86,
  toggle: 104,
  mobile: 108,
}

const SUBJECT = 'Les soldes d’été commencent ☀️'
const PREHEADER = '-30 % sur toute la boutique, ce week-end seulement'

const typed = (s: string, e: number, start: number, cps: number) =>
  s.slice(0, Math.max(0, Math.min(s.length, Math.floor((e - start) * cps))))

const MENU: [string, string, number?][] = [
  ['chart_pie_fill', 'Tableau de bord'],
  ['paperplane_fill', 'Opérations'],
  ['bubble_left_fill', 'Boîte de réception', 64],
  ['house_fill', 'Visibilité locale'],
  ['photo_on_rectangle', 'Médiathèque'],
  ['person_3_fill', 'Affiliés'],
  ['speaker_2_fill', 'Campagnes'],
  ['phone_fill', 'Call tracking'],
]

const STEPS = ['Informations', 'Diffusion', 'Canaux', 'Publication']

const BLOCKS: [string, string][] = [
  ['textformat', 'Texte'],
  ['photo_fill', 'Image'],
  ['capsule_fill', 'Bouton'],
  ['square_split_2x1', '2 colonnes'],
  ['minus', 'Séparateur'],
  ['person_2_fill', 'Réseaux'],
  ['play_rectangle_fill', 'Vidéo'],
  ['chevron_left_slash_chevron_right', 'HTML'],
]

// Geometry of the builder, in native pixels
const CANVAS = { x: 305, y: 362, w: 820, h: 398 }
const PALETTE = { x: 1145, y: 362 }
const TILE = { w: 112, h: 66, gap: 10 }
const tilePos = (i: number) => ({
  x: PALETTE.x + (i % 2) * (TILE.w + TILE.gap),
  y: PALETTE.y + 34 + Math.floor(i / 2) * (TILE.h + TILE.gap),
})
const GRAB_TILE = 3
const DROP_Y = 318

export const DigitaleoWordmark: React.FC<{ size: number; color?: string }> = ({
  size,
  color = navy,
}) => (
  <div
    style={{
      fontFamily: fonts.display,
      fontSize: size,
      fontWeight: 600,
      color,
      letterSpacing: '-0.01em',
    }}
  >
    Digitaleo
  </div>
)

const Button: React.FC<{ children: React.ReactNode; w: number }> = ({
  children,
  w,
}) => (
  <div
    style={{
      width: w,
      height: 34,
      border: `1px solid ${line}`,
      borderRadius: 4,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      fontSize: 14,
      color: text,
      background: '#fff',
    }}
  >
    {children}
  </div>
)

const Field: React.FC<{
  label: string
  value: string
  caret?: boolean
  lock?: boolean
  emoji?: boolean
  top: number
  children?: React.ReactNode
}> = ({ label, value, caret, lock, emoji, top, children }) => (
  <div
    style={{
      position: 'absolute',
      left: 305,
      top,
      width: 1080,
      height: 36,
      display: 'flex',
      borderBottom: `1px solid ${line}`,
      fontSize: 14,
    }}
  >
    <div
      style={{
        width: 112,
        background: '#f7f8fa',
        borderRight: `1px solid ${line}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 10px',
        color: muted,
      }}
    >
      {label}
      {lock && <Icon name="lock_fill" size={14} color={orange} />}
    </div>
    <div
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        padding: '0 12px',
        color: text,
        whiteSpace: 'nowrap',
      }}
    >
      {value}
      {caret && (
        <span
          style={{
            display: 'inline-block',
            width: 1.5,
            height: 17,
            marginLeft: 1,
            background: text,
          }}
        />
      )}
    </div>
    {children}
    {emoji && (
      <div
        style={{
          width: 44,
          borderLeft: `1px solid ${line}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon name="smiley" size={17} color={muted} />
      </div>
    )}
  </div>
)

const Product: React.FC<{
  name: string
  price: string
  icon: string
  tint: [string, string]
  w: number
}> = ({ name, price, icon, tint, w }) => (
  <div style={{ width: w, fontFamily: 'Arial, sans-serif' }}>
    <div
      style={{
        height: 96,
        borderRadius: 4,
        background: `linear-gradient(135deg, ${tint[0]}, ${tint[1]})`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Icon name={icon} size={40} color="rgba(255,255,255,0.9)" />
    </div>
    <div style={{ marginTop: 8, fontSize: 14, fontWeight: 700, color: '#222' }}>
      {name}
    </div>
    <div style={{ fontSize: 13, color: orange, fontWeight: 700 }}>{price}</div>
  </div>
)

/**
 * The Digitaleo email editor, rebuilt as a live page rather than a
 * screenshot: the campaign reaches its "Canaux" step, the subject and
 * preheader are typed, a two-column block is dragged into the email, then
 * the preview switches to mobile and the columns stack in reverse order,
 * the editor features Antoine shipped.
 *
 * `speed` compresses the timeline for shorter scenes.
 */
export const DigitaleoEditor: React.FC<{
  width: number
  start?: number
  speed?: number
}> = ({ width, start = 0, speed = 1 }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const e = (frame - start) * speed
  const scale = width / W

  const step = interpolate(e, [T.step, T.step + 12], [0, 1], {
    ...clamp,
    easing: easeInOut,
  })
  const subject = typed(SUBJECT, e, T.subject, 34 / fps)
  const preheader = typed(PREHEADER, e, T.preheader, 44 / fps)
  const typingSubject = e >= T.subject && subject.length < SUBJECT.length
  const typingPre =
    e >= T.preheader && preheader.length < PREHEADER.length && !typingSubject

  const grab = tilePos(GRAB_TILE)
  const dropX = CANVAS.x + CANVAS.w / 2 - 40
  const dropY = CANVAS.y + DROP_Y - 60
  const cx = keyframes(e, [
    { f: T.cursorIn, v: 1250 },
    { f: T.grab - 2, v: grab.x + 50 },
    { f: T.drop, v: dropX },
    { f: T.toggle - 4, v: 1352 },
  ])
  const cy = keyframes(e, [
    { f: T.cursorIn, v: 720 },
    { f: T.grab - 2, v: grab.y + 30 },
    { f: T.drop, v: dropY },
    { f: T.toggle - 4, v: 128 },
  ])
  const dragging = e >= T.grab && e < T.drop
  const pressed = dragging || (e >= T.toggle - 2 && e < T.toggle + 3)
  const cursorOpacity = interpolate(
    e,
    [T.cursorIn, T.cursorIn + 6, T.mobile + 14, T.mobile + 22],
    [0, 1, 1, 0],
    clamp
  )

  const insert = interpolate(e, [T.drop, T.drop + 14], [0, 1], {
    ...clamp,
    easing: easeOut,
  })
  const m = interpolate(e, [T.mobile, T.mobile + 18], [0, 1], {
    ...clamp,
    easing: easeInOut,
  })

  // Email layout: desktop 560px wide, mobile 320px
  const ew = interpolate(m, [0, 1], [560, 320])
  const heroH = interpolate(m, [0, 1], [170, 150])
  const colW = (ew - 60) / 2
  const cardH = 150
  const blockH = interpolate(m, [0, 1], [cardH + 30, cardH * 2 + 44]) * insert
  const heroTop = 84
  const blockTop = heroTop + heroH + 12
  const scroll =
    interpolate(insert, [0, 1], [0, 40]) + interpolate(m, [0, 1], [0, 150])

  // A screen-recording camera: it zooms onto whatever is happening (the
  // fields being typed, the drop, the mobile switch) so the page stays
  // legible once scaled down, then pulls back to the whole editor
  const zoom = keyframes(e, [
    { f: 8, v: 1 },
    { f: 22, v: 1.6 },
    { f: 50, v: 1.6 },
    { f: 60, v: 1.35 },
    { f: 94, v: 1.35 },
    { f: 102, v: 1.12 },
    { f: 110, v: 1.3 },
    { f: 132, v: 1.3 },
    { f: 146, v: 1 },
  ])
  const fx = keyframes(e, [
    { f: 8, v: W / 2 },
    { f: 22, v: 760 },
    { f: 50, v: 760 },
    { f: 60, v: 960 },
    { f: 94, v: 960 },
    { f: 102, v: 1000 },
    { f: 110, v: 715 },
    { f: 132, v: 715 },
    { f: 146, v: W / 2 },
  ])
  const fy = keyframes(e, [
    { f: 8, v: H / 2 },
    { f: 22, v: 250 },
    { f: 50, v: 250 },
    { f: 60, v: 540 },
    { f: 94, v: 540 },
    { f: 102, v: 380 },
    { f: 110, v: 560 },
    { f: 132, v: 560 },
    { f: 146, v: H / 2 },
  ])
  const tx = Math.min(0, Math.max(W - W * zoom, W / 2 - fx * zoom))
  const ty = Math.min(0, Math.max(H - H * zoom, H / 2 - fy * zoom))

  return (
    <div
      style={{
        width,
        height: H * scale,
        overflow: 'hidden',
        position: 'relative',
        background: '#f4f5f8',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: W,
          height: H,
          transform: `scale(${scale}) translate(${tx}px, ${ty}px) scale(${zoom})`,
          transformOrigin: 'top left',
          fontFamily: fonts.body,
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: 240,
            height: H,
            background: '#fbfbfc',
            borderRight: `1px solid ${line}`,
          }}
        >
          <div style={{ position: 'absolute', left: 24, top: 18 }}>
            <DigitaleoWordmark size={32} />
          </div>
          {MENU.map(([icon, label, count], i) => (
            <div
              key={label}
              style={{
                position: 'absolute',
                left: 20,
                top: 92 + i * 42,
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                fontSize: 15,
                color: i === 1 ? orange : text,
              }}
            >
              <Icon
                name={icon}
                size={18}
                color={i === 1 ? orange : '#b5b9c2'}
              />
              {label}
              {count && (
                <span
                  style={{
                    background: orange,
                    color: '#fff',
                    fontSize: 11,
                    fontWeight: 700,
                    borderRadius: 8,
                    padding: '1px 6px',
                  }}
                >
                  {count}
                </span>
              )}
            </div>
          ))}
        </div>

        {STEPS.map((label, i) => {
          const x = 660 + i * 120
          const on = i < 2 || (i === 2 && step > 0.5)
          const current = i === 2 && step > 0.5
          return (
            <React.Fragment key={label}>
              {i > 0 && (
                <div
                  style={{
                    position: 'absolute',
                    left: x - 108,
                    top: 33,
                    width: 96,
                    height: 2,
                    background: line,
                  }}
                >
                  <div
                    style={{
                      width: `${(i < 2 ? 1 : i === 2 ? step : 0) * 100}%`,
                      height: '100%',
                      background: orange,
                    }}
                  />
                </div>
              )}
              <div
                style={{
                  position: 'absolute',
                  left: x - 12,
                  top: 22,
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  background: on ? orange : '#e4e6ea',
                  color: on ? '#fff' : muted,
                  fontSize: 12,
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: current
                    ? `0 0 0 ${4 + (1 - step) * 6}px rgba(242,106,54,0.18)`
                    : undefined,
                }}
              >
                {i + 1}
              </div>
              <div
                style={{
                  position: 'absolute',
                  left: x - 60,
                  top: 54,
                  width: 120,
                  textAlign: 'center',
                  fontSize: 14,
                  color: current ? orange : i < 2 ? text : muted,
                }}
              >
                {label}
              </div>
            </React.Fragment>
          )
        })}

        <div
          style={{
            position: 'absolute',
            left: 280,
            top: 96,
            width: 1130,
            height: H,
            background: '#fff',
            borderRadius: 8,
            boxShadow: '0 1px 6px rgba(20,24,40,0.08)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 305,
            top: 112,
            display: 'flex',
            gap: 10,
            alignItems: 'center',
          }}
        >
          <div style={{ position: 'relative', width: 40, height: 34 }}>
            <Icon name="envelope_fill" size={30} color="#c9ccd3" />
            <div
              style={{
                position: 'absolute',
                right: 0,
                bottom: 2,
                width: 18,
                height: 18,
                borderRadius: 9,
                background: '#3cc26b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon name="checkmark_alt" size={11} color="#fff" />
            </div>
          </div>
          <Button w={96}>Historique</Button>
          <Button w={150}>Changer de modèle</Button>
          <Button w={196}>Enregistrer comme modèle</Button>
        </div>
        <div
          style={{
            position: 'absolute',
            right: 55,
            top: 112,
            display: 'flex',
            gap: 8,
          }}
        >
          <Button w={120}>
            <Icon name="eye_fill" size={15} color={text} />
            Prévisualiser
          </Button>
          <div
            style={{
              display: 'flex',
              height: 34,
              border: `1px solid ${line}`,
              borderRadius: 4,
              overflow: 'hidden',
            }}
          >
            {['desktopcomputer', 'device_phone_portrait'].map((icon, i) => {
              const active = i === 1 ? m > 0.02 : m <= 0.02
              return (
                <div
                  key={icon}
                  style={{
                    width: 40,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: active ? orange : '#fff',
                  }}
                >
                  <Icon name={icon} size={16} color={active ? '#fff' : text} />
                </div>
              )
            })}
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            left: 305,
            top: 166,
            fontSize: 28,
            color: '#23252b',
          }}
        >
          Nouvel email
        </div>
        <div
          style={{
            position: 'absolute',
            left: 305,
            top: 212,
            width: 1080,
            height: 109,
            border: `1px solid ${line}`,
            borderBottom: 'none',
          }}
        />
        <Field label="Expéditeur" value="Digitaleo Store" lock top={212}>
          <div
            style={{
              width: 480,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '0 12px',
              background: '#eef0f3',
              color: muted,
              borderLeft: `1px solid ${line}`,
            }}
          >
            Adresse de réponse
            <span style={{ color: text }}>noreply@digitaleo.com</span>
          </div>
        </Field>
        <Field
          label="Objet"
          value={subject}
          caret={typingSubject}
          lock
          emoji
          top={248}
        />
        <Field
          label="Préheader"
          value={preheader}
          caret={typingPre}
          emoji
          top={284}
        />
        <div
          style={{
            position: 'absolute',
            left: 305,
            top: 332,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            fontSize: 14,
            color: text,
          }}
        >
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 3,
              background: orange,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon name="checkmark_alt" size={12} color="#fff" />
          </div>
          L’affilié peut modifier la structure
        </div>

        <div
          style={{
            position: 'absolute',
            left: CANVAS.x,
            top: CANVAS.y,
            width: CANVAS.w,
            height: CANVAS.h,
            background: '#eceef2',
            border: `1px solid ${line}`,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: (CANVAS.w - ew) / 2,
              top: 14 - scroll,
              width: ew,
              height: 900,
              background: '#fff',
              fontFamily: 'Arial, sans-serif',
              boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 10,
                width: '100%',
                textAlign: 'center',
                fontSize: 11,
                color: muted,
              }}
            >
              L’email ne s’affiche pas correctement ?{' '}
              <u style={{ color: text }}>Cliquez ici</u>
            </div>
            <div
              style={{
                position: 'absolute',
                top: 36,
                width: '100%',
                textAlign: 'center',
                fontSize: 20,
                fontWeight: 800,
                letterSpacing: '0.3em',
                color: '#1b3a4b',
              }}
            >
              OCÉANE
            </div>
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: heroTop,
                width: ew,
                height: heroH,
                background:
                  'linear-gradient(135deg, #ff8a4c 0%, #f26a36 45%, #ffb36b 100%)',
                color: '#fff',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  right: -30 + m * 40,
                  top: -40,
                  width: 140,
                  height: 140,
                  borderRadius: 70,
                  background: 'rgba(255,230,120,0.55)',
                }}
              />
              <div
                style={{
                  fontSize: interpolate(m, [0, 1], [34, 26]),
                  fontWeight: 800,
                  position: 'relative',
                }}
              >
                Les soldes d’été
              </div>
              <div style={{ fontSize: 16, position: 'relative' }}>
                -30 % ce week-end
              </div>
              <div
                style={{
                  marginTop: 6,
                  padding: '8px 20px',
                  borderRadius: 4,
                  background: '#fff',
                  color: orange,
                  fontWeight: 700,
                  fontSize: 14,
                  position: 'relative',
                }}
              >
                J’en profite
              </div>
            </div>
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: blockTop,
                width: ew,
                height: blockH,
                overflow: 'hidden',
                outline:
                  insert > 0 && insert < 1 ? `2px solid ${orange}` : undefined,
              }}
            >
              {[
                {
                  name: 'Sac en toile',
                  price: '34,30 €',
                  icon: 'bag_fill',
                  tint: ['#2bb3a3', '#1b6f8a'] as [string, string],
                },
                {
                  name: 'Lunettes de soleil',
                  price: '24,50 €',
                  icon: 'sun_max_fill',
                  tint: ['#ffcf4a', '#ff8a3d'] as [string, string],
                },
              ].map((p, i) => {
                // Mobile inverts the columns: the right one stacks on top
                const x = interpolate(m, [0, 1], [20 + i * (colW + 20), 20])
                const y = interpolate(
                  m,
                  [0, 1],
                  [15, i === 1 ? 15 : 15 + cardH + 14]
                )
                const w = interpolate(m, [0, 1], [colW, ew - 40])
                return (
                  <div
                    key={p.name}
                    style={{
                      position: 'absolute',
                      left: x,
                      top: y,
                      opacity: insert,
                    }}
                  >
                    <Product {...p} w={w} />
                  </div>
                )
              })}
            </div>
            <div
              style={{
                position: 'absolute',
                top: blockTop + blockH + 14,
                width: '100%',
                textAlign: 'center',
                fontSize: 11,
                color: muted,
              }}
            >
              Se désinscrire · Voir la version en ligne
            </div>
          </div>
          {e >= T.grab + 8 && e < T.drop && (
            <div
              style={{
                position: 'absolute',
                left: (CANVAS.w - ew) / 2 - 6,
                top: 14 + blockTop - 2,
                width: ew + 12,
                height: 4,
                borderRadius: 2,
                background: orange,
                opacity: interpolate(
                  e,
                  [T.grab + 8, T.grab + 14],
                  [0, 1],
                  clamp
                ),
              }}
            />
          )}
        </div>

        <div
          style={{
            position: 'absolute',
            left: PALETTE.x,
            top: PALETTE.y,
            fontSize: 15,
            fontWeight: 700,
            color: text,
          }}
        >
          Blocs
        </div>
        {BLOCKS.map(([icon, label], i) => {
          const p = tilePos(i)
          const lifted = i === GRAB_TILE && dragging
          return (
            <div
              key={label}
              style={{
                position: 'absolute',
                left: p.x,
                top: p.y,
                width: TILE.w,
                height: TILE.h,
                border: `1px solid ${lifted ? orange : line}`,
                borderRadius: 6,
                background: lifted ? '#fff4ef' : '#fff',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                fontSize: 13,
                color: text,
              }}
            >
              <Icon name={icon} size={22} color={lifted ? orange : '#6b7280'} />
              {label}
            </div>
          )
        })}
        {dragging && (
          <div
            style={{
              position: 'absolute',
              left: cx - 50,
              top: cy - 28,
              width: TILE.w,
              height: TILE.h,
              border: `1.5px solid ${orange}`,
              borderRadius: 6,
              background: 'rgba(255,255,255,0.92)',
              boxShadow: '0 16px 30px rgba(0,0,0,0.18)',
              transform: 'rotate(-4deg)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              fontSize: 13,
              color: text,
            }}
          >
            <Icon name="square_split_2x1" size={22} color={orange} />2 colonnes
          </div>
        )}
        {/* The pointer stays readable once the page is scaled down */}
        <div style={{ transform: 'scale(1.3)', transformOrigin: 'top left' }}>
          <Cursor
            x={cx / 1.3}
            y={cy / 1.3}
            pressed={pressed}
            opacity={cursorOpacity}
          />
        </div>
      </div>
    </div>
  )
}
