<template>
  <Teleport to="body">
    <div
      v-if="desktop.state.value.apps.sports"
      ref="winEl"
      data-window="sports"
      class="fixed inset-0 z-40 flex flex-col overflow-hidden bg-black lg:inset-auto lg:left-[18%] lg:top-20 lg:h-[560px] lg:w-[880px] lg:flex-row lg:rounded-[14px] lg:shadow-[0_40px_90px_-20px_rgba(0,0,0,0.75)] lg:ring-1 lg:ring-white/10"
      :style="{ zIndex: z }"
      @pointerdown="bringToFront"
    >
      <Transition name="sp-fade">
        <div
          v-if="drawer"
          class="absolute inset-0 z-20 bg-black/55 lg:hidden"
          @click="drawer = false"
        ></div>
      </Transition>

      <!-- Leagues column: fixed on desktop, drawer on mobile -->
      <DesktopSportsSidebar
        v-model:drawer="drawer"
        v-model:query="query"
        :league="league"
        :view="view"
        :searching="searching"
        :results="results"
        :has-results="hasResults"
        @close="closeSports"
        @minimize="(sfx.minimize(), desktop.minimizeApp('sports'))"
        @select-league="setLeague"
        @select-view="setView"
        @open-hit="openHit"
      />

      <div class="flex min-h-0 min-w-0 flex-1 flex-col">
        <div class="shrink-0 lg:hidden">
          <div class="flex items-center justify-between px-4 pb-1 pt-12">
            <button
              class="-ml-2 flex h-9 w-9 items-center justify-center rounded-full text-white transition active:bg-white/10"
              :aria-label="$t('macos.sportsLeagues')"
              @click="openDrawer"
            >
              <svg viewBox="0 0 20 20" class="h-[19px] w-[19px]">
                <path
                  d="M2.5 5h15M2.5 10h15M2.5 15h15"
                  stroke="currentColor"
                  stroke-width="1.7"
                  stroke-linecap="round"
                />
              </svg>
            </button>
          </div>
          <h1 class="px-4 text-[32px] font-bold tracking-[-0.6px] text-white">
            {{ $t('macos.sportsTitle') }}
          </h1>
          <p class="px-4 pb-3 pt-0.5 text-[13px] font-medium text-[#8E8E93]">
            {{ leagueName }} ·
            {{ viewLabel(view) }}
          </p>
        </div>

        <!-- Desktop header: day-by-day navigation -->
        <div
          class="sports-drag hidden h-[52px] shrink-0 items-center justify-center gap-3 border-b border-white/[0.08] px-5 lg:flex"
        >
          <template v-if="pane === 'main' && view === 'matches'">
            <button
              class="flex h-7 w-7 items-center justify-center rounded-full text-[#8E8E93] transition hover:bg-white/[0.04] hover:text-white"
              aria-label="previous day"
              @pointerdown.stop
              @click="shiftDay(-1)"
            >
              <i aria-hidden="true" class="f7-icons" style="font-size: 13px"
                >chevron_left</i
              >
            </button>
            <button
              class="min-w-[150px] rounded-full px-3 py-1 text-center text-[14px] font-semibold text-white transition hover:bg-white/[0.04]"
              @pointerdown.stop
              @click="dayOffset = 0"
            >
              {{ dayLabel }}
            </button>
            <button
              class="flex h-7 w-7 items-center justify-center rounded-full text-[#8E8E93] transition hover:bg-white/[0.04] hover:text-white"
              aria-label="next day"
              @pointerdown.stop
              @click="shiftDay(1)"
            >
              <i aria-hidden="true" class="f7-icons" style="font-size: 13px"
                >chevron_right</i
              >
            </button>
          </template>
          <span v-else class="text-[14px] font-semibold text-white">{{
            pane === 'main' ? viewLabel(view) : $t('macos.sportsTitle')
          }}</span>
        </div>

        <div
          class="sp-scroll min-h-0 flex-1 overflow-y-auto px-4 pb-8 lg:px-5 lg:py-4"
        >
          <DesktopSportsMatchPane
            v-if="pane === 'match' && selMatch"
            v-model:tab="matchTab"
            :match="selMatch"
            :detail="matchDetail"
            :loading="detailLoading"
          />

          <DesktopSportsAthletePane
            v-else-if="pane === 'athlete'"
            :detail="athleteDetail"
            :name="athleteName"
            :loading="detailLoading"
          />

          <DesktopSportsTeamPane
            v-else-if="pane === 'team'"
            :detail="teamDetail"
            :loading="detailLoading"
            :sel-name="selTeamName"
          />

          <template v-else-if="view === 'matches'">
            <div class="mb-3 flex items-center justify-center gap-2 lg:hidden">
              <button
                class="flex h-7 w-7 items-center justify-center rounded-full text-[#8E8E93]"
                aria-label="previous day"
                @click="shiftDay(-1)"
              >
                <i aria-hidden="true" class="f7-icons" style="font-size: 13px"
                  >chevron_left</i
                >
              </button>
              <button
                class="min-w-[150px] text-center text-[14px] font-semibold text-white"
                @click="dayOffset = 0"
              >
                {{ dayLabel }}
              </button>
              <button
                class="flex h-7 w-7 items-center justify-center rounded-full text-[#8E8E93]"
                aria-label="next day"
                @click="shiftDay(1)"
              >
                <i aria-hidden="true" class="f7-icons" style="font-size: 13px"
                  >chevron_right</i
                >
              </button>
            </div>

            <div v-if="loading">
              <div class="sp-skel mb-4 h-[188px] !rounded-[20px] lg:h-[216px]">
                &nbsp;
              </div>
              <div class="sp-card grid lg:grid-cols-2">
                <div
                  v-for="i in 4"
                  :key="`skm-${i}`"
                  class="flex items-center gap-3 px-4 py-3"
                >
                  <span class="sp-skel h-3 w-9"></span>
                  <span class="min-w-0 flex-1">
                    <span class="sp-skel block h-3.5 w-28"></span>
                    <span class="sp-skel mt-2 block h-3.5 w-24"></span>
                  </span>
                </div>
              </div>
            </div>

            <p
              v-else-if="error"
              class="py-16 text-center text-[14px] text-[#636366]"
            >
              {{ $t('macos.sportsError') }}
            </p>
            <p
              v-else-if="!matches.length"
              class="py-16 text-center text-[14px] text-[#636366]"
            >
              {{ $t('macos.sportsNoMatches') }}
            </p>

            <template v-else>
              <DesktopSportsHero v-if="featured" :match="featured" />

              <DesktopSportsMatchList
                v-if="restMatches.length"
                :matches="restMatches"
              />
            </template>
          </template>

          <DesktopSportsNewsList
            v-else-if="view === 'news'"
            :articles="articles"
            :loading="loading"
            :error="error"
          />

          <DesktopSportsStandings
            v-else
            :rows="standings"
            :loading="loading"
            :error="error"
          />
        </div>
      </div>
      <!-- Swipe up to return to the home screen -->
      <DesktopIosHomeBar app="sports" dark @close="closeSports" />
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { LEAGUES, SPORTS_KEY, useSportsFormat } from '~/composables/useSports'
import type {
  AthleteDetail,
  MatchDetail,
  MatchTab,
  NewsArticle,
  SearchHit,
  SportsMatch,
  SportsPane,
  SportsView,
  StandingRow,
  TeamDetail,
  TeamFixture,
} from '~/types/sports'

