/**
 * Top albums in France — proxy for Apple's official RSS feed (CORS-blocked
 * in the browser), 30min in-memory cache.
 */
let cache: { at: number; data: unknown } | null = null

export default defineEventHandler(async () => {
  if (cache && Date.now() - cache.at < 30 * 60_000) return cache.data
  const data = await $fetch(
    'https://rss.applemarketingtools.com/api/v2/fr/music/most-played/20/albums.json'
  )
  cache = { at: Date.now(), data }
  return data
})
