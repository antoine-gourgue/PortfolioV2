<template>
  <nav
    ref="dockEl"
    class="fixed bottom-3 left-1/2 z-[70] hidden h-[70px] -translate-x-1/2 items-end gap-2 overflow-visible rounded-[26px] border border-white/30 bg-white/20 px-3 pb-[9px] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.45)] backdrop-blur-2xl lg:flex"
    @mouseenter="captureRestPositions"
    @mouseleave="resetAll"
  >
    <!-- Apps -->
    <component
      :is="item.href ? 'a' : NuxtLinkComponent"
      v-for="item in apps"
      :key="item.id"
      :ref="setItemRef"
      v-bind="
        item.href
          ? { href: item.href, target: '_blank' }
          : { to: localePath(item.path!) }
      "
      class="dock-icon group"
      :aria-label="item.raw ?? $t(item.label)"
      @click="bounce"
    >
      <DesktopMacAppIcon :name="item.icon" />

      <span class="dock-tip">{{ item.raw ? item.label : $t(item.label) }}</span>

      <span
        v-if="item.path && isActive(item.path)"
        class="absolute -bottom-[7px] left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-white/80"
      ></span>
    </component>

    <!-- Apps utilitaires (Météo, Calculatrice) -->
    <button
      v-for="app in utilApps"
      :key="app.id"
      :ref="setItemRef"
      class="dock-icon group"
      @click="(toggleApp(app.id), bounce($event))"
    >
      <DesktopMacAppIcon :name="app.icon" />
      <span class="dock-tip">{{ $t(app.label) }}</span>
      <span
        v-if="state.apps[app.id] || (app.id === 'music' && musicPlaying)"
        class="absolute -bottom-[7px] left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-white/80"
      ></span>
    </button>

    <!-- Fenêtres réduites -->
    <template v-if="minimized.length">
      <div class="mx-1 h-11 w-px self-center bg-white/30"></div>
      <button
        v-for="id in minimized"
        :key="id"
        :ref="setItemRef"
        class="dock-icon group"
        @click="(sfx.restore(), restore(id))"
      >
        <DesktopMacAppIcon :name="minimizedMeta[id]?.icon ?? 'contacts'" />
        <span class="dock-tip">{{
          minimizedMeta[id]?.raw ??
          $t(minimizedMeta[id]?.label ?? 'macos.aboutTitle')
        }}</span>
      </button>
    </template>

    <!-- Corbeille -->
    <div class="mx-1 h-11 w-px self-center bg-white/30"></div>
    <button :ref="setItemRef" class="dock-icon group" @click="wiggleTrash">
      <span class="trash block h-full w-full">
        <DesktopMacAppIcon name="trash" />
      </span>
      <span class="dock-tip">{{ $t('macos.trash') }}</span>
    </button>
  </nav>
</template>

<script setup lang="ts">
import type { ComponentPublicInstance } from 'vue'

const localePath = useLocalePath()
const route = useRoute()
const { gsap } = useGsap()
const { minimized, restore, toggleApp, state } = useDesktop()

const musicPlaying = computed(() => useMusic().state.value.playing)

const utilApps = [
  { id: 'messages', label: 'macos.messagesTitle', icon: 'messages' },
  { id: 'weather', label: 'macos.weatherTitle', icon: 'weather' },
  { id: 'calculator', label: 'macos.calcTitle', icon: 'calculator' },
  { id: 'music', label: 'macos.musicTitle', icon: 'music' },
]

// Résolution explicite : une chaîne 'NuxtLink' dans <component :is> ne se résout pas
const NuxtLinkComponent = resolveComponent('NuxtLink')

// Icône et libellé des fenêtres réduites, par identifiant
const minimizedMeta: Record<
  string,
  { icon: string; label?: string; raw?: string }
> = {
  about: { icon: 'contacts', label: 'macos.aboutTitle' },
  terminal: { icon: 'terminal', raw: 'Terminal' },
  finder: { icon: 'folder', label: 'macos.finderProjects' },
  notes: { icon: 'calendar', label: 'macos.calTitle' },
  mail: { icon: 'mail', label: 'macos.mailTitle' },
}

interface DockApp {
  id: string
  label: string
  raw?: boolean
  path?: string
  href?: string
  icon: string
}

