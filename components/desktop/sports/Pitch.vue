<template>
  <template v-for="side in ['home', 'away'] as const" :key="`lu-${side}`">
    <div v-if="detail.lineups[side]" class="mt-3">
      <p
        class="flex items-center gap-2 px-1 pb-2 text-[12px] font-semibold uppercase tracking-wide text-[#636366]"
      >
        <img
          v-if="match[side].logo"
          :src="match[side].logo"
          alt=""
          class="h-4 w-4 object-contain"
        />
        {{ match[side].name }}
        <span class="ml-auto normal-case tracking-normal">{{
          detail.lineups[side]!.formation
        }}</span>
      </p>

      <div class="sp-pitch relative rounded-[16px] px-3 py-4">
        <svg
          class="pointer-events-none absolute inset-0 h-full w-full text-white/15"
          viewBox="0 0 100 140"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <g fill="none" stroke="currentColor" stroke-width="0.5">
            <rect x="2" y="2" width="96" height="136" rx="1" />
            <line x1="2" y1="70" x2="98" y2="70" />
            <circle cx="50" cy="70" r="12" />
            <rect x="28" y="2" width="44" height="18" />
            <rect x="28" y="120" width="44" height="18" />
            <rect x="40" y="2" width="20" height="7" />
            <rect x="40" y="131" width="20" height="7" />
          </g>
        </svg>
        <div
          v-for="(row, r) in pitchRows(detail.lineups[side])"
          :key="r"
          class="relative flex justify-around gap-1 py-2"
        >
          <button
            v-for="p in row"
            :key="p.id || p.name"
            class="group flex w-[62px] flex-col items-center gap-1 rounded-lg py-1"
            @click="openAthlete(p.id, p.name, 'match')"
          >
            <span
              class="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-black/45 text-[12px] font-bold tabular-nums text-white ring-1 ring-white/25 transition-all duration-200 group-hover:ring-white/60"
            >
              <img
                v-if="p.photo"
                :src="p.photo"
                :alt="p.name"
                class="h-full w-full object-cover"
                loading="lazy"
                @error="dropPhoto(p)"
              />
              <template v-else>{{ p.jersey || '–' }}</template>
            </span>
            <span
              class="w-full truncate text-center text-[10.5px] font-medium leading-tight text-white"
              >{{ lastName(p.name) }}</span
            >
            <span v-if="p.subbedOut" class="text-[9px] font-bold text-[#FF453A]"
              >↓</span
            >
          </button>
        </div>
      </div>

      <div
        v-if="detail.lineups[side]!.subs.length"
        class="sp-card mt-2 px-4 py-1"
      >
        <button
          v-for="p in detail.lineups[side]!.subs"
          :key="p.id || p.name"
          class="sp-row sp-hit flex w-full items-center gap-3 py-[9px] text-left text-[13.5px] text-white"
          @click="openAthlete(p.id, p.name, 'match')"
        >
          <span
            class="sp-av flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full bg-[#2C2C2E] text-[11px] font-bold tabular-nums text-[#8E8E93]"
            >{{ p.jersey || '–' }}</span
          >
          <span class="min-w-0 flex-1 truncate">{{ p.name }}</span>
          <span
            v-if="p.subbedIn"
            class="shrink-0 text-[11px] font-bold text-[#30D158]"
            >↑</span
          >
          <span class="w-9 shrink-0 text-right text-[11px] text-[#636366]">{{
            p.pos
          }}</span>
          <span aria-hidden="true" class="sp-chev">›</span>
        </button>
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
import type { LineupPlayer, MatchDetail, SportsMatch } from '~/types/sports'

defineProps<{ match: SportsMatch; detail: MatchDetail }>()
const { lastName, dropPhoto } = useSportsFormat()
const { openAthlete } = useSportsCtx()

// Starters' placement on the pitch. ESPN numbers players 1 to 11 without
// following the formation lines; the position is far more reliable for
// reconstructing the shape.
const ROWS = [
  /^G/, // goalkeeper
  /^(D|CD|CB|RB|LB|RCB|LCB|SW|RWB|LWB)/, // defense
  /^(DM|CM|M|RM|LM)/, // midfield
  /^AM/, // attacking midfield
  /^(F|S|CF|ST|RW|LW|W)/, // attack
]
const rowOf = (pos: string) => {
  const i = ROWS.findIndex((r) => r.test(pos))
  return i < 0 ? 2 : i
}
// A full-back sits wider than a center-back on the same side
const xOf = (pos: string) => {
  const side = /(-L|^L)/.test(pos) ? -1 : /(-R|^R)/.test(pos) ? 1 : 0
  const wide = /^(RB|LB|RM|LM|RW|LW|RWB|LWB)/.test(pos) ? 1 : 0.55
  return side * wide
}

const pitchRows = (lineup: { starters: LineupPlayer[] } | null) => {
  if (!lineup) return []
  const buckets: LineupPlayer[][] = [[], [], [], [], []]
  for (const p of lineup.starters) buckets[rowOf(p.pos)].push(p)
  return buckets
    .map((row) => row.sort((a, b) => xOf(a.pos) - xOf(b.pos)))
    .filter((row) => row.length)
}
</script>
