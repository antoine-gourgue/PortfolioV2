<template>
  <div
    ref="bodyEl"
    class="h-[300px] cursor-text overflow-y-auto p-5 font-mono text-[12.5px] leading-relaxed text-white/90"
    @click="focusInput"
  >
    <!-- Historique -->
    <!-- eslint-disable-next-line vue/no-v-html : lignes générées localement, entrée utilisateur échappée -->
    <p
      v-for="(line, i) in history"
      :key="i"
      class="term-line whitespace-pre-wrap break-words"
      v-html="line"
    ></p>

    <!-- Ligne de saisie -->
    <p class="term-line flex items-center gap-1.5">
      <span class="shrink-0 text-emerald-400">antoine@macbook</span>
      <span class="shrink-0 text-white/40">~ %</span>
      <input
        ref="inputEl"
        v-model="current"
        type="text"
        autocomplete="off"
        autocapitalize="off"
        spellcheck="false"
        class="min-w-0 flex-1 border-0 bg-transparent p-0 font-mono text-[12.5px] text-white/90 outline-none ring-0"
        style="caret-color: #ffffffcc"
        aria-label="terminal"
        @keydown.enter.prevent="run"
        @keydown.up.prevent="histUp"
        @keydown.down.prevent="histDown"
        @keydown.tab.prevent="complete"
      />
    </p>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['exit'])

const desktop = useDesktop()
const music = useMusic()
const projects = useProjects()
const router = useRouter()
const localePath = useLocalePath()
const { t, locale } = useI18n()

const bodyEl = ref<HTMLElement | null>(null)
const inputEl = ref<HTMLInputElement | null>(null)
const current = ref('')
const history = ref<string[]>([])
const cmdHistory: string[] = []
let histIndex = -1
const bootTime = Date.now()

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const PROMPT =
  '<span class="text-emerald-400">antoine@macbook</span> <span class="text-white/40">~ %</span> '

const print = (html: string) => history.value.push(html)
const printOut = (text: string, cls = 'text-white/75') =>
  print(`<span class="${cls}">${text}</span>`)

const scrollDown = () =>
  nextTick(() => {
    if (bodyEl.value) bodyEl.value.scrollTop = bodyEl.value.scrollHeight
  })

const focusInput = () => inputEl.value?.focus()

const projectList = () =>
  projects.map((p) => `${p.key.toLowerCase()}/`).join('&nbsp;&nbsp;')

const PAGES: Record<string, string> = {
  projects: '/projects',
  projets: '/projects',
  about: '/about',
  apropos: '/about',
  blog: '/blog',
  notes: '/blog',
  contact: '/contact',
}

const COMMANDS = [
  'help',
  'ls',
  'open',
  'cat',
  'whoami',
  'contact',
  'music',
  'weather',
  'calc',
  'wallpaper',
  'neofetch',
  'date',
  'echo',
  'clear',
  'exit',
]

const NEOFETCH_ART = [
  '   <span class="text-sky-300"> ▄▄▄▄▄▄▄ </span>',
  '   <span class="text-sky-300">██▀▀▀▀▀██</span>',
  '   <span class="text-sky-300">██  ▄▄▄▄█</span>',
  '   <span class="text-sky-300">██  ▀▀▀██</span>',
  '   <span class="text-sky-300">██▄▄▄▄▄██</span>',
  '   <span class="text-sky-300"> ▀▀▀▀▀▀▀ </span>',
]

const neofetch = () => {
  const uptime = Math.max(1, Math.round((Date.now() - bootTime) / 60000))
  const playing = music.state.value.playing
    ? `${music.track.value.title} — ${music.track.value.artist}`
    : '—'
  const info = [
    '<span class="text-emerald-400">antoine</span>@<span class="text-emerald-400">portfolio</span>',
    '<span class="text-white/40">─────────────────</span>',
    `<span class="text-sky-300">OS</span>: AntoineOS 26 (façon macOS)`,
    `<span class="text-sky-300">Shell</span>: zsh (100 % Vue, 0 % serveur)`,
    `<span class="text-sky-300">Stack</span>: Nuxt 3 · GSAP · Tailwind`,
    `<span class="text-sky-300">Localisation</span>: Anglet, France`,
    `<span class="text-sky-300">Musique</span>: ${esc(playing)}`,
    `<span class="text-sky-300">Uptime</span>: ${uptime} min`,
  ]
  NEOFETCH_ART.forEach((art, i) => print(`${art}  ${info[i] ?? ''}`))
  if (info.length > NEOFETCH_ART.length) {
    info
      .slice(NEOFETCH_ART.length)
      .forEach((line) =>
        print(`   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  ${line}`)
      )
  }
}

const help = () => {
  const rows: Array<[string, string]> = [
    ['help', 'cette aide'],
    ['ls projets', 'liste les projets'],
    ['open &lt;projet|page&gt;', 'ouvre un projet ou une page'],
    ['cat now.txt', 'ce que je fais en ce moment'],
    ['whoami', 'qui suis-je'],
    ['music play|pause|next', "contrôle l'app Musique"],
    ['weather · calc', 'ouvre les apps'],
    ['wallpaper', "change le fond d'écran"],
    ['neofetch', 'fiche système'],
    ['clear · exit', 'nettoie · réduit la fenêtre'],
  ]
  rows.forEach(([cmd, desc]) =>
    print(
      `<span class="text-sky-300">${cmd}</span> <span class="text-white/50">— ${desc}</span>`
    )
  )
}

