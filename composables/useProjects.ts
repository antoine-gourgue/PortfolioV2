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
}

// Source unique des projets mis en avant (accueil, /projects, Spotlight)
export function useProjects(): PortfolioProject[] {
  return [
    {
      key: 'tailtcg',
      name: 'TailTCG',
      url: 'https://tailtcg.vercel.app',
      domain: 'tailtcg.vercel.app',
      repoHint: 'tailtcg',
      image: '/assets/projects/tailtcg-og.png',
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
      image: '/assets/mosaic.png',
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
      image: '/assets/sapia.png',
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
      image: '/assets/design-system.png',
      icon: '/assets/projects/designSystem-icon.png',
      letter: 'D',
      colorTop: '#B37CF5',
      colorBottom: '#7C3AED',
      categoryKey: 'macos.catDesign',
      year: '2025',
      stack: 'Vue · Storybook · Tailwind',
    },
    {
      key: 'aurora',
      name: 'AuroraHome',
      url: 'https://aurora-home-documentation.vercel.app/fr/docs',
      domain: 'aurora-home-documentation.vercel.app',
      repoHint: 'aurora',
      image: '/assets/aurora-home.png',
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
