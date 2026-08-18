<template>
  <Teleport to="body">
    <div
      v-if="desktop.state.value.apps.weather"
      ref="winEl"
      class="fixed left-1/2 top-24 z-40 w-[320px] -translate-x-1/2 overflow-hidden rounded-xl shadow-[0_30px_70px_-15px_rgba(0,0,0,0.55)] ring-1 ring-white/20 lg:left-[14%] lg:top-36 lg:translate-x-0"
      :style="{ zIndex: z }"
      @pointerdown="bringToFront"
    >
      <div
        class="bg-gradient-to-b from-[#2E6FD0] via-[#3E82DE] to-[#6AA6EF] text-white"
      >
        <!-- Barre de titre transparente -->
        <div class="wx-drag flex items-center gap-2 px-3 pb-1 pt-2.5">
          <button
            class="group flex h-3 w-3 items-center justify-center rounded-full border border-[#E0443E] bg-[#FF5F57]"
            aria-label="close"
            @click.stop="desktop.closeApp('weather')"
            @pointerdown.stop
          >
            <svg viewBox="0 0 12 12" class="h-full w-full p-[1px] opacity-0 group-hover:opacity-100">
              <path d="M3.6 3.6 L8.4 8.4 M8.4 3.6 L3.6 8.4" stroke="#820005" stroke-width="1.2" stroke-linecap="round" />
            </svg>
          </button>
          <span class="h-3 w-3 rounded-full border border-white/20 bg-white/25"></span>
          <span class="h-3 w-3 rounded-full border border-white/20 bg-white/25"></span>
        </div>

        <!-- En-tête -->
        <div class="wx-drag select-none px-6 pb-5 pt-1 text-center">
          <p class="text-[15px] font-semibold tracking-wide">Rennes</p>
          <template v-if="current">
            <p class="mt-1 text-[54px] font-thin leading-none">
              {{ Math.round(current.temp) }}°
            </p>
            <p class="mt-1 text-[13px] font-medium text-white/90">
              {{ $t(wxLabel(current.code)) }}
            </p>
            <p v-if="today" class="text-[13px] text-white/80">
              ↑{{ Math.round(today.max) }}° ↓{{ Math.round(today.min) }}°
            </p>
          </template>
          <p v-else-if="error" class="mt-3 text-[13px] text-white/80">
            {{ $t('macos.wxError') }}
          </p>
          <p v-else class="mt-3 text-[13px] text-white/80">
            {{ $t('macos.wxLoading') }}
          </p>
        </div>

        <!-- Prévisions -->
        <div
          v-if="days.length"
          class="mx-3 mb-3 rounded-xl bg-white/15 px-4 py-1 backdrop-blur-sm"
        >
          <div
            v-for="d in days"
            :key="d.date"
            class="flex items-center gap-3 border-b border-white/15 py-2 text-[13px] last:border-0"
          >
            <span class="w-14 font-medium capitalize">{{ d.label }}</span>
            <span class="flex-1 text-center text-[15px]">
              <DesktopSfIcon :name="wxIcon(d.code)" />
            </span>
            <span class="w-8 text-right text-white/70">{{ Math.round(d.min) }}°</span>
            <span class="w-8 text-right font-medium">{{ Math.round(d.max) }}°</span>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
const desktop = useDesktop()
const { gsap, Draggable } = useGsap()
const { locale, t } = useI18n()

const winEl = ref<HTMLElement | null>(null)
const z = ref(40)
const bringToFront = () => {
  z.value = ++desktop.state.value.topZ + 40
}

// ── Vraie météo de Rennes (open-meteo, sans clé) ──
interface Current {
  temp: number
  code: number
}
interface Day {
  date: string
  label: string
  code: number
  min: number
  max: number
}

const current = ref<Current | null>(null)
const days = ref<Day[]>([])
const today = computed(() => days.value[0])
const error = ref(false)
let loaded = false

const load = async () => {
  if (loaded) return
  try {
    const res = await $fetch<{
      current: { temperature_2m: number; weather_code: number }
      daily: {
        time: string[]
        weather_code: number[]
        temperature_2m_max: number[]
        temperature_2m_min: number[]
      }
    }>(
      'https://api.open-meteo.com/v1/forecast?latitude=48.1173&longitude=-1.6778&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Europe%2FParis&forecast_days=6'
    )
    current.value = {
      temp: res.current.temperature_2m,
      code: res.current.weather_code,
    }
    const fmt = new Intl.DateTimeFormat(locale.value, { weekday: 'short' })
    days.value = res.daily.time.map((day, i) => ({
      date: day,
      label: i === 0 ? t('macos.wxToday') : fmt.format(new Date(day)),
      code: res.daily.weather_code[i],
      min: res.daily.temperature_2m_min[i],
      max: res.daily.temperature_2m_max[i],
    }))
    loaded = true
  } catch {
    error.value = true
  }
}

// Codes météo WMO → icône SF + libellé
const wxIcon = (code: number) => {
  if (code === 0) return 'sun_max_fill'
  if (code <= 2) return 'cloud_sun_fill'
  if (code === 3) return 'cloud_fill'
  if (code === 45 || code === 48) return 'cloud_fog_fill'
  if (code >= 71 && code <= 86 && code !== 80 && code !== 81 && code !== 82)
    return 'snow'
  if (code >= 95) return 'cloud_bolt_fill'
  return 'cloud_rain_fill'
}
const wxLabel = (code: number) => {
  if (code === 0) return 'macos.wxClear'
  if (code <= 2) return 'macos.wxPartly'
  if (code === 3) return 'macos.wxCloudy'
  if (code === 45 || code === 48) return 'macos.wxFog'
  if (code >= 71 && code <= 86 && code !== 80 && code !== 81 && code !== 82)
    return 'macos.wxSnow'
  if (code >= 95) return 'macos.wxStorm'
  return 'macos.wxRain'
}

// SfIcon attend nos noms internes OU une ligature valide : ici on passe la ligature directe
let drags: ReturnType<typeof Draggable.create> = []
watch(
  () => desktop.state.value.apps.weather,
  (open) => {
    if (!open) {
      drags.forEach((d) => d.kill())
      drags = []
      return
    }
    load()
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
          trigger: winEl.value.querySelectorAll('.wx-drag'),
          cursor: 'grab',
          activeCursor: 'grabbing',
        })
      }
    })
  }
)
</script>
