import { describe, expect, it } from 'vitest'
import { useDesktop, WALLPAPERS } from '../../composables/useDesktop'

// These tests exercise the desktop state machine on its server path:
// `import.meta.client` is false here, so `genie()` commits state directly
// without animating — which is exactly the transition logic worth pinning.
describe('floating apps', () => {
  it('focusApp raises the z stack and records the frontmost app', () => {
    const desktop = useDesktop()
    const z1 = desktop.focusApp('music')
    const z2 = desktop.focusApp('weather')
    expect(z2).toBeGreaterThan(z1)
    expect(desktop.state.value.activeApp).toBe('weather')
  })

  it('openApp never toggles an already open app', () => {
    const desktop = useDesktop()
    desktop.openApp('music')
    desktop.openApp('music')
    expect(desktop.state.value.apps.music).toBe(true)
  })

  it('toggleApp closes and blurs, but leaves another frontmost app alone', () => {
    const desktop = useDesktop()
    desktop.toggleApp('music')
    desktop.focusApp('music')
    desktop.toggleApp('music')
    expect(desktop.state.value.apps.music).toBe(false)
    expect(desktop.state.value.activeApp).toBe('')

    desktop.toggleApp('music')
    desktop.focusApp('weather')
    desktop.toggleApp('music')
    expect(desktop.state.value.activeApp).toBe('weather')
  })

  it('minimizeApp keeps the app "running" with a dock dot', () => {
    const desktop = useDesktop()
    desktop.openApp('news')
    desktop.focusApp('news')
    desktop.minimizeApp('news')
    expect(desktop.state.value.apps.news).toBe(false)
    expect(desktop.state.value.minimizedApps.news).toBe(true)
    expect(desktop.state.value.activeApp).toBe('')
  })

  it('closeApp clears both the window and the dock dot', () => {
    const desktop = useDesktop()
    desktop.openApp('maps')
    desktop.minimizeApp('maps')
    desktop.closeApp('maps')
    expect(desktop.state.value.apps.maps).toBe(false)
    expect(desktop.state.value.minimizedApps.maps).toBe(false)
  })
})

describe('desktop windows', () => {
  it('register assigns a z slot once and elects the first active window', () => {
    const desktop = useDesktop()
    desktop.register('about')
    const z = desktop.state.value.wins.about.z
    desktop.register('about')
    expect(desktop.state.value.wins.about.z).toBe(z)
    expect(desktop.state.value.activeWin).toBe('about')
  })

  it('focus raises the window and feeds the menu bar', () => {
    const desktop = useDesktop()
    desktop.register('about')
    desktop.register('terminal')
    const before = desktop.state.value.wins.about.z
    desktop.focus('about')
    expect(desktop.state.value.wins.about.z).toBeGreaterThan(before)
    expect(desktop.state.value.activeWin).toBe('about')
    expect(desktop.state.value.activeApp).toBe('about')
  })

  it('minimize folds the window and drops focus; restore brings both back', () => {
    const desktop = useDesktop()
    desktop.register('about')
    desktop.focus('about')
    desktop.minimize('about')
    expect(desktop.state.value.wins.about.min).toBe(true)
    expect(desktop.state.value.activeWin).toBe('')
    expect(desktop.minimized.value).toEqual(['about'])

    desktop.restore('about')
    expect(desktop.state.value.wins.about.min).toBe(false)
    expect(desktop.state.value.activeWin).toBe('about')
    expect(desktop.minimized.value).toEqual([])
  })

  it('ignores operations on unregistered windows', () => {
    const desktop = useDesktop()
    desktop.focus('ghost')
    desktop.minimize('ghost')
    desktop.restore('ghost')
    desktop.toggleZoom('ghost')
    expect(desktop.state.value.activeWin).toBe('')
  })
})

describe('desktop-wide behavior', () => {
  it('blurAll hands focus back to the desktop', () => {
    const desktop = useDesktop()
    desktop.register('about')
    desktop.focus('about')
    desktop.focusApp('music')
    desktop.blurAll()
    expect(desktop.state.value.activeApp).toBe('')
    expect(desktop.state.value.activeWin).toBe('')
  })

  it('cycleWallpaper leaves automatic mode and wraps around', () => {
    const desktop = useDesktop()
    expect(desktop.state.value.wallpaperAuto).toBe(true)
    for (let i = 0; i < WALLPAPERS.length; i++) desktop.cycleWallpaper()
    expect(desktop.state.value.wallpaperAuto).toBe(false)
    expect(desktop.state.value.wallpaper).toBe(0)
  })

  it('shares one state across composable instances', () => {
    const a = useDesktop()
    const b = useDesktop()
    a.focusApp('sports')
    expect(b.state.value.activeApp).toBe('sports')
  })
})
