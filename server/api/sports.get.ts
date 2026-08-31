import { translateCommentary } from '../utils/commentary'

/**
 * Football scores and standings via ESPN's public JSON endpoints.
 * Server proxy + cache: 45s for scoreboards (live matches), 10min for
 * standings.
 */

interface SportsTeam {
  id: string
  name: string
  full: string
  logo: string
  score: string
  // Official club color, used by the featured-match gradient
  color: string
}

interface MatchGoal {
  minute: string
  player: string
  playerId: string
  side: 'home' | 'away' | ''
  own: boolean
}

interface SportsMatch {
  id: string
  date: string
  state: 'pre' | 'in' | 'post'
  detail: string
  venue: string
  goals: MatchGoal[]
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
  playerId: string
  side: 'home' | 'away' | ''
}

interface LineupPlayer {
  id: string
  name: string
  jersey: string
  pos: string
  photo: string
  subbedIn: boolean
  subbedOut: boolean
}

interface Lineup {
  formation: string
  starters: LineupPlayer[]
  subs: LineupPlayer[]
}

interface CommentaryLine {
  minute: string
  text: string
  kind: string
  side: 'home' | 'away' | ''
}

interface MatchDetail {
  venue: string
  events: MatchEvent[]
  stats: Array<{ key: string; home: string; away: string }>
  lineups: { home: Lineup | null; away: Lineup | null }
  commentary: CommentaryLine[]
}

interface TeamFixture {
  id: string
  date: string
  state: 'pre' | 'in' | 'post'
  res: 'W' | 'D' | 'L' | ''
  home: { id: string; name: string; logo: string; score: string }
  away: { id: string; name: string; logo: string; score: string }
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
  id: string
  jersey: string
  name: string
  pos: string
  age: number | null
  flag: string
  flagAlt: string
  photo: string
}

interface NewsEntity {
  kind: 'team' | 'athlete'
  id: string
  name: string
}

interface NewsArticle {
  id: string
  headline: string
  description: string
  published: string
  image: string
  link: string
  entities: NewsEntity[]
}

interface SearchHit {
  id: string
  name: string
  subtitle: string
  league: string
  image: string
}

interface AthleteGame {
  date: string
  opponent: string
  opponentId: string
  logo: string
  home: boolean
  result: string
  stats: string[]
}

