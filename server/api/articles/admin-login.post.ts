import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_MAX_AGE,
  createAdminSessionToken,
  matchesAdminKey,
} from '~/server/utils/admin'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const expectedKey =
    typeof config.articleAdminKey === 'string' ? config.articleAdminKey : ''

  if (!expectedKey) {
    throw createError({
      statusCode: 500,
      statusMessage:
        "ARTICLE_ADMIN_KEY est manquant. Definis-le dans les variables d'environnement.",
    })
  }

  const body = await readBody<{ password?: string }>(event)
  const password = body.password?.trim()

  if (!matchesAdminKey(password, expectedKey)) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Mot de passe invalide',
    })
  }

  setCookie(event, ADMIN_SESSION_COOKIE, createAdminSessionToken(expectedKey), {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: ADMIN_SESSION_MAX_AGE,
  })

  return { success: true }
})
