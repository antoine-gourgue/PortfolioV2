<template>
  <main ref="container" class="mx-auto w-full max-w-6xl px-4 pt-16 lg:px-8">
    <div ref="winEl" class="win">
      <UiMacWindow
        title="Notes"
        @close="closeToDesktop"
        @minimize="closeToDesktop"
        @zoom="toggleZoom"
      >
        <div class="flex min-h-[64vh]">
          <!-- Colonne 1 : dossiers (desktop) -->
          <aside
            class="hidden w-44 shrink-0 border-r border-black/5 bg-white/40 px-3 py-4 lg:block"
          >
            <p class="px-2 pb-1.5 text-[11px] font-semibold text-black/35">
              {{ $t('notesApp.foldersTitle') }}
            </p>
            <button
              v-for="f in folders"
              :key="f.id"
              class="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-[13px] font-medium transition-colors"
              :class="
                folder === f.id
                  ? 'bg-[#FBD75B]/50 text-aink'
                  : 'text-aink hover:bg-black/5'
              "
              @click="folder = f.id"
            >
              <span class="text-[14px] text-[#E6B800]"
                ><DesktopSfIcon name="folder"
              /></span>
              <span class="flex-1 truncate">{{ $t(f.labelKey) }}</span>
              <span class="text-[12px] text-black/35">{{ f.count }}</span>
            </button>
          </aside>

          <!-- Colonne 2 : liste des notes -->
          <aside
            class="w-full shrink-0 border-r border-black/5 bg-[#FBF9F2]/80 px-3 py-4 lg:w-72"
            :class="selectedId ? 'hidden lg:block' : ''"
          >
            <!-- Sélecteur de dossier (mobile) -->
            <div class="mb-3 flex gap-2 lg:hidden">
              <button
                v-for="f in folders"
                :key="f.id"
                class="rounded-full px-3.5 py-1.5 text-[13px] font-medium"
                :class="
                  folder === f.id
                    ? 'bg-[#FBD75B]/70 text-aink'
                    : 'bg-black/5 text-aink/70'
                "
                @click="folder = f.id"
              >
                {{ $t(f.labelKey) }} ({{ f.count }})
              </button>
            </div>

            <!-- Recherche fonctionnelle -->
            <div
              class="mb-3 flex items-center gap-2 rounded-[10px] bg-black/5 px-3 py-1.5"
            >
              <span class="text-[12px] text-black/35"
                ><DesktopSfIcon name="search"
              /></span>
              <input
                v-model="query"
                type="text"
                :placeholder="$t('notesApp.searchNotes')"
                class="w-full bg-transparent text-[13px] text-aink outline-none placeholder:text-black/35"
              />
            </div>

            <p
              v-if="pinnedList.length"
              class="px-2 pb-1 text-[11px] font-semibold text-black/35"
            >
              📌 {{ $t('notesApp.pinned') }}
            </p>
            <button
              v-for="note in pinnedList"
              :key="note.id"
              class="note-cell"
              :class="
                selectedId === note.id ? 'bg-[#FBD75B]/60' : 'hover:bg-black/5'
              "
              @click="openNote(note.id)"
            >
              <p class="truncate text-[13.5px] font-semibold text-aink">
                {{ note.title }}
              </p>
              <p class="mt-0.5 line-clamp-2 text-[12px] text-black/45">
                <span class="mr-1.5 text-black/60">{{ note.dateLabel }}</span
                >{{ note.preview }}
              </p>
            </button>

            <p
              v-if="pinnedList.length && normalList.length"
              class="px-2 pb-1 pt-3 text-[11px] font-semibold text-black/35"
            >
              {{ $t(activeFolder.labelKey) }}
            </p>
            <div
              v-if="folder === 'mentions' && pending"
              class="px-2 py-8 text-center text-[13px] text-black/40"
            >
              {{ $t('blog.loading') }}
            </div>
            <div
              v-else-if="folder === 'mentions' && error"
              class="px-2 py-8 text-center text-[13px] text-red-500"
            >
              {{ $t('blog.error') }}
            </div>
            <button
              v-for="note in normalList"
              :key="note.id"
              class="note-cell"
              :class="
                selectedId === note.id ? 'bg-[#FBD75B]/60' : 'hover:bg-black/5'
              "
              @click="openNote(note.id)"
            >
              <p class="truncate text-[13.5px] font-semibold text-aink">
                {{ note.title }}
              </p>
              <p class="mt-0.5 line-clamp-2 text-[12px] text-black/45">
                <span v-if="note.dateLabel" class="mr-1.5 text-black/60">{{
                  note.dateLabel
                }}</span
                >{{ note.preview }}
              </p>
            </button>
            <p
              v-if="!pinnedList.length && !normalList.length && !pending"
              class="px-2 py-8 text-center text-[13px] text-black/35"
            >
              {{ $t('macos.spotlightEmpty') }}
            </p>
          </aside>

          <!-- Colonne 3 : contenu de la note -->
          <div
            class="min-w-0 flex-1 bg-white/60"
            :class="selectedId ? '' : 'hidden lg:block'"
          >
            <template v-if="currentNote">
              <div class="px-5 pt-4 lg:hidden">
                <button
                  class="flex items-center gap-0.5 text-[15px] font-medium text-[#E6B800]"
                  @click="selectedId = ''"
                >
                  <span class="text-[19px] leading-none">‹</span> Notes
                </button>
              </div>
              <article class="mx-auto max-w-2xl px-6 py-6 sm:px-8">
                <p
                  v-if="currentNote.dateLabel"
                  class="text-center text-[12px] text-black/35"
                >
                  {{ currentNote.dateLabel }}
                </p>
                <h1
                  class="mt-2 text-[22px] font-bold leading-snug tracking-tight"
                >
                  {{ currentNote.title }}
                </h1>
                <p
                  class="mt-4 whitespace-pre-line text-[15px] leading-relaxed text-aink/80"
                >
                  {{ currentNote.body }}
                </p>
                <a
                  v-if="currentNote.link"
                  :href="currentNote.link"
                  target="_blank"
                  class="mt-6 inline-block rounded-md bg-ablue px-4 py-1.5 text-[13px] font-medium text-white shadow-sm transition-colors hover:bg-[#0077ed]"
                >
                  {{ $t('blog.readMore') }}
                </a>
              </article>
            </template>
            <div
              v-else
              class="flex h-full min-h-[300px] items-center justify-center text-[13px] text-black/30"
            >
              {{ $t('blog.description') }}
            </div>
          </div>
        </div>
      </UiMacWindow>
    </div>
  </main>
