interface WinState {
  min: boolean
  zoom: boolean
  z: number
}

interface DesktopState {
  wins: Record<string, WinState>
  topZ: number
  activeWin: string
  wallpaper: number
  spotlightOpen: boolean
  apps: Record<string, boolean>
  minimizedApps: Record<string, boolean>
  wallpaperAuto: boolean
  notifOpen: boolean
  locked: boolean
  sfxMuted: boolean
}

// Fonds d'écran façon macOS : dégradés riches multi-couches (radial + linear)
export const WALLPAPERS = [
  // Tahoe Blue
  'radial-gradient(110% 85% at 12% 8%, rgba(94,158,240,0.75) 0%, rgba(94,158,240,0) 52%), radial-gradient(95% 75% at 88% 18%, rgba(140,190,255,0.55) 0%, rgba(140,190,255,0) 55%), radial-gradient(130% 100% at 50% 108%, rgba(6,26,74,0.95) 0%, rgba(6,26,74,0) 62%), linear-gradient(165deg, #0b1f4d 0%, #1d4fa8 55%, #3f7fdc 100%)',
  // Graphite
  'radial-gradient(100% 80% at 20% 10%, rgba(150,158,182,0.5) 0%, rgba(150,158,182,0) 55%), radial-gradient(120% 90% at 85% 90%, rgba(20,22,32,0.9) 0%, rgba(20,22,32,0) 60%), linear-gradient(165deg, #191b26 0%, #3c4160 60%, #7a83a8 100%)',
  // Violet dusk
  'radial-gradient(110% 80% at 15% 12%, rgba(190,120,235,0.55) 0%, rgba(190,120,235,0) 55%), radial-gradient(120% 95% at 85% 95%, rgba(30,10,60,0.95) 0%, rgba(30,10,60,0) 60%), linear-gradient(165deg, #241143 0%, #58288c 55%, #a566cf 100%)',
  // Deep teal
  'radial-gradient(110% 80% at 18% 10%, rgba(80,200,180,0.5) 0%, rgba(80,200,180,0) 55%), radial-gradient(120% 95% at 82% 95%, rgba(2,26,32,0.95) 0%, rgba(2,26,32,0) 60%), linear-gradient(165deg, #052e33 0%, #0d5c60 55%, #3aa694 100%)',
]

export function useDesktop() {
  const state = useState<DesktopState>('desktop', () => ({
    wins: {},
    topZ: 10,
    activeWin: '',
    wallpaper: 0,
    spotlightOpen: false,
    apps: {
      weather: false,
      calculator: false,
      messages: false,
      music: false,
      settings: false,
      trash: false,
      airdrop: false,
      maps: false,
      siri: false,
      news: false,
      sports: false,
    },
    minimizedApps: {},
    wallpaperAuto: true,
    notifOpen: false,
    locked: false,
    sfxMuted: false,
  }))

  const toggleApp = (id: string) => {
    state.value.apps[id] = !state.value.apps[id]
    state.value.minimizedApps[id] = false
  }
  const closeApp = (id: string) => {
    state.value.apps[id] = false
    state.value.minimizedApps[id] = false
  }
  // Réduite : fenêtre masquée mais app « en cours » (point dans le Dock)
  const minimizeApp = (id: string) => {
    state.value.apps[id] = false
    state.value.minimizedApps[id] = true
  }

  // Même échelle de z que les fenêtres d'app (bringToFront : 40 + topZ),
  // pour qu'un clic fasse toujours passer la fenêtre devant, quel que soit son type
  const register = (id: string) => {
    if (!state.value.wins[id]) {
      state.value.wins[id] = {
        min: false,
        zoom: false,
        z: 40 + ++state.value.topZ,
      }
      if (!state.value.activeWin) state.value.activeWin = id
    }
  }

  const focus = (id: string) => {
    const win = state.value.wins[id]
    if (!win) return
    win.z = 40 + ++state.value.topZ
    state.value.activeWin = id
  }

  const minimize = (id: string) => {
    const win = state.value.wins[id]
    if (!win) return
    win.min = true
    if (state.value.activeWin === id) state.value.activeWin = ''
  }

  const restore = (id: string) => {
    const win = state.value.wins[id]
    if (!win) return
    win.min = false
    focus(id)
  }

  const toggleZoom = (id: string) => {
    const win = state.value.wins[id]
    if (!win) return
    win.zoom = !win.zoom
    focus(id)
  }

  const cycleWallpaper = () => {
    // Le choix manuel désactive le mode automatique (selon l'heure)
    state.value.wallpaperAuto = false
    state.value.wallpaper = (state.value.wallpaper + 1) % WALLPAPERS.length
  }

  const minimized = computed(() =>
    Object.entries(state.value.wins)
      .filter(([, w]) => w.min)
      .map(([id]) => id)
  )

  return {
    state,
    register,
    focus,
    minimize,
    restore,
    toggleZoom,
    cycleWallpaper,
    minimized,
    toggleApp,
    closeApp,
    minimizeApp,
  }
}
