<template>
  <!-- Icône météo aux couleurs macOS : soleil jaune, nuages blancs, éclair jaune -->
  <span
    class="relative inline-flex items-center justify-center align-middle"
    style="width: 1.3em; height: 1.1em"
  >
    <!-- Éclaircies : soleil jaune derrière, nuage blanc devant -->
    <template v-if="kind === 'partly'">
      <i class="f7-icons abs -top-[0.08em] right-0 text-[0.75em] text-[#FFD60A]">sun_max_fill</i>
      <i class="f7-icons abs bottom-0 left-0 text-[0.95em] text-white">cloud_fill</i>
    </template>

    <!-- Orage : nuage blanc, éclair jaune -->
    <template v-else-if="kind === 'storm'">
      <i class="f7-icons abs top-0 left-1/2 -translate-x-1/2 text-[0.9em] text-white">cloud_fill</i>
      <i class="f7-icons abs -bottom-[0.12em] left-1/2 -translate-x-1/2 text-[0.55em] text-[#FFD60A]">bolt_fill</i>
    </template>

    <!-- Autres : un seul glyphe coloré -->
    <i v-else class="f7-icons text-[1em]" :style="{ color: single.color }">{{
      single.glyph
    }}</i>
  </span>
</template>

<script setup lang="ts">
const props = defineProps<{ code: number }>()

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

const single = computed(() => {
  switch (kind.value) {
    case 'clear':
      return { glyph: 'sun_max_fill', color: '#FFD60A' }
    case 'cloudy':
      return { glyph: 'cloud_fill', color: '#FFFFFF' }
    case 'fog':
      return { glyph: 'cloud_fog_fill', color: 'rgba(255,255,255,0.8)' }
    case 'snow':
      return { glyph: 'snow', color: '#FFFFFF' }
    default:
      return { glyph: 'cloud_rain_fill', color: '#D6EBFF' }
  }
})
</script>

<style scoped>
.abs {
  position: absolute;
  line-height: 1;
}
.f7-icons {
  line-height: 1;
}
</style>
