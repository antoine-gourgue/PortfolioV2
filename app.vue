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

// lang, hreflang et canonical générés par le module i18n
const i18nHead = useLocaleHead({ seo: true })
useHead(() => ({
  htmlAttrs: { lang: i18nHead.value.htmlAttrs?.lang },
  link: i18nHead.value.link ?? [],
  meta: i18nHead.value.meta ?? [],
}))

useHead({
  script: [
    {
      src: 'https://umami.antoinegourgue.dev/script.js',
      async: true,
      'data-website-id': '59c1f287-b36f-454d-b1e1-f16c213d1e89',
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Person',
            '@id': 'https://antoinegourgue.dev/#antoine',
            name: 'Antoine Gourgue',
            jobTitle: 'Développeur fullstack',
            url: 'https://antoinegourgue.dev',
            image: 'https://antoinegourgue.dev/og-image.jpg',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Anglet',
              addressCountry: 'FR',
            },
            alumniOf: { '@type': 'CollegeOrUniversity', name: 'Epitech' },
            worksFor: { '@type': 'Organization', name: 'Digitaleo' },
            knowsAbout: ['Vue.js', 'Nuxt', 'TypeScript', 'Node.js', 'Docker'],
            sameAs: [
              'https://github.com/antoine-gourgue',
              'https://linkedin.com/in/antoine-gourgue',
            ],
          },
          {
            '@type': 'WebSite',
            '@id': 'https://antoinegourgue.dev/#site',
            name: 'Antoine Gourgue — Portfolio',
            url: 'https://antoinegourgue.dev',
            inLanguage: ['fr-FR', 'en-US', 'es-ES'],
            author: { '@id': 'https://antoinegourgue.dev/#antoine' },
          },
        ],
      }),
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
