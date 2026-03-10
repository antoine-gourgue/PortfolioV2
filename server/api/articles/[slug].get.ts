import {
  findArticleIndexBySlug,
  readArticles,
  resolveByLocale,
  resolveSlugByLocale,
  resolveTagsByLocale,
} from '~/server/utils/articles'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  const locale = getQuery(event).locale as string | undefined

  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Slug is required' })
  }

  const articles = await readArticles()
  const index = findArticleIndexBySlug(articles, slug)
  const article = index >= 0 ? articles[index] : undefined

  if (!article) {
    throw createError({ statusCode: 404, statusMessage: 'Article not found' })
  }

  return {
    article: {
      id: article.id,
      slug: resolveSlugByLocale(article.slugs, locale),
      title: resolveByLocale(article.title, locale),
      excerpt: resolveByLocale(article.excerpt, locale),
      content: resolveByLocale(article.content, locale),
      tags: resolveTagsByLocale(article.tags, locale),
      readingTime: article.readingTime,
      coverImage: resolveByLocale(article.coverImage, locale),
      createdAt: article.createdAt,
      updatedAt: article.updatedAt,
      publishedAt: article.publishedAt,
    },
  }
})
