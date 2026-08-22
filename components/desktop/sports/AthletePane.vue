<template>
  <button
    class="mb-3 flex items-center gap-0.5 text-[14px] font-medium text-[#0A84FF]"
    @click="backFromPane"
  >
    <span class="text-[18px] leading-none">‹</span>
    {{ $t('macos.sportsBack') }}
  </button>

  <div v-if="loading" class="sp-card p-5">
    <div class="flex items-center gap-4">
      <span class="sp-skel h-16 w-16 !rounded-full"></span>
      <span>
        <span class="sp-skel block h-4 w-40"></span>
        <span class="sp-skel mt-2 block h-3 w-28"></span>
      </span>
    </div>
  </div>

  <template v-else-if="detail">
    <div class="sp-card p-5">
      <div class="flex items-center gap-4">
        <span
          class="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#2C2C2E] text-[20px] font-bold tabular-nums text-[#8E8E93]"
        >
          <img
            v-if="detail.photo"
            :src="detail.photo"
            :alt="detail.name"
            class="h-full w-full object-cover"
            @error="dropPhoto(detail)"
          />
          <template v-else>{{ initials(detail.name || name) }}</template>
        </span>
        <div class="min-w-0 flex-1">
          <p class="truncate text-[19px] font-bold text-white">
            {{ detail.name || name }}
          </p>
          <p class="flex items-center gap-1.5 text-[13px] text-[#8E8E93]">
            <img
              v-if="detail.flag"
              :src="detail.flag"
              :alt="detail.nationality"
              class="h-[11px] w-[16px] rounded-[2px] object-cover"
            />
            {{
              [detail.pos ? posLabel(detail.pos) : '', detail.nationality]
                .filter(Boolean)
                .join(' · ')
            }}
          </p>
        </div>
        <span
          v-if="detail.jersey"
          class="shrink-0 text-[26px] font-bold tabular-nums text-[#3A3A3C]"
          >{{ detail.jersey }}</span
        >
      </div>

      <div
        v-if="athleteFacts.length"
        class="mt-4 grid gap-2 border-t border-white/[0.08] pt-4 text-center"
        :style="{
          gridTemplateColumns: `repeat(${athleteFacts.length}, minmax(0, 1fr))`,
        }"
      >
        <div v-for="f in athleteFacts" :key="f.labelKey">
          <p class="text-[17px] font-bold tabular-nums text-white">
            {{ f.value }}
          </p>
          <p class="text-[11px] text-[#636366]">
            {{ $t(f.labelKey) }}
          </p>
        </div>
      </div>
    </div>

    <template v-if="detail.games.length">
      <p
        class="px-1 pb-2 pt-5 text-[12px] font-semibold uppercase tracking-wide text-[#636366]"
      >
        {{ $t('macos.sportsForm') }}
      </p>
      <div class="sp-card overflow-hidden px-4 py-1">
        <div
          class="flex items-center gap-2 py-2 text-[11px] font-semibold text-[#636366]"
        >
          <span class="w-12 shrink-0">{{ $t('macos.sportsDateLabel') }}</span>
          <span class="min-w-0 flex-1"></span>
          <span
            v-for="c in athleteColumns"
            :key="c.label"
            class="w-8 shrink-0 text-center"
            >{{ c.label }}</span
          >
        </div>
        <div
          v-for="(g, i) in detail.games"
          :key="i"
          class="sp-row flex items-center gap-2 py-[10px] text-[13px] text-white"
        >
          <span
            class="w-12 shrink-0 text-[11.5px] tabular-nums text-[#636366]"
            >{{ g.date ? fixtureDay(g.date) : '–' }}</span
          >
          <span class="flex min-w-0 flex-1 items-center gap-2">
            <span class="shrink-0 text-[11px] text-[#636366]">{{
              g.home ? 'v' : '@'
            }}</span>
            <img
              v-if="g.logo"
              :src="g.logo"
              alt=""
              class="h-[18px] w-[18px] shrink-0 object-contain"
              loading="lazy"
            />
            <component
              :is="g.opponentId ? 'button' : 'span'"
              class="sp-link truncate"
              @click.stop="
                g.opponentId &&
                openTeam({ id: g.opponentId, name: g.opponent }, 'main')
              "
              >{{ g.opponent }}</component
            >
            <span
              v-if="g.result"
              class="shrink-0 text-[11.5px] tabular-nums text-[#8E8E93]"
              >{{ g.result }}</span
            >
          </span>
          <span
            v-for="c in athleteColumns"
            :key="c.label"
            class="w-8 shrink-0 text-center tabular-nums"
            :class="
              Number(g.stats[c.index]) > 0
                ? 'font-bold text-white'
                : 'text-[#636366]'
            "
            >{{ g.stats[c.index] ?? '–' }}</span
          >
        </div>
      </div>
    </template>
  </template>
  <p v-else class="py-16 text-center text-[14px] text-[#636366]">
    {{ $t('macos.sportsError') }}
  </p>
</template>

<script setup lang="ts">
import type { AthleteDetail } from '~/types/sports'

const props = defineProps<{
  detail: AthleteDetail | null
  name: string
  loading: boolean
}>()

const { fixtureDay, initials, posLabel, dropPhoto } = useSportsFormat()
const { backFromPane, openTeam } = useSportsCtx()

const athleteFacts = computed(() => {
  const a = props.detail
  if (!a) return []
  return [
    { labelKey: 'macos.sportsAgeLabel', value: a.age ? String(a.age) : '' },
    { labelKey: 'macos.sportsHeightLabel', value: a.height },
    { labelKey: 'macos.sportsWeightLabel', value: a.weight },
  ].filter((f) => f.value)
})

// SV et GA n'existent que pour les gardiens : les colonnes s'adaptent au poste
const ATHLETE_STATS = ['G', 'A', 'SHOT', 'SV', 'GA', 'YC', 'RC']
const athleteColumns = computed(() => {
  const labels = props.detail?.labels ?? []
  return ATHLETE_STATS.map((l) => ({
    label: l,
    index: labels.indexOf(l),
  })).filter((c) => c.index >= 0)
})
</script>
