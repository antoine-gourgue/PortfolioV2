// Envoi d'événements PostHog : no-op si le plugin n'est pas initialisé
// (clé absente, SSR, ou pendant les 2,5 s de différé du chargement)
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
