import { promises as fs } from 'node:fs'
import { dirname, join } from 'node:path'

export type ArticleLocale = 'fr' | 'en' | 'es'

export interface LocalizedText {
  fr: string
  en: string
  es: string
}

export interface LocalizedTags {
  fr: string[]
  en: string[]
  es: string[]
}

export interface Article {
  id: string
  slug: string
  slugs: LocalizedText
  title: LocalizedText
  excerpt: LocalizedText
  content: LocalizedText
  tags: LocalizedTags
  coverImage: LocalizedText
  readingTime?: string
  createdAt: string
  updatedAt: string
  publishedAt: string
}

const ARTICLES_PATH = join(process.cwd(), 'server', 'data', 'articles.json')

const ensureFileExists = async () => {
  await fs.mkdir(dirname(ARTICLES_PATH), { recursive: true })

  try {
    await fs.access(ARTICLES_PATH)
  } catch {
    await fs.writeFile(ARTICLES_PATH, '[]', 'utf-8')
  }
}

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036F]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')

export const estimateReadingTime = (content: string) => {
  const words = content.trim().split(/\s+/).filter(Boolean).length
  const minutes = Math.max(1, Math.round(words / 220))
  return `${minutes} min`
}

export const ARTICLE_LOCALES: ArticleLocale[] = ['fr', 'en', 'es']

export const buildLocalized = (
  value: string | Partial<LocalizedText> | undefined | null,
  fallback = ''
): LocalizedText => {
  if (typeof value === 'string') {
    const text = value.trim()
    return { fr: text, en: text, es: text }
  }

  const fr = value?.fr?.trim() || fallback
  const en = value?.en?.trim() || fr || fallback
  const es = value?.es?.trim() || fr || fallback

  return { fr, en, es }
}

export const buildLocalizedSlugs = (
  value: string | Partial<LocalizedText> | undefined | null,
  title: LocalizedText
): LocalizedText => {
  if (typeof value === 'string' && value.trim()) {
    const fr = value.trim()
    const en = slugify(title.en) || fr
    const es = slugify(title.es) || fr
    return { fr, en, es }
  }

  const fr = slugify(value?.fr || '') || slugify(title.fr) || 'article'
  const en = slugify(value?.en || '') || slugify(title.en) || fr
  const es = slugify(value?.es || '') || slugify(title.es) || fr
  return { fr, en, es }
}

const normalizeTagList = (
  value: unknown,
  fallback: string[] = []
): string[] => {
  if (!Array.isArray(value)) {
    return [...fallback]
  }

  return value
    .map((tag) => String(tag).trim().toLowerCase())
    .filter(Boolean)
    .slice(0, 6)
}

export const buildLocalizedTags = (
  value: string[] | Partial<Record<ArticleLocale, string[]>> | undefined | null
): LocalizedTags => {
  if (Array.isArray(value)) {
    const shared = normalizeTagList(value)
    return { fr: shared, en: [...shared], es: [...shared] }
  }

  const fr = normalizeTagList(value?.fr)
  const en = normalizeTagList(value?.en, fr)
  const es = normalizeTagList(value?.es, fr)
  return { fr, en, es }
}

const normalizeArticle = (article: Record<string, unknown>): Article => {
  const title = buildLocalized(
    article.title as string | Partial<LocalizedText> | undefined,
    ''
  )
  const excerpt = buildLocalized(
    article.excerpt as string | Partial<LocalizedText> | undefined,
    ''
  )
  const content = buildLocalized(
    article.content as string | Partial<LocalizedText> | undefined,
    ''
  )

  const slugs = buildLocalizedSlugs(
    (article.slugs as Partial<LocalizedText> | undefined) ||
      (article.slug as string | undefined),
    title
  )

  return {
    id: String(article.id || `article-${Date.now()}`),
    slug: String(article.slug || slugs.fr),
    slugs,
    title,
    excerpt,
    content,
    tags: buildLocalizedTags(
      article.tags as
        | string[]
        | Partial<Record<ArticleLocale, string[]>>
        | undefined
    ),
    coverImage: buildLocalized(
      article.coverImage as string | Partial<LocalizedText> | undefined,
      ''
    ),
    readingTime:
      String(article.readingTime || '').trim() ||
      estimateReadingTime(content.fr || ''),
    createdAt: String(article.createdAt || new Date().toISOString()),
    updatedAt: String(article.updatedAt || new Date().toISOString()),
    publishedAt: String(article.publishedAt || new Date().toISOString()),
  }
}