</template>

<script setup lang="ts">
const { gsap } = useGsap()
const { t, locale } = useI18n()
const sfx = useSfx()

// ── Notes personnelles (contenu i18n) ──
const PERSONAL = [
  { id: 'colophon', pinned: true, date: '2026-08-18' },
  { id: 'digitaleo', pinned: false, date: '2026-06-12' },
  { id: 'stack', pinned: false, date: '2026-05-02' },
]

interface NoteItem {
  id: string
  title: string
  preview: string
  body: string
  dateLabel: string
  pinned: boolean
  folder: 'notes' | 'mentions'
  link?: string
}

const fmtDate = (iso: string) =>
  new Intl.DateTimeFormat(locale.value, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(iso))

const personalNotes = computed<NoteItem[]>(() =>
  PERSONAL.map((n) => {
    const body = t(`notesApp.items.${n.id}.body`)
    return {
      id: n.id,
      title: t(`notesApp.items.${n.id}.title`),
      body,
      preview: body.split('\n')[0],
      dateLabel: fmtDate(n.date),
      pinned: n.pinned,
      folder: 'notes' as const,
    }
  })
)

// ── Mentions (API existante) ──
interface Article {
  title: string
  snippet: string
  link: string
}
const { data, pending, error } = useFetch<{ results: Article[] }>(
  '/api/mentions',
  { server: true }
)

const mentionNotes = computed<NoteItem[]>(() =>
  (data.value?.results ?? []).map((a, i) => ({
    id: `mention-${i}`,
    title: a.title,
    body: a.snippet,
    preview: a.snippet,
    dateLabel: '',
    pinned: false,
    folder: 'mentions' as const,
    link: a.link,
  }))
)

// ── Dossiers, recherche, sélection ──
const folder = ref<'notes' | 'mentions'>('notes')
const query = ref('')
const selectedId = ref('')

const folders = computed(() => [
  {
    id: 'notes' as const,
    labelKey: 'notesApp.folderNotes',
    count: personalNotes.value.length,
  },
  {
    id: 'mentions' as const,
    labelKey: 'notesApp.folderMentions',
    count: mentionNotes.value.length,
  },
])
const activeFolder = computed(
  () => folders.value.find((f) => f.id === folder.value)!
)

const allNotes = computed(() => [...personalNotes.value, ...mentionNotes.value])

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  return allNotes.value.filter(
    (n) =>
      n.folder === folder.value &&
      (!q ||
        n.title.toLowerCase().includes(q) ||
        n.body.toLowerCase().includes(q))
  )
})

const pinnedList = computed(() => filtered.value.filter((n) => n.pinned))
const normalList = computed(() => filtered.value.filter((n) => !n.pinned))

const currentNote = computed(() =>
  allNotes.value.find((n) => n.id === selectedId.value)
)

const openNote = (id: string) => {
  selectedId.value = id
  sfx.click()
}

// Desktop : présélectionne le colophon ; changement de dossier remet la sélection
watch(
  folder,
  () => {
    if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
      selectedId.value = filtered.value[0]?.id ?? ''
    } else {
      selectedId.value = ''
    }
  },
  { immediate: false }
)

onMounted(() => {
  if (window.innerWidth >= 1024) selectedId.value = 'colophon'
})

// ── Fenêtre ──
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
.note-cell {
  @apply block w-full rounded-lg px-3 py-2.5 text-left transition-colors;
}
</style>
