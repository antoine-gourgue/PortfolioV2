/**
 * PostHog event capture. No-op when the plugin is not initialized —
 * missing key, SSR, or during the 2.5s deferred load.
 */
export function useTrack() {
  const nuxtApp = useNuxtApp()
  return (event: string, properties?: Record<string, unknown>) => {
    const posthog = nuxtApp.$posthog as
      | {
          __loaded?: boolean
          capture?: (e: string, p?: Record<string, unknown>) => void
        }
      | undefined
    if (!posthog?.__loaded) return
    posthog.capture?.(event, properties)
  }
}
