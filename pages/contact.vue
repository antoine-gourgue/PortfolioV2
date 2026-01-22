<template>
  <main
    class="bg-gray-50 min-h-screen flex flex-col justify-center px-6 lg:px-20 py-32 pb-24 lg:pb-32 relative overflow-hidden"
  >
    <div class="absolute inset-0 opacity-50 pointer-events-none">
      <img
        src="/assets/shape.svg"
        alt="background"
        class="w-full h-full object-cover"
      />
    </div>

    <div class="relative z-10 max-w-3xl mx-auto text-center fade-in-up px-4">
      <h1
        class="text-6xl font-extrabold mb-6 leading-tight break-words hyphens-auto"
      >
        {{ $t('contact.title') }}
      </h1>

      <p
        class="text-gray-600 mb-16 max-w-xl mx-auto text-base sm:text-lg leading-relaxed break-words hyphens-auto"
      >
        {{ $t('contact.description') }}
      </p>

      <form
        class="max-w-md w-full mx-auto p-8 rounded-3xl space-y-6 bg-white/70 backdrop-blur"
        @submit.prevent="submitForm"
      >
        <div class="space-y-4 text-left">
          <input
            v-model="form.name"
            type="text"
            :placeholder="$t('contact.name')"
            required
            class="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 transition focus:outline-none focus:ring-2 focus:ring-black/80"
          />

          <input
            v-model="form.email"
            type="email"
            :placeholder="$t('contact.email')"
            required
            class="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 transition focus:outline-none focus:ring-2 focus:ring-black/80"
          />

          <textarea
            v-model="form.message"
            :placeholder="$t('contact.message')"
            required
            rows="5"
            class="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 transition resize-none focus:outline-none focus:ring-2 focus:ring-black/80"
          ></textarea>

          <!-- Champ honeypot (anti-bot) -->
          <input
            v-model="form.honeypot"
            type="text"
            autocomplete="off"
            tabindex="-1"
            class="hidden"
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-black text-white py-3 rounded-xl font-medium hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed break-words"
        >
          <span v-if="!loading" class="break-words">{{
            $t('contact.send')
          }}</span>
          <span v-else class="break-words">{{ $t('contact.sending') }}</span>
        </button>

        <p
          v-if="errorMessage"
          class="text-sm text-red-600 mt-2 break-words hyphens-auto"
        >
          {{ errorMessage }}
        </p>
      </form>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import { useI18n } from '#imports'

const toast = useToast()
const { t } = useI18n()

const form = ref({
  name: '',
  email: '',
  message: '',
  honeypot: '', // champ caché anti-bot
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
  if (!validateClient()) {
    return
  }

  // si un bot remplit le honeypot
  if (form.value.honeypot && form.value.honeypot.trim().length > 0) {
    return
  }

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
    toast.error(t('contact.errors.failed'))
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
textarea {
  resize: none;
}
.fade-in-up {
  animation: fadeInUp 0.8s ease-out both;
}
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Gestion des mots longs pour l'espagnol */
.hyphens-auto {
  hyphens: auto;
  -webkit-hyphens: auto;
  -ms-hyphens: auto;
  word-break: break-word;
  overflow-wrap: break-word;
}
</style>
