<template>
  <section class="space-y-5">
    <header>
      <p class="text-xs uppercase tracking-[0.16em] text-slate-500">Creation</p>
      <h1 class="mt-2 text-3xl font-semibold text-slate-900">Nouvel article</h1>
      <p class="mt-2 text-sm text-slate-600">
        Renseigne les contenus FR, EN et ES avant publication.
      </p>
    </header>

    <section class="rounded-2xl bg-slate-50 p-4 shadow-sm">
      <h2 class="text-base font-semibold text-slate-900">
        Assistant de brouillon
      </h2>
      <div class="mt-3 grid grid-cols-1 gap-3 md:grid-cols-3">
        <div class="md:col-span-2">
          <label class="mb-1 block text-sm text-slate-600">Sujet</label>
          <input
            v-model="generation.topic"
            type="text"
            class="w-full rounded-lg bg-white px-3 py-2 outline-none transition focus:ring-2 focus:ring-slate-300"
            placeholder="Ex: Tendances UX en 2026"
          />
        </div>
        <div>
          <label class="mb-1 block text-sm text-slate-600">Ton</label>
          <input
            v-model="generation.tone"
            type="text"
            class="w-full rounded-lg bg-white px-3 py-2 outline-none transition focus:ring-2 focus:ring-slate-300"
            placeholder="professionnel"
          />
        </div>
      </div>
      <div class="mt-3 max-w-xs">
        <label class="mb-1 block text-sm text-slate-600">Longueur cible</label>
        <input
          v-model.number="generation.targetLength"
          type="number"
          min="350"
          max="1500"
          class="w-full rounded-lg bg-white px-3 py-2 outline-none transition focus:ring-2 focus:ring-slate-300"
        />
      </div>
      <div class="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          class="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 disabled:opacity-60"
          :disabled="isGenerating"
          @click="generateWithMistral"
        >
          {{ isGenerating ? 'Generation...' : 'Generer FR/EN/ES' }}
        </button>
        <p
          v-if="generationError"
          class="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600"
        >
          {{ generationError }}
        </p>
      </div>
    </section>

    <form class="space-y-4" @submit.prevent="createArticle">
      <div class="grid grid-cols-1 gap-3 xl:grid-cols-3">
        <article
          v-for="loc in localeOrder"
          :key="loc"
          class="rounded-2xl bg-white p-4 shadow-sm"
        >
          <div
            class="mb-3 inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium uppercase tracking-wide text-slate-700"
          >
            {{ loc.toUpperCase() }}
          </div>

          <label class="mb-1 block text-sm text-slate-600">Titre</label>
          <input
            v-model="form.title[loc]"
            type="text"
            class="mb-3 w-full rounded-lg bg-slate-50 px-3 py-2 outline-none transition focus:bg-white focus:ring-2 focus:ring-slate-300"
          />

          <label class="mb-1 block text-sm text-slate-600">Resume</label>
          <textarea
            v-model="form.excerpt[loc]"
            rows="3"
            class="mb-3 w-full rounded-lg bg-slate-50 px-3 py-2 outline-none transition focus:bg-white focus:ring-2 focus:ring-slate-300"
          />

          <label class="mb-1 block text-sm text-slate-600">Contenu</label>
          <textarea
            v-model="form.content[loc]"
            rows="8"
            class="mb-3 w-full rounded-lg bg-slate-50 px-3 py-2 outline-none transition focus:bg-white focus:ring-2 focus:ring-slate-300"
          />

          <label class="mb-1 block text-sm text-slate-600"
            >Tags (separes par des virgules)</label
          >
          <input
            v-model="form.tagsInput[loc]"
            type="text"
            class="mb-3 w-full rounded-lg bg-slate-50 px-3 py-2 outline-none transition focus:bg-white focus:ring-2 focus:ring-slate-300"
            placeholder="design, ux, produit"
          />

          <label class="mb-1 block text-sm text-slate-600"
            >URL image de couverture</label
          >
          <input
            v-model="form.coverImage[loc]"
            type="text"
            class="w-full rounded-lg bg-slate-50 px-3 py-2 outline-none transition focus:bg-white focus:ring-2 focus:ring-slate-300"
            placeholder="https://..."
          />
        </article>
      </div>

      <div class="rounded-2xl bg-white p-4 shadow-sm">
        <div class="flex flex-wrap items-center gap-3">
          <button
            class="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 disabled:opacity-60"
            :disabled="isSaving"
          >
            {{ isSaving ? 'Publication...' : 'Publier l article' }}
          </button>
          <p
            v-if="status"
            class="rounded-lg px-3 py-2 text-sm"
            :class="
              status.type === 'error'
                ? 'bg-red-50 text-red-600'
                : 'bg-emerald-50 text-emerald-700'
            "
          >
            {{ status.message }}
          </p>
        </div>
      </div>
    </form>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth',
})