const desktop = useDesktop()
const sfx = useSfx()
const track = useTrack()
const { gsap, Draggable } = useGsap()
const { locale, t } = useI18n()
const format = useSportsFormat()

const winEl = ref<HTMLElement | null>(null)
const z = ref(40)
const bringToFront = () => {
  z.value = desktop.focusApp('sports')
}

const league = ref('fra.1')
const view = ref<SportsView>('matches')
const dayOffset = ref(0)
const matches = ref<SportsMatch[]>([])
const standings = ref<StandingRow[]>([])
const articles = ref<NewsArticle[]>([])
const loading = ref(false)
const error = ref(false)

const leagueName = computed(
  () => LEAGUES.find((l) => l.code === league.value)?.name ?? ''
)

const VIEW_LABELS = {
  matches: 'macos.sportsMatches',
  standings: 'macos.sportsStandings',
  news: 'macos.sportsNews',
} as const
const viewLabel = (v: SportsView) => t(VIEW_LABELS[v])

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
const shiftDay = (delta: number) => {
  sfx.click()
  dayOffset.value += delta
}
watch(dayOffset, () => load())

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
    } else if (view.value === 'news') {
      const data = await $fetch<{ articles: NewsArticle[] }>('/api/sports', {
        query: { league: league.value, type: 'news' },
      })
      articles.value = data.articles
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

// The featured match: a live one if any, else the latest finished one,
// else the next kickoff.
const featured = computed<SportsMatch | null>(() => {
  const list = matches.value
  if (!list.length) return null
  const live = list.find((m) => m.state === 'in')
  if (live) return live
  const done = list.filter((m) => m.state === 'post')
  if (done.length) return done[done.length - 1]
  return list.find((m) => m.state === 'pre') ?? list[0]
})
const restMatches = computed(() =>
  matches.value.filter((m) => m.id !== featured.value?.id)
)

// Leagues drawer: permanent on desktop, sliding below 1024px
const drawer = ref(false)
const openDrawer = () => {
  sfx.click()
  drawer.value = true
}

const closeSports = () => {
  sfx.minimize()
  pane.value = 'main'
  view.value = 'matches'
  dayOffset.value = 0
  drawer.value = false
  desktop.closeApp('sports')
}

const setLeague = (code: string) => {
  drawer.value = false
  if (code === league.value) return
  sfx.click()
  track('sports_league_selected', { league: code })
  league.value = code
  pane.value = 'main'
  load()
}
const setView = (v: SportsView) => {
  drawer.value = false
  if (v === view.value) return
  sfx.click()
  view.value = v
  pane.value = 'main'
  load()
}

const query = ref('')
const searching = ref(false)
const results = ref<{ teams: SearchHit[]; players: SearchHit[] }>({
  teams: [],
  players: [],
})
const hasResults = computed(
  () => results.value.teams.length + results.value.players.length > 0
)

let searchTimer: ReturnType<typeof setTimeout> | undefined
watch(query, (q) => {
  clearTimeout(searchTimer)
  const term = q.trim()
  if (term.length < 2) {
    results.value = { teams: [], players: [] }
    searching.value = false
    return
  }
  searching.value = true
  // Let the typing settle before querying ESPN
  searchTimer = setTimeout(async () => {
    try {
      results.value = await $fetch<{
        teams: SearchHit[]
        players: SearchHit[]
      }>('/api/sports', {
        query: { league: league.value, type: 'search', q: term },
      })
      track('sports_search', { term })
    } catch {
      results.value = { teams: [], players: [] }
    } finally {
      searching.value = false
    }
  }, 350)
})

const openHit = (hit: SearchHit, kind: 'teams' | 'players') => {
  // Each sheet is queried in its own competition: switch the match list
  // too, otherwise going back would show another league.
  if (hit.league && hit.league !== league.value) {
    league.value = hit.league
    load()
  }
  query.value = ''
  drawer.value = false
  if (kind === 'teams') openTeam({ id: hit.id, name: hit.name }, 'main')
  else openAthlete(hit.id, hit.name, 'main')
}

const pane = ref<SportsPane>('main')
const cameFrom = ref<'main' | 'match'>('main')
// Where a player was opened from: a team's squad or a lineup
const athleteFrom = ref<'team' | 'match' | 'main'>('team')
const matchTab = ref<MatchTab>('summary')
const selMatch = ref<SportsMatch | null>(null)
const matchDetail = ref<MatchDetail | null>(null)
const teamDetail = ref<TeamDetail | null>(null)
const athleteDetail = ref<AthleteDetail | null>(null)
const athleteName = ref('')
const selTeamName = ref('')
const detailLoading = ref(false)

// Match commentary is translated server-side: the language is part of the request
const fetchMatchDetail = (id: string) =>
  $fetch<MatchDetail>('/api/sports', {
    query: { league: league.value, type: 'match', id, lang: locale.value },
  })

// Changing the site language switches the commentary without a reload
watch(locale, async () => {
  if (pane.value !== 'match' || !selMatch.value) return
  try {
    matchDetail.value = await fetchMatchDetail(selMatch.value.id)
  } catch {
    /* keep the displayed detail */
  }
})

// Where a match was opened from: the day's list or a team sheet
const matchFrom = ref<'main' | 'team'>('main')

// A fixture row lacks part of a day-match's data: fill in what we can,
// the server does the rest. Past games keep their lineups, commentary
// and stats.
const openFixture = (f: TeamFixture) => {
  const side = (t: TeamFixture['home']) => ({
    id: t.id,
    name: t.name,
    full: t.name,
    logo: t.logo,
    score: t.score,
    color: '',
  })
  openMatch(
    {
      id: f.id,
      date: f.date,
      state: f.state,
      detail: '',
      venue: '',
      goals: [],
      home: side(f.home),
      away: side(f.away),
    },
    'team'
  )
}

const openMatch = async (m: SportsMatch, from: 'main' | 'team' = 'main') => {
  sfx.click()
  matchFrom.value = from
  track('sports_match_opened', {
    match: `${m.home.name} – ${m.away.name}`,
    state: m.state,
  })
  selMatch.value = m
  matchDetail.value = null
  matchTab.value = 'summary'
  pane.value = 'match'
  detailLoading.value = true
  try {
    matchDetail.value = await fetchMatchDetail(m.id)
  } catch {
    matchDetail.value = {
      venue: '',
      events: [],
      stats: [],
      lineups: { home: null, away: null },
      commentary: [],
    }
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
  track('sports_team_opened', { team: team.name })
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

const openAthlete = async (
  id: string,
  name: string,
  from: 'team' | 'match' | 'main' = 'team'
) => {
  if (!id) return
  sfx.click()
  track('sports_player_opened', { player: name })
  athleteFrom.value = from
  athleteName.value = name
  athleteDetail.value = null
  pane.value = 'athlete'
  detailLoading.value = true
  try {
    athleteDetail.value = await $fetch<AthleteDetail>('/api/sports', {
      query: { league: league.value, type: 'athlete', id },
    })
  } catch {
    athleteDetail.value = null
  } finally {
    detailLoading.value = false
  }
}

const backFromPane = () => {
  sfx.click()
  if (pane.value === 'athlete') {
    pane.value = athleteFrom.value === 'main' ? 'main' : athleteFrom.value
    return
  }
  if (pane.value === 'match') {
    pane.value = matchFrom.value
    return
  }
  pane.value = cameFrom.value === 'match' ? 'match' : 'main'
}

// Actions and formatters made available to child panes
provide(SPORTS_KEY, {
  openMatch,
  openFixture,
  openTeam,
  openAthlete,
  backFromPane,
  ...format,
})

// Quiet refresh while the day's matches are on
let timer: ReturnType<typeof setInterval> | undefined
const stopPolling = () => {
  if (timer) clearInterval(timer)
  timer = undefined
}
const startPolling = () => {
  stopPolling()
  timer = setInterval(async () => {
    const hasLive = matches.value.some((m) => m.state === 'in')
    if (view.value === 'matches' && dayOffset.value === 0 && hasLive) {
      await load(true)
      // keep the open match header in step with the live score
      if (selMatch.value) {
        selMatch.value =
          matches.value.find((m) => m.id === selMatch.value!.id) ??
          selMatch.value
      }
    }
    if (pane.value === 'match' && selMatch.value?.state === 'in') {
      try {
        matchDetail.value = await fetchMatchDetail(selMatch.value.id)
      } catch {
        /* keep the displayed detail */
      }
    }
  }, 60_000)
}
onUnmounted(stopPolling)

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

<style>
/* Deliberately global styles: the child panes (pitch, lists, cards) use
   the same classes. All are prefixed `sp-`/`sports-`, so nothing collides
   elsewhere on the site. */
/* Apple Sports-style cards: elevated gray on black, no shadow */
.sp-card {
  background: #1c1c1e;
  border-radius: 18px;
}
/* Pitch: dark turf, mowing stripes and halfway line */
.sp-pitch {
  background:
    linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.05) 0 10%,
      transparent 10% 20%,
      rgba(255, 255, 255, 0.05) 20% 30%,
      transparent 30% 40%,
      rgba(255, 255, 255, 0.05) 40% 50%,
      transparent 50% 60%,
      rgba(255, 255, 255, 0.05) 60% 70%,
      transparent 70% 80%,
      rgba(255, 255, 255, 0.05) 80% 90%,
      transparent 90%
    ),
    linear-gradient(160deg, #14512f, #0d3a22);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.12);
}
/* Hover on rows that open a sheet: no background, a chevron fading in on
   the right like Settings or Contacts. It stays in the flow, always
   present but transparent, so nothing shifts on hover. */
.sp-chev {
  flex: none;
  width: 8px;
  margin-left: 4px;
  font-size: 16px;
  line-height: 1;
  color: #636366;
  text-align: right;
  opacity: 0;
  transform: translateX(-3px);
  transition:
    opacity 0.18s ease,
    transform 0.18s ease;
}
.sp-av {
  transition: background-color 0.18s ease;
}
/* Club and player names inside a sentence: a plain underline shown on
   hover only, no color or weight change. */
.sp-link {
  text-decoration: underline;
  text-decoration-color: transparent;
  text-underline-offset: 2px;
  text-decoration-thickness: 1px;
  transition: text-decoration-color 0.18s ease;
}
@media (hover: hover) and (min-width: 1024px) {
  .sp-link:hover {
    text-decoration-color: currentColor;
  }
}
/* Article arrow: same logic, inline with the title */
.sp-chev-inline {
  display: inline;
  width: auto;
  margin-left: 2px;
  font-size: 12px;
}
@media (hover: hover) and (min-width: 1024px) {
  .sp-hit:hover .sp-chev {
    opacity: 1;
    transform: none;
  }
  .sp-hit:hover .sp-av {
    background-color: #3a3a3c;
  }
  .sp-news:hover .sp-chev-inline {
    opacity: 1;
    transform: none;
  }
}
@media (prefers-reduced-motion: reduce) {
  .sp-chev {
    transform: none;
    transition: opacity 0.18s ease;
  }
}
/* Inset internal separators, like iOS lists */
.sp-row + .sp-row {
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
}
.sp-skel {
  display: block;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.09);
  animation: sp-pulse 1.6s ease-in-out infinite;
}
@keyframes sp-pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.45;
  }
}
/* Live dot */
.sp-dot {
  animation: sp-live 1.4s ease-in-out infinite;
}
/* Dot halo on the featured card, where the background is colored */
.sp-glow {
  box-shadow: 0 0 8px #ff453a;
}
/* Mobile drawer scrim */
.sp-fade-enter-active,
.sp-fade-leave-active {
  transition: opacity 0.25s ease;
}
.sp-fade-enter-from,
.sp-fade-leave-to {
  opacity: 0;
}
@keyframes sp-live {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.25;
  }
}
.sp-scroll::-webkit-scrollbar {
  width: 0;
  height: 0;
}
.sp-scroll {
  scrollbar-width: none;
}
@media (prefers-reduced-motion: reduce) {
  .sp-dot,
  .sp-skel {
    animation: none;
  }
  .sp-fade-enter-active,
  .sp-fade-leave-active {
    transition: none;
  }
}
</style>
