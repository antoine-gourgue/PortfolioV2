<template>
  <Teleport to="body">
    <div
      v-if="desktop.state.value.apps.music"
      ref="winEl"
      data-window="music"
      class="fixed inset-0 z-40 overflow-hidden lg:inset-auto lg:left-[16%] lg:top-24 lg:w-[780px] lg:rounded-xl lg:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.45)] lg:ring-1 lg:ring-black/10"
      :style="{ zIndex: z }"
      @pointerdown="bringToFront"
    >
      <!-- ══════════ MOBILE : lecteur plein écran iOS ══════════ -->
      <div
        class="relative flex h-full flex-col overflow-hidden bg-[#161618] lg:hidden"
      >
        <div
          class="pointer-events-none absolute inset-0 scale-125 bg-cover bg-center opacity-40 blur-3xl"
          :style="{ backgroundImage: `url(${track.cover})` }"
        ></div>
        <div class="pointer-events-none absolute inset-0 bg-black/45"></div>

        <div class="relative flex min-h-[20px] items-center px-4 pb-1 pt-12">
          <span
            class="absolute left-1/2 -translate-x-1/2 text-[13px] font-semibold text-white/60"
          >
            {{ $t('macos.musicTitle') }}
          </span>
        </div>

        <div
          class="relative flex flex-1 flex-col justify-center px-8 pb-4 pt-4"
        >
          <img
            :src="track.cover"
            :alt="track.title"
            class="mx-auto aspect-square w-full max-w-[300px] rounded-xl shadow-[0_18px_45px_-12px_rgba(0,0,0,0.7)] transition-transform duration-500"
            :class="music.state.value.playing ? 'scale-100' : 'scale-[0.88]'"
          />
          <div class="mt-6">
            <p class="text-[19px] font-semibold text-white">
              {{ track.title }}
            </p>
            <p class="text-[15px] text-white/50">{{ track.artist }}</p>
          </div>
          <div v-if="!track.live" class="mt-4">
            <div
              class="group relative h-[5px] cursor-pointer rounded-full bg-white/20"
              @click="onSeek"
            >
              <div
                class="absolute inset-y-0 left-0 rounded-full bg-white/70"
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
          <p
            v-if="track.live"
            class="mt-4 flex items-center justify-center gap-1.5 text-[11px] font-bold text-[#FA586A]"
          >
            <span class="live-dot h-1.5 w-1.5 rounded-full bg-[#FA586A]"></span>
            {{ $t('macos.musicLive') }}
          </p>
          <div class="mt-2 flex items-center justify-center gap-10">
            <button
              class="text-white/80 active:scale-90"
              aria-label="previous"
              @pointerdown.stop
              @click="music.prev()"
            >
              <svg viewBox="0 0 24 24" class="h-8 w-8" fill="currentColor">
                <path d="M6 5h2v14H6zM20 5v14L9.5 12z" />
              </svg>
            </button>
            <button
              class="text-white active:scale-90"
              aria-label="play-pause"
              @pointerdown.stop
              @click="(sfx.click(), music.toggle())"
            >
              <svg
                v-if="!music.state.value.playing"
                viewBox="0 0 24 24"
                class="h-12 w-12"
                fill="currentColor"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
              <svg
                v-else
                viewBox="0 0 24 24"
                class="h-12 w-12"
                fill="currentColor"
              >
                <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />
              </svg>
            </button>
            <button
              class="text-white/80 active:scale-90"
              aria-label="next"
              @pointerdown.stop
              @click="music.next()"
            >
              <svg viewBox="0 0 24 24" class="h-8 w-8" fill="currentColor">
                <path d="M16 5h2v14h-2zM4 5v14l10.5-7z" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Bibliothèque / Recherche mobile -->
        <div class="relative border-t border-white/10 px-3 py-2">
          <div class="mb-1.5 flex gap-1 px-1">
            <button
              class="rounded-full px-3 py-1 text-[11px] font-semibold transition"
              :class="
                tab === 'library' ? 'bg-white/20 text-white' : 'text-white/45'
              "
              @click="tab = 'library'"
            >
              {{ $t('macos.musicLibrary') }}
            </button>
            <button
              class="rounded-full px-3 py-1 text-[11px] font-semibold transition"
              :class="
                tab === 'search' ? 'bg-white/20 text-white' : 'text-white/45'
              "
              @click="tab = 'search'"
            >
              {{ $t('macos.musicSearch') }}
            </button>
            <button
              class="rounded-full px-3 py-1 text-[11px] font-semibold transition"
              :class="
                tab === 'radio' ? 'bg-white/20 text-white' : 'text-white/45'
              "
              @click="tab = 'radio'"
            >
              {{ $t('macos.musicRadio') }}
            </button>
          </div>

          <template v-if="tab === 'library'">
            <button
              v-for="(item, i) in music.tracks"
              :key="item.id"
              class="flex w-full items-center gap-3 rounded-lg px-2 py-1.5 text-left transition"
              :class="{ 'bg-white/10': track.id === item.id }"
              @click="music.play(i, music.tracks)"
            >
              <img
                :src="item.cover"
                :alt="item.title"
                class="h-9 w-9 rounded-md"
              />
              <span class="flex-1">
                <span class="block text-[13px] font-medium text-white">{{
                  item.title
                }}</span>
                <span class="block text-[11px] text-white/45">{{
                  item.artist
                }}</span>
              </span>
              <span
                v-if="track.id === item.id && music.state.value.playing"
                class="eq eq--light flex h-3.5 items-end gap-[2px]"
              >
                <i></i><i></i><i></i>
              </span>
            </button>
          </template>
          <template v-else-if="tab === 'radio'">
            <div class="music-scroll max-h-48 overflow-y-auto pr-1">
              <button
                v-for="(station, i) in RADIO_STATIONS"
                :key="station.id"
                class="flex w-full items-center gap-3 rounded-lg px-2 py-1.5 text-left transition"
                :class="{ 'bg-white/10': track.id === station.id }"
                @click="music.play(i, RADIO_STATIONS)"
              >
                <img
                  :src="station.cover"
                  :alt="station.title"
                  class="h-9 w-9 rounded-md"
                />
                <span class="flex-1">
                  <span class="block text-[13px] font-medium text-white">{{
                    station.title
                  }}</span>
                  <span class="block text-[11px] text-white/45">{{
                    station.artist
                  }}</span>
                </span>
                <span
                  v-if="track.id === station.id && music.state.value.playing"
                  class="text-[9px] font-bold text-[#FA586A]"
                  >● {{ $t('macos.musicLive') }}</span
                >
              </button>
            </div>
          </template>
          <template v-else>
            <div class="px-1 pb-1.5">
              <input
                v-model="searchTerm"
                type="search"
                :placeholder="$t('macos.musicSearchPlaceholder')"
                class="w-full rounded-lg bg-white/10 px-3.5 py-1.5 text-[13px] text-white outline-none placeholder:text-white/35"
                @input="onSearchInput"
              />
            </div>
            <div class="music-scroll max-h-44 overflow-y-auto pr-1">
              <button
                v-for="(item, i) in songs"
                :key="item.id"
                class="flex w-full items-center gap-3 rounded-lg px-2 py-1.5 text-left"
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
                    >{{ item.title }}</span
                  >
                  <span class="block truncate text-[11px] text-white/45">{{
                    item.artist
                  }}</span>
                </span>
              </button>
            </div>
          </template>
        </div>
      </div>

      <!-- ══════════ DESKTOP : app Musique macOS ══════════ -->
      <div class="hidden h-[500px] flex-col bg-white lg:flex">
        <!-- Barre lecteur -->
        <div
          class="music-drag flex h-[56px] shrink-0 items-center gap-2 border-b border-black/10 bg-[#F9F9FB] px-3"
        >
          <!-- Pastilles -->
          <div class="flex items-center gap-2 pr-2">
            <button
              class="group flex h-3 w-3 items-center justify-center rounded-full border border-[#E0443E] bg-[#FF5F57]"
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
            <button
              class="group flex h-3 w-3 items-center justify-center rounded-full border border-[#D89E24] bg-[#FEBC2E]"
              aria-label="minimize"
              @click.stop="(sfx.minimize(), desktop.minimizeApp('music'))"
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
              class="h-3 w-3 rounded-full border border-black/10 bg-[#DDDDDF]"
            ></span>
          </div>

          <!-- Contrôles -->
          <div class="flex items-center gap-4 px-1 text-[#6E6E73]">
            <button
              class="transition hover:text-aink active:scale-90"
              aria-label="previous"
              @click="music.prev()"
            >
              <svg viewBox="0 0 24 24" class="h-5 w-5" fill="currentColor">
                <path d="M6 6h2v12H6zM19 6v12L9.5 12z" />
              </svg>
            </button>
            <button
              class="text-aink transition active:scale-90"
              aria-label="play-pause"
              @click="(sfx.click(), music.toggle())"
            >
              <svg
                v-if="!music.state.value.playing"
                viewBox="0 0 24 24"
                class="h-7 w-7"
                fill="currentColor"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
              <svg
                v-else
                viewBox="0 0 24 24"
                class="h-7 w-7"
                fill="currentColor"
              >
                <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />
              </svg>
            </button>
            <button
              class="transition hover:text-aink active:scale-90"
              aria-label="next"
              @click="music.next()"
            >
              <svg viewBox="0 0 24 24" class="h-5 w-5" fill="currentColor">
                <path d="M16 6h2v12h-2zM5 6v12l9.5-6z" />
              </svg>
            </button>
          </div>

          <!-- Écran LCD -->
          <div
            class="relative mx-2 flex h-[42px] min-w-0 flex-1 items-stretch overflow-hidden rounded-md border border-black/10 bg-[#FAF9F7]"
          >
            <template v-if="lcdActive">
              <img
                :src="track.cover"
                :alt="track.title"
                class="h-full w-[41px] shrink-0 object-cover"
              />
              <div class="min-w-0 flex-1 self-center px-2 text-center">
                <p
                  class="truncate text-[12px] font-semibold leading-tight text-aink"
                >
                  {{ track.title }}
                </p>
                <p class="truncate text-[11px] leading-tight text-black/50">
                  {{ track.artist }}
                </p>
              </div>
              <span
                v-if="track.live"
                class="flex items-center gap-1 self-center whitespace-nowrap pr-2 text-[9px] font-bold text-[#FA233B]"
              >
                <span
                  class="live-dot h-1.5 w-1.5 rounded-full bg-[#FA233B]"
                ></span>
                {{ $t('macos.musicLive') }}
              </span>
              <span
                v-else
                class="self-center pr-2 font-mono text-[10px] tabular-nums text-black/40"
                >-{{ fmt(remaining) }}</span
              >
              <div
                v-if="!track.live"
                class="absolute inset-x-0 bottom-0 h-[3px] cursor-pointer bg-black/5"
                @pointerdown.stop
                @click.stop="onSeek"
              >
                <div
                  class="h-full bg-[#FA233B]"
                  :style="{ width: `${progressPct}%` }"
                ></div>
              </div>
            </template>
            <div
              v-else
              class="flex flex-1 items-center justify-center text-black/20"
            >
              <svg viewBox="0 0 24 24" class="h-5 w-5" fill="currentColor">
                <path
                  d="M17 4 8.5 5.8q-.9.2-.9 1.1v8.2a2.6 2.6 0 1 0 1.2 2.2V9.6l7-1.5v4.6a2.6 2.6 0 1 0 1.2 2.2V5q0-1.2-1-1z"
                />
              </svg>
            </div>
          </div>

          <!-- Volume -->
          <div class="flex items-center gap-1.5 pl-1 text-black/35">
            <svg viewBox="0 0 24 24" class="h-3.5 w-3.5" fill="currentColor">
              <path d="M4 9v6h4l5 4V5L8 9z" />
            </svg>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              :value="music.state.value.volume"
              class="music-vol-light w-[86px]"
              @pointerdown.stop
              @input="
                music.setVolume(
                  parseFloat(($event.target as HTMLInputElement).value)
                )
              "
            />
          </div>
        </div>

        <!-- Corps : sidebar + contenu -->
        <div class="flex min-h-0 flex-1">
          <aside
            class="flex w-[190px] shrink-0 flex-col border-r border-black/10 bg-[#F6F6F9]/90 p-3"
          >
            <div class="relative">
              <svg
                viewBox="0 0 24 24"
                class="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-black/30"
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
                class="w-full rounded-md border border-black/10 bg-white py-1 pl-7 pr-2 text-[12px] text-aink outline-none placeholder:text-black/30 focus:border-[#FA233B]/40"
                @input="onSearchInput"
              />
            </div>

            <p
              class="mt-4 px-1 text-[10.5px] font-semibold uppercase tracking-wider text-black/35"
            >
              Apple Music
            </p>
            <button
              class="mt-1 flex items-center gap-2 rounded-md px-2 py-1 text-left text-[13px] transition"
              :class="
                !desktopSearch && section === 'explore'
                  ? 'bg-[#FA233B]/10 font-medium text-[#FA233B]'
                  : 'text-aink hover:bg-black/5'
              "
              @click="openSection('explore')"
            >
              <svg viewBox="0 0 24 24" class="h-4 w-4" fill="currentColor">
                <path
                  d="M12 2 9.2 8.6 2 9.3l5.5 4.8L5.8 21 12 17.3 18.2 21l-1.7-6.9L22 9.3l-7.2-.7z"
                />
              </svg>
              {{ $t('macos.musicExplore') }}
            </button>
            <button
              class="flex items-center gap-2 rounded-md px-2 py-1 text-left text-[13px] transition"
              :class="
                !desktopSearch && section === 'radio'
                  ? 'bg-[#FA233B]/10 font-medium text-[#FA233B]'
                  : 'text-aink hover:bg-black/5'
              "
              @click="openSection('radio')"
            >
              <svg
                viewBox="0 0 24 24"
                class="h-4 w-4"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="2.2"
                  fill="currentColor"
                  stroke="none"
                />
                <path
                  d="M8.5 8.5a5 5 0 0 0 0 7M15.5 8.5a5 5 0 0 1 0 7"
                  stroke-linecap="round"
                />
                <path
                  d="M5.6 5.6a9 9 0 0 0 0 12.8M18.4 5.6a9 9 0 0 1 0 12.8"
                  stroke-linecap="round"
                />
              </svg>
              {{ $t('macos.musicRadio') }}
            </button>

            <p
              class="mt-3 px-1 text-[10.5px] font-semibold uppercase tracking-wider text-black/35"
            >
              {{ $t('macos.musicLibrary') }}
            </p>
            <button
              class="mt-1 flex items-center gap-2 rounded-md px-2 py-1 text-left text-[13px] transition"
              :class="
                !desktopSearch && section === 'songs'
                  ? 'bg-[#FA233B]/10 font-medium text-[#FA233B]'
                  : 'text-aink hover:bg-black/5'
              "
              @click="openSection('songs')"
            >
              <svg viewBox="0 0 24 24" class="h-4 w-4" fill="currentColor">
                <path
                  d="M17 4 8.5 5.8q-.9.2-.9 1.1v8.2a2.6 2.6 0 1 0 1.2 2.2V9.6l7-1.5v4.6a2.6 2.6 0 1 0 1.2 2.2V5q0-1.2-1-1z"
                />
              </svg>
              {{ $t('macos.musicSongs') }}
            </button>
          </aside>

          <main
            class="music-scroll-light min-w-0 flex-1 overflow-y-auto bg-white"
          >
            <!-- ── Explorer : nouveautés Apple Music ── -->
            <template v-if="!desktopSearch && section === 'explore'">
              <h1 class="px-5 pb-1 pt-4 text-[20px] font-bold text-aink">
                {{ $t('macos.musicNew') }}
              </h1>
              <!-- Skeleton pendant le chargement du top Apple Music -->
              <template v-if="loadingTop">
                <div class="px-5 pt-3">
                  <span class="skel block h-3.5 w-20"></span>
                </div>
                <div class="flex gap-4 overflow-hidden px-5 pb-2 pt-3">
                  <div
                    v-for="i in 6"
                    :key="`ska-${i}`"
                    class="flex w-[86px] shrink-0 flex-col items-center gap-2"
                  >
                    <span class="skel h-[76px] w-[76px] !rounded-full"></span>
                    <span class="skel h-2.5 w-14"></span>
                  </div>
                </div>
                <div class="px-5 pt-3">
                  <span class="skel block h-3.5 w-24"></span>
                </div>
                <div class="grid grid-cols-4 gap-4 px-5 pb-5 pt-3">
                  <div v-for="i in 8" :key="`skb-${i}`">
                    <span
                      class="skel block aspect-square w-full !rounded-lg"
                    ></span>
                    <span class="skel mt-1.5 block h-2.5 w-3/4"></span>
                    <span class="skel mt-1 block h-2.5 w-1/2"></span>
                  </div>
                </div>
              </template>
              <template v-else>
                <template v-if="topArtists.length">
                  <p class="msection">{{ $t('macos.musicArtists') }}</p>
                  <div
                    class="no-scrollbar flex gap-4 overflow-x-auto px-5 pb-2"
                  >
                    <button
                      v-for="artist in topArtists"
                      :key="`ta-${artist.id}`"
                      class="flex w-[86px] shrink-0 flex-col items-center gap-1.5 text-center"
                      @click="openArtist(artist)"
                    >
                      <img
                        :src="artist.cover"
                        :alt="artist.name"
                        class="h-[76px] w-[76px] rounded-full object-cover shadow"
                      />
                      <span
                        class="w-full truncate text-[11.5px] font-medium text-aink"
                        >{{ artist.name }}</span
                      >
                    </button>
                  </div>
                </template>
                <p class="msection">{{ $t('macos.musicTopAlbums') }}</p>
                <div class="grid grid-cols-4 gap-4 px-5 pb-5">
                  <button
                    v-for="album in topAlbums"
                    :key="`tb-${album.id}`"
                    class="text-left"
                    @click="openAlbum(album)"
                  >
                    <img
                      :src="album.cover"
                      :alt="album.title"
                      class="aspect-square w-full rounded-lg object-cover shadow"
                    />
                    <span
                      class="mt-1 block truncate text-[11.5px] font-medium text-aink"
                      >{{ album.title }}</span
                    >
                    <span class="block truncate text-[10.5px] text-black/45">{{
                      album.artist
                    }}</span>
                  </button>
                </div>
              </template>
            </template>

            <!-- ── Radio : stations en direct ── -->
            <template v-else-if="!desktopSearch && section === 'radio'">
              <h1 class="px-5 pb-1 pt-4 text-[20px] font-bold text-aink">
                {{ $t('macos.musicRadio') }}
              </h1>
              <div class="grid grid-cols-4 gap-4 px-5 pb-5 pt-2">
                <button
                  v-for="(station, i) in RADIO_STATIONS"
                  :key="station.id"
                  class="group text-left"
                  @click="music.play(i, RADIO_STATIONS)"
                >
                  <span
                    class="relative block overflow-hidden rounded-lg shadow"
                  >
                    <img
                      :src="station.cover"
                      :alt="station.title"
                      class="aspect-square w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                    />
                    <span
                      v-if="
                        track.id === station.id && music.state.value.playing
                      "
                      class="absolute left-1.5 top-1.5 flex items-center gap-1 rounded-full bg-[#FA233B] px-1.5 py-0.5 text-[8px] font-bold text-white"
                    >
                      <span
                        class="live-dot h-1 w-1 rounded-full bg-white"
                      ></span>
                      {{ $t('macos.musicLive') }}
                    </span>
                    <span
                      v-else
                      class="absolute inset-0 flex items-center justify-center bg-black/25 opacity-0 transition group-hover:opacity-100"
                    >
                      <span
                        class="flex h-9 w-9 items-center justify-center rounded-full bg-white/85 text-aink shadow backdrop-blur"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          class="ml-0.5 h-4 w-4"
                          fill="currentColor"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </span>
                    </span>
                  </span>
                  <span
                    class="mt-1 block truncate text-[11.5px] font-medium text-aink"
                    >{{ station.title }}</span
                  >
                  <span class="block truncate text-[10.5px] text-black/45">{{
                    station.artist
                  }}</span>
                </button>
              </div>
            </template>

            <!-- ── Bibliothèque : Titres ── -->
            <template v-else-if="!desktopSearch">
              <h1 class="px-5 pb-1 pt-4 text-[20px] font-bold text-aink">
                {{ $t('macos.musicSongs') }}
              </h1>
              <div class="px-3 pb-4">
                <button
                  v-for="(item, i) in music.tracks"
                  :key="item.id"
                  class="grid w-full grid-cols-[28px_40px_1fr_auto] items-center gap-3 rounded-lg px-2 py-1.5 text-left transition hover:bg-black/[0.04]"
                  :class="{ 'bg-black/[0.04]': track.id === item.id }"
                  @click="music.play(i, music.tracks)"
                >
                  <span
                    class="text-center text-[12px] tabular-nums text-black/40"
                  >
                    <span
                      v-if="track.id === item.id && music.state.value.playing"
                      class="eq eq--red inline-flex h-3 items-end gap-[2px]"
                    >
                      <i></i><i></i><i></i>
                    </span>
                    <template v-else>{{ i + 1 }}</template>
                  </span>
                  <img
                    :src="item.cover"
                    :alt="item.title"
                    class="h-10 w-10 rounded-[5px] shadow-sm"
                  />
                  <span class="min-w-0">
                    <span
                      class="block truncate text-[13px] font-medium text-aink"
                      >{{ item.title }}</span
                    >
                    <span class="block truncate text-[12px] text-black/45">{{
                      item.artist
                    }}</span>
                  </span>
                  <span
                    class="pr-2 font-mono text-[11px] tabular-nums text-black/35"
                  >
                    {{
                      track.id === item.id && music.state.value.duration
                        ? fmt(music.state.value.duration)
                        : ''
                    }}
                  </span>
                </button>
              </div>
            </template>

            <!-- ── Recherche Apple Music ── -->
            <template v-else>
              <div
                v-if="view.kind !== 'results'"
                class="sticky top-0 z-10 bg-white/90 px-4 pt-3 backdrop-blur"
              >
                <button
                  class="flex items-center gap-0.5 text-[13px] font-medium text-[#FA233B]"
                  @click="goBack"
                >
                  <span class="text-lg leading-none">‹</span>
                  {{ backLabel }}
                </button>
              </div>

              <!-- Skeleton pendant la recherche / le chargement d'une fiche -->
              <div v-if="searching" class="px-5 py-4">
                <div
                  v-for="i in 6"
                  :key="`sks-${i}`"
                  class="flex items-center gap-3 py-1.5"
                >
                  <span class="skel h-10 w-10 shrink-0 !rounded-md"></span>
                  <span class="min-w-0 flex-1">
                    <span class="skel block h-3 w-1/2"></span>
                    <span class="skel mt-1.5 block h-2.5 w-1/3"></span>
                  </span>
                </div>
              </div>

              <!-- Résultats groupés -->
              <template v-else-if="view.kind === 'results'">
                <p
                  v-if="!artists.length && !albums.length && !songs.length"
                  class="px-5 py-4 text-[13px] text-black/40"
                >
                  {{
                    searchTerm.trim().length >= 2
                      ? $t('macos.musicNoResults')
                      : ''
                  }}
                </p>

                <template v-if="artists.length">
                  <p class="msection">{{ $t('macos.musicArtists') }}</p>
                  <div
                    class="no-scrollbar flex gap-4 overflow-x-auto px-5 pb-2"
                  >
                    <button
                      v-for="artist in artists"
                      :key="`ar-${artist.id}`"
                      class="flex w-[86px] shrink-0 flex-col items-center gap-1.5 text-center"
                      @click="openArtist(artist)"
                    >
                      <img
                        v-if="artist.cover"
                        :src="artist.cover"
                        :alt="artist.name"
                        class="h-[76px] w-[76px] rounded-full object-cover shadow"
                      />
                      <span
                        v-else
                        class="flex h-[76px] w-[76px] items-center justify-center rounded-full bg-gradient-to-br from-[#FB5C74] to-[#FA233B] text-[24px] font-bold text-white"
                      >
                        {{ artist.name.charAt(0).toUpperCase() }}
                      </span>
                      <span
                        class="w-full truncate text-[11.5px] font-medium text-aink"
                        >{{ artist.name }}</span
                      >
                    </button>
                  </div>
                </template>

                <template v-if="albums.length">
                  <p class="msection">{{ $t('macos.musicAlbums') }}</p>
                  <div class="grid grid-cols-4 gap-4 px-5 pb-2">
                    <button
                      v-for="album in albums.slice(0, 4)"
                      :key="`al-${album.id}`"
                      class="text-left"
                      @click="openAlbum(album)"
                    >
                      <img
                        :src="album.cover"
                        :alt="album.title"
                        class="aspect-square w-full rounded-lg object-cover shadow"
                      />
                      <span
                        class="mt-1 block truncate text-[11.5px] font-medium text-aink"
                        >{{ album.title }}</span
                      >
                      <span
                        class="block truncate text-[10.5px] text-black/45"
                        >{{ album.artist }}</span
                      >
                    </button>
                  </div>
                </template>

                <template v-if="songs.length">
                  <p class="msection">{{ $t('macos.musicSongs') }}</p>
                  <div class="px-3 pb-4">
                    <button
                      v-for="(item, i) in songs"
                      :key="item.id"
                      class="mrow"
                      :class="{ 'bg-black/[0.04]': track.id === item.id }"
                      @click="music.play(i, songs)"
                    >
                      <img
                        :src="item.cover"
                        :alt="item.title"
                        class="h-9 w-9 rounded-[5px] shadow-sm"
                      />
                      <span class="min-w-0 flex-1">
                        <span
                          class="block truncate text-[13px] font-medium text-aink"
                          >{{ item.title }}</span
                        >
                        <span
                          class="block truncate text-[12px] text-black/45"
                          >{{ item.artist }}</span
                        >
                      </span>
                      <span
                        v-if="track.id === item.id && music.state.value.playing"
                        class="eq eq--red flex h-3 items-end gap-[2px]"
                      >
                        <i></i><i></i><i></i>
                      </span>
                    </button>
                    <p class="px-2 pt-1 text-[10px] text-black/30">
                      {{ $t('macos.musicPreviewNote') }}
                    </p>
                  </div>
                </template>
              </template>

              <!-- Page artiste -->
              <template v-else-if="view.kind === 'artist'">
                <div class="flex items-center gap-4 px-5 pb-3 pt-3">
                  <img
                    v-if="artistCover"
                    :src="artistCover"
                    :alt="view.name"
                    class="h-[88px] w-[88px] rounded-full object-cover shadow"
                  />
                  <span
                    v-else
                    class="flex h-[88px] w-[88px] items-center justify-center rounded-full bg-gradient-to-br from-[#FB5C74] to-[#FA233B] text-[28px] font-bold text-white"
                  >
                    {{ view.name.charAt(0).toUpperCase() }}
                  </span>
                  <span>
                    <span class="block text-[22px] font-bold text-aink">{{
                      view.name
                    }}</span>
                    <span class="block text-[12.5px] text-black/45">{{
                      view.genre
                    }}</span>
                  </span>
                </div>

                <template v-if="artistSongs.length">
                  <p class="msection">{{ $t('macos.musicTopSongs') }}</p>
                  <div class="px-3 pb-2">
                    <button
                      v-for="(item, i) in artistSongs"
                      :key="item.id"
                      class="mrow"
                      :class="{ 'bg-black/[0.04]': track.id === item.id }"
                      @click="music.play(i, artistSongs)"
                    >
                      <img
                        :src="item.cover"
                        :alt="item.title"
                        class="h-9 w-9 rounded-[5px] shadow-sm"
                      />
                      <span class="min-w-0 flex-1">
                        <span
                          class="block truncate text-[13px] font-medium text-aink"
                          >{{ item.title }}</span
                        >
                      </span>
                      <span
                        v-if="track.id === item.id && music.state.value.playing"
                        class="eq eq--red flex h-3 items-end gap-[2px]"
                      >
                        <i></i><i></i><i></i>
                      </span>
                    </button>
                  </div>
                </template>

                <template v-if="artistAlbums.length">
                  <p class="msection">{{ $t('macos.musicAlbums') }}</p>
                  <div class="grid grid-cols-4 gap-4 px-5 pb-5">
                    <button
                      v-for="album in artistAlbums"
                      :key="`ala-${album.id}`"
                      class="text-left"
                      @click="openAlbum(album)"
                    >
                      <img
                        :src="album.cover"
                        :alt="album.title"
                        class="aspect-square w-full rounded-lg object-cover shadow"
                      />
                      <span
                        class="mt-1 block truncate text-[11.5px] font-medium text-aink"
                        >{{ album.title }}</span
                      >
                      <span
                        class="block truncate text-[10.5px] text-black/45"
                        >{{ album.year }}</span
                      >
                    </button>
                  </div>
                </template>
              </template>

              <!-- Page album -->
              <template v-else-if="view.kind === 'album'">
                <div class="flex items-end gap-4 px-5 pb-4 pt-3">
                  <img
                    :src="view.album.cover"
                    :alt="view.album.title"
                    class="h-[120px] w-[120px] rounded-lg object-cover shadow-lg"
                  />
                  <span class="min-w-0 pb-1">
                    <span
                      class="block truncate text-[19px] font-bold text-aink"
                      >{{ view.album.title }}</span
                    >
                    <span
                      class="block truncate text-[13px] font-medium text-[#FA233B]"
                      >{{ view.album.artist }}</span
                    >
                    <span class="block text-[11.5px] text-black/40">
                      {{ view.album.year
                      }}<template v-if="view.album.trackCount">
                        · {{ view.album.trackCount }} titres</template
                      >
                    </span>
                  </span>
                </div>
                <div class="px-3 pb-4">
                  <button
                    v-for="(item, i) in albumTracks"
                    :key="item.id"
                    class="mrow"
                    :class="{ 'bg-black/[0.04]': track.id === item.id }"
                    @click="music.play(i, albumTracks)"
                  >
                    <span
                      class="w-6 text-center text-[12px] tabular-nums text-black/40"
                    >
                      <span
                        v-if="track.id === item.id && music.state.value.playing"
                        class="eq eq--red inline-flex h-3 items-end gap-[2px]"
                      >
                        <i></i><i></i><i></i>
                      </span>
                      <template v-else>{{ i + 1 }}</template>
                    </span>
                    <span class="min-w-0 flex-1">
                      <span
                        class="block truncate text-[13px] font-medium text-aink"
                        >{{ item.title }}</span
                      >
                    </span>
                  </button>
                  <p class="px-2 pt-1 text-[10px] text-black/30">
                    {{ $t('macos.musicPreviewNote') }}
                  </p>
                </div>
              </template>
            </template>
          </main>
        </div>
      </div>
      <!-- Balayer vers le haut pour revenir à l'écran d'accueil -->
      <DesktopIosHomeBar app="music" dark @close="desktop.closeApp('music')" />
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import {
  searchItunesAll,
  lookupItunesArtist,
  lookupItunesAlbum,
  fetchItunesTop,
  RADIO_STATIONS,
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
  z.value = desktop.focusApp('music')
}

