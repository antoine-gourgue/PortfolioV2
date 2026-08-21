<template>
  <main ref="container" class="mx-auto w-full max-w-3xl px-4 pt-16 lg:px-8">
    <h1 class="sr-only">{{ $t('contact.title') }} — Antoine Gourgue</h1>
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
            class="inline-flex items-center gap-1 rounded-full px-3 py-1 text-[12.5px] font-semibold transition"
            :class="
              mailView === 'compose'
                ? 'bg-ablue text-white'
                : 'text-black/50 hover:bg-black/5'
            "
            @click="mailView = 'compose'"
          >
            <i
              aria-hidden="true"
              class="f7-icons leading-none"
              style="font-size: 12px"
              >square_pencil</i
            >
            {{ $t('macos.mailCompose') }}
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
              <span class="block h-8 w-8 shrink-0">
                <DesktopMacAppIcon name="pdf" />
              </span>
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

        <!-- ── Nouveau message ── (ph-no-capture : exclu du session replay) -->
        <form v-else class="ph-no-capture" @submit.prevent="submitForm">
          <!-- Barre d'outils de composition (desktop) -->
          <div
            class="hidden items-center gap-1 border-b border-black/5 bg-white/60 px-5 py-2.5 lg:flex"
          >
            <button
              type="submit"
              :disabled="loading"
              class="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-[15px] text-ablue transition-colors hover:bg-black/5 disabled:opacity-40"
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
            <span class="mx-1.5 h-4 w-px shrink-0 bg-black/10"></span>
            <button
              type="button"
              class="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-black/45 transition-colors hover:bg-black/5 hover:text-aink"
              :title="$t('macos.mailAttach')"
              @click="fileInput?.click()"
            >
              <i aria-hidden="true" class="f7-icons" style="font-size: 14px"
                >paperclip</i
              >
            </button>
            <span class="mx-1.5 h-4 w-px shrink-0 bg-black/10"></span>
            <button
              v-for="fmt in FORMATS"
              :key="fmt.cmd"
              type="button"
              class="flex h-8 w-8 shrink-0 items-center justify-center rounded-md transition-colors hover:bg-black/5"
              :class="
                activeFormats.includes(fmt.cmd)
                  ? 'bg-black/10 text-aink'
                  : 'text-black/45 hover:text-aink'
              "
              :title="$t(fmt.labelKey)"
              @mousedown.prevent="exec(fmt.cmd)"
            >
              <i aria-hidden="true" class="f7-icons" style="font-size: 14px">{{
                fmt.icon
              }}</i>
            </button>
            <span class="mx-1.5 h-4 w-px shrink-0 bg-black/10"></span>
            <div class="relative">
              <button
                type="button"
                class="flex h-8 w-8 shrink-0 items-center justify-center rounded-md transition-colors hover:bg-black/5"
                :class="emojiOpen ? 'bg-black/10 text-aink' : 'text-black/45'"
                :title="$t('macos.mailEmoji')"
                @click="emojiOpen = !emojiOpen"
              >
                <i aria-hidden="true" class="f7-icons" style="font-size: 14px"
                  >smiley</i
                >
              </button>
              <div
                v-if="emojiOpen"
                class="absolute left-0 top-9 z-20 w-[312px] rounded-xl border border-black/10 bg-white/95 p-2 shadow-xl backdrop-blur"
              >
                <input
                  v-model="emojiQuery"
                  type="text"
                  :placeholder="$t('macos.search')"
                  class="mb-1.5 w-full rounded-md bg-black/5 px-2.5 py-1.5 text-[12px] text-aink outline-none placeholder:text-black/35"
                />
                <div
                  v-if="emojiGroups.length && !emojiQuery.trim()"
                  class="mb-1 flex items-center gap-0.5"
                >
                  <button
                    v-for="(g, gi) in emojiGroups"
                    :key="g.name"
                    type="button"
                    class="flex h-7 w-7 items-center justify-center rounded-md text-[15px] transition-colors"
                    :class="
                      emojiGroup === gi ? 'bg-black/10' : 'hover:bg-black/5'
                    "
                    :title="g.name"
                    @click="emojiGroup = gi"
                  >
                    {{ g.emojis[0]?.char }}
                  </button>
                </div>
                <div class="max-h-56 overflow-y-auto">
                  <p
                    v-if="emojiLoading"
                    class="py-8 text-center text-[12px] text-black/35"
                  >
                    …
                  </p>
                  <div v-else class="grid grid-cols-8">
                    <button
                      v-for="e in visibleEmojis"
                      :key="e.char"
                      type="button"
                      class="flex h-[34px] w-[34px] items-center justify-center rounded-md text-[19px] transition-colors hover:bg-black/5"
                      :title="e.name"
                      @mousedown.prevent="insertEmoji(e.char)"
                    >
                      {{ e.char }}
                    </button>
                  </div>
                  <p
                    v-if="!emojiLoading && !visibleEmojis.length"
                    class="py-8 text-center text-[12px] text-black/35"
                  >
                    {{ $t('macos.spotlightEmpty') }}
                  </p>
                </div>
              </div>
            </div>
            <span
              class="ml-auto min-w-0 truncate pl-3 text-[12px] text-black/35"
              >{{ $t('contact.description') }}</span
            >
          </div>

          <!-- Sélecteur de fichier caché (pièce jointe) -->
          <input
            ref="fileInput"
            type="file"
            class="hidden"
            accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
            @change="onFileChange"
          />

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

            <!-- Pièce jointe -->
            <div v-if="attachedFile" class="mt-3">
              <div
                class="inline-flex items-center gap-2.5 rounded-xl border border-black/10 bg-white px-3.5 py-2 shadow-sm"
              >
                <span
                  v-if="attachedFile.type.includes('pdf')"
                  class="block h-7 w-7 shrink-0"
                >
                  <DesktopMacAppIcon name="pdf" />
                </span>
                <i
                  v-else
                  aria-hidden="true"
                  class="f7-icons shrink-0 text-ablue"
                  style="font-size: 22px"
                  >doc_fill</i
                >
                <span class="text-left">
                  <span
                    class="block max-w-[220px] truncate text-[12.5px] font-semibold text-aink"
                    >{{ attachedFile.name }}</span
                  >
                  <span class="block text-[10.5px] text-black/40">{{
                    prettySize(attachedFile.size)
                  }}</span>
                </span>
                <button
                  type="button"
                  class="ml-1 flex h-5 w-5 items-center justify-center rounded-full text-black/40 transition hover:bg-black/10 hover:text-aink"
                  :title="$t('macos.mailAttachRemove')"
                  @click="removeAttachment"
                >
                  <i aria-hidden="true" class="f7-icons" style="font-size: 11px"
                    >xmark</i
                  >
                </button>
              </div>
            </div>

            <!-- Corps : éditeur riche façon Mail -->
            <div
              ref="editorEl"
              contenteditable="true"
              class="mail-editor mt-3 min-h-[210px] w-full text-[15px] leading-relaxed text-aink outline-none"
              :data-placeholder="$t('contact.message')"
              @input="syncEditor"
              @paste="onEditorPaste"
              @focus="emojiOpen = false"
            ></div>

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
const track = useTrack()
const { notify } = useNotify()

