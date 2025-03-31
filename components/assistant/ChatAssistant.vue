<template>
  <div>
    <button
      class="fixed bottom-6 right-6 z-50 bg-black text-white p-4 rounded-full shadow-lg hover:scale-105 transition duration-300"
      @click="toggleChat"
    >
      <i class="fas fa-robot text-xl"></i>
    </button>

    <transition name="fade-slide">
      <div
        v-if="isOpen"
        class="fixed bottom-24 right-6 w-[90%] max-w-sm bg-white border border-gray-200 rounded-2xl shadow-xl flex flex-col z-50 overflow-hidden"
      >
        <div
          class="bg-gray-100 px-4 py-3 text-black flex justify-between items-center"
        >
          <div class="flex items-center gap-2">
            <i class="fas fa-comments text-gray-500 text-lg"></i>
            <span class="font-semibold">{{ t('title') }}</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="relative">
              <select
                v-model="selectedLang"
                class="appearance-none text-sm bg-white border border-gray-300 rounded-lg pl-3 pr-7 py-1 focus:outline-none hover:border-black transition"
              >
                <option value="fr">🇫🇷</option>
                <option value="en">🇬🇧</option>
              </select>
              <i
                class="fas fa-chevron-down absolute right-2 top-1.5 text-xs text-gray-400 pointer-events-none"
              ></i>
            </div>
            <button
              class="text-gray-400 hover:text-black transition"
              @click="toggleChat"
              aria-label="Fermer le chat"
            >
              <i class="fas fa-times text-lg"></i>
            </button>
          </div>
        </div>

        <div
          ref="chatBody"
          class="flex-1 overflow-y-auto px-4 py-3 space-y-3 text-sm text-gray-800 max-h-96 scroll-smooth"
        >
          <div
            v-for="(message, index) in messages"
            :key="index"
            class="flex items-end"
            :class="message.from === 'user' ? 'justify-end' : 'justify-start'"
          >
            <div v-if="message.from === 'bot'" class="flex items-end gap-2">
              <div
                class="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm text-gray-700 shadow"
              >
                <i class="fas fa-robot"></i>
              </div>
              <div
                class="px-4 py-2 rounded-xl max-w-[80%] break-words whitespace-pre-wrap bg-gray-200 text-gray-900 shadow"
              >
                <!-- eslint-disable-next-line vue/no-v-html -->
                <span v-html="message.text"></span>
              </div>
            </div>

            <div v-else class="flex items-end gap-2 flex-row-reverse">
              <div
                class="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm shadow"
              >
                <i class="fas fa-user"></i>
              </div>
              <div
                class="px-4 py-2 rounded-xl max-w-[80%] break-words whitespace-pre-wrap bg-black text-white shadow"
              >
                {{ message.text }}
              </div>
            </div>
          </div>

          <div v-if="isBotTyping" class="flex justify-start">
            <div
              class="bg-gray-200 text-black px-4 py-2 rounded-xl text-sm max-w-[80%]"
            >
              <span class="typing-dots">
                <span>.</span><span>.</span><span>.</span>
              </span>
            </div>
          </div>
        </div>

        <form
          class="p-3 flex space-x-2 border-t border-gray-100"
          @submit.prevent="sendMessage"
        >
          <input
            ref="inputRef"
            v-model="newMessage"
            type="text"
            :placeholder="t('placeholder')"
            class="flex-1 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none text-sm"
            :disabled="isBotTyping"
          />
          <button
            type="submit"
            class="bg-black text-white px-4 py-2 rounded-xl text-sm hover:opacity-90 transition disabled:opacity-50"
            :disabled="isBotTyping"
          >
            {{ t('send') }}
          </button>
        </form>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import { type Lang, useChatbotIntents } from '@/composables/useChatbotIntents'
import { sanitizeHtml } from '@/utils/sanitizeHtml'

const isOpen = ref(false)
const newMessage = ref('')
const chatBody = ref<HTMLElement | null>(null)
const isBotTyping = ref(false)
const inputRef = ref<HTMLInputElement | null>(null)
const selectedLang = ref<Lang>('fr')

const messages = ref([
  {
    from: 'bot',
    text:
      selectedLang.value === 'fr'
        ? '👋 Bonjour ! Je suis là pour répondre à tes questions sur mon portfolio.'
        : "👋 Hello! I'm here to answer your questions about my portfolio.",
  },
])

onMounted(() => {
  const handler = (e: Event) => {
    const target = e.target as HTMLElement
    if (target.classList.contains('lang-switch')) {
      selectedLang.value = target.dataset.lang as Lang
    }
  }

  document.addEventListener('click', handler)

  onBeforeUnmount(() => {
    document.removeEventListener('click', handler)
  })
})

