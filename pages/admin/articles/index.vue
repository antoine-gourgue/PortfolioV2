<template>
  <section class="space-y-5">
    <header class="flex flex-wrap items-start justify-between gap-3">
      <div>
        <p class="text-xs uppercase tracking-[0.16em] text-slate-500">
          Articles
        </p>
        <h1 class="mt-2 text-3xl font-semibold text-slate-900">
          Bibliotheque de contenu
        </h1>
      </div>
      <NuxtLink
        :to="localePath('/admin/articles/new')"
        class="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
      >
        <i class="fas fa-plus text-xs"></i>
        <span>Creer un article</span>
      </NuxtLink>
    </header>

    <div class="space-y-2 rounded-2xl bg-slate-50 p-3 shadow-sm">
      <div v-if="pending" class="px-3 py-3 text-sm text-slate-600">
        Chargement des articles...
      </div>
      <div v-else-if="error" class="px-3 py-3 text-sm text-red-600">
        Impossible de charger les articles.
      </div>
      <div
        v-else-if="!data?.articles?.length"
        class="px-3 py-3 text-sm text-slate-600"
      >
        Aucun article trouve.
      </div>

      <template v-else>
        <article
          v-for="article in data.articles"
          :key="article.id"
          class="grid grid-cols-1 gap-3 rounded-xl bg-white px-4 py-3 shadow-sm md:grid-cols-[1fr,170px,220px] md:items-center"
        >
          <div class="min-w-0">
            <p class="truncate text-sm font-medium text-slate-900">
              {{ article.title }}
            </p>
            <p class="mt-1 text-xs text-slate-500">
              {{ article.readingTime || '-' }}
            </p>
          </div>

          <p class="text-sm text-slate-600">
            {{ formatDate(article.publishedAt) }}
          </p>

          <div class="flex flex-wrap justify-start gap-2 md:justify-end">
            <NuxtLink
              :to="localePath(`/articles/${article.slug}`)"
              target="_blank"
              class="rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs text-slate-700 transition hover:bg-slate-200"
            >
              Voir
            </NuxtLink>
            <NuxtLink
              :to="localePath(`/admin/articles/${article.slug}`)"
              class="rounded-lg bg-slate-900 px-2.5 py-1.5 text-xs text-white transition hover:bg-slate-800"
            >
              Modifier
            </NuxtLink>
            <button
              type="button"
              class="rounded-lg bg-red-50 px-2.5 py-1.5 text-xs text-red-600 transition hover:bg-red-100 disabled:opacity-60"
              :disabled="deletingSlug === article.slug"
              @click="openDeleteModal(article)"
            >
              {{
                deletingSlug === article.slug ? 'Suppression...' : 'Supprimer'
              }}
            </button>
          </div>
        </article>
      </template>
    </div>

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

    <Teleport to="body">
      <div
        v-if="articleToDelete"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <button
          type="button"
          class="absolute inset-0 bg-black/40"
          aria-label="Fermer"
          @click="closeDeleteModal"
        />
        <article
          class="relative w-full max-w-md rounded-2xl bg-white p-5 shadow-xl"
        >
          <p class="text-xs uppercase tracking-wide text-slate-500">
            Suppression
          </p>
          <h2 class="mt-2 text-xl font-semibold text-slate-900">
            Confirmer l action
          </h2>
          <p class="mt-2 text-sm text-slate-600">
            Vous allez supprimer
            <span class="font-semibold text-slate-900">{{
              articleToDelete.title
            }}</span>
            .
          </p>
          <div class="mt-5 flex justify-end gap-2">
            <button
              type="button"
              class="rounded-lg bg-slate-100 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-200"
              :disabled="deletingSlug === articleToDelete.slug"
              @click="closeDeleteModal"
            >
              Annuler
            </button>
            <button
              type="button"
              class="rounded-lg bg-red-600 px-4 py-2 text-sm text-white transition hover:bg-red-700 disabled:opacity-60"
              :disabled="deletingSlug === articleToDelete.slug"
              @click="confirmDeleteArticle"
            >
              {{
                deletingSlug === articleToDelete.slug
                  ? 'Suppression...'
                  : 'Supprimer'
              }}
            </button>
          </div>
        </article>
      </div>
    </Teleport>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth',
})

interface ArticleSummary {
  id: string
  slug: string
  title: string
  publishedAt: string
  readingTime?: string
}

interface ArticlesResponse {
  articles: ArticleSummary[]
}

const localePath = useLocalePath()
const { locale } = useI18n()

const deletingSlug = ref<string | null>(null)
const articleToDelete = ref<ArticleSummary | null>(null)
const status = ref<{ type: 'success' | 'error'; message: string } | null>(null)

const { data, error, pending, refresh } = await useFetch<ArticlesResponse>(
  '/api/articles',
  {
    query: computed(() => ({ locale: locale.value })),
    watch: [locale],
  }
)

const openDeleteModal = (article: ArticleSummary) => {
  status.value = null
  articleToDelete.value = article
}

const closeDeleteModal = () => {
  if (deletingSlug.value) return
  articleToDelete.value = null
}

const confirmDeleteArticle = async () => {
  if (!articleToDelete.value) return
  status.value = null
  const slug = articleToDelete.value.slug

  deletingSlug.value = slug
  try {
    await $fetch(`/api/articles/${slug}`, { method: 'DELETE' })
    await refresh()
    status.value = { type: 'success', message: 'Article supprime.' }
    articleToDelete.value = null
  } catch (err) {
    status.value = {
      type: 'error',
      message:
        (err as { data?: { statusMessage?: string } })?.data?.statusMessage ||
        'Suppression impossible.',
    }
  } finally {
    deletingSlug.value = null
  }
}

const formatDate = (isoDate: string) =>
  new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(
    new Date(isoDate)
  )
</script>
