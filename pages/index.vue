<template>
  <main
    ref="container"
    class="relative font-sans text-aink"
    @contextmenu.prevent="openContext"
  >
    <!-- ═══ Bureau ═══ -->
    <section
      ref="heroEl"
      class="relative mx-auto min-h-[92vh] w-full max-w-6xl px-5 pt-20 lg:px-8 lg:pt-0"
    >
      <!-- Icônes du bureau -->
      <div
        class="absolute right-6 top-14 z-[5] hidden flex-col items-center gap-5 lg:flex"
      >
        <button
          v-for="icon in deskIcons"
          :key="icon.id"
          class="group flex w-24 flex-col items-center gap-1.5"
          @click.stop="selectedIcon = icon.id"
          @dblclick="icon.action"
        >
          <span
            class="rounded-xl p-1.5 transition-colors"
            :class="selectedIcon === icon.id ? 'bg-white/25' : ''"
          >
            <span class="block h-12 w-12">
              <DesktopMacAppIcon :name="icon.icon" />
            </span>
          </span>
          <span
            class="max-w-full truncate rounded px-1.5 text-[12px] font-medium text-white drop-shadow"
            :class="selectedIcon === icon.id ? 'bg-ablue' : ''"
            >{{ $t(icon.label) }}</span
          >
        </button>
      </div>

      <!-- Fenêtre "À propos" -->
      <div
        v-show="!desktop.state.value.wins.about?.min"
        ref="aboutEl"
        class="win relative z-10 mx-auto max-w-lg lg:absolute lg:left-8 lg:top-32 lg:mx-0 lg:w-[500px] lg:max-w-none"
        :style="{ zIndex: desktop.state.value.wins.about?.z ?? 10 }"
        @pointerdown="desktop.focus('about')"
      >
        <UiMacWindow
          :title="$t('macos.aboutTitle')"
          :active="desktop.state.value.activeWin === 'about'"
          @close="animateMinimize('about')"
          @minimize="animateMinimize('about')"
          @zoom="go('/about')"
        >
          <div class="px-8 pb-8 pt-7 text-center">
            <AgLogo class="mx-auto h-16 w-20 text-aink" />
            <h1 class="mt-4 text-[22px] font-bold tracking-tight">
              Antoine Gourgue
            </h1>
            <p class="mt-0.5 text-[13px] text-agray">
              {{ $t('home.subtitle') }} — Rennes, France
            </p>

            <div
              class="mx-auto mt-6 grid max-w-[360px] grid-cols-[110px_1fr] gap-x-4 gap-y-1.5 text-left text-[13px]"
            >
              <span class="text-right font-semibold">{{
                $t('macos.specStack')
              }}</span>
              <span class="text-agray">Vue · Nuxt · TypeScript</span>
              <span class="text-right font-semibold">{{
                $t('macos.specBackend')
              }}</span>
              <span class="text-agray">Node.js · PostgreSQL</span>
              <span class="text-right font-semibold">{{
                $t('macos.specTools')
              }}</span>
              <span class="text-agray">Docker · Git · CI/CD</span>
              <span class="text-right font-semibold">{{
                $t('macos.specTraining')
              }}</span>
              <span class="text-agray">{{ $t('macos.specTrainingVal') }}</span>
              <span class="text-right font-semibold">{{
                $t('macos.specStatus')
              }}</span>
              <span class="text-agray"
                ><span class="mr-1.5 inline-block h-2 w-2 rounded-full bg-emerald-500"></span
                >{{ $t('macos.specStatusVal') }}</span
              >
            </div>

            <div class="mt-7 flex items-center justify-center gap-3">
              <NuxtLink
                :to="localePath('/contact')"
                class="rounded-md bg-ablue px-4 py-1.5 text-[13px] font-medium text-white shadow-sm transition-colors duration-200 hover:bg-[#0077ed]"
              >
                {{ $t('home.contactMe') }}
              </NuxtLink>
              <a
                href="/assets/antoinegourgue-cv.pdf"
                download
                class="rounded-md border border-black/15 bg-white px-4 py-1.5 text-[13px] font-medium text-aink shadow-sm transition-colors duration-200 hover:bg-black/5"
              >
                {{ $t('home.downloadCV') }}
              </a>
            </div>
          </div>
        </UiMacWindow>
      </div>

      <!-- Fenêtre Terminal -->
      <div
        v-show="!desktop.state.value.wins.terminal?.min"
        ref="termEl"
        class="win relative z-10 mx-auto mt-8 max-w-lg lg:absolute lg:right-40 lg:top-64 lg:mx-0 lg:mt-0 lg:w-[440px] lg:max-w-none"
        :style="{ zIndex: desktop.state.value.wins.terminal?.z ?? 10 }"
        @pointerdown="desktop.focus('terminal')"
      >
        <UiMacWindow
          title="antoine — zsh"
          dark
          :active="desktop.state.value.activeWin === 'terminal'"
          @close="animateMinimize('terminal')"
          @minimize="animateMinimize('terminal')"
          @zoom="animateZoom('terminal')"
        >
          <div
            class="p-5 font-mono text-[12.5px] leading-relaxed text-white/90"
          >
            <p class="term-line">
              <span class="text-emerald-400">antoine@macbook</span>
              <span class="text-white/40">~ %</span> ls ~/projets
            </p>
            <p class="term-line text-sky-300">
              tailtcg/&nbsp;&nbsp;mosaic/&nbsp;&nbsp;sapia/&nbsp;&nbsp;design-system/&nbsp;&nbsp;aurora-home/
            </p>
            <p class="term-line mt-3">
              <span class="text-emerald-400">antoine@macbook</span>
              <span class="text-white/40">~ %</span> cat now.txt
            </p>
            <p class="term-line text-white/75">
              {{ $t('macos.terminalNow') }}
            </p>
            <p class="term-line mt-3">
              <span class="text-emerald-400">antoine@macbook</span>
              <span class="text-white/40">~ %</span> open contact
            </p>
            <p class="term-line">
              <span class="text-emerald-400">→</span>
              <NuxtLink
                :to="localePath('/contact')"
                class="text-white/75 underline decoration-white/30 underline-offset-2 hover:text-white"
                >antoinegourgue.dev/contact</NuxtLink
              >
            </p>
            <p class="term-line mt-3">
              <span class="text-emerald-400">antoine@macbook</span>
              <span class="text-white/40">~ %</span>
              <span
                class="caret ml-1 inline-block h-[1em] w-[8px] translate-y-[2px] bg-white/80"
              ></span>
            </p>
          </div>
        </UiMacWindow>
      </div>

      <p
        class="pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-[12px] font-medium tracking-wide text-white/50 lg:block"
      >
        {{ $t('macos.dragHint') }}
      </p>
    </section>

    <!-- ═══ Projets : fenêtre Finder + Quick Look ═══ -->
    <section
      v-show="!desktop.state.value.wins.finder?.min"
      class="mx-auto w-full max-w-5xl px-5 pt-20 lg:px-8"
    >
      <div ref="finderEl" data-reveal>
        <UiMacWindow
          :title="$t('macos.finderProjects')"
          @close="animateMinimize('finder')"
          @minimize="animateMinimize('finder')"
          @zoom="go('/projects')"
        >
          <div class="flex min-h-[380px]">
            <!-- Sidebar Finder -->
            <aside
              class="hidden w-48 shrink-0 border-r border-black/5 bg-white/40 px-3 py-4 sm:block"
            >
              <p
                class="px-2 pb-1.5 text-[11px] font-semibold text-black/35"
              >
                {{ $t('macos.finderFavorites') }}
              </p>
              <div
                class="flex items-center gap-2 rounded-md bg-ablue/90 px-2 py-1 text-[13px] font-medium text-white"
              >
                <i class="fas fa-folder text-[12px]"></i>
                {{ $t('macos.finderProjects') }}
              </div>
              <div class="sidebar-item">
                <i class="fas fa-clock text-[12px] text-ablue"></i>
                {{ $t('macos.finderApps') }}
              </div>
              <div class="sidebar-item">
                <i class="fas fa-arrow-down text-[12px] text-ablue"></i>
                {{ $t('macos.finderDownloads') }}
              </div>
            </aside>

            <!-- Grille de projets -->
            <div class="flex-1 p-6">
              <div
                class="grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3 lg:grid-cols-4"
              >
                <button
                  v-for="project in projects"
                  :key="project.key"
                  class="group flex flex-col items-center gap-2"
                  @click="quicklook = project.key"
                >
                  <span
                    class="block h-16 w-16 transition-transform duration-300 group-hover:scale-105"
                  >
                    <DesktopProjectIcon
                      :icon="project.icon"
                      :name="project.name"
                      :letter="project.letter"
                      :color-top="project.colorTop"
                      :color-bottom="project.colorBottom"
                    />
                  </span>
                  <span
                    class="max-w-full truncate rounded px-1.5 text-[12.5px] font-medium text-aink group-hover:bg-ablue group-hover:text-white"
                    >{{ project.name }}</span
                  >
                </button>
              </div>
              <p class="mt-8 text-center text-[12px] text-black/35">
                {{ $t('macos.projectsSub') }}
              </p>
            </div>
          </div>
        </UiMacWindow>
      </div>
    </section>

    <!-- ═══ Parcours (Notes) ═══ -->
    <section
      v-show="!desktop.state.value.wins.notes?.min"
      class="mx-auto w-full max-w-3xl px-5 pt-20 lg:px-8"
    >
      <div ref="notesEl" data-reveal>
        <UiMacWindow
          :title="$t('macos.journeyFile')"
          @close="animateMinimize('notes')"
          @minimize="animateMinimize('notes')"
          @zoom="go('/about')"
        >
          <div class="p-7">
            <h2 class="text-2xl font-bold tracking-tight">
              {{ $t('home.journey') }}
            </h2>

            <!-- Frise chronologique -->
            <div class="relative ml-1 mt-7">
              <span
                class="absolute bottom-4 left-[15px] top-2 w-px bg-black/10"
              ></span>
              <div
                v-for="step in journeySteps"
                :key="step.id"
                class="relative flex gap-5 pb-8 last:pb-0"
              >
                <span
                  class="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[12px] font-bold text-white shadow-sm ring-2 ring-white"
                  :style="{ background: step.bg }"
                  >{{ step.initial }}</span
                >
                <div class="min-w-0 pt-0.5">
                  <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 class="font-semibold">{{ $t(step.titleKey) }}</h3>
                    <span
                      v-if="step.periodKey"
                      class="rounded-full bg-black/5 px-2 py-0.5 text-[11px] font-medium text-black/50"
                      >{{ $t(step.periodKey) }}</span
                    >
                  </div>
                  <p class="mt-1.5 text-sm leading-relaxed text-agray">
                    {{ $t(step.descKey) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </UiMacWindow>
      </div>
    </section>

    <!-- ═══ Contact (Mail) ═══ -->
    <section
      v-show="!desktop.state.value.wins.mail?.min"
      class="mx-auto w-full max-w-2xl px-5 pb-36 pt-20 lg:px-8"
    >
      <div ref="mailEl" data-reveal>
        <UiMacWindow
          :title="$t('macos.mailTitle')"
          @close="animateMinimize('mail')"
          @minimize="animateMinimize('mail')"
          @zoom="go('/contact')"
        >
          <div
            class="flex items-center gap-5 border-b border-black/5 bg-white/60 px-5 py-2.5 text-black/35"
          >
            <i class="fas fa-paper-plane text-[15px] text-ablue"></i>
            <i class="fas fa-paperclip text-[14px]"></i>
            <i class="fas fa-font text-[14px]"></i>
          </div>
          <div class="p-7 pt-5">
            <p class="border-b border-black/5 pb-2.5 text-sm text-agray">
              {{ $t('macos.mailTo') }}
            </p>
            <p class="border-b border-black/5 py-2.5 text-sm font-medium">
              {{ $t('macos.mailSubject') }}
            </p>
            <p class="pb-2 pt-5 text-[15px] leading-relaxed">
              {{ $t('macos.mailBody') }}
            </p>
            <p class="pb-5 text-[15px] text-agray">— Antoine</p>
            <div class="flex flex-wrap items-center gap-5">
              <NuxtLink
                :to="localePath('/contact')"
                class="rounded-full bg-ablue px-5 py-2.5 text-sm font-medium text-white transition-colors duration-300 hover:bg-[#0077ed]"
              >
                {{ $t('macos.mailSend') }}
              </NuxtLink>
              <a
                href="/assets/antoinegourgue-cv.pdf"
                download
                class="text-sm font-medium text-ablue hover:underline"
                >{{ $t('home.downloadCV') }} ›</a
              >
            </div>
          </div>
        </UiMacWindow>
      </div>
    </section>

    <!-- ═══ Quick Look ═══ -->
    <Teleport to="body">
      <Transition name="ql">
        <div
          v-if="qlProject"
          class="fixed inset-0 z-[95] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
          @click.self="quicklook = ''"
        >
          <div
            class="ql-panel w-full max-w-3xl overflow-hidden rounded-2xl border border-white/20 bg-[#f5f5f7] shadow-2xl"
          >
            <div
              class="relative flex items-center justify-between border-b border-black/5 bg-white/80 px-4 py-2.5"
            >
              <button
                class="flex h-3 w-3 items-center justify-center rounded-full bg-[#ff5f57] text-[8px] text-black/50"
                aria-label="close"
                @click="quicklook = ''"
              ></button>
              <span
                class="absolute left-1/2 -translate-x-1/2 text-[13px] font-medium text-black/50"
                >{{ qlProject.name }}</span
              >
              <a
                :href="qlProject.url"
                target="_blank"
                class="text-[13px] font-medium text-ablue hover:underline"
                >{{ $t('macos.openInSafari') }} ↗</a
              >
            </div>
            <img
              :src="qlProject.image"
              :alt="qlProject.name"
              class="max-h-[52vh] w-full bg-white object-contain"
            />
            <div
              class="flex flex-col gap-3 border-t border-black/5 bg-white/80 px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div class="min-w-0">
                <p class="text-sm leading-relaxed text-agray">
                  {{ $t(`projects.items.${qlProject.key}.description`) }}
                </p>
                <p class="mt-2 text-[12px] font-medium text-black/40">
                  {{ qlProject.stack }}
                </p>
              </div>
              <NuxtLink
                :to="localePath('/projects')"
                class="shrink-0 rounded-md bg-ablue px-4 py-1.5 text-[13px] font-medium text-white shadow-sm hover:bg-[#0077ed]"
              >
                {{ $t('macos.aboutApp') }} ›
              </NuxtLink>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- ═══ Menu contextuel du bureau ═══ -->
    <Teleport to="body">
      <div
        v-if="ctx.show"
        class="fixed z-[90] min-w-[220px] rounded-lg border border-black/10 bg-white/80 p-1 shadow-2xl backdrop-blur-2xl"
        :style="{ left: ctx.x + 'px', top: ctx.y + 'px' }"
      >
        <button class="ctx-item" @click="desktop.cycleWallpaper(), closeContext()">
          {{ $t('macos.ctxWallpaper') }}
        </button>
        <div class="mx-2.5 my-1 border-t border-black/10"></div>
        <button class="ctx-item" @click="downloadCv(), closeContext()">
          {{ $t('macos.ctxCv') }}
        </button>
        <button
          class="ctx-item"
          @click="openUrl('https://github.com/antoine-gourgue'), closeContext()"
        >
          {{ $t('macos.ctxGithub') }}
        </button>
      </div>
    </Teleport>
  </main>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import AgLogo from '~/components/ui/AGLogo.vue'

const localePath = useLocalePath()
const { gsap } = useGsap()
const desktop = useDesktop()

const container = ref<HTMLElement | null>(null)
const heroEl = ref<HTMLElement | null>(null)
const aboutEl = ref<HTMLElement | null>(null)
const termEl = ref<HTMLElement | null>(null)
const finderEl = ref<HTMLElement | null>(null)
const notesEl = ref<HTMLElement | null>(null)
const mailEl = ref<HTMLElement | null>(null)
let ctxGsap: gsap.Context | undefined

desktop.register('about')
desktop.register('terminal')
desktop.register('finder')
desktop.register('notes')
desktop.register('mail')

const winEls: Record<string, Ref<HTMLElement | null>> = {
  about: aboutEl,
  terminal: termEl,
  finder: finderEl,
  notes: notesEl,
  mail: mailEl,
}

const router = useRouter()
const go = (path: string) => router.push(localePath(path))

// Parcours en frise chronologique (fenêtre Notes)
const journeySteps = [
  {
    id: 'digitaleo',
    initial: 'D',
    bg: 'linear-gradient(to bottom, #34C1F2, #1273DE)',
    titleKey: 'home.journey2024.title',
    periodKey: 'home.journey2024.period',
    descKey: 'home.journey2024.description',
  },
  {
    id: 'epitech',
    initial: 'E',
    bg: 'linear-gradient(to bottom, #3ECF8E, #0E9F6E)',
    titleKey: 'home.journey2023.title',
    periodKey: 'home.journey2023.period',
    descKey: 'home.journey2023.description',
  },
  {
    id: 'bts',
    initial: 'B',
    bg: 'linear-gradient(to bottom, #FB923C, #EA580C)',
    titleKey: 'about.education.title',
    periodKey: '',
    descKey: 'about.education.description',
  },
]

const projects = useProjects()

// Quick Look
const quicklook = ref('')
const qlProject = computed(() =>
  projects.find((p) => p.key === quicklook.value)
)

// ── Icônes du bureau ──
const selectedIcon = ref('')
const downloadCv = () => {
  const a = document.createElement('a')
  a.href = '/assets/antoinegourgue-cv.pdf'
  a.download = ''
  a.click()
}
const openUrl = (url: string) => window.open(url, '_blank')

const deskIcons = [
  { id: 'cv', label: 'macos.deskCv', icon: 'pdf', action: downloadCv },
  {
    id: 'projects',
    label: 'macos.deskProjects',
    icon: 'folder',
    action: () => router.push(localePath('/projects')),
  },
  {
    id: 'github',
    label: 'macos.deskGithub',
    icon: 'github',
    action: () => openUrl('https://github.com/antoine-gourgue'),
  },
]

// ── Menu contextuel ──
const onEsc = (e: KeyboardEvent) => {
  if (e.key === 'Escape') quicklook.value = ''
}

const ctx = reactive({ show: false, x: 0, y: 0 })
const openContext = (e: MouseEvent) => {
  ctx.show = true
  ctx.x = Math.min(e.clientX, window.innerWidth - 240)
  ctx.y = Math.min(e.clientY, window.innerHeight - 160)
}
const closeContext = () => (ctx.show = false)

// ── Fenêtres : réduction / restauration / zoom animés ──
const animateMinimize = (id: string) => {
  const el = winEls[id]?.value
  if (!el) return desktop.minimize(id)
  const r = el.getBoundingClientRect()
  gsap.to(el, {
    x: window.innerWidth / 2 - (r.left + r.width / 2),
    y: window.innerHeight - r.top,
    scale: 0.15,
    autoAlpha: 0,
    duration: 0.45,
    ease: 'power2.in',
    transformOrigin: 'center bottom',
    onComplete: () => {
      desktop.minimize(id)
      gsap.set(el, { clearProps: 'x,y,scale,opacity,visibility' })
      useGsap().ScrollTrigger.refresh()
    },
  })
}

const animateZoom = (id: string) => {
  desktop.toggleZoom(id)
  const el = winEls[id]?.value
  if (!el) return
  gsap.to(el, {
    scale: desktop.state.value.wins[id]?.zoom ? 1.08 : 1,
    duration: 0.35,
    ease: 'power2.inOut',
  })
}

// Le dock appelle desktop.restore() : on intercepte pour animer
watch(
  () => Object.entries(desktop.state.value.wins).map(([id, w]) => `${id}:${w.min}`).join(','),
  (val, old) => {
    if (!old) return
    const oldMin = new Set(old.split(',').filter((s) => s.endsWith('true')))
    val.split(',').forEach((s) => {
      const [id, min] = s.split(':')
      if (min === 'false' && oldMin.has(`${id}:true`)) {
        nextTick(() => {
          const el = winEls[id]?.value
          if (!el) return
          const r = el.getBoundingClientRect()
          gsap.from(el, {
            x: window.innerWidth / 2 - (r.left + r.width / 2),
            y: window.innerHeight - r.top,
            scale: 0.15,
            autoAlpha: 0,
            duration: 0.5,
            ease: 'power3.out',
            transformOrigin: 'center bottom',
            clearProps: 'x,y,scale,opacity,visibility',
            onComplete: () => useGsap().ScrollTrigger.refresh(),
          })
        })
      }
    })
  }
)

onMounted(() => {
  if (!container.value) return

  const { Draggable } = useGsap()

  document.addEventListener('click', closeContext)
  document.addEventListener('click', () => (selectedIcon.value = ''))
  document.addEventListener('keydown', onEsc)

  ctxGsap = gsap.context(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.win', {
        autoAlpha: 0,
        scale: 0.92,
        y: 34,
        duration: 0.7,
        ease: 'back.out(1.3)',
        stagger: 0.18,
      })

      gsap.from('.term-line', {
        autoAlpha: 0,
        duration: 0.25,
        stagger: 0.22,
        delay: 0.7,
      })

      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          autoAlpha: 0,
          y: 30,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        })
      })
    })

    mm.add('(min-width: 1024px)', () => {
      const draggables = gsap.utils
        .toArray<HTMLElement>('.win')
        .map((el) =>
          Draggable.create(el, {
            trigger: el.querySelector('.drag-handle'),
            bounds: heroEl.value,
            cursor: 'grab',
            activeCursor: 'grabbing',
          })
        )
        .flat()

      return () => draggables.forEach((d) => d.kill())
    })
  }, container.value)
})

onUnmounted(() => {
  ctxGsap?.revert()
  document.removeEventListener('click', closeContext)
  document.removeEventListener('keydown', onEsc)
})
</script>

<style scoped>
.caret {
  animation: blink 1s steps(1) infinite;
}
@keyframes blink {
  50% {
    opacity: 0;
  }
}
.ctx-item {
  @apply flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-left text-[13px] text-aink transition-colors hover:bg-ablue hover:text-white;
}
.sidebar-item {
  @apply mt-0.5 flex items-center gap-2 rounded-md px-2 py-1 text-[13px] text-aink/70;
}

.ql-enter-active,
.ql-leave-active {
  transition: opacity 0.22s ease;
}
.ql-enter-active .ql-panel,
.ql-leave-active .ql-panel {
  transition:
    transform 0.22s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.22s ease;
}
.ql-enter-from,
.ql-leave-to {
  opacity: 0;
}
.ql-enter-from .ql-panel,
.ql-leave-to .ql-panel {
  opacity: 0;
  transform: scale(0.94);
}
</style>
