<template>
  <section class="space-y-5">
    <header class="flex flex-wrap items-start justify-between gap-3">
      <div>
        <p class="text-xs uppercase tracking-[0.16em] text-slate-500">
          Edition
        </p>
        <h1 class="mt-2 text-3xl font-semibold text-slate-900">
          Modifier l article
        </h1>
        <p class="mt-2 text-sm text-slate-600">Slug: {{ articleSlug }}</p>
      </div>
      <NuxtLink
        :to="localePath('/admin/articles')"
        class="rounded-lg bg-slate-100 px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-200"
      >
        Retour a la liste
      </NuxtLink>
    </header>

    <div
      v-if="pending"
      class="rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600"
    >
      Chargement de l article...
    </div>
    <div
      v-else-if="loadError"
      class="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600"
    >
      Impossible de charger l article.
    </div>

    <form v-else class="space-y-4" @submit.prevent="saveArticle">
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
            {{
              isSaving ? 'Enregistrement...' : 'Enregistrer les modifications'
            }}
          </button>
          <NuxtLink
            :to="localePath(`/articles/${articleSlug}`)"
            target="_blank"
            class="rounded-lg bg-slate-100 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-200"
          >
            Ouvrir la page publique
          </NuxtLink>
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

interface AdminArticleResponse {
  article: {
    slug: string
    title: Record<Locale, string>
    excerpt: Record<Locale, string>
    content: Record<Locale, string>
    tags: Record<Locale, string[]>
    coverImage?: Record<Locale, string>
  }
}

const route = useRoute()
const localePath = useLocalePath()
const localeOrder: Locale[] = ['fr', 'en', 'es']
const articleSlug = computed(() => route.params.slug as string)

const form = reactive({
  title: { fr: '', en: '', es: '' },
  excerpt: { fr: '', en: '', es: '' },
  content: { fr: '', en: '', es: '' },
  tagsInput: { fr: '', en: '', es: '' },
  coverImage: { fr: '', en: '', es: '' },
})

const isSaving = ref(false)
const status = ref<{ type: 'success' | 'error'; message: string } | null>(null)

const {
  data,
  error: loadError,
  pending,
} = await useFetch<AdminArticleResponse>(
  () => `/api/articles/${articleSlug.value}/admin`,
  { watch: [articleSlug] }
)

watchEffect(() => {
  if (!data.value?.article) return

  form.title.fr = data.value.article.title.fr || ''
  form.title.en = data.value.article.title.en || ''
  form.title.es = data.value.article.title.es || ''
  form.excerpt.fr = data.value.article.excerpt.fr || ''
  form.excerpt.en = data.value.article.excerpt.en || ''
  form.excerpt.es = data.value.article.excerpt.es || ''
  form.content.fr = data.value.article.content.fr || ''
  form.content.en = data.value.article.content.en || ''
  form.content.es = data.value.article.content.es || ''
  form.tagsInput.fr = (data.value.article.tags?.fr || []).join(', ')
  form.tagsInput.en = (data.value.article.tags?.en || []).join(', ')
  form.tagsInput.es = (data.value.article.tags?.es || []).join(', ')
  form.coverImage.fr = data.value.article.coverImage?.fr || ''
  form.coverImage.en = data.value.article.coverImage?.en || ''
  form.coverImage.es = data.value.article.coverImage?.es || ''
})

const saveArticle = async () => {
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

    await $fetch(`/api/articles/${articleSlug.value}`, {
      method: 'PUT',
      body: {
        title: form.title,
        excerpt: form.excerpt,
        content: form.content,
        tags,
        coverImage: form.coverImage,
      },
    })

    status.value = { type: 'success', message: 'Article mis a jour.' }
  } catch (error) {
    status.value = {
      type: 'error',
      message:
        (error as { data?: { statusMessage?: string } })?.data?.statusMessage ||
        'Mise a jour impossible.',
    }
  } finally {
    isSaving.value = false
  }
}
</script>
