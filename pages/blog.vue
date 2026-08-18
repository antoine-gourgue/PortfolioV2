<template>
  <main ref="container" class="mx-auto w-full max-w-5xl px-4 pt-16 lg:px-8">
    <div class="win">
      <UiMacWindow title="Notes">
        <div class="flex min-h-[62vh]">
          <!-- Liste des notes -->
          <aside
            class="w-full shrink-0 border-r border-black/5 bg-[#FBF9F2]/80 px-3 py-4 sm:w-72"
            :class="selectedIndex !== null ? 'hidden sm:block' : ''"
          >
            <div class="mb-3 flex items-center justify-between px-2">
              <p class="text-[15px] font-bold">{{ $t('blog.title') }}</p>
              <p v-if="articles.length" class="text-[11px] text-black/35">
                {{ $t('macos.notesCount', { count: articles.length }) }}
              </p>
            </div>

            <div
              v-if="pending"
              class="px-2 py-8 text-center text-[13px] text-black/40"
            >
              {{ $t('blog.loading') }}
            </div>
            <div
              v-else-if="error"
              class="px-2 py-8 text-center text-[13px] text-red-500"
            >
              {{ $t('blog.error') }}
            </div>

            <button
              v-for="(article, i) in articles"
              :key="i"
              class="block w-full rounded-lg px-3 py-2.5 text-left transition-colors"
              :class="
                selectedIndex === i
                  ? 'bg-[#FBD75B]/60'
                  : 'hover:bg-black/5'
              "
              @click="selectedIndex = i"
            >
              <p class="truncate text-[13.5px] font-semibold text-aink">
                {{ article.title }}
              </p>
              <p class="mt-0.5 line-clamp-2 text-[12px] text-black/45">
                {{ article.snippet }}
              </p>
            </button>
          </aside>

          <!-- Contenu de la note -->
          <div class="min-w-0 flex-1 bg-white/60 p-6 sm:p-8">
            <template v-if="currentArticle">
              <button
                class="mb-4 text-[13px] font-medium text-ablue sm:hidden"
                @click="selectedIndex = null"
              >
                ‹ {{ $t('blog.title') }}
              </button>
              <h1 class="text-xl font-bold leading-snug tracking-tight">
                {{ currentArticle.title }}
              </h1>
              <p class="mt-4 max-w-2xl text-[15px] leading-relaxed text-agray">
                {{ currentArticle.snippet }}
              </p>
              <a
                :href="currentArticle.link"
                target="_blank"
                class="mt-6 inline-block rounded-md bg-ablue px-4 py-1.5 text-[13px] font-medium text-white shadow-sm transition-colors hover:bg-[#0077ed]"
              >
                {{ $t('blog.readMore') }}
              </a>
            </template>
            <div
              v-else
              class="flex h-full min-h-[300px] items-center justify-center text-[13px] text-black/30"
            >
              {{ $t('blog.description') }}
            </div>
          </div>
        </div>
      </UiMacWindow>
    </div>
  </main>
</template>

<script setup lang="ts">
const { gsap } = useGsap()

interface Article {
  title: string
  snippet: string
  link: string
}
interface MentionsResponse {
  results: Article[]
}

const { data, pending, error } = useFetch<MentionsResponse>('/api/mentions', {
  server: true,
})

const articles = computed(() => data.value?.results ?? [])
const selectedIndex = ref<number | null>(null)
const currentArticle = computed(() =>
  selectedIndex.value !== null ? articles.value[selectedIndex.value] : null
)

// Sur desktop, on présélectionne la première note dès qu'elle arrive
watch(
  articles,
  (list) => {
    if (
      list.length &&
      selectedIndex.value === null &&
      typeof window !== 'undefined' &&
      window.innerWidth >= 640
    ) {
      selectedIndex.value = 0
    }
  },
  { immediate: true }
)

const container = ref<HTMLElement | null>(null)
let ctx: gsap.Context | undefined

onMounted(() => {
  if (!container.value) return
  if (
    articles.value.length &&
    selectedIndex.value === null &&
    window.innerWidth >= 640
  ) {
    selectedIndex.value = 0
  }
  ctx = gsap.context(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.win', {
        autoAlpha: 0,
        scale: 0.94,
        y: 30,
        duration: 0.65,
        ease: 'back.out(1.2)',
      })
    })
  }, container.value)
})

onUnmounted(() => ctx?.revert())
</script>
