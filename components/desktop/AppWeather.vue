<template>
  <Teleport to="body">
    <div
      v-if="desktop.state.value.apps.weather"
      ref="winEl"
      data-window="weather"
      class="fixed inset-0 z-40 overflow-y-auto lg:inset-auto lg:left-[12%] lg:top-28 lg:w-[350px] lg:overflow-hidden lg:rounded-2xl lg:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.55)] lg:ring-1 lg:ring-white/20"
      :style="{ zIndex: z }"
      @pointerdown="bringToFront"
    >
      <div
        class="min-h-full bg-gradient-to-b from-[#22509E] via-[#2E67BE] to-[#4A86D8] pb-6 text-white lg:min-h-0 lg:pb-3"
      >
        <div class="wx-drag flex items-center gap-2 px-3 pb-0 pt-10 lg:pt-2.5">
          <button
            class="group hidden h-3 w-3 items-center justify-center rounded-full border border-[#E0443E] bg-[#FF5F57] lg:flex"
            aria-label="close"
            @click.stop="(sfx.minimize(), desktop.closeApp('weather'))"
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
            class="group hidden h-3 w-3 items-center justify-center rounded-full border border-[#D89E24] bg-[#FEBC2E] lg:flex"
            aria-label="minimize"
            @click.stop="(sfx.minimize(), desktop.minimizeApp('weather'))"
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
            class="hidden h-3 w-3 rounded-full border border-white/20 bg-white/25 lg:block"
          ></span>
        </div>

        <div
          class="wx-drag mx-auto w-full max-w-md select-none px-6 pb-5 pt-3 text-center lg:max-w-none lg:pb-4 lg:pt-1"
        >
          <p
            class="text-[12px] font-semibold tracking-[0.12em] text-white/70 lg:text-[10px]"
          >
            {{ $t('macos.wxMyLocation') }}
          </p>
          <p
            class="mt-0.5 text-[30px] font-medium leading-tight lg:text-[22px]"
          >
            {{ city }}
          </p>
          <template v-if="header">
            <p
              v-if="!header.isToday"
              class="text-[13px] font-semibold capitalize text-white/85"
            >
              {{ header.dayLong }}
            </p>
            <p class="text-[92px] font-thin leading-[1.05] lg:text-[64px]">
              {{ Math.round(header.temp) }}°
            </p>
            <p class="text-[19px] font-medium text-white/95 lg:text-[15px]">
              {{ $t(wxLabel(header.code)) }}
            </p>
            <p
              class="mt-0.5 text-[19px] font-medium text-white/90 lg:text-[15px]"
            >
              ↑&nbsp;{{ Math.round(header.max) }}°&nbsp;&nbsp;↓&nbsp;{{
                Math.round(header.min)
              }}°
            </p>
          </template>
          <p v-else-if="error" class="mt-4 text-[13px] text-white/80">
            {{ $t('macos.wxError') }}
          </p>
          <p v-else class="mt-4 text-[13px] text-white/80">
            {{ $t('macos.wxLoading') }}
          </p>
        </div>

        <!-- Hourly forecast (for the selected day) -->
        <div
          v-if="shownHours.length"
          class="wx-card mx-auto w-[calc(100%-2rem)] max-w-md lg:mx-3 lg:w-auto lg:max-w-none"
        >
          <p class="wx-card-title">
            <span class="text-[11px]"><DesktopSfIcon name="clock" /></span>
            {{ $t('macos.wxHourly') }}
          </p>
          <div class="no-scrollbar flex gap-1 overflow-x-auto px-1 pb-2 pt-1">
            <div
              v-for="(h, i) in shownHours"
              :key="h.time"
              class="flex min-w-[54px] flex-col items-center gap-2 lg:min-w-[44px] lg:gap-1.5"
            >
              <span
                class="text-[13px] font-medium text-white/80 lg:text-[11px]"
                >{{
                  selectedDay === 0 && i === 0 ? $t('macos.wxNow') : h.label
                }}</span
              >
              <span class="text-[22px] leading-none lg:text-[14px]"
                ><DesktopWxIcon :code="h.code"
              /></span>
              <span class="text-[17px] font-semibold lg:text-[14px]"
                >{{ Math.round(h.temp) }}°</span
              >
            </div>
          </div>
        </div>

        <div
          v-if="days.length"
          class="wx-card mx-auto w-[calc(100%-2rem)] max-w-md lg:mx-3 lg:w-auto lg:max-w-none"
        >
          <p class="wx-card-title">
            <span class="text-[11px]"><DesktopSfIcon name="calendar" /></span>
            {{ $t('macos.wxDaily') }}
          </p>
          <button
            v-for="(d, i) in days"
            :key="d.date"
            class="flex w-full items-center gap-3 rounded-lg px-2 py-[10px] text-[17px] transition-colors lg:py-[7px] lg:text-[14px]"
            :class="[
              i === 0 ? '' : 'border-t border-white/10',
              selectedDay === i
                ? 'bg-white/15 !border-transparent'
                : 'hover:bg-white/5',
            ]"
            @click="selectedDay = i"
          >
            <span class="w-14 font-medium capitalize lg:w-12">{{
              d.label
            }}</span>
            <span
              class="w-8 text-center text-[22px] leading-none lg:w-6 lg:text-[14px]"
            >
              <DesktopWxIcon :code="d.code" />
            </span>
            <span class="w-9 text-right font-medium text-white/60 lg:w-7"
              >{{ Math.round(d.min) }}°</span
            >
            <!-- Temperature range bar (the macOS signature) -->
            <span
              class="relative h-[4px] flex-1 overflow-hidden rounded-full bg-black/25"
            >
              <span
                class="absolute inset-y-0 rounded-full"
                :style="rangeBar(d)"
              ></span>
            </span>
            <span class="w-9 text-right font-medium lg:w-7"
              >{{ Math.round(d.max) }}°</span
            >
          </button>
        </div>
      </div>
      <!-- Swipe up to return to the home screen -->
      <DesktopIosHomeBar
        app="weather"
        dark
        @close="desktop.closeApp('weather')"
      />
    </div>
  </Teleport>
