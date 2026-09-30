import { bundle } from '@remotion/bundler'
import { existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { syncAssets } from './sync-assets.mjs'

export const root = join(dirname(fileURLToPath(import.meta.url)), '..')

// Prefer an explicit browser, then the Playwright-managed headless shell
// that CI images and cloud sandboxes ship; else Remotion downloads its own.
const candidates = [
  process.env.REMOTION_BROWSER,
  process.env.PLAYWRIGHT_BROWSERS_PATH &&
    join(
      process.env.PLAYWRIGHT_BROWSERS_PATH,
      'chromium_headless_shell-1194/chrome-linux/headless_shell'
    ),
]
export const browserExecutable =
  candidates.find((p) => p && existsSync(p)) ?? null

export const chromiumOptions = { gl: 'swangle' }

export const makeBundle = () => {
  syncAssets()
  return bundle({ entryPoint: join(root, 'src/index.ts') })
}
