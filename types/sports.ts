/** Shapes returned by /api/sports, shared by the Sports app and its panes. */

export interface SportsTeam {
  id: string
  name: string
  full: string
  logo: string
  score: string
  color: string
}

export interface MatchGoal {
  minute: string
  player: string
  playerId: string
  side: 'home' | 'away' | ''
  own: boolean
}

export interface SportsMatch {
  id: string
  date: string
  state: 'pre' | 'in' | 'post'
  detail: string
  venue: string
  goals: MatchGoal[]
  home: SportsTeam
  away: SportsTeam
}

export interface StandingRow {
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

export interface MatchEvent {
  minute: string
  kind: 'goal' | 'yellow' | 'red'
  player: string
  playerId: string
  side: 'home' | 'away' | ''
}

export interface LineupPlayer {
  id: string
  name: string
  jersey: string
  pos: string
  photo: string
  subbedIn: boolean
  subbedOut: boolean
}

export interface Lineup {
  formation: string
  starters: LineupPlayer[]
  subs: LineupPlayer[]
}

export interface CommentaryLine {
  minute: string
  text: string
  kind: string
  side: 'home' | 'away' | ''
}

export interface MatchDetail {
  venue: string
  events: MatchEvent[]
  stats: Array<{ key: string; home: string; away: string }>
  lineups: { home: Lineup | null; away: Lineup | null }
  commentary: CommentaryLine[]
}

export interface TeamFixture {
  id: string
  date: string
  state: 'pre' | 'in' | 'post'
  res: 'W' | 'D' | 'L' | ''
  home: { id: string; name: string; logo: string; score: string }
  away: { id: string; name: string; logo: string; score: string }
}

export interface TeamSeason {
  rank: number
  played: string
  wins: string
  draws: string
  losses: string
  goalsFor: string
  goalsAgainst: string
  points: string
}

export interface TeamPlayer {
  id: string
  jersey: string
  name: string
  pos: string
  age: number | null
  flag: string
  flagAlt: string
  photo: string
}

export interface TeamDetail {
  name: string
  logo: string
  record: string
  standing: string
  season: TeamSeason | null
  fixtures: TeamFixture[]
  roster: TeamPlayer[]
}

export interface AthleteGame {
  date: string
  opponent: string
  opponentId: string
  logo: string
  home: boolean
  result: string
  stats: string[]
}

export interface AthleteDetail {
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

export interface NewsEntity {
  kind: 'team' | 'athlete'
  id: string
  name: string
}

export interface NewsArticle {
  id: string
  headline: string
  description: string
  published: string
  image: string
  link: string
  entities: NewsEntity[]
}

export interface SearchHit {
  id: string
  name: string
  subtitle: string
  league: string
  image: string
}

export type SportsView = 'matches' | 'standings' | 'news'
export type SportsPane = 'main' | 'match' | 'team' | 'athlete'
export type MatchTab = 'summary' | 'lineups' | 'commentary'
