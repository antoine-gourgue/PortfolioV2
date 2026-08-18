<template>
  <main ref="container" class="mx-auto w-full max-w-6xl px-4 pt-16 lg:px-8">
    <div ref="winEl" class="win">
      <UiMacWindow
        title="App Store"
        @close="closeToDesktop"
        @minimize="closeToDesktop"
        @zoom="toggleZoom"
      >
        <div class="flex min-h-[70vh]">
          <!-- Sidebar -->
          <aside
            class="hidden w-56 shrink-0 border-r border-black/5 bg-white/40 px-3 py-4 lg:block"
          >
            <div
              class="mb-4 flex items-center gap-2 rounded-lg bg-black/5 px-3 py-1.5 text-[13px] text-black/40"
            >
              <i class="fas fa-magnifying-glass text-[11px]"></i>
              {{ $t('macos.search') }}
            </div>
            <p class="px-2 pb-1.5 text-[11px] font-semibold text-black/35">
              {{ $t('macos.finderProjects') }}
            </p>
            <button
              v-for="project in projects"
              :key="project.key"
              class="flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-left text-[13px] font-medium transition-colors"
              :class="
                selected === project.key
                  ? 'bg-ablue text-white'
                  : 'text-aink hover:bg-black/5'
              "
              @click="selected = project.key"
            >
              <span class="block h-7 w-7 shrink-0">
                <DesktopProjectIcon
                  :icon="project.icon"
                  :name="project.name"
                  :letter="project.letter"
                  :color-top="project.colorTop"
                  :color-bottom="project.colorBottom"
                />
              </span>
              {{ project.name }}
            </button>
          </aside>

          <!-- Fiche de l'app -->
          <div v-if="current" :key="current.key" class="min-w-0 flex-1 p-6 sm:p-8">
            <!-- Sélecteur mobile -->
            <div class="mb-6 flex gap-2 overflow-x-auto pb-1 lg:hidden">
              <button
                v-for="project in projects"
                :key="project.key"
                class="shrink-0 rounded-full px-3.5 py-1.5 text-[13px] font-medium"
                :class="
                  selected === project.key
                    ? 'bg-ablue text-white'
                    : 'bg-black/5 text-aink'
                "
                @click="selected = project.key"
              >
                {{ project.name }}
              </button>
            </div>

            <!-- En-tête -->
            <div class="flex items-start gap-5">
              <span class="block h-24 w-24 shrink-0 sm:h-28 sm:w-28">
                <DesktopProjectIcon
                  :icon="current.icon"
                  :name="current.name"
                  :letter="current.letter"
                  :color-top="current.colorTop"
                  :color-bottom="current.colorBottom"
                />
              </span>
              <div class="min-w-0 flex-1 pt-1">
                <h1 class="text-2xl font-bold tracking-tight sm:text-3xl">
                  {{ current.name }}
                </h1>
                <p class="mt-0.5 text-[15px] text-agray">Antoine Gourgue</p>
                <div class="mt-4 flex items-center gap-4">
                  <a
                    :href="current.url"
                    target="_blank"
                    class="rounded-full bg-ablue px-6 py-1.5 text-[14px] font-bold text-white transition-colors hover:bg-[#0077ed]"
                  >
                    {{ $t('macos.get') }}
                  </a>
                  <a
                    href="https://github.com/antoine-gourgue"
                    target="_blank"
                    class="text-[13px] font-medium text-ablue hover:underline"
                  >
                    {{ $t('macos.sourceCode') }} ↗
                  </a>
                </div>
              </div>
            </div>

            <!-- Rangée de stats -->
            <div
              class="mt-8 flex divide-x divide-black/10 border-y border-black/10 py-4"
            >
              <div class="stat-col">
                <p class="stat-label">{{ $t('macos.ghStars') }}</p>
                <p class="stat-value">
                  {{ starsFor(current) }}
                  <i class="fas fa-star text-[13px] text-black/30"></i>
                </p>
              </div>
              <div class="stat-col">
                <p class="stat-label">{{ $t('macos.category') }}</p>
                <p class="stat-value">{{ $t(current.categoryKey) }}</p>
              </div>
              <div class="stat-col hidden sm:block">
                <p class="stat-label">{{ $t('macos.year') }}</p>
                <p class="stat-value">{{ current.year }}</p>
              </div>
              <div class="stat-col hidden md:block">
                <p class="stat-label">{{ $t('macos.age') }}</p>
                <p class="stat-value truncate">{{ current.stack }}</p>
              </div>
            </div>

            <!-- Aperçu -->
            <h2 class="mt-8 text-lg font-bold">{{ $t('macos.preview') }}</h2>
            <a :href="current.url" target="_blank" class="mt-3 block">
              <img
                :src="current.image"
                :alt="current.name"
                class="w-full rounded-xl border border-black/10 bg-white object-contain shadow-sm transition-transform duration-300 hover:scale-[1.01]"
              />
            </a>

            <!-- À propos -->
            <h2 class="mt-8 text-lg font-bold">{{ $t('macos.aboutApp') }}</h2>
            <p class="mt-2 max-w-3xl text-[15px] leading-relaxed text-agray">
              {{ $t(`projects.items.${current.key}.description`) }}
            </p>

            <!-- Informations -->
            <h2 class="mt-8 text-lg font-bold">
              {{ $t('macos.information') }}
            </h2>
            <dl class="mt-2 max-w-3xl text-[14px]">
              <div class="info-row">
                <dt>{{ $t('macos.developer') }}</dt>
                <dd>Antoine Gourgue</dd>
              </div>
              <div class="info-row">
                <dt>{{ $t('macos.category') }}</dt>
                <dd>{{ $t(current.categoryKey) }}</dd>
              </div>
              <div class="info-row">
                <dt>{{ $t('macos.role') }}</dt>
                <dd>{{ $t('macos.roleFull') }}</dd>
              </div>
              <div class="info-row">
                <dt>Stack</dt>
                <dd>{{ current.stack }}</dd>
              </div>
              <div class="info-row">
                <dt>{{ $t('macos.website') }}</dt>
                <dd>
                  <a
                    :href="current.url"
                    target="_blank"
                    class="text-ablue hover:underline"
                    >{{ current.domain }}</a
                  >
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </UiMacWindow>
    </div>
  </main>