const form = ref({
  name: '',
  email: '',
  message: '',
  honeypot: '',
})

const loading = ref(false)
const errorMessage = ref<string | null>(null)

// ── Pièce jointe (3 Mo max : limite du body des fonctions Vercel) ──
const fileInput = ref<HTMLInputElement | null>(null)
const attachedFile = ref<File | null>(null)
const MAX_ATTACH_BYTES = 3 * 1024 * 1024

const onFileChange = (e: Event) => {
  const f = (e.target as HTMLInputElement).files?.[0]
  if (!f) return
  if (f.size > MAX_ATTACH_BYTES) {
    errorMessage.value = t('contact.errors.attachTooBig')
    if (fileInput.value) fileInput.value.value = ''
    return
  }
  errorMessage.value = null
  attachedFile.value = f
}

const removeAttachment = () => {
  attachedFile.value = null
  if (fileInput.value) fileInput.value.value = ''
}

const prettySize = (bytes: number) =>
  bytes < 1024 * 1024
    ? `${Math.max(1, Math.round(bytes / 1024))} Ko`
    : `${(bytes / 1024 / 1024).toFixed(1)} Mo`

const fileToBase64 = (f: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve((reader.result as string).split(',')[1] ?? '')
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(f)
  })

// ── Éditeur riche façon Mail ──
const editorEl = ref<HTMLElement | null>(null)
const messageHtml = ref('')
const emojiOpen = ref(false)
watch(emojiOpen, (open) => {
  if (open) loadEmojis()
})

const FORMATS = [
  { cmd: 'bold', icon: 'bold', labelKey: 'macos.mailFmtBold' },
  { cmd: 'italic', icon: 'italic', labelKey: 'macos.mailFmtItalic' },
  { cmd: 'underline', icon: 'underline', labelKey: 'macos.mailFmtUnderline' },
  {
    cmd: 'strikeThrough',
    icon: 'strikethrough',
    labelKey: 'macos.mailFmtStrike',
  },
  {
    cmd: 'insertUnorderedList',
    icon: 'list_bullet',
    labelKey: 'macos.mailFmtListBullet',
  },
  {
    cmd: 'insertOrderedList',
    icon: 'list_number',
    labelKey: 'macos.mailFmtListNumber',
  },
]

