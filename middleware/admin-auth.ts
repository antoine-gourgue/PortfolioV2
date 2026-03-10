export default defineNuxtRouteMiddleware(async (to) => {
  const localeMatch = to.path.match(/^\/(fr|en|es)(?=\/|$)/)
  const localePrefix = localeMatch?.[1]
  const normalizedPath = to.path.replace(/^\/(fr|en|es)(?=\/|$)/, '') || '/'

  if (!normalizedPath.startsWith('/admin')) {
    return
  }

  if (normalizedPath === '/admin/login') {
    return
  }

  const headers = process.server ? useRequestHeaders(['cookie']) : undefined

  try {
    const session = await $fetch<{ authenticated: boolean }>(
      '/api/articles/admin-session',
      { headers }
    )

    if (session.authenticated) {
      return
    }
  } catch {
    // noop
  }

  const loginPath =
    localePrefix && localePrefix !== 'fr'
      ? `/${localePrefix}/admin/login`
      : '/admin/login'

  return navigateTo(loginPath)
})
