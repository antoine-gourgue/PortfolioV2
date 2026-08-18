<template>
  <MetaSeoLayout>
    <NuxtLayout
      class="w-full overflow-x-hidden min-h-screen overflow-y-auto text-base-content"
    >
      <NuxtLoadingIndicator />
      <NuxtPage />
      <Analytics />
      <SpeedInsights />
    </NuxtLayout>
  </MetaSeoLayout>
</template>

<script setup lang="ts">
import { Analytics } from '@vercel/analytics/nuxt'
import { SpeedInsights } from '@vercel/speed-insights/nuxt'
import MetaSeoLayout from '~/layouts/MetaSeoLayout.vue'

useHead({
  script: [
    {
      src: 'https://umami.antoinegourgue.dev/script.js',
      async: true,
      'data-website-id': '59c1f287-b36f-454d-b1e1-f16c213d1e89',
    },
  ],
})
</script>

<style>
#transition-overlay {
  transition:
    transform 0.5s ease-in-out,
    opacity 0.5s ease-in-out;
  border-radius: 50%;
}

html {
  font-size: 16px;
}
</style>
