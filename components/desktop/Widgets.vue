<template>
  <!-- Widgets de bureau : rangée en haut à gauche, au-dessus de la fenêtre.
       Formats macOS : petit 155 × 155, moyen 329 × 155. Un clic ouvre l'app,
       un clic maintenu décolle la tuile pour la déplacer. -->
  <div
    ref="colEl"
    class="pointer-events-none absolute left-10 top-14 z-[4] hidden gap-3.5 lg:flex xl:left-[7%]"
  >
    <!-- ══ Horloge ══ -->
    <div class="wg flex h-[155px] w-[155px] items-center justify-center p-4">
      <div class="relative aspect-square w-[115px] rounded-full bg-white">
        <!-- Graduations : un bras du centre au bord, la marque à son extrémité -->
        <span
          v-for="h in 12"
          :key="h"
          class="absolute left-1/2 top-1/2 h-[52px] w-[2px] origin-top"
          :style="{ transform: `translateX(-50%) rotate(${h * 30}deg)` }"
        >
          <span
            class="absolute bottom-[4px] left-0 w-full rounded-full"
            :class="h % 3 === 0 ? 'h-[8px] bg-black/75' : 'h-[4px] bg-black/35'"
          ></span>
        </span>
        <!-- Aiguilles : heure courte et épaisse, minute longue, seconde fine -->
        <span
          class="absolute bottom-1/2 left-1/2 h-[27px] w-[3.5px] origin-bottom rounded-full bg-[#1d1d1f]"
          :style="{ transform: `translateX(-50%) rotate(${hourAngle}deg)` }"
        ></span>
        <span
          class="absolute bottom-1/2 left-1/2 h-[39px] w-[2.5px] origin-bottom rounded-full bg-[#1d1d1f]"
          :style="{ transform: `translateX(-50%) rotate(${minuteAngle}deg)` }"
        ></span>
        <span
          class="absolute bottom-1/2 left-1/2 h-[44px] w-[1.5px] origin-bottom rounded-full bg-[#FF453A]"
          :style="{ transform: `translateX(-50%) rotate(${secondAngle}deg)` }"
        ></span>
        <span
          class="absolute left-1/2 top-1/2 h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-[#FF453A] bg-white"
        ></span>
      </div>
    </div>

    <!-- ══ Météo : un clic ouvre l'app, comme les widgets macOS ══ -->
    <button
      class="wg flex h-[155px] w-[155px] flex-col p-4 text-left"
      :aria-label="$t('macos.weatherTitle')"
      @click="openIfNotDragged('weather')"
    >
      <p class="truncate text-[13px] font-semibold text-white">{{ wx.city }}</p>
      <p class="text-[38px] font-thin leading-[1.05] text-white">
        {{ wx.temp !== null ? Math.round(wx.temp) + '°' : '—' }}
      </p>
      <p class="mt-auto text-[26px] leading-none">
        <DesktopWxIcon v-if="wx.code !== null" :code="wx.code" />
      </p>
      <p
        v-if="wx.max !== null"
        class="mt-1.5 text-[11.5px] font-medium text-white/85"
      >
        ↑{{ Math.round(wx.max) }}° ↓{{ Math.round(wx.min!) }}°
      </p>
    </button>

    <!-- ══ Musique : format moyen, pochette et transport ══ -->
    <div class="wg flex h-[155px] w-[329px] gap-3.5 p-4">
      <button
        class="shrink-0"
        :aria-label="$t('macos.musicTitle')"
        @click="openIfNotDragged('music')"
      >
        <img
          :src="track.cover"
          :alt="track.title"
          class="h-[92px] w-[92px] rounded-[10px] object-cover shadow-lg"
        />
      </button>
      <div class="flex min-w-0 flex-1 flex-col">
        <p class="truncate text-[14px] font-semibold text-white">
          {{ track.title }}
        </p>
        <p class="truncate text-[12px] text-white/70">{{ track.artist }}</p>

        <!-- Un flux radio n'a ni durée ni position : la barre n'aurait aucun
             sens, on affiche le témoin de direct comme dans l'app Musique. -->
        <p
          v-if="track.live"
          class="mt-3 flex items-center gap-1.5 text-[10.5px] font-bold tracking-wide text-[#FA586A]"
        >
          <span class="live-dot h-1.5 w-1.5 rounded-full bg-[#FA586A]"></span>
          {{ $t('macos.musicLive') }}
        </p>
        <div v-else class="mt-3 h-[3px] w-full rounded-full bg-white/25">
          <div
            class="h-full rounded-full bg-white/85 transition-[width] duration-500"
            :style="{ width: progressPct + '%' }"
          ></div>
        </div>

        <div class="mt-auto flex items-center gap-4">
          <button
            class="wg-btn"
            :aria-label="$t('macos.musicPrev')"
            @click="runIfNotDragged(music.prev)"
          >
            <svg viewBox="0 0 16 16" class="h-[15px] w-[15px]">
              <path
                d="M13 3 L6 8 L13 13 Z M4 3 L4 13"
                fill="currentColor"
                stroke="currentColor"
                stroke-width="1.6"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <button
            class="wg-btn"
            :aria-label="$t('macos.musicPlay')"
            @click="runIfNotDragged(music.toggle)"
          >
            <svg viewBox="0 0 16 16" class="h-[19px] w-[19px]">
              <path
                v-if="music.state.value.playing"
                d="M4.5 2.5 H6.5 V13.5 H4.5 Z M9.5 2.5 H11.5 V13.5 H9.5 Z"
                fill="currentColor"
              />
              <path v-else d="M4 2.5 L13 8 L4 13.5 Z" fill="currentColor" />
            </svg>
          </button>
          <button
            class="wg-btn"
            :aria-label="$t('macos.musicNext')"
            @click="runIfNotDragged(music.next)"
          >
            <svg viewBox="0 0 16 16" class="h-[15px] w-[15px]">
              <path
                d="M3 3 L10 8 L3 13 Z M12 3 L12 13"
                fill="currentColor"
                stroke="currentColor"
                stroke-width="1.6"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const music = useMusic()
