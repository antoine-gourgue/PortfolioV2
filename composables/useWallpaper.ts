import { WALLPAPERS } from '~/composables/useDesktop'

/**
 * Dynamic wallpaper: follows the visitor's local time like macOS
 * (dawn → day → dusk → night), unless a wallpaper was picked manually
 * in Settings or via the desktop context menu.
 */
export function useWallpaper() {
  const desktop = useDesktop()
  const hour = useState('wallpaper-hour', () => new Date().getHours())

  const autoIndex = computed(() => {
    const h = hour.value
    if (h >= 22 || h < 6) return 1 // night — Graphite
    if (h < 10) return 3 // dawn — Deep teal
    if (h < 18) return 0 // day — Tahoe Blue
    return 2 // evening — Violet dusk
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
