<template>
  <Teleport to="body">
    <div
      v-if="desktop.state.value.apps.messages"
      ref="winEl"
      class="fixed inset-0 z-40 flex flex-col overflow-hidden bg-white lg:inset-auto lg:right-[8%] lg:top-24 lg:h-[480px] lg:w-[370px] lg:rounded-2xl lg:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.55)] lg:ring-1 lg:ring-black/10"
      :style="{ zIndex: z }"
      @pointerdown="bringToFront"
    >
      <!-- En-tête iMessage -->
      <div
        class="msg-drag flex flex-col items-center border-b border-black/5 bg-[#F5F5F7]/90 px-3 pb-2 pt-10 backdrop-blur lg:pt-2.5"
      >
        <div class="flex w-full items-center">
          <!-- Fermer (desktop : pastille / mobile : chevron iOS) -->
          <button
            class="group hidden h-3 w-3 items-center justify-center rounded-full border border-[#E0443E] bg-[#FF5F57] lg:flex"
            aria-label="close"
            @click.stop="sfx.minimize(), desktop.closeApp('messages')"
            @pointerdown.stop
          >
            <svg viewBox="0 0 12 12" class="h-full w-full p-[1px] opacity-0 group-hover:opacity-100">
              <path d="M3.6 3.6 L8.4 8.4 M8.4 3.6 L3.6 8.4" stroke="#820005" stroke-width="1.2" stroke-linecap="round" />
            </svg>
          </button>
          <button
            class="flex items-center gap-0.5 text-[15px] font-medium text-[#0A84FF] lg:hidden"
            @click.stop="sfx.minimize(), desktop.closeApp('messages')"
          >
            <span class="text-[19px] leading-none">‹</span>
            {{ $t('macos.close') }}
          </button>
        </div>
        <div
          class="-mt-1 flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-b from-[#3b4048] to-[#17181b] shadow-sm"
        >
          <AgLogo class="h-6 w-7 text-white" />
        </div>
        <p class="mt-1 text-[12px] font-semibold text-aink">Antoine</p>
        <p class="text-[10px] text-black/40">{{ $t('chatbot.title') }}</p>
      </div>

      <!-- Conversation -->
      <div
        ref="chatBody"
        class="no-scrollbar flex-1 space-y-1.5 overflow-y-auto px-3 py-3"
      >
        <p class="pb-1 text-center text-[10px] font-medium text-black/35">
          iMessage · {{ todayLabel }}
        </p>
        <div
          v-for="(message, index) in messages"
          :key="index"
          class="flex"
          :class="message.from === 'user' ? 'justify-end' : 'justify-start'"
        >
          <div
            class="max-w-[78%] whitespace-pre-wrap break-words rounded-2xl px-3 py-1.5 text-[13.5px] leading-snug"
            :class="
              message.from === 'user'
                ? 'rounded-br-md bg-[#0A84FF] text-white'
                : 'rounded-bl-md bg-[#E9E9EB] text-aink'
            "
          >
            <!-- eslint-disable-next-line vue/no-v-html -->
            <span v-if="message.from === 'bot'" v-html="message.text"></span>
            <template v-else>{{ message.text }}</template>
          </div>
        </div>

        <div v-if="isBotTyping" class="flex justify-start">
          <div class="rounded-2xl rounded-bl-md bg-[#E9E9EB] px-3.5 py-2">
            <span class="typing-dots text-[15px] leading-none text-black/50">
              <span>•</span><span>•</span><span>•</span>
            </span>
          </div>
        </div>
      </div>

      <!-- Saisie -->
      <form
        class="flex items-center gap-2 border-t border-black/5 bg-white px-3 py-2.5"
        @submit.prevent="sendMessage"
      >
        <input
          ref="inputRef"
          v-model="newMessage"
          type="text"
          placeholder="iMessage"
          class="flex-1 rounded-full border border-black/15 px-3.5 py-1.5 text-[13.5px] text-aink outline-none placeholder:text-black/30 focus:border-[#0A84FF]/60"
          :disabled="isBotTyping"
        />
        <button
          type="submit"
          class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0A84FF] text-[13px] text-white transition-opacity disabled:opacity-30"
          :disabled="isBotTyping || !newMessage.trim()"
          :aria-label="$t('chatbot.send')"
        >
          ↑
        </button>
      </form>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import AgLogo from '~/components/ui/AGLogo.vue'
import { type Lang, useChatbotIntents } from '@/composables/useChatbotIntents'
import { sanitizeHtml } from '@/utils/sanitizeHtml'

const desktop = useDesktop()
const { gsap, Draggable } = useGsap()
const sfx = useSfx()
const { locale, t } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const router = useRouter()

const winEl = ref<HTMLElement | null>(null)
const z = ref(40)
const bringToFront = () => {
  z.value = ++desktop.state.value.topZ + 40
}