const desktop = useDesktop()
const sfx = useSfx()
const { Draggable } = useGsap()
const track = music.track

const colEl = ref<HTMLElement | null>(null)

const progressPct = computed(() => {
  const { progress, duration } = music.state.value
  if (!Number.isFinite(duration) || duration <= 0) return 0
  return Math.min(100, Math.max(0, (progress / duration) * 100))
})

// macOS distingue les deux gestes : un clic ouvre l'app, un clic **maintenu**
// décolle le widget pour le déplacer. Sans ça on ne sait jamais lequel on fait.
const HOLD_MS = 420
let dragged = false
const openIfNotDragged = (app: string) => {
  if (dragged) return
  sfx.click()
  desktop.openApp(app)
}
const runIfNotDragged = (fn: () => void) => {
  if (dragged) return
  sfx.click()
  fn()
}

// ── Horloge : une seule minuterie, arrêtée quand l'onglet passe en fond ──
const now = ref(new Date())
let tick: ReturnType<typeof setInterval> | undefined
const startTick = () => {
  stopTick()
  tick = setInterval(() => (now.value = new Date()), 1000)
}
const stopTick = () => {
  if (tick) clearInterval(tick)
  tick = undefined
}
const onVisibility = () =>
  document.hidden ? stopTick() : ((now.value = new Date()), startTick())

const secondAngle = computed(() => now.value.getSeconds() * 6)
const minuteAngle = computed(
  () => now.value.getMinutes() * 6 + now.value.getSeconds() * 0.1
)
const hourAngle = computed(
  () => (now.value.getHours() % 12) * 30 + now.value.getMinutes() * 0.5
)

// ── Météo : même source et même cache que l'app Météo ──
const wx = reactive<{
  city: string
  temp: number | null
  code: number | null
  min: number | null
  max: number | null
}>({ city: 'Anglet', temp: null, code: null, min: null, max: null })