</template>

<script setup lang="ts">
const desktop = useDesktop()
const { gsap, Draggable } = useGsap()
const { locale } = useI18n()
const sfx = useSfx()

const winEl = ref<HTMLElement | null>(null)
const z = ref(40)
const bringToFront = () => {
  z.value = desktop.focusApp('weather')
}

// Weather at the visitor's location (IP geolocation, no permission prompt)
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
interface Hour {
  time: string
  label: string
  code: number
  temp: number
}

const city = ref('…')
const current = ref<Current | null>(null)
const days = ref<Day[]>([])
const selectedDay = ref(0)
const error = ref(false)
let loaded = false

// Raw hourly data (6 days) for the per-day detail
const rawHourly = ref<{ time: string[]; temp: number[]; code: number[] }>({
  time: [],
  temp: [],
  code: [],
})
let nowTime = ''

const shownHours = computed<Hour[]>(() => {
  const day = days.value[selectedDay.value]
  if (!day || !rawHourly.value.time.length) return []
  if (selectedDay.value === 0) {
    // Today: from the current hour
    let start = rawHourly.value.time.findIndex((h) => h >= nowTime)
    if (start === -1) start = 0
    return rawHourly.value.time.slice(start, start + 9).map((time, i) => ({
      time,
      label: `${parseInt(time.slice(11, 13))} h`,
      temp: rawHourly.value.temp[start + i],
      code: rawHourly.value.code[start + i],
    }))
  }
  // Any other day: 8am to 10pm, every 2h
  return rawHourly.value.time
    .map((time, i) => ({ time, i }))
    .filter(({ time }) => {
      if (!time.startsWith(day.date)) return false
      const h = parseInt(time.slice(11, 13))
      return h >= 8 && h <= 22 && h % 2 === 0
    })
    .map(({ time, i }) => ({
      time,
      label: `${parseInt(time.slice(11, 13))} h`,
      temp: rawHourly.value.temp[i],
      code: rawHourly.value.code[i],
    }))
})

// Header: today shows current conditions, another day its own detail
const header = computed(() => {
  const day = days.value[selectedDay.value]
  if (!day) return null
  const fmtLong = new Intl.DateTimeFormat(locale.value, { weekday: 'long' })
  if (selectedDay.value === 0) {
    if (!current.value) return null
    return {
      isToday: true,
      dayLong: '',
      temp: current.value.temp,
      code: current.value.code,
      min: day.min,
      max: day.max,
    }
  }
  return {
    isToday: false,
    dayLong: fmtLong.format(new Date(day.date)),
    temp: day.max,
    code: day.code,
    min: day.min,
    max: day.max,
  }
})

