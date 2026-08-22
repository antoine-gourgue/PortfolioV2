<template>
  <button
    class="mb-3 flex items-center gap-0.5 text-[14px] font-medium text-[#0A84FF]"
    @click="backFromPane"
  >
    <span class="text-[18px] leading-none">‹</span>
    {{ $t('macos.sportsBack') }}
  </button>

  <div v-if="loading" class="sp-card p-5">
    <div class="flex items-center gap-3">
      <span class="sp-skel h-12 w-12 !rounded-full"></span>
      <span>
        <span class="sp-skel block h-4 w-36"></span>
        <span class="sp-skel mt-2 block h-3 w-24"></span>
      </span>
    </div>
  </div>

  <template v-else-if="detail">
    <div class="sp-card p-5">
      <div class="flex items-center gap-3.5">
        <img
          v-if="detail.logo"
          :src="detail.logo"
          :alt="detail.name"
          class="h-14 w-14 object-contain"
        />
        <div class="min-w-0 flex-1">
          <p class="truncate text-[19px] font-bold text-white">
            {{ detail.name }}
          </p>
          <p v-if="detail.standing" class="text-[13px] text-[#8E8E93]">
            {{ detail.standing }}
          </p>
        </div>
        <div v-if="teamForm.length" class="flex shrink-0 gap-1">
          <span
            v-for="(r, i) in teamForm"
            :key="i"
            class="flex h-[22px] w-[22px] items-center justify-center rounded-full text-[10px] font-bold"
            :class="FORM_STYLE[r]"
            >{{ formLetter(r) }}</span
          >
        </div>
      </div>

      <div
        v-if="detail.season"
        class="mt-4 grid grid-cols-4 gap-2 border-t border-white/[0.08] pt-4 text-center"
      >
        <div>
          <p class="text-[17px] font-bold tabular-nums text-white">
            {{ detail.season.rank || '–' }}
          </p>
          <p class="text-[11px] text-[#636366]">
            {{ $t('macos.sportsPosLabel') }}
          </p>
        </div>
        <div>
          <p class="text-[17px] font-bold tabular-nums text-white">
            {{ detail.season.points || '0' }}
          </p>
          <p class="text-[11px] text-[#636366]">Pts</p>
        </div>
        <div>
          <p class="text-[17px] font-bold tabular-nums text-white">
            {{ detail.season.wins }}-{{ detail.season.draws }}-{{
              detail.season.losses
            }}
          </p>
          <p class="text-[11px] text-[#636366]">
            {{ $t('macos.sportsRecordLabel') }}
          </p>
        </div>
        <div>
          <p class="text-[17px] font-bold tabular-nums text-white">
            {{ detail.season.goalsFor || '0' }}:{{
              detail.season.goalsAgainst || '0'
            }}
          </p>
          <p class="text-[11px] text-[#636366]">
            {{ $t('macos.sportsGoalsLabel') }}
          </p>
        </div>
      </div>
    </div>

    <template v-for="group in teamGroups" :key="group.titleKey">
      <p
        v-if="group.items.length"
        class="px-1 pb-2 pt-5 text-[12px] font-semibold uppercase tracking-wide text-[#636366]"
      >
        {{ $t(group.titleKey) }}
      </p>
      <div v-if="group.items.length" class="sp-card px-4 py-1">
        <div
          v-for="f in group.items"
          :key="f.id"
          class="sp-row flex items-center gap-3 py-[11px] text-[13.5px] text-white"
        >
          <span class="w-14 shrink-0 text-[12px] text-[#636366]">{{
            fixtureDay(f.date)
          }}</span>
          <span class="flex min-w-0 flex-1 items-center gap-2">
            <img
              v-if="f.home.logo"
              :src="f.home.logo"
              alt=""
              class="h-[18px] w-[18px] shrink-0 object-contain"
            />
            <component
              :is="f.home.id ? 'button' : 'span'"
              class="sp-link truncate"
              :class="
                isSelTeam(f.home.name) ? 'font-semibold' : 'text-[#8E8E93]'
              "
              @click="
                f.home.id &&
                openTeam({ id: f.home.id, name: f.home.name }, 'main')
              "
              >{{ f.home.name }}</component
            >
          </span>
          <!-- Le score ouvre la fiche du match : résumé, compositions et fil -->
          <button
            class="sp-link shrink-0 px-1 text-[13.5px] font-semibold tabular-nums"
            :aria-label="$t('macos.sportsMatchDetails')"
            @click="openFixture(f)"
          >
            {{
              f.state === 'pre'
                ? kickoff(f.date)
                : `${f.home.score} – ${f.away.score}`
            }}
          </button>
          <span class="flex min-w-0 flex-1 items-center justify-end gap-2">
            <component
              :is="f.away.id ? 'button' : 'span'"
              class="sp-link truncate text-right"
              :class="
                isSelTeam(f.away.name) ? 'font-semibold' : 'text-[#8E8E93]'
              "
              @click="
                f.away.id &&
                openTeam({ id: f.away.id, name: f.away.name }, 'main')
              "
              >{{ f.away.name }}</component
            >
            <img
              v-if="f.away.logo"
              :src="f.away.logo"
              alt=""
              class="h-[18px] w-[18px] shrink-0 object-contain"
            />
          </span>
        </div>
      </div>
    </template>

    <!-- Effectif -->
    <template v-for="group in rosterGroups" :key="group.titleKey">
      <p
        class="px-1 pb-2 pt-5 text-[12px] font-semibold uppercase tracking-wide text-[#636366]"
      >
        {{ $t(group.titleKey) }}
      </p>
      <div class="sp-card px-4 py-1">
        <button
          v-for="pl in group.players"
          :key="pl.name"
          class="sp-row sp-hit flex w-full items-center gap-3 py-[9px] text-left text-[13.5px] text-white"
          @click="openAthlete(pl.id, pl.name, 'team')"
        >
          <span
            class="sp-av flex h-[30px] w-[30px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#2C2C2E] text-[11px] font-bold tabular-nums text-[#8E8E93]"
          >
            <img
              v-if="pl.photo"
              :src="pl.photo"
              :alt="pl.name"
              class="h-full w-full object-cover"
              loading="lazy"
              @error="dropPhoto(pl)"
            />
            <template v-else>{{ pl.jersey || '–' }}</template>
          </span>
          <span class="min-w-0 flex-1 truncate">{{ pl.name }}</span>
          <img
            v-if="pl.flag"
            :src="pl.flag"
            :alt="pl.flagAlt"
            :title="pl.flagAlt"
            class="h-[13px] w-[19px] shrink-0 rounded-[2px] object-cover"
            loading="lazy"
          />
          <span
            v-if="pl.age"
            class="w-12 shrink-0 text-right text-[12px] tabular-nums text-[#636366]"
            >{{ pl.age }} {{ $t('macos.sportsYears') }}</span
          >
          <span aria-hidden="true" class="sp-chev">›</span>
        </button>
      </div>
    </template>
  </template>
  <p v-else class="py-16 text-center text-[14px] text-[#636366]">
    {{ $t('macos.sportsError') }}
  </p>
