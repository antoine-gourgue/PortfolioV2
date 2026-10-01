// Times single-frame renders to find the expensive scenes:
// node scripts/profile.mjs <id> <frame...>
import { openBrowser, renderStill, selectComposition } from '@remotion/renderer'
import { browserExecutable, chromiumOptions, makeBundle } from './common.mjs'

const [id, ...frames] = process.argv.slice(2)
const serveUrl = await makeBundle()
const browser = await openBrowser('chrome', {
  browserExecutable,
  chromiumOptions,
})
const composition = await selectComposition({
  serveUrl,
  id,
  puppeteerInstance: browser,
})
for (const f of frames.map(Number)) {
  const t = performance.now()
  await renderStill({
    serveUrl,
    composition,
    frame: f,
    output: `/tmp/claude-0/p-${f}.png`,
    puppeteerInstance: browser,
  })
  console.log(`${id} frame ${f}: ${Math.round(performance.now() - t)} ms`)
}
await browser.close({ silent: true })
