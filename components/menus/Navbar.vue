<template>
  <nav
    class="hidden lg:flex fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-white bg-opacity-80 backdrop-blur-md text-black rounded-full px-6 py-3 items-center space-x-9 border border-gray-200 shadow-md"
  >
    <div class="flex items-center space-x-4">
      <NuxtLink to="/" class="nav-link" :class="isActive('/')">Home</NuxtLink>
      <NuxtLink to="/about" class="nav-link" :class="isActive('/about')"
        >About</NuxtLink
      >
      <NuxtLink to="/services" class="nav-link" :class="isActive('/services')"
        >Services</NuxtLink
      >
    </div>

    <div
      class="relative flex items-center group cursor-pointer"
      @mouseenter="hovered = true"
      @mouseleave="hovered = false"
    >
      <AgLogo
        class="w-12 h-10 transition-transform duration-300 ease-in-out"
        :class="{ '-translate-x-8': hovered }"
      />
      <transition name="fade-slide">
        <div
          v-if="hovered"
          class="absolute left-0 ml-2 flex flex-col text-gray-700 text-xs font-light whitespace-nowrap transition-all duration-300 ease-in-out"
        >
          <span>Made by</span>
          <span class="font-semibold">Antoine</span>
        </div>
      </transition>
    </div>

    <div class="flex items-center space-x-4">
      <NuxtLink to="/resume" class="nav-link" :class="isActive('/resume')"
        >Resume</NuxtLink
      >
      <NuxtLink to="/projects" class="nav-link" :class="isActive('/projects')"
        >Projects</NuxtLink
      >
      <NuxtLink to="/contact" class="nav-link" :class="isActive('/contact')"
        >Contact</NuxtLink
      >
    </div>
  </nav>

  <nav
    class="lg:hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-80 shadow-xl rounded-full px-6 py-3 flex justify-between items-center w-[90%] max-w-md border border-gray-200 z-50"
  >
    <NuxtLink to="/" class="bottom-link" :class="isActiveMobile('/')">
      <i
        class="fa-solid fa-house w-5 h-5 mb-1 transition-transform duration-300"
      ></i>
      <span class="text-xs transition-transform duration-300">Home</span>
    </NuxtLink>
    <NuxtLink to="/about" class="bottom-link" :class="isActiveMobile('/about')">
      <i class="fa-solid fa-address-card w-5 h-5 mb-1"></i>
      <span class="text-xs">About</span>
    </NuxtLink>
    <NuxtLink
      to="/services"
      class="bottom-link"
      :class="isActiveMobile('/services')"
    >
      <i class="fa-solid fa-keyboard w-5 h-5 mb-1"></i>
      <span class="text-xs">Services</span>
    </NuxtLink>
    <NuxtLink
      to="/resume"
      class="bottom-link"
      :class="isActiveMobile('/resume')"
    >
      <i class="fa-solid fa-file w-5 h-5 mb-1"></i>
      <span class="text-xs">Resume</span>
    </NuxtLink>
    <NuxtLink
      to="/projects"
      class="bottom-link"
      :class="isActiveMobile('/projects')"
    >
      <i class="fa-solid fa-laptop-code w-5 h-5 mb-1"></i>
      <span class="text-xs">Projects</span>
    </NuxtLink>
    <NuxtLink
      to="/contact"
      class="bottom-link"
      :class="isActiveMobile('/contact')"
    >
      <i class="fa-solid fa-address-book w-5 h-5 mb-1"></i>
      <span class="text-xs">Contact</span>
    </NuxtLink>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import AgLogo from '~/components/ui/AGLogo.vue'

const route = useRoute()
const hovered = ref(false)

const isActive = (path: string) => (route.path === path ? 'active-link' : '')

const isActiveMobile = (path: string) =>
  route.path === path ? 'text-black scale-95' : 'text-gray-500'
</script>

<style scoped>
.nav-link {
  @apply relative px-4 py-2 rounded-full text-sm transition duration-300;
}

.nav-link::after {
  content: '';
  @apply absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-black transition-all duration-300;
}

.nav-link:hover::after,
.nav-link.active-link::after {
  @apply w-6;
}

.bottom-link {
  @apply flex flex-col items-center transition-all duration-300;
}

.bottom-link.active-link {
  @apply text-black;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
