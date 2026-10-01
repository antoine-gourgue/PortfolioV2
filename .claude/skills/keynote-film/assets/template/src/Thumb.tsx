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

/**
 * Cover image: the hook in silver type over the MacBook and the iPhone,
 * availability underneath. Seen small in a feed, so few words, large.
 */
export const Thumb: React.FC = () => {
  const { hook, foot, sub, laptop, phone } = content.thumb
  const logo = (size: number, color: string) => (
    <Monogram mark={content.mark} size={size} color={color} />
  )
  return (
    <AbsoluteFill style={{ background: '#000' }}>
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
        {content.name} · {content.role}
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
          color: stage.white,
        }}
      >
        {hook[1]}
      </div>
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
              screen={<Shot media={laptop} />}
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
            screen={<Shot media={phone} />}
          />
        </div>
      </AbsoluteFill>
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
            color: stage.white,
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
