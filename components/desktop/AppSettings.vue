<template>
  <Teleport to="body">
    <div
      v-if="desktop.state.value.apps.settings"
      ref="winEl"
      data-window="settings"
      class="fixed inset-0 z-40 overflow-hidden lg:inset-auto lg:left-[28%] lg:top-28 lg:w-[640px] lg:rounded-xl lg:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.45)] lg:ring-1 lg:ring-black/10"
      :style="{ zIndex: z }"
      @pointerdown="bringToFront"
    >
      <div
        class="flex h-full flex-col bg-[#f2f2f7] lg:h-[460px] lg:flex-row lg:bg-transparent"
      >
        <!-- ── Desktop : barre latérale translucide ── -->
        <aside
          class="hidden w-[200px] shrink-0 flex-col border-r border-black/10 bg-[#EBEBF0]/95 backdrop-blur-2xl lg:flex"
        >
          <div class="settings-drag flex items-center gap-2 px-4 pt-3">
            <button
              class="group flex h-3 w-3 items-center justify-center rounded-full border border-[#E0443E] bg-[#FF5F57]"
              aria-label="close"
              @click.stop="(sfx.minimize(), desktop.closeApp('settings'))"
              @pointerdown.stop
            >
              <svg
                viewBox="0 0 12 12"
                class="h-full w-full p-[1px] opacity-0 group-hover:opacity-100"
              >
                <path
                  d="M3.6 3.6 L8.4 8.4 M8.4 3.6 L3.6 8.4"
                  stroke="#820005"
                  stroke-width="1.2"
                  stroke-linecap="round"
                />
              </svg>
            </button>
            <button
              class="group flex h-3 w-3 items-center justify-center rounded-full border border-[#D89E24] bg-[#FEBC2E]"
              aria-label="minimize"
              @click.stop="(sfx.minimize(), desktop.minimizeApp('settings'))"
              @pointerdown.stop
            >
              <svg
                viewBox="0 0 12 12"
                class="h-full w-full p-[1px] opacity-0 group-hover:opacity-100"
              >
                <path
                  d="M2.6 6 L9.4 6"
                  stroke="#985712"
                  stroke-width="1.4"
                  stroke-linecap="round"
                />
              </svg>
            </button>
            <span
              class="h-3 w-3 rounded-full border border-black/10 bg-[#DDDDDF]"
            ></span>
          </div>

          <!-- Recherche -->
          <div
            class="mx-2.5 mt-3.5 flex items-center gap-1.5 rounded-[7px] bg-black/[0.07] px-2 py-[3.5px]"
          >
            <i
              aria-hidden="true"
              class="f7-icons text-black/35"
              style="font-size: 12px"
              >search</i
            >
            <input
              v-model="sidebarQuery"
              type="text"
              :placeholder="$t('macos.search')"
              class="w-full bg-transparent text-[12.5px] text-aink outline-none placeholder:text-black/35"
            />
          </div>

          <!-- Profil -->
          <button
            class="mx-2.5 mt-3 flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-left transition hover:bg-black/5"
            @click="goSection('general')"
          >
            <span
              class="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-b from-[#3b4048] to-[#17181b]"
            >
              <AgLogo class="h-[18px] w-5 text-white" />
            </span>
            <span>
              <span class="block text-[12.5px] font-semibold text-aink"
                >Antoine Gourgue</span
              >
              <span class="block text-[10.5px] text-black/45"
                >AntoineOS 26</span
              >
            </span>
          </button>

          <nav class="mt-2.5 flex flex-col gap-px px-2.5">
            <button
              v-for="item in filteredSections"
              :key="item.id"
              class="flex items-center gap-2 rounded-[7px] px-1.5 py-[4px] text-left text-[13px] transition"
              :class="
                section === item.id
                  ? 'bg-[#0A84FF] font-medium text-white'
                  : 'text-aink hover:bg-black/5'
              "
              @click="goSection(item.id)"
            >
              <span
                class="flex h-[21px] w-[21px] items-center justify-center rounded-[5.5px] text-white shadow-[inset_0_0.5px_0_rgba(255,255,255,0.35),0_0.5px_1.5px_rgba(0,0,0,0.25)]"
                :style="{
                  background: `linear-gradient(180deg, ${item.tintLight}, ${item.tint})`,
                }"
              >
                <i
                  aria-hidden="true"
                  class="f7-icons"
                  style="font-size: 12px"
                  >{{ item.icon }}</i
                >
              </span>
              {{ $t(item.label) }}
            </button>
          </nav>
        </aside>

        <!--
          Mobile : navigation iOS. À la racine, grand titre aligné à gauche
          comme dans Réglages ; en détail, barre compacte avec titre centré et
          retour. On ne quitte pas l'app d'ici : on balaie vers le haut.
        -->
        <div class="bg-[#f2f2f7] pt-12 lg:hidden">
          <div
            v-if="mobileDetail"
            class="relative flex min-h-[22px] items-center px-4 pb-2"
          >
            <button
              class="-ml-1 flex items-center gap-0.5 text-[17px] text-[#0A84FF]"
              @click="mobileDetail = false"
            >
              <svg
                viewBox="0 0 12 20"
                class="h-[19px] w-[11px]"
                aria-hidden="true"
              >
                <path
                  d="M10 1 L2 10 L10 19"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              {{ $t('macos.settingsTitle') }}
            </button>
            <span
              class="pointer-events-none absolute left-1/2 max-w-[55%] -translate-x-1/2 truncate text-[17px] font-semibold text-aink"
            >
              {{ $t(activeSection.label) }}
            </span>
          </div>

          <h2
            v-else
            class="px-4 pb-1 text-[34px] font-bold leading-tight tracking-[-0.9px] text-aink"
          >
            {{ $t('macos.settingsTitle') }}
          </h2>
        </div>

        <!-- ── Contenu ── -->
        <div class="flex flex-1 flex-col overflow-hidden bg-[#f2f2f7]">
          <!-- Desktop : barre de titre avec navigation -->
          <div
            class="settings-drag hidden h-[46px] shrink-0 items-center gap-2 border-b border-black/10 px-4 lg:flex"
          >
            <button
              class="flex h-6 w-6 items-center justify-center rounded-md transition"
              :class="
                history.length
                  ? 'text-aink/70 hover:bg-black/5'
                  : 'cursor-default text-black/20'
              "
              aria-label="back"
              @pointerdown.stop
              @click="goBack"
            >
              <i aria-hidden="true" class="f7-icons" style="font-size: 15px"
                >chevron_left</i
              >
            </button>
            <button
              class="flex h-6 w-6 items-center justify-center rounded-md transition"
              :class="
                forward.length
                  ? 'text-aink/70 hover:bg-black/5'
                  : 'cursor-default text-black/20'
              "
              aria-label="forward"
              @pointerdown.stop
              @click="goForward"
            >
              <i aria-hidden="true" class="f7-icons" style="font-size: 15px"
                >chevron_right</i
              >
            </button>
            <span class="ml-1 text-[15px] font-bold text-aink">
              {{ $t(activeSection.label) }}
            </span>
          </div>

          <div
            class="flex-1 overflow-y-auto px-4 pb-8 pt-1 lg:px-6 lg:pb-6 lg:pt-4"
          >
            <!-- Mobile : liste iOS des sections -->
            <div v-if="!mobileDetail" class="mt-1 space-y-6 lg:hidden">
              <!-- Fiche d'identité, à la place de la carte Apple ID -->
              <div class="settings-card">
                <NuxtLink
                  :to="localePath('/about')"
                  class="flex items-center gap-3.5 px-4 py-3.5"
                  @click="desktop.closeApp('settings')"
                >
                  <span
                    class="flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-full bg-aink"
                  >
                    <AgLogo class="h-7 w-8 text-white" />
                  </span>
                  <span class="min-w-0 flex-1">
                    <span class="block text-[19px] font-medium text-aink"
                      >Antoine Gourgue</span
                    >
                    <span class="block truncate text-[13px] text-black/45">{{
                      $t('macos.settingsIdentity')
                    }}</span>
                  </span>
                  <span class="text-[17px] text-black/25">›</span>
                </NuxtLink>
              </div>

              <div v-for="group in mobileGroups" :key="group.label">
                <p
                  class="px-4 pb-1.5 text-[13px] uppercase tracking-[0.03em] text-black/45"
                >
                  {{ $t(group.label) }}
                </p>
                <div class="settings-card">
                  <button
                    v-for="item in group.items"
                    :key="item.id"
                    class="flex w-full items-center gap-3 px-4 py-3 text-left"
                    @click="((section = item.id), (mobileDetail = true))"
                  >
                    <span
                      class="flex h-[29px] w-[29px] items-center justify-center rounded-[7px] text-white"
                      :style="{
                        background: `linear-gradient(180deg, ${item.tintLight}, ${item.tint})`,
                      }"
                    >
                      <i
                        aria-hidden="true"
                        class="f7-icons"
                        style="font-size: 16px"
                        >{{ item.icon }}</i
                      >
                    </span>
                    <span class="flex-1 text-[17px] text-aink">{{
                      $t(item.label)
                    }}</span>
                    <span class="text-[17px] text-black/25">›</span>
                  </button>
                </div>
              </div>
              <div>
                <p
                  class="px-4 pb-1.5 text-[13px] uppercase tracking-[0.03em] text-black/45"
                >
                  {{ $t('macos.settingsGroupLinks') }}
                </p>
                <div class="settings-card">
                  <a
                    v-for="link in mobileLinks"
                    :key="link.label"
                    :href="link.href"
                    :download="link.download ? '' : undefined"
                    :target="link.download ? undefined : '_blank'"
                    rel="noopener noreferrer"
                    class="flex w-full items-center gap-3 px-4 py-3 text-left"
                    @click="
                      link.track && track(link.track, { from: 'settings' })
                    "
                  >
                    <span
                      class="flex h-[29px] w-[29px] items-center justify-center rounded-[7px] text-white"
                      :style="{
                        background: `linear-gradient(180deg, ${link.tintLight}, ${link.tint})`,
                      }"
                    >
                      <i
                        aria-hidden="true"
                        class="f7-icons"
                        style="font-size: 16px"
                        >{{ link.icon }}</i
                      >
                    </span>
                    <span class="flex-1 text-[17px] text-aink">{{
                      link.raw ?? $t(link.label)
                    }}</span>
                    <span class="text-[15px] text-black/25">↗</span>
                  </a>
                </div>
              </div>

              <p class="px-4 pt-1 text-center text-[12px] text-black/35">
                {{ $t('macos.settingsFooter') }}
              </p>
            </div>

            <div :class="mobileDetail ? '' : 'hidden lg:block'">
              <!-- Fond d'écran -->
              <template v-if="section === 'wallpaper'">
                <div class="settings-card">
                  <div class="px-4 py-3.5">
                    <div class="grid grid-cols-2 gap-3">
                      <button
                        class="relative flex aspect-video items-center justify-center overflow-hidden rounded-lg shadow-sm transition"
                        :class="
                          desktop.state.value.wallpaperAuto
                            ? 'ring-2 ring-[#0A84FF] ring-offset-2 ring-offset-white'
                            : 'opacity-85 hover:opacity-100'
                        "
                        :style="{ backgroundImage: wallpaper.style.value }"
                        aria-label="wallpaper auto"
                        @click="
                          (sfx.click(),
                          (desktop.state.value.wallpaperAuto = true))
                        "
                      >
                        <span
                          class="rounded-full bg-black/35 px-2 py-0.5 text-[11px] font-semibold text-white backdrop-blur"
                        >
                          {{ $t('macos.settingsWallpaperAuto') }}
                        </span>
                      </button>
                      <button
                        v-for="(wp, i) in WALLPAPERS"
                        :key="i"
                        class="aspect-video rounded-lg shadow-sm transition"
                        :class="
                          !desktop.state.value.wallpaperAuto &&
                          desktop.state.value.wallpaper === i
                            ? 'ring-2 ring-[#0A84FF] ring-offset-2 ring-offset-white'
                            : 'opacity-85 hover:opacity-100'
                        "
                        :style="{ backgroundImage: wp }"
                        :aria-label="`wallpaper ${i + 1}`"
                        @click="
                          (sfx.click(),
                          (desktop.state.value.wallpaperAuto = false),
                          (desktop.state.value.wallpaper = i))
                        "
                      ></button>
                    </div>
                  </div>
                </div>
                <p class="settings-footnote">
                  {{ $t('macos.settingsWallpaperHint') }}
                </p>
              </template>

              <!-- Son -->
              <template v-else-if="section === 'sound'">
                <div class="settings-card">
                  <div class="flex items-center justify-between px-4 py-2.5">
                    <span class="settings-label">{{
                      $t('macos.settingsSfx')
                    }}</span>
                    <button
                      class="relative h-[15px] w-[26px] rounded-full transition-colors duration-200"
                      :class="
                        !desktop.state.value.sfxMuted
                          ? 'bg-[#0A84FF]'
                          : 'bg-black/25'
                      "
                      role="switch"
                      :aria-checked="!desktop.state.value.sfxMuted"
                      @click="toggleSfx"
                    >
                      <span
                        class="absolute top-[1px] h-[13px] w-[13px] rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.3)] transition-all duration-200"
                        :class="
                          !desktop.state.value.sfxMuted
                            ? 'left-[12px]'
                            : 'left-[1px]'
                        "
                      ></span>
                    </button>
                  </div>
                  <div class="flex items-center gap-3 px-4 py-3">
                    <span class="settings-label shrink-0">{{
                      $t('macos.settingsMusicVolume')
                    }}</span>
                    <i
                      aria-hidden="true"
                      class="f7-icons ml-auto text-black/35"
                      style="font-size: 11px"
                      >speaker_fill</i
                    >
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      :value="music.state.value.volume"
                      class="settings-vol w-40"
                      @input="
                        music.setVolume(
                          parseFloat(($event.target as HTMLInputElement).value)
                        )
                      "
                    />
                    <i
                      aria-hidden="true"
                      class="f7-icons text-black/35"
                      style="font-size: 13px"
                      >speaker_3_fill</i
                    >
                  </div>
                </div>
              </template>

              <!-- Langue -->
              <template v-else-if="section === 'language'">
                <div class="settings-card">
                  <button
                    v-for="loc in availableLocales"
                    :key="loc.code"
                    class="flex w-full items-center gap-3 px-4 py-2.5 text-left transition hover:bg-black/[0.03]"
                    @click="selectLanguage(loc.code)"
                  >
                    <span
                      class="w-8 shrink-0 rounded-[4px] border-[1.3px] border-black/35 px-[3px] pb-px text-center text-[10px] font-bold uppercase leading-[14px] tracking-[0.05em] text-black/55"
                      >{{ loc.code }}</span
                    >
                    <span class="settings-label flex-1">{{ loc.name }}</span>
                    <i
                      v-if="locale === loc.code"
                      aria-hidden="true"
                      class="f7-icons font-semibold text-[#0A84FF]"
                      style="font-size: 13px"
                      >checkmark</i
                    >
                  </button>
                </div>
                <p class="settings-footnote">
                  {{ $t('macos.settingsLanguageHint') }}
                </p>
              </template>

              <!-- Général -->
              <template v-else>
                <div class="settings-card">
                  <div class="flex items-center gap-3 px-4 py-3.5">
                    <span
                      class="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-b from-[#3b4048] to-[#17181b] shadow-sm"
                    >
                      <AgLogo class="h-5 w-6 text-white" />
                    </span>
                    <span>
                      <span class="settings-label block font-semibold"
                        >AntoineOS</span
                      >
                      <span class="block text-[11.5px] text-black/45">{{
                        $t('macos.settingsTagline')
                      }}</span>
                    </span>
                  </div>
                  <div class="settings-row">
                    <span class="settings-label">{{
                      $t('macos.settingsVersion')
                    }}</span>
                    <span class="settings-value">26.0</span>
                  </div>
                  <div class="settings-row">
                    <span class="settings-label">Frameworks</span>
                    <span class="settings-value">Nuxt 3 · GSAP · Tailwind</span>
                  </div>
                  <div v-if="buildSha" class="settings-row">
                    <span class="settings-label">Build</span>
                    <span class="settings-value">{{ buildSha }}</span>
                  </div>
                </div>
                <div class="settings-card mt-4">
                  <button
                    class="w-full px-4 py-2.5 text-left text-[13.5px] font-medium text-[#FF3B30] transition hover:bg-black/[0.03]"
                    @click="resetDesktop"
                  >
                    {{ $t('macos.settingsReset') }}
                  </button>
                </div>
                <p class="settings-footnote">
                  {{ $t('macos.settingsResetHint') }}
                </p>
              </template>
            </div>
          </div>
        </div>
      </div>
      <!-- Balayer vers le haut pour revenir à l'écran d'accueil -->
      <DesktopIosHomeBar app="settings" @close="desktop.closeApp('settings')" />
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import AgLogo from '~/components/ui/AGLogo.vue'
import { WALLPAPERS } from '~/composables/useDesktop'

