// eslint-disable-next-line import/no-named-as-default
import posthog from 'posthog-js'

// PostHog (cloud EU) : autocapture, pageviews SPA, session replay
// et suivi des ouvertures d'apps du bureau.
// - cookieless (persistence memory) : pas de bannière de consentement
// - init différée après le boot pour ne pas peser sur le LCP
// - `.ph-no-capture` sur un élément l'exclut entièrement du replay
export default defineNuxtPlugin((nuxtApp) => {
  const { posthogKey, posthogHost } = useRuntimeConfig().public

  if (!posthogKey) return {}

  const start = () => {
    posthog.init(posthogKey as string, {
      api_host: (posthogHost as string) || 'https://eu.i.posthog.com',
      persistence: 'memory',
      capture_pageview: false,
      autocapture: true,
      session_recording: {
        maskAllInputs: true,
      },
    })

    // Pageviews SPA : à l'init puis à chaque navigation
    posthog.capture('$pageview')
    useRouter().afterEach((to) => {
      posthog.capture('$pageview', { path: to.fullPath })
    })

    // Une app du bureau passe de fermée à ouverte → événement dédié
    const desktop = useDesktop()
    for (const id of Object.keys(desktop.state.value.apps)) {
      watch(
        () => desktop.state.value.apps[id],
        (open, was) => {
          if (open && !was) posthog.capture('app_opened', { app: id })
        }
      )
    }
  }

  nuxtApp.hook('app:mounted', () => {
    // après l'écran de boot et le premier rendu
    setTimeout(start, 2500)
  })

  return { provide: { posthog } }
})
