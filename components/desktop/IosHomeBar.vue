<template>
  <!--
    Mobile: the home bar closes the app. On a real iPhone, swiping from the
    bottom edge belongs to the SYSTEM (back to the iOS home screen), so the
    gesture used to quit Safari instead of closing the site's app. Tapping
    the bar is therefore the primary way out; the swipe stays for contexts
    where the browser owns the edge (Android, PWA). The bar sits above the
    zone reserved for the system gesture.
  -->
  <Teleport to="body">
    <div
      class="fixed inset-x-0 bottom-0 z-[500] flex touch-none items-end justify-center lg:hidden"
      :style="{
        height: `calc(40px + ${SAFE_BOTTOM})`,
        paddingBottom: `calc(10px + ${SAFE_BOTTOM})`,
      }"
      role="button"
      :aria-label="$t('macos.close')"
      @pointerdown="onDown"
      @pointermove="onMove"
      @pointerup="onUp"
      @pointercancel="onCancel"
    >
      <span
        class="mb-[7px] h-[5px] w-[134px] rounded-full"
        :class="dark ? 'bg-white/70' : 'bg-black/35'"
      ></span>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
const props = defineProps<{
  /** App id, as carried by its `data-window` attribute */
  app: string
  /** Light bar on a dark background */
  dark?: boolean
}>()

const emit = defineEmits<{ close: [] }>()

const sfx = useSfx()
const { gsap } = useGsap()

const SAFE_BOTTOM = 'env(safe-area-inset-bottom, 0px)'

/** Swipe distance beyond which release goes to the home screen */
const THRESHOLD = 90
/** Travel over which the app finishes shrinking */
const TRAVEL = 260
/** Below this movement and duration, the gesture is a tap */
const TAP_SLOP = 12
const TAP_MS = 400

const winEl = () =>
  document.querySelector<HTMLElement>(`[data-window="${props.app}"]`)

let startY = 0
let startedAt = 0
let dragging = false
let closing = false

const close = () => {
  if (closing) return
  closing = true
  sfx.minimize()
  const el = winEl()
  if (!el) return emit('close')
  gsap.to(el, {
    scale: 0.55,
    opacity: 0,
    duration: 0.28,
    ease: 'power2.in',
    // No clearProps here: the element is about to unmount, and scaling it
    // back while navigation is in flight makes it reappear for a split
    // second — which reads as a second animation.
    onComplete: () => emit('close'),
  })
}

const onDown = (e: PointerEvent) => {
  startY = e.clientY
  startedAt = e.timeStamp
  dragging = true
  ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
}

// The app shrinks and rounds as the drag goes up, like iOS
const onMove = (e: PointerEvent) => {
  const el = winEl()
  if (!dragging || !el) return
  const progress = Math.min(Math.max(0, startY - e.clientY) / TRAVEL, 1)
  gsap.set(el, {
    scale: 1 - progress * 0.22,
    borderRadius: 14 + progress * 30,
    opacity: 1 - progress * 0.2,
    transformOrigin: 'center center',
  })
}

const restore = () => {
  const el = winEl()
  if (!el) return
  gsap.to(el, {
    scale: 1,
    opacity: 1,
    borderRadius: 0,
    duration: 0.32,
    ease: 'power2.out',
    onComplete: () =>
      gsap.set(el, {
        clearProps: 'scale,borderRadius,opacity,transformOrigin',
      }),
  })
}

const onUp = (e: PointerEvent) => {
  if (!dragging) return
  dragging = false

  const dy = startY - e.clientY
  // Tap: the primary gesture on iPhone, where the bottom swipe belongs to the OS
  if (Math.abs(dy) < TAP_SLOP && e.timeStamp - startedAt < TAP_MS)
    return close()
  if (dy > THRESHOLD) return close()
  restore()
}

// The system took the gesture over (that is what the iOS home swipe does):
// just put the app back, never close it behind its back
const onCancel = () => {
  if (!dragging) return
  dragging = false
  restore()
}
</script>
