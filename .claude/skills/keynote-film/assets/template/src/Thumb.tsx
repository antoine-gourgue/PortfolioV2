import React from 'react'
import { AbsoluteFill } from 'remotion'
import { CX, fonts, stage } from './config'
import { content } from './content'
import { IPhone3D, MacBook3D } from './kit/devices'
import { StageLight } from './kit/light'
import { Monogram } from './kit/mark'
import { fitSize } from './kit/motion'
import { Shot } from './kit/screens'
import { SilverText } from './kit/type'

const MAC_W = 670
const MAC_D = MAC_W * 0.69
const PHONE_W = 210

const logo = (size: number, color: string) => (
  <Monogram mark={content.mark} size={size} color={color} />
)

/** The MacBook with the iPhone leaning in front of it. */
const LaptopAndPhone: React.FC = () => {
  const { laptop, phone } = content.thumb
  return (
    <AbsoluteFill style={{ perspective: 2000, perspectiveOrigin: '50% 60%' }}>
      <div
        style={{
          position: 'absolute',
          left: CX - MAC_W / 2 - 40,
          top: 960,
          width: MAC_W,
          height: 0,
          transformStyle: 'preserve-3d',
          transform: 'rotateX(-16deg) rotateY(-20deg)',
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
            sheen={0.55}
            logo={logo}
            screen={laptop && <Shot media={laptop} />}
          />
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 745,
          top: 640,
          transformStyle: 'preserve-3d',
          transform: 'translateZ(120px) rotateY(-16deg) rotateZ(4deg)',
        }}
      >
        <IPhone3D
          width={PHONE_W}
          angle={-16}
          logo={logo}
          android={phone.android}
          screen={<Shot media={phone.media} />}
        />
      </div>
    </AbsoluteFill>
  )
}

/** A mobile-only product: two phones side by side. */
const TwoPhones: React.FC = () => {
  const { phone, phone2 } = content.thumb
  const shots = [
    { shot: phone2 ?? phone, x: CX - 250, ry: 20, rz: -4, z: -40 },
    { shot: phone, x: CX + 10, ry: -16, rz: 3, z: 80 },
  ]
  return (
    <AbsoluteFill style={{ perspective: 2000, perspectiveOrigin: '50% 60%' }}>
      {shots.map(({ shot, x, ry, rz, z }, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: x,
            top: 520,
            transformStyle: 'preserve-3d',
            transform: `translateZ(${z}px) rotateY(${ry}deg) rotateZ(${rz}deg)`,
          }}
        >
          <IPhone3D
            width={PHONE_W * 1.15}
            angle={ry}
            logo={logo}
            android={shot.android}
            screen={<Shot media={shot.media} />}
          />
        </div>
      ))}
    </AbsoluteFill>
  )
}

/**
 * Cover image: the hook in silver type over the devices, availability or
 * release underneath. Seen small in a feed, so few words, large.
 */
export const Thumb: React.FC = () => {
  const { hook, foot, sub, laptop } = content.thumb
  return (
    <AbsoluteFill
      style={{ background: '#000', fontFamily: fonts.body, color: stage.white }}
    >
      <StageLight y={58} w={70} h={42} />
      <div
        style={{
          position: 'absolute',
          top: 96,
          width: '100%',
          textAlign: 'center',
          fontFamily: fonts.display,
          fontSize: 38,
          fontWeight: 500,
          letterSpacing: '-0.01em',
          color: stage.grey,
        }}
      >
        {/* A product's cover already sets its name in the hook */}
        {hook[0] === content.name
          ? content.role
          : `${content.name} · ${content.role}`}
      </div>
      <div
        style={{
          position: 'absolute',
          top: 150,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <SilverText
          size={fitSize(hook[0], 220, 1000)}
          weight={800}
          sweepAt={-100}
        >
          {hook[0]}
        </SilverText>
      </div>
      <div
        style={{
          position: 'absolute',
          top: 392,
          width: '100%',
          textAlign: 'center',
          fontFamily: fonts.display,
          fontSize: fitSize(hook[1], 64, 1000),
          fontWeight: 700,
          letterSpacing: '-0.03em',
        }}
      >
        {hook[1]}
      </div>
      {laptop ? <LaptopAndPhone /> : <TwoPhones />}
      <div
        style={{
          position: 'absolute',
          top: 1150,
          width: '100%',
          textAlign: 'center',
          fontFamily: fonts.display,
        }}
      >
        <div
          style={{
            fontSize: fitSize(foot, 54, 1000),
            fontWeight: 700,
            letterSpacing: '-0.02em',
          }}
        >
          {foot}
        </div>
        <div
          style={{
            marginTop: 10,
            fontSize: 36,
            fontWeight: 500,
            color: stage.grey,
          }}
        >
          {sub}
        </div>
      </div>
    </AbsoluteFill>
  )
}
