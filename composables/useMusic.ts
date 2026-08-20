export interface MusicTrack {
  id: string
  title: string
  artist: string
  src: string
  cover: string
  /** Extrait 30 s issu du catalogue iTunes (vs morceau complet local) */
  preview?: boolean
  /** Flux radio en direct (durée infinie, pas de seek) */
  live?: boolean
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
  const track = useTrack()
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

    // Media Session : contrôles natifs (écran verrouillé, centre de contrôle,
    // boutons des écouteurs) comme une vraie app musique
    if ('mediaSession' in navigator) {
      const handlers: Array<[MediaSessionAction, MediaSessionActionHandler]> = [
        ['play', () => play()],
        ['pause', () => pause()],
        ['previoustrack', () => prev()],
        ['nexttrack', () => next()],
      ]
      for (const [action, handler] of handlers) {
        try {
          navigator.mediaSession.setActionHandler(action, handler)
        } catch {
          // action non supportée par ce navigateur
        }
      }
    }
  }

  const updateMediaSession = (item: MusicTrack) => {
    if (import.meta.server || !('mediaSession' in navigator)) return
    try {
      setMetadata(item)
    } catch {
      // métadonnées non supportées : la lecture ne doit jamais en dépendre
    }
  }

  const setMetadata = (item: MusicTrack) => {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: item.title,
      artist: item.artist,
      album: item.preview ? 'iTunes — extrait 30 s' : 'Portfolio',
      artwork: [
        {
          src: item.cover.startsWith('http')
            ? item.cover
            : `${location.origin}${item.cover}`,
          sizes: '300x300',
          type: 'image/jpeg',
        },
      ],
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
      track('music_played', {
        title: item.title,
        artist: item.artist,
        live: !!item.live,
      })
      audio.src = item.src
      loadedId = item.id
      state.value.progress = 0
      state.value.duration = 0
    }
    updateMediaSession(item)
    audio.play().catch(() => {
      state.value.playing = false
    })
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
    if (audio && state.value.duration && isFinite(state.value.duration)) {
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

// ── Radios en direct (flux publics Radio France) ──
export const RADIO_STATIONS: MusicTrack[] = [
  {
    id: 'radio-fip',
    title: 'FIP',
    artist: 'Éclectique',
    src: 'https://icecast.radiofrance.fr/fip-midfi.mp3',
    cover: '/assets/radio/fip.jpg',
    live: true,
  },
  {
    id: 'radio-inter',
    title: 'France Inter',
    artist: 'Généraliste',
    src: 'https://icecast.radiofrance.fr/franceinter-midfi.mp3',
    cover: '/assets/radio/franceinter.jpg',
    live: true,
  },
  {
    id: 'radio-info',
    title: 'franceinfo',
    artist: 'Actualité en continu',
    src: 'https://icecast.radiofrance.fr/franceinfo-midfi.mp3',
    cover: '/assets/radio/franceinfo.jpg',
    live: true,
  },
  {
    id: 'radio-musique',
    title: 'France Musique',
    artist: 'Classique & jazz',
    src: 'https://icecast.radiofrance.fr/francemusique-midfi.mp3',
    cover: '/assets/radio/francemusique.jpg',
    live: true,
  },
  {
    id: 'radio-culture',
    title: 'France Culture',
    artist: 'Idées & savoirs',
    src: 'https://icecast.radiofrance.fr/franceculture-midfi.mp3',
    cover: '/assets/radio/franceculture.jpg',
    live: true,
  },
  {
    id: 'radio-mouv',
    title: 'Mouv',
    artist: 'Hip-hop & rap',
    src: 'https://icecast.radiofrance.fr/mouv-midfi.mp3',
    cover: '/assets/radio/mouv.jpg',
    live: true,
  },
  {
    id: 'radio-fipjazz',
    title: 'FIP Jazz',
    artist: 'Webradio jazz',
    src: 'https://icecast.radiofrance.fr/fipjazz-midfi.mp3',
    cover: '/assets/radio/fipjazz.jpg',
    live: true,
  },
  {
    id: 'radio-fiprock',
    title: 'FIP Rock',
    artist: 'Webradio rock',
    src: 'https://icecast.radiofrance.fr/fiprock-midfi.mp3',
    cover: '/assets/radio/fiprock.jpg',
    live: true,
  },
  {
    id: 'radio-fipelectro',
    title: 'FIP Electro',
    artist: 'Webradio electro',
    src: 'https://icecast.radiofrance.fr/fipelectro-midfi.mp3',
    cover: '/assets/radio/fipelectro.jpg',
    live: true,
  },
  {
    id: 'radio-fipgroove',
    title: 'FIP Groove',
    artist: 'Webradio groove',
    src: 'https://icecast.radiofrance.fr/fipgroove-midfi.mp3',
    cover: '/assets/radio/fipgroove.jpg',
    live: true,
  },
  {
    id: 'radio-fipreggae',
    title: 'FIP Reggae',
    artist: 'Webradio reggae',
    src: 'https://icecast.radiofrance.fr/fipreggae-midfi.mp3',
    cover: '/assets/radio/fipreggae.jpg',
    live: true,
  },
  {
    id: 'radio-icipb',
    title: 'ici Pays basque',
    artist: 'La radio locale d’Anglet',
    src: 'https://icecast.radiofrance.fr/fbpaysbasque-midfi.mp3',
    cover: '/assets/radio/icipaysbasque.jpg',
    live: true,
  },
  {
    id: 'radio-rmc',
    title: 'RMC',
    artist: 'Talk & sport',
    src: 'https://audio.bfmtv.com/rmcradio_128.mp3',
    cover: '/assets/radio/rmc.jpg',
    live: true,
  },
  {
    id: 'radio-skyrock',
    title: 'Skyrock',
    artist: 'Premier sur le rap',
    src: 'https://icecast.skyrock.net/s/natio_mp3_128k',
    cover: '/assets/radio/skyrock.jpg',
    live: true,
  },
  {
    id: 'radio-nrj',
    title: 'NRJ',
    artist: 'Hit music only',
    src: 'https://cdn.nrjaudio.fm/audio1/fr/30001/mp3_128.mp3?origine=fluxradios',
    cover: '/assets/radio/nrj.jpg',
    live: true,
  },
]

/** Nouveautés : top albums France via le flux RSS officiel d'Apple */
export async function fetchItunesTop(): Promise<{
  albums: MusicAlbum[]
  artists: MusicArtist[]
}> {
  const data = (await $fetch('/api/music-top')) as {
    feed?: {
      results?: Array<{
        id: string
        name: string
        artistName: string
        artistId?: string
        artworkUrl100: string
        releaseDate?: string
        genres?: Array<{ name: string }>
      }>
    }
  }
  const results = data.feed?.results ?? []
  const albums: MusicAlbum[] = results.map((r) => ({
    id: Number(r.id),
    title: r.name,
    artist: r.artistName,
    cover: r.artworkUrl100.replace('100x100', '300x300'),
    year: (r.releaseDate ?? '').slice(0, 4),
    trackCount: 0,
  }))
  const seen = new Set<number>()
  const artists: MusicArtist[] = []
  for (const r of results) {
    const artistId = Number(r.artistId)
    if (!artistId || seen.has(artistId)) continue
    seen.add(artistId)
    artists.push({
      id: artistId,
      name: r.artistName,
      genre: r.genres?.[0]?.name ?? '',
      cover: r.artworkUrl100.replace('100x100', '300x300'),
    })
  }
  return { albums, artists: artists.slice(0, 8) }
}
