<template>
  <Teleport to="body">
    <!--
      Rendu visible dès le HTML serveur : il couvre la page avant toute
      hydratation. Séquence complète à la première visite de la session,
      boot express (~0,9 s) sur les rechargements suivants.
    -->
    <div
      v-if="visible"
      id="boot-screen"
      ref="bootEl"
      class="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black"
    >
      <AgLogo class="h-24 w-28 text-white lg:h-20 lg:w-24" />
      <div
        class="mt-16 h-[4px] w-40 overflow-hidden rounded-full bg-white/20 lg:mt-14 lg:h-[5px] lg:w-56"
      >
        <div ref="barEl" class="h-full w-0 rounded-full bg-white"></div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import AgLogo from '~/components/ui/AGLogo.vue'

const { gsap } = useGsap()

const visible = ref(true)
const bootEl = ref<HTMLElement | null>(null)
const barEl = ref<HTMLElement | null>(null)

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    visible.value = false
    return
  }

  const timeline = gsap.timeline({
    onComplete: () => {
      visible.value = false
    },
  })

  // Rechargement dans la même session : boot express (bon pour le LCP),
  // la séquence complète avec carillon reste pour la première visite
  if (sessionStorage.getItem('ag-booted')) {
    timeline
      .to(barEl.value, { width: '100%', duration: 0.55, ease: 'power2.out' })
      .to(
        bootEl.value,
        { autoAlpha: 0, duration: 0.3, ease: 'power2.inOut' },
        '+=0.05'
      )
    return
  }
  sessionStorage.setItem('ag-booted', '1')

  // Carillon de démarrage (joué seulement si le navigateur l'autorise)
  useSfx().boot()

  timeline
    .to(barEl.value, { width: '40%', duration: 0.7, ease: 'power1.in' })
    .to(barEl.value, { width: '78%', duration: 0.55, ease: 'power1.inOut' })
    .to(barEl.value, { width: '100%', duration: 0.4, ease: 'power2.out' })
    .to(
      bootEl.value,
      { autoAlpha: 0, duration: 0.5, ease: 'power2.inOut' },
      '+=0.15'
    )
})
</script>
