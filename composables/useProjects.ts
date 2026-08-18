export interface PortfolioProject {
  key: string
  name: string
  url: string
  domain: string
  repoHint: string
  image: string
  icon: string
  iconBg?: string
  iconPad?: boolean
  letter: string
  colorTop: string
  colorBottom: string
  categoryKey: string
  year: string
  stack: string
  pro?: boolean
}

// Source unique des projets mis en avant (accueil, /projects, Spotlight)
export function useProjects(): PortfolioProject[] {
  return [
    {
      key: 'emailEditor',
      name: 'Éditeur d’email Digitaleo',
      url: 'https://www.digitaleo.com/',
      domain: 'digitaleo.com',
      repoHint: '__private__',
      image: '/assets/projects/digitaleo-editor.jpg',
      icon: '/assets/companies/digitaleo.png',
      iconPad: true,
      letter: 'D',
      colorTop: '#34C1F2',
      colorBottom: '#1273DE',
      categoryKey: 'macos.catSaas',
      year: '2024 — 2026',
      stack: 'Vue.js 2 · TypeScript · AngularJS · PHP · VML',
      pro: true,
    },
    {
      key: 'tailtcg',
      name: 'TailTCG',
      url: 'https://tailtcg.vercel.app',
      domain: 'tailtcg.vercel.app',
      repoHint: 'tailtcg',
      image: '/assets/projects/tailtcg.jpg',
      icon: '/assets/projects/tailtcg-icon.png',
      letter: 'T',
      colorTop: '#F87171',
      colorBottom: '#DC2626',
      categoryKey: 'macos.catGames',
      year: '2025',
      stack: 'Next.js · TypeScript',
    },
    {
      key: 'mosaic',
      name: 'Mosaic',
      url: 'https://mosaic.antoinegourgue.dev/',
      domain: 'mosaic.antoinegourgue.dev',
      repoHint: 'mosa',
      image: '/assets/projects/mosaic.jpg',
      icon: '/assets/projects/mosaic-icon.png',
      letter: 'M',
      colorTop: '#34C1F2',
      colorBottom: '#1273DE',
      categoryKey: 'macos.catProductivity',
      year: '2025',
      stack: 'Next.js · Prisma · Auth.js · Docker',
    },
    {
      key: 'sapia',
      name: 'Sapia',
      url: 'https://sapia.antoinegourgue.dev/',
      domain: 'sapia.antoinegourgue.dev',
      repoHint: 'sapia',
      image: '/assets/projects/sapia.jpg',
      icon: '/assets/projects/sapia-icon.png',
      letter: 'S',
      colorTop: '#3ECF8E',
      colorBottom: '#0E9F6E',
      categoryKey: 'macos.catAI',
      year: '2025',
      stack: 'Vue · Node.js · IA',
    },
    {
      key: 'designSystem',
      name: 'Design System',
      url: 'https://design-system-storybook.antoinegourgue.dev/',
      domain: 'design-system-storybook.antoinegourgue.dev',
      repoHint: 'design-system',
      image: '/assets/projects/design-system.jpg',
      icon: '/assets/projects/designSystem-icon.png',
      letter: 'D',
      colorTop: '#B37CF5',
      colorBottom: '#7C3AED',
      categoryKey: 'macos.catDesign',
      year: '2025',
      stack: 'Vue · Storybook · Tailwind',
    },
    {
      key: 'trinity',
      name: 'Trinity Shop',
      url: 'https://trinity-shop-rho.vercel.app',
      domain: 'trinity-shop-rho.vercel.app',
      repoHint: 'trinity',
      image: '/assets/projects/trinity-shop.jpg',
      icon: '/assets/projects/trinity-icon.png',
      iconPad: true,
      letter: 'T',
      colorTop: '#2DD4BF',
      colorBottom: '#0D9488',
      categoryKey: 'macos.catShop',
      year: '2025',
      stack: 'Next.js 15 · Prisma · PostgreSQL · PWA',
    },
    {
      key: 'echoconnect',
      name: 'EchoConnect',
      url: 'https://echoconnect-weld.vercel.app',
      domain: 'echoconnect-weld.vercel.app',
      repoHint: 'echo',
      image: '/assets/projects/echoconnect.jpg',
      icon: '/assets/projects/echoconnect-icon.png',
      iconPad: true,
      letter: 'E',
      colorTop: '#818CF8',
      colorBottom: '#6366F1',
      categoryKey: 'macos.catChat',
      year: '2024',
      stack: 'Vue 3 · Socket.io · Express · MongoDB',
    },
    {
      key: 'jobboard',
      name: 'JobBoard',
      url: 'https://jobboard-one-eta.vercel.app',
      domain: 'jobboard-one-eta.vercel.app',
      repoHint: 'jobboard',
      image: '/assets/projects/jobboard.jpg',
      icon: '/assets/projects/jobboard-icon.png',
      iconPad: true,
      letter: 'J',
      colorTop: '#6C6AE8',
      colorBottom: '#4341C0',
      categoryKey: 'macos.catJobs',
      year: '2023',
      stack: 'Vue 3 · AdonisJS · MySQL',
    },
    {
      key: 'aurora',
      name: 'AuroraHome',
      url: 'https://aurora-home-documentation.vercel.app/fr/docs',
      domain: 'aurora-home-documentation.vercel.app',
      repoHint: 'aurora',
      image: '/assets/projects/aurora-home.jpg',
      icon: '/assets/projects/aurora-logo.png',
      iconBg: 'linear-gradient(to bottom, #1e293b, #0b1220)',
      iconPad: true,
      letter: 'A',
      colorTop: '#FB923C',
      colorBottom: '#EA580C',
      categoryKey: 'macos.catDocs',
      year: '2025',
      stack: 'Nuxt Content · Documentation',
    },
  ]
}
