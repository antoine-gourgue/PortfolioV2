<template>
  <main ref="container" class="mx-auto w-full max-w-5xl px-4 pt-16 lg:px-8">
    <div ref="winEl" class="win">
      <UiMacWindow
        title="Contacts"
        @close="closeToDesktop"
        @minimize="closeToDesktop"
        @zoom="toggleZoom"
      >
        <div class="flex min-h-[62vh]">
          <!-- Liste des contacts -->
          <aside
            class="hidden w-60 shrink-0 border-r border-black/5 bg-white/40 px-3 py-4 sm:block"
          >
            <div
              class="mb-4 flex items-center gap-2 rounded-lg bg-black/5 px-3 py-1.5 text-[13px] text-black/40"
            >
              <i class="fas fa-magnifying-glass text-[11px]"></i>
              {{ $t('macos.search') }}
            </div>
            <p class="px-2 pb-1.5 text-[11px] font-semibold text-black/35">
              {{ $t('macos.allContacts') }}
            </p>
            <button
              v-for="entry in entries"
              :key="entry.id"
              class="flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-left text-[13px] font-medium transition-colors"
              :class="
                selected === entry.id
                  ? 'bg-ablue text-white'
                  : 'text-aink hover:bg-black/5'
              "
              @click="selected = entry.id"
            >
              <span
                class="flex h-7 w-7 shrink-0 items-center justify-center"
                :class="
                  entry.id === 'antoine'
                    ? ''
                    : 'rounded-full text-[11px] font-bold text-white'
                "
                :style="
                  entry.id === 'antoine' ? {} : { background: entry.avatarBg }
                "
              >
                <AgLogo
                  v-if="entry.id === 'antoine'"
                  class="h-5 w-6"
                  :class="selected === 'antoine' ? 'text-white' : 'text-aink'"
                />
                <img
                  v-else-if="entry.logo"
                  :src="entry.logo"
                  :alt="entry.name"
                  class="h-7 w-7 rounded-full bg-white object-contain p-0.5 ring-1 ring-black/10"
                />
                <template v-else>{{ entry.initials }}</template>
              </span>
              {{ entry.name }}
            </button>
          </aside>

          <!-- Fiche -->
          <div v-if="current" :key="current.id" class="min-w-0 flex-1 p-6 sm:p-8">
            <!-- Sélecteur mobile -->
            <div class="mb-6 flex gap-2 overflow-x-auto pb-1 sm:hidden">
              <button
                v-for="entry in entries"
                :key="entry.id"
                class="shrink-0 rounded-full px-3.5 py-1.5 text-[13px] font-medium"
                :class="
                  selected === entry.id
                    ? 'bg-ablue text-white'
                    : 'bg-black/5 text-aink'
                "
                @click="selected = entry.id"
              >
                {{ entry.name }}
              </button>
            </div>

            <div class="flex items-center gap-5">
              <AgLogo
                v-if="current.id === 'antoine'"
                class="h-16 w-20 shrink-0 text-aink"
              />
              <img
                v-else-if="current.logo"
                :src="current.logo"
                :alt="current.name"
                class="h-20 w-20 shrink-0 rounded-full bg-white object-contain p-2 shadow-md ring-1 ring-black/10"
              />
              <span
                v-else
                class="flex h-20 w-20 shrink-0 items-center justify-center rounded-full text-2xl font-bold text-white shadow-md"
                :style="{ background: current.avatarBg }"
              >
                {{ current.initials }}
              </span>
              <div class="min-w-0">
                <h1 class="text-2xl font-bold tracking-tight">
                  {{ current.name }}
                </h1>
                <p class="text-[14px] text-agray">{{ $t(current.roleKey) }}</p>
              </div>
            </div>

            <!-- Actions (fiche Antoine uniquement) -->
            <div
              v-if="current.id === 'antoine'"
              class="mt-6 flex gap-3"
            >
              <NuxtLink
                :to="localePath('/contact')"
                class="action-btn"
                :title="$t('macos.sendMessage')"
              >
                <i class="fas fa-envelope"></i>
              </NuxtLink>
              <a
                href="https://github.com/antoine-gourgue"
                target="_blank"
                class="action-btn"
                title="GitHub"
              >
                <i class="fab fa-github"></i>
              </a>
              <a
                href="https://linkedin.com/in/antoine-gourgue"
                target="_blank"
                class="action-btn"
                title="LinkedIn"
              >
                <i class="fab fa-linkedin-in"></i>
              </a>
              <a
                href="/assets/antoinegourgue-cv.pdf"
                download
                class="action-btn"
                title="CV"
              >
                <i class="fas fa-file-arrow-down"></i>
              </a>
            </div>

            <!-- Champs -->
            <dl class="mt-7 max-w-2xl">
              <div class="field-row">
                <dt>{{ $t('macos.position') }}</dt>
                <dd>{{ $t(current.roleKey) }}</dd>
              </div>
              <div v-if="current.periodKey" class="field-row">
                <dt>{{ $t('macos.year') }}</dt>
                <dd>{{ $t(current.periodKey) }}</dd>
              </div>
              <div class="field-row">
                <dt>{{ $t('macos.location') }}</dt>
                <dd>{{ current.location }}</dd>
              </div>
              <div class="field-row items-start">
                <dt>{{ $t('macos.note') }}</dt>
                <dd class="whitespace-normal text-left sm:text-right">
                  {{ $t(current.noteKey) }}
                </dd>
              </div>
            </dl>

            <!-- Qualités (fiche Antoine) -->
            <template v-if="current.id === 'antoine'">
              <h2 class="mt-8 text-lg font-bold">
                {{ $t('about.qualities.line1') }}
                {{ $t('about.qualities.line2') }}
                {{ $t('about.qualities.line3') }}
              </h2>
              <p class="mt-2 max-w-2xl text-[14px] leading-relaxed text-agray">
                {{ $t('about.qualitiesDescription') }}
              </p>
            </template>
          </div>
        </div>
      </UiMacWindow>
    </div>
  </main>
