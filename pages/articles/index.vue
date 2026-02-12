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

    <section
      class="relative z-10 max-w-5xl mx-auto text-center mb-14 fade-in-up"
    >
      <h1 class="text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
        {{ $t('articles.title') }}
      </h1>
      <p class="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
        {{ $t('articles.description') }}
      </p>
    </section>

    <section
      class="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto fade-in-up"
    >
      <template v-if="data?.articles?.length">
        <NuxtLink
          v-for="article in data.articles"
          :key="article.id"
          :to="localePath(`/articles/${article.slug}`)"
          class="border border-gray-200 rounded-2xl bg-white p-6 shadow-sm hover:shadow-lg transition transform hover:-translate-y-1 hover:border-gray-400 flex flex-col justify-between min-h-[260px] group"
        >
          <div>
            <h3
              class="font-bold text-xl mb-4 text-gray-800 group-hover:underline line-clamp-2"
            >
              {{ article.title }}
            </h3>
            <p class="text-sm text-gray-500 mb-4 line-clamp-3">
              {{ article.excerpt }}
            </p>
          </div>

          <div class="mt-auto">
            <div class="flex flex-wrap gap-2 mb-4">
              <span
                v-for="tag in article.tags"
                :key="tag"
                class="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full"
              >
                #{{ tag }}
              </span>
            </div>
            <div class="flex justify-between text-xs text-gray-400">
              <span>{{ formatDate(article.publishedAt) }}</span>
              <span>{{ article.readingTime }}</span>
            </div>
          </div>
        </NuxtLink>
      </template>

      <div
        v-else-if="error"
        class="flex flex-col items-center justify-center text-center text-red-500 col-span-full mb-12 space-y-4"
      >
        <i class="fas fa-exclamation-triangle text-4xl"></i>
        <p class="text-lg font-semibold">{{ $t('articles.error') }}</p>
        <p class="text-sm text-gray-500">
          {{ $t('articles.errorDescription') }}
        </p>
      </div>

      <div
        v-else-if="pending"
        class="col-span-full flex flex-col items-center justify-center text-center text-gray-400 space-y-4"
      >
        <i class="fas fa-spinner fa-spin text-4xl"></i>
        <p>{{ $t('articles.loading') }}</p>
      </div>

      <div
        v-else
        class="col-span-full text-center border border-gray-200 rounded-2xl bg-white p-10 text-gray-500"
      >
        {{ $t('articles.empty') }}
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
interface ArticleSummary {
  id: string
  slug: string
  title: string
  excerpt: string
  tags: string[]
  readingTime?: string
  publishedAt: string
}

interface ArticlesResponse {
  articles: ArticleSummary[]
}

const localePath = useLocalePath()
const { locale } = useI18n()
const { data, error, pending } = await useFetch<ArticlesResponse>(
  '/api/articles',
  {
    query: computed(() => ({ locale: locale.value })),
    watch: [locale],
  }
)

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
