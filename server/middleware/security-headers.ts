// En-têtes de sécurité sur les réponses du site.
// Volontairement posés en middleware plutôt qu'en routeRules `/**` : cette
// dernière intercepte aussi les fichiers servis par le bundler en dev, ce qui
// fait échouer le chargement des locales i18n côté client.
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
