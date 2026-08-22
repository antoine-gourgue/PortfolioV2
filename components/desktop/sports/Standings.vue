<template>
  <div v-if="loading" class="sp-card px-4 py-2">
    <div
      v-for="i in 10"
      :key="`sks-${i}`"
      class="flex items-center gap-3 py-[9px]"
    >
      <span class="sp-skel h-3 w-4"></span>
      <span class="sp-skel h-5 w-5 !rounded-full"></span>
      <span class="sp-skel h-3 w-32"></span>
      <span class="sp-skel ml-auto h-3 w-6"></span>
    </div>
  </div>
  <p
    v-else-if="error || !rows.length"
    class="py-16 text-center text-[14px] text-[#636366]"
  >
    {{ $t('macos.sportsError') }}
  </p>
  <div v-else class="sp-card overflow-hidden">
    <div
      class="grid grid-cols-[26px_1fr_repeat(5,30px)_38px_12px] items-center gap-1 px-4 py-2 text-[11px] font-semibold text-[#636366]"
    >
      <span>#</span>
      <span></span>
      <span class="text-center">{{ $t('macos.sportsPlayed') }}</span>
      <span class="text-center">{{ $t('macos.sportsWins') }}</span>
      <span class="text-center">{{ $t('macos.sportsDraws') }}</span>
      <span class="text-center">{{ $t('macos.sportsLosses') }}</span>
      <span class="text-center">+/-</span>
      <span class="text-center">Pts</span>
      <span></span>
    </div>
    <button
      v-for="row in rows"
      :key="row.rank + row.name"
      class="sp-row sp-hit grid w-full grid-cols-[26px_1fr_repeat(5,30px)_38px_12px] items-center gap-1 px-4 py-[9px] text-left text-[13.5px] text-white"
      @click="openTeam(row, 'main')"
    >
      <span
        class="text-[12px] font-semibold tabular-nums"
        :class="row.rank <= 3 ? 'text-[#30D158]' : 'text-[#636366]'"
        >{{ row.rank }}</span
      >
      <span class="flex min-w-0 items-center gap-2.5">
        <img
          v-if="row.logo"
          :src="row.logo"
          :alt="row.name"
          class="h-[22px] w-[22px] shrink-0 object-contain"
          loading="lazy"
        />
        <span class="truncate font-medium">{{ row.name }}</span>
      </span>
      <span class="text-center tabular-nums text-[#8E8E93]">{{
        row.played
      }}</span>
      <span class="text-center tabular-nums text-[#8E8E93]">{{
        row.wins
      }}</span>
      <span class="text-center tabular-nums text-[#8E8E93]">{{
        row.draws
      }}</span>
      <span class="text-center tabular-nums text-[#8E8E93]">{{
        row.losses
      }}</span>
      <span class="text-center tabular-nums text-[#8E8E93]">{{
        row.diff
      }}</span>
      <span class="text-center font-bold tabular-nums">{{ row.points }}</span>
      <span aria-hidden="true" class="sp-chev">›</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import type { StandingRow } from '~/types/sports'

defineProps<{ rows: StandingRow[]; loading: boolean; error: boolean }>()
const { openTeam } = useSportsCtx()
</script>
