<template>
  <Teleport to="body">
    <div
      v-if="desktop.state.value.apps.music"
      ref="winEl"
      class="fixed inset-0 z-40 overflow-hidden lg:inset-auto lg:left-[10%] lg:top-32 lg:w-[320px] lg:rounded-2xl lg:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.55)] lg:ring-1 lg:ring-white/10"
      :style="{ zIndex: z }"
      @pointerdown="bringToFront"
    >
      <div
        class="relative flex h-full flex-col overflow-hidden bg-[#161618] lg:h-auto"
      >
        <!-- Fond flou depuis la pochette -->
        <div
          class="pointer-events-none absolute inset-0 scale-125 bg-cover bg-center opacity-40 blur-3xl"
          :style="{ backgroundImage: `url(${track.cover})` }"
        ></div>
        <div
          class="pointer-events-none absolute inset-0 bg-black/45 lg:bg-black/35"
        ></div>

        <!-- Barre de titre -->
        <div
          class="music-drag relative flex items-center gap-2 px-4 pb-1 pt-12 lg:px-3 lg:pb-0 lg:pt-2.5"
        >
          <!-- Rouge : ferme la fenêtre ET arrête la musique -->
          <button
            class="group hidden h-3 w-3 items-center justify-center rounded-full border border-[#E0443E] bg-[#FF5F57] lg:flex"
            aria-label="close"
            @click.stop="
              (sfx.minimize(), music.stop(), desktop.closeApp('music'))
            "
            @pointerdown.stop
          >
            <svg
              viewBox="0 0 12 12"
              class="h-full w-full p-[1px] opacity-0 group-hover:opacity-100"
            >
              <path
                d="M3.6 3.6 L8.4 8.4 M8.4 3.6 L3.6 8.4"
                stroke="#820005"
                stroke-width="1.2"
                stroke-linecap="round"
              />
            </svg>
          </button>
          <!-- Jaune : réduit la fenêtre, la musique continue -->
          <button
            class="group hidden h-3 w-3 items-center justify-center rounded-full border border-[#D89E24] bg-[#FEBC2E] lg:flex"
            aria-label="minimize"
            @click.stop="(sfx.minimize(), desktop.closeApp('music'))"
            @pointerdown.stop
          >
            <svg
              viewBox="0 0 12 12"
              class="h-full w-full p-[1px] opacity-0 group-hover:opacity-100"
            >
              <path
                d="M2.6 6 L9.4 6"
                stroke="#985712"
                stroke-width="1.4"
                stroke-linecap="round"
              />
            </svg>
          </button>
          <span
            class="hidden h-3 w-3 rounded-full border border-black/20 bg-[#4a4a4c] lg:block"
          ></span>
          <button
            class="flex items-center gap-0.5 text-[15px] font-medium text-[#FA586A] lg:hidden"
            @click="desktop.closeApp('music')"
          >
            <span class="text-xl leading-none">‹</span>
            {{ $t('macos.close') }}
          </button>
          <span
            class="absolute left-1/2 -translate-x-1/2 text-[13px] font-semibold text-white/60"
          >
            {{ $t('macos.musicTitle') }}
          </span>
        </div>

        <!-- Lecteur -->
        <div
          class="relative flex flex-1 flex-col justify-center px-8 pb-4 pt-4 lg:flex-none lg:justify-start lg:px-5"
        >
          <img
            :src="track.cover"
            :alt="track.title"
            class="mx-auto aspect-square w-full max-w-[300px] rounded-xl shadow-[0_18px_45px_-12px_rgba(0,0,0,0.7)] transition-transform duration-500 lg:max-w-none"
            :class="music.state.value.playing ? 'scale-100' : 'scale-[0.88]'"
          />

          <div class="mt-6 lg:mt-4">
            <p class="text-[19px] font-semibold text-white lg:text-[15px]">
              {{ track.title }}
            </p>
            <p class="text-[15px] text-white/50 lg:text-[12px]">
              {{ track.artist }}
            </p>
          </div>

          <!-- Progression -->
          <div class="mt-4 lg:mt-3">
            <div
              class="group relative h-[5px] cursor-pointer rounded-full bg-white/20"
              @click="onSeek"
            >
              <div
                class="absolute inset-y-0 left-0 rounded-full bg-white/70 group-hover:bg-white"
                :style="{ width: `${progressPct}%` }"
              ></div>
            </div>
            <div
              class="mt-1.5 flex justify-between font-mono text-[11px] text-white/40"
            >
              <span>{{ fmt(music.state.value.progress) }}</span>
              <span>-{{ fmt(remaining) }}</span>
            </div>
          </div>

          <!-- Contrôles -->
          <div
            class="mt-2 flex items-center justify-center gap-10 lg:mt-1 lg:gap-8"
          >
            <button
              class="text-white/80 transition hover:text-white active:scale-90"
              aria-label="previous"
              @click="music.prev()"
            >
              <svg
                viewBox="0 0 24 24"
                class="h-8 w-8 lg:h-6 lg:w-6"
                fill="currentColor"
              >
                <path d="M6 5h2v14H6zM20 5v14L9.5 12z" />
              </svg>
            </button>
            <button
              class="text-white transition active:scale-90"
              aria-label="play-pause"
              @click="(sfx.click(), music.toggle())"
            >
              <svg
                v-if="!music.state.value.playing"
                viewBox="0 0 24 24"
                class="h-12 w-12 lg:h-9 lg:w-9"
                fill="currentColor"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
              <svg
                v-else
                viewBox="0 0 24 24"
                class="h-12 w-12 lg:h-9 lg:w-9"
                fill="currentColor"
              >
                <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />
              </svg>
            </button>
            <button
              class="text-white/80 transition hover:text-white active:scale-90"
              aria-label="next"
              @click="music.next()"
            >
              <svg
                viewBox="0 0 24 24"
                class="h-8 w-8 lg:h-6 lg:w-6"
                fill="currentColor"
              >
                <path d="M16 5h2v14h-2zM4 5v14l10.5-7z" />
              </svg>
            </button>
          </div>

          <!-- Volume -->
          <div class="mt-4 flex items-center gap-3 lg:mt-3">
            <svg
              viewBox="0 0 24 24"
              class="h-4 w-4 text-white/40"
              fill="currentColor"
            >
              <path d="M4 9v6h4l5 4V5L8 9z" />
            </svg>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              :value="music.state.value.volume"
              class="music-vol flex-1"
              @input="
                music.setVolume(
                  parseFloat(($event.target as HTMLInputElement).value)
                )
              "
            />
            <svg
              viewBox="0 0 24 24"
              class="h-4 w-4 text-white/40"
              fill="currentColor"
            >
              <path
                d="M4 9v6h4l5 4V5L8 9zM16 8a5 5 0 0 1 0 8M18.5 5.5a9 9 0 0 1 0 13"
                stroke="currentColor"
                stroke-width="1.6"
                fill="none"
              />
              <path d="M4 9v6h4l5 4V5L8 9z" />
            </svg>
          </div>
        </div>

        <!-- Bibliothèque / Recherche -->
        <div class="relative border-t border-white/10 px-3 py-2 lg:pb-2">
          <div class="mb-1.5 flex gap-1 px-1">
            <button
              class="rounded-full px-3 py-1 text-[11px] font-semibold transition"
              :class="
                tab === 'library'
                  ? 'bg-white/20 text-white'
                  : 'text-white/45 hover:text-white/70'
              "
              @click="tab = 'library'"
            >
              {{ $t('macos.musicLibrary') }}
            </button>
            <button
              class="rounded-full px-3 py-1 text-[11px] font-semibold transition"
              :class="
                tab === 'search'
                  ? 'bg-white/20 text-white'
                  : 'text-white/45 hover:text-white/70'
              "
              @click="tab = 'search'"
            >
              {{ $t('macos.musicSearch') }}
            </button>
          </div>

          <!-- Bibliothèque locale -->
          <template v-if="tab === 'library'">
            <button
              v-for="(item, i) in music.tracks"
              :key="item.id"
              class="flex w-full items-center gap-3 rounded-lg px-2 py-1.5 text-left transition hover:bg-white/10"
              :class="{ 'bg-white/10': track.id === item.id }"
              @click="music.play(i, music.tracks)"
            >
              <img
                :src="item.cover"
                :alt="item.title"
                class="h-9 w-9 rounded-md"
              />
              <span class="flex-1">
                <span class="block text-[13px] font-medium text-white">
                  {{ item.title }}
                </span>
                <span class="block text-[11px] text-white/45">
                  {{ item.artist }}
                </span>
              </span>
              <span
                v-if="track.id === item.id && music.state.value.playing"
                class="eq flex h-3.5 items-end gap-[2px]"
              >
                <i></i><i></i><i></i>
              </span>
            </button>
            <p class="px-2 pt-1.5 text-[10px] text-white/30">
              Kevin MacLeod · incompetech.com — CC BY 4.0
            </p>
          </template>

          <!-- Recherche iTunes : résultats groupés / artiste / album -->
          <template v-else>
            <!-- Barre de recherche ou fil d'Ariane -->
            <div v-if="view.kind === 'results'" class="relative px-1 pb-1.5">
              <svg
                viewBox="0 0 24 24"
                class="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-[60%] text-white/40"
                fill="none"
                stroke="currentColor"
                stroke-width="2.4"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" stroke-linecap="round" />
              </svg>
              <input
                v-model="searchTerm"
                type="search"
                :placeholder="$t('macos.musicSearchPlaceholder')"
                class="w-full rounded-lg bg-white/10 py-1.5 pl-8 pr-3 text-[13px] text-white outline-none placeholder:text-white/35 focus:bg-white/15"
                @input="onSearchInput"
              />
            </div>
            <button
              v-else
              class="mb-1 flex items-center gap-1 px-2 py-0.5 text-[13px] font-medium text-[#FA586A]"
              @click="goBack"
            >
              <span class="text-lg leading-none">‹</span>
              {{ backLabel }}
            </button>

            <div class="music-scroll max-h-48 overflow-y-auto pr-1 lg:max-h-64">
              <p v-if="searching" class="px-3 py-2 text-[12px] text-white/40">
                …
              </p>

              <!-- ── Résultats groupés ── -->
              <template v-else-if="view.kind === 'results'">
                <p
                  v-if="
                    searchTerm &&
                    !artists.length &&
                    !albums.length &&
                    !songs.length
                  "
                  class="px-3 py-2 text-[12px] text-white/40"
                >
                  {{ $t('macos.musicNoResults') }}
                </p>

                <template v-if="artists.length">
                  <p class="music-section">{{ $t('macos.musicArtists') }}</p>
                  <button
                    v-for="artist in artists"
                    :key="`ar-${artist.id}`"
                    class="music-row"
                    @click="openArtist(artist)"
                  >
                    <img
                      v-if="artist.cover"
                      :src="artist.cover"
                      :alt="artist.name"
                      class="h-9 w-9 shrink-0 rounded-full object-cover"
                    />
                    <span
                      v-else
                      class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#FB5C74] to-[#FA233B] text-[13px] font-bold text-white"
                    >
                      {{ artist.name.charAt(0).toUpperCase() }}
                    </span>
                    <span class="min-w-0 flex-1">
                      <span
                        class="block truncate text-[13px] font-medium text-white"
                      >
                        {{ artist.name }}
                      </span>
                      <span class="block truncate text-[11px] text-white/45">
                        {{ artist.genre }}
                      </span>
                    </span>
                    <span class="text-white/30">›</span>
                  </button>
                </template>

                <template v-if="albums.length">
                  <p class="music-section">{{ $t('macos.musicAlbums') }}</p>
                  <button
                    v-for="album in albums"
                    :key="`al-${album.id}`"
                    class="music-row"
                    @click="openAlbum(album)"
                  >
                    <img
                      :src="album.cover"
                      :alt="album.title"
                      class="h-9 w-9 rounded-md"
                    />
                    <span class="min-w-0 flex-1">
                      <span
                        class="block truncate text-[13px] font-medium text-white"
                      >
                        {{ album.title }}
                      </span>
                      <span class="block truncate text-[11px] text-white/45">
                        {{ album.artist
                        }}<template v-if="album.year">
                          · {{ album.year }}</template
                        >
                      </span>
                    </span>
                    <span class="text-white/30">›</span>
                  </button>
                </template>

                <template v-if="songs.length">
                  <p class="music-section">{{ $t('macos.musicSongs') }}</p>
                  <button
                    v-for="(item, i) in songs"
                    :key="item.id"
                    class="music-row"
                    :class="{ 'bg-white/10': track.id === item.id }"
                    @click="music.play(i, songs)"
                  >
                    <img
                      :src="item.cover"
                      :alt="item.title"
                      class="h-9 w-9 rounded-md"
                    />
                    <span class="min-w-0 flex-1">
                      <span
                        class="block truncate text-[13px] font-medium text-white"
                      >
                        {{ item.title }}
                      </span>
                      <span class="block truncate text-[11px] text-white/45">
                        {{ item.artist }}
                      </span>
                    </span>
                    <span
                      v-if="track.id === item.id && music.state.value.playing"
                      class="eq flex h-3.5 items-end gap-[2px]"
                    >
                      <i></i><i></i><i></i>
                    </span>
                  </button>
                </template>
              </template>

              <!-- ── Page artiste ── -->
              <template v-else-if="view.kind === 'artist'">
                <div class="flex items-center gap-3 px-2 pb-2">
                  <img
                    v-if="artistCover"
                    :src="artistCover"
                    :alt="view.name"
                    class="h-12 w-12 shrink-0 rounded-full object-cover shadow"
                  />
                  <span
                    v-else
                    class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#FB5C74] to-[#FA233B] text-[18px] font-bold text-white"
                  >
                    {{ view.name.charAt(0).toUpperCase() }}
                  </span>
                  <span>
                    <span class="block text-[15px] font-bold text-white">
                      {{ view.name }}
                    </span>
                    <span class="block text-[11px] text-white/45">
                      {{ view.genre }}
                    </span>
                  </span>
                </div>

                <template v-if="artistSongs.length">
                  <p class="music-section">{{ $t('macos.musicTopSongs') }}</p>
                  <button
                    v-for="(item, i) in artistSongs"
                    :key="item.id"
                    class="music-row"
                    :class="{ 'bg-white/10': track.id === item.id }"
                    @click="music.play(i, artistSongs)"
                  >
                    <img
                      :src="item.cover"
                      :alt="item.title"
                      class="h-9 w-9 rounded-md"
                    />
                    <span class="min-w-0 flex-1">
                      <span
                        class="block truncate text-[13px] font-medium text-white"
                      >
                        {{ item.title }}
                      </span>
                    </span>
                    <span
                      v-if="track.id === item.id && music.state.value.playing"
                      class="eq flex h-3.5 items-end gap-[2px]"
                    >
                      <i></i><i></i><i></i>
                    </span>
                  </button>
                </template>

                <template v-if="artistAlbums.length">
                  <p class="music-section">{{ $t('macos.musicAlbums') }}</p>
                  <button
                    v-for="album in artistAlbums"
                    :key="`ala-${album.id}`"
                    class="music-row"
                    @click="openAlbum(album)"
                  >
                    <img
                      :src="album.cover"
                      :alt="album.title"
                      class="h-9 w-9 rounded-md"
                    />
                    <span class="min-w-0 flex-1">
                      <span
                        class="block truncate text-[13px] font-medium text-white"
                      >
                        {{ album.title }}
                      </span>
                      <span class="block truncate text-[11px] text-white/45">
                        {{ album.year
                        }}<template v-if="album.trackCount">
                          · {{ album.trackCount }} titres</template
                        >
                      </span>
                    </span>
                    <span class="text-white/30">›</span>
                  </button>
                </template>
              </template>

              <!-- ── Page album ── -->
              <template v-else-if="view.kind === 'album'">
                <div class="flex items-center gap-3 px-2 pb-2">
                  <img
                    :src="view.album.cover"
                    :alt="view.album.title"
                    class="h-14 w-14 rounded-lg shadow"
                  />
                  <span class="min-w-0">
                    <span
                      class="block truncate text-[14px] font-bold text-white"
                    >
                      {{ view.album.title }}
                    </span>
                    <span class="block truncate text-[11px] text-white/45">
                      {{ view.album.artist
                      }}<template v-if="view.album.year">
                        · {{ view.album.year }}</template
                      >
                    </span>
                  </span>
                </div>
                <button
                  v-for="(item, i) in albumTracks"
                  :key="item.id"
                  class="music-row"
                  :class="{ 'bg-white/10': track.id === item.id }"
                  @click="music.play(i, albumTracks)"
                >
                  <span class="w-5 text-center text-[11px] text-white/40">
                    {{ i + 1 }}
                  </span>
                  <span class="min-w-0 flex-1">
                    <span
                      class="block truncate text-[13px] font-medium text-white"
                    >
                      {{ item.title }}
                    </span>
                  </span>
                  <span
                    v-if="track.id === item.id && music.state.value.playing"
                    class="eq flex h-3.5 items-end gap-[2px]"
                  >
                    <i></i><i></i><i></i>
                  </span>
                </button>
              </template>

              <p
                v-if="view.kind !== 'results' || songs.length"
                class="px-2 pt-1.5 text-[10px] text-white/30"
              >
                {{ $t('macos.musicPreviewNote') }}
              </p>
            </div>
          </template>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import {
  searchItunesAll,
  lookupItunesArtist,
  lookupItunesAlbum,
  type MusicTrack,
  type MusicArtist,
  type MusicAlbum,
} from '~/composables/useMusic'

