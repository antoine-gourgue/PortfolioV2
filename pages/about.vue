<template>
  <main class="bg-gray-50 text-black">
    <section
      class="flex flex-col lg:flex-row items-center justify-center px-6 lg:px-20 py-32 gap-16 fade-in-up"
    >
      <div class="flex-1 text-left">
        <h1 class="text-6xl lg:text-7xl font-extrabold leading-tight mb-10">
          {{ $t('about.title.line1') }}<br />
          {{ $t('about.title.line2') }}<br />
          {{ $t('about.title.line3') }}
        </h1>
        <p class="text-gray-600 text-lg max-w-xl leading-relaxed">
          {{ $t('about.subtitle') }}<br />
          {{ $t('about.description') }}
        </p>
      </div>
      <div class="flex-1 flex justify-center">
        <img
          src="/assets/profile.png"
          alt="Antoine Gourgue"
          class="w-full max-w-md lg:max-w-3xl object-contain"
        />
      </div>
      <div class="absolute inset-0 -z-50 opacity-70">
        <img
          src="/assets/abstract-bg.svg"
          class="w-full h-full object-cover"
          alt="abstract"
        />
      </div>
    </section>

    <div
      v-if="showIndicator"
      class="fixed bottom-6 left-1/2 transform -translate-x-1/2 hidden lg:block z-50"
    >
      <div
        class="w-8 h-14 border-2 border-gray-400 rounded-full flex items-start justify-center p-1 animate-bounce"
      >
        <div class="w-1 h-1 bg-gray-400 rounded-full mb-1"></div>
      </div>
    </div>

    <section class="max-w-6xl mx-auto px-6 lg:px-0 mt-52 relative fade-in-up">
      <h2 class="text-6xl font-extrabold mb-32 text-center">
        {{ $t('about.journey') }}
      </h2>

      <div class="flex flex-col space-y-32 relative">
        <div
          class="relative flex flex-col lg:flex-row gap-16 group transition-all"
        >
          <div
            class="absolute left-0 top-0 text-6xl lg:text-8xl font-extrabold text-gray-400 opacity-20 transform scale-95 group-hover:scale-100 transition duration-500"
          >
            2024-2026
          </div>
          <div class="flex-1"></div>
          <div
            class="flex-1 text-left z-10 transition-opacity duration-700 opacity-90 group-hover:opacity-100"
          >
            <h4 class="text-3xl font-bold mb-4">
              {{ $t('about.digitaleo.title') }}
            </h4>
            <p class="text-gray-500 mb-2 text-lg">
              {{ $t('about.digitaleo.role') }}
            </p>
            <p class="text-gray-600 leading-relaxed">
              {{ $t('about.digitaleo.description') }}
            </p>
          </div>
        </div>

        <div
          class="relative flex flex-col lg:flex-row-reverse gap-16 group transition-all"
        >
          <div
            class="absolute right-0 top-0 text-6xl lg:text-8xl font-extrabold text-gray-400 opacity-20 transform scale-95 group-hover:scale-100 transition duration-500"
          >
            2023-2026
          </div>
          <div class="flex-1"></div>
          <div
            class="flex-1 text-left z-10 transition-opacity duration-700 opacity-90 group-hover:opacity-100"
          >
            <h4 class="text-3xl font-bold mb-4">
              {{ $t('about.epitech.title') }}
            </h4>
            <p class="text-gray-500 mb-2 text-lg">
              {{ $t('about.epitech.role') }}
            </p>
            <p class="text-gray-600 leading-relaxed">
              {{ $t('about.epitech.description') }}
            </p>
          </div>
        </div>

        <div
          class="relative flex flex-col lg:flex-row gap-16 group transition-all"
        >
          <div
            class="absolute left-0 top-0 text-6xl lg:text-8xl font-extrabold text-gray-400 opacity-20 transform scale-95 group-hover:scale-100 transition duration-500"
          >
            2018-2022
          </div>
          <div class="flex-1"></div>
          <div
            class="flex-1 text-left z-10 transition-opacity duration-700 opacity-90 group-hover:opacity-100"
          >
            <h4 class="text-3xl font-bold mb-4">
              {{ $t('about.education.title') }}
            </h4>
            <p class="text-gray-600 leading-relaxed">
              {{ $t('about.education.description') }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="text-center mt-52 px-6 fade-in-up">
      <h2 class="text-5xl font-extrabold mb-20">
        {{ $t('about.skills.line1') }}<br />
        {{ $t('about.skills.line2') }}
      </h2>
      <div class="flex flex-wrap justify-center gap-12 opacity-90">
        <img
          v-for="(logo, index) in logos"
          :key="index"
          :src="logo"
          class="h-14 w-auto hover:scale-110 transition duration-500"
        />
      </div>
    </section>

    <section class="text-center mt-52 px-6 fade-in-up">
      <h2 class="text-5xl font-extrabold leading-tight mb-16">
        {{ $t('about.qualities.line1') }}<br />
        {{ $t('about.qualities.line2') }}<br />
        {{ $t('about.qualities.line3') }}
      </h2>
      <p class="text-gray-600 max-w-2xl mx-auto leading-relaxed text-lg">
        {{ $t('about.qualitiesDescription') }}
      </p>
    </section>

    <section class="text-center mt-52 px-6 fade-in-up">
      <h2 class="text-5xl font-extrabold mb-16">{{ $t('about.languages') }}</h2>
      <div class="flex flex-wrap justify-center gap-16 text-xl text-gray-700">
        <div><i class="fas fa-language mr-2"></i>{{ $t('about.french') }}</div>
        <div><i class="fas fa-globe mr-2"></i>{{ $t('about.english') }}</div>
        <div>
          <i class="fas fa-globe-europe mr-2"></i>{{ $t('about.spanish') }}
        </div>
      </div>
    </section>

    <section
      class="py-32 pb-24 lg:pb-32 bg-gray-50 mt-52 px-6 text-center fade-in-up"
    >
      <h2 class="text-5xl font-extrabold mb-12">
        {{ $t('about.interests.line1') }} {{ $t('about.interests.line2') }}
        {{ $t('about.interests.line3') }}
      </h2>
      <p class="text-gray-600 max-w-xl mx-auto mb-8">
        {{ $t('about.interestsDescription') }}
      </p>
      <div
        class="flex justify-center space-x-12 text-3xl text-gray-500 animate-float"
      >
        <i class="fas fa-futbol"></i>
        <i class="fas fa-clock"></i>
        <i class="fas fa-laptop-code"></i>
      </div>
    </section>

    <!-- Espace supplémentaire pour desktop -->
    <div class="hidden lg:block h-32"></div>
  </main>
</template>

<script setup lang="ts">
const showIndicator = ref(true)
const logos = [
  '/assets/vuedotjs.svg',
  '/assets/nuxt.svg',
  '/assets/angular.svg',
  '/assets/typescript.svg',
  '/assets/nodedotjs.svg',
  '/assets/php.svg',
  '/assets/docker.svg',
  '/assets/git.svg',
  '/assets/github.svg',
]

const handleScroll = () => {
  showIndicator.value = window.scrollY < 5
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-7px);
  }
  100% {
    transform: translateY(0px);
  }
}
.animate-float {
  animation: float 4s ease-in-out infinite;
}
.fade-in-up {
  opacity: 0;
  transform: translateY(30px);
  animation: fadeUp 0.8s ease forwards;
}
@keyframes fadeUp {
  to {
    opacity: 1;
    transform: translateY(0px);
  }
}
</style>
