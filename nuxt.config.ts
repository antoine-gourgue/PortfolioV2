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
  modules: ['@nuxt/image', '@nuxt/icon'],
<<<<<<< HEAD
=======
  runtimeConfig: {
    githubToken: process.env.VITE_GITHUB_TOKEN,
  },
>>>>>>> e557bfb (feat(projects): make entire project card clickable for improved UX)
})
