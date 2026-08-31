<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 lg:translate-y-2 lg:scale-95"
      leave-active-class="transition duration-200 ease-in"
      leave-to-class="opacity-0 lg:translate-y-2 lg:scale-95"
    >
      <div
        v-if="desktop.state.value.apps.siri"
        class="fixed inset-0 z-[400] flex flex-col overflow-hidden bg-black/45 backdrop-blur-2xl lg:inset-auto lg:right-4 lg:top-10 lg:h-[564px] lg:w-[384px] lg:rounded-[30px] lg:bg-[#1c1c1e]/80 lg:shadow-[0_40px_90px_-20px_rgba(0,0,0,0.7)] lg:ring-1 lg:ring-white/10"
        @click.self="closeSiri"
      >
        <!-- iOS 18-style light hugging the edges; brighter while Siri works -->
        <span
          class="siri-edge"
          :class="{ 'siri-edge--active': active }"
          aria-hidden="true"
        ></span>

        <button
          class="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-[14px] text-white/70 transition hover:bg-white/20 lg:h-7 lg:w-7 lg:text-[12px]"
          aria-label="close"
          @click="closeSiri"
        >
          ✕
        </button>

        <!-- Conversation, or the idle greeting with suggestions -->
        <div
          ref="convEl"
          class="siri-scroll relative flex-1 overflow-y-auto px-6 pt-16 lg:px-5 lg:pt-12"
        >
          <template v-if="exchanges.length">
            <div v-for="(exchange, i) in exchanges" :key="i" class="mb-5">
              <p
                class="ml-auto max-w-[86%] text-right text-[17px] font-semibold leading-snug text-white lg:text-[15px]"
              >
                {{ exchange.question }}
              </p>
              <p
                class="mt-2 text-[17px] leading-relaxed text-white/80 lg:text-[13.5px]"
              >
                {{ exchange.answer }}
              </p>
            </div>
          </template>

          <div
            v-else
            class="flex h-full flex-col items-center justify-center text-center"
          >
            <p class="text-[22px] font-semibold text-white/90 lg:text-[18px]">
              {{ $t('macos.siriGreeting') }}
            </p>
            <div class="mt-6 flex w-full max-w-[300px] flex-col gap-2.5">
              <button
                v-for="s in suggestions"
                :key="s"
                class="siri-chip"
                @click="askSuggestion(s)"
              >
                {{ s }}
              </button>
            </div>
          </div>
        </div>

        <!-- Status + orb + type-to-Siri field -->
        <div
          class="relative shrink-0 px-6 pb-[calc(18px+env(safe-area-inset-bottom,0px))] pt-2 lg:px-5 lg:pb-5"
        >
          <p
            class="mb-3 min-h-[22px] text-center text-[15px] font-medium text-white/70 lg:text-[13px]"
          >
            <template v-if="listening">{{
              transcript || $t('macos.siriListening')
            }}</template>
            <template v-else-if="thinking">{{
              $t('macos.siriThinking')
            }}</template>
          </p>

          <button
            class="mx-auto mb-4 block"
            :aria-label="listening ? 'stop' : 'listen'"
            @click="toggleListening"
          >
            <span
              class="siri-orb mx-auto block h-[88px] w-[88px] lg:h-[56px] lg:w-[56px]"
              :class="{ 'siri-orb--active': active }"
            ></span>
          </button>

          <form
            class="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-4 py-2 backdrop-blur-xl lg:py-1.5"
            @submit.prevent="submitText"
          >
            <input
              v-model="textInput"
              type="text"
              :placeholder="$t('macos.siriPlaceholder')"
              class="min-w-0 flex-1 bg-transparent text-[16px] text-white outline-none placeholder:text-white/35 lg:text-[13px]"
              :disabled="thinking"
            />
            <button
              type="submit"
              class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[15px] font-bold text-black transition disabled:opacity-30 lg:h-7 lg:w-7 lg:text-[13px]"
              :disabled="thinking || !textInput.trim()"
              aria-label="send"
            >
              ↑
            </button>
          </form>

          <p class="mt-2.5 text-center text-[10px] text-white/25">
            {{ $t('macos.siriPowered') }}
          </p>
        </div>
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

