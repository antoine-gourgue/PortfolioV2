import { bundle } from '@remotion/bundler'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

export const root = join(dirname(fileURLToPath(import.meta.url)), '..')

export const timeline = JSON.parse(
  readFileSync(join(root, 'src/timeline.json'), 'utf8')
)

// Prefer an explicit browser, then a Playwright-managed headless shell (CI
// images and cloud sandboxes ship one); else Remotion downloads its own.
const playwrightShell = () => {
  const base = process.env.PLAYWRIGHT_BROWSERS_PATH
  if (!base || !existsSync(base)) return null
  const dir = readdirSync(base)
    .filter((d) => d.startsWith('chromium_headless_shell-'))
    .sort()
    .pop()
  return dir ? join(base, dir, 'chrome-linux/headless_shell') : null
}
export const browserExecutable =
  [process.env.REMOTION_BROWSER, playwrightShell()].find(
    (p) => p && existsSync(p)
  ) ?? null

export const chromiumOptions = { gl: 'swangle' }

export const makeBundle = () =>
  bundle({ entryPoint: join(root, 'src/index.ts') })
