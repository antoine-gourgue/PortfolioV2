<template>
  <main ref="container" class="mx-auto w-full max-w-3xl px-4 pt-16 lg:px-8">
    <div ref="winEl" class="win">
      <UiMacWindow
        :title="$t('macos.mailTitle')"
        @close="closeToDesktop"
        @minimize="closeToDesktop"
        @zoom="toggleZoom"
      >
        <!-- Envoi dans la barre de navigation iOS (mobile) -->
        <template #ios-action>
          <button
            class="flex h-7 w-7 items-center justify-center rounded-full bg-ablue text-[14px] text-white disabled:opacity-40"
            :disabled="loading"
            :aria-label="$t('contact.send')"
            @click="submitForm"
          >
            ↑
          </button>
        </template>

        <!-- Bascule Boîte de réception / Nouveau message -->
        <div
          class="flex items-center gap-1.5 border-b border-black/5 bg-white/60 px-5 py-2"
        >
          <button
            class="rounded-full px-3 py-1 text-[12.5px] font-semibold transition"
            :class="
              mailView === 'inbox'
                ? 'bg-ablue text-white'
                : 'text-black/50 hover:bg-black/5'
            "
            @click="mailView = 'inbox'"
          >
            {{ $t('macos.mailInbox') }}
            <span
              v-if="mailView !== 'inbox'"
              class="ml-1 rounded-full bg-ablue px-1.5 text-[10px] text-white"
              >{{ inboxMails.length }}</span
            >
          </button>
          <button
            class="rounded-full px-3 py-1 text-[12.5px] font-semibold transition"
            :class="
              mailView === 'compose'
                ? 'bg-ablue text-white'
                : 'text-black/50 hover:bg-black/5'
            "
            @click="mailView = 'compose'"
          >
            ✏️ {{ $t('macos.mailCompose') }}
          </button>
        </div>

        <!-- ── Boîte de réception ── -->
        <div v-if="mailView === 'inbox'" class="min-h-[380px]">
          <!-- Liste -->
          <div v-if="!openedMail" class="divide-y divide-black/5">
            <button
              v-for="mail in inboxMails"
              :key="mail.id"
              class="flex w-full items-start gap-3 px-5 py-3.5 text-left transition hover:bg-black/[0.03]"
              @click="openedMail = mail.id"
            >
              <span
                class="mt-0.5 h-2 w-2 shrink-0 rounded-full"
                :class="
                  readMails.includes(mail.id) ? 'bg-transparent' : 'bg-ablue'
                "
              ></span>
              <span
                class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-[#3b4048] to-[#17181b]"
              >
                <AgLogo class="h-4 w-5 text-white" />
              </span>
              <span class="min-w-0 flex-1">
                <span class="flex items-baseline justify-between gap-2">
                  <span class="truncate text-[13.5px] font-semibold text-aink">
                    Antoine Gourgue
                  </span>
                  <span class="shrink-0 text-[11px] text-black/35">{{
                    mail.date
                  }}</span>
                </span>
                <span
                  class="block truncate text-[13px] font-medium text-aink/90"
                >
                  {{ $t(mail.subjectKey) }}
                </span>
                <span class="block truncate text-[12px] text-black/45">
                  {{ $t(mail.previewKey) }}
                </span>
              </span>
            </button>
          </div>

          <!-- Lecture -->
          <div v-else class="px-5 py-4 sm:px-7">
            <button
              class="mb-3 flex items-center gap-0.5 text-[13.5px] font-medium text-ablue"
              @click="openedMail = ''"
            >
              <span class="text-lg leading-none">‹</span>
              {{ $t('macos.mailInbox') }}
            </button>
            <h2 class="text-[17px] font-bold text-aink">
              {{ $t(currentMail!.subjectKey) }}
            </h2>
            <div
              class="mt-2 flex items-center gap-2.5 border-b border-black/5 pb-3"
            >
              <span
                class="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-b from-[#3b4048] to-[#17181b]"
              >
                <AgLogo class="h-4 w-5 text-white" />
              </span>
              <span>
                <span class="block text-[13px] font-semibold text-aink"
                  >Antoine Gourgue</span
                >
                <span class="block text-[11.5px] text-black/40"
                  >antoine&#64;antoinegourgue.dev</span
                >
              </span>
              <span class="ml-auto text-[11.5px] text-black/35">{{
                currentMail!.date
              }}</span>
            </div>
            <p
              class="mt-4 whitespace-pre-line text-[13.5px] leading-relaxed text-aink/90"
            >
              {{ $t(currentMail!.bodyKey) }}
            </p>
            <button
              v-if="currentMail!.attachment"
              class="mt-5 flex items-center gap-2.5 rounded-xl border border-black/10 bg-white px-3.5 py-2.5 shadow-sm transition hover:bg-black/[0.03]"
              @click="downloadCv"
            >
              <span class="text-[22px]">📄</span>
              <span class="text-left">
                <span class="block text-[12.5px] font-semibold text-aink"
                  >antoinegourgue-cv.pdf</span
                >
                <span class="block text-[10.5px] text-black/40">PDF</span>
              </span>
              <i
                aria-hidden="true"
                class="f7-icons ml-2 text-ablue"
                style="font-size: 12px"
                >arrow_down_circle_fill</i
              >
            </button>
            <button
              class="mt-6 rounded-md bg-ablue px-4 py-1.5 text-[13px] font-medium text-white shadow-sm transition-colors hover:bg-[#0077ed]"
              @click="mailView = 'compose'"
            >
              ↩︎ {{ $t('macos.mailReply') }}
            </button>
          </div>
        </div>

        <!-- ── Nouveau message ── -->
        <form v-else @submit.prevent="submitForm">
          <!-- Barre d'outils de composition (desktop) -->
          <div
            class="hidden items-center gap-5 border-b border-black/5 bg-white/60 px-5 py-2.5 lg:flex"
          >
            <button
              type="submit"
              :disabled="loading"
              class="flex h-8 w-8 items-center justify-center rounded-md text-[15px] text-ablue transition-colors hover:bg-black/5 disabled:opacity-40"
              :title="$t('contact.send')"
            >
              <i
                aria-hidden="true"
                class="f7-icons"
                :class="loading ? 'animate-spin' : ''"
                style="font-size: 15px"
                >{{ loading ? 'arrow_2_circlepath' : 'paperplane_fill' }}</i
              >
            </button>
            <i
              aria-hidden="true"
              class="f7-icons text-black/30"
              style="font-size: 14px"
              >paperclip</i
            >
            <i
              aria-hidden="true"
              class="f7-icons text-black/30"
              style="font-size: 14px"
              >textformat</i
            >
            <span class="ml-auto text-[12px] text-black/35">{{
              $t('contact.description')
            }}</span>
          </div>

          <div class="px-6 pb-7 pt-2 sm:px-7">
            <!-- À : (destinataire fixe) -->
            <div class="mail-row">
              <span class="mail-label">{{ $t('macos.mailToShort') }}</span>
              <span
                class="inline-flex items-center gap-1.5 rounded-full bg-ablue/10 px-2.5 py-0.5 text-[13px] font-medium text-ablue"
              >
                <AgLogo class="h-3 w-4" />
                {{ $t('macos.mailRecipient') }}
              </span>
            </div>

            <!-- De : (email du visiteur) -->
            <div class="mail-row">
              <span class="mail-label">{{ $t('macos.mailFrom') }}</span>
              <input
                v-model="form.email"
                type="email"
                required
                :placeholder="$t('contact.email')"
                class="mail-input"
              />
            </div>

            <!-- Nom -->
            <div class="mail-row">
              <span class="mail-label">{{ $t('macos.mailName') }}</span>
              <input
                v-model="form.name"
                type="text"
                required
                :placeholder="$t('contact.name')"
                class="mail-input"
              />
            </div>

            <!-- Objet -->
            <div class="mail-row">
              <span class="mail-label">{{ $t('macos.mailSubjectShort') }}</span>
              <span class="text-[14px] font-medium">{{
                $t('macos.mailDefaultSubject')
              }}</span>
            </div>

            <!-- Corps -->
            <textarea
              v-model="form.message"
              required
              rows="9"
              :placeholder="$t('contact.message')"
              class="mt-3 w-full resize-none bg-transparent text-[15px] leading-relaxed text-aink outline-none placeholder:text-black/30"
            ></textarea>

            <!-- Honeypot anti-bot -->
            <input
              v-model="form.honeypot"
              type="text"
              autocomplete="off"
              tabindex="-1"
              class="hidden"
            />

            <p v-if="errorMessage" class="mt-2 text-[13px] text-red-500">
              {{ errorMessage }}
            </p>

            <div class="mt-4 flex items-center justify-end gap-4">
              <button
                type="submit"
                :disabled="loading"
                class="rounded-md bg-ablue px-5 py-1.5 text-[13px] font-medium text-white shadow-sm transition-colors hover:bg-[#0077ed] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {{ loading ? $t('contact.sending') : $t('contact.send') }}
              </button>
            </div>
          </div>
        </form>
      </UiMacWindow>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from '#imports'
import AgLogo from '~/components/ui/AGLogo.vue'

const { t } = useI18n()
const { gsap } = useGsap()
const sfx = useSfx()
const { notify } = useNotify()

const form = ref({
  name: '',
  email: '',
  message: '',
  honeypot: '',
})

const loading = ref(false)
const errorMessage = ref<string | null>(null)

// ── Boîte de réception ──
interface InboxMail {
  id: string
  subjectKey: string
  previewKey: string
  bodyKey: string
  date: string
  attachment?: boolean
}

const inboxMails: InboxMail[] = [
  {
    id: 'welcome',
    subjectKey: 'macos.mailWelcomeSubject',
    previewKey: 'macos.mailWelcomePreview',
    bodyKey: 'macos.mailWelcomeBody',
    date: '09:41',
  },
  {
    id: 'cv',
    subjectKey: 'macos.mailCvSubject',
    previewKey: 'macos.mailCvPreview',
    bodyKey: 'macos.mailCvBody',
    date: '09:38',
    attachment: true,
  },
]

const mailView = ref<'inbox' | 'compose'>('inbox')
const openedMail = ref('')
const readMails = ref<string[]>([])
const currentMail = computed(() =>
  inboxMails.find((m) => m.id === openedMail.value)
)
watch(openedMail, (id) => {
  if (id && !readMails.value.includes(id)) readMails.value.push(id)
})

const downloadCv = () => {
  const a = document.createElement('a')
  a.href = '/assets/antoinegourgue-cv.pdf'
  a.download = ''
  a.click()
}

const validateClient = () => {
  errorMessage.value = null

  if (
    !form.value.name.trim() ||
    !form.value.email.trim() ||
    !form.value.message.trim()
  ) {
    errorMessage.value = t('contact.errors.fillAll')
    return false
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(form.value.email.trim())) {
    errorMessage.value = t('contact.errors.invalidEmail')
    return false
  }

  if (form.value.message.trim().length < 5) {
    errorMessage.value = t('contact.errors.tooShort')
    return false
  }

  return true
}

const submitForm = async () => {
  if (!validateClient()) return
  if (form.value.honeypot && form.value.honeypot.trim().length > 0) return

  loading.value = true
  errorMessage.value = null

  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: {
        name: form.value.name,
        email: form.value.email,
        message: form.value.message,
        honeypot: form.value.honeypot,
      },
    })

    sfx.send()
    notify({ icon: 'mail', title: 'Mail', message: t('contact.success') })

    form.value.name = ''
    form.value.email = ''
    form.value.message = ''
    form.value.honeypot = ''
  } catch (error: unknown) {
    // eslint-disable-next-line no-console
    console.error(error)
    const errorObj = error as {
      data?: { message?: string }
      statusMessage?: string
    }
    errorMessage.value =
      errorObj?.data?.message ||
      errorObj?.statusMessage ||
      t('contact.errors.failed')
    sfx.error()
    notify({ icon: 'mail', title: 'Mail', message: t('contact.errors.failed') })
  } finally {
    loading.value = false
  }
}

const container = ref<HTMLElement | null>(null)
const winEl = ref<HTMLElement | null>(null)
const { closeToDesktop, toggleZoom } = usePageWindow(winEl)
let ctx: gsap.Context | undefined

onMounted(() => {
  if (!container.value) return
  ctx = gsap.context(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.win', {
        autoAlpha: 0,
        scale: 0.94,
        y: 30,
        duration: 0.65,
        ease: 'back.out(1.2)',
      })
    })
  }, container.value)
})

onUnmounted(() => ctx?.revert())
</script>

<style scoped>
.mail-row {
  @apply flex items-center gap-3 border-b border-black/5 py-3 lg:py-2.5;
}
.mail-label {
  @apply w-14 shrink-0 text-[15px] text-agray lg:text-[13px];
}
.mail-input {
  @apply flex-1 bg-transparent text-[15px] text-aink outline-none placeholder:text-black/30 lg:text-[14px];
}
</style>