// Orb and edge light pulse whenever Siri is busy
const active = computed(() => listening.value || thinking.value)

// Idle suggestions, like the real Siri prompts
const suggestions = computed(() => [
  t('macos.siriSuggestProjects'),
  t('macos.siriSuggestAvailability'),
  t('macos.siriSuggestSkills'),
])
const askSuggestion = (s: string) => {
  unlockSpeech()
  ask(s)
}

// History sent to the LLM
const history: Array<{ role: 'user' | 'assistant'; content: string }> = []

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let recognition: any = null

const speechSupported = () =>
  typeof window !== 'undefined' &&
  ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)

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
      // Start listening right away (the open came from a user gesture), but
      // only where dictation exists — otherwise keep the idle greeting rather
      // than flashing an "unsupported" bubble.
      if (speechSupported()) nextTick(() => toggleListening())
    } else {
      recognition?.stop?.()
      speechSynthesis?.cancel()
      listening.value = false
    }
  }
)
</script>

<style scoped>
/*
  Siri orb: a glossy multicolor sphere that glows in the dark, like the
  system icon. Colored blobs swirl under a white specular highlight.
*/
.siri-orb {
  position: relative;
  overflow: hidden;
  border-radius: 9999px;
  background: radial-gradient(circle at 50% 42%, #2b2b31, #0d0d10);
  box-shadow:
    0 12px 40px -8px rgba(120, 90, 255, 0.5),
    inset 0 0 0 0.5px rgba(255, 255, 255, 0.16);
  transition: box-shadow 0.4s ease;
}
.siri-orb::before {
  content: '';
  position: absolute;
  inset: -30%;
  background:
    radial-gradient(30% 30% at 30% 34%, #12d8f5 0%, transparent 60%),
    radial-gradient(34% 30% at 70% 28%, #2e6df6 0%, transparent 60%),
    radial-gradient(30% 28% at 74% 68%, #a24bff 0%, transparent 60%),
    radial-gradient(34% 28% at 42% 78%, #ff5e8a 0%, transparent 60%),
    radial-gradient(26% 24% at 26% 70%, #ff9a5c 0%, transparent 62%);
  filter: blur(8px) saturate(1.25);
  animation: siri-swirl 8s linear infinite;
}
.siri-orb::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(
    circle at 36% 26%,
    rgba(255, 255, 255, 0.85),
    transparent 44%
  );
  mix-blend-mode: screen;
}
.siri-orb--active {
  animation: siri-breathe 1.3s ease-in-out infinite;
  box-shadow:
    0 14px 60px -6px rgba(150, 90, 255, 0.75),
    inset 0 0 0 0.5px rgba(255, 255, 255, 0.22);
}
.siri-orb--active::before {
  animation-duration: 2.4s;
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
    transform: scale(1.07);
  }
}

/* Edge light: a blurred multicolor ring hugging the window/screen edges */
.siri-edge {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 2.5px;
  pointer-events: none;
  background: conic-gradient(
    from 0deg,
    #ff5e8a,
    #a24bff,
    #2e6df6,
    #12d8f5,
    #ff9a5c,
    #ff5e8a
  );
  -webkit-mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0.32;
  filter: blur(3px);
  animation: siri-hue 9s linear infinite;
  transition:
    opacity 0.4s ease,
    filter 0.4s ease;
}
.siri-edge--active {
  opacity: 0.75;
  filter: blur(5px);
}
@keyframes siri-hue {
  to {
    filter: blur(3px) hue-rotate(360deg);
  }
}

/* Suggestion chips */
.siri-chip {
  @apply rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-2.5 text-[15px] font-medium text-white/90 backdrop-blur-xl transition hover:bg-white/[0.12] active:scale-[0.98] lg:py-2 lg:text-[13.5px];
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

@media (prefers-reduced-motion: reduce) {
  .siri-orb::before,
  .siri-orb--active,
  .siri-edge {
    animation: none;
  }
}
</style>
