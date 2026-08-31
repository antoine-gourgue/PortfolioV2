import type { Ref } from 'vue'

/**
 * Standard behavior of a page window:
 * - close / minimize → closing animation, then back to the desktop (/)
 * - zoom (green light) → slight window zoom (toggle)
 */
export function usePageWindow(winRef: Ref<HTMLElement | null>) {
  const { gsap } = useGsap()
  const router = useRouter()
  const localePath = useLocalePath()

  const zoomed = ref(false)

  const goHome = () => router.push(localePath('/'))

  const closeToDesktop = () => {
    const el = winRef.value
    if (!el) return goHome()
    gsap.to(el, {
      scale: 0.92,
      autoAlpha: 0,
      y: 24,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: goHome,
    })
  }

  const toggleZoom = () => {
    const el = winRef.value
    if (!el) return
    zoomed.value = !zoomed.value
    gsap.to(el, {
      scale: zoomed.value ? 1.04 : 1,
      duration: 0.35,
      ease: 'power2.inOut',
    })
  }

  return { closeToDesktop, goHome, toggleZoom }
}
