<template>
  <main ref="container" class="mx-auto w-full max-w-5xl px-4 pt-16 lg:px-8">
    <div ref="winEl" class="win">
      <UiMacWindow
        :title="$t('nav.about')"
        @close="closeToDesktop"
        @minimize="closeToDesktop"
        @zoom="toggleZoom"
      >
        <div class="flex min-h-[62vh]">
          <!-- Liste des contacts (desktop) -->
          <aside
            class="hidden w-60 shrink-0 border-r border-black/5 bg-white/40 px-3 py-4 lg:block"
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

          <!-- Liste iOS (mobile) -->
          <div
            v-if="!mobileOpen"
            class="min-w-0 flex-1 px-4 pb-6 pt-4 lg:hidden"
          >
            <h1 class="px-1 text-[28px] font-bold tracking-tight">
              {{ $t('nav.about') }}
            </h1>
            <div
              class="mt-3 flex items-center gap-2 rounded-[10px] bg-black/5 px-3 py-2 text-[15px] text-black/40"
            >
              <span class="text-[14px]"><DesktopSfIcon name="search" /></span>
              {{ $t('macos.search') }}
            </div>
            <div class="mt-3">
              <button
                v-for="(entry, i) in entries"
                :key="entry.id"
                class="flex w-full items-center gap-3 py-2.5 text-left"
                :class="i > 0 ? 'border-t border-black/5' : ''"
                @click="openMobile(entry.id)"
              >
                <span
                  class="flex h-10 w-10 shrink-0 items-center justify-center"
                >
                  <AgLogo
                    v-if="entry.id === 'antoine'"
                    class="h-6 w-8 text-aink"
                  />
                  <img
                    v-else-if="entry.logo"
                    :src="entry.logo"
                    :alt="entry.name"
                    class="h-10 w-10 rounded-full bg-white object-contain p-1 ring-1 ring-black/10"
                  />
                  <span
                    v-else
                    class="flex h-10 w-10 items-center justify-center rounded-full text-[14px] font-bold text-white"
                    :style="{ background: entry.avatarBg }"
                    >{{ entry.initials }}</span
                  >
                </span>
                <span class="min-w-0 flex-1">
                  <span class="block truncate text-[16px] font-semibold">{{
                    entry.name
                  }}</span>
                  <span class="block truncate text-[12px] text-black/40">{{
                    $t(entry.roleKey)
                  }}</span>
                </span>
                <span class="text-[16px] text-black/25">›</span>
              </button>
            </div>
          </div>

          <!-- Fiche -->
          <div
            v-if="current"
            :key="current.id"
            class="min-w-0 flex-1 p-5 sm:p-8"
            :class="mobileOpen ? '' : 'hidden lg:block'"
          >
            <!-- Retour (mobile) -->
            <button
              class="mb-3 flex items-center gap-0.5 text-[15px] font-medium text-ablue lg:hidden"
              @click="mobileOpen = false"
            >
              <span class="text-[19px] leading-none">‹</span>
              {{ $t('nav.about') }}
            </button>

            <!-- En-tête : centré sur mobile, en ligne sur desktop -->
            <div
              class="flex flex-col items-center gap-3 lg:flex-row lg:items-center lg:gap-5"
            >
              <AgLogo
                v-if="current.id === 'antoine'"
                class="h-14 w-[70px] shrink-0 text-aink lg:h-16 lg:w-20"
              />
              <img
                v-else-if="current.logo"
                :src="current.logo"
                :alt="current.name"
                class="h-[72px] w-[72px] shrink-0 rounded-full bg-white object-contain p-2 shadow-md ring-1 ring-black/10 lg:h-20 lg:w-20"
              />
              <span
                v-else
                class="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-full text-2xl font-bold text-white shadow-md lg:h-20 lg:w-20"
                :style="{ background: current.avatarBg }"
              >
                {{ current.initials }}
              </span>
              <div class="min-w-0 text-center lg:text-left">
                <h1 class="text-[22px] font-bold tracking-tight lg:text-2xl">
                  {{ current.name }}
                </h1>
                <p class="text-[14px] text-agray">{{ $t(current.roleKey) }}</p>
              </div>
            </div>

            <!-- Actions (fiche Antoine) -->
            <template v-if="current.id === 'antoine'">
              <!-- Mobile : tuiles iOS -->
              <div class="mt-5 grid grid-cols-4 gap-2 lg:hidden">
                <NuxtLink :to="localePath('/contact')" class="ios-tile">
                  <i
                    aria-hidden="true"
                    class="f7-icons"
                    style="font-size: inherit"
                    >envelope_fill</i
                  >
                  <span>Message</span>
                </NuxtLink>
                <a
                  href="https://github.com/antoine-gourgue"
                  target="_blank"
                  class="ios-tile"
                >
                  <i
                    aria-hidden="true"
                    class="f7-icons"
                    style="font-size: inherit"
                    >logo_github</i
                  >
                  <span>GitHub</span>
                </a>
                <a
                  href="https://linkedin.com/in/antoine-gourgue"
                  target="_blank"
                  class="ios-tile"
                >
                  <i
                    aria-hidden="true"
                    class="f7-icons"
                    style="font-size: inherit"
                    >logo_linkedin</i
                  >
                  <span>LinkedIn</span>
                </a>
                <a
                  href="/assets/antoinegourgue-cv.pdf"
                  download
                  class="ios-tile"
                >
                  <i
                    aria-hidden="true"
                    class="f7-icons"
                    style="font-size: inherit"
                    >arrow_down_doc_fill</i
                  >
                  <span>CV</span>
                </a>
              </div>
              <!-- Desktop : boutons ronds -->
              <div class="mt-6 hidden gap-3 lg:flex">
                <NuxtLink
                  :to="localePath('/contact')"
                  class="action-btn"
                  :title="$t('macos.sendMessage')"
                >
                  <i
                    aria-hidden="true"
                    class="f7-icons"
                    style="font-size: inherit"
                    >envelope_fill</i
                  >
                </NuxtLink>
                <a
                  href="https://github.com/antoine-gourgue"
                  target="_blank"
                  class="action-btn"
                  title="GitHub"
                >
                  <i
                    aria-hidden="true"
                    class="f7-icons"
                    style="font-size: inherit"
                    >logo_github</i
                  >
                </a>
                <a
                  href="https://linkedin.com/in/antoine-gourgue"
                  target="_blank"
                  class="action-btn"
                  title="LinkedIn"
                >
                  <i
                    aria-hidden="true"
                    class="f7-icons"
                    style="font-size: inherit"
                    >logo_linkedin</i
                  >
                </a>
                <a
                  href="/assets/antoinegourgue-cv.pdf"
                  download
                  class="action-btn"
                  title="CV"
                >
                  <i
                    aria-hidden="true"
                    class="f7-icons"
                    style="font-size: inherit"
                    >arrow_down_doc_fill</i
                  >
                </a>
              </div>
            </template>

            <!-- Champs — mobile : cartes groupées iOS -->
            <div class="mt-5 space-y-3 lg:hidden">
              <div class="ios-card">
                <div class="ios-field">
                  <span>{{ $t('macos.position') }}</span>
                  <p>{{ $t(current.roleKey) }}</p>
                </div>
                <div v-if="current.periodKey" class="ios-field">
                  <span>{{ $t('macos.year') }}</span>
                  <p>{{ $t(current.periodKey) }}</p>
                </div>
                <div class="ios-field">
                  <span>{{ $t('macos.location') }}</span>
                  <p>{{ current.location }}</p>
                </div>
              </div>
              <div class="ios-card">
                <div class="ios-field">
                  <span>{{ $t('macos.note') }}</span>
                  <p class="leading-relaxed">{{ $t(current.noteKey) }}</p>
                </div>
              </div>
            </div>

            <!-- Champs — desktop : lignes dt/dd -->
            <dl class="mt-7 hidden max-w-2xl lg:block">
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
              <div class="ios-card mt-3 lg:hidden">
                <div class="ios-field">
                  <span
                    >{{ $t('about.qualities.line1') }}
                    {{ $t('about.qualities.line2') }}
                    {{ $t('about.qualities.line3') }}</span
                  >
                  <p class="leading-relaxed">
                    {{ $t('about.qualitiesDescription') }}
                  </p>
                </div>
              </div>
              <div class="hidden lg:block">
                <h2 class="mt-8 text-lg font-bold">
                  {{ $t('about.qualities.line1') }}
                  {{ $t('about.qualities.line2') }}
                  {{ $t('about.qualities.line3') }}
                </h2>
                <p
                  class="mt-2 max-w-2xl text-[14px] leading-relaxed text-agray"
                >
                  {{ $t('about.qualitiesDescription') }}
                </p>
              </div>
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
const sfx = useSfx()

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

// Mobile : liste iOS d'abord, fiche au tap
const mobileOpen = ref(false)
const openMobile = (id: string) => {
  selected.value = id
  mobileOpen.value = true
  sfx.click()
}

// Pré-sélection via ?c=<id> (liens "Ouvrir dans Contacts" du Calendrier)
const route = useRoute()
const preselect = route.query.c
if (typeof preselect === 'string' && entries.some((e) => e.id === preselect)) {
  selected.value = preselect
  mobileOpen.value = true
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

/* iOS : tuiles d'action et cartes groupées */
.ios-tile {
  @apply flex flex-col items-center gap-1 rounded-xl bg-black/[0.05] py-2.5 text-[16px] text-ablue transition-colors active:bg-black/10;
}
.ios-tile span {
  @apply text-[10px] font-medium text-aink/70;
}
.ios-card {
  @apply divide-y divide-black/5 rounded-xl bg-black/[0.04] px-4;
}
.ios-field {
  @apply py-2.5;
}
.ios-field span {
  @apply block text-[12px] text-black/45;
}
.ios-field p {
  @apply mt-0.5 text-[15px] text-aink;
}
</style>
