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

    <div class="flex h-full items-stretch gap-0.5">
      <!-- Mobile : indicateur lecture en cours, comme le ♪ de la barre iOS -->
      <button
        v-if="musicPlaying"
        class="menu-btn flex h-full items-center px-2 sm:hidden"
        aria-label="now playing"
        @click.stop="desktop.state.value.apps.music = true"
      >
        <span class="menu-eq flex h-3 items-end gap-[2px]">
          <i></i><i></i><i></i>
        </span>
      </button>

      <!-- Mobile : bascule de langue en cycle -->
      <button
        class="menu-btn flex h-full items-center rounded px-2 uppercase lg:hidden"
        aria-label="language"
        @click.stop="cycleLocale"
      >
        {{ currentLocale }}
      </button>

      <!-- Menu de saisie macOS : drapeau + liste des langues cochée -->
      <div class="relative hidden h-full lg:block">
        <button
          class="menu-btn flex h-full items-center rounded px-2"
          :class="openMenu === 'lang' ? 'bg-white/20' : ''"
          aria-label="language"
          @click="(sfx.click(), (openMenu = openMenu === 'lang' ? '' : 'lang'))"
        >
          <DesktopFlagIcon :code="currentLocale" class="h-[14px] w-[21px]" />
        </button>
        <transition name="menu-pop">
          <div
            v-if="openMenu === 'lang'"
            class="absolute right-0 top-full mt-1.5 min-w-[170px] rounded-lg border border-black/10 bg-white/80 p-1 shadow-2xl backdrop-blur-2xl"
          >
            <button
              v-for="loc in availableLocales"
              :key="loc.code"
              class="flex w-full items-center gap-2.5 rounded-md px-2.5 py-1 text-left text-[13px] text-aink transition-colors hover:bg-ablue hover:text-white"
              @click="selectLanguage(loc.code)"
            >
              <span class="w-3 text-[12px]">{{
                currentLocale === loc.code ? '✓' : ''
              }}</span>
              <DesktopFlagIcon
                :code="loc.code"
                class="h-[13px] w-[20px] shrink-0"
              />
              <span
                :class="currentLocale === loc.code ? 'font-semibold' : ''"
                >{{ loc.name }}</span
              >
            </button>
          </div>
        </transition>
      </div>

      <!-- Musique : contrôles de lecture dans la barre de menu -->
      <div class="relative hidden h-full sm:block">
        <button
          class="menu-btn flex h-full items-center rounded px-2 text-white/85"
          :class="openMenu === 'music' ? 'bg-white/20' : ''"
          aria-label="music controls"
          @click.stop="
            (sfx.click(), (openMenu = openMenu === 'music' ? '' : 'music'))
          "
        >
          <span
            v-if="musicPlaying"
            class="menu-eq flex h-3 items-end gap-[2px]"
          >
            <i></i><i></i><i></i>
          </span>
          <i v-else class="f7-icons align-middle" style="font-size: 14px"
            >music_note_2</i
          >
        </button>
        <transition name="menu-pop">
          <div
            v-if="openMenu === 'music'"
            class="absolute right-0 top-full mt-1.5 w-[250px] rounded-lg border border-black/10 bg-white/85 p-3 shadow-2xl backdrop-blur-2xl"
            @click.stop
          >
            <div class="flex items-center gap-2.5">
              <img
                :src="musicTrack.cover"
                :alt="musicTrack.title"
                class="h-10 w-10 rounded-md shadow"
              />
              <div class="min-w-0 flex-1">
                <p class="truncate text-[13px] font-semibold text-aink">
                  {{ musicTrack.title }}
                </p>
                <p class="truncate text-[11px] text-aink/60">
                  {{ musicTrack.artist }}
                </p>
              </div>
            </div>

            <div
              class="mt-2.5 flex items-center justify-center gap-7 text-aink"
            >
              <button
                class="transition hover:opacity-70 active:scale-90"
                aria-label="previous"
                @click="music.prev()"
              >
                <svg viewBox="0 0 24 24" class="h-5 w-5" fill="currentColor">
                  <path d="M6 5h2v14H6zM20 5v14L9.5 12z" />
                </svg>
              </button>
              <button
                class="transition hover:opacity-70 active:scale-90"
                aria-label="play-pause"
                @click="music.toggle()"
              >
                <svg
                  v-if="!musicPlaying"
                  viewBox="0 0 24 24"
                  class="h-7 w-7"
                  fill="currentColor"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
                <svg
                  v-else
                  viewBox="0 0 24 24"
                  class="h-7 w-7"
                  fill="currentColor"
                >
                  <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />
                </svg>
              </button>
              <button
                class="transition hover:opacity-70 active:scale-90"
                aria-label="next"
                @click="music.next()"
              >
                <svg viewBox="0 0 24 24" class="h-5 w-5" fill="currentColor">
                  <path d="M16 5h2v14h-2zM4 5v14l10.5-7z" />
                </svg>
              </button>
            </div>

            <div class="mt-2.5 flex items-center gap-2 text-aink/50">
              <svg viewBox="0 0 24 24" class="h-3.5 w-3.5" fill="currentColor">
                <path d="M4 9v6h4l5 4V5L8 9z" />
              </svg>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                :value="music.state.value.volume"
                class="menu-vol flex-1"
                @input="
                  music.setVolume(
                    parseFloat(($event.target as HTMLInputElement).value)
                  )
                "
              />
              <svg viewBox="0 0 24 24" class="h-3.5 w-3.5" fill="currentColor">
                <path d="M4 9v6h4l5 4V5L8 9z" />
                <path
                  d="M16 8a5 5 0 0 1 0 8M18.5 5.5a9 9 0 0 1 0 13"
                  stroke="currentColor"
                  stroke-width="1.6"
                  fill="none"
                />
              </svg>
            </div>

            <button
              class="mt-2 flex w-full items-center justify-center gap-1.5 rounded-md py-1 text-[12px] font-medium text-aink transition-colors hover:bg-ablue hover:text-white"
              @click="
                ((desktop.state.value.apps.music = true), (openMenu = ''))
              "
            >
              {{ $t('macos.musicOpen') }}
            </button>
          </div>
        </transition>
      </div>
      <button
        class="menu-btn hidden h-full items-center px-2 text-[15px] text-white/85 sm:flex"
        :aria-label="desktop.state.value.sfxMuted ? 'unmute' : 'mute'"
        @click="toggleSfx"
      >
        <i class="f7-icons align-middle" style="font-size: inherit">{{
          desktop.state.value.sfxMuted ? 'speaker_slash_fill' : 'speaker_2_fill'
        }}</i>
      </button>
      <!-- Batterie : niveau réel du visiteur (Battery API), icône pleine sinon -->
      <span
        class="flex h-full items-center gap-1.5 px-2 text-white/85"
        :title="battery.level !== null ? `${battery.level} %` : ''"
      >
        <span
          v-if="battery.level !== null"
          class="text-[11px] font-medium tabular-nums text-white/70"
          >{{ battery.level }} %</span
        >
        <span v-if="battery.level !== null" class="relative flex items-center">
          <svg viewBox="0 0 27 13" class="h-[13px] w-[27px]">
            <rect
              x="0.5"
              y="0.5"
              width="23"
              height="12"
              rx="3.5"
              fill="none"
              stroke="currentColor"
              stroke-opacity="0.45"
            />
            <rect
              x="2"
              y="2"
              :width="Math.max(1.5, (battery.level / 100) * 20)"
              height="9"
              rx="2"
              :fill="battery.charging ? '#32D74B' : 'currentColor'"
            />
            <path
              d="M25 4.5v4a2.2 2.2 0 0 0 0-4z"
              fill="currentColor"
              fill-opacity="0.45"
            />
          </svg>
          <svg
            v-if="battery.charging"
            viewBox="0 0 12 16"
            class="absolute left-1/2 top-1/2 h-[11px] -translate-x-[60%] -translate-y-1/2 drop-shadow"
          >
            <path
              d="M7 0 1 9h3.5L5 16l6-9H7.5z"
              fill="#fff"
              stroke="#00000055"
              stroke-width="0.8"
            />
          </svg>
        </span>
        <span v-else class="text-[16px]"><DesktopSfIcon name="battery" /></span>
      </span>
      <span class="flex h-full items-center px-2 text-[15px] text-white/85"
        ><DesktopSfIcon name="wifi"
      /></span>
      <button
        class="menu-btn hidden h-full items-center px-2 text-[14px] text-white/85 lg:flex"
        aria-label="Spotlight"
        @click="desktop.state.value.spotlightOpen = true"
      >
        <DesktopSfIcon name="search" />
      </button>
      <button
        class="menu-btn hidden h-full items-center rounded px-2 tabular-nums text-white/90 lg:flex"
        :class="desktop.state.value.notifOpen ? 'bg-white/20' : ''"
        aria-label="notification center"
        @click.stop="
          desktop.state.value.notifOpen = !desktop.state.value.notifOpen
        "
      >
        {{ clock }}
      </button>
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
const music = useMusic()
const musicPlaying = computed(() => music.state.value.playing)
const musicTrack = music.track