const todayLabel = computed(() =>
  new Intl.DateTimeFormat(locale.value, {
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date())
)

// ── Logique du chatbot (intents existants) ──
const newMessage = ref('')
const chatBody = ref<HTMLElement | null>(null)
const isBotTyping = ref(false)
const inputRef = ref<HTMLInputElement | null>(null)
const selectedLang = computed(() => locale.value as Lang)

const messages = ref([{ from: 'bot', text: t('chatbot.welcome') }])

const intents = useChatbotIntents()
const awaitingFollowUp = ref<string | null>(null)

const similarity = (input: string, keyword: string): number => {
  const a = input.toLowerCase().split(/\s+/)
  const b = keyword.toLowerCase().split(/\s+/)
  const intersection = a.filter((w) => b.includes(w))
  return intersection.length / Math.max(a.length, b.length)
}

const detectLang = (input: string): Lang => {
  const wordList = input.toLowerCase().split(/\s+/)
  let scoreFr = 0
  let scoreEn = 0
  let scoreEs = 0
  for (const intent of intents) {
    for (const word of wordList) {
      if (intent.keywords.fr?.includes(word)) scoreFr++
      if (intent.keywords.en?.includes(word)) scoreEn++
      if (intent.keywords.es?.includes(word)) scoreEs++
    }
  }
  if (scoreEs > scoreFr && scoreEs > scoreEn) return 'es'
  if (scoreEn > scoreFr) return 'en'
  return 'fr'
}

const getBotResponse = (msg: string): string => {
  const input = msg.toLowerCase()
  const lang = selectedLang.value
  let bestMatch = { intent: 'default', score: 0 }
  for (const intent of intents) {
    for (const kw of intent.keywords[lang] || []) {
      const score = similarity(input, kw)
      if (score > bestMatch.score) bestMatch = { intent: intent.intent, score }
    }
  }
  const match = intents.find((i) => i.intent === bestMatch.intent)
  const defaultIntent = intents.find((i) => i.intent === 'default')!
  const response =
    match?.response[lang] ??
    defaultIntent.response[lang] ??
    defaultIntent.response.fr

  if (awaitingFollowUp.value && bestMatch.intent === awaitingFollowUp.value) {
    awaitingFollowUp.value = null
    return response
  }
  if (match?.followUp) {
    awaitingFollowUp.value = match.followUp.expectedIntent
    const question = match.followUp.question[lang] || match.followUp.question.fr
    return `${response}\n\n${question}`
  }
  return response
}

const scrollDown = async () => {
  await nextTick()
  chatBody.value?.scrollTo({ top: chatBody.value.scrollHeight, behavior: 'smooth' })
}

const sendMessage = async () => {
  if (!newMessage.value.trim() || isBotTyping.value) return
  const userText = newMessage.value.trim()
  messages.value.push({ from: 'user', text: userText })
  sfx.send()
  newMessage.value = ''
  isBotTyping.value = true
  await scrollDown()

  const detectedLang = detectLang(userText)
  const reply = () => {
    let raw: string
    if (detectedLang !== selectedLang.value) {
      const key = detectedLang === 'en' ? 'En' : detectedLang === 'es' ? 'Es' : 'Fr'
      raw = `${t(`chatbot.detected${key}`)} <span class='lang-switch underline cursor-pointer' data-lang="${detectedLang}">${t(`chatbot.switchTo${key}`)}</span>`
    } else {
      raw = getBotResponse(userText)
    }
    messages.value.push({ from: 'bot', text: sanitizeHtml(raw) })
    sfx.pop()
    isBotTyping.value = false
    scrollDown()
    inputRef.value?.focus()
  }
  setTimeout(reply, 900 + Math.min(userText.length * 15, 900))
}

watch(selectedLang, () => {
  messages.value = [{ from: 'bot', text: t('chatbot.welcome') }]
})

// Liens de changement de langue dans les bulles
const onDocClick = (e: Event) => {
  const target = e.target as HTMLElement
  if (target.classList.contains('lang-switch')) {
    const lang = target.dataset.lang as Lang
    router.push(switchLocalePath(lang))
  }
}
onMounted(() => document.addEventListener('click', onDocClick))
onUnmounted(() => document.removeEventListener('click', onDocClick))

// ── Ouverture : animation + déplacement ──
let drags: ReturnType<typeof Draggable.create> = []
watch(
  () => desktop.state.value.apps.messages,
  (open) => {
    if (!open) {
      drags.forEach((d) => d.kill())
      drags = []
      return
    }
    sfx.pop()
    nextTick(() => {
      if (!winEl.value) return
      bringToFront()
      gsap.from(winEl.value, {
        scale: 0.85,
        autoAlpha: 0,
        y: 20,
        duration: 0.35,
        ease: 'back.out(1.4)',
      })
      inputRef.value?.focus()
      scrollDown()
      if (window.matchMedia('(min-width: 1024px)').matches) {
        drags = Draggable.create(winEl.value, {
          trigger: winEl.value.querySelectorAll('.msg-drag'),
          cursor: 'grab',
          activeCursor: 'grabbing',
        })
      }
    })
  }
)
</script>

<style scoped>
.no-scrollbar {
  scrollbar-width: none;
}
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.typing-dots span {
  animation: blink 1.4s infinite;
  animation-delay: calc(var(--i) * 0.2s);
  display: inline-block;
}
.typing-dots span:nth-child(1) {
  --i: 0;
}
.typing-dots span:nth-child(2) {
  --i: 1;
}
.typing-dots span:nth-child(3) {
  --i: 2;
}
@keyframes blink {
  0%,
  80%,
  100% {
    opacity: 0.25;
  }
  40% {
    opacity: 1;
  }
}
</style>