const track = music.track

// LCD actif dès qu'un morceau a été lancé
const lcdActive = computed(
  () => music.state.value.playing || music.state.value.progress > 0
)

// ── Recherche iTunes : navigation résultats / artiste / album ──
type SearchView =
  | { kind: 'results' }
  | { kind: 'artist'; id: number; name: string; genre: string; cover?: string }
  | { kind: 'album'; album: MusicAlbum; from: 'results' | 'artist' }

const tab = ref<'library' | 'search' | 'radio'>('library')
const section = ref<'songs' | 'explore' | 'radio'>('songs')

// Nouveautés (top albums France, flux RSS officiel Apple)
const topAlbums = ref<MusicAlbum[]>([])
const topArtists = ref<MusicArtist[]>([])
const loadingTop = ref(false)
let topFetched = false
const loadTop = async () => {
  if (topFetched) return
  topFetched = true
  loadingTop.value = true
  try {
    const res = await fetchItunesTop()
    topAlbums.value = res.albums
    topArtists.value = res.artists
  } catch {
    topFetched = false
  } finally {
    loadingTop.value = false
  }
}

const openSection = (id: 'songs' | 'explore' | 'radio') => {
  section.value = id
  clearSearch()
  if (id === 'explore') loadTop()
}
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

// Desktop : la recherche prend la main dès 2 caractères ou en navigation
const desktopSearch = computed(
  () => searchTerm.value.trim().length >= 2 || view.value.kind !== 'results'
)

