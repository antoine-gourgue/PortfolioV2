<template>
  <!--
    Icônes fidèles aux SF Symbols via Framework7 Icons (MIT).
    Police à ligatures : la taille suit le font-size du parent.
  -->
  <i
    class="f7-icons align-middle leading-none"
    style="font-size: inherit"
    aria-hidden="true"
    >{{ ligature }}</i
  >
</template>

<script setup lang="ts">
const props = defineProps<{ name: string }>()

// Correspondance nom interne → ligature Framework7 (nommage identique aux SF Symbols)
const MAP: Record<string, string> = {
  'chevron-left': 'chevron_left',
  'chevron-right': 'chevron_right',
  share: 'square_arrow_up',
  grid: 'square_grid_2x2',
  list: 'list_bullet',
  sort: 'line_horizontal_3_decrease',
  search: 'search',
  wifi: 'wifi',
  battery: 'battery_100',
  airdrop: 'antenna_radiowaves_left_right',
  clock: 'clock',
  desktop: 'desktopcomputer',
  doc: 'doc',
  download: 'arrow_down_circle',
  folder: 'folder_fill',
  laptop: 'device_laptop',
  tag: 'tag',
}

const ligature = computed(() => MAP[props.name] ?? props.name)
</script>