const loadWeather = async () => {
  let lat = 43.4832
  let lon = -1.514
  // Position mémorisée par l'app Météo (24 h), sinon Anglet
  try {
    const cached = JSON.parse(localStorage.getItem('ag-geo') || 'null')
    if (cached && Date.now() - cached.ts < 24 * 3600 * 1000) {
      lat = cached.lat
      lon = cached.lon
      wx.city = cached.city
    }
  } catch {
    /* cache illisible */
  }
  try {
    const d = await $fetch<{
      current: { temperature_2m: number; weather_code: number }
      daily: { temperature_2m_max: number[]; temperature_2m_min: number[] }
    }>('https://api.open-meteo.com/v1/forecast', {
      query: {
        latitude: lat,
        longitude: lon,
        current: 'temperature_2m,weather_code',
        daily: 'temperature_2m_max,temperature_2m_min',
        timezone: 'auto',
        forecast_days: 1,
      },
    })
    wx.temp = d.current.temperature_2m
    wx.code = d.current.weather_code
    wx.max = d.daily.temperature_2m_max[0]
    wx.min = d.daily.temperature_2m_min[0]
  } catch {
    /* le widget reste sur son tiret */
  }
}

// ── Déplacement : seulement après un maintien, comme sur macOS ──
let drags: ReturnType<typeof Draggable.create> = []
let holdTimer: ReturnType<typeof setTimeout> | undefined
const cleanups: Array<() => void> = []

const makeDraggable = () => {
  if (!colEl.value || !window.matchMedia('(min-width: 1024px)').matches) return
  const bounds = colEl.value.closest('section') ?? undefined
  const tiles = [...colEl.value.querySelectorAll<HTMLElement>('.wg')]

  drags = tiles.map(
    (tile) =>
      Draggable.create(tile, {
        type: 'x,y',
        bounds,
        dragClickables: true,
        activeCursor: 'grabbing',
        onDrag: () => (dragged = true),
        onRelease: () => {
          tile.classList.remove('wg-lifted')
          drags.forEach((d) => d[0]?.disable())
          // le clic natif arrive juste après : on le laisse passer ensuite
          setTimeout(() => (dragged = false), 0)
        },
      })
    // chaque appel renvoie un tableau d'une instance
  )
  drags.forEach((d) => d[0]?.disable())

  tiles.forEach((tile, i) => {
    const onDown = (e: PointerEvent) => {
      dragged = false
      clearTimeout(holdTimer)
      holdTimer = setTimeout(() => {
        // le maintien décolle la tuile : elle grossit, puis suit la souris
        dragged = true
        tile.classList.add('wg-lifted')
        sfx.click()
        drags[i]?.[0]?.enable()
        drags[i]?.[0]?.startDrag(e)
      }, HOLD_MS)
    }
    const onUp = () => clearTimeout(holdTimer)
    tile.addEventListener('pointerdown', onDown)
    tile.addEventListener('pointerup', onUp)
    tile.addEventListener('pointercancel', onUp)
    cleanups.push(() => {
      tile.removeEventListener('pointerdown', onDown)
      tile.removeEventListener('pointerup', onUp)
      tile.removeEventListener('pointercancel', onUp)
    })
  })
}

onMounted(() => {
  startTick()
  document.addEventListener('visibilitychange', onVisibility)
  loadWeather()
  nextTick(makeDraggable)
})
onUnmounted(() => {
  stopTick()
  document.removeEventListener('visibilitychange', onVisibility)
  clearTimeout(holdTimer)
  cleanups.forEach((fn) => fn())
  drags.forEach((d) => d[0]?.kill())
})
</script>

<style scoped>
/* Verre dépoli des widgets de bureau macOS */
.wg {
  pointer-events: auto;
  border-radius: 20px;
  background: rgba(28, 30, 38, 0.34);
  backdrop-filter: blur(24px) saturate(1.4);
  -webkit-backdrop-filter: blur(24px) saturate(1.4);
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.14),
    0 12px 32px -12px rgba(0, 0, 0, 0.55);
}
/* Témoin de direct, comme dans l'app Musique */
.live-dot {
  animation: live-pulse 1.4s ease-in-out infinite;
}
@keyframes live-pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
}
@media (prefers-reduced-motion: reduce) {
  .live-dot {
    animation: none;
  }
}
/* Décollement au maintien : le widget se soulève avant de suivre la souris */
.wg-lifted {
  transform-origin: center;
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.22),
    0 26px 50px -12px rgba(0, 0, 0, 0.7);
}
.wg-lifted,
.wg {
  transition: box-shadow 0.2s ease;
}
.wg-btn {
  color: rgba(255, 255, 255, 0.9);
  transition: color 0.15s ease;
}
.wg-btn:hover {
  color: #fff;
}
.wg-btn:active {
  transform: scale(0.92);
}
</style>
