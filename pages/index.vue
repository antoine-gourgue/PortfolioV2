<template>
  <main class="relative overflow-hidden bg-gray-50">
    <section
      class="min-h-screen flex flex-col lg:flex-row items-center justify-center text-center lg:text-left px-6 lg:px-20"
    >
      <div class="flex-1 z-10 animate-fade-in">
        <h1 class="text-4xl lg:text-6xl font-bold mb-4">Hi, I'm Antoine</h1>
        <h2 class="text-2xl lg:text-3xl text-gray-600 mb-6">
          Fullstack Developer
        </h2>
        <p class="text-gray-500 mb-8 max-w-md">
          Building modern web experiences with Vue, Nuxt & cutting-edge tech.
        </p>

        <div
          class="flex flex-col lg:flex-row gap-4 justify-center lg:justify-start"
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

      <div
        class="relative flex-1 mt-12 lg:mt-0 flex justify-center items-center"
      >
        <div
          class="absolute w-[20rem] h-[20rem] animate-spin-slow rounded-full flex justify-center items-center"
        >
          <div
            v-for="(logo, index) in logos"
            :key="index"
            class="absolute opacity-10"
            :style="{
              transform: `rotate(${index * (360 / logos.length)}deg) translate(9rem) rotate(-${index * (360 / logos.length)}deg)`,
            }"
          >
            <img
              :src="logo.src"
              :alt="logo.alt"
              class="w-8 h-8 lg:w-10 lg:h-10 object-contain"
            />
          </div>
        </div>
        <AgLogo
          class="w-48 h-48 lg:w-64 lg:h-64 relative z-10 transition-transform duration-500 hover:scale-105"
        />
      </div>
    </section>

    <section class="max-w-6xl mx-auto mt-24 px-6 text-center lg:text-left">
      <div class="flex flex-col lg:flex-row items-center gap-12">
        <div class="flex-1">
          <h3 class="text-4xl font-bold mb-6">About Me</h3>
          <p class="text-gray-600 leading-relaxed mb-4">
            MSc student at
            <span class="font-semibold text-black">Epitech Rennes</span> &
            apprentice at
            <span class="font-semibold text-black">Digitaleo</span>.
          </p>
          <p class="text-gray-600 leading-relaxed mb-6">
            I specialize in crafting performant fullstack applications, blending
            technical precision with intuitive UX.
          </p>
          <div class="flex flex-wrap gap-4">
            <span class="bg-gray-100 px-4 py-2 rounded-full text-sm shadow-sm"
              >Problem Solver</span
            >
            <span class="bg-gray-100 px-4 py-2 rounded-full text-sm shadow-sm"
              >Team Player</span
            >
            <span class="bg-gray-100 px-4 py-2 rounded-full text-sm shadow-sm"
              >Clean Code Advocate</span
            >
          </div>
        </div>
      </div>
    </section>

    <section class="max-w-6xl mx-auto mt-24 px-6 text-center">
      <h3 class="text-4xl font-bold mb-12">What I Do</h3>
      <div class="grid md:grid-cols-3 gap-12">
        <div class="flex flex-col items-center gap-4">
          <i class="fa-solid fa-code text-5xl text-black mb-4"></i>
          <h4 class="text-xl font-semibold">Frontend</h4>
          <p class="text-gray-600 text-sm max-w-xs">
            Vue, Nuxt, Tailwind — pixel-perfect UIs & smooth interactions.
          </p>
        </div>
        <div class="flex flex-col items-center gap-4">
          <i class="fa-solid fa-server text-5xl text-black mb-4"></i>
          <h4 class="text-xl font-semibold">Backend</h4>
          <p class="text-gray-600 text-sm max-w-xs">
            APIs & microservices using AdonisJS, Node.js, scalable & secure.
          </p>
        </div>
        <div class="flex flex-col items-center gap-4">
          <i class="fa-solid fa-laptop-code text-5xl text-black mb-4"></i>
          <h4 class="text-xl font-semibold">DevOps</h4>
          <p class="text-gray-600 text-sm max-w-xs">
            Dockerized environments & CI/CD pipelines for seamless deployment.
          </p>
        </div>
      </div>
    </section>

    <section class="max-w-6xl mx-auto mt-24 px-6 text-center">
      <h3 class="text-4xl font-bold mb-12">Recent Projects</h3>
      <div class="grid md:grid-cols-2 gap-12">
        <div
          class="flex flex-col items-start bg-white p-6 rounded-xl shadow-sm"
        >
          <h4 class="text-lg font-semibold mb-2">E-Commerce Dashboard</h4>
          <p class="text-gray-600 text-sm mb-4">
            Built with Nuxt 3 & AdonisJS. Includes custom admin panel, charts, &
            secure API.
          </p>
          <NuxtLink to="/projects" class="text-sm text-blue-600 hover:underline"
            >View Project →</NuxtLink
          >
        </div>
        <div
          class="flex flex-col items-start bg-white p-6 rounded-xl shadow-sm"
        >
          <h4 class="text-lg font-semibold mb-2">Portfolio Website</h4>
          <p class="text-gray-600 text-sm mb-4">
            Crafted using Vue 3, Tailwind, fully responsive, smooth transitions.
          </p>
          <NuxtLink to="/projects" class="text-sm text-blue-600 hover:underline"
            >View Project →</NuxtLink
          >
        </div>
      </div>
    </section>

    <section class="bg-black text-white py-20 mt-32 text-center px-6">
      <h3 class="text-4xl font-bold mb-4">Let’s Build Something Great</h3>
      <p class="text-gray-400 mb-8">
        Interested in working together? Let's connect and make it happen.
      </p>
      <NuxtLink
        to="/contact"
        class="bg-white text-black px-8 py-3 rounded-full hover:bg-gray-200 transition"
        >Get In Touch</NuxtLink
      >
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
  </main>
</template>

<script setup lang="ts">
import AgLogo from '~/components/ui/AGLogo.vue'

const logos = [
  { src: '/assets/vuedotjs.svg', alt: 'Vue.js' },
  { src: '/assets/nuxt.svg', alt: 'Nuxt' },
  { src: '/assets/typescript.svg', alt: 'TypeScript' },
  { src: '/assets/tailwindcss.svg', alt: 'Tailwind CSS' },
  { src: '/assets/vite.svg', alt: 'Vite' },
  { src: '/assets/docker.svg', alt: 'Docker' },
  { src: '/assets/git.svg', alt: 'Git' },
  { src: '/assets/github.svg', alt: 'GitHub' },
  { src: '/assets/adonisjs.svg', alt: 'AdonisJS' },
]
const showIndicator = ref(true)
const handleScroll = () => {
  showIndicator.value = window.scrollY < 200
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
@keyframes spin-slow {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.animate-spin-slow {
  animation: spin-slow 90s linear infinite;
}
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
</style>
