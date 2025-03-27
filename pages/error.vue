<template>
  <main
    class="bg-gray-50 min-h-screen flex items-center justify-center px-6 lg:px-20 relative overflow-hidden"
  >
    <div class="absolute inset-0 opacity-70 pointer-events-none">
      <img
        src="/assets/shape.svg"
        alt="background"
        class="w-full h-full object-cover"
      />
    </div>

    <section class="relative z-10 text-center fade-in-up">
      <h1 class="text-7xl font-extrabold text-gray-800 mb-4">
        {{ error?.statusCode || 'Error' }}
      </h1>
      <p class="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
        {{
          error?.statusCode === 404
            ? "Oops! The page you're looking for doesn't exist."
            : error?.message || 'Something went wrong. Please try again later.'
        }}
      </p>
      <NuxtLink
        to="/"
        class="inline-block bg-black text-white px-6 py-3 rounded-xl hover:opacity-90 transition"
      >
        Back to Home
      </NuxtLink>
    </section>
  </main>
</template>

<script setup lang="ts">
const { error } = defineProps<{
  error?: {
    statusCode?: number
    message?: string
  }
}>()
</script>

<style scoped>
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
