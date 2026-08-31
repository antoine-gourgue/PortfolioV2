/**
 * Proxy for the iTunes Search API. The browser used to call
 * itunes.apple.com directly: Apple rate-limits per IP (~20 req/min) and
 * its 429 responses carry no CORS headers, so users saw opaque CORS
 * errors. The server rebuilds a validated query — never a raw
 * passthrough — and a shared cache absorbs most of the rate limit.
 */
const cache = new Map<string, { at: number; data: unknown }>()
const TTL = 10 * 60_000

const ENTITIES = new Set(['musicArtist', 'album', 'song'])

export default defineEventHandler(async (event) => {
  const q = getQuery(event)
  const kind = q.kind === 'lookup' ? 'lookup' : 'search'
  const entity = ENTITIES.has(String(q.entity)) ? String(q.entity) : 'song'
  const limit = Math.min(30, Math.max(1, parseInt(String(q.limit), 10) || 6))

  let url: string
  if (kind === 'search') {
    const term = String(q.term ?? '')
      .slice(0, 100)
      .trim()
    if (!term) {
      throw createError({ statusCode: 400, statusMessage: 'Missing term' })
    }
    url = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=${entity}&limit=${limit}`
  } else {
    // One id, or a comma-separated batch for the artist-artwork lookup
    const id = String(q.id ?? '').replace(/[^0-9,]/g, '')
    if (!id) {
      throw createError({ statusCode: 400, statusMessage: 'Missing id' })
    }
    url = `https://itunes.apple.com/lookup?id=${id.slice(0, 300)}&entity=${entity}&limit=${limit}`
  }

  const hit = cache.get(url)
  if (hit && Date.now() - hit.at < TTL) return hit.data

  try {
    // iTunes replies with `Content-Type: text/javascript` and leading
    // whitespace; without responseType ofetch hands back the raw string, so
    // the client's `data.results` is undefined. Force JSON parsing.
    const data = await $fetch(url, { timeout: 8000, responseType: 'json' })
    cache.set(url, { at: Date.now(), data })
    return data
  } catch {
    // Rate-limited or unreachable: serve the stale entry if there is one
    if (hit) return hit.data
    throw createError({ statusCode: 502, statusMessage: 'iTunes unavailable' })
  }
})
