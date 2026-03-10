import { assertAdminAccess } from '~/server/utils/admin'
import {
  ARTICLE_LOCALES,
  estimateReadingTime,
  type ArticleLocale,
} from '~/server/utils/articles'

interface GenerateBody {
  topic?: string
  languages?: string[]
  tone?: string
  targetLength?: number
}

interface MistralResponse {
  choices?: Array<{
    message?: {
      content?: string
    }
  }>
}

interface DraftPayload {
  title?: string
  excerpt?: string
  content?: string | string[]
  tags?: string[]
}

const extractJson = (value: string) => {
  const blockMatch = value.match(/```json([\s\S]*?)```/)
  if (blockMatch?.[1]) {
    return blockMatch[1].trim()
  }

  const first = value.indexOf('{')
  const last = value.lastIndexOf('}')
  if (first === -1 || last === -1 || last <= first) {
    return null
  }

  return value.slice(first, last + 1)
}

const sanitizeJsonPayload = (value: string) => {
  let normalized = ''

  for (const char of value) {
    const code = char.charCodeAt(0)
    if (code <= 31 && code !== 9 && code !== 10 && code !== 13) {
      normalized += ' '
      continue
    }

    if (char === '\r' || char === '\n' || char === '\t') {
      normalized += ' '
      continue
    }

    normalized += char
  }

  return normalized
}

const parseDraftPayload = (raw: string): DraftPayload => {
  try {
    return JSON.parse(raw) as DraftPayload
  } catch {
    return JSON.parse(sanitizeJsonPayload(raw)) as DraftPayload
  }
}

const generateForLocale = async (
  apiKey: string,
  topic: string,
  locale: ArticleLocale,
  tone: string,
  targetLength: number
) => {
  const localeName: Record<ArticleLocale, string> = {
    fr: 'French',
    en: 'English',
    es: 'Spanish',
  }

  const systemPrompt =
    'You are an expert content writer for digital and design topics. Return strict JSON only.'

  const userPrompt = `Write a high-quality article in ${localeName[locale]} about "${topic}".
Tone: ${tone}.
Target length: around ${targetLength} words.
Focus on practical insights for digital product/design professionals.
Language rule: title, excerpt, content and tags MUST all be in ${localeName[locale]} only.
Tag rule: tags must be lowercase words/short phrases in ${localeName[locale]} (no translation mix, no English when locale is Spanish/French).
Return valid JSON with this shape:
{
  "title": "string",
  "excerpt": "string between 140 and 220 chars",
  "content": ["paragraph 1", "paragraph 2", "paragraph 3"],
  "tags": ["tag1", "tag2", "tag3", "tag4"]
}
Do not include raw line breaks inside JSON string values.
No markdown code block. No extra keys.`

  const response = await $fetch<MistralResponse>(
    'https://api.mistral.ai/v1/chat/completions',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      body: {
        model: 'mistral-small-latest',
        temperature: 0.7,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
      },
    }
  )

  const rawContent = response.choices?.[0]?.message?.content

  if (!rawContent) {
    throw createError({
      statusCode: 502,
      statusMessage: `Reponse vide de l'API Mistral pour la langue ${locale}`,
    })
  }

  const jsonContent = extractJson(rawContent)
  if (!jsonContent) {
    throw createError({
      statusCode: 502,
      statusMessage: `Impossible de parser le brouillon genere pour la langue ${locale}`,
    })
  }

  const draft = parseDraftPayload(jsonContent)
  const title = draft.title?.trim()
  const excerpt = draft.excerpt?.trim()
  const content = Array.isArray(draft.content)
    ? draft.content
        .map((part) => part.trim())
        .filter(Boolean)
        .join('\n\n')
    : draft.content?.trim()

  if (!title || !excerpt || !content) {
    throw createError({
      statusCode: 502,
      statusMessage: `Le brouillon Mistral ne contient pas tous les champs obligatoires pour ${locale}`,
    })
  }

  return {
    title,
    excerpt,
    content,
    tags: (draft.tags || []).slice(0, 6),
    readingTime: estimateReadingTime(content),
  }
}

export default defineEventHandler(async (event) => {
  assertAdminAccess(event)

  const body = await readBody<GenerateBody>(event)
  const topic = body.topic?.trim()

  if (!topic) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Le sujet est obligatoire',
    })
  }

  const config = useRuntimeConfig(event)
  const apiKey = config.mistralApiKey

  if (!apiKey) {
    throw createError({
      statusCode: 500,
      statusMessage:
        "MISTRAL_API_KEY est manquant. Definis-le dans les variables d'environnement.",
    })
  }

  const requested = body.languages?.length ? body.languages : ARTICLE_LOCALES
  const locales = requested.filter((locale): locale is ArticleLocale =>
    ARTICLE_LOCALES.includes(locale as ArticleLocale)
  )

  if (!locales.length) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Aucune langue valide demandee',
    })
  }

  const tone = body.tone || 'professionnel'
  const targetLength = Math.min(Math.max(body.targetLength || 700, 350), 1500)

  const drafts: Partial<
    Record<
      ArticleLocale,
      {
        title: string
        excerpt: string
        content: string
        readingTime: string
      }
    >
  > = {}
  const tagsByLocale: Partial<Record<ArticleLocale, string[]>> = {}

  for (const locale of locales) {
    const result = await generateForLocale(
      apiKey,
      topic,
      locale,
      tone,
      targetLength
    )
    drafts[locale] = {
      title: result.title,
      excerpt: result.excerpt,
      content: result.content,
      readingTime: result.readingTime,
    }
    tagsByLocale[locale] = result.tags
  }

  return {
    drafts,
    tagsByLocale,
  }
})