interface MenuItem {
  label: string
  raw?: boolean
  hint?: string
  action: () => void
}
type Entry = MenuItem | 'sep'

const go = (path: string) => router.push(localePath(path))
const open = (url: string) => window.open(url, '_blank')
// Mise en veille : déclenche l'écran de verrouillage
const sleep = () => {
  setTimeout(() => (desktop.state.value.locked = true), 250)
}

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
      'sep',
      {
        label: 'macos.menuSettings',
        action: () => (desktop.state.value.apps.settings = true),
      },
      { label: 'macos.menuSleep', action: sleep },
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

// ── Batterie réelle du visiteur (API non supportée par Safari/Firefox) ──
const battery = reactive<{ level: number | null; charging: boolean }>({
  level: null,
  charging: false,
})

const initBattery = async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const nav = navigator as any
  if (!nav.getBattery) return
  try {
    const b = await nav.getBattery()
    const sync = () => {
      battery.level = Math.round(b.level * 100)
      battery.charging = b.charging
    }
    sync()
    b.addEventListener('levelchange', sync)
    b.addEventListener('chargingchange', sync)
  } catch {
    battery.level = null
  }
}

const closeMenus = () => (openMenu.value = '')

onMounted(() => {
  desktop.state.value.sfxMuted = !!localStorage.getItem('ag-sfx-muted')
  tick()
  timer = setInterval(tick, 1000)
  initBattery()
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

.menu-vol {
  height: 4px;
  cursor: pointer;
  appearance: none;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.18);
}
.menu-vol::-webkit-slider-thumb {
  appearance: none;
  height: 12px;
  width: 12px;
  border-radius: 999px;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.15);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
}
.menu-vol::-moz-range-thumb {
  height: 12px;
  width: 12px;
  border-radius: 999px;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.15);
}

.menu-eq i {
  width: 2.5px;
  border-radius: 1px;
  background: #ffffffd9;
  animation: menu-eq-bounce 0.9s ease-in-out infinite;
}
.menu-eq i:nth-child(1) {
  height: 55%;
  animation-delay: -0.3s;
}
.menu-eq i:nth-child(2) {
  height: 100%;
}
.menu-eq i:nth-child(3) {
  height: 40%;
  animation-delay: -0.6s;
}
@keyframes menu-eq-bounce {
  0%,
  100% {
    transform: scaleY(0.4);
  }
  50% {
    transform: scaleY(1);
  }
}
</style>
