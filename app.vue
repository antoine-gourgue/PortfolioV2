<template>
  <MetaSeoLayout>
    <NuxtLayout
      class="w-full overflow-x-hidden min-h-screen overflow-y-auto text-base-content"
    >
      <NuxtLoadingIndicator />
      <NuxtPage />
      <div
        id="transition-overlay"
        class="fixed inset-0 bg-gray-200 z-50 pointer-events-none scale-0 opacity-0 transition-transform duration-700 origin-center"
      ></div>
    </NuxtLayout>
  </MetaSeoLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MetaSeoLayout from '~/layouts/MetaSeoLayout.vue'

export default defineComponent({
  components: { MetaSeoLayout },
})
</script>

<style>
#transition-overlay {
  transition:
    transform 0.5s ease-in-out,
    opacity 0.5s ease-in-out;
  border-radius: 50%;
}

html {
  font-size: 16px;
}
</style>
