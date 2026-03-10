import { hasAdminSessionAccess } from '~/server/utils/admin'

export default defineEventHandler((event) => {
  const authenticated = hasAdminSessionAccess(event)
  return { authenticated }
})
