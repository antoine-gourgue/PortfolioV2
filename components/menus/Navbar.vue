<template>
  <!-- Dock mobile (iOS) — sur desktop, MacMenuBar + MacDock prennent le relais -->
  <nav
    class="lg:hidden fixed bottom-3 left-1/2 z-[70] flex -translate-x-1/2 items-center gap-3 rounded-[26px] border border-white/30 bg-white/20 px-4 py-2.5 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
  >
    <NuxtLink
      v-for="item in items"
      :key="item.path"
      :to="localePath(item.path)"
      class="relative block h-11 w-11"
      :aria-label="$t(item.label)"
    >
      <DesktopMacAppIcon :name="item.icon" />
      <span
        v-if="isActive(item.path)"
        class="absolute -bottom-[7px] left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-white/80"
      ></span>
    </NuxtLink>

    <button
      class="relative block h-11 w-11"
      :aria-label="$t('macos.messagesTitle')"
      @click="desktop.toggleApp('messages')"
    >
      <DesktopMacAppIcon name="messages" />
      <span
        v-if="desktop.state.value.apps.messages"
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

const items = [
  { path: '/', label: 'nav.home', icon: 'finder' },
  { path: '/projects', label: 'nav.projects', icon: 'appstore' },
  { path: '/about', label: 'nav.about', icon: 'contacts' },
  { path: '/blog', label: 'nav.blog', icon: 'notes' },
  { path: '/contact', label: 'nav.contact', icon: 'mail' },
]

const isActive = (path: string) => {
  const currentPath = route.path.replace(/^\/[a-z]{2}(\/|$)/, '/')
  return currentPath === path || (path !== '/' && currentPath.startsWith(path))
}
</script>
