<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <Navbar />

    <main class="flex-1">
      <slot />
    </main>

    <Footer />
  </div>
</template>

<script setup>
import Navbar from '@/components/menus/Navbar.vue'
import Footer from '~/components/menus/Footer.vue'
</script>
