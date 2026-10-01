// Renders single frames: node scripts/still.mjs <frame...>
// ID=Thumb node scripts/still.mjs 0 renders the cover. SCALE=0.5 for speed.
import { renderStill, selectComposition } from '@remotion/renderer'
import { mkdirSync } from 'node:fs'
import { join } from 'node:path'
import {
  browserExecutable,
  chromiumOptions,
  makeBundle,
  root,
  timeline,
} from './common.mjs'

const id = process.env.ID ?? timeline.id
const frames = process.argv.slice(2).map(Number)
if (frames.length === 0) {
  console.error('Usage: node scripts/still.mjs <frame...>')
  process.exit(1)
}

const serveUrl = await makeBundle()
const inputProps = { withAudio: false }
const composition = await selectComposition({
  serveUrl,
  id,
  inputProps,
  browserExecutable,
  chromiumOptions,
})
mkdirSync(join(root, 'out/stills'), { recursive: true })
for (const f of frames) {
  const output = join(
    root,
    `out/stills/${id}-${String(f).padStart(4, '0')}.png`
  )
  await renderStill({
    serveUrl,
    composition,
    frame: f,
    output,
    inputProps,
    browserExecutable,
    chromiumOptions,
    scale: Number(process.env.SCALE ?? 1),
  })
  console.log(output)
}
