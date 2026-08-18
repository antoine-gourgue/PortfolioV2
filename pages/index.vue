<template>
  <main
    ref="container"
    class="relative font-sans text-aink"
    @contextmenu.prevent="openContext"
  >
    <!-- ═══ Fond d'écran macOS : dégradé riche + logo AG en filigrane ═══ -->
    <div
      class="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      :style="{ backgroundImage: WALLPAPERS[desktop.state.value.wallpaper] }"
    >
      <div
        class="wall-1 absolute -left-[10%] top-[-15%] h-[36rem] w-[36rem] rounded-full bg-white/10 blur-[130px]"
      ></div>
      <div
        class="wall-2 absolute right-[-8%] top-[25%] h-[32rem] w-[32rem] rounded-full bg-white/10 blur-[130px]"
      ></div>
      <AgLogo
        class="absolute left-1/2 top-1/2 h-72 w-80 -translate-x-1/2 -translate-y-1/2 text-white opacity-[0.07]"
      />
    </div>

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
          @zoom="animateZoom('about')"
        >
          <div class="px-8 pb-8 pt-7 text-center">
            <div
              class="mx-auto flex h-20 w-20 items-center justify-center rounded-[22px] bg-gradient-to-b from-[#3b4048] to-[#17181b] shadow-md ring-1 ring-white/10"
            >
              <AgLogo class="h-11 w-12 text-white" />
            </div>
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
              <span class="text-white/40">~ %</span> whoami
            </p>
            <p class="term-line text-white/75">
              {{ $t('home.subtitle') }} — Rennes, France
            </p>
            <p class="term-line mt-3">
              <span class="text-emerald-400">antoine@macbook</span>
              <span class="text-white/40">~ %</span> cat stack.txt
            </p>
            <p class="term-line text-white/75">
              Vue · Nuxt · TypeScript · Node.js · Docker
            </p>
            <p class="term-line mt-3">
              <span class="text-emerald-400">antoine@macbook</span>
              <span class="text-white/40">~ %</span> status
            </p>
            <p class="term-line">
              <span class="text-emerald-400">●</span>
              <span class="text-white/75">
                {{ $t('macos.terminalStatus') }}</span
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

    <!-- ═══ Projets ═══ -->
    <section class="mx-auto w-full max-w-6xl px-5 pt-20 lg:px-8">
      <div data-reveal class="mb-10 text-center">
        <h2
          class="text-3xl font-bold tracking-tight text-white drop-shadow-md sm:text-4xl"
        >
          {{ $t('macos.projectsTitle') }}
        </h2>
        <p class="mt-2 text-[15px] font-medium text-white/80 drop-shadow">
          {{ $t('macos.projectsSub') }}
        </p>
      </div>

      <div class="grid gap-8 md:grid-cols-2">
        <div
          v-for="project in projects"
          :key="project.name"
          data-reveal
          class="transition-transform duration-300 hover:-translate-y-1.5"
        >
          <UiMacWindow :url="project.domain">
            <a :href="project.url" target="_blank" class="block">
              <img
                :src="project.image"
                :alt="project.name"
                class="aspect-[16/10] w-full bg-white object-cover object-top"
              />
            </a>
            <div
              class="flex items-center justify-between gap-4 border-t border-black/5 bg-white/70 px-5 py-3.5"
            >
              <div class="min-w-0">
                <h3 class="font-semibold tracking-tight">{{ project.name }}</h3>
                <p class="truncate text-xs text-agray">
                  {{ project.description }}
                </p>
              </div>
              <a
                :href="project.url"
                target="_blank"
                class="shrink-0 text-sm font-medium text-ablue hover:underline"
                >{{ $t('macos.visit') }} ›</a
              >
            </div>
          </UiMacWindow>
        </div>
      </div>
    </section>

    <!-- ═══ Parcours (Notes) ═══ -->
    <section class="mx-auto w-full max-w-3xl px-5 pt-20 lg:px-8">
      <div data-reveal>
        <UiMacWindow :title="$t('macos.journeyFile')">
          <div class="p-7">
            <h2 class="text-2xl font-bold tracking-tight">
              {{ $t('home.journey') }}
            </h2>
            <div
              v-for="step in journey"
              :key="step"
              class="mt-6 border-l-2 border-ablue/40 pl-5"
            >
              <p class="text-sm font-medium text-agray">
                {{ $t(`home.${step}.period`) }}
              </p>
              <h3 class="mt-0.5 font-semibold">
                {{ $t(`home.${step}.title`) }}
              </h3>
              <p class="mt-1.5 text-sm leading-relaxed text-agray">
                {{ $t(`home.${step}.description`) }}
              </p>
            </div>
          </div>
        </UiMacWindow>
      </div>
    </section>

    <!-- ═══ Contact (Mail) ═══ -->
    <section class="mx-auto w-full max-w-2xl px-5 pb-36 pt-20 lg:px-8">
      <div data-reveal>
        <UiMacWindow :title="$t('macos.mailTitle')">
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
const { t } = useI18n()
const { gsap } = useGsap()
const desktop = useDesktop()

const container = ref<HTMLElement | null>(null)
const heroEl = ref<HTMLElement | null>(null)
const aboutEl = ref<HTMLElement | null>(null)
const termEl = ref<HTMLElement | null>(null)
let ctxGsap: gsap.Context | undefined

desktop.register('about')
desktop.register('terminal')

const winEls: Record<string, Ref<HTMLElement | null>> = {
  about: aboutEl,
  terminal: termEl,
}

const journey = ['journey2024', 'journey2023']

const projects = computed(() => [
  {
    name: 'Mosaic',
    url: 'https://mosaic.antoinegourgue.dev/',
    domain: 'mosaic.antoinegourgue.dev',
    description: t('projects.items.mosaic.description'),
    image: '/assets/mosaic.png',
  },
  {
    name: 'Sapia',
    url: 'https://sapia.antoinegourgue.dev/',
    domain: 'sapia.antoinegourgue.dev',
    description: t('projects.items.sapia.description'),
    image: '/assets/sapia.png',
  },
  {
    name: 'Design System',
    url: 'https://design-system-storybook.antoinegourgue.dev/',
    domain: 'design-system-storybook.antoinegourgue.dev',
    description: t('projects.items.designSystem.description'),
    image: '/assets/design-system.png',
  },
  {
    name: 'AuroraHome',
    url: 'https://aurora-home-documentation.vercel.app/fr/docs',
    domain: 'aurora-home-documentation.vercel.app',
    description: t('projects.items.aurora.description'),
    image: '/assets/aurora-home.png',
  },
])

// ── Icônes du bureau ──
const selectedIcon = ref('')
const downloadCv = () => {
  const a = document.createElement('a')
  a.href = '/assets/antoinegourgue-cv.pdf'
  a.download = ''
  a.click()
}
const openUrl = (url: string) => window.open(url, '_blank')
const router = useRouter()

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

      gsap.to('.wall-1', {
        x: 60,
        y: 40,
        duration: 10,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })
      gsap.to('.wall-2', {
        x: -50,
        y: 60,
        duration: 12,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
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
</style>
