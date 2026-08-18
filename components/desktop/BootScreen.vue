<template>
  <Teleport to="body">
    <!--
      Rendu visible dès le HTML serveur : il couvre la page avant toute
      hydratation. Le script inline (head) le masque instantanément si la
      session a déjà démarré — aucun flash dans un sens comme dans l'autre.
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

// Masque l'écran de boot avant la première peinture si déjà démarré
useHead({
  script: [
    {
      innerHTML:
        "try{if(sessionStorage.getItem('ag-booted')){document.documentElement.classList.add('ag-booted')}}catch(e){}",
      tagPosition: 'head',
    },
  ],
  style: [
    {
      innerHTML: '.ag-booted #boot-screen{display:none!important}',
      tagPosition: 'head',
    },
  ],
})

const visible = ref(true)
const bootEl = ref<HTMLElement | null>(null)
const barEl = ref<HTMLElement | null>(null)

onMounted(() => {
  const alreadyBooted = document.documentElement.classList.contains('ag-booted')
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (alreadyBooted || reduced) {
    visible.value = false
    sessionStorage.setItem('ag-booted', '1')
    return
  }

  // Carillon de démarrage (joué seulement si le navigateur l'autorise)
  useSfx().boot()

  gsap
    .timeline({
      onComplete: () => {
        visible.value = false
        sessionStorage.setItem('ag-booted', '1')
      },
    })
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
