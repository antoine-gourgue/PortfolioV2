interface WinState {
  min: boolean
  zoom: boolean
  z: number
}

interface DesktopState {
  wins: Record<string, WinState>
  topZ: number
  activeWin: string
  /** App au premier plan : pilote le nom et les menus de la barre de menu */
  activeApp: string
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
    activeApp: '',
    wallpaper: 0,
    spotlightOpen: false,
    apps: {
      weather: false,
      calculator: false,
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

  /**
   * Passe une app flottante au premier plan et renvoie son nouveau z-index.
   * Toutes les apps y passent, à l'ouverture comme au clic : c'est ce qui
   * permet à la barre de menu de savoir quelle app est active.
   */
  const focusApp = (id: string) => {
    state.value.activeApp = id
    return 40 + ++state.value.topZ
  }

  // Une app qui disparaît rend la main au bureau
  const blurApp = (id: string) => {
    if (state.value.activeApp === id) state.value.activeApp = ''
  }

  const toggleApp = (id: string) => {
    state.value.apps[id] = !state.value.apps[id]
    state.value.minimizedApps[id] = false
    if (!state.value.apps[id]) blurApp(id)
  }
  // Ouvre sans basculer : le Launchpad ne doit jamais refermer une app déjà là
  const openApp = (id: string) => {
    state.value.apps[id] = true
    state.value.minimizedApps[id] = false
  }
  const closeApp = (id: string) => {
    state.value.apps[id] = false
    state.value.minimizedApps[id] = false
    blurApp(id)
  }
  /**
   * Aspiration vers le Dock, comme le « genie » de macOS. La bascule d'état
   * n'a lieu qu'à la fin : sinon la fenêtre disparaîtrait avant de bouger.
   * Les positions sont remises à zéro après coup, car les fenêtres du bureau
   * survivent en v-show et resteraient invisibles et décalées à la réouverture.
   */
  const genie = (id: string, done: () => void) => {
    if (!import.meta.client) return done()

    const el = document.querySelector<HTMLElement>(`[data-window="${id}"]`)
    // Sur mobile les apps sont en plein écran et il n'y a pas de Dock à viser
    if (!el || !window.matchMedia('(min-width: 1024px)').matches) return done()

    const { gsap } = useGsap()
    const rect = el.getBoundingClientRect()
    gsap.to(el, {
      // décalages relatifs : la fenêtre a pu être déplacée à la souris
      x: `+=${Math.round(window.innerWidth / 2 - (rect.left + rect.width / 2))}`,
      y: `+=${Math.round(window.innerHeight - rect.top)}`,
      scale: 0.15,
      autoAlpha: 0,
      duration: 0.45,
      ease: 'power2.in',
      transformOrigin: 'center bottom',
      onComplete: () => {
        done()
        gsap.set(el, { clearProps: 'x,y,scale,opacity,visibility' })
      },
    })
  }

  // Réduite : fenêtre masquée mais app « en cours » (point dans le Dock)
  const minimizeApp = (id: string) =>
    genie(id, () => {
      state.value.apps[id] = false
      state.value.minimizedApps[id] = true
      blurApp(id)
    })

  // Clic sur le bureau : plus aucune app au premier plan
  const blurAll = () => {
    state.value.activeApp = ''
    state.value.activeWin = ''
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
    state.value.activeApp = id
  }

  const minimize = (id: string) => {
    const win = state.value.wins[id]
    if (!win) return
    genie(id, () => {
      win.min = true
      if (state.value.activeWin === id) state.value.activeWin = ''
      blurApp(id)
    })
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
    focusApp,
    blurAll,
    toggleApp,
    openApp,
    closeApp,
    minimizeApp,
  }
}
