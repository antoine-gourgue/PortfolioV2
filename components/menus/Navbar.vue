<template>
  <!-- Mobile dock (iOS) — on desktop, MacMenuBar + MacDock take over -->
  <nav
    v-show="!appOpen"
    class="lg:hidden fixed bottom-3 left-1/2 z-[300] flex -translate-x-1/2 items-center gap-3 rounded-[26px] border border-white/30 bg-white/20 px-4 py-2.5 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:bottom-5 sm:gap-4 sm:rounded-[32px] sm:px-5 sm:py-3"
  >
    <component
      :is="item.app ? 'button' : NuxtLinkComponent"
      v-for="item in items"
      :key="item.label"
      v-bind="item.app ? {} : { to: localePath(item.path!) }"
      class="relative block h-11 w-11 sm:h-[62px] sm:w-[62px]"
      :aria-label="$t(item.label)"
      @click="item.app && desktop.openApp(item.app)"
    >
      <DesktopMacAppIcon :name="item.icon" />
      <span
        v-if="
          item.app
            ? desktop.state.value.apps[item.app]
            : item.path && isActive(item.path)
        "
        class="absolute -bottom-[7px] left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-white/80"
      ></span>
    </component>

    <button
      class="relative block h-11 w-11 sm:h-[62px] sm:w-[62px]"
      :aria-label="$t('macos.siriTitle')"
      @click="desktop.toggleApp('siri')"
    >
      <DesktopMacAppIcon name="siri" />
      <span
        v-if="desktop.state.value.apps.siri"
        class="absolute -bottom-[7px] left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-white/80"
      ></span>
    </button>
  </nav>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const localePath = useLocalePath()
const desktop = useDesktop()

const NuxtLinkComponent = resolveComponent('NuxtLink')

// Home stays a real route; every other entry opens a desktop/mobile app
interface DockItem {
  label: string
  icon: string
  path?: string
  app?: string
}
const items: DockItem[] = [
  { path: '/', label: 'nav.home', icon: 'finder' },
  { app: 'projects', label: 'nav.projects', icon: 'appstore' },
  { app: 'about', label: 'nav.about', icon: 'contacts' },
  { app: 'blog', label: 'nav.blog', icon: 'notes' },
  { app: 'contact', label: 'nav.contact', icon: 'mail' },
]

const isActive = (path: string) => {
  const currentPath = route.path.replace(/^\/[a-z]{2}(\/|$)/, '/')
  return currentPath === path || (path !== '/' && currentPath.startsWith(path))
}

// Like iOS: the dock only exists on the home screen. An open app takes the
// whole screen — you leave it by swiping.
const appOpen = computed(() =>
  Object.values(desktop.state.value.apps).some(Boolean)
)
</script>
