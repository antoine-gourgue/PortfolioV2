<template>
  <div
    ref="bodyEl"
    class="h-[336px] cursor-text overflow-y-auto p-4 font-mono text-[12.5px] leading-relaxed text-white/90"
    @click="focusInput"
  >
    <!-- eslint-disable-next-line vue/no-v-html : lines are generated locally, user input is escaped -->
    <p
      v-for="(line, i) in history"
      :key="i"
      class="term-line whitespace-pre-wrap break-words"
      v-html="line"
    ></p>

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
const track = useTrack()
const music = useMusic()
const projects = useProjects()
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

// Command aliases → desktop app id (the former routes are apps now)
const APPS: Record<string, string> = {
  projects: 'projects',
  projets: 'projects',
  about: 'about',
  apropos: 'about',
  blog: 'blog',
  notes: 'blog',
  contact: 'contact',
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
  'lock',
  'airdrop',
  'siri',
  'news',
  'settings',
  'date',
  'echo',
  'clear',
  'exit',
]

const NEOFETCH_ART = [
  '<span class="text-sky-300">    ██████████▄▄  </span>',
  '<span class="text-sky-300">       ▄▄▄▄▄ ▀▀██▄</span>',
  '<span class="text-sky-300">    ▄█████████ ▀██</span>',
  '<span class="text-sky-300">  ▄██▀ ▄▄▄▄▄▄▄▄▄██</span>',
  '<span class="text-sky-300">  ██  ██▀▀▀▀▀▀▀▀██</span>',
  '<span class="text-sky-300">  ██  ████████  ██</span>',
  '<span class="text-sky-300">  ▀██▄▄ ▀▀▀▀▀▀  ██</span>',
  '<span class="text-sky-300">    ▀█████████████</span>',
]

