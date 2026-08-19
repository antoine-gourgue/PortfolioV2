import { WALLPAPERS } from '~/composables/useDesktop'

/**
 * Fond d'écran dynamique : suit l'heure du visiteur comme sur macOS
 * (aube → journée → crépuscule → nuit), sauf si un fond est choisi
 * manuellement dans Réglages ou via le clic droit.
 */
export function useWallpaper() {
  const desktop = useDesktop()
  const hour = useState('wallpaper-hour', () => new Date().getHours())

  const autoIndex = computed(() => {
    const h = hour.value
    if (h >= 22 || h < 6) return 1 // nuit — Graphite
    if (h < 10) return 3 // aube — Deep teal
    if (h < 18) return 0 // journée — Tahoe Blue
    return 2 // soirée — Violet dusk
  })

  const index = computed(() =>
    desktop.state.value.wallpaperAuto
      ? autoIndex.value
      : desktop.state.value.wallpaper
  )

  const style = computed(() => WALLPAPERS[index.value])

  const refresh = () => {
    hour.value = new Date().getHours()
  }

  return { index, style, autoIndex, refresh }
}