const desktop = useDesktop()
const music = useMusic()
const wallpaper = useWallpaper()
const sfx = useSfx()
const { gsap, Draggable } = useGsap()
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const router = useRouter()
const localePath = useLocalePath()
const track = useTrack()
const { t } = useI18n()
const buildSha = (
  useRuntimeConfig().public.gitSha as string | undefined
)?.slice(0, 7)

const winEl = ref<HTMLElement | null>(null)
const z = ref(40)
const bringToFront = () => {
  z.value = desktop.focusApp('settings')
}

type SectionId = 'wallpaper' | 'sound' | 'language' | 'general'
const section = ref<SectionId>('wallpaper')
// Réglages iOS groupe ses entrées par thème plutôt qu'en une liste unique
const mobileGroups = computed(() => [
  {
    label: 'macos.settingsGroupLook',
    items: sections.filter((s) => s.id === 'wallpaper' || s.id === 'sound'),
  },
  {
    label: 'macos.settingsGroupSystem',
    items: sections.filter((s) => s.id === 'language' || s.id === 'general'),
  },
])

/** Sorties réelles du portfolio, pour que la racine ne soit pas qu'une liste vide */
const mobileLinks = [
  {
    raw: 'GitHub',
    label: 'GitHub',
    icon: 'chevron_left_slash_chevron_right',
    href: 'https://github.com/antoine-gourgue',
    tint: '#1B1B1F',
    tintLight: '#4A4A52',
  },
  {
    raw: 'LinkedIn',
    label: 'LinkedIn',
    icon: 'person_crop_square_fill',
    href: 'https://linkedin.com/in/antoine-gourgue',
    tint: '#0A66C2',
    tintLight: '#3E92E0',
  },
  {
    label: 'macos.menuDownloadCv',
    icon: 'doc_text_fill',
    href: '/assets/antoinegourgue-cv.pdf',
    download: true,
    track: 'cv_downloaded',
    tint: '#FF375F',
    tintLight: '#FF6B8A',
  },
]

