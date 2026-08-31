/**
 * Full Unicode emoji set (emoji.json), grouped by category.
 * Server proxy + cache: the client never calls unpkg directly.
 */

interface RawEmoji {
  char: string
  name: string
  group: string
}

interface EmojiGroup {
  name: string
  emojis: { char: string; name: string }[]
}

let cache: { groups: EmojiGroup[] } | null = null
let cachedAt = 0
const CACHE_TTL = 24 * 60 * 60 * 1000 // 24h

export default defineEventHandler(async () => {
  if (cache && Date.now() - cachedAt < CACHE_TTL) return cache

  const raw = await $fetch<RawEmoji[]>(
    'https://unpkg.com/emoji.json@15.1.0/emoji.json'
  )

  const byGroup: Record<string, EmojiGroup['emojis']> = {}
  for (const e of raw) {
    if (!e.char || !e.group || e.group === 'Component') continue
    // skin-tone variants are dropped to keep the grid compact
    if (/skin tone/i.test(e.name)) continue
    ;(byGroup[e.group] ??= []).push({ char: e.char, name: e.name })
  }

  cache = {
    groups: Object.entries(byGroup).map(([name, emojis]) => ({ name, emojis })),
  }
  cachedAt = Date.now()
  return cache
})