const intents = useChatbotIntents()
const lastIntent = ref<string | null>(null)
const awaitingFollowUp = ref<string | null>(null)

const toggleChat = async () => {
  isOpen.value = !isOpen.value
  await nextTick()
  if (isOpen.value) {
    inputRef.value?.focus()
    chatBody.value?.scrollTo({ top: chatBody.value.scrollHeight })
  }
}

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

  for (const intent of intents) {
    for (const word of wordList) {
      if (intent.keywords.fr.includes(word)) scoreFr++
      if (intent.keywords.en.includes(word)) scoreEn++
    }
  }

  return scoreEn > scoreFr ? 'en' : 'fr'
}

const getBotResponse = (msg: string): string => {
  const input = msg.toLowerCase()
  const lang = selectedLang.value
  let bestMatch = { intent: 'default', score: 0 }

  for (const intent of intents) {
    const keywords = intent.keywords[lang] || []
    for (const kw of keywords) {
      const score = similarity(input, kw)
      if (score > bestMatch.score) {
        bestMatch = { intent: intent.intent, score }
      }
    }
  }

  const match = intents.find((i) => i.intent === bestMatch.intent)
  const response =
    match?.response[lang] ??
    intents.find((i) => i.intent === 'default')!.response[lang]

  if (awaitingFollowUp.value && bestMatch.intent === awaitingFollowUp.value) {
    awaitingFollowUp.value = null
    return response
  }

  lastIntent.value = match?.intent ?? null

  if (match?.followUp) {
    awaitingFollowUp.value = match.followUp.expectedIntent
    return `${response}\n\n${match.followUp.question[lang]}`
  }

  return response
}

const sendMessage = async () => {
  if (!newMessage.value.trim() || isBotTyping.value) return

  const userText = newMessage.value.trim()
  messages.value.push({ from: 'user', text: userText })
  newMessage.value = ''
  isBotTyping.value = true

  await nextTick()
  chatBody.value?.scrollTo({
    top: chatBody.value.scrollHeight,
    behavior: 'smooth',
  })

  const detectedLang = detectLang(userText)
  if (detectedLang !== selectedLang.value) {
    setTimeout(async () => {
      const switchMsg =
        detectedLang === 'en'
          ? `🇬🇧 It looks like you're speaking English. <span class='lang-switch underline cursor-pointer text-blue-600' data-lang="en">Switch to English</span>`
          : `🇫🇷 On dirait que tu parles français. <span class='lang-switch underline cursor-pointer text-blue-600' data-lang="fr">Passer en français</span>`

      messages.value.push({ from: 'bot', text: sanitizeHtml(switchMsg) })
      isBotTyping.value = false

      await nextTick()
      chatBody.value?.scrollTo({
        top: chatBody.value.scrollHeight,
        behavior: 'smooth',
      })
      inputRef.value?.focus()
    }, 1000)
    return
  }

  setTimeout(async () => {
    const rawResponse = getBotResponse(userText)
    messages.value.push({ from: 'bot', text: sanitizeHtml(rawResponse) })
    isBotTyping.value = false

    await nextTick()
    chatBody.value?.scrollTo({
      top: chatBody.value.scrollHeight,
      behavior: 'smooth',
    })
    inputRef.value?.focus()
  }, 1000)
}

const t = (key: 'title' | 'placeholder' | 'send') => {
  const translations = {
    fr: {
      title: 'Assistant',
      placeholder: 'Pose-moi une question…',
      send: 'Envoyer',
    },
    en: {
      title: 'Assistant',
      placeholder: 'Ask me something…',
      send: 'Send',
    },
  }
  return translations[selectedLang.value][key]
}

watch(messages, async () => {
  await nextTick()
  chatBody.value?.scrollTo({
    top: chatBody.value.scrollHeight,
    behavior: 'smooth',
  })
})

watch(selectedLang, (lang) => {
  messages.value = [
    {
      from: 'bot',
      text:
        lang === 'fr'
          ? '👋 Bonjour ! Je suis là pour répondre à tes questions sur mon portfolio.'
          : "👋 Hello! I'm here to answer your questions about my portfolio.",
    },
  ]

  nextTick(() => {
    chatBody.value?.scrollTo({
      top: chatBody.value.scrollHeight,
      behavior: 'smooth',
    })
    inputRef.value?.focus()
  })
})
</script>

<style scoped>
.shadow {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.typing-dots span {
  animation: blink 1.5s infinite;
  animation-delay: calc(var(--i) * 0.2s);
  display: inline-block;
  font-size: 1.2em;
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
    opacity: 0.2;
  }
  40% {
    opacity: 1;
  }
}
</style>
