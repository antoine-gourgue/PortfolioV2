/**
 * Top albums France — proxy du flux RSS officiel Apple
 * (bloqué par CORS côté navigateur), cache mémoire 30 min.
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
