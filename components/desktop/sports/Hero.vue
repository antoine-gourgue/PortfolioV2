<template>
  <article
    class="relative mb-4 cursor-pointer overflow-hidden rounded-[20px] transition active:scale-[0.995] lg:min-h-[216px]"
    :style="{ backgroundImage: heroGradient }"
    role="button"
    tabindex="0"
    @click="openMatch(match)"
    @keydown.enter="openMatch(match)"
  >
    <div
      class="absolute inset-0 bg-gradient-to-b from-black/10 to-black/60"
    ></div>
    <div class="relative flex h-full flex-col justify-center px-5 py-4">
      <div class="mb-3 flex items-center gap-1.5">
        <template v-if="match.state === 'in'">
          <span
            class="sp-dot sp-glow h-[7px] w-[7px] rounded-full bg-[#FF453A]"
          ></span>
          <span
            class="text-[11px] font-extrabold uppercase tracking-[0.9px] text-white"
            >{{ $t('macos.sportsLive') }} · {{ match.detail }}</span
          >
        </template>
        <span
          v-else
          class="text-[11px] font-bold uppercase tracking-[0.9px] text-white/80"
        >
          {{ match.state === 'pre' ? matchDay(match.date) : match.detail }}
        </span>
        <span
          v-if="match.venue"
          class="ml-auto min-w-0 truncate pl-3 text-[11px] text-white/55"
          >{{ match.venue }}</span
        >
      </div>

      <div class="flex items-center">
        <button
          v-for="(side, i) in ['home', 'away'] as const"
          :key="side"
          :class="[
            'min-w-0 flex-1 rounded-xl px-1 py-1 transition duration-200 lg:hover:-translate-y-[2px]',
            i === 1 ? 'order-3' : '',
          ]"
          @click.stop="openTeam(match[side], 'main')"
        >
          <img
            v-if="match[side].logo"
            :src="match[side].logo"
            :alt="match[side].name"
            class="mx-auto mb-2 h-11 w-11 object-contain lg:h-14 lg:w-14"
          />
          <span
            class="block truncate text-[14px] font-bold text-white lg:text-[15px]"
            >{{ match[side].name }}</span
          >
        </button>
        <p
          v-if="match.state !== 'pre'"
          class="order-2 shrink-0 px-3 text-[38px] font-extrabold leading-none tabular-nums text-white lg:px-5 lg:text-[42px]"
        >
          {{ match.home.score }}<span class="mx-1.5 text-white/30">–</span
          >{{ match.away.score }}
        </p>
        <p
          v-else
          class="order-2 shrink-0 px-3 text-[24px] font-bold leading-none tabular-nums text-white lg:px-5"
        >
          {{ kickoff(match.date) }}
        </p>
      </div>

      <div
        v-if="match.goals.length"
        class="mt-3 flex gap-3 border-t border-white/[0.14] pt-3 text-[11.5px] leading-[1.65] text-white/85"
      >
        <div v-if="heroGoals.home.shown.length" class="min-w-0 flex-1">
          <component
            :is="g.playerId ? 'button' : 'p'"
            v-for="(g, i) in heroGoals.home.shown"
            :key="`gh-${i}`"
            class="sp-link block max-w-full truncate text-left"
            @click.stop="
              g.playerId && openAthlete(g.playerId, g.player, 'main')
            "
          >
            {{ g.minute }} {{ g.player
            }}<span v-if="g.own" class="text-white/55">
              {{ $t('macos.sportsOwnGoal') }}</span
            >
          </component>
          <p v-if="heroGoals.home.more" class="text-white/55">
            +{{ heroGoals.home.more }}
          </p>
        </div>
        <div
          v-if="heroGoals.away.shown.length"
          class="min-w-0 flex-1 text-right"
        >
          <component
            :is="g.playerId ? 'button' : 'p'"
            v-for="(g, i) in heroGoals.away.shown"
            :key="`ga-${i}`"
            class="sp-link ml-auto block max-w-full truncate text-right"
            @click.stop="
              g.playerId && openAthlete(g.playerId, g.player, 'main')
            "
          >
            {{ g.player
            }}<span v-if="g.own" class="text-white/55">
              {{ $t('macos.sportsOwnGoal') }}</span
            >
            {{ g.minute }}
          </component>
          <p v-if="heroGoals.away.more" class="text-white/55">
            +{{ heroGoals.away.more }}
          </p>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { MatchGoal, SportsMatch } from '~/types/sports'

const props = defineProps<{ match: SportsMatch }>()
const { kickoff, matchDay } = useSportsFormat()
const { openMatch, openTeam, openAthlete } = useSportsCtx()

// Some clubs have a very light official color (OM's white, for one):
// clamp it under a luminance ceiling so the white text stays readable.
const darken = (hex: string, fallback: string) => {
  if (!/^#[0-9a-f]{6}$/i.test(hex)) return fallback
  const rgb = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16))
  const lum = (0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]) / 255
  const k = lum > 0.5 ? 0.5 / lum : 1
  const [r, g, b] = rgb.map((c) => Math.round(c * k))
  return `rgb(${r}, ${g}, ${b})`
}

// Gradient in both clubs' colors, darkened toward the center for the text
const heroGradient = computed(() => {
  const home = darken(props.match.home.color, '#1F2937')
  const away = darken(props.match.away.color, '#374151')
  return `linear-gradient(100deg, ${home} -10%, #0B1220 45%, #0B1220 55%, ${away} 115%)`
})

// Scorers split per side, so you can see who scored for whom. Beyond
// four we summarize: the featured card must not stretch forever.
const MAX_HERO_GOALS = 4
const splitGoals = (goals: MatchGoal[], side: 'home' | 'away') => {
  const mine = goals.filter((g) => g.side === side)
  return {
    shown: mine.slice(0, MAX_HERO_GOALS),
    more: Math.max(0, mine.length - MAX_HERO_GOALS),
  }
}
const heroGoals = computed(() => ({
  home: splitGoals(props.match.goals, 'home'),
  away: splitGoals(props.match.goals, 'away'),
}))
</script>
