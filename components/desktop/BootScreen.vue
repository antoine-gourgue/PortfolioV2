<template>
  <Teleport to="body">
    <div
      v-if="visible"
      ref="bootEl"
      class="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black"
    >
      <AgLogo class="h-20 w-24 text-white" />
      <div class="mt-14 h-[5px] w-56 overflow-hidden rounded-full bg-white/20">
        <div ref="barEl" class="h-full w-0 rounded-full bg-white"></div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import AgLogo from '~/components/ui/AGLogo.vue'

const { gsap } = useGsap()

const visible = ref(false)
const bootEl = ref<HTMLElement | null>(null)
const barEl = ref<HTMLElement | null>(null)

onMounted(() => {
  if (sessionStorage.getItem('ag-booted')) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    sessionStorage.setItem('ag-booted', '1')
    return
  }

  visible.value = true
  nextTick(() => {
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
      .to(bootEl.value, { autoAlpha: 0, duration: 0.5, ease: 'power2.inOut' }, '+=0.15')
  })
})
</script>
