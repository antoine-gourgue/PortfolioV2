<template>
  <Teleport to="body">
    <div
      v-if="desktop.state.value.apps.about"
      ref="winEl"
      data-window="about"
      class="fixed inset-0 z-40 overflow-hidden"
      :class="
        zoomed
          ? 'lg:inset-0 lg:rounded-none'
          : 'lg:inset-auto lg:left-[18%] lg:top-24 lg:w-[760px] lg:rounded-2xl'
      "
      :style="{ zIndex: zoomed ? 600 : z }"
      @pointerdown="bringToFront"
    >
      <UiMacWindow
        :title="$t('nav.about')"
        mobile-bg="#F2F2F7"
        :active="desktop.state.value.activeApp === 'about'"
        :fill="true"
        :maximized="zoomed"
        @close="close"
        @minimize="minimize"
        @zoom="zoom"
      >
        <div
          class="flex flex-1 min-h-[62vh] lg:h-full lg:min-h-0 lg:overflow-hidden"
        >
          <aside
            class="hidden w-60 shrink-0 border-r border-black/5 bg-white/40 px-3 py-4 lg:block lg:h-full lg:overflow-y-auto"
          >
            <label
              class="mb-4 flex items-center gap-2 rounded-lg bg-black/5 px-3 py-1.5 text-[13px] text-black/40"
            >
              <i aria-hidden="true" class="f7-icons" style="font-size: 11px"
                >search</i
              >
              <input
                v-model="query"
                type="search"
                :placeholder="$t('macos.search')"
                class="w-full bg-transparent text-aink outline-none placeholder:text-black/40"
                @pointerdown.stop
              />
            </label>
            <p class="px-2 pb-1.5 text-[11px] font-semibold text-black/35">
              {{ $t('macos.allContacts') }}
            </p>
            <button
              v-for="entry in filtered"
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

          <div
            v-if="!mobileOpen"
            class="min-w-0 flex-1 px-4 pb-6 pt-4 lg:hidden"
          >
            <h1
              class="px-1 text-[34px] font-bold leading-tight tracking-[-0.9px]"
            >
              {{ $t('nav.about') }}
            </h1>

            <!-- Real search: filters the list, not a decorative field -->
            <label
              class="mt-3 flex items-center gap-2 rounded-[10px] bg-black/[0.07] px-3 py-2"
            >
              <span class="text-[15px] text-black/35"
                ><DesktopSfIcon name="search"
              /></span>
              <input
                v-model="query"
                type="search"
                :placeholder="$t('macos.search')"
                class="w-full bg-transparent text-[17px] text-aink outline-none placeholder:text-black/35"
              />
            </label>

            <template v-for="group in mobileGroups" :key="group.label">
              <p
                class="px-1 pb-1 pt-5 text-[13px] uppercase tracking-[0.03em] text-black/45"
              >
                {{ $t(group.label) }}
              </p>
              <div class="overflow-hidden rounded-[10px] bg-white px-4">
                <button
                  v-for="(entry, i) in group.items"
                  :key="entry.id"
                  class="relative flex w-full items-center gap-3 py-2.5 text-left"
                  @click="openMobile(entry.id)"
                >
                  <span
                    v-if="i > 0"
                    class="absolute left-[64px] right-[-16px] top-0 h-px bg-black/[0.09]"
                  ></span>
                  <span class="shrink-0">
                    <span
                      v-if="entry.id === 'antoine'"
                      class="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-gradient-to-b from-[#3b4048] to-[#17181b]"
                    >
                      <AgLogo class="h-5 w-6 text-white" />
                    </span>
                    <img
                      v-else-if="entry.logo"
                      :src="entry.logo"
                      :alt="entry.name"
                      class="h-[52px] w-[52px] rounded-full bg-white object-contain p-1.5 ring-1 ring-black/10"
                    />
                    <span
                      v-else
                      class="flex h-[52px] w-[52px] items-center justify-center rounded-full text-[17px] font-semibold text-white"
                      :style="{ background: entry.avatarBg }"
                      >{{ entry.initials }}</span
                    >
                  </span>
                  <span class="min-w-0 flex-1">
                    <span class="block truncate text-[17px] text-aink">{{
                      entry.name
                    }}</span>
                    <span class="block truncate text-[15px] text-black/45">{{
                      $t(entry.roleKey)
                    }}</span>
                  </span>
                  <span class="text-[17px] text-black/25">›</span>
                </button>
              </div>
            </template>

            <p
              v-if="!mobileGroups.length"
              class="px-1 pt-8 text-center text-[15px] text-black/35"
            >
              {{ $t('macos.searchNoResult') }}
            </p>
          </div>

          <div
            v-if="current"
            :key="current.id"
            class="min-w-0 flex-1 p-5 sm:p-8 lg:h-full lg:overflow-y-auto"
            :class="mobileOpen ? '' : 'hidden lg:block'"
          >
            <button
              class="mb-3 flex items-center gap-0.5 text-[15px] font-medium text-ablue lg:hidden"
              @click="mobileOpen = false"
            >
              <span class="text-[19px] leading-none">‹</span>
              {{ $t('nav.about') }}
            </button>

            <!-- Header: centered on mobile, inline on desktop -->
            <div
              class="flex flex-col items-center gap-3 lg:flex-row lg:items-center lg:gap-5"
            >
              <span
                v-if="current.id === 'antoine'"
                class="flex h-[104px] w-[104px] shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-[#3b4048] to-[#17181b] lg:h-20 lg:w-20 lg:rounded-none lg:bg-none"
              >
                <AgLogo
                  class="h-10 w-12 text-white lg:h-16 lg:w-20 lg:text-aink"
                />
              </span>
              <img
                v-else-if="current.logo"
                :src="current.logo"
                :alt="current.name"
                class="h-[104px] w-[104px] shrink-0 rounded-full bg-white object-contain p-3 shadow-md ring-1 ring-black/10 lg:h-20 lg:w-20 lg:p-2"
              />
              <span
                v-else
                class="flex h-[104px] w-[104px] shrink-0 items-center justify-center rounded-full text-[38px] font-semibold text-white shadow-md lg:h-20 lg:w-20 lg:text-2xl"
                :style="{ background: current.avatarBg }"
              >
                {{ current.initials }}
              </span>
              <div class="min-w-0 text-center lg:text-left">
                <h2
                  class="text-[26px] font-semibold tracking-[-0.4px] lg:text-2xl lg:font-bold lg:tracking-tight"
                >
                  {{ current.name }}
                </h2>
                <p class="mt-0.5 text-[15px] text-agray lg:text-[14px]">
                  {{ $t(current.roleKey) }}
                </p>
              </div>
            </div>

            <template v-if="current.id === 'antoine'">
              <div class="mt-5 grid grid-cols-4 gap-2 lg:hidden">
                <button
                  type="button"
                  class="ios-tile"
                  @click="desktop.openApp('contact')"
                >
                  <i
                    aria-hidden="true"
                    class="f7-icons"
                    style="font-size: inherit"
                    >envelope_fill</i
                  >
                  <span>Message</span>
                </button>
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
              <div class="mt-6 hidden gap-3 lg:flex">
                <button
                  type="button"
                  class="action-btn"
                  :title="$t('macos.sendMessage')"
                  @click="desktop.openApp('contact')"
                >
                  <i
                    aria-hidden="true"
                    class="f7-icons"
                    style="font-size: inherit"
                    >envelope_fill</i
                  >
                </button>
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

            <!-- Fields — mobile: grouped iOS cards -->
            <div class="mt-5 space-y-3 lg:hidden">
              <div class="ios-card">
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

            <!-- Fields — desktop: dt/dd rows -->
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
      <!-- Swipe up to return to the home screen -->
      <DesktopIosHomeBar app="about" @close="close" />
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import AgLogo from '~/components/ui/AGLogo.vue'

