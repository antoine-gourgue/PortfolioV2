<template>
  <!--
    Mobile : sur un iPhone sans bouton home, une app ne se ferme pas avec un
    bouton — on balaie vers le haut depuis la barre d'accueil. On téléporte la
    barre dans le body pour qu'elle reste immobile pendant que l'app rétrécit.
  -->
  <Teleport to="body">
    <div
      class="fixed inset-x-0 bottom-0 z-[500] flex touch-none items-end justify-center lg:hidden"
      :style="{
        height: `calc(22px + ${SAFE_BOTTOM})`,
        paddingBottom: SAFE_BOTTOM,
      }"
      @pointerdown="onDown"
      @pointermove="onMove"
      @pointerup="onUp"
      @pointercancel="onUp"
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
  /** Identifiant de l'app, tel que porté par son `data-window` */
  app: string
  /** Barre claire sur fond sombre */
  dark?: boolean
}>()

const emit = defineEmits<{ close: [] }>()

const sfx = useSfx()
const { gsap } = useGsap()

const SAFE_BOTTOM = 'env(safe-area-inset-bottom, 0px)'

/** Distance de balayage au-delà de laquelle on relâche vers l'écran d'accueil */
const THRESHOLD = 90
/** Course sur laquelle l'app finit de rétrécir */
const TRAVEL = 260

const winEl = () =>
  document.querySelector<HTMLElement>(`[data-window="${props.app}"]`)

let startY = 0
let dragging = false

const onDown = (e: PointerEvent) => {
  startY = e.clientY
  dragging = true
  ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
}

// L'app rétrécit et s'arrondit à mesure qu'on remonte, comme sur iOS
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

const onUp = (e: PointerEvent) => {
  const el = winEl()
  if (!dragging) return
  dragging = false
  if (!el) return

  const reset = () =>
    gsap.set(el, { clearProps: 'scale,borderRadius,opacity,transformOrigin' })

  if (startY - e.clientY > THRESHOLD) {
    sfx.minimize()
    gsap.to(el, {
      scale: 0.55,
      opacity: 0,
      duration: 0.28,
      ease: 'power2.in',
      // Pas de clearProps ici : l'élément va être démonté, et le remettre à
      // l'échelle pendant que la navigation s'effectue le fait réapparaître
      // une fraction de seconde — ce qui se lit comme une seconde animation.
      onComplete: () => emit('close'),
    })
    return
  }

  // Balayage trop court : l'app revient en place
  gsap.to(el, {
    scale: 1,
    opacity: 1,
    borderRadius: 0,
    duration: 0.32,
    ease: 'power2.out',
    onComplete: reset,
  })
}
</script>
