import React from 'react'
import { Composition } from 'remotion'
import { FPS, HEIGHT, WIDTH } from './brand'
import { AntoineOS } from './videos/AntoineOS'
import antoineOSCues from './videos/AntoineOS.cues.json'
import { CodeToReality } from './videos/CodeToReality'
import codeCues from './videos/CodeToReality.cues.json'
import { IPhone } from './videos/IPhone'
import { Keynote } from './videos/Keynote'
import keynoteCues from './videos/Keynote.cues.json'
import iphoneCues from './videos/iPhone.cues.json'
import { Spotlight } from './videos/Spotlight'
import spotlightCues from './videos/Spotlight.cues.json'
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
    <Composition
      id="Spotlight"
      component={Spotlight}
      durationInFrames={spotlightCues.durationInFrames}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
      defaultProps={{ withAudio: true }}
    />
    <Composition
      id="iPhone"
      component={IPhone}
      durationInFrames={iphoneCues.durationInFrames}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
      defaultProps={{ withAudio: true }}
    />
    <Composition
      id="Keynote"
      component={Keynote}
      durationInFrames={keynoteCues.durationInFrames}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
      defaultProps={{ withAudio: true }}
    />
  </>
)