</template>

<script setup lang="ts">
const { gsap } = useGsap()

const projects = useProjects()
const selected = ref(projects[0].key)
const current = computed(() => projects.find((p) => p.key === selected.value))

// Étoiles GitHub réelles via l'API du site
interface GithubRepo {
  name: string
  stargazers_count: number
}
const { data: repos } = useFetch<GithubRepo[]>('/api/github', { server: true })

const starsFor = (p: { repoHint: string }) => {
  const repo = repos.value?.find((r) =>
    r.name.toLowerCase().includes(p.repoHint)
  )
  return repo ? repo.stargazers_count : '—'
}

const container = ref<HTMLElement | null>(null)
const winEl = ref<HTMLElement | null>(null)
const { closeToDesktop, toggleZoom } = usePageWindow(winEl)
let ctx: gsap.Context | undefined

onMounted(() => {
  if (!container.value) return
  ctx = gsap.context(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.win', {
        autoAlpha: 0,
        scale: 0.94,
        y: 30,
        duration: 0.65,
        ease: 'back.out(1.2)',
      })
    })
  }, container.value)
})

onUnmounted(() => ctx?.revert())
</script>

<style scoped>
.stat-col {
  @apply flex-1 px-4 text-center first:pl-0 last:pr-0;
}
.stat-label {
  @apply text-[10px] font-semibold tracking-wide text-black/35;
}
.stat-value {
  @apply mt-1 text-[15px] font-semibold text-black/60;
}
.info-row {
  @apply flex items-baseline justify-between gap-6 border-b border-black/5 py-2.5;
}
.info-row dt {
  @apply shrink-0 text-agray;
}
.info-row dd {
  @apply min-w-0 truncate text-right font-medium text-aink;
}
</style>
