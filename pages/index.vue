<template>
  <main class="bg-gray-50 text-black">
    <section
      class="flex flex-col lg:flex-row items-center justify-center px-6 lg:px-20 py-32 gap-16 fade-in-up"
    >
      <div class="flex-1 text-left">
        <h1
          class="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-10"
        >
          {{ $t('home.title') }}
        </h1>
        <h2
          class="text-2xl sm:text-3xl lg:text-4xl text-gray-600 mb-6 leading-tight"
        >
          {{ $t('home.subtitle') }}
        </h2>
        <p class="text-gray-600 text-lg max-w-xl leading-relaxed mb-8">
          {{ $t('home.description') }}
        </p>
        <div class="flex flex-col sm:flex-row gap-4">
          <NuxtLink
            :to="localePath('/contact')"
            class="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition text-center"
            >{{ $t('home.contactMe') }}</NuxtLink
          >
          <a
            href="/assets/antoinegourgue-cv.pdf"
            download
            class="border border-black text-black px-6 py-3 rounded-full hover:bg-gray-100 transition text-center"
            >{{ $t('home.downloadCV') }}</a
          >
        </div>
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

    <section class="text-center mt-52 px-6 fade-in-up">
      <h2 class="text-5xl font-extrabold mb-20">
        {{ $t('home.aboutMe') }}
      </h2>
      <p class="text-gray-600 max-w-2xl mx-auto leading-relaxed text-lg mb-12">
        {{ $t('home.aboutDescription') }}
      </p>
      <div class="flex flex-wrap justify-center gap-4 mb-12">
        <span class="bg-black text-white px-4 py-2 rounded-full text-sm"
          >Vue.js</span
        >
        <span class="bg-black text-white px-4 py-2 rounded-full text-sm"
          >Nuxt</span
        >
        <span class="bg-black text-white px-4 py-2 rounded-full text-sm"
          >TypeScript</span
        >
        <span class="bg-black text-white px-4 py-2 rounded-full text-sm"
          >Docker</span
        >
      </div>
      <p class="italic text-gray-500 text-lg">"{{ $t('home.quote') }}"</p>
    </section>

    <section class="text-center mt-52 px-6 fade-in-up">
      <h2 class="text-5xl font-extrabold mb-20">
        {{ $t('home.technologies') }}
      </h2>
      <div class="flex flex-wrap justify-center gap-12 opacity-90">
        <img
          v-for="(logo, index) in logos"
          :key="index"
          :src="logo.src"
          :alt="logo.alt"
          class="h-14 w-auto hover:scale-110 transition duration-500"
        />
      </div>
    </section>

    <section
      class="max-w-6xl mx-auto px-6 lg:px-0 mt-52 relative fade-in-up pb-24 lg:pb-0"
    >
      <h2 class="text-6xl font-extrabold mb-32 text-center">
        {{ $t('home.journey') }}
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
              {{ $t('home.journey2024.title') }}
            </h4>
            <p class="text-gray-500 mb-2 text-lg">
              {{ $t('home.journey2024.period') }}
            </p>
            <p class="text-gray-600 leading-relaxed">
              {{ $t('home.journey2024.description') }}
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
              {{ $t('home.journey2023.title') }}
            </h4>
            <p class="text-gray-500 mb-2 text-lg">
              {{ $t('home.journey2023.period') }}
            </p>
            <p class="text-gray-600 leading-relaxed">
              {{ $t('home.journey2023.description') }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Espace supplémentaire pour desktop -->
    <div class="hidden lg:block h-32"></div>
  </main>
</template>

<script setup lang="ts">
const localePath = useLocalePath()

const showIndicator = ref(true)
const logos = [
  { src: '/assets/vuedotjs.svg', alt: 'Vue' },
  { src: '/assets/nuxt.svg', alt: 'Nuxt' },
  { src: '/assets/nodedotjs.svg', alt: 'Node.js' },
  { src: '/assets/docker.svg', alt: 'Docker' },
  { src: '/assets/typescript.svg', alt: 'TypeScript' },
  { src: '/assets/github.svg', alt: 'Github' },
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
