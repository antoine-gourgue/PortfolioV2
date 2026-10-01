import React from 'react'
import { Composition, Still } from 'remotion'
import { FPS, HEIGHT, WIDTH } from './config'
import { Film } from './Film'
import { Thumb } from './Thumb'
import { DURATION, FILM_ID } from './timeline'

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id={FILM_ID}
      component={Film}
      durationInFrames={DURATION}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
      defaultProps={{ withAudio: true }}
    />
    <Still id="Thumb" component={Thumb} width={WIDTH} height={HEIGHT} />
  </>
)
