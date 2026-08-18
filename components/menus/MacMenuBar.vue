<template>
  <header
    class="fixed inset-x-0 top-0 z-[60] flex h-8 items-center justify-between border-b border-white/10 bg-black/20 px-3 text-[13px] font-medium text-white backdrop-blur-2xl lg:px-4"
    @click.stop
  >
    <div class="flex items-center">
      <NuxtLink
        :to="localePath('/')"
        class="menu-btn flex items-center px-2 py-0.5"
      >
        <AgLogo class="h-[18px] w-[22px] text-white" />
      </NuxtLink>

      <div
        v-for="menu in menus"
        :key="menu.id"
        class="relative hidden lg:block"
      >
        <button
          class="menu-btn px-2.5 py-0.5"
          :class="[
            menu.bold ? 'font-bold' : '',
            openMenu === menu.id ? 'rounded bg-white/20' : '',
          ]"
          @click="
            (sfx.click(), (openMenu = openMenu === menu.id ? '' : menu.id))
          "
          @mouseenter="openMenu && (openMenu = menu.id)"
        >
          {{ menu.bold ? menu.label : $t(menu.label) }}
        </button>

        <transition name="menu-pop">
          <div
            v-if="openMenu === menu.id"
            class="absolute left-0 top-full mt-1.5 min-w-[230px] rounded-lg border border-black/10 bg-white/80 p-1 shadow-2xl backdrop-blur-2xl"
          >
            <template v-for="(item, i) in menu.items" :key="i">
              <div
                v-if="item === 'sep'"
                class="mx-2.5 my-1 border-t border-black/10"
              ></div>
              <button
                v-else
                class="flex w-full items-center justify-between rounded-md px-2.5 py-1 text-left text-[13px] text-aink transition-colors hover:bg-ablue hover:text-white"
                @click="runItem(item)"
              >
                <span>{{ item.raw ? item.label : $t(item.label) }}</span>
                <span v-if="item.hint" class="pl-6 text-[12px] opacity-50">{{
                  item.hint
                }}</span>
              </button>
            </template>
          </div>
        </transition>
      </div>

      <!-- Mobile : heure iOS à gauche -->
      <span class="ml-2 text-[15px] font-semibold tabular-nums lg:hidden">{{
        clockShort
      }}</span>
    </div>

    <div class="flex items-center gap-1">
      <!-- Mobile : bascule de langue en cycle -->
      <button
        class="menu-btn rounded px-2 py-0.5 uppercase lg:hidden"
        aria-label="language"
        @click.stop="cycleLocale"
      >
        {{ currentLocale }}
      </button>

      <div class="relative hidden lg:block">
        <button
          class="menu-btn rounded px-2 py-0.5 uppercase"
          :class="openMenu === 'lang' ? 'bg-white/20' : ''"
          @click="openMenu = openMenu === 'lang' ? '' : 'lang'"
        >
          {{ currentLocale }}
        </button>
        <transition name="menu-pop">
          <div
            v-if="openMenu === 'lang'"
            class="absolute right-0 top-full mt-1.5 min-w-[140px] rounded-lg border border-black/10 bg-white/80 p-1 shadow-2xl backdrop-blur-2xl"
          >
            <button
              v-for="loc in availableLocales"
              :key="loc.code"
              class="flex w-full items-center justify-between rounded-md px-2.5 py-1 text-left text-[13px] transition-colors hover:bg-ablue hover:text-white"
              :class="currentLocale === loc.code ? 'font-semibold' : ''"
              @click="selectLanguage(loc.code)"
            >
              {{ loc.name }}
              <span v-if="currentLocale === loc.code">✓</span>
            </button>
          </div>
        </transition>
      </div>

      <button
        class="menu-btn hidden px-1.5 text-[15px] text-white/85 sm:block"
        :aria-label="desktop.state.value.sfxMuted ? 'unmute' : 'mute'"
        @click="toggleSfx"
      >
        <i class="f7-icons align-middle" style="font-size: inherit">{{
          desktop.state.value.sfxMuted ? 'speaker_slash_fill' : 'speaker_2_fill'
        }}</i>
      </button>
      <span class="px-1.5 text-[16px] text-white/85"
        ><DesktopSfIcon name="battery"
      /></span>
      <span class="px-1.5 text-[15px] text-white/85"
        ><DesktopSfIcon name="wifi"
      /></span>
      <button
        class="menu-btn hidden px-1.5 text-[14px] text-white/85 lg:block"
        aria-label="Spotlight"
        @click="desktop.state.value.spotlightOpen = true"
      >
        <DesktopSfIcon name="search" />
      </button>
      <span class="hidden px-1.5 tabular-nums text-white/90 lg:block">{{
        clock
      }}</span>
    </div>
  </header>
</template>

<script setup lang="ts">
import AgLogo from '~/components/ui/AGLogo.vue'

const localePath = useLocalePath()
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const router = useRouter()
const desktop = useDesktop()