interface AthleteDetail {
  name: string
  photo: string
  jersey: string
  pos: string
  age: number | null
  nationality: string
  flag: string
  height: string
  weight: string
  team: string
  labels: string[]
  games: AthleteGame[]
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

// Allowed competitions — all verified to respond on ESPN's side.
const LEAGUES = new Set([
  // leagues
  'fra.1',
  'fra.2',
  'eng.1',
  'eng.2',
  'esp.1',
  'ita.1',
  'ger.1',
  'ned.1',
  'por.1',
  'bel.1',
  'sco.1',
  'tur.1',
  'usa.1',
  'mex.1',
  'bra.1',
  'arg.1',
  // european and domestic cups
  'uefa.champions',
  'uefa.europa',
  'uefa.europa.conf',
  'uefa.super_cup',
  'fra.coupe_de_france',
  'eng.fa',
  'esp.copa_del_rey',
  'ita.coppa_italia',
  'ger.dfb_pokal',
])

const cache = new Map<string, { at: number; ttl: number; data: unknown }>()

// Full-size ESPN portraits weigh ~200KB; their resizer brings them down
// to about fifteen.
const thumb = (href: string, size: number) => {
  const m = /^https:\/\/a\.espncdn\.com(\/(?:i|photo)\/.+)$/.exec(href || '')
  if (!m) return href || ''
  return `https://a.espncdn.com/combiner/i?img=${m[1]}&w=${size}&h=${size}&scale=crop`
}

/* eslint-disable @typescript-eslint/no-explicit-any */
const mapScoreboard = (raw: any): { matches: SportsMatch[] } => {
  const matches: SportsMatch[] = []
  for (const e of raw?.events ?? []) {
    const c = e?.competitions?.[0]
    if (!c) continue
    const sideById = new Map<string, 'home' | 'away'>()
    for (const t of c.competitors ?? []) {
      if (t?.team?.id) sideById.set(String(t.team.id), t.homeAway)
    }
    const side = (ha: string): SportsTeam => {
      const t = c.competitors?.find((x: any) => x.homeAway === ha)
      const hex = String(t?.team?.color ?? '').replace('#', '')
      return {
        id: String(t?.team?.id ?? ''),
        name: t?.team?.shortDisplayName ?? '',
        full: t?.team?.displayName ?? '',
        logo: t?.team?.logo ?? '',
        score: t?.score ?? '',
        color: /^[0-9a-f]{6}$/i.test(hex) ? `#${hex}` : '',
      }
    }
    // Scorers for the featured card: the scoreboard ships them for free
    const goals: MatchGoal[] = []
    for (const d of c.details ?? []) {
      if (!d?.scoringPlay || d?.shootout) continue
      goals.push({
        minute: d?.clock?.displayValue ?? '',
        player: d?.athletesInvolved?.[0]?.displayName ?? '',
        playerId: String(d?.athletesInvolved?.[0]?.id ?? ''),
        side: sideById.get(String(d?.team?.id ?? '')) ?? '',
        own: !!d?.ownGoal,
      })
    }
    matches.push({
      id: String(e.id),
      date: e.date,
      state: e.status?.type?.state ?? 'pre',
      detail: e.status?.type?.shortDetail ?? '',
      venue: c.venue?.fullName ?? '',
      goals,
      home: side('home'),
      away: side('away'),
    })
  }
  return { matches }
}

const mapStandings = (raw: any): { rows: StandingRow[] } => {
  const entries = raw?.children?.[0]?.standings?.entries ?? []
  const rows: StandingRow[] = entries.map((e: any) => {
    const stats: Record<string, string> = {}
    let rank = 0
    for (const s of e.stats ?? []) {
      stats[s.name] = s.displayValue ?? ''
      if (s.name === 'rank') rank = Number(s.value ?? 0)
    }
    return {
      rank,
      id: String(e.team?.id ?? ''),
      name: e.team?.displayName ?? '',
      logo: e.team?.logos?.[0]?.href ?? '',
      played: stats.gamesPlayed ?? '',
      wins: stats.wins ?? '',
      draws: stats.ties ?? '',
      losses: stats.losses ?? '',
      diff: stats.pointDifferential ?? '',
      points: stats.points ?? '',
    }
  })
  rows.sort((a: StandingRow, b: StandingRow) => a.rank - b.rank)
  return { rows }
}

// Team stats kept for the match sheet, in display order
const MATCH_STATS = [
  'possessionPct',
  'totalShots',
  'shotsOnTarget',
  'wonCorners',
  'foulsCommitted',
  'yellowCards',
  'redCards',
  'saves',
]

const mapMatch = (raw: any, lang: string): MatchDetail => {
  // team id → side, from the match header
  const sideById = new Map<string, 'home' | 'away'>()
  for (const t of raw?.header?.competitions?.[0]?.competitors ?? []) {
    if (t?.team?.id) sideById.set(String(t.team.id), t.homeAway)
  }

  const events: MatchEvent[] = []
  for (const k of raw?.keyEvents ?? []) {
    const text = String(k?.type?.text ?? '')
    const kind = /own goal|goal|penalty - scored/i.test(text)
      ? 'goal'
      : /yellow/i.test(text)
        ? 'yellow'
        : /red/i.test(text)
          ? 'red'
          : null
    if (!kind) continue
    events.push({
      minute: k?.clock?.displayValue ?? '',
      kind,
      player: k?.participants?.[0]?.athlete?.displayName ?? '',
      playerId: String(k?.participants?.[0]?.athlete?.id ?? ''),
      side: sideById.get(String(k?.team?.id ?? '')) ?? '',
    })
  }

  const statsBySide: Record<string, Record<string, string>> = {}
  for (const t of raw?.boxscore?.teams ?? []) {
    const ha = t?.homeAway ?? sideById.get(String(t?.team?.id ?? '')) ?? ''
    if (!ha) continue
    statsBySide[ha] = {}
    for (const s of t?.statistics ?? []) {
      statsBySide[ha][s.name] = s.displayValue ?? ''
    }
  }
  const stats = MATCH_STATS.filter(
    (key) => statsBySide.home?.[key] !== undefined
  ).map((key) => ({
    key,
    home: statsBySide.home?.[key] ?? '',
    away: statsBySide.away?.[key] ?? '',
  }))

  // Lineups: ESPN gives the formation and each player's slot in it.
  // Starters and substitutes are split apart.
  const mapPlayer = (p: any): LineupPlayer => ({
    id: String(p?.athlete?.id ?? ''),
    name: p?.athlete?.displayName ?? '',
    jersey: p?.jersey ?? '',
    pos: p?.position?.abbreviation ?? '',
    photo: thumb(p?.athlete?.headshot?.href ?? '', 96),
    subbedIn: !!p?.subbedIn,
    subbedOut: !!p?.subbedOut,
  })
  const lineups: MatchDetail['lineups'] = { home: null, away: null }
  for (const r of raw?.rosters ?? []) {
    const ha = r?.homeAway === 'away' ? 'away' : 'home'
    const players = r?.roster ?? []
    if (!players.length) continue
    lineups[ha] = {
      formation: r?.formation ?? '',
      starters: players.filter((p: any) => p?.starter).map(mapPlayer),
      subs: players.filter((p: any) => !p?.starter).map(mapPlayer),
    }
  }

  // Match commentary. `play.team` does not always carry an id: fall back to the name.
  const nameToSide = new Map<string, 'home' | 'away'>()
  for (const t of raw?.header?.competitions?.[0]?.competitors ?? []) {
    if (t?.team?.displayName) nameToSide.set(t.team.displayName, t.homeAway)
  }
  const commentary: CommentaryLine[] = []
  for (const c of raw?.commentary ?? []) {
    const text = String(c?.text ?? '').trim()
    if (!text) continue
    const team = c?.play?.team
    commentary.push({
      minute: c?.time?.displayValue ?? '',
      // ESPN only publishes commentary in English: pattern-translated
      text: translateCommentary(text, lang),
      kind: c?.play?.type?.type ?? '',
      side:
        sideById.get(String(team?.id ?? '')) ??
        nameToSide.get(String(team?.displayName ?? '')) ??
        '',
    })
  }

  return {
    venue: raw?.gameInfo?.venue?.fullName ?? '',
    events,
    stats,
    lineups,
    commentary,
  }
}

// Current ESPN season: named after its kickoff year, which starts in July.
const currentSeason = () => {
  const now = new Date()
  return now.getMonth() >= 6 ? now.getFullYear() : now.getFullYear() - 1
}
const prevSeason = () => currentSeason() - 1

const countPlayed = (raw: any) =>
  (raw?.events ?? []).filter(
    (e: any) =>
      (e?.competitions?.[0]?.status ?? e?.status)?.type?.state === 'post'
  ).length

const mapTeam = (
  teamId: string,
  rawTeam: any,
  scheds: any[],
  rawRoster: any,
  rawStandings: any
): TeamDetail => {
  const t = rawTeam?.team ?? {}

  // Fixture calls can overlap: dedupe
  const events: any[] = []
  const seenEvents = new Set<string>()
  for (const raw of scheds) {
    for (const e of raw?.events ?? []) {
      const eid = String(e?.id ?? '')
      if (!eid || seenEvents.has(eid)) continue
      seenEvents.add(eid)
      events.push(e)
    }
  }

  const fixtures: TeamFixture[] = []
  for (const e of events) {
    const c = e?.competitions?.[0]
    if (!c) continue
    const pick = (ha: string) =>
      c.competitors?.find((y: any) => y.homeAway === ha)
    const side = (ha: string) => {
      const x = pick(ha)
      const score = x?.score
      return {
        id: String(x?.team?.id ?? ''),
        name: x?.team?.shortDisplayName ?? '',
        logo: x?.team?.logos?.[0]?.href ?? x?.team?.logo ?? '',
        score:
          typeof score === 'object'
            ? (score?.displayValue ?? '')
            : (score ?? ''),
      }
    }
    const state = c?.status?.type?.state ?? e?.status?.type?.state ?? 'pre'
    // Result from the requested team's point of view (for the W/D/L form)
    let res: TeamFixture['res'] = ''
    if (state === 'post') {
      const home = side('home')
      const away = side('away')
      const isHome = String(pick('home')?.team?.id ?? '') === teamId
      const mine = Number(isHome ? home.score : away.score)
      const theirs = Number(isHome ? away.score : home.score)
      if (!Number.isNaN(mine) && !Number.isNaN(theirs)) {
        res = mine > theirs ? 'W' : mine < theirs ? 'L' : 'D'
      }
    }
    fixtures.push({
      id: String(e.id),
      date: e.date,
      state,
      res,
      home: side('home'),
      away: side('away'),
    })
  }
  fixtures.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  )

