<template>
  <section class="space-y-6">
    <header class="flex flex-wrap items-start justify-between gap-3">
      <div>
        <p class="text-xs uppercase tracking-[0.16em] text-slate-500">
          Tableau de bord
        </p>
        <h1 class="mt-2 text-3xl font-semibold text-slate-900">
          Vue d ensemble
        </h1>
        <p class="mt-2 text-sm text-slate-600">
          Acces centralise aux operations editoriales.
        </p>
      </div>
      <NuxtLink
        :to="localePath('/admin/articles/new')"
        class="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
      >
        <i class="fas fa-plus text-xs"></i>
        <span>Creer un article</span>
      </NuxtLink>
    </header>

    <div class="grid grid-cols-1 gap-3 md:grid-cols-3">
      <article class="rounded-2xl bg-slate-50 px-4 py-4 shadow-sm">
        <p class="text-xs uppercase tracking-wide text-slate-500">Articles</p>
        <p class="mt-2 text-2xl font-semibold text-slate-900">
          {{ totalArticles }}
        </p>
      </article>
      <article class="rounded-2xl bg-slate-50 px-4 py-4 shadow-sm">
        <p class="text-xs uppercase tracking-wide text-slate-500">
          Derniere publication
        </p>
        <p class="mt-2 text-base font-medium text-slate-900">
          {{ lastPublish ? formatDate(lastPublish) : '-' }}
        </p>
      </article>
      <article class="rounded-2xl bg-slate-50 px-4 py-4 shadow-sm">
        <p class="text-xs uppercase tracking-wide text-slate-500">
          Langue active
        </p>
        <p class="mt-2 text-base font-medium uppercase text-slate-900">
          {{ locale }}
        </p>
      </article>
    </div>

    <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
      <NuxtLink
        :to="localePath('/admin/articles')"
        class="group rounded-2xl bg-white px-4 py-4 shadow-sm transition hover:bg-slate-50"
      >
        <p class="text-xs uppercase tracking-wide text-slate-500">Contenu</p>
        <p class="mt-1 text-lg font-semibold text-slate-900">
          Gerer les articles
        </p>
        <p class="mt-1 text-sm text-slate-600">
          Modifier, supprimer et verifier les publications.
        </p>
      </NuxtLink>
      <NuxtLink
        :to="localePath('/admin/articles/new')"
        class="group rounded-2xl bg-white px-4 py-4 shadow-sm transition hover:bg-slate-50"
      >
        <p class="text-xs uppercase tracking-wide text-slate-500">
          Publication
        </p>
        <p class="mt-1 text-lg font-semibold text-slate-900">
          Creer un article
        </p>
        <p class="mt-1 text-sm text-slate-600">
          Rediger du contenu multilingue depuis zero.
        </p>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth',
})

interface ArticleSummary {
  publishedAt: string
}

interface ArticlesResponse {
  articles: ArticleSummary[]
}

const localePath = useLocalePath()
const { locale } = useI18n()

const { data } = await useFetch<ArticlesResponse>('/api/articles', {
  query: computed(() => ({ locale: locale.value })),
  watch: [locale],
})

const totalArticles = computed(() => data.value?.articles?.length || 0)
const lastPublish = computed(() => data.value?.articles?.[0]?.publishedAt || '')

const formatDate = (isoDate: string) =>
  new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(
    new Date(isoDate)
  )
</script>
