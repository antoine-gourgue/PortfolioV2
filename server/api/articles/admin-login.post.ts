export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const expectedKey = config.articleAdminKey

  if (!expectedKey) {
    throw createError({
      statusCode: 500,
      statusMessage:
        "ARTICLE_ADMIN_KEY est manquant. Definis-le dans les variables d'environnement.",
    })
  }

  const body = await readBody<{ password?: string }>(event)
  const password = body.password?.trim()

  if (!password || password !== expectedKey) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Mot de passe invalide',
    })
  }

  setCookie(event, 'ag_articles_admin', '1', {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 8,
  })

  return { success: true }
})
