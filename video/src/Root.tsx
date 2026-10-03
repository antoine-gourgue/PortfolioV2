import React from 'react'
import { Composition, Still } from 'remotion'
import { FPS, HEIGHT, WIDTH } from './brand'
import { AntoineOS } from './videos/AntoineOS'
import {
  BANNER_H,
  BANNER_W,
  Banner,
  BannerAvailable,
  BannerOS,
  BannerProjects,
} from './videos/Banner'
import { AppStore } from './videos/AppStore'
import appStoreCues from './videos/AppStore.cues.json'
import antoineOSCues from './videos/AntoineOS.cues.json'
import { CodeToReality } from './videos/CodeToReality'
import codeCues from './videos/CodeToReality.cues.json'
import { IPhone } from './videos/IPhone'
import { Keynote } from './videos/Keynote'
import keynoteCues from './videos/Keynote.cues.json'
import { KeynoteThumb } from './videos/KeynoteThumb'
import iphoneCues from './videos/iPhone.cues.json'
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
    <Composition
      id="AppStore"
      component={AppStore}
      durationInFrames={appStoreCues.durationInFrames}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
      defaultProps={{ withAudio: true }}
    />
    <Still id="Banner" component={Banner} width={BANNER_W} height={BANNER_H} />
    <Still
      id="BannerOS"
      component={BannerOS}
      width={BANNER_W}
      height={BANNER_H}
    />
    <Still
      id="BannerProjects"
      component={BannerProjects}
      width={BANNER_W}
      height={BANNER_H}
    />
    <Still
      id="BannerAvailable"
      component={BannerAvailable}
      width={BANNER_W}
      height={BANNER_H}
    />
    <Still
      id="KeynoteThumb"
      component={KeynoteThumb}
      width={WIDTH}
      height={HEIGHT}
    />
  </>
)
