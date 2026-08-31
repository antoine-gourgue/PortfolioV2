export interface LaunchpadApp {
  id: string
  icon: string
  /** i18n key for the label, or `raw` for an untranslatable proper name */
  label?: string
  raw?: string
  /** Internal route, external link, or desktop app to open */
  to?: string
  href?: string
  app?: string
  download?: boolean
}

/**
 * App catalog shared by the Launchpad and the mobile home screen.
 * Deliberately data-only: each entry describes what it is, the caller
 * decides how to open it.
 */
export const LAUNCHPAD_APPS: LaunchpadApp[] = [
  { id: 'projects', icon: 'appstore', label: 'nav.projects', to: '/projects' },
  { id: 'about', icon: 'contacts', label: 'nav.about', to: '/about' },
  { id: 'blog', icon: 'notes', label: 'nav.blog', to: '/blog' },
  { id: 'contact', icon: 'mail', label: 'nav.contact', to: '/contact' },
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
  // Shared state: the Dock opens it, the overlay renders it, Escape closes it
  const open = useState('launchpad', () => false)
  const toggle = () => {
    open.value = !open.value
  }
  const close = () => {
    open.value = false
  }
  return { open, toggle, close, apps: LAUNCHPAD_APPS }
}
