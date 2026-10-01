import type { Content } from './types'

// Demo content: a fictional designer, with screens drawn in code. Replace all
// of it. Real screenshots go in public/footage/ and are referenced as
// 'footage/name.jpg'; a product UI rebuilt in code can be passed as a
// React element wherever a screen is expected.

const blue = '#0a84ff'
const pink = '#ff375f'
const green = '#30d158'
const orange = '#ff9f0a'

export const content: Content = {
  name: 'Camille Durand',
  role: 'Product Designer × Front-end',
  mark: { text: 'CD' },

  hero: {
    word: 'Studio',
    line: 'Des interfaces qu’on a envie d’utiliser.',
    strip: [
      { media: { mock: 'web', title: 'Atlas', accent: blue }, aspect: 1.6 },
      { media: { mock: 'web', title: 'Pulse', accent: pink }, aspect: 1.6 },
      { media: { mock: 'web', title: 'Nova', accent: green }, aspect: 1.6 },
    ],
    through: '58% 55%',
  },

  laptop: {
    screen: { mock: 'desktop', title: 'Atlas', accent: blue },
    beats: [
      { text: 'Des idées.' },
      { text: 'Des interfaces.', silver: true },
      { text: 'En production.' },
    ],
    windows: [
      { media: { mock: 'web', title: 'Pulse', accent: pink }, aspect: 1.25 },
      { media: { mock: 'web', title: 'Nova', accent: green }, aspect: 1.3 },
      { media: { mock: 'web', title: 'Atlas', accent: blue }, aspect: 1.5 },
      { media: { mock: 'web', title: 'Tempo', accent: orange }, aspect: 1.2 },
      { media: { mock: 'web', title: 'Halo', accent: '#bf5af2' }, aspect: 1.4 },
    ],
  },

  grid: {
    title: '9 projets.',
    subtitle: 'Du croquis au code.',
    icons: [
      { label: 'Atlas', color: blue },
      { label: 'Pulse', color: pink },
      { label: 'Nova', color: green },
      { label: 'Tempo', color: orange },
      { label: 'Halo', color: '#bf5af2' },
      { label: 'Fjord', color: '#64d2ff' },
      { label: 'Mint', color: '#66d4cf' },
      { label: 'Ember', color: '#ff453a' },
      { label: 'Orbit', color: '#5e5ce6' },
    ],
  },

  showcases: [
    {
      name: 'Atlas',
      tag: 'La carte de vos équipes.',
      media: { mock: 'web', title: 'Atlas', accent: blue },
      aspect: 1.6,
      layers: [
        [0.04, 0.0, 0.92, 0.1],
        [0.53, 0.2, 0.42, 0.52],
        [0.04, 0.78, 0.29, 0.18],
      ],
      proof: { kind: 'stack', items: ['Figma', 'React', 'TypeScript'] },
    },
    {
      name: 'Pulse',
      tag: 'Le suivi santé, simplifié.',
      media: { mock: 'web', title: 'Pulse', accent: pink },
      aspect: 1.6,
      layers: [
        [0.53, 0.2, 0.42, 0.52],
        [0.36, 0.78, 0.29, 0.18],
      ],
      proof: {
        kind: 'ring',
        value: 94,
        pct: 0.94,
        suffix: ' %',
        label: 'de satisfaction',
        sub: 'sur 1 200 tests',
        colors: ['#ff6b8a', pink],
      },
    },
    {
      name: 'Nova',
      tag: 'Un design system complet.',
      media: { mock: 'web', title: 'Nova', accent: green },
      aspect: 1.6,
      layers: [
        [0.04, 0.2, 0.46, 0.5],
        [0.68, 0.78, 0.29, 0.18],
      ],
      proof: { kind: 'stack', items: ['Tokens', 'Storybook', 'Figma'] },
    },
  ],

  numbers: {
    header: 'Studio Lumen · Product Designer',
    stats: [
      {
        kicker: 'En poste, pendant',
        value: 3,
        suffix: ' ans',
        visual: { kind: 'timeline', from: 'sept. 2023', to: 'sept. 2026' },
        len: 60,
      },
      {
        kicker: 'Des écrans utilisés par',
        value: 120000,
        unit: 'personnes chaque mois',
        visual: {
          kind: 'window',
          media: { mock: 'desktop', title: 'Lumen', accent: blue },
          aspect: 1.6,
        },
        len: 100,
      },
      {
        kicker: 'Et plus de',
        value: 40,
        unit: 'composants livrés',
        visual: { kind: 'dots', cols: 10, rows: 4 },
      },
    ],
  },

  phone: {
    title: 'Aussi sur mobile.',
    flow: [
      { at: 0, media: { mock: 'mobile', title: 'Accueil', accent: blue } },
      {
        at: 66,
        media: { mock: 'mobile', title: 'Projets', accent: pink },
        from: [0.3, 0.42],
      },
      {
        at: 112,
        media: { mock: 'mobile', title: 'Pulse', accent: pink },
        from: [0.5, 0.62],
      },
    ],
    captions: [
      { at: 66, text: 'Tous mes projets, dans la poche.' },
      { at: 112, text: 'Chaque écran, pensé pour le pouce.' },
      { at: 156, text: 'Et le même soin partout.' },
    ],
    side: [
      { mock: 'mobile', title: 'Nova', accent: green },
      { mock: 'mobile', title: 'Tempo', accent: orange },
    ],
  },

  oneMoreThing: 'One more thing…',

  end: {
    word: 'Disponible.',
    line: 'En CDI, dès janvier 2027.',
    sub: 'Product Designer × Front-end',
    lead: 'Pour un poste à',
    beats: ['Lyon', 'Nantes', 'Paris'],
    cta: 'camilledurand.design',
  },

  thumb: {
    hook: ['Mon CV', 'en moins d’une minute.'],
    foot: 'Disponible en CDI · janvier 2027',
    sub: 'Lyon · Nantes · Paris',
    laptop: { mock: 'desktop', title: 'Atlas', accent: blue },
    phone: { mock: 'mobile', title: 'Projets', accent: pink },
  },
}
