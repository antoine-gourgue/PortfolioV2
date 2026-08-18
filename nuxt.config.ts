// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      script: [{ src: 'https://kit.fontawesome.com/180b0301cc.js' }],
    },
  },
  css: [
    '~/assets/css/tailwind.css',
    'framework7-icons/css/framework7-icons.css',
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  build: {
    // vue-toastification est publié en CommonJS : transpilation requise pour le bundle serveur
    transpile: ['vue-toastification'],
  },
  modules: [
    '@nuxt/image',
    '@nuxt/icon',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    '@nuxtjs/i18n',
  ],
  i18n: {
    locales: [
      {
        code: 'fr',
        iso: 'fr-FR',
        file: 'fr.json',
        name: 'Français',
      },
      {
        code: 'es',
        iso: 'es-ES',
        file: 'es.json',
        name: 'Español',
      },
      {
        code: 'en',
        iso: 'en-US',
        file: 'en.json',
        name: 'English',
      },
    ],
    langDir: 'locales',
    defaultLocale: 'fr',
    strategy: 'prefix_except_default',
    compilation: {
      strictMessage: false,
    },
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      alwaysRedirect: false,
    },
  },
  routeRules: {
    // Ancienne page fusionnée dans À propos
    '/services': { redirect: '/about' },
    '/en/services': { redirect: '/en/about' },
    '/es/services': { redirect: '/es/about' },
  },
  site: {
    url: 'https://antoinegourgue.dev',
    name: 'Antoine Gourgue',
  },
  runtimeConfig: {
    githubToken: process.env.VITE_GITHUB_TOKEN,
  },
  ssr: true,
})
