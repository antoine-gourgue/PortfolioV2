import { Config } from '@remotion/cli/config'

Config.setVideoImageFormat('png')
Config.setCodec('h264')
Config.setPixelFormat('yuv420p')
Config.setCrf(19)
// Software GL: the render boxes have no GPU, and WebGL scenes need a context
Config.setChromiumOpenGlRenderer('swangle')
if (process.env.REMOTION_BROWSER) {
  Config.setBrowserExecutable(process.env.REMOTION_BROWSER)
}
