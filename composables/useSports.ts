import type { InjectionKey } from 'vue'
import type { SportsMatch, TeamFixture } from '~/types/sports'

// Compétitions proposées, groupées comme dans la barre latérale d'Apple Sports.
// Chaque code est vérifié comme répondant côté ESPN et présent dans la liste
// blanche du serveur.
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
 * Actions et formats partagés par les panneaux de l'app Sports. Fournis par
 * AppSports plutôt que passés en propriétés : chaque panneau en utilise trois
 * ou quatre, et ils sont stables pour toute la durée de vie de la fenêtre.
 */
export interface SportsCtx {
  openMatch: (m: SportsMatch) => void
  /** Ouvre la fiche d'un match depuis le calendrier d'une équipe */
  openFixture: (f: TeamFixture) => void
  openTeam: (team: { id: string; name: string }, from: 'main' | 'match') => void
  openAthlete: (
    id: string,
    name: string,
    from?: 'team' | 'match' | 'main'
  ) => void
  backFromPane: () => void
  // formats
  kickoff: (iso: string) => string
  matchDay: (iso: string) => string
  fixtureDay: (iso: string) => string
  articleDay: (iso: string) => string
  // aides d'affichage
  winner: (m: SportsMatch, side: 'home' | 'away') => boolean
  initials: (full: string) => string
  lastName: (full: string) => string
  posLabel: (pos: string) => string
  dropPhoto: (p: { photo: string }) => void
}

export const SPORTS_KEY: InjectionKey<SportsCtx> = Symbol('sports')

export const useSportsCtx = () => {
  const ctx = inject(SPORTS_KEY)
  if (!ctx) throw new Error('useSportsCtx() hors de AppSports')
  return ctx
}

/**
 * Formats de dates et petites aides d'affichage. Séparé du composant pour que
 * les panneaux n'aient pas à réimporter useI18n.
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

  // Repli quand ESPN n'a pas de portrait : les initiales, pas le numéro, qui
  // est déjà affiché à côté.
  const initials = (full: string) => {
    const parts = full.trim().split(/\s+/).filter(Boolean)
    if (!parts.length) return '–'
    const first = parts[0][0] ?? ''
    const last = parts.length > 1 ? (parts[parts.length - 1][0] ?? '') : ''
    return (first + last).toUpperCase()
  }

  // Sur le terrain, la place manque : on n'affiche que le nom de famille
  const lastName = (full: string) => {
    const parts = full.trim().split(' ')
    return parts.length > 1 ? parts[parts.length - 1] : full
  }

  // ESPN ne renvoie les postes qu'en anglais
  const POSITIONS: Record<string, string> = {
    goalkeeper: 'macos.sportsGoalkeepers',
    defender: 'macos.sportsDefenders',
    midfielder: 'macos.sportsMidfielders',
    forward: 'macos.sportsForwards',
    striker: 'macos.sportsForwards',
  }
  const posLabel = (pos: string) => {
    const key = POSITIONS[pos.trim().toLowerCase()]
    // Les libellés existants sont au pluriel : « Gardiens » → « Gardien »
    return key ? t(key).replace(/s$/, '') : pos
  }

  // ESPN annonce parfois une photo qui n'existe plus : on retombe sur le numéro
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
