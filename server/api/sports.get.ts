// Scores et classements football via les endpoints JSON publics d'ESPN.
// Proxy + cache serveur : 45 s pour les scores (matchs en direct), 10 min pour les classements.

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

const LEAGUES = new Set([
  'fra.1',
  'eng.1',
  'esp.1',
  'ita.1',
  'ger.1',
  'uefa.champions',
])

const cache = new Map<string, { at: number; ttl: number; data: unknown }>()

/* eslint-disable @typescript-eslint/no-explicit-any */
const mapScoreboard = (raw: any): { matches: SportsMatch[] } => {
  const matches: SportsMatch[] = []
  for (const e of raw?.events ?? []) {
    const c = e?.competitions?.[0]
    if (!c) continue
    const side = (ha: string): SportsTeam => {
      const t = c.competitors?.find((x: any) => x.homeAway === ha)
      return {
        id: String(t?.team?.id ?? ''),
        name: t?.team?.shortDisplayName ?? '',
        full: t?.team?.displayName ?? '',
        logo: t?.team?.logo ?? '',
        score: t?.score ?? '',
      }
    }
    matches.push({
      id: String(e.id),
      date: e.date,
      state: e.status?.type?.state ?? 'pre',
      detail: e.status?.type?.shortDetail ?? '',
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

// Statistiques d'équipe retenues pour la fiche match, dans l'ordre d'affichage
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

const mapMatch = (raw: any): MatchDetail => {
  // id d'équipe → côté, d'après l'en-tête du match
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

  return {
    venue: raw?.gameInfo?.venue?.fullName ?? '',
    events,
    stats,
  }
}

const mapTeam = (
  teamId: string,
  rawTeam: any,
  rawSched: any,
  rawRoster: any,
  rawStandings: any
): TeamDetail => {
  const t = rawTeam?.team ?? {}

  const fixtures: TeamFixture[] = []
  for (const e of rawSched?.events ?? []) {
    const c = e?.competitions?.[0]
    if (!c) continue
    const pick = (ha: string) =>
      c.competitors?.find((y: any) => y.homeAway === ha)
    const side = (ha: string) => {
      const x = pick(ha)
      const score = x?.score
      return {
        name: x?.team?.shortDisplayName ?? '',
        logo: x?.team?.logos?.[0]?.href ?? x?.team?.logo ?? '',
        score:
          typeof score === 'object'
            ? (score?.displayValue ?? '')
            : (score ?? ''),
      }
    }
    const state = c?.status?.type?.state ?? e?.status?.type?.state ?? 'pre'
    // Résultat du point de vue de l'équipe demandée (pour la forme V/N/D)
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

  // Ligne de classement de l'équipe (rang, buts pour/contre, points…)
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
    jersey: a?.jersey ?? '',
    name: a?.displayName ?? '',
    pos: a?.position?.abbreviation ?? '',
    age: typeof a?.age === 'number' ? a.age : null,
    flag: a?.flag?.href ?? '',
    flagAlt: a?.citizenship ?? '',
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
/* eslint-enable @typescript-eslint/no-explicit-any */

const BASE = 'https://site.api.espn.com/apis'

export default defineEventHandler(async (event) => {
  const q = getQuery(event)
  const league = String(q.league ?? 'fra.1')
  const type = ['standings', 'match', 'team'].includes(String(q.type))
    ? String(q.type)
    : 'scoreboard'
  const date = /^\d{8}$/.test(String(q.date ?? '')) ? String(q.date) : ''
  const id = /^\d{1,12}$/.test(String(q.id ?? '')) ? String(q.id) : ''

  if (!LEAGUES.has(league)) {
    throw createError({ statusCode: 400, statusMessage: 'Unknown league' })
  }
  if ((type === 'match' || type === 'team') && !id) {
    throw createError({ statusCode: 400, statusMessage: 'Missing id' })
  }

  const key = `${league}:${type}:${date}:${id}`
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
      data = mapMatch(raw)
    } else {
      const [rawTeam, rawSched, rawRoster, rawStandings] = await Promise.all([
        $fetch<unknown>(`${BASE}/site/v2/sports/soccer/${league}/teams/${id}`, {
          timeout: 10_000,
        }),
        $fetch<unknown>(
          `${BASE}/site/v2/sports/soccer/${league}/teams/${id}/schedule?fixture=true`,
          { timeout: 10_000 }
        ).catch(() => null),
        $fetch<unknown>(
          `${BASE}/site/v2/sports/soccer/${league}/teams/${id}/roster`,
          { timeout: 10_000 }
        ).catch(() => null),
        $fetch<unknown>(`${BASE}/v2/sports/soccer/${league}/standings`, {
          timeout: 10_000,
        }).catch(() => null),
      ])
      data = mapTeam(id, rawTeam, rawSched, rawRoster, rawStandings)
    }
    cache.set(key, { at: Date.now(), ttl, data })
    return data
  } catch {
    // dernière valeur connue si ESPN ne répond pas
    if (hit) return hit.data
    throw createError({ statusCode: 502, statusMessage: 'Scores unavailable' })
  }
})