  // The team's standings row (rank, goals for/against, points…)
  let season: TeamSeason | null = null
  for (const group of rawStandings?.children ?? []) {
    for (const e of group?.standings?.entries ?? []) {
      if (String(e?.team?.id ?? '') !== teamId) continue
      const stats: Record<string, string> = {}
      let rank = 0
      for (const s of e.stats ?? []) {
        stats[s.name] = s.displayValue ?? ''
        if (s.name === 'rank') rank = Number(s.value ?? 0)
      }
      season = {
        rank,
        played: stats.gamesPlayed ?? '',
        wins: stats.wins ?? '',
        draws: stats.ties ?? '',
        losses: stats.losses ?? '',
        goalsFor: stats.pointsFor ?? '',
        goalsAgainst: stats.pointsAgainst ?? '',
        points: stats.points ?? '',
      }
    }
  }

  const roster: TeamPlayer[] = (rawRoster?.athletes ?? []).map((a: any) => ({
    id: String(a?.id ?? ''),
    jersey: a?.jersey ?? '',
    name: a?.displayName ?? '',
    pos: a?.position?.abbreviation ?? '',
    age: typeof a?.age === 'number' ? a.age : null,
    flag: a?.flag?.href ?? '',
    flagAlt: a?.citizenship ?? '',
    photo: thumb(a?.headshot?.href ?? '', 80),
  }))

