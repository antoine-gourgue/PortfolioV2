<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center px-6 py-24 bg-gray-50 relative overflow-hidden fade-in"
  >
    <div class="absolute inset-0 opacity-50 pointer-events-none">
      <img
        src="/assets/shape.svg"
        alt="background"
        class="w-full h-full object-cover"
      />
    </div>

    <div class="relative z-10 text-center max-w-xl fade-in-up">
      <h1 class="text-6xl md:text-7xl font-extrabold text-black mb-6">
        {{ error.statusCode }}
      </h1>
      <p class="text-gray-700 text-lg mb-6 leading-relaxed">
        {{
          error.message || "Oops! Cette page n'existe pas ou a été déplacée."
        }}
      </p>

      <NuxtLink
        to="/"
        class="inline-block bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:opacity-90 transition"
      >
        Retour à l’accueil
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ error: { statusCode: number; message?: string } }>()
</script>

<style scoped>
.fade-in {
  animation: fadeIn 0.8s ease-out both;
}

@keyframes fadeIn {
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
