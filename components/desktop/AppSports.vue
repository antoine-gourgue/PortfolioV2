<template>
  <Teleport to="body">
    <div
      v-if="desktop.state.value.apps.sports"
      ref="winEl"
      class="fixed inset-0 z-40 overflow-hidden lg:inset-auto lg:left-[22%] lg:top-24 lg:w-[700px] lg:rounded-xl lg:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.45)] lg:ring-1 lg:ring-black/10"
      :style="{ zIndex: z }"
      @pointerdown="bringToFront"
    >
      <div class="flex h-full flex-col bg-[#f2f2f7] lg:h-[480px]">
        <!-- ── Desktop : barre de titre ── -->
        <div
          class="sports-drag hidden h-[44px] shrink-0 items-center gap-2 border-b border-black/10 bg-white/70 px-4 backdrop-blur lg:flex"
        >
          <button
            class="group flex h-3 w-3 items-center justify-center rounded-full border border-[#E0443E] bg-[#FF5F57]"
            aria-label="close"
            @click.stop="closeSports"
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
            @click.stop="(sfx.minimize(), desktop.minimizeApp('sports'))"
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
          <span class="ml-2 text-[14px] font-bold text-aink">{{
            $t('macos.sportsTitle')
          }}</span>
          <!-- Segmented control Matchs / Classement -->
          <div
            class="ml-auto flex rounded-[8px] bg-black/[0.06] p-[2px]"
            @pointerdown.stop
          >
            <button
              v-for="v in ['matches', 'standings'] as const"
              :key="v"
              class="rounded-[6px] px-3 py-[3px] text-[12px] font-medium transition"
              :class="
                view === v
                  ? 'bg-white text-aink shadow-sm'
                  : 'text-black/50 hover:text-aink'
              "
              @click="setView(v)"
            >
              {{
                v === 'matches'
                  ? $t('macos.sportsMatches')
                  : $t('macos.sportsStandings')
              }}
            </button>
          </div>
        </div>

        <!-- ── Mobile : barre de titre iOS ── -->
        <div class="relative flex items-center px-4 pb-2 pt-12 lg:hidden">
          <button
            class="flex items-center gap-0.5 text-[15px] font-medium text-[#0A84FF]"
            @click="desktop.closeApp('sports')"
          >
            <span class="text-xl leading-none">‹</span>
            {{ $t('macos.close') }}
          </button>
          <span
            class="absolute left-1/2 -translate-x-1/2 text-[16px] font-semibold text-aink"
            >{{ $t('macos.sportsTitle') }}</span
          >
        </div>

        <!-- ── Ligues ── -->
        <div
          class="no-scrollbar flex shrink-0 gap-1.5 overflow-x-auto px-4 py-2.5 lg:px-5"
        >
          <button
            v-for="lg in LEAGUES"
            :key="lg.code"
            class="shrink-0 rounded-full px-3 py-1 text-[12px] font-semibold transition"
            :class="
              league === lg.code
                ? 'bg-aink text-white'
                : 'bg-black/[0.06] text-aink/70 hover:bg-black/10'
            "
            @click="setLeague(lg.code)"
          >
            {{ lg.name }}
          </button>
        </div>

        <!-- Mobile : bascule Matchs / Classement -->
        <div class="flex gap-1.5 px-4 pb-2 lg:hidden">
          <button
            v-for="v in ['matches', 'standings'] as const"
            :key="v"
            class="rounded-full px-3 py-1 text-[12px] font-semibold"
            :class="
              view === v ? 'bg-aink text-white' : 'bg-black/[0.06] text-aink/70'
            "
            @click="setView(v)"
          >
            {{
              v === 'matches'
                ? $t('macos.sportsMatches')
                : $t('macos.sportsStandings')
            }}
          </button>
        </div>

        <div class="flex-1 overflow-y-auto px-4 pb-8 lg:px-5 lg:pb-5">
          <!-- ══ Détail d'un match ══ -->
          <template v-if="pane === 'match' && selMatch">
            <button
              class="mb-2 flex items-center gap-0.5 text-[13px] font-medium text-[#0A84FF]"
              @click="backFromPane"
            >
              <span class="text-lg leading-none">‹</span>
              {{ $t('macos.sportsBack') }}
            </button>

            <!-- En-tête du match -->
            <div class="rounded-xl bg-white p-4 shadow-sm ring-1 ring-black/5">
              <div class="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                <button
                  class="flex flex-col items-center gap-1.5 rounded-lg p-1.5 transition hover:bg-black/[0.04]"
                  @click="openTeam(selMatch.home, 'match')"
                >
                  <img
                    v-if="selMatch.home.logo"
                    :src="selMatch.home.logo"
                    :alt="selMatch.home.name"
                    class="h-11 w-11 object-contain"
                  />
                  <span class="text-[12.5px] font-semibold text-aink">{{
                    selMatch.home.name
                  }}</span>
                </button>
                <div class="text-center">
                  <p
                    v-if="selMatch.state !== 'pre'"
                    class="text-[28px] font-bold tabular-nums text-aink"
                  >
                    {{ selMatch.home.score }}
                    <span class="text-black/30">–</span>
                    {{ selMatch.away.score }}
                  </p>
                  <p v-else class="text-[22px] font-bold text-aink">
                    {{ kickoff(selMatch.date) }}
                  </p>
                  <p
                    v-if="selMatch.state === 'in'"
                    class="mt-0.5 flex items-center justify-center gap-1.5 text-[11px] font-bold text-[#FA233B]"
                  >
                    <span
                      class="live-dot h-1.5 w-1.5 rounded-full bg-[#FA233B]"
                    ></span>
                    {{ selMatch.detail }}
                  </p>
                  <p v-else class="mt-0.5 text-[11px] text-black/40">
                    {{
                      selMatch.state === 'pre'
                        ? matchDay(selMatch.date)
                        : selMatch.detail
                    }}
                  </p>
                </div>
                <button
                  class="flex flex-col items-center gap-1.5 rounded-lg p-1.5 transition hover:bg-black/[0.04]"
                  @click="openTeam(selMatch.away, 'match')"
                >
                  <img
                    v-if="selMatch.away.logo"
                    :src="selMatch.away.logo"
                    :alt="selMatch.away.name"
                    class="h-11 w-11 object-contain"
                  />
                  <span class="text-[12.5px] font-semibold text-aink">{{
                    selMatch.away.name
                  }}</span>
                </button>
              </div>
              <p
                v-if="matchDetail?.venue"
                class="mt-2 text-center text-[11px] text-black/35"
              >
                {{ matchDetail.venue }}
              </p>
            </div>

            <!-- Skeleton du détail -->
            <div
              v-if="detailLoading"
              class="mt-3 rounded-xl bg-white p-4 shadow-sm ring-1 ring-black/5"
            >
              <div
                v-for="i in 5"
                :key="`skd-${i}`"
                class="flex items-center gap-3 py-1.5"
              >
                <span class="skel h-3 w-8"></span>
                <span class="skel h-3 w-40"></span>
                <span class="skel ml-auto h-3 w-8"></span>
              </div>
            </div>

            <template v-else-if="matchDetail">
              <!-- Buts et cartons -->
              <div
                v-if="matchDetail.events.length"
                class="mt-3 rounded-xl bg-white px-4 py-2 shadow-sm ring-1 ring-black/5"
              >
                <div
                  v-for="(ev, i) in matchDetail.events"
                  :key="i"
                  class="flex items-center gap-2 py-[5px] text-[12.5px] text-aink"
                  :class="ev.side === 'away' ? 'flex-row-reverse' : ''"
                >
                  <span
                    class="w-10 shrink-0 text-[11px] font-semibold tabular-nums text-black/40"
                    :class="ev.side === 'away' ? 'text-left' : 'text-right'"
                    >{{ ev.minute }}</span
                  >
                  <svg
                    v-if="ev.kind === 'goal'"
                    viewBox="0 0 12 12"
                    class="h-[11px] w-[11px] shrink-0"
                  >
                    <circle
                      cx="6"
                      cy="6"
                      r="5.4"
                      fill="#fff"
                      stroke="#26262B"
                      stroke-width="1.1"
                    />
                    <polygon
                      points="6,3.6 8.2,5.2 7.4,7.8 4.6,7.8 3.8,5.2"
                      fill="#26262B"
                    />
                  </svg>
                  <span
                    v-else
                    class="h-[11px] w-[8px] shrink-0 rounded-[1.5px]"
                    :class="
                      ev.kind === 'yellow' ? 'bg-[#FFCC00]' : 'bg-[#FF3B30]'
                    "
                  ></span>
                  <span
                    class="min-w-0 truncate"
                    :class="ev.side === 'away' ? 'text-right' : ''"
                    >{{ ev.player }}</span
                  >
                </div>
              </div>

              <!-- Statistiques -->
              <div
                v-if="matchDetail.stats.length"
                class="mt-3 rounded-xl bg-white px-4 py-2.5 shadow-sm ring-1 ring-black/5"
              >
                <div
                  v-for="s in matchDetail.stats"
                  :key="s.key"
                  class="grid grid-cols-[44px_1fr_44px] items-center gap-2 py-[5px]"
                >
                  <span
                    class="text-[13px] tabular-nums text-aink"
                    :class="
                      statLead(s) === 'home' ? 'font-bold' : 'font-medium'
                    "
                    >{{ s.home }}</span
                  >
                  <span class="text-center text-[11.5px] text-black/45">{{
                    $t(`macos.sportsStat_${s.key}`)
                  }}</span>
                  <span
                    class="text-right text-[13px] tabular-nums text-aink"
                    :class="
                      statLead(s) === 'away' ? 'font-bold' : 'font-medium'
                    "
                    >{{ s.away }}</span
                  >
                </div>
              </div>

              <p
                v-if="!matchDetail.events.length && !matchDetail.stats.length"
                class="py-10 text-center text-[13px] text-black/40"
              >
                {{ $t('macos.sportsNoDetails') }}
              </p>
            </template>
          </template>

          <!-- ══ Fiche équipe ══ -->
          <template v-else-if="pane === 'team'">
            <button
              class="mb-2 flex items-center gap-0.5 text-[13px] font-medium text-[#0A84FF]"
              @click="backFromPane"
            >
              <span class="text-lg leading-none">‹</span>
              {{ $t('macos.sportsBack') }}
            </button>

            <div
              v-if="detailLoading"
              class="rounded-xl bg-white p-4 shadow-sm ring-1 ring-black/5"
            >
              <div class="flex items-center gap-3">
                <span class="skel h-12 w-12 !rounded-full"></span>
                <span>
                  <span class="skel block h-4 w-36"></span>
                  <span class="skel mt-2 block h-3 w-24"></span>
                </span>
              </div>
              <div
                v-for="i in 6"
                :key="`skt-${i}`"
                class="mt-3 flex items-center gap-3"
              >
                <span class="skel h-3 w-12"></span>
                <span class="skel h-3 w-44"></span>
              </div>
            </div>

            <template v-else-if="teamDetail">
              <div
                class="rounded-xl bg-white p-4 shadow-sm ring-1 ring-black/5"
              >
                <div class="flex items-center gap-3">
                  <img
                    v-if="teamDetail.logo"
                    :src="teamDetail.logo"
                    :alt="teamDetail.name"
                    class="h-12 w-12 object-contain"
                  />
                  <div class="min-w-0">
                    <p class="truncate text-[16px] font-bold text-aink">
                      {{ teamDetail.name }}
                    </p>
                    <p
                      v-if="teamDetail.standing"
                      class="text-[12px] text-black/45"
                    >
                      {{ teamDetail.standing }}
                    </p>
                  </div>
                  <!-- Forme sur les 5 derniers matchs -->
                  <div
                    v-if="teamForm.length"
                    class="ml-auto flex shrink-0 gap-1"
                  >
                    <span
                      v-for="(r, i) in teamForm"
                      :key="i"
                      class="flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold"
                      :class="FORM_STYLE[r]"
                      >{{ formLetter(r) }}</span
                    >
                  </div>
                </div>
                <!-- Saison en cours -->
                <div
                  v-if="teamDetail.season"
                  class="mt-3.5 grid grid-cols-4 divide-x divide-black/[0.06] border-t border-black/[0.06] pt-3 text-center"
                >
                  <div>
                    <p class="text-[16px] font-bold tabular-nums text-aink">
                      {{ teamDetail.season.rank || '–' }}
                    </p>
                    <p class="text-[10.5px] text-black/40">
                      {{ $t('macos.sportsPosLabel') }}
                    </p>
                  </div>
                  <div>
                    <p class="text-[16px] font-bold tabular-nums text-aink">
                      {{ teamDetail.season.points || '0' }}
                    </p>
                    <p class="text-[10.5px] text-black/40">Pts</p>
                  </div>
                  <div>
                    <p class="text-[16px] font-bold tabular-nums text-aink">
                      {{ teamDetail.season.wins }}-{{
                        teamDetail.season.draws
                      }}-{{ teamDetail.season.losses }}
                    </p>
                    <p class="text-[10.5px] text-black/40">
                      {{ $t('macos.sportsRecordLabel') }}
                    </p>
                  </div>
                  <div>
                    <p class="text-[16px] font-bold tabular-nums text-aink">
                      {{ teamDetail.season.goalsFor || '0' }}:{{
                        teamDetail.season.goalsAgainst || '0'
                      }}
                    </p>
                    <p class="text-[10.5px] text-black/40">
                      {{ $t('macos.sportsGoalsLabel') }}
                    </p>
                  </div>
                </div>
              </div>

              <template v-for="group in teamGroups" :key="group.titleKey">
                <p
                  v-if="group.items.length"
                  class="px-1 pb-1 pt-3.5 text-[11px] font-semibold text-black/40"
                >
                  {{ $t(group.titleKey) }}
                </p>
                <div
                  v-if="group.items.length"
                  class="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5"
                >
                  <div
                    v-for="f in group.items"
                    :key="f.id"
                    class="relative flex items-center gap-2.5 px-4 py-2 text-[12.5px] text-aink"
                  >
                    <span
                      class="absolute left-4 right-0 top-0 border-t border-black/[0.06]"
                    ></span>
                    <span class="w-14 shrink-0 text-[11px] text-black/40">{{
                      fixtureDay(f.date)
                    }}</span>
                    <span class="flex min-w-0 flex-1 items-center gap-1.5">
                      <img
                        v-if="f.home.logo"
                        :src="f.home.logo"
                        alt=""
                        class="h-4 w-4 shrink-0 object-contain"
                      />
                      <span
                        class="truncate"
                        :class="isSelTeam(f.home.name) ? 'font-semibold' : ''"
                        >{{ f.home.name }}</span
                      >
                    </span>
                    <span
                      class="shrink-0 text-[12.5px] font-semibold tabular-nums"
                    >
                      {{
                        f.state === 'pre'
                          ? kickoff(f.date)
                          : `${f.home.score} – ${f.away.score}`
                      }}
                    </span>
                    <span
                      class="flex min-w-0 flex-1 items-center justify-end gap-1.5"
                    >
                      <span
                        class="truncate text-right"
                        :class="isSelTeam(f.away.name) ? 'font-semibold' : ''"
                        >{{ f.away.name }}</span
                      >
                      <img
                        v-if="f.away.logo"
                        :src="f.away.logo"
                        alt=""
                        class="h-4 w-4 shrink-0 object-contain"
                      />
                    </span>
                  </div>
                </div>
              </template>

              <!-- Effectif -->
              <template v-for="group in rosterGroups" :key="group.titleKey">
                <p
                  class="px-1 pb-1 pt-3.5 text-[11px] font-semibold text-black/40"
                >
                  {{ $t(group.titleKey) }}
                </p>
                <div
                  class="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5"
                >
                  <div
                    v-for="p in group.players"
                    :key="p.name"
                    class="relative flex items-center gap-2.5 px-4 py-[7px] text-[12.5px] text-aink"
                  >
                    <span
                      class="absolute left-4 right-0 top-0 border-t border-black/[0.06]"
                    ></span>
                    <span
                      class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-black/[0.06] text-[10.5px] font-bold tabular-nums text-aink/60"
                      >{{ p.jersey || '–' }}</span
                    >
                    <span class="min-w-0 flex-1 truncate">{{ p.name }}</span>
                    <img
                      v-if="p.flag"
                      :src="p.flag"
                      :alt="p.flagAlt"
                      :title="p.flagAlt"
                      class="h-[12px] w-[17px] shrink-0 rounded-[2px] object-cover ring-1 ring-black/10"
                      loading="lazy"
                    />
                    <span
                      v-if="p.age"
                      class="w-12 shrink-0 text-right text-[11.5px] tabular-nums text-black/40"
                      >{{ p.age }} {{ $t('macos.sportsYears') }}</span
                    >
                  </div>
                </div>
              </template>
            </template>
            <p v-else class="py-14 text-center text-[13px] text-black/40">
              {{ $t('macos.sportsError') }}
            </p>
          </template>

          <!-- ══ Matchs ══ -->
          <template v-else-if="view === 'matches'">
            <!-- Navigation par jour -->
            <div class="mb-2.5 flex items-center justify-center gap-2">
              <button
                class="flex h-6 w-6 items-center justify-center rounded-md text-aink/60 transition hover:bg-black/5"
                aria-label="previous day"
                @click="shiftDay(-1)"
              >
                <i aria-hidden="true" class="f7-icons" style="font-size: 13px"
                  >chevron_left</i
                >
              </button>
              <button
                class="min-w-[130px] rounded-md px-2 py-0.5 text-center text-[13px] font-semibold text-aink transition hover:bg-black/5"
                @click="dayOffset = 0"
              >
                {{ dayLabel }}
              </button>
              <button
                class="flex h-6 w-6 items-center justify-center rounded-md text-aink/60 transition hover:bg-black/5"
                aria-label="next day"
                @click="shiftDay(1)"
              >
                <i aria-hidden="true" class="f7-icons" style="font-size: 13px"
                  >chevron_right</i
                >
              </button>
            </div>

            <!-- Skeleton -->
            <div v-if="loading" class="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div
                v-for="i in 4"
                :key="`skm-${i}`"
                class="rounded-xl bg-white p-3.5 shadow-sm ring-1 ring-black/5"
              >
                <span class="skel block h-2.5 w-16"></span>
                <div class="mt-3 space-y-2.5">
                  <div class="flex items-center gap-2.5">
                    <span class="skel h-6 w-6 !rounded-full"></span>
                    <span class="skel h-3 w-28"></span>
                    <span class="skel ml-auto h-3 w-4"></span>
                  </div>
                  <div class="flex items-center gap-2.5">
                    <span class="skel h-6 w-6 !rounded-full"></span>
                    <span class="skel h-3 w-24"></span>
                    <span class="skel ml-auto h-3 w-4"></span>
                  </div>
                </div>
              </div>
            </div>

            <p
              v-else-if="error"
              class="py-14 text-center text-[13px] text-black/40"
            >
              {{ $t('macos.sportsError') }}
            </p>
            <p
              v-else-if="!matches.length"
              class="py-14 text-center text-[13px] text-black/40"
            >
              {{ $t('macos.sportsNoMatches') }}
            </p>

            <div v-else class="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div
                v-for="m in matches"
                :key="m.id"
                class="cursor-pointer rounded-xl bg-white p-3.5 shadow-sm ring-1 ring-black/5 transition hover:ring-black/15"
                role="button"
                tabindex="0"
                @click="openMatch(m)"
                @keydown.enter="openMatch(m)"
              >
                <div class="flex items-center justify-between">
                  <span
                    v-if="m.state === 'in'"
                    class="flex items-center gap-1.5 text-[11px] font-bold text-[#FA233B]"
                  >
                    <span
                      class="live-dot h-1.5 w-1.5 rounded-full bg-[#FA233B]"
                    ></span>
                    {{ m.detail }}
                  </span>
                  <span v-else class="text-[11px] font-medium text-black/40">
                    {{ m.state === 'pre' ? kickoff(m.date) : m.detail }}
                  </span>
                </div>
                <div class="mt-2.5 space-y-2">
                  <div
                    v-for="side in ['home', 'away'] as const"
                    :key="side"
                    class="-mx-1.5 flex items-center gap-2.5 rounded-md px-1.5 py-0.5 transition hover:bg-black/[0.04]"
                    @click.stop="openTeam(m[side], 'main')"
                  >
                    <img
                      v-if="m[side].logo"
                      :src="m[side].logo"
                      :alt="m[side].name"
                      class="h-6 w-6 object-contain"
                      loading="lazy"
                    />
                    <span
                      v-else
                      class="h-6 w-6 rounded-full bg-black/[0.06]"
                    ></span>
                    <span
                      class="min-w-0 flex-1 truncate text-[13.5px] text-aink"
                      :class="winner(m, side) ? 'font-semibold' : ''"
                      >{{ m[side].name }}</span
                    >
                    <span
                      v-if="m.state !== 'pre'"
                      class="text-[15px] tabular-nums text-aink"
                      :class="winner(m, side) ? 'font-bold' : 'font-medium'"
                      >{{ m[side].score }}</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </template>

          <!-- ══ Classement ══ -->
          <template v-else>
            <div
              v-if="loading"
              class="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5"
            >
              <div
                v-for="i in 10"
                :key="`sks-${i}`"
                class="flex items-center gap-3 px-4 py-2"
              >
                <span class="skel h-3 w-4"></span>
                <span class="skel h-5 w-5 !rounded-full"></span>
                <span class="skel h-3 w-32"></span>
                <span class="skel ml-auto h-3 w-6"></span>
              </div>
            </div>
            <p
              v-else-if="error || !standings.length"
              class="py-14 text-center text-[13px] text-black/40"
            >
              {{ $t('macos.sportsError') }}
            </p>
            <div
              v-else
              class="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5"
            >
              <div
                class="grid grid-cols-[26px_1fr_repeat(5,30px)_36px] items-center gap-1 px-4 py-1.5 text-[10.5px] font-semibold text-black/35"
              >
                <span>#</span>
                <span></span>
                <span class="text-center">{{ $t('macos.sportsPlayed') }}</span>
                <span class="text-center">{{ $t('macos.sportsWins') }}</span>
                <span class="text-center">{{ $t('macos.sportsDraws') }}</span>
                <span class="text-center">{{ $t('macos.sportsLosses') }}</span>
                <span class="text-center">+/-</span>
                <span class="text-center">Pts</span>
              </div>
              <button
                v-for="row in standings"
                :key="row.rank + row.name"
                class="relative grid w-full grid-cols-[26px_1fr_repeat(5,30px)_36px] items-center gap-1 px-4 py-[7px] text-left text-[12.5px] text-aink transition hover:bg-black/[0.03]"
                @click="openTeam(row, 'main')"
              >
                <span
                  class="absolute left-4 right-0 top-0 border-t border-black/[0.06]"
                ></span>
                <span
                  class="text-[11.5px] font-semibold tabular-nums"
                  :class="row.rank <= 3 ? 'text-[#0A84FF]' : 'text-black/45'"
                  >{{ row.rank }}</span
                >
                <span class="flex min-w-0 items-center gap-2">
                  <img
                    v-if="row.logo"
                    :src="row.logo"
                    :alt="row.name"
                    class="h-5 w-5 shrink-0 object-contain"
                    loading="lazy"
                  />
                  <span class="truncate">{{ row.name }}</span>
                </span>
                <span class="text-center tabular-nums text-black/55">{{
                  row.played
                }}</span>
                <span class="text-center tabular-nums text-black/55">{{
                  row.wins
                }}</span>
                <span class="text-center tabular-nums text-black/55">{{
                  row.draws
                }}</span>
                <span class="text-center tabular-nums text-black/55">{{
                  row.losses
                }}</span>
                <span class="text-center tabular-nums text-black/55">{{
                  row.diff
                }}</span>
                <span class="text-center font-bold tabular-nums">{{
                  row.points
                }}</span>
              </button>
            </div>
          </template>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
