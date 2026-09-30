import React from 'react'
import { Composition } from 'remotion'
import { FPS, HEIGHT, WIDTH } from './brand'
import { AntoineOS } from './videos/AntoineOS'
import antoineOSCues from './videos/AntoineOS.cues.json'
import { CodeToReality } from './videos/CodeToReality'
import codeCues from './videos/CodeToReality.cues.json'
import { Trailer } from './videos/Trailer'
import trailerCues from './videos/Trailer.cues.json'

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="AntoineOS"
      component={AntoineOS}
      durationInFrames={antoineOSCues.durationInFrames}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
      defaultProps={{ withAudio: true }}
    />
    <Composition
      id="Trailer"
      component={Trailer}
      durationInFrames={trailerCues.durationInFrames}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
      defaultProps={{ withAudio: true }}
    />
    <Composition
      id="CodeToReality"
      component={CodeToReality}
      durationInFrames={codeCues.durationInFrames}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
      defaultProps={{ withAudio: true }}
    />
  </>
)
