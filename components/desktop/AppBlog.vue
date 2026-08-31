<template>
  <Teleport to="body">
    <div
      v-if="desktop.state.value.apps.blog"
      ref="winEl"
      data-window="blog"
      class="fixed inset-0 z-40 overflow-hidden lg:inset-auto lg:left-[20%] lg:top-24 lg:w-[780px] lg:rounded-2xl"
      :style="{ zIndex: z }"
      @pointerdown="bringToFront"
    >
      <UiMacWindow
        :title="$t('nav.blog')"
        mobile-bg="#FBF9F2"
        :active="desktop.state.value.activeApp === 'blog'"
        @close="close"
        @minimize="minimize"
        @zoom="zoom"
      >
        <div class="flex flex-1 min-h-[64vh]">
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

          <aside
            class="w-full shrink-0 border-r border-black/5 bg-[#FBF9F2]/80 px-3 py-4 lg:w-72"
            :class="selectedId ? 'hidden lg:block' : ''"
          >
            <h1
              class="px-1 pb-2 text-[34px] font-bold leading-tight tracking-[-0.9px] lg:hidden"
            >
              {{ $t(activeFolder.labelKey) }}
            </h1>

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

            <div
              class="mb-3 flex items-center gap-2 rounded-[10px] bg-black/[0.06] px-3 py-2 lg:bg-black/5 lg:py-1.5"
            >
              <span class="text-[12px] text-black/35"
                ><DesktopSfIcon name="search"
              /></span>
              <input
                v-model="query"
                type="text"
                :placeholder="$t('notesApp.searchNotes')"
                class="w-full bg-transparent text-[17px] text-aink outline-none placeholder:text-black/35 lg:text-[13px]"
              />
            </div>

            <p
              v-if="pinnedList.length"
              class="px-1 pb-1 text-[13px] font-semibold text-black/45 lg:px-2 lg:text-[11px] lg:text-black/35"
            >
              {{ $t('notesApp.pinned') }}
            </p>
            <button
              v-for="(note, i) in pinnedList"
              :key="note.id"
              class="note-cell"
              :class="[
                selectedId === note.id ? 'bg-[#FBD75B]/60' : 'hover:bg-black/5',
                i > 0 ? 'border-t border-black/[0.07] lg:border-0' : '',
              ]"
              @click="openNote(note.id)"
            >
              <p
                class="truncate text-[17px] font-semibold text-aink lg:text-[13.5px]"
              >
                {{ note.title }}
              </p>
              <p
                class="mt-0.5 line-clamp-2 text-[15px] text-black/45 lg:text-[12px]"
              >
                <span class="mr-1.5 text-black/60">{{ note.dateLabel }}</span
                >{{ note.preview }}
              </p>
            </button>

            <p
              v-if="pinnedList.length && normalList.length"
              class="px-1 pb-1 pt-5 text-[13px] font-semibold text-black/45 lg:px-2 lg:pt-3 lg:text-[11px] lg:text-black/35"
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
              v-for="(note, i) in normalList"
              :key="note.id"
              class="note-cell"
              :class="[
                selectedId === note.id ? 'bg-[#FBD75B]/60' : 'hover:bg-black/5',
                i > 0 ? 'border-t border-black/[0.07] lg:border-0' : '',
              ]"
              @click="openNote(note.id)"
            >
              <p
                class="truncate text-[17px] font-semibold text-aink lg:text-[13.5px]"
              >
                {{ note.title }}
              </p>
              <p
                class="mt-0.5 line-clamp-2 text-[15px] text-black/45 lg:text-[12px]"
              >
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

            <!-- Mobile: Notes toolbar, centered note count -->
            <div
              class="fixed inset-x-0 bottom-0 z-30 border-t border-black/[0.07] bg-[#FBF9F2]/85 pb-[calc(24px+env(safe-area-inset-bottom,0px))] pt-2.5 text-center text-[13px] text-black/45 backdrop-blur-xl lg:hidden"
            >
              {{
                $t('notesApp.noteCount', {
                  n: pinnedList.length + normalList.length,
                })
              }}
            </div>
          </aside>

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
      <!-- Swipe up to return to the home screen -->
      <DesktopIosHomeBar app="blog" @close="close" />
    </div>
  </Teleport>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()
const desktop = useDesktop()
const sfx = useSfx()
const { gsap, Draggable } = useGsap()

const winEl = ref<HTMLElement | null>(null)
const z = ref(40)
const bringToFront = () => {
  z.value = desktop.focusApp('blog')
}
const close = () => {
  sfx.minimize()
  desktop.closeApp('blog')
}
const minimize = () => {
  sfx.minimize()
  desktop.minimizeApp('blog')
}
const zoom = () => {}

// Personal notes (i18n content)
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

// Mentions (existing API)
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

// Desktop: preselect the colophon; folder changes reset the selection
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

let drags: ReturnType<typeof Draggable.create> = []
watch(
  () => desktop.state.value.apps.blog,
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
.note-cell {
  @apply relative block w-full rounded-lg px-1 py-2.5 text-left transition-colors lg:px-3;
}
</style>