const desktop = useDesktop()
const sfx = useSfx()
const { gsap, Draggable } = useGsap()
const { locale, t } = useI18n()

const winEl = ref<HTMLElement | null>(null)
const z = ref(40)
const bringToFront = () => {
  z.value = ++desktop.state.value.topZ + 40
}

const LEAGUES = [
  { code: 'fra.1', name: 'Ligue 1' },
  { code: 'uefa.champions', name: 'Champions League' },
  { code: 'eng.1', name: 'Premier League' },
  { code: 'esp.1', name: 'LaLiga' },
  { code: 'ita.1', name: 'Serie A' },
  { code: 'ger.1', name: 'Bundesliga' },
]

interface SportsTeam {
  id: string
  name: string
  full: string
  logo: string
  score: string
}
interface SportsMatch {
  id: string
  date: string
  state: 'pre' | 'in' | 'post'
  detail: string
  home: SportsTeam
  away: SportsTeam
}
interface StandingRow {
  rank: number
  id: string
  name: string
  logo: string
  played: string
  wins: string
  draws: string
  losses: string
  diff: string
  points: string
}

interface MatchEvent {
  minute: string
  kind: 'goal' | 'yellow' | 'red'
  player: string
  side: 'home' | 'away' | ''
}
interface MatchDetail {
  venue: string
  events: MatchEvent[]
  stats: Array<{ key: string; home: string; away: string }>
}
interface TeamFixture {
  id: string
  date: string
  state: 'pre' | 'in' | 'post'
  res: 'W' | 'D' | 'L' | ''
  home: { name: string; logo: string; score: string }
  away: { name: string; logo: string; score: string }
}
interface TeamSeason {
  rank: number
  played: string
  wins: string
  draws: string
  losses: string
  goalsFor: string
  goalsAgainst: string
  points: string
}
interface TeamPlayer {
  jersey: string
  name: string
  pos: string
  age: number | null
  flag: string
  flagAlt: string
}
interface TeamDetail {
  name: string
  logo: string
  record: string
  standing: string
  season: TeamSeason | null
  fixtures: TeamFixture[]
  roster: TeamPlayer[]
}

