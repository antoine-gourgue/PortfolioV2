// Renders single frames for review: node scripts/still.mjs <id> <frame...>
import { renderStill, selectComposition } from '@remotion/renderer'
import { mkdirSync } from 'node:fs'
import { join } from 'node:path'
import {
  browserExecutable,
  chromiumOptions,
  makeBundle,
  root,
} from './common.mjs'

const [id, ...frames] = process.argv.slice(2)
if (!id || frames.length === 0) {
  console.error('Usage: node scripts/still.mjs <compositionId> <frame...>')
  process.exit(1)
}

const serveUrl = await makeBundle()
const composition = await selectComposition({
  serveUrl,
  id,
  browserExecutable,
  chromiumOptions,
})
mkdirSync(join(root, 'out/stills'), { recursive: true })
for (const f of frames.map(Number)) {
  const output = join(
    root,
    `out/stills/${id}-${String(f).padStart(4, '0')}.png`
  )
  await renderStill({
    serveUrl,
    composition,
    frame: f,
    output,
    browserExecutable,
    chromiumOptions,
    scale: Number(process.env.SCALE ?? 1),
  })
  console.log(output)
}