const load = async () => {
  if (loaded) return
  loaded = true

  // 1. Instant IP estimate (fallback: Anglet) while the GPS answers
  let lat = 43.4832
  let lon = -1.514
  city.value = 'Anglet'
  try {
    const geo = await $fetch<{
      latitude: string
      longitude: string
      city?: string
    }>('https://get.geojs.io/v1/ip/geo.json')
    if (geo.latitude && geo.longitude) {
      lat = parseFloat(geo.latitude)
      lon = parseFloat(geo.longitude)
      if (geo.city) city.value = geo.city
    }
  } catch {
    /* silent fallback to Rennes */
  }
  await fetchForecast(lat, lon)

  // 2. Precise browser position (permission asked when the app opens)
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords
        try {
          const rev = await $fetch<{
            city?: string
            locality?: string
            principalSubdivision?: string
          }>(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=${locale.value}`
          )
          city.value =
            rev.locality || rev.city || rev.principalSubdivision || city.value
        } catch {
          /* keep the IP-estimated name */
        }
        // Precise position remembered for the home-screen widget
        try {
          localStorage.setItem(
            'ag-geo',
            JSON.stringify({
              lat: latitude,
              lon: longitude,
              city: city.value,
              ts: Date.now(),
            })
          )
        } catch {
          /* storage unavailable */
        }
        await fetchForecast(latitude, longitude)
      },
      () => {
        /* denied: stick with the IP estimate */
      },
      { timeout: 8000, maximumAge: 600000 }
    )
  }
}

// open-meteo forecast for a given position
const fetchForecast = async (lat: number, lon: number) => {
  try {
    const res = await $fetch<{
      current: { time: string; temperature_2m: number; weather_code: number }
      hourly: {
        time: string[]
        temperature_2m: number[]
        weather_code: number[]
      }
      daily: {
        time: string[]
        weather_code: number[]
        temperature_2m_max: number[]
        temperature_2m_min: number[]
      }
    }>(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=6`
    )
    current.value = {
      temp: res.current.temperature_2m,
      code: res.current.weather_code,
    }

    nowTime = res.current.time
    rawHourly.value = {
      time: res.hourly.time,
      temp: res.hourly.temperature_2m,
      code: res.hourly.weather_code,
    }

    const fmt = new Intl.DateTimeFormat(locale.value, { weekday: 'short' })
    days.value = res.daily.time.map((day, i) => ({
      date: day,
      label: i === 0 ? '' : fmt.format(new Date(day)),
      code: res.daily.weather_code[i],
      min: res.daily.temperature_2m_min[i],
      max: res.daily.temperature_2m_max[i],
    }))
    days.value[0].label = todayLabel.value
    error.value = false
  } catch {
    error.value = true
  }
}

const { t } = useI18n()
const todayLabel = computed(() => t('macos.wxToday'))

// min→max bar positioned within the week's range
const rangeBar = (d: Day) => {
  const weekMin = Math.min(...days.value.map((x) => x.min))
  const weekMax = Math.max(...days.value.map((x) => x.max))
  const span = Math.max(weekMax - weekMin, 1)
  const left = ((d.min - weekMin) / span) * 100
  const width = Math.max(((d.max - d.min) / span) * 100, 8)
  return {
    left: `${left}%`,
    width: `${width}%`,
    background: 'linear-gradient(90deg, #6BD5C8, #FFD60A, #FF9F0A)',
  }
}

// WMO weather codes → label
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

let drags: ReturnType<typeof Draggable.create> = []
watch(
  () => desktop.state.value.apps.weather,
  (open) => {
    if (!open) {
      drags.forEach((d) => d.kill())
      drags = []
      return
    }
    sfx.pop()
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

<style scoped>
.wx-card {
  @apply mt-3 rounded-2xl bg-black/15 px-2 pb-1 pt-1.5 backdrop-blur-sm lg:mt-2.5 lg:rounded-xl;
}
.wx-card-title {
  @apply mb-1 flex items-center gap-1.5 border-b border-white/15 px-2 pb-1.5 text-[10px] font-semibold tracking-[0.08em] text-white/60;
}

/* Hourly strip: scroll without a visible bar */
.no-scrollbar {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
