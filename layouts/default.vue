<template>
  <div class="min-h-screen flex flex-col font-sans text-aink">
    <!-- Fond d'écran macOS partagé par toutes les pages -->
    <div
      class="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      :style="{ backgroundImage: WALLPAPERS[desktop.state.value.wallpaper] }"
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

    <main class="flex-1 pb-24 lg:pb-28">
      <slot />
    </main>

    <MacDock />
    <DesktopSpotlight />
    <DesktopBootScreen />
    <DesktopAppWeather />
    <DesktopAppCalculator />
    <DesktopAppMessages />
    <DesktopAppMusic />
    <DesktopAppSettings />
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
import DesktopAppMessages from '~/components/desktop/AppMessages.vue'
import DesktopAppMusic from '~/components/desktop/AppMusic.vue'
import DesktopAppSettings from '~/components/desktop/AppSettings.vue'
import DesktopLockScreen from '~/components/desktop/LockScreen.vue'
import DesktopNotificationBanner from '~/components/desktop/NotificationBanner.vue'
import AgLogo from '~/components/ui/AGLogo.vue'

const desktop = useDesktop()
</script>
