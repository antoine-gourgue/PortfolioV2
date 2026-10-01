// Copies the portfolio's own assets into Remotion's public dir so the videos
// always use the same logos and screenshots as the live site, without
// duplicating the binaries in git.
import { cpSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

export const syncAssets = () => {
  const from = join(root, '..', 'public', 'assets')
  const to = join(root, 'public', 'assets')
  mkdirSync(to, { recursive: true })
  cpSync(from, to, {
    recursive: true,
    filter: (src) =>
      !/[/\\](music|radio|weather)([/\\]|$)/.test(src) && !src.endsWith('.pdf'),
  })
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  syncAssets()
  console.log('Assets synced')
}
