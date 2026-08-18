export interface PortfolioProject {
  key: string
  name: string
  url: string
  domain: string
  repoHint: string
  image: string
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
      key: 'mosaic',
      name: 'Mosaic',
      url: 'https://mosaic.antoinegourgue.dev/',
      domain: 'mosaic.antoinegourgue.dev',
      repoHint: 'mosaic',
      image: '/assets/mosaic.png',
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
      letter: 'A',
      colorTop: '#FB923C',
      colorBottom: '#EA580C',
      categoryKey: 'macos.catDocs',
      year: '2025',
      stack: 'Nuxt Content · Documentation',
    },
  ]
}