export const readArticles = async (): Promise<Article[]> => {
  await ensureFileExists()
  const raw = await fs.readFile(ARTICLES_PATH, 'utf-8')
  const parsed = JSON.parse(raw) as Record<string, unknown>[]
  const normalized = parsed.map(normalizeArticle)

  return normalized.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

export const writeArticles = async (articles: Article[]) => {
  await ensureFileExists()
  await fs.writeFile(ARTICLES_PATH, JSON.stringify(articles, null, 2), 'utf-8')
}

export const createUniqueSlug = (title: string, existing: Article[]) => {
  const baseSlug = slugify(title) || 'article'
  let slug = baseSlug
  let counter = 2

  while (existing.some((article) => article.slug === slug)) {
    slug = `${baseSlug}-${counter}`
    counter += 1
  }

  return slug
}

export const createUniqueLocalizedSlugs = (
  title: LocalizedText,
  existing: Article[],
  currentArticleId?: string
): LocalizedText => {
  const usedByLocale: Record<ArticleLocale, Set<string>> = {
    fr: new Set(),
    en: new Set(),
    es: new Set(),
  }

  for (const article of existing) {
    if (currentArticleId && article.id === currentArticleId) continue
    const localized =
      article.slugs || buildLocalizedSlugs(article.slug, article.title)
    usedByLocale.fr.add(localized.fr)
    usedByLocale.en.add(localized.en)
    usedByLocale.es.add(localized.es)
  }

  const makeUnique = (base: string, locale: ArticleLocale) => {
    let candidate = base || 'article'
    let counter = 2
    while (usedByLocale[locale].has(candidate)) {
      candidate = `${base || 'article'}-${counter}`
      counter += 1
    }
    return candidate
  }

  return {
    fr: makeUnique(slugify(title.fr), 'fr'),
    en: makeUnique(slugify(title.en), 'en'),
    es: makeUnique(slugify(title.es), 'es'),
  }
}

export const findArticleIndexBySlug = (articles: Article[], slug: string) => {
  return articles.findIndex((article) => {
    const localized =
      article.slugs || buildLocalizedSlugs(article.slug, article.title)
    return (
      article.slug === slug ||
      localized.fr === slug ||
      localized.en === slug ||
      localized.es === slug
    )
  })
}

export const resolveByLocale = (
  field: LocalizedText,
  locale: string | null | undefined
) => {
  const normalizedLocale = ARTICLE_LOCALES.includes(locale as ArticleLocale)
    ? (locale as ArticleLocale)
    : 'fr'

  return field[normalizedLocale] || field.fr || field.en || field.es || ''
}

export const resolveTagsByLocale = (
  tags: LocalizedTags,
  locale: string | null | undefined
) => {
  const normalizedLocale = ARTICLE_LOCALES.includes(locale as ArticleLocale)
    ? (locale as ArticleLocale)
    : 'fr'

  return tags[normalizedLocale] || tags.fr || tags.en || tags.es || []
}

export const resolveSlugByLocale = (
  slugs: LocalizedText,
  locale: string | null | undefined
) => {
  const normalizedLocale = ARTICLE_LOCALES.includes(locale as ArticleLocale)
    ? (locale as ArticleLocale)
    : 'fr'

  return slugs[normalizedLocale] || slugs.fr || slugs.en || slugs.es || ''
}
