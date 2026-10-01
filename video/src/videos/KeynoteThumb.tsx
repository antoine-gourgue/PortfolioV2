import React from 'react'
import { AbsoluteFill } from 'remotion'
import { fonts, person } from '../brand'
import {
  IPhone3D,
  MacBook3D,
  Shot,
  SilverText,
  StageLight,
  stage,
} from '../keynote/Kit'
import { footage } from '../scenes/OsScenes'

const MAC_W = 670
const MAC_D = MAC_W * 0.69
const PHONE_W = 210

/**
 * Cover image for the Keynote post: the hook in silver type over the
 * MacBook and the iPhone from the film, availability underneath. Sized for
 * the feed, where it is seen small: few words, large.
 */
export const KeynoteThumb: React.FC = () => (
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
      Antoine Gourgue · {person.role}
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
      <SilverText size={220} weight={800} sweepAt={-100}>
        Mon CV
      </SilverText>
    </div>
    <div
      style={{
        position: 'absolute',
        top: 392,
        width: '100%',
        textAlign: 'center',
        fontFamily: fonts.display,
        fontSize: 64,
        fontWeight: 700,
        letterSpacing: '-0.03em',
        color: stage.white,
      }}
    >
      en moins d’une minute.
    </div>
    <AbsoluteFill style={{ perspective: 2000, perspectiveOrigin: '50% 60%' }}>
      <div
        style={{
          position: 'absolute',
          left: 540 - MAC_W / 2 - 40,
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
            screen={<Shot src={footage('desktop.jpg')} />}
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
          screen={<Shot src={footage('mobile-appstore-mosaic.jpg')} />}
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
          fontSize: 54,
          fontWeight: 700,
          letterSpacing: '-0.02em',
          color: stage.white,
        }}
      >
        Disponible en CDI · octobre 2026
      </div>
      <div
        style={{
          marginTop: 10,
          fontSize: 36,
          fontWeight: 500,
          color: stage.grey,
        }}
      >
        {person.mobility}
      </div>
    </div>
  </AbsoluteFill>
)
