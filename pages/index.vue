<template>
  <main class="relative overflow-hidden bg-gray-50">
    <section
      class="min-h-screen flex flex-col lg:flex-row items-center justify-center text-center lg:text-left px-4 sm:px-6 lg:px-20 gap-12 relative"
    >
      <div
        class="flex-1 z-10 animate-fade-in flex flex-col items-center lg:items-start"
      >
        <h1 class="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4">
          Hi, I'm Antoine
        </h1>
        <h2 class="text-xl sm:text-2xl lg:text-3xl text-gray-600 mb-6">
          Fullstack Developer
        </h2>
        <p class="text-gray-500 mb-8 max-w-md">
          Building modern web experiences with Vue, Nuxt & cutting-edge tech.
        </p>
        <div
          class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
        >
          <NuxtLink
            to="/contact"
            class="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition"
            >Contact Me</NuxtLink
          >
          <NuxtLink
            to="/resume"
            class="border border-black text-black px-6 py-3 rounded-full hover:bg-gray-100 transition"
            >Download CV</NuxtLink
          >
        </div>
      </div>

      <div class="relative flex-1 flex flex-col items-center justify-center">
        <img
          src="/assets/profile.png"
          alt="Antoine Gourgue"
          class="w-3/4 sm:w-2/3 md:w-1/2 lg:w-auto max-w-[100%] h-auto object-contain z-20"
        />
        <div
          class="absolute top-4 right-4 lg:top-12 lg:right-12 transform rotate-90 text-gray-300 text-sm sm:text-xl lg:text-2xl tracking-widest"
        >
          PORTFOLIO 2025
        </div>
      </div>

      <div class="absolute inset-0 z-0 opacity-70">
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

    <section class="py-20 bg-gray-50 text-center px-6 relative overflow-hidden">
      <div class="absolute inset-0 opacity-70">
        <img
          src="/assets/shape.svg"
          class="w-full h-full object-cover"
          alt="Shape"
        />
      </div>
      <div class="relative z-10">
        <h3 class="text-2xl font-bold mb-6">About Me</h3>
        <p class="text-gray-600 max-w-2xl mx-auto mb-8">
          I'm a passionate Fullstack Developer currently pursuing a Master's
          Degree at Epitech Rennes, while gaining real-world experience through
          my apprenticeship at Digitaleo. I enjoy building modern, scalable web
          applications using Vue, Nuxt, and TypeScript.
        </p>
        <div class="flex flex-wrap justify-center gap-4">
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
        <p class="italic text-gray-500 mt-8">
          "Crafting clean & scalable web experiences, one line of code at a
          time."
        </p>
      </div>
    </section>

    <section class="py-24 bg-gray-50 flex flex-col items-center relative">
      <h4
        class="text-lg font-semibold mb-10 tracking-wide uppercase text-gray-700"
      >
        Technologies I Work With
      </h4>
      <div class="flex flex-wrap justify-center gap-12 opacity-80 max-w-5xl">
        <img
          v-for="(logo, index) in logos"
          :key="index"
          :src="logo.src"
          :alt="logo.alt"
          class="h-12 w-auto grayscale hover:grayscale-0 transition"
        />
      </div>
    </section>

    <section class="py-28 bg-white px-6 relative">
      <h3 class="text-2xl font-bold mb-16 text-center">My Journey</h3>
      <div class="max-w-4xl mx-auto space-y-20">
        <div class="flex items-start">
          <div class="text-5xl font-bold text-gray-300 w-28 text-right">
            2024
          </div>
          <div class="ml-8 border-l-2 border-gray-200 pl-8 relative">
            <div
              class="absolute w-3 h-3 bg-black rounded-full -left-1.5 top-2"
            ></div>
            <h4 class="font-semibold text-lg mb-3">
              Fullstack Developer - Digitaleo
            </h4>
            <p class="text-gray-600 mb-2">2024 - 2026</p>
            <p class="text-gray-500 leading-relaxed">
              In charge of developing and maintaining the email editor of the
              platform, ensuring smooth UX and strong compatibility (Outlook,
              responsive...).
            </p>
          </div>
        </div>

        <div class="flex items-start">
          <div class="text-5xl font-bold text-gray-300 w-28 text-right">
            2023
          </div>
          <div class="ml-8 border-l-2 border-gray-200 pl-8 relative">
            <div
              class="absolute w-3 h-3 bg-black rounded-full -left-1.5 top-2"
            ></div>
            <h4 class="font-semibold text-lg mb-3">
              Master's Degree - Epitech Rennes
            </h4>
            <p class="text-gray-600 mb-2">2023 - 2026</p>
            <p class="text-gray-500 leading-relaxed">
              Specializing in Artificial Intelligence & Data, focusing on
              machine learning, data science, and innovative solutions.
            </p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
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