  return {
    name: t.displayName ?? '',
    logo: t.logos?.[0]?.href ?? '',
    record: t.record?.items?.[0]?.summary ?? '',
    standing: t.standingSummary ?? '',
    season,
    fixtures,
    roster,
  }
}
// News. ESPN attaches to each article the clubs and players it mentions,
// with their ids: forwarded so they can be made clickable.
const mapNews = (raw: any): { articles: NewsArticle[] } => {
  const articles: NewsArticle[] = []
  for (const a of raw?.articles ?? []) {
    const entities: NewsEntity[] = []
    const seen = new Set<string>()
    for (const c of a?.categories ?? []) {
      const kind =
        c?.type === 'team' ? 'team' : c?.type === 'athlete' ? 'athlete' : ''
      if (!kind) continue
      const node = kind === 'team' ? c.team : c.athlete
      const id = String(node?.id ?? '')
      const name = c?.description ?? node?.description ?? ''
      if (!id || !name || seen.has(kind + id)) continue
      seen.add(kind + id)
      entities.push({ kind, id, name })
    }
    // The smallest illustration above 400px is plenty
    const images = (a?.images ?? []).filter((i: any) => i?.url)
    const sized = [...images].sort(
      (x: any, y: any) => (x.width ?? 0) - (y.width ?? 0)
    )
    const image =
      sized.find((i: any) => (i.width ?? 0) >= 400) ?? sized[sized.length - 1]
    articles.push({
      id: String(a?.id ?? ''),
      headline: a?.headline ?? '',
      description: a?.description ?? '',
      published: a?.published ?? '',
      image: image?.url ?? '',
      link: a?.links?.web?.href ?? '',
      entities: entities.slice(0, 6),
    })
  }
  return { articles }
}

// ESPN search sweeps every sport: keep football only, and only the
// competitions we know how to display.
const mapSearch = (raw: any): { teams: SearchHit[]; players: SearchHit[] } => {
  const out: { teams: SearchHit[]; players: SearchHit[] } = {
    teams: [],
    players: [],
  }
  for (const group of raw?.results ?? []) {
    const bucket =
      group?.type === 'team'
        ? 'teams'
        : group?.type === 'player'
          ? 'players'
          : ''
    if (!bucket) continue
    for (const c of group?.contents ?? []) {
      if (c?.sport !== 'soccer') continue
      // Only surface what we can open afterwards: team and player sheets
      // are both queried per competition.
      const slug = String(c?.defaultLeagueSlug ?? '')
      if (!LEAGUES.has(slug)) continue
      // uid shaped like s:600~t:175 or s:600~a:48746
      const id = /[ta]:(\d+)/.exec(String(c?.uid ?? ''))?.[1] ?? ''
      if (!id) continue
      out[bucket].push({
        id,
        name: c?.displayName ?? '',
        subtitle: c?.subtitle ?? '',
        league: slug,
        image: thumb(c?.image?.default ?? '', 64),
      })
    }
  }
  out.teams = out.teams.slice(0, 8)
  out.players = out.players.slice(0, 8)
  return out
}

