export interface MusicTrack {
  id: string
  title: string
  artist: string
  src: string
  cover: string
  /** Extrait 30 s issu du catalogue iTunes (vs morceau complet local) */
  preview?: boolean
}

// Bibliothèque locale : Kevin MacLeod (incompetech.com) — licence CC BY 4.0
export const MUSIC_TRACKS: MusicTrack[] = [
  {
    id: 'backbay-lounge',
    title: 'Backbay Lounge',
    artist: 'Kevin MacLeod',
    src: '/assets/music/backbay-lounge.m4a',
    cover: '/assets/music/backbay-lounge.jpg',
  },
  {
    id: 'acidjazz',
    title: 'AcidJazz',
    artist: 'Kevin MacLeod',
    src: '/assets/music/acidjazz.m4a',
    cover: '/assets/music/acidjazz.jpg',
  },
  {
    id: 'lobby-time',
    title: 'Lobby Time',
    artist: 'Kevin MacLeod',
    src: '/assets/music/lobby-time.m4a',
    cover: '/assets/music/lobby-time.jpg',
  },
  {
    id: 'floating-cities',
    title: 'Floating Cities',
    artist: 'Kevin MacLeod',
    src: '/assets/music/floating-cities.m4a',
    cover: '/assets/music/floating-cities.jpg',
  },
]

interface MusicState {
  queue: MusicTrack[]
  current: number
  playing: boolean
  progress: number
  duration: number
  volume: number
}

// Élément audio unique côté client (non sérialisable, hors useState)
let audio: HTMLAudioElement | null = null
let loadedId: string | null = null

export function useMusic() {
  const state = useState<MusicState>('music', () => ({
    queue: MUSIC_TRACKS,
    current: 0,
    playing: false,
    progress: 0,
    duration: 0,
    volume: 0.8,
  }))

  const ensureAudio = () => {
    if (audio || import.meta.server) return
    audio = new Audio()
    audio.preload = 'none'
    audio.volume = state.value.volume
    audio.addEventListener('timeupdate', () => {
      if (!audio) return
      state.value.progress = audio.currentTime
      state.value.duration = audio.duration || 0
    })
    audio.addEventListener('ended', () => next())
    audio.addEventListener('pause', () => {
      state.value.playing = false
    })
    audio.addEventListener('play', () => {
      state.value.playing = true
    })
  }

  const play = (index?: number, queue?: MusicTrack[]) => {
    ensureAudio()
    if (!audio) return
    if (queue) state.value.queue = queue
    const target = index ?? state.value.current
    const item = state.value.queue[target]
    if (!item) return
    state.value.current = target
    if (loadedId !== item.id) {
      audio.src = item.src
      loadedId = item.id
      state.value.progress = 0
      state.value.duration = 0
    }
    audio.play()
  }

  const pause = () => {
    audio?.pause()
  }

  const toggle = () => {
    if (state.value.playing) {
      pause()
    } else {
      play()
    }
  }

  const stop = () => {
    if (audio) {
      audio.pause()
      audio.currentTime = 0
    }
    state.value.playing = false
    state.value.progress = 0
  }

  const next = () => {
    play((state.value.current + 1) % state.value.queue.length)
  }

  const prev = () => {
    // Comme sur Apple Music : retour au début si le morceau a déjà joué un peu
    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0
      return
    }
    play(
      (state.value.current - 1 + state.value.queue.length) %
        state.value.queue.length
    )
  }

  const seek = (fraction: number) => {
    if (audio && state.value.duration) {
      audio.currentTime = fraction * state.value.duration
    }
  }

  const setVolume = (v: number) => {
    state.value.volume = v
    if (audio) audio.volume = v
  }

  const setMuted = (m: boolean) => {
    ensureAudio()
    if (audio) audio.muted = m
  }

  const track = computed(
    () => state.value.queue[state.value.current] ?? MUSIC_TRACKS[0]
  )

  return {
    state,
    tracks: MUSIC_TRACKS,
    track,
    play,
    pause,
    toggle,
    stop,
    next,
    prev,
    seek,
    setVolume,
    setMuted,
  }
}

interface ItunesResult {
  wrapperType?: string
  trackId?: number
  trackName?: string
  artistId?: number
  artistName?: string
  primaryGenreName?: string
  collectionId?: number
  collectionName?: string
  trackCount?: number
  releaseDate?: string
  previewUrl?: string
  artworkUrl100?: string
}

