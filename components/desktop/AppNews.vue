<template>
  <Teleport to="body">
    <div
      v-if="desktop.state.value.apps.news"
      ref="winEl"
      class="fixed inset-0 z-40 overflow-hidden lg:inset-auto lg:left-[24%] lg:top-28 lg:w-[560px] lg:rounded-xl lg:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.45)] lg:ring-1 lg:ring-black/10"
      :style="{ zIndex: z }"
      @pointerdown="bringToFront"
    >
      <div class="flex h-full flex-col bg-white lg:h-[460px]">
        <!-- Barre de titre -->
        <div
          class="news-drag relative flex items-center gap-2 border-b border-black/10 bg-white/90 px-4 pb-2 pt-12 backdrop-blur lg:px-3 lg:py-2.5"
        >
          <button
            class="group hidden h-3 w-3 items-center justify-center rounded-full border border-[#E0443E] bg-[#FF5F57] lg:flex"
            aria-label="close"
            @click.stop="(sfx.minimize(), desktop.closeApp('news'))"
            @pointerdown.stop
          >
            <svg
              viewBox="0 0 12 12"
              class="h-full w-full p-[1px] opacity-0 group-hover:opacity-100"
            >
              <path
                d="M3.6 3.6 L8.4 8.4 M8.4 3.6 L3.6 8.4"
                stroke="#820005"
                stroke-width="1.2"
                stroke-linecap="round"
              />
            </svg>
          </button>
          <button
            class="group hidden h-3 w-3 items-center justify-center rounded-full border border-[#D89E24] bg-[#FEBC2E] lg:flex"
            aria-label="minimize"
            @click.stop="(sfx.minimize(), desktop.minimizeApp('news'))"
            @pointerdown.stop
          >
            <svg
              viewBox="0 0 12 12"
              class="h-full w-full p-[1px] opacity-0 group-hover:opacity-100"
            >
              <path
                d="M2.6 6 L9.4 6"
                stroke="#985712"
                stroke-width="1.4"
                stroke-linecap="round"
              />
            </svg>
          </button>
          <span
            class="hidden h-3 w-3 rounded-full border border-black/10 bg-[#DDDDDF] lg:block"
          ></span>
          <button
            class="flex items-center gap-0.5 text-[15px] font-medium text-[#FA2D48] lg:hidden"
            @click="desktop.closeApp('news')"
          >
            <span class="text-xl leading-none">‹</span>
            {{ $t('macos.close') }}
          </button>
          <span
            class="absolute left-1/2 -translate-x-1/2 text-[13px] font-semibold text-aink"
          >
            News
          </span>
        </div>

        <!-- Onglets -->
        <div
          class="flex items-center gap-1.5 border-b border-black/5 px-4 py-2"
        >
          <button
            class="rounded-full px-3.5 py-1 text-[12.5px] font-semibold transition"
            :class="
              tab === 'headlines'
                ? 'bg-[#FA2D48] text-white'
                : 'bg-black/5 text-aink hover:bg-black/10'
            "
            @click="tab = 'headlines'"
          >
            {{ $t('macos.newsHeadlines') }}
          </button>
          <button
            class="rounded-full px-3.5 py-1 text-[12.5px] font-semibold transition"
            :class="
              tab === 'tech'
                ? 'bg-[#FA2D48] text-white'
                : 'bg-black/5 text-aink hover:bg-black/10'
            "
            @click="tab = 'tech'"
          >
            Tech
          </button>
        </div>

        <!-- Articles -->
        <div class="news-scroll flex-1 overflow-y-auto">
          <!-- Chargement -->
          <div v-if="loading" class="space-y-3 p-4">
            <div
              v-for="n in 5"
              :key="n"
              class="flex animate-pulse items-center gap-3"
            >
              <span class="h-16 w-24 shrink-0 rounded-lg bg-black/5"></span>
              <span class="flex-1 space-y-2">
                <span class="block h-3 w-3/4 rounded bg-black/5"></span>
                <span class="block h-3 w-1/2 rounded bg-black/5"></span>
              </span>
            </div>
          </div>

          <!-- ── Vue lecture ── -->
          <article v-else-if="opened">
            <button
              class="flex items-center gap-0.5 px-4 pt-3 text-[13.5px] font-medium text-[#FA2D48]"
              @click="opened = null"
            >
              <span class="text-lg leading-none">‹</span>
              {{ tab === 'headlines' ? $t('macos.newsHeadlines') : 'Tech' }}
            </button>
            <img
              v-if="opened.image"
              :src="opened.image"
              :alt="opened.title"
              class="mt-3 aspect-[2/1] w-full object-cover"
            />
            <div class="px-5 pb-6 pt-4">
              <p
                class="text-[10.5px] font-bold uppercase tracking-wider text-[#FA2D48]"
              >
                {{ opened.source }} · {{ relTime(opened.date) }}
              </p>
              <h2 class="mt-1.5 text-[19px] font-bold leading-snug text-aink">
                {{ opened.title }}
              </h2>
              <p
                v-if="opened.description"
                class="mt-3 text-[14px] leading-relaxed text-aink/80"
              >
                {{ opened.description }}
              </p>
              <p class="mt-3 text-[11px] italic text-black/35">
                {{ $t('macos.newsExcerpt') }}
              </p>
              <a
                :href="opened.link"
                target="_blank"
                rel="noopener noreferrer"
                class="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#FA2D48] py-2.5 text-[13.5px] font-semibold text-white transition hover:bg-[#e0203a]"
              >
                {{ $t('macos.newsReadFull') }} ↗
              </a>
            </div>
          </article>

          <template v-else>
            <!-- À la une : première carte en grand -->
            <button
              v-if="heroItem"
              class="group block w-full text-left"
              @click="opened = heroItem"
            >
              <div class="relative overflow-hidden">
                <img
                  :src="heroItem.image"
                  :alt="heroItem.title"
                  class="aspect-[2/1] w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                />
                <div
                  class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"
                ></div>
                <div class="absolute inset-x-0 bottom-0 p-4">
                  <p
                    class="text-[10.5px] font-bold uppercase tracking-wider text-white/70"
                  >
                    {{ heroItem.source }}
                  </p>
                  <h2
                    class="mt-0.5 text-[16px] font-bold leading-snug text-white"
                  >
                    {{ heroItem.title }}
                  </h2>
                </div>
              </div>
            </button>

            <!-- Liste -->
            <button
              v-for="item in listItems"
              :key="item.link"
              class="flex w-full items-center gap-3 border-b border-black/5 px-4 py-3 text-left transition hover:bg-black/[0.03]"
              @click="opened = item"
            >
              <span class="min-w-0 flex-1">
                <span
                  class="block text-[10px] font-bold uppercase tracking-wider text-[#FA2D48]"
                >
                  {{ item.source }}
                </span>
                <span
                  class="mt-0.5 block text-[13.5px] font-semibold leading-snug text-aink"
                >
                  {{ item.title }}
                </span>
                <span class="mt-0.5 block text-[11px] text-black/40">
                  {{ relTime(item.date) }}
                </span>
              </span>
              <img
                v-if="item.image"
                :src="item.image"
                :alt="item.title"
                class="h-16 w-24 shrink-0 rounded-lg object-cover"
                loading="lazy"
              />
            </button>

            <p
              v-if="!items.length"
              class="p-6 text-center text-[13px] text-black/40"
            >
              {{ $t('macos.newsEmpty') }}
            </p>
          </template>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
