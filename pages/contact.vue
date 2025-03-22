<template>
  <main
    class="bg-gray-50 min-h-screen flex flex-col justify-center px-6 lg:px-20 py-32 relative overflow-hidden"
  >
    <div class="absolute inset-0 opacity-50 pointer-events-none">
      <img
        src="/assets/shape.svg"
        alt="background"
        class="w-full h-full object-cover"
      />
    </div>

    <div class="relative z-10 max-w-3xl mx-auto text-center fade-in-up">
      <h1 class="text-6xl lg:text-6xl font-extrabold mb-6 leading-tight">
        Let's Connect.
      </h1>

      <p class="text-gray-600 mb-16 max-w-xl mx-auto text-lg leading-relaxed">
        Got an idea, a question, or just wanna chat? Drop me a message and I’ll
        get back to you shortly.
      </p>

      <form
        class="max-w-md w-full mx-auto p-8 rounded-3xl space-y-6"
        @submit.prevent="submitForm"
      >
        <div class="space-y-4">
          <input
            v-model="form.name"
            type="text"
            placeholder="Your Name"
            required
            class="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 ransition"
          />
          <input
            v-model="form.email"
            type="email"
            placeholder="Your Email"
            required
            class="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 transition"
          />
          <textarea
            v-model="form.message"
            placeholder="Your Message"
            required
            rows="5"
            class="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 transition resize-none"
          ></textarea>
        </div>
        <button
          type="submit"
          class="w-full bg-black text-white py-3 rounded-xl font-medium hover:opacity-90 transition"
        >
          Send Message
        </button>
      </form>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useToast } from 'vue-toastification'

const form = ref({
  name: '',
  email: '',
  message: '',
})
const toast = useToast()
const submitForm = async () => {
  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: {
        name: form.value.name,
        email: form.value.email,
        message: form.value.message,
      },
    })

    toast.success('Message sent successfully!')

    form.value.name = ''
    form.value.email = ''
    form.value.message = ''
  } catch (error) {
    console.error(error)
    toast.error('Failed to send message.')
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
</style>
