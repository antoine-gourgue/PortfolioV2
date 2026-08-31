import type { InjectionKey } from 'vue'
import type { SportsMatch, TeamFixture } from '~/types/sports'

/**
 * Available competitions, grouped like the Apple Sports sidebar.
 * Every code is verified to respond on ESPN's side and is present in the
 * server allowlist.
 */
export const LEAGUE_GROUPS = [
  {
    titleKey: 'macos.sportsGroupLeagues',
    leagues: [
      { code: 'fra.1', name: 'Ligue 1' },
      { code: 'eng.1', name: 'Premier League' },
      { code: 'esp.1', name: 'LaLiga' },
      { code: 'ita.1', name: 'Serie A' },
      { code: 'ger.1', name: 'Bundesliga' },
      { code: 'por.1', name: 'Liga Portugal' },
      { code: 'ned.1', name: 'Eredivisie' },
      { code: 'bel.1', name: 'Pro League' },
      { code: 'tur.1', name: 'Süper Lig' },
      { code: 'sco.1', name: 'Premiership' },
      { code: 'fra.2', name: 'Ligue 2' },
      { code: 'eng.2', name: 'Championship' },
      { code: 'usa.1', name: 'MLS' },
      { code: 'mex.1', name: 'Liga MX' },
      { code: 'bra.1', name: 'Brasileirão' },
      { code: 'arg.1', name: 'Liga Argentina' },
    ],
  },
  {
    titleKey: 'macos.sportsGroupCups',
    leagues: [
      { code: 'uefa.champions', name: 'Champions League' },
      { code: 'uefa.europa', name: 'Europa League' },
      { code: 'uefa.europa.conf', name: 'Conference League' },
      { code: 'uefa.super_cup', name: 'Supercoupe UEFA' },
      { code: 'fra.coupe_de_france', name: 'Coupe de France' },
      { code: 'eng.fa', name: 'FA Cup' },
      { code: 'esp.copa_del_rey', name: 'Copa del Rey' },
      { code: 'ita.coppa_italia', name: 'Coppa Italia' },
      { code: 'ger.dfb_pokal', name: 'DFB-Pokal' },
    ],
  },
]

export const LEAGUES = LEAGUE_GROUPS.flatMap((g) => g.leagues)

/**
 * Actions and formatters shared by the Sports app panes. Provided by
 * AppSports rather than passed as props: each pane uses three or four of
 * them and they are stable for the window's whole lifetime.
 */
export interface SportsCtx {
  openMatch: (m: SportsMatch) => void
  /** Open a match sheet from a team's fixture list */
  openFixture: (f: TeamFixture) => void
  openTeam: (team: { id: string; name: string }, from: 'main' | 'match') => void
  openAthlete: (
    id: string,
    name: string,
    from?: 'team' | 'match' | 'main'
  ) => void
  backFromPane: () => void
  kickoff: (iso: string) => string
  matchDay: (iso: string) => string
  fixtureDay: (iso: string) => string
  articleDay: (iso: string) => string
  winner: (m: SportsMatch, side: 'home' | 'away') => boolean
  initials: (full: string) => string
  lastName: (full: string) => string
  posLabel: (pos: string) => string
  dropPhoto: (p: { photo: string }) => void
}

export const SPORTS_KEY: InjectionKey<SportsCtx> = Symbol('sports')

export const useSportsCtx = () => {
  const ctx = inject(SPORTS_KEY)
  if (!ctx) throw new Error('useSportsCtx() used outside AppSports')
  return ctx
}

/**
 * Date formatters and small display helpers, kept out of the component so
 * panes do not have to re-wire useI18n themselves.
 */
export const useSportsFormat = () => {
  const { locale, t } = useI18n()

  const kickoff = (iso: string) =>
    new Intl.DateTimeFormat(locale.value, {
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(iso))

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

  const articleDay = (iso: string) =>
    iso
      ? new Intl.DateTimeFormat(locale.value, {
          day: 'numeric',
          month: 'long',
        }).format(new Date(iso))
      : ''

  const winner = (m: SportsMatch, side: 'home' | 'away') => {
    if (m.state !== 'post') return false
    const other = side === 'home' ? 'away' : 'home'
    return Number(m[side].score) > Number(m[other].score)
  }

  // Fallback when ESPN has no portrait: initials, not the jersey number,
  // which is already shown next to it.
  const initials = (full: string) => {
    const parts = full.trim().split(/\s+/).filter(Boolean)
    if (!parts.length) return '–'
    const first = parts[0][0] ?? ''
    const last = parts.length > 1 ? (parts[parts.length - 1][0] ?? '') : ''
    return (first + last).toUpperCase()
  }

  // Pitch labels are cramped: last name only
  const lastName = (full: string) => {
    const parts = full.trim().split(' ')
    return parts.length > 1 ? parts[parts.length - 1] : full
  }

  // ESPN only returns positions in English
  const POSITIONS: Record<string, string> = {
    goalkeeper: 'macos.sportsGoalkeepers',
    defender: 'macos.sportsDefenders',
    midfielder: 'macos.sportsMidfielders',
    forward: 'macos.sportsForwards',
    striker: 'macos.sportsForwards',
  }
  const posLabel = (pos: string) => {
    const key = POSITIONS[pos.trim().toLowerCase()]
    // Existing labels are plural: "Gardiens" → "Gardien"
    return key ? t(key).replace(/s$/, '') : pos
  }

  // ESPN sometimes advertises a photo that no longer exists: fall back to the number
  const dropPhoto = (p: { photo: string }) => {
    p.photo = ''
  }

  return {
    kickoff,
    matchDay,
    fixtureDay,
    articleDay,
    winner,
    initials,
    lastName,
    posLabel,
    dropPhoto,
  }
}
