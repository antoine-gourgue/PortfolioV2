<template>
  <div class="min-h-[100svh] flex flex-col font-sans text-aink">
    <!-- Fond d'écran macOS partagé par toutes les pages -->
    <div
      class="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      :style="{ backgroundImage: wallpaper.style.value }"
    >
      <div
        class="absolute -left-[10%] top-[-15%] hidden h-[36rem] w-[36rem] rounded-full bg-white/10 blur-[130px] lg:block"
      ></div>
      <div
        class="absolute right-[-8%] top-[25%] hidden h-[32rem] w-[32rem] rounded-full bg-white/10 blur-[130px] lg:block"
      ></div>
      <AgLogo
        class="absolute left-1/2 top-1/2 h-72 w-80 -translate-x-1/2 -translate-y-1/2 text-white opacity-[0.07]"
      />
    </div>

    <MacMenuBar />
    <Navbar />

    <main class="flex-1 lg:pb-28">
      <slot />
    </main>

    <MacDock />
    <DesktopBootScreen />

    <!--
      Fenêtres d'apps : montées fermées, elles n'ont pas besoin de participer
      à l'hydratation initiale. Sur iPhone, hydrater ces quinze composants
      bloquait le fil principal plusieurs secondes — aucun tap ne répondait.
      `hydrate-on-idle` les rend interactives dès la première accalmie.
    -->
    <LazyDesktopLaunchpad hydrate-on-idle />
    <LazyDesktopSpotlight hydrate-on-idle />
    <LazyDesktopAppWeather hydrate-on-idle />
    <LazyDesktopAppCalculator hydrate-on-idle />
    <LazyDesktopAppMusic hydrate-on-idle />
    <LazyDesktopAppSettings hydrate-on-idle />
    <LazyDesktopAppTrash hydrate-on-idle />
    <LazyDesktopAirDropModal hydrate-on-idle />
    <LazyDesktopNotificationCenter hydrate-on-idle />
    <LazyDesktopAppMaps hydrate-on-idle />
    <LazyDesktopAppSiri hydrate-on-idle />
    <LazyDesktopAppNews hydrate-on-idle />
    <LazyDesktopAppSports hydrate-on-idle />
    <LazyDesktopLockScreen hydrate-on-idle />
    <LazyDesktopNotificationBanner hydrate-on-idle />
  </div>
</template>

<script setup>
import Navbar from '@/components/menus/Navbar.vue'
import MacMenuBar from '~/components/menus/MacMenuBar.vue'
import MacDock from '~/components/menus/MacDock.vue'
import DesktopBootScreen from '~/components/desktop/BootScreen.vue'
import AgLogo from '~/components/ui/AGLogo.vue'

const wallpaper = useWallpaper()
const desktop = useDesktop()

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