type Locale = 'fr' | 'en' | 'es'

interface DraftByLocale {
  title: string
  excerpt: string
  content: string
  readingTime: string
}

interface DraftResponse {
  drafts: Partial<Record<Locale, DraftByLocale>>
  tagsByLocale?: Partial<Record<Locale, string[]>>
}

const localePath = useLocalePath()
const localeOrder: Locale[] = ['fr', 'en', 'es']

const form = reactive({
  title: { fr: '', en: '', es: '' },
  excerpt: { fr: '', en: '', es: '' },
  content: { fr: '', en: '', es: '' },
  tagsInput: { fr: '', en: '', es: '' },
  coverImage: { fr: '', en: '', es: '' },
})

const isSaving = ref(false)
const isGenerating = ref(false)
const generationError = ref('')
const status = ref<{ type: 'success' | 'error'; message: string } | null>(null)
const generation = reactive({
  topic: '',
  tone: 'professionnel',
  targetLength: 700,
})

const generateWithMistral = async () => {
  generationError.value = ''

  if (!generation.topic.trim()) {
    generationError.value = 'Le sujet est obligatoire.'
    return
  }

  isGenerating.value = true
  try {
    const result = await $fetch<DraftResponse>('/api/articles/generate', {
      method: 'POST',
      body: {
        topic: generation.topic,
        languages: localeOrder,
        tone: generation.tone,
        targetLength: generation.targetLength,
      },
    })

    for (const loc of localeOrder) {
      const draft = result.drafts[loc]
      if (!draft) continue
      form.title[loc] = draft.title
      form.excerpt[loc] = draft.excerpt
      form.content[loc] = draft.content
      if (result.tagsByLocale?.[loc]?.length) {
        form.tagsInput[loc] = result.tagsByLocale[loc]!.join(', ')
      }
    }
  } catch (error) {
    generationError.value =
      (error as { data?: { statusMessage?: string } })?.data?.statusMessage ||
      'Generation impossible.'
  } finally {
    isGenerating.value = false
  }
}

const createArticle = async () => {
  status.value = null

  for (const loc of localeOrder) {
    if (
      !form.title[loc].trim() ||
      !form.excerpt[loc].trim() ||
      !form.content[loc].trim()
    ) {
      status.value = {
        type: 'error',
        message: `Les champs ${loc.toUpperCase()} sont obligatoires.`,
      }
      return
    }
  }

  isSaving.value = true
  try {
    const tags = localeOrder.reduce(
      (acc, loc) => {
        acc[loc] = form.tagsInput[loc]
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean)
        return acc
      },
      { fr: [], en: [], es: [] } as Record<Locale, string[]>
    )

    const response = await $fetch<{ article: { slug: string } }>(
      '/api/articles',
      {
        method: 'POST',
        body: {
          title: form.title,
          excerpt: form.excerpt,
          content: form.content,
          tags,
          coverImage: form.coverImage,
        },
      }
    )

    status.value = { type: 'success', message: 'Article cree.' }
    await navigateTo(localePath(`/admin/articles/${response.article.slug}`))
  } catch (error) {
    status.value = {
      type: 'error',
      message:
        (error as { data?: { statusMessage?: string } })?.data?.statusMessage ||
        'Creation impossible.',
    }
  } finally {
    isSaving.value = false
  }
}
</script>
