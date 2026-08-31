interface SearchResult {
  title: string
  link: string
  snippet: string
  displayLink: string
}

interface FormattedResult {
  title: string
  link: string
  snippet: string
  domain: string
}

interface GoogleSearchResponse {
  items?: SearchResult[]
}

let cachedResults: { results: FormattedResult[] } | null = null
let lastFetchTime = 0
const CACHE_DURATION = 1000 * 60 * 60 * 24

export default defineEventHandler(async () => {
  const now = Date.now()

  if (cachedResults && now - lastFetchTime < CACHE_DURATION) {
    return cachedResults
  }

  const apiKey = process.env.GOOGLE_API_KEY
  const cx = process.env.GOOGLE_CX_ID
  // No key configured: return an empty list rather than crash
  if (!apiKey || !cx) return { results: [] }

  const query = encodeURIComponent('"Antoine Gourgue"')

  try {
    const res = await $fetch<GoogleSearchResponse>(
      `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${query}`,
      { timeout: 10_000 }
    )

    // `items` is absent when the search returns nothing
    const results: FormattedResult[] = (res?.items ?? []).map((item) => ({
      title: item.title,
      link: item.link,
      snippet: item.snippet,
      domain: item.displayLink,
    }))

    cachedResults = { results }
    lastFetchTime = now
    return cachedResults
  } catch {
    // Quota hit or Google down: serve the stale cache, else empty
    return cachedResults ?? { results: [] }
  }
})