const mobileDetail = ref(false)

const sections: Array<{
  id: SectionId
  label: string
  icon: string
  tint: string
  tintLight: string
}> = [
  {
    id: 'wallpaper',
    label: 'macos.settingsWallpaper',
    icon: 'photo_fill',
    tint: '#0A84FF',
    tintLight: '#55AAFF',
  },
  {
    id: 'sound',
    label: 'macos.settingsSound',
    icon: 'speaker_2_fill',
    tint: '#FF2D55',
    tintLight: '#FF6482',
  },
  {
    id: 'language',
    label: 'macos.settingsLanguage',
    icon: 'globe',
    tint: '#34C759',
    tintLight: '#63DE82',
  },
  {
    id: 'general',
    label: 'macos.settingsGeneral',
    icon: 'gear_alt_fill',
    tint: '#8E8E93',
    tintLight: '#B0B0B5',
  },
]

// Recherche de la barre latérale : filtre les sections par libellé traduit
const sidebarQuery = ref('')
const filteredSections = computed(() => {
  const q = sidebarQuery.value.trim().toLowerCase()
  if (!q) return sections
  return sections.filter((s) => t(s.label).toLowerCase().includes(q))
})

// Historique de navigation (chevrons ‹ › comme System Settings)
const history = ref<SectionId[]>([])
const forward = ref<SectionId[]>([])
const goSection = (id: SectionId) => {
  if (id === section.value) return
  sfx.click()
  history.value.push(section.value)
  forward.value = []
  section.value = id
}
const goBack = () => {
  const prev = history.value.pop()
  if (!prev) return
  forward.value.push(section.value)
  section.value = prev
}
const goForward = () => {
  const next = forward.value.pop()
  if (!next) return
  history.value.push(section.value)
  section.value = next
}

