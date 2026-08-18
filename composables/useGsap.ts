import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Draggable } from 'gsap/Draggable'

let registered = false

export default function useGsap() {
  if (import.meta.client && !registered) {
    gsap.registerPlugin(ScrollTrigger, Draggable)
    registered = true
  }
  return { gsap, ScrollTrigger, Draggable }
}
