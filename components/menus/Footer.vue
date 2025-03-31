<template>
  <footer
    class="hidden lg:block w-full bg-white bg-opacity-80 backdrop-blur-md border-t border-gray-200 shadow-md py-4 px-6"
  >
    <div
      class="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0"
    >
      <div class="flex items-center space-x-3 text-sm text-gray-600">
        <NuxtLink to="/">
          <AgLogo class="w-8 h-8" />
        </NuxtLink>
        <span>© 2025 Antoine Gourgue</span>
      </div>

      <nav class="flex space-x-6 text-sm text-gray-600">
        <NuxtLink to="/" class="footer-link" :class="isActive('/')"
          >Home</NuxtLink
        >
        <NuxtLink to="/about" class="footer-link" :class="isActive('/about')"
          >About</NuxtLink
        >
        <NuxtLink
          to="/services"
          class="footer-link"
          :class="isActive('/services')"
          >Services</NuxtLink
        >
        <NuxtLink
          to="/projects"
          class="footer-link"
          :class="isActive('/projects')"
          >Projects</NuxtLink
        >
        <NuxtLink to="/blog" class="footer-link" :class="isActive('/blog')"
          >Blog</NuxtLink
        >
        <NuxtLink
          to="/contact"
          class="footer-link"
          :class="isActive('/contact')"
          >Contact</NuxtLink
        >
      </nav>

      <div class="flex space-x-4 text-gray-600">
        <a
          href="https://github.com/antoine-gourgue"
          target="_blank"
          class="hover:text-black transition"
        >
          <i class="fab fa-github text-lg"></i>
        </a>
        <a
          href="https://linkedin.com/in/antoine-gourgue"
          target="_blank"
          class="hover:text-black transition"
        >
          <i class="fab fa-linkedin-in text-lg"></i>
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import AgLogo from '~/components/ui/AGLogo.vue'

const route = useRoute()

const isActive = (path: string) =>
  route.path === path ? 'active-footer-link' : ''
</script>

<style scoped>
.footer-link {
  @apply relative pb-1 transition duration-300;
}

.footer-link::after {
  content: '';
  @apply absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-black transition-all duration-300;
}

.footer-link:hover::after,
.footer-link.active-footer-link::after {
  @apply w-6;
}
</style>
