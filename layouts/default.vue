<template>
  <div class="min-h-screen flex flex-col font-sans text-aink">
    <!-- Fond d'écran macOS partagé par toutes les pages -->
    <div
      class="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      :style="{ backgroundImage: wallpaper.style.value }"
    >
      <div
        class="absolute -left-[10%] top-[-15%] h-[36rem] w-[36rem] rounded-full bg-white/10 blur-[130px]"
      ></div>
      <div
        class="absolute right-[-8%] top-[25%] h-[32rem] w-[32rem] rounded-full bg-white/10 blur-[130px]"
      ></div>
      <AgLogo
        class="absolute left-1/2 top-1/2 h-72 w-80 -translate-x-1/2 -translate-y-1/2 text-white opacity-[0.07]"
      />
    </div>

    <MacMenuBar />
    <Navbar />

    <main class="flex-1 lg:pb-28" :class="dockVisible ? 'pb-24' : ''">
      <slot />
    </main>

    <MacDock />
    <DesktopLaunchpad />
    <DesktopSpotlight />
    <DesktopBootScreen />
    <DesktopAppWeather />
    <DesktopAppCalculator />
    <DesktopAppMusic />
    <DesktopAppSettings />
    <DesktopAppTrash />
    <DesktopAirDropModal />
    <DesktopNotificationCenter />
    <DesktopAppMaps />
    <DesktopAppSiri />
    <DesktopAppNews />
    <DesktopAppSports />
    <DesktopLockScreen />
    <DesktopNotificationBanner />
  </div>
</template>

<script setup>
import Navbar from '@/components/menus/Navbar.vue'
import MacMenuBar from '~/components/menus/MacMenuBar.vue'
import MacDock from '~/components/menus/MacDock.vue'
import DesktopSpotlight from '~/components/desktop/Spotlight.vue'
import DesktopBootScreen from '~/components/desktop/BootScreen.vue'
import DesktopAppWeather from '~/components/desktop/AppWeather.vue'
import DesktopAppCalculator from '~/components/desktop/AppCalculator.vue'
import DesktopAppMusic from '~/components/desktop/AppMusic.vue'
import DesktopAppSettings from '~/components/desktop/AppSettings.vue'
import DesktopAppTrash from '~/components/desktop/AppTrash.vue'
import DesktopAirDropModal from '~/components/desktop/AirDropModal.vue'
import DesktopNotificationCenter from '~/components/desktop/NotificationCenter.vue'
import DesktopAppMaps from '~/components/desktop/AppMaps.vue'
import DesktopAppSiri from '~/components/desktop/AppSiri.vue'
import DesktopAppNews from '~/components/desktop/AppNews.vue'
import DesktopAppSports from '~/components/desktop/AppSports.vue'
import DesktopLockScreen from '~/components/desktop/LockScreen.vue'
import DesktopNotificationBanner from '~/components/desktop/NotificationBanner.vue'
import AgLogo from '~/components/ui/AGLogo.vue'

const wallpaper = useWallpaper()
const desktop = useDesktop()
const route = useRoute()

// Le dock mobile ne s'affiche que sur l'accueil : ailleurs, réserver sa hauteur
// laissait apparaître le fond d'écran sous la page (voir Navbar.vue)
const dockVisible = computed(
  () => route.path.replace(/^\/[a-z]{2}(\/|$)/, '/') === '/'
)

// Comme sur macOS, cliquer sur le bureau désactive l'app au premier plan :
// la barre de menu reprend l'identité du site. Les fenêtres (`[data-window]`
// et `.win`), la barre de menu (`header`) et les docks (`nav`) gardent la main.
const onDesktopPointerDown = (e) => {
  const target = e.target
  if (!(target instanceof Element)) return
  if (target.closest('[data-window], .win, header, nav')) return
  desktop.blurAll()
}
onMounted(() => window.addEventListener('pointerdown', onDesktopPointerDown))
onUnmounted(() =>
  window.removeEventListener('pointerdown', onDesktopPointerDown)
)

let wallpaperTimer = null
onMounted(() => {
  wallpaperTimer = setInterval(() => wallpaper.refresh(), 60_000)
})
onUnmounted(() => {
  if (wallpaperTimer) clearInterval(wallpaperTimer)
})
</script>
