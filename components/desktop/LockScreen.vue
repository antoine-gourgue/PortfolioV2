<template>
  <Transition
    enter-active-class="transition duration-500"
    enter-from-class="opacity-0"
    leave-active-class="transition duration-500"
    leave-to-class="opacity-0"
  >
    <div
      v-if="desktop.state.value.locked"
      class="fixed inset-0 z-[400] flex select-none flex-col items-center justify-between overflow-hidden py-16 text-white lg:py-20"
      :style="{ backgroundImage: wallpaper.style.value }"
      @click="unlock"
      @keydown="unlock"
    >
      <div class="pointer-events-none absolute inset-0 bg-black/25"></div>

      <div class="relative mt-6 text-center">
        <p class="text-[17px] font-medium text-white/85">{{ dateLine }}</p>
        <p
          class="mt-1 text-[88px] font-thin leading-none tracking-tight lg:text-[120px]"
        >
          {{ clock }}
        </p>
      </div>

      <div class="relative flex flex-col items-center gap-3">
        <span
          class="flex h-16 w-16 items-center justify-center rounded-full bg-white/15 shadow-lg ring-1 ring-white/25 backdrop-blur"
        >
          <AgLogo class="h-8 w-9 text-white" />
        </span>
        <p class="text-[15px] font-semibold">Antoine Gourgue</p>
        <p class="text-[12px] font-medium text-white/60">
          {{ $t('macos.lockHint') }}
        </p>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import AgLogo from '~/components/ui/AGLogo.vue'
const desktop = useDesktop()
const wallpaper = useWallpaper()
const music = useMusic()
const sfx = useSfx()
const { locale } = useI18n()

const IDLE_DELAY = 150_000 // 2min30 of inactivity

const now = ref(new Date())
let clockTimer: ReturnType<typeof setInterval> | null = null
let idleTimer: ReturnType<typeof setTimeout> | null = null

const clock = computed(() =>
  now.value.toLocaleTimeString(locale.value, {
    hour: '2-digit',
    minute: '2-digit',
  })
)
const dateLine = computed(() =>
  now.value.toLocaleDateString(locale.value, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })
)

const lock = () => {
  // Never lock while music is playing: the visitor is active
  if (music.state.value.playing) {
    resetIdle()
    return
  }
  desktop.state.value.locked = true
}

const unlock = () => {
  if (!desktop.state.value.locked) return
  sfx.pop()
  desktop.state.value.locked = false
  resetIdle()
}

const resetIdle = () => {
  if (idleTimer) clearTimeout(idleTimer)
  idleTimer = setTimeout(lock, IDLE_DELAY)
}

const onActivity = () => {
  if (!desktop.state.value.locked) resetIdle()
}

onMounted(() => {
  clockTimer = setInterval(() => (now.value = new Date()), 1000)
  resetIdle()
  for (const evt of [
    'pointermove',
    'pointerdown',
    'keydown',
    'scroll',
    'touchstart',
  ]) {
    window.addEventListener(evt, onActivity, { passive: true })
  }
})

onUnmounted(() => {
  if (clockTimer) clearInterval(clockTimer)
  if (idleTimer) clearTimeout(idleTimer)
  for (const evt of [
    'pointermove',
    'pointerdown',
    'keydown',
    'scroll',
    'touchstart',
  ]) {
    window.removeEventListener(evt, onActivity)
  }
})
</script>
