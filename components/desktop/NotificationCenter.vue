<template>
  <Teleport to="body">
    <!-- Mobile: control-center scrim — the home screen must not show
         through between the cards -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      leave-active-class="transition duration-200 ease-in"
      leave-to-class="opacity-0"
    >
      <div
        v-if="desktop.state.value.notifOpen"
        class="fixed inset-0 z-[309] bg-black/40 backdrop-blur-2xl lg:hidden"
        @click="desktop.state.value.notifOpen = false"
      ></div>
    </Transition>

    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="-translate-y-6 opacity-0 lg:translate-y-0 lg:translate-x-full"
      leave-active-class="transition duration-200 ease-in"
      leave-to-class="-translate-y-6 opacity-0 lg:translate-y-0 lg:translate-x-full"
    >
      <aside
        v-if="desktop.state.value.notifOpen"
        class="fixed inset-x-2 top-10 z-[310] max-h-[82svh] overflow-y-auto rounded-2xl p-3 lg:inset-x-auto lg:bottom-4 lg:right-2 lg:max-h-none lg:w-[330px]"
        @click.stop
      >
        <!--
          Grabber: drag it up to close. The gesture cannot live on the panel
          itself, which scrolls — the browser cancels pointer events there
          as soon as it takes over the scroll.
        -->
        <div
          class="-mt-1 mb-1 flex touch-none justify-center py-2 lg:hidden"
          @pointerdown="onPanelDown"
          @pointermove="onPanelMove"
          @pointerup="onPanelUp"
          @pointercancel="onPanelUp"
        >
          <span class="block h-[5px] w-9 rounded-full bg-white/60"></span>
        </div>
        <p
          class="px-1 pb-2 text-[13px] font-semibold text-white/80 drop-shadow"
        >
          {{ dateLine }}
        </p>

        <div class="flex flex-col gap-3">
          <!-- GitHub widget: real contributions -->
          <a
            href="https://github.com/antoine-gourgue"
            target="_blank"
            rel="noopener noreferrer"
            class="block rounded-2xl bg-white/80 p-4 shadow-lg backdrop-blur-2xl transition hover:bg-white/90"
          >
            <div class="flex items-center gap-2">
              <span class="block h-6 w-6"
                ><DesktopMacAppIcon name="github"
              /></span>
              <span class="text-[13px] font-bold text-aink"
                >antoine-gourgue</span
              >
              <span
                v-if="contribTotal"
                class="ml-auto text-[11px] font-semibold text-emerald-700"
              >
                {{ contribTotal }} contributions
              </span>
            </div>
            <div
              v-if="weeks.length"
              class="mt-3 flex justify-between gap-[2px]"
            >
              <div
                v-for="(week, w) in weeks"
                :key="w"
                class="flex flex-col gap-[2px]"
              >
                <span
                  v-for="(day, d) in week"
                  :key="d"
                  class="h-[9px] w-[9px] rounded-[2px]"
                  :style="{ background: LEVELS[day] }"
                  :title="`${day}`"
                ></span>
              </div>
            </div>
            <p v-else class="mt-3 text-[11.5px] text-black/40">
              {{ $t('macos.notifGithubLoading') }}
            </p>
            <p class="mt-2 text-[10.5px] text-black/40">
              {{ $t('macos.notifGithubHint') }}
            </p>
          </a>

          <div
            class="flex items-center gap-3 rounded-2xl bg-white/80 p-3.5 shadow-lg backdrop-blur-2xl"
          >
            <img
              :src="music.track.value.cover"
              :alt="music.track.value.title"
              class="h-11 w-11 rounded-lg shadow"
            />
            <div class="min-w-0 flex-1">
              <p class="truncate text-[12.5px] font-semibold text-aink">
                {{ music.track.value.title }}
              </p>
              <p class="truncate text-[11px] text-black/45">
                {{ music.track.value.artist }}
              </p>
            </div>
            <button
              class="flex h-8 w-8 items-center justify-center rounded-full bg-black/5 text-aink transition hover:bg-black/10"
              aria-label="play-pause"
              @click="music.toggle()"
            >
              <svg
                v-if="!music.state.value.playing"
                viewBox="0 0 24 24"
                class="h-4 w-4"
                fill="currentColor"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
              <svg
                v-else
                viewBox="0 0 24 24"
                class="h-4 w-4"
                fill="currentColor"
              >
                <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />
              </svg>
            </button>
            <button
              class="flex h-8 w-8 items-center justify-center rounded-full bg-black/5 text-aink transition hover:bg-black/10"
              aria-label="next"
              @click="music.next()"
            >
              <svg viewBox="0 0 24 24" class="h-4 w-4" fill="currentColor">
                <path d="M16 5h2v14h-2zM4 5v14l10.5-7z" />
              </svg>
            </button>
          </div>

          <button
            type="button"
            class="block w-full rounded-2xl bg-white/80 p-4 text-left shadow-lg backdrop-blur-2xl transition hover:bg-white/90"
            @click="
              (desktop.openApp('contact'),
              (desktop.state.value.notifOpen = false))
            "
          >
            <p
              class="flex items-center gap-2 text-[12.5px] font-bold text-aink"
            >
              <span class="h-2 w-2 rounded-full bg-emerald-500"></span>
              {{ $t('macos.specStatusVal') }}
            </p>
            <p class="mt-1 text-[11.5px] leading-snug text-black/50">
              {{ $t('macos.notifAvailabilityHint') }}
            </p>
          </button>
        </div>
      </aside>
    </Transition>

    <!--
      Mobile: the status bar is not clickable (like iOS); the control center
      opens by pulling down from the top of the screen where the browser
      still owns that edge — otherwise via the clock tap.
    -->
    <div
      v-if="!desktop.state.value.notifOpen"
      class="fixed inset-x-0 top-0 z-[305] h-8 touch-none lg:hidden"
      @pointerdown="onEdgeDown"
      @pointermove="onEdgeMove"
      @pointerup="onEdgeUp"
      @pointercancel="onEdgeUp"
    ></div>
  </Teleport>
