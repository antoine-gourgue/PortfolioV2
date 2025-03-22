<template>
  <div>
    <slot />
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Portfolio - Antoine Gourgue',
  link: [{ rel: 'icon', type: 'image/png', href: '/icon.png' }],
  meta: [
    { charset: 'UTF-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
  ],
})
</script>
