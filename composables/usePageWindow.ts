import type { Ref } from 'vue'

/**
 * Comportement standard d'une fenêtre-page :
 * - fermer / réduire → animation de fermeture puis retour au bureau (/)
 * - agrandir (vert) → léger zoom de la fenêtre (toggle)
 */
export function usePageWindow(winRef: Ref<HTMLElement | null>) {
  const { gsap } = useGsap()
  const router = useRouter()
  const localePath = useLocalePath()

  const zoomed = ref(false)

  const closeToDesktop = () => {
    const el = winRef.value
    const goHome = () => router.push(localePath('/'))
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

  return { closeToDesktop, toggleZoom }
}
