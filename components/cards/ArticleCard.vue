<template>
  <div
    class="border border-gray-200 rounded-2xl bg-white p-6 shadow-sm hover:shadow-lg transition transform hover:-translate-y-1 hover:border-gray-400 flex flex-col justify-between min-h-[220px] group"
  >
    <div>
      <h3 class="font-bold text-lg mb-4 text-gray-800 group-hover:underline">
        {{ title }}
      </h3>
      <p class="text-sm text-gray-500 mb-4">{{ description }}</p>
    </div>

    <div class="flex justify-between items-center mt-auto">
      <div class="flex space-x-2">
        <span
          v-for="tag in tags"
          :key="tag"
          class="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full"
          >{{ tag }}</span
        >
      </div>
      <a
        :href="link"
        class="text-sm text-gray-400 group-hover:text-black transition"
        >Read More →</a
      >
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: 'Untitled',
  },
  date: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  tags: {
    type: Array as () => string[],
    default: () => [],
  },
  link: {
    type: String,
    default: '#',
  },
})
</script>
