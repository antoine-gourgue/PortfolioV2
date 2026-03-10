import {
  readArticles,
  resolveByLocale,
  resolveSlugByLocale,
  resolveTagsByLocale,
} from '~/server/utils/articles'

export default defineEventHandler(async (event) => {
  const locale = getQuery(event).locale as string | undefined
  const articles = await readArticles()
  return {
    articles: articles.map((article) => ({
      id: article.id,
      slug: resolveSlugByLocale(article.slugs, locale),
      title: resolveByLocale(article.title, locale),
      excerpt: resolveByLocale(article.excerpt, locale),
      tags: resolveTagsByLocale(article.tags, locale),
      readingTime: article.readingTime,
      publishedAt: article.publishedAt,
      updatedAt: article.updatedAt,
    })),
  }
})
