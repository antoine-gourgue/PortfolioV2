<template>
  <header
    class="pointer-events-none fixed inset-x-0 top-0 z-[315] flex h-8 items-center justify-between border-b px-3 text-[13px] font-medium lg:pointer-events-auto lg:backdrop-blur-2xl lg:border-white/10 lg:bg-black/20 lg:px-4 lg:text-white"
    :class="
      statusTint
        ? [
            'border-transparent bg-[var(--status-bg)]',
            statusTint.light ? 'text-white' : 'text-aink',
          ]
        : 'border-white/10 bg-black/20 text-white'
    "
    :style="statusTint ? { '--status-bg': statusTint.bg } : undefined"
    @click.stop
  >
    <div class="flex items-center">
      <NuxtLink
        :to="localePath('/')"
        class="menu-btn flex items-center px-2 py-0.5"
        aria-label="Antoine Gourgue — accueil"
      >
        <AgLogo class="h-[18px] w-[22px] text-current" />
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
          {{ menu.raw ? menu.label : $t(menu.label) }}
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

      <!-- Mobile : heure iOS à gauche — un tap ouvre le centre de notifications,
           le geste depuis le bord haut appartenant au système sur iPhone -->
      <button
        class="pointer-events-auto ml-2 rounded px-1 text-[15px] font-semibold tabular-nums lg:hidden"
        aria-label="notification center"
        @click.stop="
          desktop.state.value.notifOpen = !desktop.state.value.notifOpen
        "
      >
        {{ clockShort }}
      </button>
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

      <!-- Menu de saisie macOS : badge de langue + liste cochée -->
      <div class="relative hidden h-full lg:block">
        <button
          class="menu-btn flex h-full items-center rounded px-2"
          :class="openMenu === 'lang' ? 'bg-white/20' : ''"
          aria-label="language"
          @click="(sfx.click(), (openMenu = openMenu === 'lang' ? '' : 'lang'))"
        >
          <span
            class="rounded-[4px] border-[1.3px] border-current px-[3.5px] pb-px text-[9.5px] font-bold uppercase leading-[13px] tracking-[0.05em] opacity-90"
            >{{ currentLocale }}</span
          >
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
              <span
                class="w-7 shrink-0 rounded-[3.5px] border border-current px-[3px] text-center text-[9px] font-bold uppercase leading-[12px] opacity-70"
                >{{ loc.code }}</span
              >
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
          class="menu-btn flex h-full items-center rounded px-2 text-current opacity-90"
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
        class="menu-btn hidden h-full items-center px-2 text-[15px] text-current opacity-90 sm:flex"
        :aria-label="desktop.state.value.sfxMuted ? 'unmute' : 'mute'"
        @click="toggleSfx"
      >
        <i
          aria-hidden="true"
          class="f7-icons align-middle"
          style="font-size: inherit"
          >{{
            desktop.state.value.sfxMuted
              ? 'speaker_slash_fill'
              : 'speaker_2_fill'
          }}</i
        >
      </button>
      <!-- Batterie : niveau réel du visiteur (Battery API), icône pleine sinon -->
      <div class="relative h-full">
        <button
          class="menu-btn flex h-full items-center gap-1.5 rounded px-2 text-current opacity-90"
          :class="openMenu === 'battery' ? 'bg-white/20' : ''"
          aria-label="battery"
          @click.stop="
            (sfx.click(), (openMenu = openMenu === 'battery' ? '' : 'battery'))
          "
        >
          <span
            v-if="battery.level !== null"
            class="text-[11px] font-medium tabular-nums opacity-70"
            >{{ battery.level }} %</span
          >
          <span
            v-if="battery.level !== null"
            class="relative flex items-center"
          >
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
          <span v-else class="text-[16px]"
            ><DesktopSfIcon name="battery"
          /></span>
        </button>
        <transition name="menu-pop">
          <div
            v-if="openMenu === 'battery'"
            class="absolute right-0 top-full mt-1.5 w-[280px] rounded-xl border border-black/10 bg-white/85 p-[5px] shadow-2xl backdrop-blur-2xl"
            @click.stop
          >
            <div class="flex items-baseline justify-between px-2.5 pt-1">
              <p class="text-[13px] font-bold text-aink">
                {{ $t('macos.batteryTitle') }}
              </p>
              <span class="text-[12px] tabular-nums text-black/45">{{
                battery.level !== null ? `${battery.level} %` : '—'
              }}</span>
            </div>
            <p class="px-2.5 pb-1.5 pt-px text-[12px] text-black/45">
              {{
                battery.level === null
                  ? $t('macos.batteryUnavailable')
                  : battery.charging
                    ? $t('macos.batterySourceAc')
                    : $t('macos.batterySourceBattery')
              }}
            </p>
            <div class="mx-2.5 my-1 border-t border-black/10"></div>
            <p
              class="px-2.5 pb-0.5 pt-1 text-[11px] font-semibold text-black/40"
            >
              {{ $t('macos.batteryHighUsage') }}
            </p>
            <div class="flex items-center gap-2 px-2.5 py-1">
              <span
                class="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-black/[0.07] text-aink/60"
              >
                <i aria-hidden="true" class="f7-icons" style="font-size: 12px"
                  >globe</i
                >
              </span>
              <span class="text-[13px] text-aink">{{ energyApp }}</span>
            </div>
            <div class="mx-2.5 my-1 border-t border-black/10"></div>
            <button
              class="w-full rounded-md px-2.5 py-1 pb-1.5 text-left text-[13px] text-aink transition-colors hover:bg-black/5"
              @click="openSettingsFromMenu"
            >
              {{ $t('macos.batterySettings') }}
            </button>
          </div>
        </transition>
      </div>

      <!-- Wi-Fi : menu façon macOS -->
      <div class="relative h-full">
        <button
          class="menu-btn flex h-full items-center rounded px-2 text-[15px] text-current opacity-90"
          :class="openMenu === 'wifi' ? 'bg-white/20' : ''"
          aria-label="wifi"
          @click.stop="
            (sfx.click(), (openMenu = openMenu === 'wifi' ? '' : 'wifi'))
          "
        >
          <DesktopSfIcon :name="wifiOn ? 'wifi' : 'wifi_slash'" />
        </button>
        <transition name="menu-pop">
          <div
            v-if="openMenu === 'wifi'"
            class="absolute right-0 top-full mt-1.5 w-[266px] rounded-xl border border-black/10 bg-white/85 p-[5px] shadow-2xl backdrop-blur-2xl"
            @click.stop
          >
            <div class="flex items-center justify-between px-2.5 py-1">
              <p class="text-[13px] font-bold text-aink">Wi‑Fi</p>
              <!-- Interrupteur macOS : 26 × 15, bleu système -->
              <button
                class="relative h-[15px] w-[26px] rounded-full transition-colors duration-200"
                :class="wifiOn ? 'bg-ablue' : 'bg-black/25'"
                aria-label="toggle wifi"
                @click="(sfx.click(), (wifiOn = !wifiOn))"
              >
                <span
                  class="absolute top-[1px] h-[13px] w-[13px] rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.3)] transition-all duration-200"
                  :class="wifiOn ? 'left-[12px]' : 'left-[1px]'"
                ></span>
              </button>
            </div>
            <template v-if="wifiOn">
              <div class="mx-2.5 my-1 border-t border-black/10"></div>
              <p
                class="px-2.5 pb-1 pt-0.5 text-[11px] font-semibold text-black/40"
              >
                {{ $t('macos.wifiKnown') }}
              </p>
              <button
                v-for="net in WIFI_NETWORKS"
                :key="net.name"
                class="flex w-full items-center gap-2.5 rounded-md px-2 py-[3px] text-left transition-colors hover:bg-black/5"
                @click="(sfx.click(), (wifiNetwork = net.name))"
              >
                <span
                  class="flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full transition-colors"
                  :class="
                    wifiNetwork === net.name
                      ? 'bg-ablue text-white'
                      : 'bg-black/[0.07] text-aink/55'
                  "
                >
                  <i aria-hidden="true" class="f7-icons" style="font-size: 13px"
                    >wifi</i
                  >
                </span>
                <span class="min-w-0 flex-1 truncate text-[13px] text-aink">{{
                  net.name
                }}</span>
                <i
                  v-if="net.secure"
                  aria-hidden="true"
                  class="f7-icons text-black/30"
                  style="font-size: 11px"
                  >lock_fill</i
                >
              </button>
            </template>
            <p v-else class="px-2.5 pb-1.5 pt-1 text-[12px] text-black/45">
              {{ $t('macos.wifiOff') }}
            </p>
            <div class="mx-2.5 my-1 border-t border-black/10"></div>
            <button
              class="w-full rounded-md px-2.5 py-1 pb-1.5 text-left text-[13px] text-aink transition-colors hover:bg-black/5"
              @click="openSettingsFromMenu"
            >
              {{ $t('macos.wifiSettings') }}
            </button>
          </div>
        </transition>
      </div>
      <button
        class="menu-btn hidden h-full items-center px-2 text-[14px] text-current opacity-90 lg:flex"
        aria-label="Spotlight"
        @click="desktop.state.value.spotlightOpen = true"
      >
        <DesktopSfIcon name="search" />
      </button>
      <!-- Siri -->
      <button
        class="menu-btn hidden h-full items-center px-2 lg:flex"
        aria-label="Siri"
        @click.stop="
          desktop.state.value.apps.siri = !desktop.state.value.apps.siri
        "
      >
        <span class="block h-[15px] w-[15px]">
          <DesktopMacAppIcon name="siri" />
        </span>
      </button>
      <button
        class="menu-btn hidden h-full items-center rounded px-2 tabular-nums opacity-90 lg:flex"
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
const { t, locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const router = useRouter()
const route = useRoute()
const desktop = useDesktop()
const track = useTrack()
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
const open = (url: string) => window.open(url, '_blank', 'noopener,noreferrer')
// Mise en veille : déclenche l'écran de verrouillage
const sleep = () => {
  setTimeout(() => (desktop.state.value.locked = true), 250)
}

const downloadCv = () => {
  track('cv_downloaded', { from: 'menubar' })
  const a = document.createElement('a')
  a.href = '/assets/antoinegourgue-cv.pdf'
  a.download = ''
  a.click()
}

interface Menu {
  id: string
  label: string
  /** Nom d'app : affiché en gras, comme sur macOS */
  bold?: boolean
  /** Libellé déjà littéral (nom propre ou chaîne déjà traduite) */
  raw?: boolean
  items: Entry[]
}

// ── Menus communs, présents quelle que soit l'app au premier plan ──
const goMenu: Menu = {
  id: 'go',
  label: 'macos.menuGo',
  items: [
    { label: 'nav.home', hint: '⌘1', action: () => go('/') },
    { label: 'nav.projects', hint: '⌘2', action: () => go('/projects') },
    { label: 'nav.about', hint: '⌘3', action: () => go('/about') },
    { label: 'nav.blog', hint: '⌘4', action: () => go('/blog') },
    { label: 'nav.contact', hint: '⌘5', action: () => go('/contact') },
  ],
}

const helpMenu: Menu = {
  id: 'help',
  label: 'macos.menuHelp',
  items: [
    {
      label: 'macos.spotlightPlaceholder',
      hint: '⌘K',
      action: () => (desktop.state.value.spotlightOpen = true),
    },
  ],
}

// ── Barre du bureau : l'identité du site, quand aucune app n'est au premier plan ──
const siteMenus: Menu[] = [
  {
    id: 'app',
    label: 'Antoine Gourgue',
    bold: true,
    raw: true,
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
  goMenu,
  helpMenu,
]

// ── Barre contextuelle ──
// Sur macOS, la barre de menu appartient à l'app au premier plan : son nom
// passe en gras à gauche et ses menus remplacent ceux de l'app précédente.
// `desktop.state.activeApp` est alimenté par focusApp() (apps flottantes)
// et par focus() (fenêtres du bureau).

/** Apps en fenêtre flottante : masquables ET quittables */
const FLOATING_APPS = new Set([
  'calculator',
  'weather',
  'music',
  'maps',
  'news',
  'sports',
  'settings',
  'trash',
])

/** Nom porté par chaque app dans la barre de menu */
const APP_NAMES: Record<string, { label?: string; raw?: string }> = {
  calculator: { label: 'macos.calcTitle' },
  weather: { label: 'macos.weatherTitle' },
  music: { label: 'macos.musicTitle' },
  maps: { label: 'macos.mapsTitle' },
  news: { raw: 'News' },
  sports: { label: 'macos.sportsTitle' },
  settings: { label: 'macos.settingsTitle' },
  trash: { label: 'macos.trash' },
  about: { raw: 'Contacts' },
  terminal: { raw: 'Terminal' },
  finder: { raw: 'Finder' },
  notes: { label: 'macos.calTitle' },
  mail: { raw: 'Mail' },
}

// Les fenêtres du bureau n'ont pas de fermeture propre (leur pastille rouge
// réduit, comme le jaune) : on ne leur propose donc que « Masquer ».
const hideApp = (id: string) =>
  FLOATING_APPS.has(id) ? desktop.minimizeApp(id) : desktop.minimize(id)

/** Menus propres à une app, insérés entre son nom et « Aller » */
const appExtras = (id: string): Menu[] => {
  if (id === 'music')
    return [
      {
        id: 'controls',
        label: 'macos.menuControls',
        items: [
          { label: 'macos.menuPlayPause', action: () => music.toggle() },
          { label: 'macos.menuPrevTrack', action: () => music.prev() },
          { label: 'macos.menuNextTrack', action: () => music.next() },
        ],
      },
    ]
  if (id === 'settings')
    return [
      {
        id: 'view',
        label: 'macos.menuView',
        items: [
          {
            label: 'macos.menuNextWallpaper',
            action: () => desktop.cycleWallpaper(),
          },
          { label: 'macos.settingsSfx', action: toggleSfx },
        ],
      },
    ]
  return []
}

const menus = computed<Menu[]>(() => {
  const id = desktop.state.value.activeApp
  const meta = APP_NAMES[id]
  if (!meta) return siteMenus

  const name = meta.raw ?? t(meta.label as string)
  const items: Entry[] = [
    {
      label: t('macos.menuHideApp', { app: name }),
      raw: true,
      action: () => hideApp(id),
    },
  ]
  if (FLOATING_APPS.has(id))
    items.push('sep', {
      label: t('macos.menuQuitApp', { app: name }),
      raw: true,
      action: () => desktop.closeApp(id),
    })

  return [
    { id: 'app', label: name, bold: true, raw: true, items },
    ...appExtras(id),
    goMenu,
    helpMenu,
  ]
})

/**
 * Mobile : la barre d'état prend la couleur de l'app ou de la page au premier
 * plan, pour se lire comme son prolongement plutôt que comme un bandeau
 * translucide posé dessus. Sur le bureau elle reste translucide.
 */
const STATUS_TINTS: Record<string, { bg: string; light: boolean }> = {
  calculator: { bg: '#000000', light: true },
  weather: { bg: '#22509E', light: true },
  music: { bg: '#161618', light: true },
  maps: { bg: '#F5F5F7', light: false },
  sports: { bg: '#000000', light: true },
  news: { bg: '#FFFFFF', light: false },
  settings: { bg: '#F2F2F7', light: false },
  trash: { bg: '#FFFFFF', light: false },
}

const isHome = computed(
  () => route.path.replace(/^\/[a-z]{2}(\/|$)/, '/') === '/'
)

/** Fond propre à certaines pages, pour que la barre s'y fonde aussi */
const PAGE_TINTS: Record<string, string> = {
  '/blog': '#FBF9F2',
  '/about': '#F2F2F7',
}

const statusTint = computed(() => {
  const app = STATUS_TINTS[desktop.state.value.activeApp]
  if (app) return app
  if (isHome.value) return null
  const path = route.path.replace(/^\/[a-z]{2}(\/|$)/, '/')
  return { bg: PAGE_TINTS[path] ?? '#FFFFFF', light: false }
})

const openMenu = ref('')
// Changer d'app referme le menu déroulant : son id n'existe peut-être plus
watch(
  () => desktop.state.value.activeApp,
  () => (openMenu.value = '')
)
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
  track('language_changed', { lang: code })
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

// ── Wi-Fi décoratif façon macOS ──
const wifiOn = ref(true)
const wifiNetwork = ref("Livebox d'Antoine")
const WIFI_NETWORKS = [
  { name: "Livebox d'Antoine", secure: true, signal: 1 },
  { name: "iPhone d'Antoine", secure: true, signal: 0.85 },
  { name: 'Epitech_Etudiants', secure: true, signal: 0.6 },
  { name: 'Digitaleo-Guest', secure: true, signal: 0.45 },
  { name: 'freebox_anglet_64', secure: false, signal: 0.3 },
]

const openSettingsFromMenu = () => {
  sfx.click()
  desktop.state.value.apps.settings = true
  openMenu.value = ''
}

// Clin d'œil macOS : le navigateur du visiteur « consomme beaucoup d'énergie »
const energyApp = ref('Navigateur')
const detectBrowser = () => {
  const ua = navigator.userAgent
  energyApp.value = ua.includes('Edg/')
    ? 'Microsoft Edge'
    : ua.includes('OPR/')
      ? 'Opera'
      : ua.includes('Firefox/')
        ? 'Firefox'
        : ua.includes('Chrome/')
          ? 'Google Chrome'
          : ua.includes('Safari/')
            ? 'Safari'
            : 'Navigateur'
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
  detectBrowser()
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