const neofetch = () => {
  const uptime = Math.max(1, Math.round((Date.now() - bootTime) / 60000))
  const playing = music.state.value.playing
    ? `${music.track.value.title} — ${music.track.value.artist}`
    : '—'
  const info = [
    '<span class="text-emerald-400">antoine</span>@<span class="text-emerald-400">portfolio</span>',
    '<span class="text-white/40">─────────────────</span>',
    `<span class="text-sky-300">OS</span>: ${t('macos.term.osLabel')}`,
    `<span class="text-sky-300">Shell</span>: zsh (100 % Vue)`,
    `<span class="text-sky-300">Stack</span>: Nuxt 3 · GSAP · Tailwind`,
    `<span class="text-sky-300">${t('macos.term.location')}</span>: Anglet, France`,
    `<span class="text-sky-300">Uptime</span>: ${uptime} min`,
  ]
  // the Music line only shows while a track is playing
  if (music.state.value.playing) {
    info.splice(
      6,
      0,
      `<span class="text-sky-300">${t('macos.term.music')}</span>: ${esc(playing)}`
    )
  }
  NEOFETCH_ART.forEach((art, i) =>
    // tight leading: without it the logo blocks do not join up
    print(
      `<span class="block leading-[1.08] ${i === 0 ? 'pt-2' : ''}">${art}  ${info[i] ?? ''}</span>`
    )
  )
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
    ['help', t('macos.term.helpHelp')],
    ['ls', t('macos.term.helpLs')],
    [t('macos.term.helpOpenCmd'), t('macos.term.helpOpen')],
    ['cat now.txt', t('macos.term.helpCat')],
    ['whoami', t('macos.term.helpWhoami')],
    ['music play|pause|next', t('macos.term.helpMusic')],
    ['weather · calc', t('macos.term.helpApps')],
    ['wallpaper', t('macos.term.helpWallpaper')],
    ['neofetch', t('macos.term.helpNeofetch')],
    ['settings · lock', t('macos.term.helpSettings')],
    ['clear · exit', t('macos.term.helpClear')],
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

  if (cmd) track('terminal_command', { command: cmd.toLowerCase() })

  // These commands take no arguments: refuse rather than silently ignore
  const NO_ARGS = new Set([
    'help',
    'whoami',
    'date',
    'clear',
    'exit',
    'contact',
    'weather',
    'calc',
    'calculator',
    'wallpaper',
    'neofetch',
    'news',
    'siri',
    'airdrop',
    'lock',
    'settings',
    'reglages',
  ])
  if (args.length && NO_ARGS.has(cmd.toLowerCase())) {
    return printOut(
      `${esc(cmd.toLowerCase())}: too many arguments`,
      'text-red-400'
    )
  }

  switch (cmd.toLowerCase()) {
    case '':
      return
    case 'help':
      return help()
    case 'ls': {
      const LS_PATHS = [
        '',
        '.',
        '~',
        'projets',
        'projects',
        'proyectos',
        './projets',
        '~/projets',
      ]
      if (!LS_PATHS.includes(arg.replace(/\/$/, ''))) {
        return printOut(
          `ls: ${esc(arg)}: no such file or directory`,
          'text-red-400'
        )
      }
      return print(`<span class="text-sky-300">${projectList()}</span>`)
    }
    case 'cat':
      if (!arg) return printOut('usage: cat &lt;file&gt;', 'text-red-400')
      if (arg === 'now.txt' || arg === 'now') {
        return printOut(esc(t('macos.terminalNow')))
      }
      return printOut(
        `cat: ${esc(arg)}: no such file or directory`,
        'text-red-400'
      )
    case 'whoami':
      return printOut(esc(t('macos.term.whoami')))
    case 'date':
      return printOut(new Date().toLocaleString(locale.value))
    case 'echo':
      return printOut(esc(args.join(' ')))
    case 'clear':
      history.value = []
      return
    case 'exit':
      printOut(t('macos.term.loggingOut'), 'text-white/50')
      setTimeout(() => emit('exit'), 350)
      return
    case 'contact':
      printOut(t('macos.term.openMail'))
      desktop.openApp('contact')
      return
    case 'weather':
      desktop.state.value.apps.weather = true
      return printOut(t('macos.term.openWeather'))
    case 'calc':
    case 'calculator':
      desktop.state.value.apps.calculator = true
      return printOut(t('macos.term.openCalc'))
    case 'wallpaper':
      desktop.cycleWallpaper()
      return printOut(t('macos.term.wallpaperNext'))
    case 'neofetch':
      return neofetch()
    case 'news':
      desktop.state.value.apps.news = true
      return printOut(t('macos.term.openNews'))
    case 'siri':
      desktop.state.value.apps.siri = true
      return printOut(t('macos.term.openSiri'))
    case 'airdrop':
      desktop.state.value.apps.airdrop = true
      return printOut(t('macos.term.openAirdrop'))
    case 'lock':
      printOut(t('macos.term.locking'), 'text-white/50')
      setTimeout(() => (desktop.state.value.locked = true), 400)
      return
    case 'settings':
    case 'reglages':
      desktop.state.value.apps.settings = true
      return printOut(t('macos.term.openSettings'))
    case 'music': {
      if (arg === 'play' || arg === '') {
        music.play()
        return printOut(
          `▶ ${esc(music.track.value.title)} — ${esc(music.track.value.artist)}`
        )
      }
      if (arg === 'pause') {
        music.pause()
        return printOut(`⏸ ${t('macos.term.paused')}`)
      }
      if (arg === 'next') {
        music.next()
        return printOut(`⏭ ${esc(music.track.value.title)}`)
      }
      if (arg === 'prev') {
        music.prev()
        return printOut(`⏮ ${esc(music.track.value.title)}`)
      }
      return printOut('usage: music play|pause|next|prev', 'text-red-400')
    }
    case 'open': {
      if (!arg)
        return printOut('usage: open &lt;project|page&gt;', 'text-red-400')
      if (APPS[arg]) {
        printOut(`→ antoinegourgue.dev/${APPS[arg]}`)
        desktop.openApp(APPS[arg])
        return
      }
      const project = projects.find(
        (p) => p.key.toLowerCase() === arg || p.name.toLowerCase().includes(arg)
      )
      if (project) {
        printOut(`→ ${esc(project.domain)}`)
        window.open(project.url, '_blank', 'noopener,noreferrer')
        return
      }
      return printOut(
        `open: ${esc(arg)}: not found — try \`ls\``,
        'text-red-400'
      )
    }
    case 'sudo':
      return printOut(esc(t('macos.term.sudo')), 'text-amber-300')
    case 'rm':
      return printOut(esc(t('macos.term.rm')), 'text-amber-300')
    case 'vim':
    case 'nano':
    case 'emacs':
      return printOut(esc(t('macos.term.editor')), 'text-white/50')
    default:
      return printOut(
        `zsh: command not found: ${esc(cmd)} — try \`help\``,
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
  // Initial history: system card, current status, then the help
  print(PROMPT + 'neofetch')
  neofetch()
  print('&nbsp;')
  print(PROMPT + 'cat now.txt')
  printOut(esc(t('macos.terminalNow')))
  print('&nbsp;')
  printOut(
    t('macos.term.hint', {
      cmd: '<span class="text-sky-300">help</span>',
    }),
    'text-white/50'
  )
})
</script>
