<template>
  <main
    class="bg-gray-50 min-h-screen px-6 lg:px-20 py-32 relative overflow-hidden"
  >
    <div class="absolute inset-0 opacity-70 pointer-events-none">
      <img
        src="/assets/shape.svg"
        alt="background"
        class="w-full h-full object-cover"
      />
    </div>

    <section
      class="relative z-10 max-w-5xl mx-auto text-center mb-20 fade-in-up"
    >
      <h1 class="text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
        {{ $t('services.title') }}
      </h1>
      <p class="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
        {{ $t('services.description') }}
      </p>
    </section>

    <section
      class="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto fade-in-up"
    >
      <div
        class="border border-gray-200 rounded-2xl bg-white p-6 shadow-sm flex flex-col items-center text-center"
      >
        <i class="fas fa-laptop-code text-4xl text-gray-700 mb-4"></i>
        <h3 class="font-bold text-xl mb-3">
          {{ $t('services.fullstack.title') }}
        </h3>
        <p class="text-gray-500">
          {{ $t('services.fullstack.description') }}
        </p>
      </div>
      <div
        class="border border-gray-200 rounded-2xl bg-white p-6 shadow-sm flex flex-col items-center text-center"
      >
        <i class="fas fa-cogs text-4xl text-gray-700 mb-4"></i>
        <h3 class="font-bold text-xl mb-3">
          {{ $t('services.devops.title') }}
        </h3>
        <p class="text-gray-500">{{ $t('services.devops.description') }}</p>
      </div>
      <div
        class="border border-gray-200 rounded-2xl bg-white p-6 shadow-sm flex flex-col items-center text-center"
      >
        <i class="fas fa-envelope text-4xl text-gray-700 mb-4"></i>
        <h3 class="font-bold text-xl mb-3">{{ $t('services.email.title') }}</h3>
        <p class="text-gray-500">
          {{ $t('services.email.description') }}
        </p>
      </div>
      <div
        class="border border-gray-200 rounded-2xl bg-white p-6 shadow-sm flex flex-col items-center text-center"
      >
        <i class="fas fa-brain text-4xl text-gray-700 mb-4"></i>
        <h3 class="font-bold text-xl mb-3">{{ $t('services.ai.title') }}</h3>
        <p class="text-gray-500">
          {{ $t('services.ai.description') }}
        </p>
      </div>
      <div
        class="border border-gray-200 rounded-2xl bg-white p-6 shadow-sm flex flex-col items-center text-center"
      >
        <i class="fas fa-palette text-4xl text-gray-700 mb-4"></i>
        <h3 class="font-bold text-xl mb-3">
          {{ $t('services.design.title') }}
        </h3>
        <p class="text-gray-500">
          {{ $t('services.design.description') }}
        </p>
      </div>
      <div
        class="border border-gray-200 rounded-2xl bg-white p-6 shadow-sm flex flex-col items-center text-center"
      >
        <i class="fas fa-tasks text-4xl text-gray-700 mb-4"></i>
        <h3 class="font-bold text-xl mb-3">
          {{ $t('services.collaboration.title') }}
        </h3>
        <p class="text-gray-500">
          {{ $t('services.collaboration.description') }}
        </p>
      </div>
    </section>

    <section class="relative z-10 text-center mt-20 fade-in-up">
      <p class="text-gray-500 text-sm">
        {{ $t('services.interested') }}
        <NuxtLink :to="localePath('/contact')" class="text-black underline">{{
          $t('services.reachOut')
        }}</NuxtLink
        >.
      </p>
    </section>
  </main>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
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
