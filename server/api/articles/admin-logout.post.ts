export default defineEventHandler((event) => {
  deleteCookie(event, 'ag_articles_admin', {
    path: '/',
  })

  return { success: true }
})
