<template>
  <!-- Drapeaux dessinés façon menu de saisie macOS : rectangle net, coins arrondis, liseré fin -->
  <span
    class="inline-block overflow-hidden rounded-[3px] align-middle shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.25)]"
  >
    <!-- Français -->
    <svg v-if="code === 'fr'" viewBox="0 0 30 20" class="block h-full w-full">
      <rect width="10" height="20" fill="#002395" />
      <rect x="10" width="10" height="20" fill="#FFFFFF" />
      <rect x="20" width="10" height="20" fill="#ED2939" />
    </svg>

    <!-- Anglais (Union Jack) -->
    <svg
      v-else-if="code === 'en'"
      viewBox="0 0 30 20"
      class="block h-full w-full"
    >
      <rect width="30" height="20" fill="#012169" />
      <path d="M0 0 L30 20 M30 0 L0 20" stroke="#FFFFFF" stroke-width="4" />
      <path d="M0 0 L30 20 M30 0 L0 20" stroke="#C8102E" stroke-width="1.6" />
      <path d="M15 0 V20 M0 10 H30" stroke="#FFFFFF" stroke-width="6.5" />
      <path d="M15 0 V20 M0 10 H30" stroke="#C8102E" stroke-width="3.8" />
    </svg>

    <!-- Espagnol -->
    <svg
      v-else-if="code === 'es'"
      viewBox="0 0 30 20"
      class="block h-full w-full"
    >
      <rect width="30" height="20" fill="#AA151B" />
      <rect y="5" width="30" height="10" fill="#F1BF00" />
    </svg>
  </span>
</template>

<script setup lang="ts">
defineProps<{ code: string }>()
</script>
