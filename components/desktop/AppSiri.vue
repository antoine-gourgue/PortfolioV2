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
        class="fixed inset-x-3 bottom-24 z-[320] mx-auto w-auto max-w-[360px] rounded-3xl bg-[#1c1c1e]/90 p-5 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.6)] ring-1 ring-white/10 backdrop-blur-2xl lg:inset-x-auto lg:right-4 lg:top-10 lg:bottom-auto lg:w-[340px]"
        @click.stop
      >
        <button
          class="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-[11px] text-white/60 transition hover:bg-white/20"
          aria-label="close"
          @click="closeSiri"
        >
          ✕
        </button>

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

        <p class="mt-2 text-center text-[9.5px] text-white/25">
          {{ $t('macos.siriPowered') }}
        </p>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { type Lang, useChatbotIntents } from '@/composables/useChatbotIntents'

const desktop = useDesktop()
const sfx = useSfx()
const track = useTrack()
const { locale, t } = useI18n()

const listening = ref(false)
const thinking = ref(false)
const transcript = ref('')
const textInput = ref('')
const exchanges = ref<Array<{ question: string; answer: string }>>([])
const convEl = ref<HTMLElement | null>(null)

// History sent to the LLM
const history: Array<{ role: 'user' | 'assistant'; content: string }> = []

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
  unlockSpeech()
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

// Speech synthesis: prefer the Google voice for the language
const pickVoice = (): SpeechSynthesisVoice | undefined => {
  const lang = (LANGS[locale.value] ?? 'fr-FR').slice(0, 2)
  const candidates = speechSynthesis
    .getVoices()
    .filter((v) => v.lang.toLowerCase().startsWith(lang))
  return (
    candidates.find((v) => v.name.includes('Google')) ??
    candidates.find((v) => /enhanced|premium|améliorée/i.test(v.name)) ??
    candidates[0]
  )
}

onMounted(() => {
  // getVoices() is empty until the browser has loaded the list
  speechSynthesis?.getVoices?.()
  speechSynthesis?.addEventListener?.('voiceschanged', () =>
    speechSynthesis.getVoices()
  )
})

// iOS only allows speak() once unlocked by a user gesture: speak a muted
// utterance during the click, real replies go through afterwards
let speechUnlocked = false
const unlockSpeech = () => {
  if (speechUnlocked || !('speechSynthesis' in window)) return
  try {
    const utterance = new SpeechSynthesisUtterance(' ')
    utterance.volume = 0
    speechSynthesis.speak(utterance)
    speechUnlocked = true
  } catch {
    /* synthesis unavailable */
  }
}

const speak = (text: string) => {
  if (desktop.state.value.sfxMuted || !('speechSynthesis' in window)) return
  const utterance = new SpeechSynthesisUtterance(
    // emojis and URLs are not read aloud
    text
      .replace(/https?:\/\/\S+/g, '')
      .replace(/[\p{Emoji_Presentation}]/gu, '')
  )
  utterance.lang = LANGS[locale.value] ?? 'fr-FR'
  const voice = pickVoice()
  if (voice) utterance.voice = voice
  utterance.rate = 1.05
  const fire = () => speechSynthesis.speak(utterance)
  if (speechSynthesis.speaking || speechSynthesis.pending) {
    speechSynthesis.cancel()
    // iOS: speak() right after cancel() gets swallowed without this delay
    setTimeout(fire, 150)
  } else {
    fire()
  }
}

// The model may leak markdown: flatten it to plain text
const stripMarkdown = (text: string) =>
  text
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[*_`#]+/g, '')
    .replace(/^\s*[-•]\s+/gm, '')
    .trim()

// Offline fallback. Groq runs on a free quota (8 req/IP/min, 24 global)
// and can be unreachable. Rather than an error, answer with the local
// intent engine: degraded but still useful, and beyond any network failure.
const intents = useChatbotIntents()

// Intents contain HTML links; Siri renders plain text and reads it aloud,
// so only the label is kept.
const stripHtml = (html: string) =>
  html
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim()

const similarity = (input: string, keyword: string): number => {
  const words = input.toLowerCase().split(/\s+/)
  const kwWords = keyword.toLowerCase().split(/\s+/)
  const common = words.filter((w) => kwWords.includes(w))
  return common.length / Math.max(words.length, kwWords.length)
}

const offlineAnswer = (question: string): string => {
  const lang = (locale.value as Lang) ?? 'fr'
  const input = question.toLowerCase()
  let best = { intent: 'default', score: 0 }
  for (const intent of intents) {
    for (const keyword of intent.keywords[lang] ?? []) {
      const score = similarity(input, keyword)
      if (score > best.score) best = { intent: intent.intent, score }
    }
  }
  const match = intents.find((i) => i.intent === best.intent)
  const fallback = intents.find((i) => i.intent === 'default')!
  return stripHtml(
    match?.response[lang] ?? fallback.response[lang] ?? fallback.response.fr
  )
}

const ask = async (question: string) => {
  track('siri_question', { question })
  thinking.value = true
  history.push({ role: 'user', content: question })
  try {
    const res = await $fetch<{ reply: string }>('/api/siri', {
      method: 'POST',
      body: { messages: history },
    })
    const reply = stripMarkdown(res.reply)
    history.push({ role: 'assistant', content: reply })
    exchanges.value.push({ question, answer: reply })
    speak(reply)
  } catch {
    history.pop()
    const answer = offlineAnswer(question)
    exchanges.value.push({ question, answer })
    speak(answer)
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
  unlockSpeech()
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
      // start listening right away (the open came from a user click)
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
/* Siri orb: glossy sphere with colored swirls (official-icon style) */
.siri-orb {
  position: relative;
  overflow: hidden;
  background: #eaf6ff;
  box-shadow:
    0 6px 22px rgba(46, 109, 246, 0.35),
    inset 0 0 10px rgba(255, 255, 255, 0.6);
}
.siri-orb::before {
  content: '';
  position: absolute;
  inset: -22%;
  background:
    radial-gradient(38% 34% at 28% 40%, #12d8f5 0%, transparent 70%),
    radial-gradient(40% 34% at 72% 30%, #2e6df6 0%, transparent 70%),
    radial-gradient(36% 32% at 76% 66%, #8a44f2 0%, transparent 70%),
    radial-gradient(42% 30% at 46% 80%, #e9538f 0%, transparent 70%),
    radial-gradient(30% 26% at 24% 72%, #ff7a5c 0%, transparent 70%),
    radial-gradient(30% 26% at 50% 52%, #7ce7f5 0%, transparent 70%);
  filter: blur(7px);
  animation: siri-swirl 7s linear infinite;
}
.siri-orb::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 9999px;
  background: radial-gradient(
    circle at 38% 25%,
    rgba(255, 255, 255, 0.9),
    transparent 48%
  );
}
.siri-orb--active::before {
  animation-duration: 1.8s;
}
.siri-orb--active {
  animation: siri-breathe 1.1s ease-in-out infinite;
}
@keyframes siri-swirl {
  to {
    transform: rotate(360deg);
  }
}
@keyframes siri-breathe {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.08);
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
