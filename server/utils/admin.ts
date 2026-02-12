import type { H3Event } from 'h3'

export const assertAdminAccess = (event: H3Event) => {
  const config = useRuntimeConfig(event)
  const expectedKey = config.articleAdminKey
  const providedKey = getHeader(event, 'x-admin-key')
  const sessionCookie = getCookie(event, 'ag_articles_admin')

  if (!expectedKey) {
    throw createError({
      statusCode: 500,
      statusMessage:
        'ARTICLE_ADMIN_KEY is missing. Set it in environment variables.',
    })
  }

  const hasHeaderAccess = providedKey && providedKey === expectedKey
  const hasSessionAccess = sessionCookie === '1'

  if (!hasHeaderAccess && !hasSessionAccess) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }
}
