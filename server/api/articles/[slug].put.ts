import {
  ARTICLE_LOCALES,
  buildLocalized,
  buildLocalizedTags,
  findArticleIndexBySlug,
  estimateReadingTime,
  readArticles,
  writeArticles,
  type LocalizedText,
} from '~/server/utils/articles'
import { assertAdminAccess } from '~/server/utils/admin'

interface UpdateArticleBody {
  title?: Partial<LocalizedText>
  excerpt?: Partial<LocalizedText>
  content?: Partial<LocalizedText>
  tags?: string[] | Partial<Record<'fr' | 'en' | 'es', string[]>>
  coverImage?: string | Partial<LocalizedText>
}

export default defineEventHandler(async (event) => {
  assertAdminAccess(event)

  const slug = getRouterParam(event, 'slug')
  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Le slug est obligatoire',
    })
  }

  const body = await readBody<UpdateArticleBody>(event)
  const title = buildLocalized(body.title)
  const excerpt = buildLocalized(body.excerpt)
  const content = buildLocalized(body.content)
  const coverImage = buildLocalized(body.coverImage, '')

  if (
    !title.fr.trim() ||
    !title.en.trim() ||
    !title.es.trim() ||
    !excerpt.fr.trim() ||
    !excerpt.en.trim() ||
    !excerpt.es.trim() ||
    !content.fr.trim() ||
    !content.en.trim() ||
    !content.es.trim()
  ) {
    throw createError({
      statusCode: 400,
      statusMessage:
        'Le titre, le resume et le contenu sont obligatoires pour FR, EN et ES.',
    })
  }

  const rawTags = buildLocalizedTags(body.tags)
  const tags = ARTICLE_LOCALES.reduce(
    (acc, locale) => {
      acc[locale] = rawTags[locale]
        .map((tag) => tag.trim().toLowerCase())
        .filter((tag) => tag.length > 0)
        .slice(0, 6)
      return acc
    },
    { fr: [], en: [], es: [] } as Record<'fr' | 'en' | 'es', string[]>
  )

  const articles = await readArticles()
  const index = findArticleIndexBySlug(articles, slug)

  if (index === -1) {
    throw createError({ statusCode: 404, statusMessage: 'Article introuvable' })
  }

  const existing = articles[index]
  const slugs = existing.slugs
  const updated = {
    ...existing,
    slug: existing.slug || slugs.fr,
    slugs,
    title,
    excerpt,
    content,
    tags,
    coverImage,
    readingTime: estimateReadingTime(content.fr),
    updatedAt: new Date().toISOString(),
  }

  const next = [...articles]
  next[index] = updated
  await writeArticles(next)

  return { article: updated }
})
