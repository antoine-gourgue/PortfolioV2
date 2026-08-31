<template>
  <Teleport to="body">
    <div
      v-if="open"
      ref="rootEl"
      class="fixed inset-0 z-[320] hidden select-none lg:block"
      role="dialog"
      aria-modal="true"
      :aria-label="$t('macos.launchpad')"
    >
      <!-- The blur lives in its own childless layer: otherwise hovering an
           icon would force the browser to redo a full-screen blur. -->
      <div class="lp-backdrop absolute inset-0" aria-hidden="true"></div>

      <div
        class="relative flex h-full w-full flex-col items-center"
        @click="onEmptyClick"
      >
        <!-- Search field: 250x26, 28px from the top, like macOS -->
        <div class="relative mt-7 shrink-0">
          <svg
            viewBox="0 0 16 16"
            class="pointer-events-none absolute left-[9px] top-1/2 h-3 w-3 -translate-y-1/2 text-white/55"
          >
            <circle
              cx="6.6"
              cy="6.6"
              r="4.4"
              fill="none"
              stroke="currentColor"
              stroke-width="1.7"
            />
            <path
              d="M10 10 L14 14"
              stroke="currentColor"
              stroke-width="1.7"
              stroke-linecap="round"
            />
          </svg>
          <input
            ref="inputEl"
            v-model="query"
            type="search"
            :placeholder="$t('macos.launchpadSearch')"
            class="lp-search h-[26px] w-[250px] rounded-[13px] bg-black/25 pl-7 pr-3 text-center text-[13px] text-white placeholder:text-white/55 focus:outline-none"
            @keydown.esc="close"
            @keydown.enter="launchFirst"
          />
        </div>

        <!-- Grid: 7 columns, 128px pitch, 76px icons -->
        <div class="flex min-h-0 flex-1 items-center justify-center">
          <div
            v-if="shown.length"
            class="grid grid-cols-7 justify-items-center gap-y-[26px]"
          >
            <component
              :is="app.to ? NuxtLinkComponent : app.href ? 'a' : 'button'"
              v-for="app in shown"
              :key="app.id"
              v-bind="
                app.to
                  ? { to: localePath(app.to) }
                  : app.href
                    ? { href: app.href, target: '_blank', rel: 'noopener' }
                    : {}
              "
              class="lp-tile flex w-[128px] flex-col items-center"
              @click="launch(app)"
            >
              <span class="flex h-[76px] w-[76px] items-center justify-center">
                <DesktopMacAppIcon :name="app.icon" />
              </span>
              <span
                class="mt-[7px] max-w-[116px] truncate text-[13px] leading-[16px] text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.55)]"
                >{{ app.raw ?? $t(app.label!) }}</span
              >
            </component>
          </div>
          <p v-else class="text-[15px] text-white/60">
            {{ $t('macos.launchpadEmpty') }}
          </p>
        </div>

        <!-- Page dot: just one, the catalog fits on a single screen -->
        <div class="mb-[86px] flex shrink-0 gap-[9px]">
          <span class="h-[6px] w-[6px] rounded-full bg-white/85"></span>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import type { LaunchpadApp } from '~/composables/useLaunchpad'

const { open, close, apps } = useLaunchpad()
const desktop = useDesktop()
const sfx = useSfx()
const track = useTrack()
const localePath = useLocalePath()
const { gsap } = useGsap()
const { t } = useI18n()

const NuxtLinkComponent = resolveComponent('NuxtLink')

const rootEl = ref<HTMLElement | null>(null)
const inputEl = ref<HTMLInputElement | null>(null)
const query = ref('')

// Search matches the displayed — hence translated — label
const label = (a: LaunchpadApp) => a.raw ?? t(a.label ?? '')
const shown = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return apps
  return apps.filter((a) => label(a).toLowerCase().includes(q))
})

// Clicking outside a tile and outside the field closes, like the real Launchpad
const onEmptyClick = (e: MouseEvent) => {
  const el = e.target as HTMLElement
  if (el.closest('.lp-tile') || el.closest('.lp-search')) return
  close()
}

const launch = (app: LaunchpadApp) => {
  sfx.click()
  track('launchpad_opened_app', { app: app.id })
  if (app.app) desktop.openApp(app.app)
  if (app.download) {
    const a = document.createElement('a')
    a.href = '/assets/antoinegourgue-cv.pdf'
    a.download = ''
    a.click()
  }
  // Links and routes run their course; close either way
  close()
}

// Enter launches the first result, like the real Launchpad
const launchFirst = () => {
  const first = shown.value[0]
  if (!first) return
  if (first.to) navigateTo(localePath(first.to))
  else if (first.href) window.open(first.href, '_blank', 'noopener')
  launch(first)
}

// F4 toggles, Escape closes — desktop only, where the layer exists
const onKey = (e: KeyboardEvent) => {
  if (e.key === 'F4') {
    e.preventDefault()
    if (!window.matchMedia('(min-width: 1024px)').matches) return
    open.value = !open.value
    return
  }
  if (e.key === 'Escape' && open.value) close()
}
onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))

// On open: the backdrop settles, icons rise slightly staggered
watch(open, (isOpen) => {
  if (!isOpen) {
    query.value = ''
    return
  }
  sfx.pop()
  track('launchpad_opened')
  nextTick(() => {
    inputEl.value?.focus()
    if (!rootEl.value) return
    // The fade targets the blurred layer alone: animating the root's
    // opacity would recompute the blur every frame.
    const backdrop = rootEl.value.querySelector('.lp-backdrop')
    if (backdrop) {
      gsap.from(backdrop, { autoAlpha: 0, duration: 0.18, clearProps: 'all' })
    }
    gsap.from(rootEl.value.querySelectorAll('.lp-tile'), {
      scale: 0.86,
      autoAlpha: 0,
      duration: 0.32,
      ease: 'back.out(1.6)',
      stagger: { each: 0.012, from: 'center' },
      // Without this, an interrupted animation (backgrounded tab, close
      // mid-flight) leaves a frozen transform and shifts the labels.
      clearProps: 'all',
    })
  })
})
</script>

<style scoped>
/* The real Launchpad blurs the background heavily and barely darkens it:
   the wallpaper colors stay readable. Tailwind caps blur at 24px, far too
   little. This layer has no children, so the browser only recomputes the
   blur when the desktop changes — not on every icon hover. */
.lp-backdrop {
  background: rgba(0, 0, 0, 0.24);
  backdrop-filter: blur(64px);
  -webkit-backdrop-filter: blur(64px);
  will-change: backdrop-filter;
}
/* Hover stays a compositing operation: no SVG repaint */
.lp-tile {
  transition: transform 0.18s ease;
  will-change: transform;
}
@media (hover: hover) {
  .lp-tile:hover {
    transform: scale(1.06);
  }
}
.lp-tile:active {
  transform: scale(0.96);
}
/* No native clear button in the field, like macOS */
.lp-search::-webkit-search-cancel-button {
  display: none;
}
@media (prefers-reduced-motion: reduce) {
  .lp-tile {
    transition: none;
  }
}
</style>