const execute = (raw: string) => {
  const input = raw.trim()
  const [cmd, ...args] = input.split(/\s+/)
  const arg = args.join(' ').toLowerCase()

  switch (cmd.toLowerCase()) {
    case '':
      return
    case 'help':
      return help()
    case 'ls':
      return print(`<span class="text-sky-300">${projectList()}</span>`)
    case 'cat':
      if (arg.includes('now')) return printOut(esc(t('macos.terminalNow')))
      return printOut(
        `cat: ${esc(arg || '?')}: fichier introuvable`,
        'text-red-400'
      )
    case 'whoami':
      return printOut(
        'Antoine Gourgue — développeur fullstack (Vue/Nuxt · Node) · Anglet, France'
      )
    case 'date':
      return printOut(new Date().toLocaleString(locale.value))
    case 'echo':
      return printOut(esc(args.join(' ')))
    case 'clear':
      history.value = []
      return
    case 'exit':
      printOut('déconnexion…', 'text-white/50')
      setTimeout(() => emit('exit'), 350)
      return
    case 'contact':
      printOut('→ ouverture du Mail…')
      router.push(localePath('/contact'))
      return
    case 'weather':
      desktop.state.value.apps.weather = true
      return printOut('→ Météo ouverte')
    case 'calc':
    case 'calculator':
      desktop.state.value.apps.calculator = true
      return printOut('→ Calculatrice ouverte')
    case 'wallpaper':
      desktop.cycleWallpaper()
      return printOut("→ fond d'écran suivant 🎨")
    case 'neofetch':
      return neofetch()
    case 'music': {
      if (arg === 'play' || arg === '') {
        music.play()
        return printOut(
          `▶ ${esc(music.track.value.title)} — ${esc(music.track.value.artist)}`
        )
      }
      if (arg === 'pause') {
        music.pause()
        return printOut('⏸ pause')
      }
      if (arg === 'next') {
        music.next()
        return printOut(`⏭ ${esc(music.track.value.title)}`)
      }
      if (arg === 'prev') {
        music.prev()
        return printOut(`⏮ ${esc(music.track.value.title)}`)
      }
      return printOut('usage : music play|pause|next|prev', 'text-red-400')
    }
    case 'open': {
      if (!arg) return printOut('usage : open <projet|page>', 'text-red-400')
      if (PAGES[arg]) {
        printOut(`→ antoinegourgue.dev${PAGES[arg]}`)
        router.push(localePath(PAGES[arg]))
        return
      }
      const project = projects.find(
        (p) => p.key.toLowerCase() === arg || p.name.toLowerCase().includes(arg)
      )
      if (project) {
        printOut(`→ ${esc(project.domain)}`)
        window.open(project.url, '_blank')
        return
      }
      return printOut(
        `open: ${esc(arg)}: introuvable — essaie \`ls\``,
        'text-red-400'
      )
    }
    case 'sudo':
      return printOut(
        'antoine n’est pas dans le fichier sudoers. Cet incident sera signalé. 😄',
        'text-amber-300'
      )
    case 'rm':
      return printOut(
        'Bien tenté. Le portfolio reste en ligne. 🛡️',
        'text-amber-300'
      )
    case 'vim':
    case 'nano':
    case 'emacs':
      return printOut(':q! pour sortir 😉', 'text-white/50')
    default:
      return printOut(
        `zsh: command not found: ${esc(cmd)} — tape \`help\``,
        'text-red-400'
      )
  }
}

const run = () => {
  const raw = current.value
  print(PROMPT + esc(raw))
  if (raw.trim()) {
    cmdHistory.push(raw)
  }
  histIndex = cmdHistory.length
  current.value = ''
  execute(raw)
  scrollDown()
}

const histUp = () => {
  if (!cmdHistory.length) return
  histIndex = Math.max(0, histIndex - 1)
  current.value = cmdHistory[histIndex] ?? ''
}

const histDown = () => {
  if (!cmdHistory.length) return
  histIndex = Math.min(cmdHistory.length, histIndex + 1)
  current.value = cmdHistory[histIndex] ?? ''
}

const complete = () => {
  const parts = current.value.split(/\s+/)
  const last = parts[parts.length - 1].toLowerCase()
  if (!last) return
  const pool =
    parts.length > 1
      ? [...projects.map((p) => p.key.toLowerCase()), ...Object.keys(PAGES)]
      : COMMANDS
  const match = pool.find((c) => c.startsWith(last))
  if (match) {
    parts[parts.length - 1] = match
    current.value = parts.join(' ')
  }
}

onMounted(() => {
  // Historique initial : reprend le contenu statique d'origine
  print(PROMPT + 'ls ~/projets')
  print(`<span class="text-sky-300">${projectList()}</span>`)
  print('&nbsp;')
  print(PROMPT + 'cat now.txt')
  printOut(esc(t('macos.terminalNow')))
  print('&nbsp;')
  printOut(
    'Tape <span class="text-sky-300">help</span> pour la liste des commandes.',
    'text-white/50'
  )
})
</script>