const activeSection = computed(
  () => sections.find((s) => s.id === section.value) ?? sections[0]
)

const availableLocales = computed(
  () =>
    locales.value as unknown as Array<{
      code: 'fr' | 'en' | 'es'
      name: string
    }>
)

const selectLanguage = (code: 'fr' | 'en' | 'es') => {
  sfx.click()
  router.push(switchLocalePath(code))
}

const toggleSfx = () => {
  desktop.state.value.sfxMuted = !desktop.state.value.sfxMuted
  localStorage.setItem('ag-sfx-muted', desktop.state.value.sfxMuted ? '1' : '')
  if (!desktop.state.value.sfxMuted) sfx.click()
}

const resetDesktop = () => {
  sfx.trash()
  const state = desktop.state.value
  state.wallpaper = 0
  state.wallpaperAuto = true
  state.sfxMuted = false
  localStorage.setItem('ag-sfx-muted', '')
  for (const id of Object.keys(state.apps)) {
    if (id !== 'settings') state.apps[id] = false
  }
  for (const id of Object.keys(state.wins)) {
    state.wins[id].min = false
    state.wins[id].zoom = false
  }
  // Replace aussi les icônes du bureau à leur position d'origine
  localStorage.removeItem('ag-icon-pos')
  gsap.to('.desk-icon', { x: 0, y: 0, duration: 0.35, ease: 'power2.out' })
  music.stop()
}

