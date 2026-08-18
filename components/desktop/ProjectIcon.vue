<template>
  <!-- Vrai logo du projet (squircle macOS), avec repli sur l'icône lettre -->
  <span
    v-if="icon"
    class="flex h-full w-full items-center justify-center overflow-hidden rounded-[22%] shadow-sm ring-1 ring-black/10"
    :style="{ background: bg }"
  >
    <img
      :src="icon"
      :alt="name"
      class="h-full w-full"
      :class="pad ? 'object-contain p-[14%]' : 'object-cover'"
      loading="lazy"
    />
  </span>
  <DesktopMacAppIcon
    v-else
    :letter="letter"
    :color-top="colorTop"
    :color-bottom="colorBottom"
  />
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    icon?: string
    name?: string
    letter?: string
    colorTop?: string
    colorBottom?: string
    bg?: string
    pad?: boolean
  }>(),
  {
    icon: '',
    name: '',
    letter: '',
    colorTop: '#4FB0F8',
    colorBottom: '#1E7BE8',
    bg: '#ffffff',
    pad: false,
  }
)
</script>