interface NewsItem {
  title: string
  link: string
  source: string
  image?: string
  description?: string
  date: number
}

const desktop = useDesktop()
const sfx = useSfx()
const track = useTrack()
const { gsap, Draggable } = useGsap()
const { locale, t } = useI18n()

const winEl = ref<HTMLElement | null>(null)
const z = ref(40)
const bringToFront = () => {
  z.value = ++desktop.state.value.topZ + 40
}

const tab = ref<'headlines' | 'tech'>('headlines')
const opened = ref<NewsItem | null>(null)
watch(opened, (item) => {
  if (item)
    track('news_article_opened', { title: item.title, source: item.source })
})
watch(tab, () => (opened.value = null))
const loading = ref(false)
const headlines = ref<NewsItem[]>([])
const tech = ref<NewsItem[]>([])

const items = computed(() =>
  tab.value === 'headlines' ? headlines.value : tech.value
)

// La grande carte : premier article illustré ; le reste en liste
const heroItem = computed(() => items.value.find((item) => item.image))
const listItems = computed(() =>
  items.value.filter((item) => item !== heroItem.value)
)

const relTime = (timestamp: number) => {
  const minutes = Math.max(1, Math.round((Date.now() - timestamp) / 60_000))
  if (minutes < 60) return t('macos.newsMinAgo', { n: minutes })
  const hours = Math.round(minutes / 60)
  if (hours < 24) return t('macos.newsHourAgo', { n: hours })
  return new Date(timestamp).toLocaleDateString(locale.value, {
    day: 'numeric',
    month: 'short',
  })
}

let fetched = false
const load = async () => {
  if (fetched) return
  fetched = true
  loading.value = true
  try {
    const data = await $fetch<{ headlines: NewsItem[]; tech: NewsItem[] }>(
      '/api/news'
    )
    headlines.value = data.headlines
    tech.value = data.tech
  } catch {
    fetched = false
  } finally {
    loading.value = false
  }
}

// ── Ouverture : animation + chargement + déplacement ──
let drags: ReturnType<typeof Draggable.create> = []
watch(
  () => desktop.state.value.apps.news,
  (open) => {
    if (!open) {
      drags.forEach((d) => d.kill())
      drags = []
      return
    }
    sfx.pop()
    load()
    nextTick(() => {
      if (!winEl.value) return
      bringToFront()
      gsap.from(winEl.value, {
        scale: 0.85,
        autoAlpha: 0,
        y: 20,
        duration: 0.35,
        ease: 'back.out(1.4)',
      })
      if (window.matchMedia('(min-width: 1024px)').matches) {
        drags = Draggable.create(winEl.value, {
          trigger: winEl.value.querySelectorAll('.news-drag'),
          cursor: 'grab',
          activeCursor: 'grabbing',
        })
      }
    })
  }
)
</script>

<style scoped>
.news-scroll {
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
}
.news-scroll::-webkit-scrollbar {
  width: 5px;
}
.news-scroll::-webkit-scrollbar-thumb {
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.2);
}
</style>
