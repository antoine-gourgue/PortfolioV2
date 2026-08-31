import { beforeEach, vi } from 'vitest'
import { computed, ref, watch } from 'vue'

/**
 * Composables rely on Nuxt auto-imports resolved at runtime. Unit tests run
 * without the Nuxt runtime, so the handful the tested modules touch are
 * stubbed here: `useState` becomes a per-test keyed ref store, the Vue
 * reactivity primitives are the real ones.
 */
const states = new Map<string, unknown>()

beforeEach(() => states.clear())

vi.stubGlobal('useState', <T>(key: string, init: () => T) => {
  if (!states.has(key)) states.set(key, ref(init()))
  return states.get(key)
})
vi.stubGlobal('computed', computed)
vi.stubGlobal('ref', ref)
vi.stubGlobal('watch', watch)
