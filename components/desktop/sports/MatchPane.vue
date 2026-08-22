<template>
  <button
    class="mb-3 flex items-center gap-0.5 text-[14px] font-medium text-[#0A84FF]"
    @click="backFromPane"
  >
    <span class="text-[18px] leading-none">‹</span>
    {{ $t('macos.sportsBack') }}
  </button>

  <div class="sp-card p-5">
    <p
      v-if="match.state === 'in'"
      class="mb-4 flex items-center justify-center gap-1.5 text-[12px] font-bold uppercase tracking-wide text-[#FF453A]"
    >
      <span class="sp-dot h-[7px] w-[7px] rounded-full bg-[#FF453A]"></span>
      {{ match.detail }}
    </p>
    <p
      v-else
      class="mb-4 text-center text-[12px] font-semibold uppercase tracking-wide text-[#8E8E93]"
    >
      {{ match.state === 'pre' ? matchDay(match.date) : match.detail }}
    </p>

    <div class="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
      <button
        class="flex flex-col items-center gap-2 rounded-xl p-2 transition duration-200 lg:hover:-translate-y-[2px]"
        @click="openTeam(match.home, 'match')"
      >
        <img
          v-if="match.home.logo"
          :src="match.home.logo"
          :alt="match.home.name"
          class="h-12 w-12 object-contain"
        />
        <span class="text-[13px] font-semibold text-white">{{
          match.home.name
        }}</span>
      </button>
      <p
        v-if="match.state !== 'pre'"
        class="text-[34px] font-bold tabular-nums leading-none text-white"
      >
        {{ match.home.score }}
        <span class="text-[#48484A]">–</span>
        {{ match.away.score }}
      </p>
      <p v-else class="text-[22px] font-bold text-white">
        {{ kickoff(match.date) }}
      </p>
      <button
        class="flex flex-col items-center gap-2 rounded-xl p-2 transition duration-200 lg:hover:-translate-y-[2px]"
        @click="openTeam(match.away, 'match')"
      >
        <img
          v-if="match.away.logo"
          :src="match.away.logo"
          :alt="match.away.name"
          class="h-12 w-12 object-contain"
        />
        <span class="text-[13px] font-semibold text-white">{{
          match.away.name
        }}</span>
      </button>
    </div>
    <p v-if="detail?.venue" class="mt-4 text-center text-[12px] text-[#636366]">
      {{ detail.venue }}
    </p>
  </div>

  <div v-if="loading" class="sp-card mt-3 p-5">
    <div v-for="i in 5" :key="`skd-${i}`" class="flex items-center gap-3 py-2">
      <span class="sp-skel h-3 w-9"></span>
      <span class="sp-skel h-3 w-40"></span>
    </div>
  </div>

  <template v-else-if="detail">
    <!-- Onglets : n'apparaissent que si le match a de quoi les remplir -->
    <div
      v-if="matchTabs.length > 1"
      class="mt-3 flex gap-1 rounded-[9px] bg-[#1C1C1E] p-[2px]"
    >
      <button
        v-for="tab in matchTabs"
        :key="tab"
        class="flex-1 rounded-[7px] py-[6px] text-[13px] font-semibold transition"
        :class="matchTab === tab ? 'bg-[#3A3A3C] text-white' : 'text-[#8E8E93]'"
        @click="(sfx.click(), (matchTab = tab))"
      >
        {{ $t(`macos.sportsTab_${tab}`) }}
      </button>
    </div>

    <!-- ── Compositions ── -->
    <DesktopSportsPitch
      v-if="matchTab === 'lineups'"
      :match="match"
      :detail="detail"
    />

    <!-- ── Fil du match ── -->
    <div v-else-if="matchTab === 'commentary'" class="sp-card mt-3 px-4 py-1">
      <div
        v-for="(c, i) in commentaryDesc"
        :key="i"
        class="sp-row flex gap-3 py-[10px] text-[13px] leading-snug"
      >
        <span
          class="w-10 shrink-0 text-[11.5px] font-semibold tabular-nums text-[#636366]"
          >{{ c.minute }}</span
        >
        <span
          class="mt-[3px] h-2 w-2 shrink-0 rounded-full"
          :class="commentaryDot(c.kind)"
        ></span>
        <span class="min-w-0 flex-1 text-white/90">{{ c.text }}</span>
      </div>
    </div>

    <!-- ── Résumé ── -->
    <div v-else-if="detail.events.length" class="sp-card mt-3 px-5 py-3">
      <div
        v-for="(ev, i) in detail.events"
        :key="i"
        class="flex items-center gap-2.5 py-[7px] text-[13px] text-white"
        :class="ev.side === 'away' ? 'flex-row-reverse' : ''"
      >
        <span
          class="w-11 shrink-0 text-[12px] font-semibold tabular-nums text-[#8E8E93]"
          :class="ev.side === 'away' ? 'text-left' : 'text-right'"
          >{{ ev.minute }}</span
        >
        <svg
          v-if="ev.kind === 'goal'"
          viewBox="0 0 12 12"
          class="h-3 w-3 shrink-0"
        >
          <circle cx="6" cy="6" r="5.4" fill="#fff" />
          <polygon
            points="6,3.6 8.2,5.2 7.4,7.8 4.6,7.8 3.8,5.2"
            fill="#1C1C1E"
          />
        </svg>
        <span
          v-else
          class="h-3.5 w-[9px] shrink-0 rounded-[2px]"
          :class="ev.kind === 'yellow' ? 'bg-[#FFD60A]' : 'bg-[#FF453A]'"
        ></span>
        <component
          :is="ev.playerId ? 'button' : 'span'"
          class="sp-link min-w-0 truncate"
          @click="ev.playerId && openAthlete(ev.playerId, ev.player, 'match')"
          >{{ ev.player }}</component
        >
      </div>
    </div>

    <div
      v-if="matchTab === 'summary' && detail.stats.length"
      class="sp-card mt-3 px-5 py-3"
    >
      <div
        v-for="s in detail.stats"
        :key="s.key"
        class="grid grid-cols-[48px_1fr_48px] items-center gap-2 py-[7px]"
      >
        <span
          class="text-[15px] tabular-nums"
          :class="
            statLead(s) === 'home'
              ? 'font-bold text-white'
              : 'font-medium text-[#8E8E93]'
          "
          >{{ s.home }}</span
        >
        <span class="text-center text-[12px] text-[#636366]">{{
          $t(`macos.sportsStat_${s.key}`)
        }}</span>
        <span
          class="text-right text-[15px] tabular-nums"
          :class="
            statLead(s) === 'away'
              ? 'font-bold text-white'
              : 'font-medium text-[#8E8E93]'
          "
          >{{ s.away }}</span
        >
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
import type { MatchDetail, MatchTab, SportsMatch } from '~/types/sports'

