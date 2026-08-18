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

        <form @submit.prevent="submitForm">
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
                :class="
                  loading ? 'fas fa-spinner fa-spin' : 'fas fa-paper-plane'
                "
              ></i>
            </button>
            <i class="fas fa-paperclip text-[14px] text-black/30"></i>
            <i class="fas fa-font text-[14px] text-black/30"></i>
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
import { useToast } from 'vue-toastification'
import { useI18n } from '#imports'
import AgLogo from '~/components/ui/AGLogo.vue'

const toast = useToast()
const { t } = useI18n()
const { gsap } = useGsap()
const sfx = useSfx()

const form = ref({
  name: '',
  email: '',
  message: '',
  honeypot: '',
})

const loading = ref(false)
const errorMessage = ref<string | null>(null)

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
    toast.success(t('contact.success'))

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
    toast.error(t('contact.errors.failed'))
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
