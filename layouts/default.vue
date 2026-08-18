<template>
  <div class="min-h-screen flex flex-col">
    <MacMenuBar />
    <Navbar />

    <main class="flex-1 pb-20 lg:pb-0">
      <slot />
    </main>

    <Footer />

    <MacDock />
    <DesktopSpotlight />
    <DesktopBootScreen />
  </div>
</template>

<script setup>
import Navbar from '@/components/menus/Navbar.vue'
import Footer from '~/components/menus/Footer.vue'
import MacMenuBar from '~/components/menus/MacMenuBar.vue'
import MacDock from '~/components/menus/MacDock.vue'
import DesktopSpotlight from '~/components/desktop/Spotlight.vue'
import DesktopBootScreen from '~/components/desktop/BootScreen.vue'
</script>
