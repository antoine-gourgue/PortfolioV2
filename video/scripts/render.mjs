// Renders the MP4s: node scripts/render.mjs [compositionId...]
// FRAMES=0-59 renders only that range, for a quick end-to-end check.
import { renderMedia, selectComposition } from '@remotion/renderer'
import { cpus } from 'node:os'
import { mkdirSync } from 'node:fs'
import { join } from 'node:path'
import {
  browserExecutable,
  chromiumOptions,
  makeBundle,
  root,
} from './common.mjs'

const ids = process.argv.slice(2)
const frameRange = process.env.FRAMES
  ? process.env.FRAMES.split('-').map(Number)
  : null
const all = [
  'AntoineOS',
  'Keynote',
  'AppStore',
  'iPhone',
  'Trailer',
  'CodeToReality',
]
const serveUrl = await makeBundle()
mkdirSync(join(root, 'out'), { recursive: true })

for (const id of ids.length ? ids : all) {
  const composition = await selectComposition({
    serveUrl,
    id,
    browserExecutable,
    chromiumOptions,
  })
  const output = join(root, `out/${id}.mp4`)
  let last = -1
  await renderMedia({
    serveUrl,
    composition,
    codec: 'h264',
    // JPEG frames encode several times faster than PNG; at 95 the loss is
    // invisible once H.264 has been applied
    imageFormat: 'jpeg',
    jpegQuality: 95,
    // CRF 19 on the slow preset is visually lossless here and keeps a 40 s
    // video around 20 MB; LinkedIn re-encodes uploads anyway
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
      if (pct % 10 === 0 && pct !== last) {
        last = pct
        console.log(`${id}: ${pct}%`)
      }
    },
  })
  console.log(`Rendered ${output}`)
}