export interface MusicArtist {
  id: number
  name: string
  genre: string
  /** Visuel dérivé d'une pochette d'album (l'API iTunes n'a pas de photos d'artistes) */
  cover?: string
}

export interface MusicAlbum {
  id: number
  title: string
  artist: string
  cover: string
  year: string
  trackCount: number
}

const art = (r: ItunesResult) =>
  (r.artworkUrl100 ?? '').replace('100x100', '300x300')

const toTrack = (r: ItunesResult): MusicTrack => ({
  id: `itunes-${r.trackId}`,
  title: r.trackName ?? '',
  artist: r.artistName ?? '',
  src: r.previewUrl as string,
  cover: art(r),
  preview: true,
})

const toAlbum = (r: ItunesResult): MusicAlbum => ({
  id: r.collectionId ?? 0,
  title: r.collectionName ?? '',
  artist: r.artistName ?? '',
  cover: art(r),
  year: (r.releaseDate ?? '').slice(0, 4),
  trackCount: r.trackCount ?? 0,
})

async function itunes(path: string): Promise<ItunesResult[]> {
  const res = await fetch(`https://itunes.apple.com${path}`)
  if (!res.ok) return []
  const data = (await res.json()) as { results?: ItunesResult[] }
  return data.results ?? []
}

/** Recherche groupée dans le catalogue iTunes : artistes, albums et titres */
export async function searchItunesAll(term: string): Promise<{
  artists: MusicArtist[]
  albums: MusicAlbum[]
  songs: MusicTrack[]
}> {
  const q = encodeURIComponent(term)
  const [artistResults, albumResults, songResults] = await Promise.all([
    itunes(`/search?term=${q}&entity=musicArtist&limit=4`),
    itunes(`/search?term=${q}&entity=album&limit=6`),
    itunes(`/search?term=${q}&entity=song&limit=8`),
  ])

  // Visuel d'artiste : pochette trouvée dans les albums/titres déjà chargés
  const coverByArtist = new Map<number, string>()
  for (const r of [...albumResults, ...songResults]) {
    if (r.artistId && r.artworkUrl100 && !coverByArtist.has(r.artistId)) {
      coverByArtist.set(r.artistId, art(r))
    }
  }

  const artists: MusicArtist[] = artistResults
    .filter((r) => r.artistId)
    .map((r) => ({
      id: r.artistId as number,
      name: r.artistName ?? '',
      genre: r.primaryGenreName ?? '',
      cover: coverByArtist.get(r.artistId as number),
    }))

  // Pour les artistes encore sans visuel : un seul lookup groupé (1 album chacun)
  const missing = artists.filter((a) => !a.cover)
  if (missing.length) {
    const lookup = await itunes(
      `/lookup?id=${missing.map((a) => a.id).join(',')}&entity=album&limit=1`
    )
    for (const r of lookup) {
      if (r.wrapperType === 'collection' && r.artistId && r.artworkUrl100) {
        const artist = artists.find((a) => a.id === r.artistId && !a.cover)
        if (artist) artist.cover = art(r)
      }
    }
  }

  return {
    artists,
    albums: albumResults.filter((r) => r.collectionId).map(toAlbum),
    songs: songResults.filter((r) => r.previewUrl).map(toTrack),
  }
}

/** Page artiste : albums + titres populaires */
export async function lookupItunesArtist(artistId: number): Promise<{
  albums: MusicAlbum[]
  songs: MusicTrack[]
}> {
  const [albums, songs] = await Promise.all([
    itunes(`/lookup?id=${artistId}&entity=album&limit=12`),
    itunes(`/lookup?id=${artistId}&entity=song&limit=10`),
  ])
  return {
    albums: albums.filter((r) => r.wrapperType === 'collection').map(toAlbum),
    songs: songs
      .filter((r) => r.wrapperType === 'track' && r.previewUrl)
      .map(toTrack),
  }
}

/** Pistes d'un album, dans l'ordre */
export async function lookupItunesAlbum(
  collectionId: number
): Promise<MusicTrack[]> {
  const results = await itunes(
    `/lookup?id=${collectionId}&entity=song&limit=30`
  )
  return results
    .filter((r) => r.wrapperType === 'track' && r.previewUrl)
    .map(toTrack)
}