// Jeu complet chargé depuis /api/emojis ; liste courte en secours hors-ligne
const EMOJIS_FALLBACK =
  '😀 😁 😂 🤣 😊 😍 😎 🤩 😅 🙂 😉 🤔 🤯 😴 😭 😡 👍 👎 👋 🙏 💪 👏 🤝 ❤️ 🔥 ⭐ 🎉 🚀 💡 ✅ ❌ ☕ 🍕 🎧 💻 📎 📅 📍 🐎'.split(
    ' '
  )

interface EmojiGroup {
  name: string
  emojis: { char: string; name: string }[]
}

const emojiGroups = ref<EmojiGroup[]>([])
const emojiGroup = ref(0)
const emojiQuery = ref('')
const emojiLoading = ref(false)

const loadEmojis = async () => {
  if (emojiGroups.value.length || emojiLoading.value) return
  emojiLoading.value = true
  try {
    const data = await $fetch<{ groups: EmojiGroup[] }>('/api/emojis')
    emojiGroups.value = data.groups
  } catch {
    // on garde le fallback statique
  } finally {
    emojiLoading.value = false
  }
}

const visibleEmojis = computed(() => {
  if (!emojiGroups.value.length)
    return EMOJIS_FALLBACK.map((char) => ({ char, name: '' }))
  const q = emojiQuery.value.trim().toLowerCase()
  if (q) {
    return emojiGroups.value
      .flatMap((g) => g.emojis)
      .filter((e) => e.name.toLowerCase().includes(q))
      .slice(0, 160)
  }
  return emojiGroups.value[emojiGroup.value]?.emojis ?? []
})

const syncEditor = () => {
  const el = editorEl.value
  if (!el) return
  form.value.message = el.innerText.trim()
  messageHtml.value = el.innerHTML
}

// Collage en texte brut pour garder un mail propre
const onEditorPaste = (e: ClipboardEvent) => {
  e.preventDefault()
  const text = e.clipboardData?.getData('text/plain') ?? ''
  document.execCommand('insertText', false, text)
}

const exec = (cmd: string) => {
  editorEl.value?.focus()
  document.execCommand(cmd)
  syncEditor()
  updateActiveFormats()
}

const insertEmoji = (emoji: string) => {
  editorEl.value?.focus()
  document.execCommand('insertText', false, emoji)
  syncEditor()
}

// Surbrillance des formats actifs sous le curseur
const activeFormats = ref<string[]>([])
const updateActiveFormats = () => {
  const el = editorEl.value
  const sel = document.getSelection()
  if (!el || !sel?.anchorNode || !el.contains(sel.anchorNode)) {
    activeFormats.value = []
    return
  }
  activeFormats.value = FORMATS.filter((f) => {
    try {
      return document.queryCommandState(f.cmd)
    } catch {
      return false
    }
  }).map((f) => f.cmd)
}

onMounted(() =>
  document.addEventListener('selectionchange', updateActiveFormats)
)
onUnmounted(() =>
  document.removeEventListener('selectionchange', updateActiveFormats)
)

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
  track('cv_downloaded', { from: 'mail' })
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
    const body: Record<string, unknown> = {
      name: form.value.name,
      email: form.value.email,
      message: form.value.message,
      messageHtml: messageHtml.value || undefined,
      honeypot: form.value.honeypot,
    }
    if (attachedFile.value) {
      body.attachment = {
        name: attachedFile.value.name,
        type: attachedFile.value.type || 'application/octet-stream',
        data: await fileToBase64(attachedFile.value),
      }
    }
    await $fetch('/api/contact', { method: 'POST', body })

    sfx.send()
    track('contact_sent', { attachment: !!attachedFile.value })
    notify({ icon: 'mail', title: 'Mail', message: t('contact.success') })

    form.value.name = ''
    form.value.email = ''
    form.value.message = ''
    form.value.honeypot = ''
    messageHtml.value = ''
    if (editorEl.value) editorEl.value.innerHTML = ''
    removeAttachment()
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

/* Éditeur riche : placeholder + puces (le reset Tailwind enlève les list-style) */
.mail-editor {
  @apply relative;
}
/* En absolu pour ne pas occuper d'espace inline : le curseur reste au début */
.mail-editor:empty::before,
.mail-editor:has(> br:only-child)::before {
  content: attr(data-placeholder);
  @apply pointer-events-none absolute left-0 top-0 text-black/30;
}
.mail-editor :deep(ul) {
  @apply list-disc pl-6;
}
.mail-editor :deep(ol) {
  @apply list-decimal pl-6;
}
</style>