const { t } = useI18n()
const desktop = useDesktop()
const music = useMusic()
const sfx = useSfx()
const { gsap, Draggable } = useGsap()

const winEl = ref<HTMLElement | null>(null)
const z = ref(40)
const bringToFront = () => {
  z.value = ++desktop.state.value.topZ + 40
}

const track = music.track

// ── Recherche iTunes : navigation résultats / artiste / album ──
type SearchView =
  | { kind: 'results' }
  | { kind: 'artist'; id: number; name: string; genre: string; cover?: string }
  | { kind: 'album'; album: MusicAlbum; from: 'results' | 'artist' }

const tab = ref<'library' | 'search'>('library')
const searchTerm = ref('')
const searching = ref(false)
const view = ref<SearchView>({ kind: 'results' })

const artists = ref<MusicArtist[]>([])
const albums = ref<MusicAlbum[]>([])
const songs = ref<MusicTrack[]>([])
const artistAlbums = ref<MusicAlbum[]>([])
const artistSongs = ref<MusicTrack[]>([])
const albumTracks = ref<MusicTrack[]>([])
let lastArtist: MusicArtist | null = null
let searchTimer: ReturnType<typeof setTimeout> | null = null

const artistCover = computed(() => {
  if (view.value.kind !== 'artist') return undefined
  return view.value.cover ?? artistAlbums.value[0]?.cover
})

