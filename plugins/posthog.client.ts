// eslint-disable-next-line import/no-named-as-default
import posthog from 'posthog-js'

/**
 * PostHog (EU cloud): autocapture, SPA pageviews, session replay and
 * desktop-app open tracking.
 * - cookieless (memory persistence): no consent banner needed
 * - init deferred past boot so it never weighs on the LCP
 * - `.ph-no-capture` on an element excludes it from replay entirely
 */
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

    // SPA pageviews: on init, then on every navigation
    posthog.capture('$pageview')
    useRouter().afterEach((to) => {
      posthog.capture('$pageview', { path: to.fullPath })
    })

    // A desktop app flipping closed → open gets its own event
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
    // past the boot screen and the first paint
    setTimeout(start, 2500)
  })

  return { provide: { posthog } }
})