const league = ref('fra.1')
const view = ref<'matches' | 'standings'>('matches')
const dayOffset = ref(0)
const matches = ref<SportsMatch[]>([])
const standings = ref<StandingRow[]>([])
const loading = ref(false)
const error = ref(false)

const dayDate = computed(() => {
  const d = new Date()
  d.setDate(d.getDate() + dayOffset.value)
  return d
})

const dayLabel = computed(() => {
  if (dayOffset.value === 0) return t('macos.sportsToday')
  return new Intl.DateTimeFormat(locale.value, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  }).format(dayDate.value)
})

const dateParam = computed(() => {
  const d = dayDate.value
  const p = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}`
})

const kickoff = (iso: string) =>
  new Intl.DateTimeFormat(locale.value, {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(iso))

const winner = (m: SportsMatch, side: 'home' | 'away') => {
  if (m.state !== 'post') return false
  const other = side === 'home' ? 'away' : 'home'
  return Number(m[side].score) > Number(m[other].score)
}

const load = async (quiet = false) => {
  if (!quiet) {
    loading.value = true
    error.value = false
  }
  try {
    if (view.value === 'matches') {
      const data = await $fetch<{ matches: SportsMatch[] }>('/api/sports', {
        query: { league: league.value, date: dateParam.value },
      })
      matches.value = data.matches
    } else {
      const data = await $fetch<{ rows: StandingRow[] }>('/api/sports', {
        query: { league: league.value, type: 'standings' },
      })
      standings.value = data.rows
    }
  } catch {
    if (!quiet) error.value = true
  } finally {
    loading.value = false
  }
}

const closeSports = () => {
  sfx.minimize()
  pane.value = 'main'
  view.value = 'matches'
  dayOffset.value = 0
  desktop.closeApp('sports')
}

const setLeague = (code: string) => {
  if (code === league.value) return
  sfx.click()
  league.value = code
  pane.value = 'main'
  load()
}
const setView = (v: 'matches' | 'standings') => {
  if (v === view.value) return
  sfx.click()
  view.value = v
  pane.value = 'main'
  load()
}

// ── Panes de détail : match et équipe ──
const pane = ref<'main' | 'match' | 'team'>('main')
const cameFrom = ref<'main' | 'match'>('main')
const selMatch = ref<SportsMatch | null>(null)
const matchDetail = ref<MatchDetail | null>(null)
const teamDetail = ref<TeamDetail | null>(null)
const selTeamName = ref('')
const detailLoading = ref(false)

const openMatch = async (m: SportsMatch) => {
  sfx.click()
  selMatch.value = m
  matchDetail.value = null
  pane.value = 'match'
  detailLoading.value = true
  try {
    matchDetail.value = await $fetch<MatchDetail>('/api/sports', {
      query: { league: league.value, type: 'match', id: m.id },
    })
  } catch {
    matchDetail.value = { venue: '', events: [], stats: [] }
  } finally {
    detailLoading.value = false
  }
}

const openTeam = async (
  team: { id: string; name: string },
  from: 'main' | 'match'
) => {
  if (!team.id) return
  sfx.click()
  cameFrom.value = from
  selTeamName.value = team.name
  teamDetail.value = null
  pane.value = 'team'
  detailLoading.value = true
  try {
    teamDetail.value = await $fetch<TeamDetail>('/api/sports', {
      query: { league: league.value, type: 'team', id: team.id },
    })
  } catch {
    teamDetail.value = null
  } finally {
    detailLoading.value = false
  }
}

const backFromPane = () => {
  sfx.click()
  pane.value =
    pane.value === 'team' && cameFrom.value === 'match' ? 'match' : 'main'
}

const isSelTeam = (name: string) =>
  !!selTeamName.value && name === selTeamName.value

// Le plus fort des deux en gras (possession comprise)
const statLead = (s: { home: string; away: string }) => {
  const h = parseFloat(s.home)
  const a = parseFloat(s.away)
  if (Number.isNaN(h) || Number.isNaN(a) || h === a) return ''
  return h > a ? 'home' : 'away'
}

const matchDay = (iso: string) =>
  new Intl.DateTimeFormat(locale.value, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date(iso))

const fixtureDay = (iso: string) =>
  new Intl.DateTimeFormat(locale.value, {
    day: 'numeric',
    month: 'short',
  }).format(new Date(iso))

// Derniers résultats (les 5 plus récents) et 5 prochains matchs
const teamGroups = computed(() => {
  const fixtures = teamDetail.value?.fixtures ?? []
  return [
    {
      titleKey: 'macos.sportsForm',
      items: fixtures
        .filter((f) => f.state === 'post')
        .slice(-5)
        .reverse(),
    },
    {
      titleKey: 'macos.sportsUpcoming',
      items: fixtures.filter((f) => f.state !== 'post').slice(0, 5),
    },
  ]
})

// Forme V/N/D sur les 5 derniers matchs (du plus ancien au plus récent)
const teamForm = computed(() =>
  (teamDetail.value?.fixtures ?? [])
    .filter((f) => f.state === 'post' && f.res)
    .slice(-5)
    .map((f) => f.res)
)

const FORM_STYLE: Record<string, string> = {
  W: 'bg-[#34C759] text-white',
  D: 'bg-black/15 text-aink/70',
  L: 'bg-[#FF3B30] text-white',
}
const formLetter = (r: string) =>
  r === 'W'
    ? t('macos.sportsW')
    : r === 'L'
      ? t('macos.sportsL')
      : t('macos.sportsD')

// Effectif groupé par poste, dans l'ordre gardiens → attaquants
const ROSTER_GROUPS = [
  { pos: ['G'], titleKey: 'macos.sportsGoalkeepers' },
  { pos: ['D'], titleKey: 'macos.sportsDefenders' },
  { pos: ['M'], titleKey: 'macos.sportsMidfielders' },
  { pos: ['F', 'A'], titleKey: 'macos.sportsForwards' },
]
const rosterGroups = computed(() => {
  const roster = teamDetail.value?.roster ?? []
  return ROSTER_GROUPS.map((g) => ({
    titleKey: g.titleKey,
    players: roster.filter((p) => g.pos.includes(p.pos)),
  })).filter((g) => g.players.length)
})
const shiftDay = (delta: number) => {
  sfx.click()
  dayOffset.value += delta
}
watch(dayOffset, () => load())

// Rafraîchissement discret pendant les matchs du jour
let timer: ReturnType<typeof setInterval> | undefined
const startPolling = () => {
  stopPolling()
  timer = setInterval(async () => {
    const hasLive = matches.value.some((m) => m.state === 'in')
    if (view.value === 'matches' && dayOffset.value === 0 && hasLive) {
      await load(true)
      // garde l'en-tête du match ouvert en phase avec le score en direct
      if (selMatch.value) {
        selMatch.value =
          matches.value.find((m) => m.id === selMatch.value!.id) ??
          selMatch.value
      }
    }
    if (pane.value === 'match' && selMatch.value?.state === 'in') {
      try {
        matchDetail.value = await $fetch<MatchDetail>('/api/sports', {
          query: {
            league: league.value,
            type: 'match',
            id: selMatch.value.id,
          },
        })
      } catch {
        /* on garde le détail affiché */
      }
    }
  }, 60_000)
}
const stopPolling = () => {
  if (timer) clearInterval(timer)
  timer = undefined
}
onUnmounted(stopPolling)

// ── Ouverture : animation + déplacement ──
let drags: ReturnType<typeof Draggable.create> = []
watch(
  () => desktop.state.value.apps.sports,
  (open) => {
    if (!open) {
      drags.forEach((d) => d.kill())
      drags = []
      stopPolling()
      return
    }
    sfx.pop()
    load()
    startPolling()
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
          trigger: winEl.value.querySelectorAll('.sports-drag'),
          cursor: 'grab',
          activeCursor: 'grabbing',
        })
      }
    })
  }
)
</script>

<style scoped>
.skel {
  @apply animate-pulse rounded bg-black/[0.08];
}
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  scrollbar-width: none;
}
.live-dot {
  animation: sports-live 1.4s ease-in-out infinite;
}
@keyframes sports-live {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.25;
  }
}
</style>
