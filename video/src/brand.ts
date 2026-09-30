import { staticFile } from 'remotion'

export const FPS = 30
export const WIDTH = 1080
export const HEIGHT = 1350

// 120 BPM: one beat is 15 frames, one bar 60. Cuts land on beats so the
// synthesized soundtrack (audio/synth.py) hits exactly on them.
export const BEAT = 15
export const BAR = 60

export const colors = {
  night: '#05070d',
  ink: '#0b0f1a',
  white: '#f5f5f7',
  gray: '#86868b',
  blue: '#0071e3',
  sky: '#2997ff',
  cyan: '#3ad6ff',
  violet: '#7b5cff',
  pink: '#ff4fd8',
  green: '#30d158',
  teal: '#1fb8a6',
  amber: '#ffb340',
}

export const fonts = {
  display: '"Inter Tight Variable", "Inter Variable", sans-serif',
  body: '"Inter Variable", sans-serif',
  mono: '"JetBrains Mono Variable", monospace',
}

export const person = {
  firstName: 'Antoine',
  lastName: 'Gourgue',
  role: 'Développeur Fullstack × IA',
  availability: 'Disponible en CDI · octobre 2026',
  mobility: 'Biarritz · Bordeaux · Paris · Lille',
  url: 'antoinegourgue.dev',
  degree: 'Master of Science — Intelligence Artificielle',
  school: 'Epitech Rennes',
}

export type Project = {
  id: string
  name: string
  stack: string
  image: string
  tint: string
}

export const projects: Project[] = [
  {
    id: 'mosaic',
    name: 'Mosaic',
    stack: 'Next.js · Prisma · Auth.js',
    image: 'mosaic.jpg',
    tint: '#e60023',
  },
  {
    id: 'medical-ai',
    name: 'Zoidberg 2.0',
    stack: 'CNN · Grad-CAM · 91,2 %',
    image: 'medical-ai.jpg',
    tint: '#1fb8a6',
  },
  {
    id: 'tailtcg',
    name: 'TailTCG',
    stack: 'Next.js · TypeScript',
    image: 'footage:tailtcg.jpg',
    tint: '#ffcb05',
  },
  {
    id: 'thor',
    name: 'THOR',
    stack: 'Speech-to-Text · NLP spaCy',
    image: 'thor.jpg',
    tint: '#2997ff',
  },
  {
    id: 'trelltech',
    name: 'Trelltech',
    stack: 'Kanban temps réel',
    image: 'trelltech.jpg',
    tint: '#0079bf',
  },
  {
    id: 'epihardware',
    name: 'EpiHardware',
    stack: 'Next.js 15 · Turborepo',
    image: 'epihardware.jpg',
    tint: '#7b5cff',
  },
  {
    id: 'trinity',
    name: 'Trinity',
    stack: 'PWA · Nutri-Score',
    image: 'trinity-shop.jpg',
    tint: '#30d158',
  },
  {
    id: 'jobboard',
    name: 'JobBoard',
    stack: 'Matching de compétences',
    image: 'jobboard.jpg',
    tint: '#ff9f0a',
  },
  {
    id: 'echoconnect',
    name: 'EchoConnect',
    stack: 'Vue 3 · Socket.io',
    image: 'echoconnect.jpg',
    tint: '#5e5ce6',
  },
  {
    id: 'aurora',
    name: 'Aurora Home',
    stack: 'Architecture · CI/CD',
    image: 'aurora-home.jpg',
    tint: '#64d2ff',
  },
  {
    id: 'sapia',
    name: 'Sapia',
    stack: 'Nuxt · Vue.js',
    image: 'sapia.jpg',
    tint: '#ff375f',
  },
  {
    id: 'design-system',
    name: 'Design System',
    stack: 'Storybook · Vue · Tailwind',
    image: 'design-system.jpg',
    tint: '#ff4785',
  },
]

// `footage:` images are fresh captures kept in public/footage, for projects
// whose portfolio asset is out of date
export const projectImage = (p: Project) =>
  p.image.startsWith('footage:')
    ? staticFile(`footage/${p.image.slice(8)}`)
    : staticFile(`assets/projects/${p.image}`)

export type City = {
  name: string
  lat: number
  lon: number
  color: string
  icon: string
  note: string
}

export const cities: City[] = [
  {
    name: 'Biarritz',
    lat: 43.4832,
    lon: -1.5586,
    color: '#0A84FF',
    icon: 'house_fill',
    note: 'Pays basque · domicile',
  },
  {
    name: 'Bordeaux',
    lat: 44.8378,
    lon: -0.5792,
    color: '#FF9F0A',
    icon: 'briefcase_fill',
    note: 'Nouvelle-Aquitaine',
  },
  {
    name: 'Paris',
    lat: 48.8566,
    lon: 2.3522,
    color: '#5E5CE6',
    icon: 'briefcase_fill',
    note: 'Île-de-France',
  },
  {
    name: 'Lille',
    lat: 50.6292,
    lon: 3.0573,
    color: '#FF375F',
    icon: 'briefcase_fill',
    note: 'Hauts-de-France',
  },
]

// Career timeline, as the portfolio's Calendar app shows it
export const journey = [
  {
    title: 'Développeur Full Stack — Digitaleo',
    period: 'janv. 2024 — juil. 2026',
    text: "Éditeur d'email de la plateforme (blocs dynamiques, compatibilité Outlook/VML), Design System, archivage des campagnes, statistiques Marketing Direct.",
    color: '#0A84FF',
  },
  {
    title: 'Master - Epitech Rennes',
    period: '2023 - 2026',
    text: "Spécialisation en Intelligence Artificielle & Data, axée sur l'apprentissage automatique, la science des données et les solutions innovantes.",
    color: '#30A46C',
  },
  {
    title: 'KPME-Development',
    period: 'mai — juin 2022',
    text: 'Création de site web pour KPME-Development à Boucau — première expérience professionnelle en développement.',
    color: '#0A84FF',
  },
  {
    title: 'Lycée Saint Joseph — Hasparren',
    period: '2021 — 2023',
    text: "Formation technique aux systèmes numériques, option informatique et réseaux — les fondations avant le passage à l'ingénierie logicielle.",
    color: '#30A46C',
  },
  {
    title: 'Lycée André Malraux — Biarritz',
    period: '2016 — 2020',
    text: 'Baccalauréats scientifique et sciences de laboratoire — les bases scientifiques du parcours.',
    color: '#E5484D',
  },
]

export const digitaleo = {
  users: 37000,
  networks: 600,
  years: '2,5 ans',
}

export const stack = [
  { name: 'Vue.js', icon: 'vuedotjs.svg' },
  { name: 'Nuxt', icon: 'nuxt.svg' },
  { name: 'TypeScript', icon: 'typescript.svg' },
  { name: 'Node.js', icon: 'nodedotjs.svg' },
  { name: 'Python', icon: 'python.svg' },
  { name: 'Docker', icon: 'docker.svg' },
  { name: 'Tailwind', icon: 'tailwindcss.svg' },
  { name: 'JavaScript', icon: 'javascript.svg' },
  { name: 'Jupyter', icon: 'jupyter.svg' },
  { name: 'Git', icon: 'git.svg' },
  { name: 'PHP', icon: 'php.svg' },
  { name: 'Java', icon: 'java.svg' },
]

export const asset = (path: string) => staticFile(`assets/${path}`)
