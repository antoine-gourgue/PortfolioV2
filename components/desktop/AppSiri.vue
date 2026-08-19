<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="translate-y-3 opacity-0 scale-95"
      leave-active-class="transition duration-200 ease-in"
      leave-to-class="translate-y-3 opacity-0 scale-95"
    >
      <div
        v-if="desktop.state.value.apps.siri"
        class="fixed inset-x-3 bottom-24 z-[70] mx-auto w-auto max-w-[360px] rounded-3xl bg-[#1c1c1e]/90 p-5 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.6)] ring-1 ring-white/10 backdrop-blur-2xl lg:inset-x-auto lg:right-4 lg:top-10 lg:bottom-auto lg:w-[340px]"
        @click.stop
      >
        <!-- Fermer -->
        <button
          class="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-[11px] text-white/60 transition hover:bg-white/20"
          aria-label="close"
          @click="closeSiri"
        >
          ✕
        </button>

        <!-- Orbe Siri -->
        <button
          class="mx-auto block"
          :aria-label="listening ? 'stop' : 'listen'"
          @click="toggleListening"
        >
          <span
            class="siri-orb relative mx-auto block h-16 w-16 rounded-full"
            :class="{ 'siri-orb--active': listening || thinking }"
          ></span>
        </button>

        <!-- État / transcription -->
        <p
          class="mt-3 min-h-[20px] text-center text-[13px] font-medium text-white/80"
        >
          <template v-if="listening">{{
            transcript || $t('macos.siriListening')
          }}</template>
          <template v-else-if="thinking">{{
            $t('macos.siriThinking')
          }}</template>
          <template v-else-if="!exchanges.length">{{
            $t('macos.siriHint')
          }}</template>
        </p>

        <!-- Conversation -->
        <div
          v-if="exchanges.length"
          ref="convEl"
          class="siri-scroll mt-3 max-h-56 space-y-3 overflow-y-auto pr-1"
        >
          <div v-for="(exchange, i) in exchanges" :key="i">
            <p class="text-right text-[13px] font-medium text-white/60">
              « {{ exchange.question }} »
            </p>
            <p
              class="mt-1.5 rounded-2xl rounded-tl-md bg-white/10 px-3.5 py-2.5 text-[13.5px] leading-relaxed text-white"
            >
              {{ exchange.answer }}
            </p>
          </div>
        </div>

        <!-- Saisie clavier -->
        <form class="mt-4 flex items-center gap-2" @submit.prevent="submitText">
          <input
            v-model="textInput"
            type="text"
            :placeholder="$t('macos.siriPlaceholder')"
            class="flex-1 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[13px] text-white outline-none placeholder:text-white/30 focus:border-white/30"
            :disabled="thinking"
          />
          <button
            type="submit"
            class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0A84FF] text-[13px] text-white disabled:opacity-30"
            :disabled="thinking || !textInput.trim()"
            aria-label="send"
          >
            ↑
          </button>
        </form>

        <!-- Choix de la voix -->
        <div
          v-if="voices.length > 1"
          class="mt-2.5 flex items-center justify-center gap-1.5"
        >
          <i class="f7-icons text-white/30" style="font-size: 11px"
            >speaker_2_fill</i
          >
          <select
            v-model="voiceName"
            class="max-w-[220px] cursor-pointer rounded bg-transparent text-[10.5px] text-white/45 outline-none [&>option]:bg-[#1c1c1e]"
            aria-label="voice"
          >
            <option v-for="v in voices" :key="v.name" :value="v.name">
              {{ v.name.replace(/\(.*\)/, '').trim() }}
            </option>
          </select>
        </div>

        <p class="mt-2 text-center text-[9.5px] text-white/25">
          {{ $t('macos.siriPowered') }}
        </p>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const desktop = useDesktop()
const sfx = useSfx()
const { locale, t } = useI18n()

const listening = ref(false)
const thinking = ref(false)
const transcript = ref('')
const textInput = ref('')
const exchanges = ref<Array<{ question: string; answer: string }>>([])
const convEl = ref<HTMLElement | null>(null)

// Historique envoyé au LLM
const history: Array<{ role: 'user' | 'assistant'; content: string }> = []

// ── Reconnaissance vocale ──
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let recognition: any = null

const initRecognition = () => {
  if (recognition) return true
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as any
  const Ctor = w.SpeechRecognition || w.webkitSpeechRecognition
  if (!Ctor) return false
  recognition = new Ctor()
  recognition.continuous = false
  recognition.interimResults = true
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  recognition.onresult = (event: any) => {
    let text = ''
    for (const result of event.results) text += result[0].transcript
    transcript.value = text
    if (event.results[event.results.length - 1].isFinal) {
      listening.value = false
      const question = text.trim()
      transcript.value = ''
      if (question) ask(question)
    }
  }
  recognition.onend = () => (listening.value = false)
  recognition.onerror = () => (listening.value = false)
  return true
}

const LANGS: Record<string, string> = { fr: 'fr-FR', en: 'en-US', es: 'es-ES' }

