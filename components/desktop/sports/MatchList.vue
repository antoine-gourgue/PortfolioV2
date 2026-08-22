<template>
  <p
    class="px-1 pb-2 text-[12px] font-semibold uppercase tracking-wide text-[#636366]"
  >
    {{ $t('macos.sportsOther') }}
  </p>
  <div class="sp-card grid overflow-hidden lg:grid-cols-2">
    <div
      v-for="m in matches"
      :key="m.id"
      class="sp-hit flex cursor-pointer items-center gap-3 border-t border-white/[0.07] px-4 py-3 transition first:border-t-0 active:bg-white/[0.04] lg:[&:nth-child(2)]:border-t-0"
      role="button"
      tabindex="0"
      @click="openMatch(m)"
      @keydown.enter="openMatch(m)"
    >
      <div class="w-[58px] shrink-0">
        <span
          v-if="m.state === 'in'"
          class="flex items-center gap-1 text-[11px] font-bold text-[#FF453A]"
        >
          <span
            class="sp-dot h-[6px] w-[6px] shrink-0 rounded-full bg-[#FF453A]"
          ></span>
          {{ m.detail }}
        </span>
        <span v-else class="text-[11px] font-semibold text-[#636366]">
          {{ m.state === 'pre' ? kickoff(m.date) : m.detail }}
        </span>
      </div>
      <div class="min-w-0 flex-1">
        <div
          v-for="side in ['home', 'away'] as const"
          :key="side"
          class="flex items-center gap-2.5 py-[2px]"
        >
          <img
            v-if="m[side].logo"
            :src="m[side].logo"
            :alt="m[side].name"
            class="h-5 w-5 shrink-0 object-contain"
            loading="lazy"
          />
          <span
            v-else
            class="h-5 w-5 shrink-0 rounded-full bg-[#2C2C2E]"
          ></span>
          <button
            class="sp-link min-w-0 flex-1 truncate text-left text-[13.5px]"
            :class="
              m.state === 'post' && !winner(m, side)
                ? 'font-medium text-[#8E8E93]'
                : 'font-semibold text-white'
            "
            @click.stop="openTeam(m[side], 'main')"
          >
            {{ m[side].name }}
          </button>
          <span
            v-if="m.state !== 'pre'"
            class="shrink-0 text-[14.5px] font-bold tabular-nums"
            :class="
              m.state === 'post' && !winner(m, side)
                ? 'text-[#8E8E93]'
                : 'text-white'
            "
            >{{ m[side].score }}</span
          >
        </div>
      </div>
      <span aria-hidden="true" class="sp-chev">›</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SportsMatch } from '~/types/sports'

defineProps<{ matches: SportsMatch[] }>()
const { kickoff, winner } = useSportsFormat()
const { openMatch, openTeam } = useSportsCtx()
</script>
