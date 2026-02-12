import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto'
import type { H3Event } from 'h3'

export const ADMIN_SESSION_COOKIE = 'ag_articles_admin'
export const ADMIN_SESSION_MAX_AGE = 60 * 60 * 8

interface AdminSessionPayload {
  iat: number
  exp: number
  nonce: string
}

const getExpectedAdminKey = (event: H3Event): string => {
  const config = useRuntimeConfig(event)
  const expectedKey =
    typeof config.articleAdminKey === 'string' ? config.articleAdminKey : ''

  if (!expectedKey) {
    throw createError({
      statusCode: 500,
      statusMessage:
        'ARTICLE_ADMIN_KEY is missing. Set it in environment variables.',
    })
  }

  return expectedKey
}

const toBase64Url = (value: string) =>
  Buffer.from(value, 'utf-8').toString('base64url')

const fromBase64Url = (value: string) =>
  Buffer.from(value, 'base64url').toString('utf-8')

const safeEquals = (left: string, right: string) => {
  const leftBuffer = Buffer.from(left)
  const rightBuffer = Buffer.from(right)

  if (leftBuffer.length !== rightBuffer.length) {
    return false
  }

  return timingSafeEqual(leftBuffer, rightBuffer)
}

const signSessionPayload = (payloadSegment: string, secret: string) =>
  createHmac('sha256', secret).update(payloadSegment).digest('base64url')

const parseSessionPayload = (segment: string): AdminSessionPayload | null => {
  try {
    const payload = JSON.parse(
      fromBase64Url(segment)
    ) as Partial<AdminSessionPayload>

    if (
      typeof payload.iat !== 'number' ||
      typeof payload.exp !== 'number' ||
      typeof payload.nonce !== 'string'
    ) {
      return null
    }

    return {
      iat: payload.iat,
      exp: payload.exp,
      nonce: payload.nonce,
    }
  } catch {
    return null
  }
}

const hasValidAdminSessionToken = (
  token: string | undefined,
  secret: string
) => {
  if (!token) {
    return false
  }

  const segments = token.split('.')
  if (segments.length !== 2) {
    return false
  }

  const [payloadSegment, signatureSegment] = segments
  const expectedSignature = signSessionPayload(payloadSegment, secret)

  if (!safeEquals(signatureSegment, expectedSignature)) {
    return false
  }

  const payload = parseSessionPayload(payloadSegment)
  if (!payload) {
    return false
  }

  const now = Math.floor(Date.now() / 1000)
  return payload.iat <= now && payload.exp > now
}

export const matchesAdminKey = (
  provided: string | undefined,
  expected: string
) => {
  if (!provided) {
    return false
  }

  return safeEquals(provided, expected)
}

export const createAdminSessionToken = (
  secret: string,
  maxAge = ADMIN_SESSION_MAX_AGE
) => {
  const now = Math.floor(Date.now() / 1000)
  const payload: AdminSessionPayload = {
    iat: now,
    exp: now + maxAge,
    nonce: randomBytes(16).toString('hex'),
  }

  const payloadSegment = toBase64Url(JSON.stringify(payload))
  const signatureSegment = signSessionPayload(payloadSegment, secret)

  return `${payloadSegment}.${signatureSegment}`
}

export const hasAdminSessionAccess = (event: H3Event) => {
  const expectedKey = getExpectedAdminKey(event)
  const sessionCookie = getCookie(event, ADMIN_SESSION_COOKIE)

  return hasValidAdminSessionToken(sessionCookie, expectedKey)
}

export const assertAdminAccess = (event: H3Event) => {
  const expectedKey = getExpectedAdminKey(event)
  const providedKey = getHeader(event, 'x-admin-key')

  const hasHeaderAccess = matchesAdminKey(providedKey, expectedKey)
  const hasSessionAccess = hasValidAdminSessionToken(
    getCookie(event, ADMIN_SESSION_COOKIE),
    expectedKey
  )

  if (!hasHeaderAccess && !hasSessionAccess) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }
}