// ── Ouverture : animation + déplacement ──
let drags: ReturnType<typeof Draggable.create> = []
watch(
  () => desktop.state.value.apps.settings,
  (open) => {
    if (!open) {
      drags.forEach((d) => d.kill())
      drags = []
      return
    }
    sfx.pop()
    mobileDetail.value = false
    nextTick(() => {
      if (!winEl.value) return
      bringToFront()
      gsap.from(winEl.value, {
        scale: 0.85,
        autoAlpha: 0,
        y: 20,
        duration: 0.35,
        ease: 'back.out(1.4)',
      })
      if (window.matchMedia('(min-width: 1024px)').matches) {
        drags = Draggable.create(winEl.value, {
          trigger: winEl.value.querySelectorAll('.settings-drag'),
          cursor: 'grab',
          activeCursor: 'grabbing',
        })
      }
    })
  }
)
</script>

<style scoped>
.settings-card {
  @apply overflow-hidden rounded-[10px] bg-white shadow-sm ring-1 ring-black/5;
}
/* Séparateurs en retrait, alignés sur le texte, comme System Settings */
.settings-card > * + * {
  @apply relative;
}
.settings-card > * + *::before {
  content: '';
  @apply absolute left-4 right-0 top-0 border-t border-black/[0.08];
}
.settings-label {
  @apply text-[13px] font-normal text-aink;
}
.settings-row {
  @apply flex items-center justify-between px-4 py-2.5;
}
.settings-value {
  @apply text-[13px] text-black/45;
}
.settings-footnote {
  @apply mt-1.5 px-4 text-[11px] leading-snug text-black/40;
}

.settings-vol {
  @apply h-[4px] cursor-pointer appearance-none rounded-full bg-black/15;
}
.settings-vol::-webkit-slider-thumb {
  @apply h-[15px] w-[15px] appearance-none rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.3)] ring-1 ring-black/5;
}
.settings-vol::-moz-range-thumb {
  @apply h-[15px] w-[15px] rounded-full border-0 bg-white shadow;
}
</style>
