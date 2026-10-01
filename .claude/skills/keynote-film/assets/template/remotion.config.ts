import { Config } from '@remotion/cli/config'

Config.setVideoImageFormat('jpeg')
Config.setCodec('h264')
Config.setPixelFormat('yuv420p')
Config.setCrf(19)
// Software GL: render boxes rarely have a GPU
Config.setChromiumOpenGlRenderer('swangle')
if (process.env.REMOTION_BROWSER) {
  Config.setBrowserExecutable(process.env.REMOTION_BROWSER)
}
