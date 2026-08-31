<template>
  <aside
    class="sports-drag absolute inset-y-0 left-0 z-30 flex w-[264px] shrink-0 flex-col border-r border-white/[0.08] bg-[#0A0A0B] px-3 pb-6 pt-12 transition-transform duration-300 ease-out lg:relative lg:z-auto lg:w-[196px] lg:translate-x-0 lg:pt-3 lg:transition-none"
    :class="drawer ? 'translate-x-0' : '-translate-x-full'"
  >
    <div class="hidden items-center gap-2 pb-4 pl-1 lg:flex">
      <button
        class="group flex h-3 w-3 items-center justify-center rounded-full border border-[#E0443E] bg-[#FF5F57]"
        aria-label="close"
        @click.stop="$emit('close')"
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
        class="group flex h-3 w-3 items-center justify-center rounded-full border border-[#D89E24] bg-[#FEBC2E]"
        aria-label="minimize"
        @click.stop="$emit('minimize')"
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
        class="h-3 w-3 rounded-full border border-white/10 bg-[#2C2C2E]"
      ></span>
    </div>

    <p
      class="px-2 pb-1.5 text-[17px] font-bold text-white lg:text-[11px] lg:font-semibold lg:text-[#636366]"
    >
      {{ $t('macos.sportsTitle') }}
    </p>

    <div class="relative mb-2 px-1">
      <svg
        viewBox="0 0 16 16"
        class="pointer-events-none absolute left-[10px] top-1/2 h-3 w-3 -translate-y-1/2 text-[#636366]"
      >
        <circle
          cx="6.8"
          cy="6.8"
          r="4.6"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
        />
        <path
          d="M10.4 10.4 L14 14"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
        />
      </svg>
      <input
        v-model="query"
        type="search"
        :placeholder="$t('macos.sportsSearchPlaceholder')"
        class="w-full rounded-[7px] bg-white/[0.08] py-[7px] pl-[26px] pr-2 text-[14px] text-white placeholder:text-[#636366] focus:outline-none focus:ring-1 focus:ring-white/25 lg:py-[5px] lg:text-[12.5px]"
        @pointerdown.stop
      />
    </div>

    <div class="sp-scroll -mx-1 min-h-0 flex-1 overflow-y-auto px-1">
      <!-- Search results, in place of the competitions -->
      <template v-if="query.trim().length >= 2">
        <p v-if="searching" class="px-2 py-3 text-[12.5px] text-[#636366]">
          {{ $t('macos.sportsSearching') }}
        </p>
        <template v-else-if="hasResults">
          <template
            v-for="grp in [
              { key: 'teams', titleKey: 'macos.sportsResultTeams' },
              { key: 'players', titleKey: 'macos.sportsResultPlayers' },
            ] as const"
            :key="grp.key"
          >
            <p
              v-if="results[grp.key].length"
              class="px-2 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wide text-[#636366]"
            >
              {{ $t(grp.titleKey) }}
            </p>
            <button
              v-for="hit in results[grp.key]"
              :key="grp.key + hit.id"
              class="mb-px flex w-full items-center gap-2 rounded-[7px] px-2 py-[7px] text-left transition-colors duration-200 hover:bg-white/[0.03]"
              @click="$emit('openHit', hit, grp.key)"
            >
              <img
                v-if="hit.image"
                :src="hit.image"
                alt=""
                class="h-5 w-5 shrink-0 object-contain"
              />
              <span
                v-else
                class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#2C2C2E] text-[9px] font-bold text-[#8E8E93]"
                >{{ initials(hit.name) }}</span
              >
              <span class="min-w-0 flex-1">
                <span
                  class="block truncate text-[13.5px] font-medium text-white lg:text-[12.5px]"
                  >{{ hit.name }}</span
                >
                <span
                  v-if="hit.subtitle"
                  class="block truncate text-[11px] text-[#636366]"
                  >{{ hit.subtitle }}</span
                >
              </span>
            </button>
          </template>
        </template>
        <p v-else class="px-2 py-3 text-[12.5px] text-[#636366]">
          {{ $t('macos.sportsNoResults') }}
        </p>
      </template>

      <template v-else>
        <template v-for="grp in LEAGUE_GROUPS" :key="grp.titleKey">
          <p
            class="px-2 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wide text-[#636366]"
          >
            {{ $t(grp.titleKey) }}
          </p>
          <button
            v-for="lg in grp.leagues"
            :key="lg.code"
            class="mb-px flex w-full items-center gap-2 rounded-[7px] px-2 py-[9px] text-left text-[15px] font-medium transition lg:py-[6px] lg:text-[13px]"
            :class="
              league === lg.code
                ? 'bg-[#2C2C2E] text-white'
                : 'text-[#8E8E93] hover:bg-white/[0.03] hover:text-white'
            "
            @click="$emit('selectLeague', lg.code)"
          >
            <span
              class="h-1.5 w-1.5 shrink-0 rounded-full"
              :class="league === lg.code ? 'bg-[#FF453A]' : 'bg-transparent'"
            ></span>
            {{ lg.name }}
          </button>
        </template>

        <div class="mx-2 my-3 border-t border-white/[0.08]"></div>
        <button
          v-for="v in ['matches', 'standings', 'news'] as const"
          :key="v"
          class="mb-px w-full rounded-[7px] px-2 py-[9px] text-left text-[15px] font-medium transition lg:py-[6px] lg:text-[13px]"
          :class="
            view === v
              ? 'bg-[#2C2C2E] text-white'
              : 'text-[#8E8E93] hover:bg-white/[0.03] hover:text-white'
          "
          @click="$emit('selectView', v)"
        >
          {{ viewLabel(v) }}
        </button>
      </template>
    </div>
  </aside>
</template>

<script setup lang="ts">
import type { SearchHit, SportsView } from '~/types/sports'

defineProps<{
  league: string
  view: SportsView
  searching: boolean
  results: { teams: SearchHit[]; players: SearchHit[] }
  hasResults: boolean
}>()

defineEmits<{
  close: []
  minimize: []
  selectLeague: [code: string]
  selectView: [v: SportsView]
  openHit: [hit: SearchHit, kind: 'teams' | 'players']
}>()

// Drawer and search field stay driven by the parent window, which resets
// them on pane changes.
const drawer = defineModel<boolean>('drawer', { required: true })
const query = defineModel<string>('query', { required: true })

const { t } = useI18n()
const VIEW_LABELS = {
  matches: 'macos.sportsMatches',
  standings: 'macos.sportsStandings',
  news: 'macos.sportsNews',
} as const
const viewLabel = (v: SportsView) => t(VIEW_LABELS[v])
</script>