</template>

<script setup lang="ts">
const desktop = useDesktop()
const sfx = useSfx()
const music = useMusic()
const { locale } = useI18n()

// Official GitHub heatmap palette
const LEVELS = ['#EBEDF0', '#9BE9A8', '#40C463', '#30A14E', '#216E39']

const dateLine = computed(() =>
  new Date().toLocaleDateString(locale.value, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })
)

// GitHub contributions (last 16 weeks)
const weeks = useState<number[][]>('gh-weeks', () => [])
const contribTotal = useState<number | null>('gh-total', () => null)
let fetched = false

const loadContributions = async () => {
  if (fetched || weeks.value.length) return
  fetched = true
  try {
    const res = await fetch(
      'https://github-contributions-api.jogruber.de/v4/antoine-gourgue?y=last'
    )
    if (!res.ok) return
    const data = (await res.json()) as {
      total?: Record<string, number>
      contributions?: Array<{ date: string; count: number; level: number }>
    }
    const days = (data.contributions ?? []).slice(-16 * 7)
    const grouped: number[][] = []
    for (let i = 0; i < days.length; i += 7) {
      grouped.push(days.slice(i, i + 7).map((d) => d.level))
    }
    weeks.value = grouped
    contribTotal.value = Object.values(data.total ?? {})[0] ?? null
  } catch {
    // widget stays silent on network failure
  }
}

watch(
  () => desktop.state.value.notifOpen,
  (open) => {
    if (open) loadContributions()
  }
)

// Mobile gestures: pulling down from the top edge opens, swiping the
// grabber up closes.
const PULL = 45

let edgeY = 0
let edgeDragging = false

const onEdgeDown = (e: PointerEvent) => {
  edgeY = e.clientY
  edgeDragging = true
  ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
}
const onEdgeMove = (e: PointerEvent) => {
  if (!edgeDragging) return
  if (e.clientY - edgeY > PULL) {
    edgeDragging = false
    sfx.pop()
    desktop.state.value.notifOpen = true
  }
}
const onEdgeUp = () => (edgeDragging = false)

let panelY = 0
let panelDragging = false

const onPanelDown = (e: PointerEvent) => {
  panelY = e.clientY
  panelDragging = true
  ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
}
const onPanelMove = (e: PointerEvent) => {
  if (!panelDragging) return
  if (panelY - e.clientY > PULL) {
    panelDragging = false
    sfx.minimize()
    desktop.state.value.notifOpen = false
  }
}
const onPanelUp = () => (panelDragging = false)

// Close on outside click
const onOutside = () => {
  desktop.state.value.notifOpen = false
}
onMounted(() => document.addEventListener('click', onOutside))
onUnmounted(() => document.removeEventListener('click', onOutside))
</script>
