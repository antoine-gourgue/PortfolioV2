/**
 * News — agrège des flux RSS français équilibrés (gauche, centre, droite)
 * et le top Hacker News. Gratuit, sans clé : cache mémoire 10 min.
 * Les images/descriptions manquantes sont complétées via les balises
 * Open Graph des articles (comme les aperçus de liens iMessage).
 */

export interface NewsItem {
  title: string
  link: string
  source: string
  image?: string
  description?: string
  date: number
}

// Pluralisme assumé : un média de gauche, deux du centre, un de droite,
// entremêlés à parts égales pour ne favoriser aucune ligne éditoriale
const FEEDS: Array<{ source: string; url: string }> = [
  {
    source: 'Libération',
    url: 'https://www.liberation.fr/arc/outboundfeeds/rss-all/?outputType=xml',
  },
  { source: 'franceinfo', url: 'https://www.francetvinfo.fr/titres.rss' },
  { source: 'Le Monde', url: 'https://www.lemonde.fr/rss/une.xml' },
  {
    source: 'Le Figaro',
    url: 'https://www.lefigaro.fr/rss/figaro_actualites.xml',
  },
]

const CACHE_MS = 10 * 60_000
let cache: {
  at: number
  data: { headlines: NewsItem[]; tech: NewsItem[] }
} | null = null

// Décode les entités HTML courantes des titres RSS (&#xE8;, &amp;…)
const decodeEntities = (text: string) =>
  text
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) =>
      String.fromCodePoint(parseInt(hex, 16))
    )
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)))
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')

const stripTags = (html: string) =>
  decodeEntities(html.replace(/<[^>]+>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim()

const parseRss = (xml: string, source: string): NewsItem[] => {
  const items: NewsItem[] = []
  for (const match of xml.matchAll(/<item>([\s\S]*?)<\/item>/g)) {
    const item = match[1]
    const title = item.match(
      /<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/
    )?.[1]
    const link = item.match(
      /<link>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/link>/
    )?.[1]
    const image = item.match(
      /(?:<media:content|<enclosure)[^>]*url="([^"]+)"/
    )?.[1]
    const description = item.match(
      /<description>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/description>/
    )?.[1]
    const pubDate = item.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1]
    if (!title || !link) continue
    items.push({
      title: decodeEntities(title.trim()),
      link: link.trim(),
      source,
      image,
      description: description
        ? stripTags(description).slice(0, 400)
        : undefined,
      date: pubDate ? Date.parse(pubDate) || Date.now() : Date.now(),
    })
  }
  return items
}

// Complète image + description depuis les balises Open Graph de l'article
const enrichFromPage = async (item: NewsItem): Promise<void> => {
  try {
    const html = (
      await $fetch<string>(item.link, {
        responseType: 'text',
        timeout: 6000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; antoinegourgue.dev)',
        },
      })
    ).slice(0, 100_000)

    const meta = (property: string) =>
      html.match(
        new RegExp(
          `<meta[^>]*(?:property|name)=["']${property}["'][^>]*content=["']([^"']+)`,
          'i'
        )
      )?.[1] ??
      html.match(
        new RegExp(
          `<meta[^>]*content=["']([^"']+)["'][^>]*(?:property|name)=["']${property}["']`,
          'i'
        )
      )?.[1]

    if (!item.image) {
      const image = meta('og:image')
      if (image?.startsWith('http')) item.image = decodeEntities(image)
    }
    if (!item.description) {
      const description = meta('og:description') ?? meta('description')
      if (description) {
        item.description = stripTags(description).slice(0, 400)
      }
    }
  } catch {
    // article inaccessible : on garde la carte sans visuel
  }
}

interface HnItem {
  title?: string
  url?: string
  id: number
  time?: number
  score?: number
}

export default defineEventHandler(async () => {
  if (cache && Date.now() - cache.at < CACHE_MS) return cache.data

  const [rssResults, hnIds] = await Promise.all([
    Promise.allSettled(
      FEEDS.map(async (feed) => {
        const xml = await $fetch<string>(feed.url, {
          responseType: 'text',
          headers: { 'User-Agent': 'antoinegourgue.dev news app' },
        })
        return parseRss(xml, feed.source)
      })
    ),
    $fetch<number[]>(
      'https://hacker-news.firebaseio.com/v0/topstories.json'
    ).catch(() => [] as number[]),
  ])

  // Entrelacement 1-1-1-1 entre les sources : équilibre garanti
  const perFeed = rssResults.map((result) =>
    result.status === 'fulfilled' ? result.value.slice(0, 4) : []
  )
  const headlines: NewsItem[] = []
  for (let i = 0; i < 4; i++) {
    for (const feedItems of perFeed) {
      if (feedItems[i]) headlines.push(feedItems[i])
    }
  }

  // Top Hacker News
  const techItems = await Promise.allSettled(
    hnIds
      .slice(0, 10)
      .map((id) =>
        $fetch<HnItem>(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
      )
  )
  const tech: NewsItem[] = techItems
    .flatMap((result) => (result.status === 'fulfilled' ? [result.value] : []))
    .filter((item) => item?.title)
    .map((item) => ({
      title: item.title as string,
      link: item.url ?? `https://news.ycombinator.com/item?id=${item.id}`,
      source: `Hacker News · ${item.score ?? 0} pts`,
      date: (item.time ?? 0) * 1000,
    }))

  // Aperçus (image + chapô) pour les cartes incomplètes
  await Promise.allSettled(
    [...headlines, ...tech]
      .filter((item) => !item.image || !item.description)
      .map((item) => enrichFromPage(item))
  )

  const data = { headlines, tech }
  if (headlines.length || tech.length) {
    cache = { at: Date.now(), data }
  }
  return data
})
