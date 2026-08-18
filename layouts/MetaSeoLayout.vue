<template>
  <div>
    <slot />
  </div>
</template>

<script setup lang="ts">
const DESCRIPTION =
  'Portfolio façon macOS d’Antoine Gourgue, développeur fullstack (Vue, Nuxt, TypeScript) — fenêtres, dock, Spotlight et apps fonctionnelles, tout codé main.'

useHead({
  title: 'Antoine Gourgue — Développeur Fullstack | Portfolio macOS',
  link: [{ rel: 'icon', type: 'image/png', href: '/icon.png' }],
  meta: [
    { charset: 'UTF-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
    { name: 'description', content: DESCRIPTION },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'Antoine Gourgue' },
    {
      property: 'og:title',
      content: 'Antoine Gourgue — Développeur Fullstack',
    },
    { property: 'og:description', content: DESCRIPTION },
    {
      property: 'og:image',
      content: 'https://antoinegourgue.dev/og-image.jpg',
    },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { name: 'twitter:card', content: 'summary_large_image' },
    {
      name: 'twitter:image',
      content: 'https://antoinegourgue.dev/og-image.jpg',
    },
  ],
})
</script>
