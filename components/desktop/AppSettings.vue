<template>
  <Teleport to="body">
    <div
      v-if="desktop.state.value.apps.settings"
      ref="winEl"
      class="fixed inset-0 z-40 overflow-hidden lg:inset-auto lg:left-[30%] lg:top-32 lg:w-[560px] lg:rounded-xl lg:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.45)] lg:ring-1 lg:ring-black/10"
      :style="{ zIndex: z }"
      @pointerdown="bringToFront"
    >
      <div
        class="flex h-full flex-col bg-[#f2f2f7] lg:h-[400px] lg:flex-row lg:bg-transparent"
      >
        <!-- ── Desktop : barre latérale translucide ── -->
        <aside
          class="hidden w-[185px] shrink-0 flex-col border-r border-black/10 bg-[#E9E9EE]/95 backdrop-blur-2xl lg:flex"
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
            <span
              class="h-3 w-3 rounded-full border border-black/10 bg-[#DDDDDF]"
            ></span>
            <span
              class="h-3 w-3 rounded-full border border-black/10 bg-[#DDDDDF]"
            ></span>
          </div>

          <!-- Profil -->
          <button
            class="mx-2.5 mt-4 flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-left transition hover:bg-black/5"
            @click="section = 'general'"
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

          <nav class="mt-3 flex flex-col gap-0.5 px-2.5">
            <button
              v-for="item in sections"
              :key="item.id"
              class="flex items-center gap-2.5 rounded-md px-2 py-[5px] text-left text-[13px] transition"
              :class="
                section === item.id
                  ? 'bg-[#0A84FF] font-medium text-white'
                  : 'text-aink hover:bg-black/5'
              "
              @click="section = item.id"
            >
              <span
                class="flex h-[22px] w-[22px] items-center justify-center rounded-[6px] text-white shadow-sm"
                :style="{ background: item.tint }"
              >
                <i class="f7-icons" style="font-size: 13px">{{ item.icon }}</i>
              </span>
              {{ $t(item.label) }}
            </button>
          </nav>
        </aside>

        <!-- ── Mobile : barre de titre iOS ── -->
        <div class="relative flex items-center px-4 pb-2 pt-12 lg:hidden">
          <button
            class="flex items-center gap-0.5 text-[15px] font-medium text-[#0A84FF]"
            @click="desktop.closeApp('settings')"
          >
            <span class="text-xl leading-none">‹</span>
            {{ $t('macos.close') }}
          </button>
          <span
            class="absolute left-1/2 -translate-x-1/2 text-[16px] font-semibold text-aink"
          >
            {{ $t('macos.settingsTitle') }}
          </span>
        </div>

        <!-- ── Contenu ── -->
        <div class="flex flex-1 flex-col overflow-hidden bg-[#f2f2f7]">
          <!-- Desktop : barre de titre de section -->
          <div
            class="settings-drag hidden h-[46px] shrink-0 items-center border-b border-black/10 px-5 lg:flex"
          >
            <span class="text-[14px] font-bold text-aink">
              {{ $t(activeSection.label) }}
            </span>
          </div>

          <div
            class="flex-1 overflow-y-auto px-4 pb-8 pt-1 lg:px-5 lg:pb-5 lg:pt-4"
          >
            <!-- Mobile : navigation par pilules -->
            <div class="mb-4 flex gap-1.5 overflow-x-auto lg:hidden">
              <button
                v-for="item in sections"
                :key="item.id"
                class="shrink-0 rounded-full px-3.5 py-1.5 text-[13px] font-semibold"
                :class="
                  section === item.id
                    ? 'bg-[#0A84FF] text-white'
                    : 'bg-black/5 text-aink'
                "
                @click="section = item.id"
              >
                {{ $t(item.label) }}
              </button>
            </div>

            <!-- Fond d'écran -->
            <template v-if="section === 'wallpaper'">
              <div class="settings-card">
                <div class="px-4 py-3">
                  <p class="settings-label">
                    {{ $t('macos.settingsWallpaper') }}
                  </p>
                  <p class="mt-0.5 text-[11.5px] text-black/45">
                    {{ $t('macos.settingsWallpaperHint') }}
                  </p>
                  <div class="mt-3 grid grid-cols-2 gap-3">
                    <button
                      v-for="(wp, i) in WALLPAPERS"
                      :key="i"
                      class="aspect-video rounded-lg shadow-sm transition"
                      :class="
                        desktop.state.value.wallpaper === i
                          ? 'ring-2 ring-[#0A84FF] ring-offset-2 ring-offset-[#f2f2f7]'
                          : 'opacity-85 hover:opacity-100'
                      "
                      :style="{ backgroundImage: wp }"
                      :aria-label="`wallpaper ${i + 1}`"
                      @click="
                        (sfx.click(), (desktop.state.value.wallpaper = i))
                      "
                    ></button>
                  </div>
                </div>
              </div>
            </template>

            <!-- Son -->
            <template v-else-if="section === 'sound'">
              <div class="settings-card">
                <div class="flex items-center justify-between px-4 py-2.5">
                  <span class="settings-label">{{
                    $t('macos.settingsSfx')
                  }}</span>
                  <button
                    class="relative h-[26px] w-[46px] rounded-full transition-colors"
                    :class="
                      !desktop.state.value.sfxMuted
                        ? 'bg-[#34C759]'
                        : 'bg-black/15'
                    "
                    role="switch"
                    :aria-checked="!desktop.state.value.sfxMuted"
                    @click="toggleSfx"
                  >
                    <span
                      class="absolute top-[2px] h-[22px] w-[22px] rounded-full bg-white shadow transition-all"
                      :class="
                        !desktop.state.value.sfxMuted
                          ? 'left-[22px]'
                          : 'left-[2px]'
                      "
                    ></span>
                  </button>
                </div>
                <div class="hidden items-center gap-3 px-4 py-3 lg:flex">
                  <span class="settings-label shrink-0">{{
                    $t('macos.settingsMusicVolume')
                  }}</span>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    :value="music.state.value.volume"
                    class="settings-vol flex-1"
                    @input="
                      music.setVolume(
                        parseFloat(($event.target as HTMLInputElement).value)
                      )
                    "
                  />
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
                  <DesktopFlagIcon :code="loc.code" class="h-[15px] w-[22px]" />
                  <span class="settings-label flex-1">{{ loc.name }}</span>
                  <span
                    v-if="locale === loc.code"
                    class="text-[15px] font-semibold text-[#0A84FF]"
                    >✓</span
                  >
                </button>
              </div>
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
                      >AntoineOS 26</span
                    >
                    <span class="block text-[11.5px] text-black/45">
                      Nuxt 3 · GSAP · Tailwind
                      <template v-if="buildSha">
                        · build {{ buildSha }}</template
                      >
                    </span>
                  </span>
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
              <p class="mt-2 px-1 text-[11.5px] text-black/45">
                {{ $t('macos.settingsResetHint') }}
              </p>
            </template>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import AgLogo from '~/components/ui/AGLogo.vue'