// ESPN reports heights in inches and weights in pounds.
const cm = (inches: unknown) =>
  typeof inches === 'number' && inches > 0
    ? `${Math.round(inches * 2.54)} cm`
    : ''
const kg = (pounds: unknown) =>
  typeof pounds === 'number' && pounds > 0
    ? `${Math.round(pounds * 0.4536)} kg`
    : ''

const mapAthlete = (
  athleteId: string,
  rawCore: any,
  rawOverview: any
): AthleteDetail => {
  const log = rawOverview?.gameLog ?? {}
  const block = log?.statistics?.[0] ?? {}
  const meta: Record<string, any> = log?.events ?? {}

  const games: AthleteGame[] = (block?.events ?? [])
    .map((e: any) => {
      const ev = meta[String(e?.eventId ?? '')] ?? {}
      return {
        date: ev?.gameDate ?? '',
        opponent: ev?.opponent?.displayName ?? ev?.opponent?.abbreviation ?? '',
        opponentId: String(ev?.opponent?.id ?? ''),
        logo: thumb(ev?.opponent?.logo ?? '', 48),
        home: ev?.atVs !== '@',
        result: [ev?.gameResult, ev?.score].filter(Boolean).join(' '),
        stats: Array.isArray(e?.stats) ? e.stats : [],
      }
    })
    .filter((g: AthleteGame) => g.opponent || g.stats.length)

  return {
    name: rawCore?.displayName ?? rawOverview?.athlete?.displayName ?? '',
    photo: thumb(
      rawCore?.headshot?.href ??
        `https://a.espncdn.com/i/headshots/soccer/players/full/${athleteId}.png`,
      160
    ),
    jersey: rawCore?.jersey ?? '',
    pos: rawCore?.position?.displayName ?? '',
    age: typeof rawCore?.age === 'number' ? rawCore.age : null,
    nationality: rawCore?.citizenship ?? '',
    flag: rawCore?.flag?.href ?? '',
    height: cm(rawCore?.height),
    weight: kg(rawCore?.weight),
    team: rawCore?.team?.displayName ?? '',
    labels: Array.isArray(block?.labels) ? block.labels : [],
    games,
  }
}
/* eslint-enable @typescript-eslint/no-explicit-any */

const BASE = 'https://site.api.espn.com/apis'
const CORE = 'https://sports.core.api.espn.com/v2/sports/soccer/leagues'
const WEB = 'https://site.web.api.espn.com/apis'

