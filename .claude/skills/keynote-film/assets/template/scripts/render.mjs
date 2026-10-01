// Renders the film: node scripts/render.mjs [output.mp4]
// FRAMES=840-1080 renders only that range, for a quick end-to-end check.
import { renderMedia, selectComposition } from '@remotion/renderer'
import { existsSync, mkdirSync } from 'node:fs'
import { cpus } from 'node:os'
import { join } from 'node:path'
import {
  browserExecutable,
  chromiumOptions,
  makeBundle,
  root,
  timeline,
} from './common.mjs'

const id = timeline.id
const frameRange = process.env.FRAMES
  ? process.env.FRAMES.split('-').map(Number)
  : null
const output = process.argv[2] ?? join(root, `out/${id}.mp4`)
const withAudio = existsSync(join(root, `public/audio/${id}.wav`))
if (!withAudio) {
  console.warn(
    `No public/audio/${id}.wav: rendering silent (run npm run audio)`
  )
}

const serveUrl = await makeBundle()
const inputProps = { withAudio }
const composition = await selectComposition({
  serveUrl,
  id,
  inputProps,
  browserExecutable,
  chromiumOptions,
})
mkdirSync(join(root, 'out'), { recursive: true })
let last = -1
const started = Date.now()
await renderMedia({
  serveUrl,
  composition,
  inputProps,
  codec: 'h264',
  // JPEG frames encode several times faster than PNG; at 95 the loss is
  // invisible once H.264 has been applied
  imageFormat: 'jpeg',
  jpegQuality: 95,
  // CRF 19 on the slow preset is visually lossless and keeps a minute of
  // film around 15-20 MB; social networks re-encode uploads anyway
  crf: 19,
  x264Preset: 'slow',
  pixelFormat: 'yuv420p',
  audioCodec: 'aac',
  audioBitrate: '320k',
  outputLocation: output,
  frameRange,
  browserExecutable,
  chromiumOptions,
  concurrency: Math.max(1, cpus().length),
  onProgress: ({ progress }) => {
    const pct = Math.floor(progress * 100)
    if (pct % 5 === 0 && pct !== last) {
      last = pct
      const min = ((Date.now() - started) / 60000).toFixed(1)
      console.log(`${id}: ${pct}% (${min} min)`)
    }
  },
})
console.log(`Rendered ${output}`)
