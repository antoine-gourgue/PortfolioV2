<template>
  <div v-if="loading" class="grid gap-2.5 lg:grid-cols-2">
    <div v-for="i in 4" :key="`skn-${i}`" class="sp-card p-3">
      <span class="sp-skel mb-3 block h-24 !rounded-[12px]"></span>
      <span class="sp-skel mb-2 block h-3.5 w-full"></span>
      <span class="sp-skel block h-3.5 w-2/3"></span>
    </div>
  </div>
  <p
    v-else-if="error || !articles.length"
    class="py-16 text-center text-[14px] text-[#636366]"
  >
    {{ $t('macos.sportsError') }}
  </p>
  <div v-else class="grid gap-2.5 lg:grid-cols-2">
    <article
      v-for="a in articles"
      :key="a.id"
      class="sp-card flex flex-col overflow-hidden"
    >
      <a
        :href="a.link"
        target="_blank"
        rel="noopener noreferrer"
        class="sp-news group block"
        @click="track('sports_article_opened', { title: a.headline })"
      >
        <img
          v-if="a.image"
          :src="a.image"
          :alt="a.headline"
          class="h-32 w-full object-cover"
          loading="lazy"
        />
        <div class="px-4 pb-3 pt-3">
          <p
            class="mb-1 text-[11px] font-semibold uppercase tracking-wide text-[#636366]"
          >
            {{ articleDay(a.published) }}
          </p>
          <p class="text-[14px] font-semibold leading-snug text-white">
            {{ a.headline }}
            <span aria-hidden="true" class="sp-chev sp-chev-inline ml-0.5"
              >↗</span
            >
          </p>
          <p
            v-if="a.description"
            class="mt-1 line-clamp-2 text-[12.5px] leading-snug text-[#8E8E93]"
          >
            {{ a.description }}
          </p>
        </div>
      </a>
      <!-- Clubs et joueurs cités, cliquables -->
      <div v-if="a.entities.length" class="flex flex-wrap gap-1.5 px-4 pb-3.5">
        <button
          v-for="e in a.entities"
          :key="e.kind + e.id"
          class="rounded-full bg-white/[0.07] px-2.5 py-[3px] text-[11.5px] font-medium text-[#C7C7CC] transition-colors duration-200 lg:hover:bg-white/[0.14] lg:hover:text-white"
          @click="openEntity(e)"
        >
          {{ e.name }}
        </button>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import type { NewsArticle, NewsEntity } from '~/types/sports'

defineProps<{ articles: NewsArticle[]; loading: boolean; error: boolean }>()

const track = useTrack()
const { articleDay } = useSportsFormat()
const { openTeam, openAthlete } = useSportsCtx()

// Un club ou un joueur cité dans un article s'ouvre dans l'app
const openEntity = (e: NewsEntity) => {
  if (e.kind === 'team') openTeam({ id: e.id, name: e.name }, 'main')
  else openAthlete(e.id, e.name, 'main')
}
</script>