import { WALLPAPERS } from '~/composables/useDesktop'

const desktop = useDesktop()
const music = useMusic()
const sfx = useSfx()
const { gsap, Draggable } = useGsap()
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const router = useRouter()
const buildSha = (
  useRuntimeConfig().public.gitSha as string | undefined
)?.slice(0, 7)

const winEl = ref<HTMLElement | null>(null)
const z = ref(40)
const bringToFront = () => {
  z.value = ++desktop.state.value.topZ + 40
}

type SectionId = 'wallpaper' | 'sound' | 'language' | 'general'
const section = ref<SectionId>('wallpaper')

const sections: Array<{
  id: SectionId
  label: string
  icon: string
  tint: string
}> = [
  {
    id: 'wallpaper',
    label: 'macos.settingsWallpaper',
    icon: 'photo_fill',
    tint: '#0A84FF',
  },
  {
    id: 'sound',
    label: 'macos.settingsSound',
    icon: 'speaker_2_fill',
    tint: '#FF2D55',
  },
  {
    id: 'language',
    label: 'macos.settingsLanguage',
    icon: 'globe',
    tint: '#34C759',
  },
  {
    id: 'general',
    label: 'macos.settingsGeneral',
    icon: 'gear_alt_fill',
    tint: '#8E8E93',
  },
]

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
  state.sfxMuted = false
  localStorage.setItem('ag-sfx-muted', '')
  for (const id of Object.keys(state.apps)) {
    if (id !== 'settings') state.apps[id] = false
  }
  for (const id of Object.keys(state.wins)) {
    state.wins[id].min = false
    state.wins[id].zoom = false
  }
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
  @apply overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5;
}
.settings-card > * + * {
  @apply border-t border-black/5;
}
.settings-label {
  @apply text-[13.5px] font-medium text-aink;
}

.settings-vol {
  @apply h-[5px] cursor-pointer appearance-none rounded-full bg-black/15;
}
.settings-vol::-webkit-slider-thumb {
  @apply h-3.5 w-3.5 appearance-none rounded-full bg-white shadow ring-1 ring-black/10;
}
.settings-vol::-moz-range-thumb {
  @apply h-3.5 w-3.5 rounded-full border-0 bg-white shadow;
}
</style>