const desktop = useDesktop()
const sfx = useSfx()
const { gsap, Draggable } = useGsap()
const { t } = useI18n()

const winEl = ref<HTMLElement | null>(null)
const z = ref(40)
const bringToFront = () => {
  z.value = desktop.focusApp('about')
}
const zoomed = ref(false)
const close = () => {
  sfx.minimize()
  zoomed.value = false
  desktop.closeApp('about')
}
const minimize = () => {
  sfx.minimize()
  desktop.minimizeApp('about')
}
const zoom = () => {
  zoomed.value = !zoomed.value
}

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

// Mobile: iOS list first, sheet on tap
// Search filters on name and role, for the card and organizations alike
const query = ref('')

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return entries
  return entries.filter(
    (e) =>
      e.name.toLowerCase().includes(q) || t(e.roleKey).toLowerCase().includes(q)
  )
})

// Contacts isolates the owner's card under "My Card"
const mobileGroups = computed(() => {
  const me = filtered.value.filter((e) => e.id === 'antoine')
  const others = filtered.value.filter((e) => e.id !== 'antoine')
  return [
    { label: 'macos.contactsMyCard', items: me },
    { label: 'macos.contactsOthers', items: others },
  ].filter((g) => g.items.length)
})

const mobileOpen = ref(false)
const openMobile = (id: string) => {
  selected.value = id
  mobileOpen.value = true
  sfx.click()
}

// Preselection via ?c=<id> (the Calendar's "Open in Contacts" links)
const route = useRoute()
const preselect = route.query.c
if (typeof preselect === 'string' && entries.some((e) => e.id === preselect)) {
  selected.value = preselect
  mobileOpen.value = true
}

let drags: ReturnType<typeof Draggable.create> = []
watch(
  () => desktop.state.value.apps.about,
  (open) => {
    if (!open) {
      drags.forEach((d) => d.kill())
      drags = []
      return
    }
    sfx.pop()
    nextTick(() => {
      if (!winEl.value) return
      bringToFront()
      gsap.from(winEl.value, {
        scale: 0.85,
        autoAlpha: 0,
        y: 20,
        duration: 0.35,
        ease: 'back.out(1.4)',
      })
      if (window.matchMedia('(min-width: 1024px)').matches) {
        drags = Draggable.create(winEl.value, {
          trigger: winEl.value.querySelectorAll('.drag-handle'),
          cursor: 'grab',
          activeCursor: 'grabbing',
        })
      }
    })
  }
)
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

/* iOS: action tiles and grouped cards */
/* Card actions: light-blue circle + label below, like Contacts */
.ios-tile {
  @apply flex flex-col items-center gap-1.5 text-[19px] text-ablue transition-opacity active:opacity-60;
}
.ios-tile > i {
  @apply flex h-[52px] w-[52px] items-center justify-center rounded-full bg-ablue/10;
}
.ios-tile span {
  @apply text-[11px] font-medium text-ablue;
}
.ios-card {
  @apply divide-y divide-black/[0.07] rounded-[10px] bg-white px-4;
}
.ios-field {
  @apply py-2.5;
}
.ios-field span {
  @apply block text-[12px] text-black/45;
}
.ios-field p {
  @apply mt-px text-[17px] text-aink;
}
</style>
