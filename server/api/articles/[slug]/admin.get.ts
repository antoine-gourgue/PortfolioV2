import { assertAdminAccess } from '~/server/utils/admin'
import { findArticleIndexBySlug, readArticles } from '~/server/utils/articles'

export default defineEventHandler(async (event) => {
  assertAdminAccess(event)

  const slug = getRouterParam(event, 'slug')
  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Le slug est obligatoire',
    })
  }

  const articles = await readArticles()
  const index = findArticleIndexBySlug(articles, slug)
  const article = index >= 0 ? articles[index] : undefined

  if (!article) {
    throw createError({ statusCode: 404, statusMessage: 'Article introuvable' })
  }

  return { article }
})
