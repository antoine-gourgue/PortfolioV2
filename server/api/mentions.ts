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
  items: SearchResult[]
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
  const query = encodeURIComponent('"Antoine Gourgue"')

  const res = await $fetch<GoogleSearchResponse>(
    `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${query}`
  )

  const results: FormattedResult[] = res.items.map((item) => ({
    title: item.title,
    link: item.link,
    snippet: item.snippet,
    domain: item.displayLink,
  }))

  cachedResults = { results }
  lastFetchTime = now

  return cachedResults
})