const backLabel = computed(() => {
  if (view.value.kind === 'album' && view.value.from === 'artist') {
    return lastArtist?.name ?? ''
  }
  return t('macos.musicSearch')
})

const onSearchInput = () => {
  if (searchTimer) clearTimeout(searchTimer)
  const term = searchTerm.value.trim()
  if (term.length < 2) {
    artists.value = []
    albums.value = []
    songs.value = []
    return
  }
  searchTimer = setTimeout(async () => {
    searching.value = true
    try {
      const res = await searchItunesAll(term)
      artists.value = res.artists
      albums.value = res.albums
      songs.value = res.songs
    } catch {
      artists.value = []
      albums.value = []
      songs.value = []
    } finally {
      searching.value = false
    }
  }, 450)
}

const openArtist = async (artist: MusicArtist) => {
  lastArtist = artist
  view.value = { kind: 'artist', ...artist }
  searching.value = true
  try {
    const res = await lookupItunesArtist(artist.id)
    artistAlbums.value = res.albums
    artistSongs.value = res.songs
  } catch {
    artistAlbums.value = []
    artistSongs.value = []
  } finally {
    searching.value = false
  }
}

const openAlbum = async (album: MusicAlbum) => {
  view.value = {
    kind: 'album',
    album,
    from: view.value.kind === 'artist' ? 'artist' : 'results',
  }
  searching.value = true
  try {
    albumTracks.value = await lookupItunesAlbum(album.id)
  } catch {
    albumTracks.value = []
  } finally {
    searching.value = false
  }
}

