<template>
  <Teleport to="body">
    <div
      v-if="desktop.state.value.apps.video"
      ref="winEl"
      data-window="video"
      class="fixed inset-0 z-40 flex flex-col overflow-hidden bg-black lg:inset-auto lg:top-16 lg:rounded-xl lg:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.6)] lg:ring-1 lg:ring-white/10"
      :style="{ zIndex: z }"
      @pointerdown="bringToFront"
    >
      <div
        class="video-drag relative flex shrink-0 items-center gap-2 bg-[#1C1C1E] px-4 pb-2.5 pt-12 lg:px-3 lg:py-2.5"
      >
        <button
          class="group hidden h-3 w-3 items-center justify-center rounded-full border border-[#E0443E] bg-[#FF5F57] lg:flex"
          aria-label="close"
          @click.stop="(sfx.minimize(), close())"
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
          @click.stop="(sfx.minimize(), desktop.minimizeApp('video'))"
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
          class="hidden h-3 w-3 rounded-full border border-white/10 bg-[#4A4A4E] lg:block"
        ></span>
        <span
          class="absolute left-1/2 -translate-x-1/2 text-[13px] font-semibold text-white/85"
        >
          {{ $t('macos.videoTitle') }}
        </span>
        <button
          class="ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white lg:hidden"
          :aria-label="$t('macos.close')"
          @click="close"
        >
          <i aria-hidden="true" class="f7-icons" style="font-size: 15px"
            >xmark</i
          >
        </button>
      </div>

      <!-- Mobile: the video stops above the home bar, which owns its strip -->
      <div
        class="flex min-h-0 flex-1 items-center justify-center pb-[calc(52px+env(safe-area-inset-bottom,0px))] lg:pb-0"
      >
        <video
          ref="videoEl"
          :src="SRC"
          :poster="POSTER"
          class="aspect-[4/5] max-h-full w-full bg-black object-contain lg:h-[min(540px,calc(100svh-150px))] lg:w-auto"
          controls
          playsinline
          preload="none"
        />
      </div>
      <DesktopIosHomeBar app="video" dark @close="close" />
    </div>
  </Teleport>
</template>

<script setup lang="ts">
// The video CV, encoded for the web: downloaded only once the player opens
const SRC = '/assets/video/antoinegourgue-cv.mp4'
const POSTER = '/assets/video/antoinegourgue-cv-poster.jpg'
// Remembers that this visitor was already offered the video
const SEEN_KEY = 'ag-video-notified'

const desktop = useDesktop()
const sfx = useSfx()
const track = useTrack()
const { t } = useI18n()
const { notify } = useNotify()
const { gsap, Draggable } = useGsap()

const winEl = ref<HTMLElement | null>(null)
const videoEl = ref<HTMLVideoElement | null>(null)
const z = ref(40)
const bringToFront = () => {
  z.value = desktop.focusApp('video')
}
const close = () => desktop.closeApp('video')

// The Dock icon brings an open player forward through focusApp(), which
// cannot reach this window's own z-index
watch(
  () => desktop.state.value.activeApp,
  (id) => {
    if (id === 'video') z.value = 40 + desktop.state.value.topZ
  }
)

// Where playback picks up when the window comes back from the Dock
let resumeAt = 0

let drags: ReturnType<typeof Draggable.create> = []
watch(
  () => desktop.state.value.apps.video,
  (open) => {
    if (!open) {
      // Runs before the DOM update, so the <video> is still there: a
      // window sent to the Dock resumes where it was, a closed one restarts
      resumeAt = desktop.state.value.minimizedApps.video
        ? (videoEl.value?.currentTime ?? 0)
        : 0
      drags.forEach((d) => d.kill())
      drags = []
      return
    }
    sfx.pop()
    nextTick(() => {
      const el = winEl.value
      if (!el) return
      bringToFront()
      if (window.matchMedia('(min-width: 1024px)').matches) {
        // The window takes the video's width, which depends on the
        // viewport height: centre it once it is laid out
        el.style.left = `${Math.max(16, (window.innerWidth - el.offsetWidth) / 2)}px`
        drags = Draggable.create(el, {
          trigger: el.querySelectorAll('.video-drag'),
          cursor: 'grab',
          activeCursor: 'grabbing',
        })
      }
      gsap.from(el, {
        scale: 0.85,
        autoAlpha: 0,
        y: 20,
        duration: 0.35,
        ease: 'back.out(1.4)',
      })
      // Opened by a click, so browsers let it start with sound; if one
      // still refuses, the native controls are there to start it
      const video = videoEl.value
      if (!video) return
      if (resumeAt) video.currentTime = resumeAt
      video.play().catch(() => {})
    })
  }
)

// First visit only: once the boot screen is gone and the screen is not
// locked, a notification offers the video, as an app would on a real Mac
const booted = useState('booted', () => false)
let notifyTimer: ReturnType<typeof setTimeout> | undefined

onMounted(() => {
  // ?noboot is for screenshots and automated audits: no banner there either
  if (new URLSearchParams(window.location.search).has('noboot')) return
  try {
    if (localStorage.getItem(SEEN_KEY)) return
  } catch {
    // Storage blocked (private mode): offering the video again is harmless
  }

  const stop = watch(
    [booted, () => desktop.state.value.locked],
    ([isBooted, locked]) => {
      if (!isBooted || locked || notifyTimer) return
      notifyTimer = setTimeout(() => {
        stop()
        if (desktop.state.value.apps.video) return
        try {
          localStorage.setItem(SEEN_KEY, '1')
        } catch {
          // Not remembered: the visitor may see the offer on a later visit
        }
        notify({
          icon: 'quicktime',
          title: t('macos.videoNotifTitle'),
          message: t('macos.videoNotifMessage'),
          duration: 9000,
          action: () => {
            track('video_open', { source: 'notification' })
            desktop.openApp('video')
          },
        })
      }, 2500)
    },
    { immediate: true }
  )
})

onUnmounted(() => {
  if (notifyTimer) clearTimeout(notifyTimer)
})
</script>