const props = defineProps<{
  match: SportsMatch
  detail: MatchDetail | null
  loading: boolean
}>()
const matchTab = defineModel<MatchTab>('tab', { required: true })

const sfx = useSfx()
const { kickoff, matchDay } = useSportsFormat()
const { backFromPane, openTeam, openAthlete } = useSportsCtx()

// Onglets réellement disponibles pour ce match
const matchTabs = computed(() => {
  const d = props.detail
  const tabs: MatchTab[] = ['summary']
  if (d?.lineups.home?.starters.length || d?.lineups.away?.starters.length) {
    tabs.push('lineups')
  }
  if (d?.commentary.length) tabs.push('commentary')
  return tabs
})
// Si on change de match, l'onglet choisi peut ne plus exister
watch(matchTabs, (tabs) => {
  if (!tabs.includes(matchTab.value)) matchTab.value = 'summary'
})

// Le plus récent en haut, comme un fil d'actualité
const commentaryDesc = computed(() =>
  [...(props.detail?.commentary ?? [])].reverse()
)
const commentaryDot = (kind: string) => {
  if (/goal/.test(kind) && !/no-goal/.test(kind)) return 'bg-[#30D158]'
  if (/red-card/.test(kind)) return 'bg-[#FF453A]'
  if (/yellow-card/.test(kind)) return 'bg-[#FFD60A]'
  if (/substitution/.test(kind)) return 'bg-[#0A84FF]'
  return 'bg-[#3A3A3C]'
}

// Le plus fort des deux en gras (possession comprise)
const statLead = (s: { home: string; away: string }) => {
  const h = parseFloat(s.home)
  const a = parseFloat(s.away)
  if (Number.isNaN(h) || Number.isNaN(a) || h === a) return ''
  return h > a ? 'home' : 'away'
}
</script>