export default defineEventHandler(async (event) => {
  const q = getQuery(event)
  const league = String(q.league ?? 'fra.1')
  const type = [
    'standings',
    'match',
    'team',
    'search',
    'athlete',
    'news',
  ].includes(String(q.type))
    ? String(q.type)
    : 'scoreboard'
  const date = /^\d{8}$/.test(String(q.date ?? '')) ? String(q.date) : ''
  // Display language, for the match commentary
  const lang = ['fr', 'es'].includes(String(q.lang ?? ''))
    ? String(q.lang)
    : 'en'
  const id = /^\d{1,12}$/.test(String(q.id ?? '')) ? String(q.id) : ''
  // Search query: letters, digits, spaces and dashes only
  const search = String(q.q ?? '')
    .slice(0, 40)
    .replace(/[^\p{L}\p{N} .'-]/gu, '')
    .trim()

  if (!LEAGUES.has(league)) {
    throw createError({ statusCode: 400, statusMessage: 'Unknown league' })
  }
  if (['match', 'team', 'athlete'].includes(type) && !id) {
    throw createError({ statusCode: 400, statusMessage: 'Missing id' })
  }
  if (type === 'search' && search.length < 2) {
    return { teams: [], players: [] }
  }

  const key = `${league}:${type}:${date}:${id}:${search}:${lang}`
  const ttl = type === 'scoreboard' || type === 'match' ? 45_000 : 10 * 60_000
  const hit = cache.get(key)
  if (hit && Date.now() - hit.at < hit.ttl) return hit.data

  try {
    let data: unknown
    if (type === 'scoreboard') {
      const raw = await $fetch<unknown>(
        `${BASE}/site/v2/sports/soccer/${league}/scoreboard${date ? `?dates=${date}` : ''}`,
        { timeout: 10_000 }
      )
      data = mapScoreboard(raw)
    } else if (type === 'standings') {
      const raw = await $fetch<unknown>(
        `${BASE}/v2/sports/soccer/${league}/standings`,
        { timeout: 10_000 }
      )
      data = mapStandings(raw)
    } else if (type === 'match') {
      const raw = await $fetch<unknown>(
        `${BASE}/site/v2/sports/soccer/${league}/summary?event=${id}`,
        { timeout: 10_000 }
      )
      data = mapMatch(raw, lang)
    } else if (type === 'news') {
      const raw = await $fetch<unknown>(
        `${BASE}/site/v2/sports/soccer/${league}/news?limit=20`,
        { timeout: 10_000 }
      )
      data = mapNews(raw)
    } else if (type === 'search') {
      const raw = await $fetch<unknown>(
        `${WEB}/search/v2?query=${encodeURIComponent(search)}&limit=20`,
        { timeout: 10_000 }
      )
      data = mapSearch(raw)
    } else if (type === 'athlete') {
      const [rawCore, rawOverview] = await Promise.all([
        $fetch<unknown>(`${CORE}/${league}/athletes/${id}`, {
          timeout: 10_000,
        }).catch(() => null),
        $fetch<unknown>(
          `${WEB}/common/v3/sports/soccer/${league}/athletes/${id}/overview`,
          { timeout: 10_000 }
        ).catch(() => null),
      ])
      if (!rawCore && !rawOverview) {
        throw createError({ statusCode: 404, statusMessage: 'Unknown athlete' })
      }
      data = mapAthlete(id, rawCore, rawOverview)
    } else {
      // A club can be opened from another competition (an article, a
      // search). ESPN reveals its real league, which roster, fixtures and
      // standings all depend on.
      const rawTeam = await $fetch<{
        team?: { defaultLeague?: { slug?: string } }
      }>(`${BASE}/site/v2/sports/soccer/${league}/teams/${id}`, {
        timeout: 10_000,
      })
      const own = String(rawTeam?.team?.defaultLeague?.slug ?? '')
      const lg = own && LEAGUES.has(own) ? own : league
      // Fixtures take two calls: `fixture=true` only returns upcoming
      // games, no parameter only the ones already played.
      const sched = `${BASE}/site/v2/sports/soccer/${lg}/teams/${id}/schedule`
      const [rawFixtures, rawResults, rawRoster, rawStandings] =
        await Promise.all([
          $fetch<unknown>(`${sched}?fixture=true`, { timeout: 10_000 }).catch(
            () => null
          ),
          $fetch<unknown>(sched, { timeout: 10_000 }).catch(() => null),
          $fetch<unknown>(
            `${BASE}/site/v2/sports/soccer/${lg}/teams/${id}/roster`,
            { timeout: 10_000 }
          ).catch(() => null),
          $fetch<unknown>(`${BASE}/v2/sports/soccer/${lg}/standings`, {
            timeout: 10_000,
          }).catch(() => null),
        ])

      // Early in the season there is almost nothing to show: pad with the
      // end of the previous one, which still reads as "recent matches".
      const played = countPlayed(rawResults)
      const rawPrev =
        played < 3
          ? await $fetch<unknown>(`${sched}?season=${prevSeason()}`, {
              timeout: 10_000,
            }).catch(() => null)
          : null

      data = mapTeam(
        id,
        rawTeam,
        [rawPrev, rawResults, rawFixtures],
        rawRoster,
        rawStandings
      )
    }
    cache.set(key, { at: Date.now(), ttl, data })
    return data
  } catch {
    // last known value if ESPN does not answer
    if (hit) return hit.data
    throw createError({ statusCode: 502, statusMessage: 'Scores unavailable' })
  }
})
