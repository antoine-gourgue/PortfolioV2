<template>
  <main
    ref="container"
    class="mx-auto w-full pt-8 lg:max-w-6xl lg:px-8 lg:pt-16"
  >
    <div ref="winEl" class="win" data-window="page">
      <UiMacWindow
        title="App Store"
        @close="closeToDesktop"
        @minimize="closeToDesktop"
        @zoom="toggleZoom"
      >
        <div class="flex flex-1 min-h-[70vh]">
          <aside
            class="hidden w-56 shrink-0 border-r border-black/5 bg-white/40 px-3 py-4 lg:block"
          >
            <div
              class="mb-4 flex items-center gap-2 rounded-lg bg-black/5 px-3 py-1.5 text-[13px] text-black/40"
            >
              <i aria-hidden="true" class="f7-icons" style="font-size: 11px"
                >search</i
              >
              {{ $t('macos.search') }}
            </div>
            <p class="px-2 pb-1.5 text-[11px] font-semibold text-black/35">
              {{ $t('macos.sidebarWork') }}
            </p>
            <button
              v-for="project in proProjects"
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
                  :bg="project.iconBg"
                  :pad="project.iconPad"
                  :letter="project.letter"
                  :color-top="project.colorTop"
                  :color-bottom="project.colorBottom"
                />
              </span>
              <span class="truncate">{{ project.name }}</span>
            </button>

            <p class="px-2 pb-1.5 pt-3 text-[11px] font-semibold text-black/35">
              {{ $t('macos.finderProjects') }}
            </p>
            <button
              v-for="project in persoProjects"
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
                  :bg="project.iconBg"
                  :pad="project.iconPad"
                  :letter="project.letter"
                  :color-top="project.colorTop"
                  :color-bottom="project.colorBottom"
                />
              </span>
              {{ project.name }}
            </button>
          </aside>

          <div
            v-if="!mobileOpen"
            class="min-w-0 flex-1 px-4 pb-6 pt-4 lg:hidden"
          >
            <!-- Header: large title + avatar, like the Apps tab -->
            <div class="flex items-start justify-between gap-3 px-1">
              <div class="min-w-0">
                <h1
                  class="text-[34px] font-bold leading-tight tracking-[-0.9px]"
                >
                  App Store
                </h1>
                <p class="mt-0.5 text-[15px] text-[#8A8A8E]">
                  {{ $t('macos.projectsSub') }}
                </p>
              </div>
              <NuxtLink
                :to="localePath('/about')"
                class="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-[#3b4048] to-[#17181b]"
                :aria-label="$t('nav.about')"
              >
                <AgLogo class="h-4 w-5 text-white" />
              </NuxtLink>
            </div>

            <!--
              Editorial card: the App Store's signature — a featured spot
              with a visual, then the app row as the card's footer.
            -->
            <button
              v-if="featured"
              class="mt-5 block w-full overflow-hidden rounded-[18px] bg-white text-left shadow-[0_2px_14px_-4px_rgba(0,0,0,0.18)] ring-1 ring-black/[0.06]"
              @click="openMobile(featured.key)"
            >
              <div class="px-4 pb-3 pt-3.5">
                <p
                  class="text-[13px] font-bold uppercase tracking-[0.6px] text-ablue"
                >
                  {{ $t('macos.projectsFeatured') }}
                </p>
                <p class="mt-1 text-[22px] font-bold leading-tight text-aink">
                  {{ featured.name }}
                </p>
                <p class="mt-1 line-clamp-2 text-[15px] text-[#8A8A8E]">
                  {{ featured.stack }}
                </p>
              </div>
              <!-- Full screenshot: cropping cuts the interface it shows -->
              <img
                :src="featured.image"
                :alt="featured.name"
                class="w-full bg-[#F2F2F7]"
                loading="lazy"
              />
              <div class="flex items-center gap-3 px-4 py-3">
                <span class="block h-12 w-12 shrink-0">
                  <DesktopProjectIcon
                    :icon="featured.icon"
                    :name="featured.name"
                    :bg="featured.iconBg"
                    :pad="featured.iconPad"
                    :letter="featured.letter"
                    :color-top="featured.colorTop"
                    :color-bottom="featured.colorBottom"
                  />
                </span>
                <span class="min-w-0 flex-1">
                  <span class="block truncate text-[15px] text-aink">{{
                    featured.name
                  }}</span>
                  <span class="block truncate text-[13px] text-[#8A8A8E]">{{
                    $t(featured.categoryKey)
                  }}</span>
                </span>
                <a
                  :href="featured.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="min-w-[74px] shrink-0 rounded-full bg-[#E9E9EB] py-[6px] text-center text-[13px] font-bold uppercase tracking-[0.3px] text-ablue"
                  @click.stop
                  >{{ $t('macos.get') }}</a
                >
              </div>
            </button>

            <!-- Section header with "See All", like the App Store -->
            <div
              class="flex items-baseline justify-between gap-3 px-1 pb-1 pt-7"
            >
              <h2 class="text-[22px] font-bold tracking-[-0.4px]">
                {{ $t('macos.projectsPerso') }}
              </h2>
              <button
                v-if="!showAllProjects && restProjects.length > 3"
                class="shrink-0 text-[17px] text-ablue"
                @click="showAllProjects = true"
              >
                {{ $t('macos.seeAll') }}
              </button>
            </div>
            <div>
              <button
                v-for="(project, i) in visibleProjects"
                :key="project.key"
                class="relative flex w-full items-center gap-3 py-3 text-left"
                @click="openMobile(project.key)"
              >
                <span
                  v-if="i > 0"
                  class="absolute left-[76px] right-0 top-0 h-px bg-black/[0.11]"
                ></span>
                <span class="block h-16 w-16 shrink-0">
                  <DesktopProjectIcon
                    :icon="project.icon"
                    :name="project.name"
                    :bg="project.iconBg"
                    :pad="project.iconPad"
                    :letter="project.letter"
                    :color-top="project.colorTop"
                    :color-bottom="project.colorBottom"
                  />
                </span>
                <span class="min-w-0 flex-1">
                  <span
                    class="block truncate text-[17px] font-normal leading-tight text-aink"
                    >{{ project.name }}</span
                  >
                  <span
                    class="mt-1 block truncate text-[15px] text-[#8A8A8E]"
                    >{{ $t(project.categoryKey) }}</span
                  >
                </span>
                <a
                  :href="project.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="min-w-[74px] shrink-0 rounded-full bg-[#E9E9EB] py-[6px] text-center text-[13px] font-bold uppercase tracking-[0.3px] text-ablue"
                  @click.stop
                  >{{ $t('macos.get') }}</a
                >
              </button>
            </div>
          </div>

          <div
            v-if="current"
            :key="current.key"
            class="min-w-0 flex-1 p-6 sm:p-8"
            :class="mobileOpen ? '' : 'hidden lg:block'"
          >
            <button
              class="mb-4 flex items-center gap-0.5 text-[15px] font-medium text-ablue lg:hidden"
              @click="mobileOpen = false"
            >
              <span class="text-[19px] leading-none">‹</span> Apps
            </button>

            <div class="flex items-start gap-5">
              <span class="block h-24 w-24 shrink-0 sm:h-28 sm:w-28">
                <DesktopProjectIcon
                  :icon="current.icon"
                  :name="current.name"
                  :bg="current.iconBg"
                  :pad="current.iconPad"
                  :letter="current.letter"
                  :color-top="current.colorTop"
                  :color-bottom="current.colorBottom"
                />
              </span>
              <div class="min-w-0 flex-1 pt-1">
                <h2 class="text-2xl font-bold tracking-tight sm:text-3xl">
                  {{ current.name }}
                </h2>
                <p class="mt-0.5 text-[15px] text-agray">Antoine Gourgue</p>
                <div class="mt-4 flex items-center gap-4">
                  <a
                    :href="current.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="rounded-full bg-ablue px-6 py-1.5 text-[14px] font-bold text-white transition-colors hover:bg-[#0077ed]"
                  >
                    {{ $t('macos.get') }}
                  </a>
                  <a
                    v-if="!current.pro"
                    href="https://github.com/antoine-gourgue"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-[13px] font-medium text-ablue hover:underline"
                  >
                    {{ $t('macos.sourceCode') }} ↗
                  </a>
                </div>
              </div>
            </div>

            <div
              class="mt-8 flex divide-x divide-black/10 border-y border-black/10 py-4"
            >
              <div class="stat-col">
                <p class="stat-label">{{ $t('macos.ghStars') }}</p>
                <p class="stat-value">
                  {{ starsFor(current) }}
                  <i
                    aria-hidden="true"
                    class="f7-icons text-black/30"
                    style="font-size: 13px"
                    >star_fill</i
                  >
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

            <h2 class="mt-8 text-lg font-bold">{{ $t('macos.preview') }}</h2>
            <a
              :href="current.url"
              target="_blank"
              rel="noopener noreferrer"
              class="mt-3 block"
            >
              <img
                :src="current.image"
                :alt="current.name"
                class="w-full rounded-xl border border-black/10 bg-white object-contain shadow-sm transition-transform duration-300 hover:scale-[1.01]"
              />
            </a>

            <h2 class="mt-8 text-lg font-bold">{{ $t('macos.aboutApp') }}</h2>
            <p class="mt-2 max-w-3xl text-[15px] leading-relaxed text-agray">
              {{ $t(`projects.items.${current.key}.description`) }}
            </p>

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
                    rel="noopener noreferrer"
                    class="text-ablue hover:underline"
                    >{{ current.domain }}</a
                  >
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </UiMacWindow>
      <!-- Swipe up to return to the desktop -->
      <DesktopIosHomeBar app="page" @close="goHome" />
    </div>
  </main>
</template>

<script setup lang="ts">
import AgLogo from '~/components/ui/AGLogo.vue'

const { gsap } = useGsap()
const localePath = useLocalePath()

const projects = useProjects()
const proProjects = projects.filter((p) => p.pro)
const persoProjects = projects.filter((p) => !p.pro)
/** The App Store leads with one app in an editorial card */
const featured = computed(() => proProjects[0] ?? persoProjects[0])

/** The section shows three entries before "See All" */
const restProjects = computed(() =>
  projects.filter((p) => p.key !== featured.value?.key)
)
const showAllProjects = ref(false)
const visibleProjects = computed(() =>
  showAllProjects.value ? restProjects.value : restProjects.value.slice(0, 3)
)

const selected = ref(projects[0].key)
const current = computed(() => projects.find((p) => p.key === selected.value))

// Mobile: iOS list first, sheet on tap
const mobileOpen = ref(false)
const sfxStore = useSfx()
const openMobile = (key: string) => {
  selected.value = key
  mobileOpen.value = true
  sfxStore.click()
}

// Real GitHub stars via the site's own API
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
const { closeToDesktop, goHome, toggleZoom } = usePageWindow(winEl)
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
