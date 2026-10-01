// One contact sheet of the whole film, to look at before any render:
// node scripts/review.mjs [perScene]   (default 3 frames per scene)
// node scripts/review.mjs cuts         (every cut: 4 frames before, on, after)
// Writes out/review/<frame>.png and out/review/sheet.png.
import { renderStill, selectComposition } from '@remotion/renderer'
import { execFileSync } from 'node:child_process'
import { mkdirSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import {
  browserExecutable,
  chromiumOptions,
  makeBundle,
  root,
  timeline,
} from './common.mjs'

const cuts = process.argv[2] === 'cuts'
const per = cuts ? 0 : Number(process.argv[2] ?? 3)
const frames = []
let from = 0
for (const s of timeline.scenes) {
  if (cuts && from > 0) {
    for (const d of [-4, 0, 4]) {
      frames.push({
        f: from + d,
        label: `${s.kind}${s.item ?? ''} ${d >= 0 ? '+' : ''}${d}`,
      })
    }
  }
  for (let k = 0; k < per; k++) {
    // Spread across the scene, skipping its first and last frames where it
    // is still entering or already leaving
    const f =
      from + Math.round(s.len * (0.18 + (0.7 * k) / Math.max(1, per - 1)))
    frames.push({ f, label: `${s.kind}${s.item ?? ''} ${f}` })
  }
  from += s.len
}

const dir = join(root, 'out/review')
rmSync(dir, { recursive: true, force: true })
mkdirSync(dir, { recursive: true })
const serveUrl = await makeBundle()
const inputProps = { withAudio: false }
const composition = await selectComposition({
  serveUrl,
  id: timeline.id,
  inputProps,
  browserExecutable,
  chromiumOptions,
})
const paths = []
for (const { f, label } of frames) {
  const output = join(dir, `${String(f).padStart(4, '0')}.png`)
  await renderStill({
    serveUrl,
    composition,
    frame: f,
    output,
    inputProps,
    browserExecutable,
    chromiumOptions,
    scale: Number(process.env.SCALE ?? 0.5),
  })
  paths.push(output, label)
  process.stdout.write('.')
}
const sheet = join(dir, 'sheet.png')
execFileSync('python3', [join(root, 'scripts/contact.py'), sheet, ...paths])
console.log(`\n${frames.length} frames -> ${sheet}`)
