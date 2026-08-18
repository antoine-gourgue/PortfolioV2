/**
 * Effets sonores système façon macOS, synthétisés en Web Audio.
 * Aucun asset audio : sons courts générés (licence-free), volume doux.
 * Coupables via le haut-parleur de la barre de menu (persisté).
 */

let ctx: AudioContext | null = null

const getCtx = (): AudioContext | null => {
  if (typeof window === 'undefined') return null
  if (!ctx) {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext
    if (!AC) return null
    ctx = new AC()
  }
  if (ctx.state === 'suspended') ctx.resume()
  return ctx
}

export function useSfx() {
  const desktop = useDesktop()

  const enabled = () => !desktop.state.value.sfxMuted

  const tone = (opts: {
    from: number
    to?: number
    dur: number
    peak?: number
    type?: OscillatorType
    delay?: number
    lowpass?: number
  }) => {
    const c = getCtx()
    if (!c || c.state !== 'running') return
    const t0 = c.currentTime + (opts.delay ?? 0)
    const osc = c.createOscillator()
    const gain = c.createGain()
    osc.type = opts.type ?? 'sine'
    osc.frequency.setValueAtTime(opts.from, t0)
    if (opts.to)
      osc.frequency.exponentialRampToValueAtTime(opts.to, t0 + opts.dur)
    gain.gain.setValueAtTime(0, t0)
    gain.gain.linearRampToValueAtTime(opts.peak ?? 0.15, t0 + 0.008)
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + opts.dur)
    let node: AudioNode = osc
    if (opts.lowpass) {
      const f = c.createBiquadFilter()
      f.type = 'lowpass'
      f.frequency.value = opts.lowpass
      osc.connect(f)
      node = f
    }
    node.connect(gain)
    gain.connect(c.destination)
    osc.start(t0)
    osc.stop(t0 + opts.dur + 0.05)
  }

  const noise = (opts: {
    dur: number
    peak?: number
    delay?: number
    filterFrom?: number
    filterTo?: number
    highpass?: boolean
  }) => {
    const c = getCtx()
    if (!c || c.state !== 'running') return
    const t0 = c.currentTime + (opts.delay ?? 0)
    const len = Math.ceil(c.sampleRate * opts.dur)
    const buf = c.createBuffer(1, len, c.sampleRate)
    const data = buf.getChannelData(0)
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1
    const src = c.createBufferSource()
    src.buffer = buf
    const filter = c.createBiquadFilter()
    filter.type = opts.highpass ? 'highpass' : 'lowpass'
    filter.frequency.setValueAtTime(opts.filterFrom ?? 1000, t0)
    if (opts.filterTo)
      filter.frequency.exponentialRampToValueAtTime(opts.filterTo, t0 + opts.dur)
    const gain = c.createGain()
    gain.gain.setValueAtTime(0, t0)
    gain.gain.linearRampToValueAtTime(opts.peak ?? 0.1, t0 + 0.01)
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + opts.dur)
    src.connect(filter)
    filter.connect(gain)
    gain.connect(c.destination)
    src.start(t0)
  }

  return {
    /** Clic doux (dock, menus, Spotlight) */
    click() {
      if (!enabled()) return
      tone({ from: 1900, to: 1300, dur: 0.035, peak: 0.08 })
    },
    /** Ouverture de fenêtre / Quick Look */
    pop() {
      if (!enabled()) return
      tone({ from: 360, to: 650, dur: 0.1, peak: 0.14 })
    },
    /** Réduction vers le dock */
    minimize() {
      if (!enabled()) return
      tone({ from: 540, to: 150, dur: 0.24, peak: 0.12 })
      noise({ dur: 0.22, peak: 0.05, filterFrom: 2000, filterTo: 300 })
    },
    /** Restauration depuis le dock */
    restore() {
      if (!enabled()) return
      tone({ from: 180, to: 560, dur: 0.2, peak: 0.12 })
    },
    /** Touche de la calculatrice */
    key() {
      if (!enabled()) return
      tone({ from: 680, dur: 0.045, peak: 0.1, type: 'triangle', lowpass: 1400 })
    },
    /** Corbeille (froissement) */
    trash() {
      if (!enabled()) return
      noise({ dur: 0.07, peak: 0.12, filterFrom: 1400 })
      noise({ dur: 0.06, peak: 0.1, filterFrom: 1000, delay: 0.07 })
      noise({ dur: 0.09, peak: 0.08, filterFrom: 700, delay: 0.13 })
    },
    /** Envoi du message (swoosh Mail) */
    send() {
      if (!enabled()) return
      noise({ dur: 0.35, peak: 0.09, filterFrom: 500, filterTo: 5000, highpass: true })
      tone({ from: 480, to: 980, dur: 0.32, peak: 0.1 })
    },
    /** Erreur (bonk) */
    error() {
      if (!enabled()) return
      tone({ from: 200, dur: 0.16, peak: 0.18, type: 'triangle' })
      tone({ from: 150, dur: 0.2, peak: 0.12, type: 'triangle', delay: 0.02 })
    },
    /** Carillon de démarrage (accord fa dièse majeur, hommage synthétisé) */
    boot() {
      if (!enabled()) return
      const chord = [92.5, 138.59, 185, 233.08, 277.18]
      chord.forEach((f) =>
        tone({ from: f, dur: 1.9, peak: 0.055, type: 'sawtooth', lowpass: 900 })
      )
    },
  }
}
