<template>
  <!-- Real project logo (macOS squircle), falling back to the letter icon -->
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
    /** Logo image URL; empty falls back to the letter icon */
    icon?: string
    /** Project name, used as the image's alt text */
    name?: string
    /** Letter shown by the fallback icon */
    letter?: string
    /** Top color of the fallback gradient */
    colorTop?: string
    /** Bottom color of the fallback gradient */
    colorBottom?: string
    /** Squircle background behind the logo */
    bg?: string
    /** Inset the logo (for logos that fill their canvas) */
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