const clearSearch = () => {
  searchTerm.value = ''
  view.value = { kind: 'results' }
  artists.value = []
  albums.value = []
  songs.value = []
}

const artistCover = computed(() => {
  if (view.value.kind !== 'artist') return undefined
  return view.value.cover ?? artistAlbums.value[0]?.cover
})

const backLabel = computed(() => {
  if (view.value.kind === 'album' && view.value.from === 'artist') {
    return lastArtist?.name ?? ''
  }
  if (searchTerm.value.trim().length < 2) return t('macos.musicExplore')
  return t('macos.musicSearch')
})

const onSearchInput = () => {
  if (searchTimer) clearTimeout(searchTimer)
  view.value = { kind: 'results' }
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
/* Défilement horizontal sans barre visible */
.no-scrollbar {
  scrollbar-width: none;
}
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Ligne de résultat claire */
.mrow {
  @apply flex w-full items-center gap-3 rounded-lg px-2 py-1.5 text-left transition hover:bg-black/[0.04];
}

/* En-tête de section claire */
.msection {
  @apply px-5 pb-1.5 pt-3 text-[13px] font-bold text-aink;
}

/* Barres de défilement */
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
.music-scroll-light {
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
}
.music-scroll-light::-webkit-scrollbar {
  width: 5px;
}
.music-scroll-light::-webkit-scrollbar-thumb {
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.2);
}

/* Volume clair façon macOS */
.music-vol-light {
  @apply h-[4px] cursor-pointer appearance-none rounded-full bg-black/15;
}
.music-vol-light::-webkit-slider-thumb {
  @apply h-3 w-3 appearance-none rounded-full bg-white shadow ring-1 ring-black/15;
}
.music-vol-light::-moz-range-thumb {
  @apply h-3 w-3 rounded-full border-0 bg-white shadow;
}

/* Égaliseur animé */
.eq i {
  @apply w-[3px] rounded-sm;
  animation: eq-bounce 0.9s ease-in-out infinite;
}
.eq--light i {
  @apply bg-[#FA586A];
}
.eq--red i {
  @apply bg-[#FA233B];
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
.live-dot {
  animation: live-pulse 1.4s ease-in-out infinite;
}
@keyframes live-pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.35;
  }
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

/* Skeleton de chargement (Explorer / recherche) */
.skel {
  @apply animate-pulse rounded bg-black/[0.08];
}
</style>