const goBack = () => {
  if (
    view.value.kind === 'album' &&
    view.value.from === 'artist' &&
    lastArtist
  ) {
    view.value = { kind: 'artist', ...lastArtist }
    return
  }
  view.value = { kind: 'results' }
}

const progressPct = computed(() =>
  music.state.value.duration
    ? (music.state.value.progress / music.state.value.duration) * 100
    : 0
)
const remaining = computed(() =>
  Math.max(0, music.state.value.duration - music.state.value.progress)
)

const fmt = (s: number) => {
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${String(sec).padStart(2, '0')}`
}

const onSeek = (e: MouseEvent) => {
  const el = e.currentTarget as HTMLElement
  const rect = el.getBoundingClientRect()
  music.seek(Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width)))
}

// Le mute général de la barre de menu coupe aussi la musique
watch(
  () => desktop.state.value.sfxMuted,
  (m) => music.setMuted(m),
  { immediate: false }
)

// ── Ouverture : animation + déplacement ──
let drags: ReturnType<typeof Draggable.create> = []
watch(
  () => desktop.state.value.apps.music,
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
          trigger: winEl.value.querySelectorAll('.music-drag'),
          cursor: 'grab',
          activeCursor: 'grabbing',
        })
      }
    })
  }
)
</script>

<style scoped>
/* Ligne de résultat (titre, album, artiste) */
.music-row {
  @apply flex w-full items-center gap-3 rounded-lg px-2 py-1.5 text-left transition hover:bg-white/10;
}

/* En-tête de section de résultats */
.music-section {
  @apply px-2 pb-0.5 pt-2 text-[10px] font-semibold uppercase tracking-wider text-white/35;
}

/* Barre de défilement fine dans la zone de résultats */
.music-scroll {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.25) transparent;
}
.music-scroll::-webkit-scrollbar {
  width: 5px;
}
.music-scroll::-webkit-scrollbar-thumb {
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.25);
}

/* Curseur de volume fin façon macOS */
.music-vol {
  @apply h-[5px] cursor-pointer appearance-none rounded-full bg-white/20;
}
.music-vol::-webkit-slider-thumb {
  @apply h-3.5 w-3.5 appearance-none rounded-full bg-white shadow;
}
.music-vol::-moz-range-thumb {
  @apply h-3.5 w-3.5 rounded-full border-0 bg-white shadow;
}

/* Égaliseur animé sur le morceau en cours */
.eq i {
  @apply w-[3px] rounded-sm bg-[#FA586A];
  animation: eq-bounce 0.9s ease-in-out infinite;
}
.eq i:nth-child(1) {
  height: 60%;
  animation-delay: -0.3s;
}
.eq i:nth-child(2) {
  height: 100%;
}
.eq i:nth-child(3) {
  height: 45%;
  animation-delay: -0.6s;
}
@keyframes eq-bounce {
  0%,
  100% {
    transform: scaleY(0.4);
  }
  50% {
    transform: scaleY(1);
  }
}
</style>
