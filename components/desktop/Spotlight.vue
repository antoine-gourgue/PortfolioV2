<template>
  <Teleport to="body">
    <Transition name="spot">
      <div
        v-if="desktop.state.value.spotlightOpen"
        class="fixed inset-0 z-[100] flex items-start justify-center bg-black/20 px-4 pt-[22vh]"
        @click.self="close"
      >
        <div
          class="spot-panel w-full max-w-xl overflow-hidden rounded-2xl border border-white/40 bg-white/75 shadow-2xl backdrop-blur-2xl"
        >
          <div class="flex items-center gap-3 px-5 py-3.5">
            <i class="fas fa-magnifying-glass text-lg text-black/40"></i>
            <input
              ref="inputEl"
              v-model="query"
              type="text"
              :placeholder="$t('macos.spotlightPlaceholder')"
              class="flex-1 bg-transparent text-xl font-light text-aink outline-none placeholder:text-black/30"
              @keydown.down.prevent="move(1)"
              @keydown.up.prevent="move(-1)"
              @keydown.enter.prevent="run(flat[selected])"
            />
          </div>

          <div
            v-if="flat.length"
            class="max-h-[46vh] overflow-y-auto border-t border-black/5 p-1.5"
          >
            <template v-for="group in groups" :key="group.label">
              <p
                v-if="group.items.length"
                class="px-3 pb-0.5 pt-2 text-[11px] font-semibold text-black/40"
              >
                {{ group.label }}
              </p>
              <button
                v-for="item in group.items"
                :key="item.id"
                class="flex w-full items-center gap-3 rounded-lg px-3 py-1.5 text-left text-sm"
                :class="
                  flat[selected]?.id === item.id
                    ? 'bg-ablue text-white'
                    : 'text-aink hover:bg-black/5'
                "
                @click="run(item)"
                @mousemove="selected = flat.indexOf(item)"
              >
                <span class="block h-6 w-6 shrink-0">
                  <DesktopProjectIcon
                    v-if="item.icon.img"
                    :icon="item.icon.img"
                    :name="item.label"
                    :bg="item.icon.bg"
                    :pad="item.icon.pad"
                  />
                  <DesktopMacAppIcon
                    v-else
                    :name="item.icon.name"
                    :letter="item.icon.letter"
                    :color-top="item.icon.top"
                    :color-bottom="item.icon.bottom"
                  />
                </span>
                <span class="flex-1">{{ item.label }}</span>
                <span
                  class="text-xs"
                  :class="
                    flat[selected]?.id === item.id
                      ? 'text-white/70'
                      : 'text-black/30'
                  "
                  >{{ item.kind }}</span
                >
              </button>
            </template>
          </div>
          <p
            v-else
            class="border-t border-black/5 px-5 py-4 text-sm text-black/40"
          >
            {{ $t('macos.spotlightEmpty') }}
          </p>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const desktop = useDesktop()
const { t } = useI18n()
const localePath = useLocalePath()
const router = useRouter()

const query = ref('')
const selected = ref(0)
const inputEl = ref<HTMLInputElement | null>(null)
const portfolioProjects = useProjects()

interface Icon {
  name?: string
  letter?: string
  top?: string
  bottom?: string
  img?: string
  bg?: string
  pad?: boolean
}

interface Item {
  id: string
  label: string
  icon: Icon
  kind: string
  group: 'apps' | 'projects' | 'actions'
  action: () => void
}

const close = () => (desktop.state.value.spotlightOpen = false)
const go = (path: string) => {
  router.push(localePath(path))
  close()
}
const open = (url: string) => {
  window.open(url, '_blank')
  close()
}

const items = computed<Item[]>(() => [
  { id: 'home', label: t('nav.home'), icon: { name: 'finder' }, kind: 'App', group: 'apps', action: () => go('/') },
  { id: 'projects', label: t('nav.projects'), icon: { name: 'appstore' }, kind: 'App', group: 'apps', action: () => go('/projects') },
  { id: 'about', label: t('nav.about'), icon: { name: 'contacts' }, kind: 'App', group: 'apps', action: () => go('/about') },
  { id: 'blog', label: t('nav.blog'), icon: { name: 'notes' }, kind: 'App', group: 'apps', action: () => go('/blog') },
  { id: 'contact', label: t('nav.contact'), icon: { name: 'mail' }, kind: 'App', group: 'apps', action: () => go('/contact') },
  { id: 'weather', label: t('macos.weatherTitle'), icon: { name: 'weather' }, kind: 'App', group: 'apps', action: () => { desktop.state.value.apps.weather = true; close() } },
  { id: 'calculator', label: t('macos.calcTitle'), icon: { name: 'calculator' }, kind: 'App', group: 'apps', action: () => { desktop.state.value.apps.calculator = true; close() } },
  ...portfolioProjects.map((p) => ({
    id: p.key,
    label: p.name,
    icon: { img: p.icon, bg: p.iconBg, pad: p.iconPad, letter: p.letter, top: p.colorTop, bottom: p.colorBottom } as Icon,
    kind: 'Web',
    group: 'projects' as const,
    action: () => open(p.url),
  })),
  {
    id: 'cv',
    label: t('macos.menuDownloadCv'),
    icon: { name: 'pdf' },
    kind: 'PDF',
    group: 'actions',
    action: () => {
      const a = document.createElement('a')
      a.href = '/assets/antoinegourgue-cv.pdf'
      a.download = ''
      a.click()
      close()
    },
  },
  { id: 'github', label: 'GitHub', icon: { name: 'github' }, kind: 'Web', group: 'actions', action: () => open('https://github.com/antoine-gourgue') },
  { id: 'linkedin', label: 'LinkedIn', icon: { letter: 'in', top: '#2D8FD5', bottom: '#0A66C2' }, kind: 'Web', group: 'actions', action: () => open('https://linkedin.com/in/antoine-gourgue') },
])

const filtered = computed(() =>
  items.value.filter((i) =>
    i.label.toLowerCase().includes(query.value.trim().toLowerCase())
  )
)

const groups = computed(() => [
  { label: t('macos.spotlightApps'), items: filtered.value.filter((i) => i.group === 'apps') },
  { label: t('macos.spotlightProjects'), items: filtered.value.filter((i) => i.group === 'projects') },
  { label: t('macos.spotlightActions'), items: filtered.value.filter((i) => i.group === 'actions') },
])

const flat = computed(() => groups.value.flatMap((g) => g.items))

const move = (dir: number) => {
  const len = flat.value.length
  if (len) selected.value = (selected.value + dir + len) % len
}
const run = (item?: Item) => item?.action()

watch(
  () => desktop.state.value.spotlightOpen,
  (v) => {
    if (v) {
      query.value = ''
      selected.value = 0
      nextTick(() => inputEl.value?.focus())
    }
  }
)
watch(query, () => (selected.value = 0))

const onKey = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && desktop.state.value.spotlightOpen) close()
}
onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))
</script>

<style scoped>
.spot-enter-active,
.spot-leave-active {
  transition: opacity 0.2s ease;
}
.spot-enter-active .spot-panel,
.spot-leave-active .spot-panel {
  transition:
    transform 0.2s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.2s ease;
}
.spot-enter-from,
.spot-leave-to {
  opacity: 0;
}
.spot-enter-from .spot-panel,
.spot-leave-to .spot-panel {
  opacity: 0;
  transform: scale(0.97) translateY(8px);
}
</style>