interface MenuItem {
  label: string
  raw?: boolean
  hint?: string
  action: () => void
}
type Entry = MenuItem | 'sep'

const go = (path: string) => router.push(localePath(path))
const open = (url: string) => window.open(url, '_blank')
const downloadCv = () => {
  const a = document.createElement('a')
  a.href = '/assets/antoinegourgue-cv.pdf'
  a.download = ''
  a.click()
}

const menus: Array<{
  id: string
  label: string
  bold?: boolean
  items: Entry[]
}> = [
  {
    id: 'app',
    label: 'Antoine Gourgue',
    bold: true,
    items: [
      { label: 'macos.menuAboutSite', action: () => go('/about') },
      'sep',
      {
        label: 'GitHub',
        raw: true,
        action: () => open('https://github.com/antoine-gourgue'),
      },
      {
        label: 'LinkedIn',
        raw: true,
        action: () => open('https://linkedin.com/in/antoine-gourgue'),
      },
    ],
  },
  {
    id: 'file',
    label: 'macos.menuFile',
    items: [
      {
        label: 'macos.menuNewProject',
        hint: '⌘N',
        action: () => go('/contact'),
      },
      'sep',
      { label: 'macos.menuDownloadCv', hint: '⌘S', action: downloadCv },
    ],
  },
  {
    id: 'go',
    label: 'macos.menuGo',
    items: [
      { label: 'nav.home', hint: '⌘1', action: () => go('/') },
      { label: 'nav.projects', hint: '⌘2', action: () => go('/projects') },
      { label: 'nav.about', hint: '⌘3', action: () => go('/about') },
      { label: 'nav.blog', hint: '⌘4', action: () => go('/blog') },
      { label: 'nav.contact', hint: '⌘5', action: () => go('/contact') },
    ],
  },
  {
    id: 'help',
    label: 'macos.menuHelp',
    items: [
      {
        label: 'macos.spotlightPlaceholder',
        hint: '⌘K',
        action: () => (desktop.state.value.spotlightOpen = true),
      },
    ],
  },
]

const openMenu = ref('')
const sfx = useSfx()

const toggleSfx = () => {
  desktop.state.value.sfxMuted = !desktop.state.value.sfxMuted
  localStorage.setItem('ag-sfx-muted', desktop.state.value.sfxMuted ? '1' : '')
  sfx.click()
}

const runItem = (item: MenuItem) => {
  sfx.click()
  item.action()
  openMenu.value = ''
}

const currentLocale = computed(() => locale.value)
const availableLocales = computed(() => locales.value)

const selectLanguage = (code: string) => {
  router.push(switchLocalePath(code as 'fr' | 'es' | 'en'))
  openMenu.value = ''
}

const cycleLocale = () => {
  const order = ['fr', 'en', 'es'] as const
  const next =
    order[
      (order.indexOf(locale.value as (typeof order)[number]) + 1) % order.length
    ]
  router.push(switchLocalePath(next))
}

// Horloge macOS en direct (+ format court iOS pour mobile)
const clock = ref('')
const clockShort = ref('')
let timer: ReturnType<typeof setInterval> | undefined
const tick = () => {
  const now = new Date()
  clock.value = new Intl.DateTimeFormat(locale.value, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(now)
  clockShort.value = new Intl.DateTimeFormat(locale.value, {
    hour: '2-digit',
    minute: '2-digit',
  }).format(now)
}

// Raccourcis clavier globaux
const shortcuts: Record<string, () => void> = {
  '1': () => go('/'),
  '2': () => go('/projects'),
  '3': () => go('/about'),
  '4': () => go('/blog'),
  '5': () => go('/contact'),
  n: () => go('/contact'),
  s: downloadCv,
  k: () => {
    desktop.state.value.spotlightOpen = !desktop.state.value.spotlightOpen
  },
}
const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    openMenu.value = ''
    return
  }
  if (!(e.metaKey || e.ctrlKey)) return
  const fn = shortcuts[e.key.toLowerCase()]
  if (fn) {
    e.preventDefault()
    fn()
  }
}

const closeMenus = () => (openMenu.value = '')

onMounted(() => {
  desktop.state.value.sfxMuted = !!localStorage.getItem('ag-sfx-muted')
  tick()
  timer = setInterval(tick, 1000)
  document.addEventListener('click', closeMenus)
  window.addEventListener('keydown', onKeydown)
})
onUnmounted(() => {
  clearInterval(timer)
  document.removeEventListener('click', closeMenus)
  window.removeEventListener('keydown', onKeydown)
})
</script>

<style scoped>
.menu-btn {
  @apply transition-colors hover:bg-white/15 rounded;
}
.menu-pop-enter-active,
.menu-pop-leave-active {
  transition: all 0.15s ease;
}
.menu-pop-enter-from,
.menu-pop-leave-to {
  opacity: 0;
  transform: translateY(-4px) scale(0.98);
}
</style>
