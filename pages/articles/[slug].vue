<template>
  <main
    class="bg-gray-50 min-h-screen px-6 lg:px-20 py-32 pb-24 lg:pb-32 relative overflow-hidden"
  >
    <div class="absolute inset-0 opacity-70 pointer-events-none">
      <img
        src="/assets/shape.svg"
        alt="background"
        class="w-full h-full object-cover"
      />
    </div>

    <article
      v-if="data?.article"
      class="relative z-10 max-w-4xl mx-auto bg-white border border-gray-200 rounded-3xl shadow-sm p-6 md:p-10 fade-in-up"
    >
      <NuxtLink
        :to="localePath('/articles')"
        class="inline-flex items-center text-sm text-gray-500 hover:text-black mb-6 transition"
      >
        <i class="fas fa-arrow-left mr-2"></i>{{ $t('articles.backToList') }}
      </NuxtLink>

      <h1 class="text-3xl lg:text-5xl font-extrabold leading-tight mb-5">
        {{ data.article.title }}
      </h1>

      <div
        class="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 mb-8"
      >
        <span>{{ formatDate(data.article.publishedAt) }}</span>
        <span class="hidden md:inline">•</span>
        <span>{{ data.article.readingTime }}</span>
      </div>

      <img
        v-if="data.article.coverImage"
        :src="data.article.coverImage"
        :alt="data.article.title"
        class="w-full h-auto max-h-[460px] object-cover rounded-2xl border border-gray-200 mb-8"
      />

      <div class="flex flex-wrap gap-2 mb-10">
        <span
          v-for="tag in data.article.tags"
          :key="tag"
          class="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full"
        >
          #{{ tag }}
        </span>
      </div>

      <div class="space-y-6 text-gray-700 leading-relaxed">
        <p
          v-for="(paragraph, index) in paragraphs"
          :key="`${index}-${paragraph.slice(0, 12)}`"
          class="text-base md:text-lg"
        >
          {{ paragraph }}
        </p>
      </div>
    </article>

    <section
      v-else-if="error"
      class="relative z-10 max-w-2xl mx-auto text-center border border-red-200 rounded-2xl bg-white p-10 text-red-500"
    >
      <i class="fas fa-exclamation-triangle text-4xl mb-4"></i>
      <p class="text-lg font-semibold">{{ $t('articles.notFound') }}</p>
      <NuxtLink
        :to="localePath('/articles')"
        class="inline-flex mt-5 px-5 py-2.5 rounded-full border border-gray-300 bg-white text-sm text-gray-700 hover:text-black hover:border-gray-500 transition"
      >
        {{ $t('articles.backToList') }}
      </NuxtLink>
    </section>

    <section
      v-else
      class="relative z-10 flex items-center justify-center text-gray-400"
    >
      <i class="fas fa-spinner fa-spin text-4xl"></i>
    </section>
  </main>
</template>

<script setup lang="ts">
interface ArticleDetail {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  tags: string[]
  coverImage?: string
  readingTime?: string
  publishedAt: string
}

interface ArticleResponse {
  article: ArticleDetail
}

const route = useRoute()
const localePath = useLocalePath()
const { locale } = useI18n()

const slug = computed(() => route.params.slug as string)

const { data, error } = await useFetch<ArticleResponse>(
  () => `/api/articles/${slug.value}`,
  {
    query: computed(() => ({ locale: locale.value })),
    watch: [slug, locale],
  }
)

const paragraphs = computed(() => {
  const content = data.value?.article.content || ''
  return content
    .split(/\n{2,}/)
    .map((part) => part.trim())
    .filter(Boolean)
})

const formatDate = (isoDate: string) =>
  new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(
    new Date(isoDate)
  )
</script>

<style scoped>
.fade-in-up {
  animation: fadeInUp 0.8s ease-out both;
}
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
