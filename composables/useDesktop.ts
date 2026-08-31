interface WinState {
  min: boolean
  zoom: boolean
  z: number
}

interface DesktopState {
  wins: Record<string, WinState>
  topZ: number
  activeWin: string
  /** Frontmost app id — drives the menu bar's name and menus */
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

/** macOS-style wallpapers: layered radial + linear gradients */
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
   * Bring a floating app to the front and return its new z-index.
   * Every app routes through here, on open and on click alike — this is
   * what lets the menu bar know which app is active.
   */
  const focusApp = (id: string) => {
    state.value.activeApp = id
    return 40 + ++state.value.topZ
  }

  // An app that goes away hands focus back to the desktop
  const blurApp = (id: string) => {
    if (state.value.activeApp === id) state.value.activeApp = ''
  }

  const toggleApp = (id: string) => {
    state.value.apps[id] = !state.value.apps[id]
    state.value.minimizedApps[id] = false
    if (!state.value.apps[id]) blurApp(id)
  }
  // Open without toggling: Launchpad must never close an app that is already up
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
   * Suck the window into the Dock, like macOS's genie effect. State only
   * flips once the animation completes — otherwise the window would vanish
   * before it moves. Transforms are cleared afterwards because desktop
   * windows live behind v-show and would reopen invisible and offset.
   */
  const genie = (id: string, done: () => void) => {
    if (!import.meta.client) return done()

    const el = document.querySelector<HTMLElement>(`[data-window="${id}"]`)
    // On mobile apps are full-screen and there is no Dock to aim at
    if (!el || !window.matchMedia('(min-width: 1024px)').matches) return done()

    const { gsap } = useGsap()
    const rect = el.getBoundingClientRect()
    gsap.to(el, {
      // relative offsets: the window may have been dragged around
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

  // Minimized: window hidden but app still "running" (dot in the Dock)
  const minimizeApp = (id: string) =>
    genie(id, () => {
      state.value.apps[id] = false
      state.value.minimizedApps[id] = true
      blurApp(id)
    })

  // Desktop click: nothing is frontmost any more
  const blurAll = () => {
    state.value.activeApp = ''
    state.value.activeWin = ''
  }

  // Same z scale as floating apps (40 + topZ) so a click always brings a
  // window to the front regardless of its kind
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
    // A manual pick disables the time-of-day automatic mode
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