</template>

<script setup lang="ts">
import type { TeamDetail } from '~/types/sports'

const props = defineProps<{
  detail: TeamDetail | null
  loading: boolean
  selName: string
}>()

const { t } = useI18n()
const { kickoff, fixtureDay, dropPhoto } = useSportsFormat()
const { backFromPane, openTeam, openAthlete, openFixture } = useSportsCtx()

const isSelTeam = (name: string) => !!props.selName && name === props.selName

// Derniers résultats (les 5 plus récents) et 5 prochains matchs
const teamGroups = computed(() => {
  const fixtures = props.detail?.fixtures ?? []
  return [
    {
      titleKey: 'macos.sportsForm',
      items: fixtures
        .filter((f) => f.state === 'post')
        .slice(-5)
        .reverse(),
    },
    {
      titleKey: 'macos.sportsUpcoming',
      items: fixtures.filter((f) => f.state !== 'post').slice(0, 5),
    },
  ]
})

// Forme V/N/D sur les 5 derniers matchs (du plus ancien au plus récent)
const teamForm = computed(() =>
  (props.detail?.fixtures ?? [])
    .filter((f) => f.state === 'post' && f.res)
    .slice(-5)
    .map((f) => f.res)
)

// Le nul reste neutre, mais sur un gris assez clair pour que la lettre se lise
// (l'ancien `text-aink` venait de la palette claire : presque noir sur noir).
const FORM_STYLE: Record<string, string> = {
  W: 'bg-[#34C759] text-white',
  D: 'bg-[#48484A] text-white',
  L: 'bg-[#FF3B30] text-white',
}
const formLetter = (r: string) =>
  r === 'W'
    ? t('macos.sportsW')
    : r === 'L'
      ? t('macos.sportsL')
      : t('macos.sportsD')

// Effectif groupé par poste, dans l'ordre gardiens → attaquants
const ROSTER_GROUPS = [
  { pos: ['G'], titleKey: 'macos.sportsGoalkeepers' },
  { pos: ['D'], titleKey: 'macos.sportsDefenders' },
  { pos: ['M'], titleKey: 'macos.sportsMidfielders' },
  { pos: ['F', 'A'], titleKey: 'macos.sportsForwards' },
]
const rosterGroups = computed(() => {
  const roster = props.detail?.roster ?? []
  return ROSTER_GROUPS.map((g) => ({
    titleKey: g.titleKey,
    players: roster.filter((p) => g.pos.includes(p.pos)),
  })).filter((g) => g.players.length)
})
</script>
