<template>
  <!-- Icônes météo dessinées, style Apple : soleil jaune, nuage blanc, détails colorés -->
  <svg viewBox="0 0 24 24" class="inline-block h-[1em] w-[1em] align-[-0.12em]">
    <!-- Ensoleillé -->
    <template v-if="kind === 'clear'">
      <circle cx="12" cy="12" r="4.4" fill="#FFD60A" />
      <g stroke="#FFD60A" stroke-width="1.7" stroke-linecap="round">
        <path d="M12 2.8v2.3M12 18.9v2.3M2.8 12h2.3M18.9 12h2.3" />
        <path d="M5.5 5.5l1.6 1.6M16.9 16.9l1.6 1.6M5.5 18.5l1.6-1.6M16.9 7.1l1.6-1.6" />
      </g>
    </template>

    <!-- Éclaircies : soleil derrière, nuage devant -->
    <template v-else-if="kind === 'partly'">
      <circle cx="16.2" cy="7" r="3.1" fill="#FFD60A" />
      <g stroke="#FFD60A" stroke-width="1.4" stroke-linecap="round">
        <path d="M16.2 1.6v1.6M21.6 7h-1.6M20 3.2l-1.15 1.15M12.4 3.2l1.15 1.15" />
      </g>
      <path :d="CLOUD" fill="#FFFFFF" transform="translate(-0.6, 4.2) scale(0.8)" />
    </template>

    <!-- Nuageux -->
    <path v-else-if="kind === 'cloudy'" :d="CLOUD" fill="#FFFFFF" transform="translate(0, 1.5)" />

    <!-- Brouillard -->
    <template v-else-if="kind === 'fog'">
      <path :d="CLOUD" fill="rgba(255,255,255,0.9)" transform="translate(2, -1.5) scale(0.82)" />
      <g stroke="rgba(255,255,255,0.75)" stroke-width="1.6" stroke-linecap="round">
        <path d="M6.5 18.6h11M8.5 21.4h7" />
      </g>
    </template>

    <!-- Neige -->
    <template v-else-if="kind === 'snow'">
      <path :d="CLOUD" fill="#FFFFFF" transform="translate(2, -1.5) scale(0.82)" />
      <circle cx="8" cy="19.8" r="1" fill="#FFFFFF" />
      <circle cx="12" cy="21" r="1" fill="#FFFFFF" />
      <circle cx="16" cy="19.8" r="1" fill="#FFFFFF" />
    </template>

    <!-- Orage -->
    <template v-else-if="kind === 'storm'">
      <path :d="CLOUD" fill="#FFFFFF" transform="translate(2, -1.5) scale(0.82)" />
      <path d="M13.1 15.6 L9.7 20.4 h2.1 L10.9 23.8 L15 18.8 h-2.2 Z" fill="#FFD60A" />
    </template>

    <!-- Pluie -->
    <template v-else>
      <path :d="CLOUD" fill="#FFFFFF" transform="translate(2, -1.5) scale(0.82)" />
      <g stroke="#7CC1FF" stroke-width="1.7" stroke-linecap="round">
        <path d="M8.3 18.4l-1.1 2.8M12.3 18.4l-1.1 2.8M16.3 18.4l-1.1 2.8" />
      </g>
    </template>
  </svg>
</template>

<script setup lang="ts">
const props = defineProps<{ code: number }>()

// Nuage (tracé heroicons, MIT)
const CLOUD =
  'M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z'

const kind = computed(() => {
  const c = props.code
  if (c === 0) return 'clear'
  if (c <= 2) return 'partly'
  if (c === 3) return 'cloudy'
  if (c === 45 || c === 48) return 'fog'
  if (c >= 71 && c <= 86 && c !== 80 && c !== 81 && c !== 82) return 'snow'
  if (c >= 95) return 'storm'
  return 'rain'
})
</script>