const apps: DockApp[] = [
  { id: 'finder', label: 'nav.home', path: '/', icon: 'finder' },
  {
    id: 'appstore',
    label: 'nav.projects',
    path: '/projects',
    icon: 'appstore',
  },
  { id: 'contacts', label: 'nav.about', path: '/about', icon: 'contacts' },
  { id: 'notes', label: 'nav.blog', path: '/blog', icon: 'notes' },
  { id: 'mail', label: 'nav.contact', path: '/contact', icon: 'mail' },
  {
    id: 'github',
    label: 'GitHub',
    raw: true,
    href: 'https://github.com/antoine-gourgue',
    icon: 'github',
  },
]

const dockEl = ref<HTMLElement | null>(null)
const itemEls: HTMLElement[] = []

const setItemRef = (el: Element | ComponentPublicInstance | null) => {
  const dom = (el as ComponentPublicInstance)?.$el ?? el
  if (dom instanceof HTMLElement && !itemEls.includes(dom)) itemEls.push(dom)
}

// Magnification par taille réelle (width/height) et non par transform scale :
// les SVG restent vectoriels et parfaitement nets, comme le vrai Dock.
const BASE = 52
const GROW = 32

interface Magnifier {
  w: (v: number) => void
  h: (v: number) => void
}
let magnifiers = new Map<HTMLElement, Magnifier>()
let onMove: ((e: MouseEvent) => void) | undefined

const isActive = (path: string) => {
  const currentPath = route.path.replace(/^\/[a-z]{2}(\/|$)/, '/')
  return currentPath === path || (path !== '/' && currentPath.startsWith(path))
}

const ensureMagnifier = (el: HTMLElement) => {
  if (!magnifiers.has(el)) {
    magnifiers.set(el, {
      w: gsap.quickTo(el, 'width', { duration: 0.18, ease: 'power2.out' }),
      h: gsap.quickTo(el, 'height', { duration: 0.18, ease: 'power2.out' }),
    })
  }
  return magnifiers.get(el)!
}

const resetAll = () => {
  magnifiers.forEach((m) => {
    m.w(BASE)
    m.h(BASE)
  })
}

// Positions au repos, figées à l'entrée du curseur : la magnification se calcule
// toujours contre ces centres fixes, jamais contre les positions courantes
// (sinon les icônes qui grossissent déplacent les distances → dock instable).
let restCenters: number[] = []

const captureRestPositions = () => {
  itemEls.forEach((el) => {
    if (el.isConnected) gsap.set(el, { width: BASE, height: BASE })
  })
  restCenters = itemEls.map((el) => {
    const r = el.getBoundingClientRect()
    return r.left + r.width / 2
  })
}

const sfx = useSfx()

const bounce = (e: Event) => {
  sfx.click()
  const el = (e.currentTarget as HTMLElement) || null
  if (el) {
    gsap.fromTo(
      el,
      { y: 0 },
      { y: -22, duration: 0.28, ease: 'power2.out', yoyo: true, repeat: 1 }
    )
  }
}

const wiggleTrash = (e: Event) => {
  sfx.trash()
  const el = (e.currentTarget as HTMLElement)?.querySelector('.trash')
  if (el)
    gsap.fromTo(
      el,
      { rotate: -8 },
      {
        rotate: 8,
        duration: 0.09,
        repeat: 5,
        yoyo: true,
        ease: 'none',
        clearProps: 'rotate',
      }
    )
}

onMounted(() => {
  if (!dockEl.value) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  onMove = (e: MouseEvent) => {
    itemEls.forEach((el, i) => {
      if (!el.isConnected || restCenters[i] === undefined) return
      const dist = Math.abs(e.clientX - restCenters[i])
      const force = Math.exp(-((dist / 95) ** 2))
      const m = ensureMagnifier(el)
      m.w(BASE + GROW * force)
      m.h(BASE + GROW * force)
    })
  }
  dockEl.value.addEventListener('mousemove', onMove)
})

onUnmounted(() => {
  if (dockEl.value && onMove)
    dockEl.value.removeEventListener('mousemove', onMove)
  magnifiers = new Map()
})
</script>

<style scoped>
.dock-icon {
  @apply relative block h-[52px] w-[52px] origin-bottom cursor-pointer;
}
.dock-tip {
  @apply pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-black/5 bg-white/80 px-2.5 py-1 text-xs font-medium text-aink opacity-0 shadow backdrop-blur transition-opacity duration-200 group-hover:opacity-100;
}
</style>
