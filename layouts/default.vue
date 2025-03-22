<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <Navbar />

    <main class="flex-1">
      <slot />
    </main>

    <footer
      class="pt-6 pb-28 sm:pt-8 sm:pb-8 bg-white text-center text-gray-500 mt-auto border-t border-gray-200 relative z-10"
    >
      <p class="text-sm">
        © 2025 Antoine Gourgue · Built with Nuxt & Tailwind
      </p>
    </footer>
  </div>
</template>

<script setup>
import Navbar from '@/components/menus/Navbar.vue'
</script>
