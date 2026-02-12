export default defineEventHandler((event) => {
  const authenticated = getCookie(event, 'ag_articles_admin') === '1'
  return { authenticated }
})