</template>

<script setup lang="ts">
import AgLogo from '~/components/ui/AGLogo.vue'

const localePath = useLocalePath()
const { gsap } = useGsap()

interface ContactEntry {
  id: string
  name: string
  initials: string
  avatarBg: string
  logo?: string
  location: string
  roleKey: string
  periodKey?: string
  noteKey: string
}

const entries: ContactEntry[] = [
  {
    id: 'antoine',
    name: 'Antoine Gourgue',
    initials: 'AG',
    avatarBg: 'linear-gradient(to bottom, #3b4048, #17181b)',
    location: 'Anglet, France',
    roleKey: 'about.subtitle',
    noteKey: 'about.description',
  },
  {
    id: 'digitaleo',
    name: 'Digitaleo',
    initials: 'D',
    avatarBg: '#ffffff',
    logo: '/assets/companies/digitaleo.png',
    location: 'Rennes, France',
    roleKey: 'about.digitaleo.role',
    periodKey: 'home.journey2024.period',
    noteKey: 'about.digitaleo.description',
  },
  {
    id: 'epitech',
    name: 'Epitech Rennes',
    initials: 'E',
    avatarBg: '#ffffff',
    logo: '/assets/companies/epitech.png',
    location: 'Rennes, France',
    roleKey: 'about.epitech.role',
    periodKey: 'home.journey2023.period',
    noteKey: 'about.epitech.description',
  },
  {
    id: 'kpme',
    name: 'KPME-Development',
    initials: 'K',
    avatarBg: 'linear-gradient(to bottom, #8B5CF6, #6D28D9)',
    location: 'Boucau, France',
    roleKey: 'about.kpme.role',
    periodKey: 'about.kpme.period',
    noteKey: 'about.kpme.description',
  },
  {
    id: 'education',
    name: 'Lycée Saint Joseph',
    initials: 'SJ',
    avatarBg: 'linear-gradient(to bottom, #FB923C, #EA580C)',
    location: 'Hasparren, France',
    roleKey: 'about.education.role',
    periodKey: 'about.education.period',
    noteKey: 'about.education.description',
  },
  {
    id: 'bac',
    name: 'Lycée André Malraux',
    initials: 'AM',
    avatarBg: 'linear-gradient(to bottom, #F472B6, #DB2777)',
    location: 'Biarritz, France',
    roleKey: 'about.bac.role',
    periodKey: 'about.bac.period',
    noteKey: 'about.bac.description',
  },
]

const selected = ref('antoine')
const current = computed(() => entries.find((e) => e.id === selected.value))

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
.action-btn {
  @apply flex h-9 w-9 items-center justify-center rounded-full bg-ablue text-[14px] text-white shadow-sm transition-colors hover:bg-[#0077ed];
}
.field-row {
  @apply flex items-baseline justify-between gap-8 border-b border-black/5 py-2.5 text-[14px];
}
.field-row dt {
  @apply shrink-0 text-agray;
}
.field-row dd {
  @apply min-w-0 text-right font-medium text-aink;
}
</style>
