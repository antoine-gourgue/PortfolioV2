export default defineEventHandler(async (_event) => {
  const config = useRuntimeConfig()
  const token = config.githubToken

  const res = await fetch(
    'https://api.github.com/users/antoine-gourgue/repos',
    {
      headers: {
        Authorization: `token ${token}`,
      },
    }
  )

  if (!res.ok) {
    throw createError({
      statusCode: res.status,
      message: 'Failed to fetch GitHub projects',
    })
  }

  return await res.json()
})
