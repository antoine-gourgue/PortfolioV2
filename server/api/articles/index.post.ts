import {
  ARTICLE_LOCALES,
  buildLocalized,
  buildLocalizedTags,
  createUniqueLocalizedSlugs,
  estimateReadingTime,
  readArticles,
  writeArticles,
  type Article,
  type LocalizedText,
} from '~/server/utils/articles'
import { assertAdminAccess } from '~/server/utils/admin'

interface CreateArticleBody {
  title?: Partial<LocalizedText>
  excerpt?: Partial<LocalizedText>
  content?: Partial<LocalizedText>
  tags?: string[] | Partial<Record<'fr' | 'en' | 'es', string[]>>
  coverImage?: string | Partial<LocalizedText>
  publishedAt?: string
}

export default defineEventHandler(async (event) => {
  assertAdminAccess(event)

  const body = await readBody<CreateArticleBody>(event)
  const title = buildLocalized(body.title)
  const excerpt = buildLocalized(body.excerpt)
  const content = buildLocalized(body.content)
  const coverImage = buildLocalized(body.coverImage, '')

  if (!title.fr || !excerpt.fr || !content.fr) {
    throw createError({
      statusCode: 400,
      statusMessage:
        'Le titre, le resume et le contenu FR sont obligatoires (EN/ES optionnels).',
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
  const now = new Date().toISOString()
  const publishedAt = body.publishedAt || now
  const slugs = createUniqueLocalizedSlugs(title, articles)

  const article: Article = {
    id: `article-${Date.now()}`,
    slug: slugs.fr,
    slugs,
    title,
    excerpt,
    content,
    tags,
    coverImage,
    readingTime: estimateReadingTime(content.fr),
    createdAt: now,
    updatedAt: now,
    publishedAt,
  }

  const nextArticles = [article, ...articles]
  await writeArticles(nextArticles)

  return { article }
})
