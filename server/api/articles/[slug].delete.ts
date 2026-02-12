import {
  findArticleIndexBySlug,
  readArticles,
  writeArticles,
} from '~/server/utils/articles'
import { assertAdminAccess } from '~/server/utils/admin'

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

  if (index === -1) {
    throw createError({ statusCode: 404, statusMessage: 'Article introuvable' })
  }

  const removed = articles[index]
  const next = [...articles]
  next.splice(index, 1)
  await writeArticles(next)

  return {
    success: true,
    slug: removed.slug,
  }
})
