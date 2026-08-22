export interface LaunchpadApp {
  id: string
  icon: string
  /** Clé i18n du libellé, ou `raw` pour un nom propre non traduisible */
  label?: string
  raw?: string
  /** Route interne, lien externe, ou app du bureau à ouvrir */
  to?: string
  href?: string
  app?: string
  download?: boolean
}

/**
 * Catalogue des applications, partagé par le Launchpad et l'écran d'accueil
 * mobile. Volontairement sans fonctions : chaque entrée décrit ce qu'elle est,
 * c'est l'appelant qui décide comment l'ouvrir.
 */
export const LAUNCHPAD_APPS: LaunchpadApp[] = [
  { id: 'projects', icon: 'appstore', label: 'nav.projects', to: '/projects' },
  { id: 'about', icon: 'contacts', label: 'nav.about', to: '/about' },
  { id: 'blog', icon: 'notes', label: 'nav.blog', to: '/blog' },
  { id: 'contact', icon: 'mail', label: 'nav.contact', to: '/contact' },
  {
    id: 'messages',
    icon: 'messages',
    label: 'macos.messagesTitle',
    app: 'messages',
  },
  {
    id: 'weather',
    icon: 'weather',
    label: 'macos.weatherTitle',
    app: 'weather',
  },
  {
    id: 'calculator',
    icon: 'calculator',
    label: 'macos.calcTitle',
    app: 'calculator',
  },
  { id: 'music', icon: 'music', label: 'macos.musicTitle', app: 'music' },
  { id: 'maps', icon: 'maps', label: 'macos.mapsTitle', app: 'maps' },
  { id: 'siri', icon: 'siri', raw: 'Siri', app: 'siri' },
  { id: 'news', icon: 'news', raw: 'News', app: 'news' },
  { id: 'sports', icon: 'sports', label: 'macos.sportsTitle', app: 'sports' },
  {
    id: 'settings',
    icon: 'settings',
    label: 'macos.settingsTitle',
    app: 'settings',
  },
  {
    id: 'github',
    icon: 'github',
    raw: 'GitHub',
    href: 'https://github.com/antoine-gourgue',
  },
  {
    id: 'linkedin',
    icon: 'linkedin',
    raw: 'LinkedIn',
    href: 'https://linkedin.com/in/antoine-gourgue',
  },
  { id: 'cv', icon: 'pdf', label: 'macos.deskCv', download: true },
]

export function useLaunchpad() {
  // Partagé : le Dock l'ouvre, la couche l'affiche, Échap la referme
  const open = useState('launchpad', () => false)
  const toggle = () => {
    open.value = !open.value
  }
  const close = () => {
    open.value = false
  }
  return { open, toggle, close, apps: LAUNCHPAD_APPS }
}
