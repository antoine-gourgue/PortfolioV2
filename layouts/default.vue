<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <Navbar />

    <main class="flex-1">
      <slot />
    </main>
  </div>
</template>

<script setup>
import Navbar from '@/components/menus/Navbar.vue'
</script>
