// Dépôts publics GitHub, filtrés et mis en cache.
// Sans cache, chaque visite consommait le quota du token (5000 req/h) et
// renvoyait 185 Ko de JSON brut dont la page n'utilise qu'une poignée de champs.

interface GithubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  topics?: string[]
  fork: boolean
  archived: boolean
  updated_at: string
}

const CACHE_TTL = 10 * 60 * 1000
let cache: { at: number; data: GithubRepo[] } | null = null

export default defineEventHandler(async () => {
  if (cache && Date.now() - cache.at < CACHE_TTL) return cache.data

  const token = useRuntimeConfig().githubToken

  try {
    const raw = await $fetch<GithubRepo[]>(
      'https://api.github.com/users/antoine-gourgue/repos?per_page=100&sort=updated',
      {
        timeout: 10_000,
        headers: {
          Accept: 'application/vnd.github+json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      }
    )

    // On ne renvoie que ce dont la page Projets a besoin
    const data = raw.map((r) => ({
      id: r.id,
      name: r.name,
      description: r.description,
      html_url: r.html_url,
      homepage: r.homepage,
      language: r.language,
      stargazers_count: r.stargazers_count,
      forks_count: r.forks_count,
      topics: r.topics ?? [],
      fork: r.fork,
      archived: r.archived,
      updated_at: r.updated_at,
    })) as GithubRepo[]

    cache = { at: Date.now(), data }
    return data
  } catch {
    // GitHub indisponible ou quota atteint : on ressert le cache s'il existe
    if (cache) return cache.data
    throw createError({
      statusCode: 502,
      statusMessage: 'GitHub unavailable',
    })
  }
})
