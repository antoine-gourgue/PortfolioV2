/**
 * Security headers on the site's responses. Deliberately a middleware
 * rather than a `/**` routeRule: the latter also intercepts files served
 * by the dev bundler, which breaks client-side i18n locale loading.
 */
const SKIP = ['/_nuxt', '/__nuxt', '/@', '/node_modules', '/_ipx']

export default defineEventHandler((event) => {
  const path = event.path || ''
  if (SKIP.some((p) => path.startsWith(p))) return

  setResponseHeaders(event, {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'SAMEORIGIN',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy':
      'camera=(), geolocation=(self), microphone=(self), payment=()',
  })
})
