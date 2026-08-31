<template>
  <!-- Real weather icons: Meteocons (Bas Milius, MIT) — animated, Apple Weather style -->
  <img
    :src="`/assets/weather/${file}.svg`"
    :alt="kind"
    class="inline-block h-[1.6em] w-[1.6em] align-[-0.45em]"
    loading="lazy"
  />
</template>

<script setup lang="ts">
/** Animated weather icon for a WMO weather code */
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

const FILES: Record<string, string> = {
  clear: 'clear-day',
  partly: 'partly-cloudy-day',
  cloudy: 'cloudy',
  fog: 'fog',
  snow: 'snow',
  storm: 'thunderstorms-day',
  rain: 'rain',
}

const file = computed(() => FILES[kind.value])
</script>