const toggleListening = () => {
  if (thinking.value) return
  if (!initRecognition()) {
    exchanges.value.push({
      question: '🎤',
      answer: t('macos.dictationUnsupported'),
    })
    return
  }
  if (listening.value) {
    recognition.stop()
    listening.value = false
    return
  }
  speechSynthesis?.cancel()
  recognition.lang = LANGS[locale.value] ?? 'fr-FR'
  transcript.value = ''
  sfx.pop()
  listening.value = true
  try {
    recognition.start()
  } catch {
    listening.value = false
  }
}

// ── Synthèse vocale : voix par langue, choix mémorisé ──
const voices = ref<SpeechSynthesisVoice[]>([])
const voiceName = ref('')

const refreshVoices = () => {
  if (!('speechSynthesis' in window)) return
  const lang = (LANGS[locale.value] ?? 'fr-FR').slice(0, 2)
  voices.value = speechSynthesis
    .getVoices()
    .filter((v) => v.lang.toLowerCase().startsWith(lang))
  if (!voices.value.length) return
  const saved = localStorage.getItem('ag-siri-voice')
  if (saved && voices.value.some((v) => v.name === saved)) {
    voiceName.value = saved
    return
  }
  // Heuristique : voix Google (Chrome) > voix améliorées > premier choix
  const preferred =
    voices.value.find((v) => v.name.includes('Google')) ??
    voices.value.find((v) => /enhanced|premium|améliorée/i.test(v.name)) ??
    voices.value[0]
  voiceName.value = preferred.name
}

watch(voiceName, (name) => {
  if (name) localStorage.setItem('ag-siri-voice', name)
})
watch(locale, () => refreshVoices())

onMounted(() => {
  refreshVoices()
  // getVoices() est vide tant que le navigateur n'a pas chargé la liste
  speechSynthesis?.addEventListener?.('voiceschanged', refreshVoices)
})
onUnmounted(() => {
  speechSynthesis?.removeEventListener?.('voiceschanged', refreshVoices)
})

const speak = (text: string) => {
  if (desktop.state.value.sfxMuted || !('speechSynthesis' in window)) return
  speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(
    // on ne lit pas les emojis ni les URLs à voix haute
    text
      .replace(/https?:\/\/\S+/g, '')
      .replace(/[\p{Emoji_Presentation}]/gu, '')
  )
  utterance.lang = LANGS[locale.value] ?? 'fr-FR'
  const voice = voices.value.find((v) => v.name === voiceName.value)
  if (voice) utterance.voice = voice
  utterance.rate = 1.05
  speechSynthesis.speak(utterance)
}

// ── Appel du LLM ──
const ask = async (question: string) => {
  thinking.value = true
  history.push({ role: 'user', content: question })
  try {
    const res = await $fetch<{ reply: string }>('/api/siri', {
      method: 'POST',
      body: { messages: history },
    })
    history.push({ role: 'assistant', content: res.reply })
    exchanges.value.push({ question, answer: res.reply })
    speak(res.reply)
  } catch {
    history.pop()
    exchanges.value.push({ question, answer: t('macos.siriError') })
  } finally {
    thinking.value = false
    nextTick(() => {
      if (convEl.value) convEl.value.scrollTop = convEl.value.scrollHeight
    })
  }
}

const submitText = () => {
  const question = textInput.value.trim()
  if (!question) return
  textInput.value = ''
  ask(question)
}

const closeSiri = () => {
  recognition?.stop?.()
  speechSynthesis?.cancel()
  listening.value = false
  desktop.closeApp('siri')
}

watch(
  () => desktop.state.value.apps.siri,
  (open) => {
    if (open) {
      sfx.pop()
      // démarre l'écoute directement (l'ouverture vient d'un clic utilisateur)
      nextTick(() => toggleListening())
    } else {
      recognition?.stop?.()
      speechSynthesis?.cancel()
      listening.value = false
    }
  }
)
</script>

<style scoped>
/* Orbe Siri : dégradés animés */
.siri-orb {
  background:
    radial-gradient(circle at 30% 30%, #5ac8fa 0%, transparent 55%),
    radial-gradient(circle at 70% 35%, #bf5af2 0%, transparent 55%),
    radial-gradient(circle at 50% 75%, #ff375f 0%, transparent 55%),
    radial-gradient(circle at 50% 50%, #0a84ff 0%, #1c1c6e 80%);
  box-shadow:
    0 0 24px rgba(90, 200, 250, 0.35),
    inset 0 0 18px rgba(255, 255, 255, 0.25);
  animation: siri-rotate 6s linear infinite;
}
.siri-orb::after {
  content: '';
  position: absolute;
  inset: 4px;
  border-radius: 9999px;
  background: radial-gradient(
    circle at 35% 30%,
    rgba(255, 255, 255, 0.55),
    transparent 45%
  );
}
.siri-orb--active {
  animation:
    siri-rotate 1.6s linear infinite,
    siri-breathe 1.1s ease-in-out infinite;
}
@keyframes siri-rotate {
  to {
    filter: hue-rotate(360deg);
  }
}
@keyframes siri-breathe {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.12);
  }
}

.siri-scroll {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
}
.siri-scroll::-webkit-scrollbar {
  width: 4px;
}
.siri-scroll::-webkit-scrollbar-thumb {
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.2);
}
</style>
