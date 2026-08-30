<template>
  <!--
    Mobile : la barre d'accueil ferme l'app. Sur un vrai iPhone, balayer depuis
    le bord bas appartient au SYSTÈME (retour à l'écran d'accueil d'iOS) : le
    geste quittait Safari au lieu de fermer l'app du site. Le tap sur la barre
    est donc le moyen principal ; le balayage reste pour les contextes où le
    navigateur nous laisse le bord (Android, PWA). La barre est remontée
    au-dessus de la zone réservée au geste système.
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
/** En dessous de ce déplacement et de cette durée, le geste est un tap */
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
    // Pas de clearProps ici : l'élément va être démonté, et le remettre à
    // l'échelle pendant que la navigation s'effectue le fait réapparaître
    // une fraction de seconde — ce qui se lit comme une seconde animation.
    onComplete: () => emit('close'),
  })
}

const onDown = (e: PointerEvent) => {
  startY = e.clientY
  startedAt = e.timeStamp
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
  // Tap : le geste principal sur iPhone, où le balayage bas appartient à l'OS
  if (Math.abs(dy) < TAP_SLOP && e.timeStamp - startedAt < TAP_MS)
    return close()
  if (dy > THRESHOLD) return close()
  restore()
}

// Le système a repris le geste (c'est le cas du swipe home d'iOS) :
// on remet simplement l'app en place, sans la fermer dans son dos
const onCancel = () => {
  if (!dragging) return
  dragging = false
  restore()
}
</script>
