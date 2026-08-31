// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '192x192',
          href: '/icon-192.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '512x512',
          href: '/icon-512.png',
        },
      ],
      meta: [
        { name: 'theme-color', content: '#0b0f1a' },
        { name: 'apple-mobile-web-app-title', content: 'Antoine G.' },
      ],
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
  modules: ['@nuxt/icon', '@nuxtjs/sitemap', '@nuxtjs/robots', '@nuxtjs/i18n'],
  i18n: {
    baseUrl: 'https://antoinegourgue.dev',
    locales: [
      {
        code: 'fr',
        language: 'fr-FR',
        file: 'fr.json',
        name: 'Français',
      },
      {
        code: 'es',
        language: 'es-ES',
        file: 'es.json',
        name: 'Español',
      },
      {
        code: 'en',
        language: 'en-US',
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
    // Old page merged into About
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
    groqApiKey: process.env.GROQ_API_KEY,
    public: {
      posthogKey: process.env.NUXT_PUBLIC_POSTHOG_KEY || '',
      posthogHost:
        process.env.NUXT_PUBLIC_POSTHOG_HOST || 'https://eu.i.posthog.com',
    },
  },
  ssr: true,
})
