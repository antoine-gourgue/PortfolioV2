// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      script: [{ src: 'https://kit.fontawesome.com/180b0301cc.js' }],
    },
  },
  css: ['~/assets/css/tailwind.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/image', '@nuxt/icon', '@nuxtjs/sitemap', '@nuxtjs/robots'],
  site: {
    url: 'https://antoinegourgue.dev',
    name: 'Antoine Gourgue',
  },
  runtimeConfig: {
    githubToken: process.env.VITE_GITHUB_TOKEN,
  },
  ssr: true,
})
