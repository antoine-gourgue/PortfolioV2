<template>
  <main
    class="bg-gray-50 min-h-screen px-6 lg:px-20 py-32 relative overflow-hidden"
  >
    <div class="absolute inset-0 opacity-70 pointer-events-none">
      <img
        src="/assets/shape.svg"
        alt="background"
        class="w-full h-full object-cover"
      />
    </div>

    <section
      class="relative z-10 max-w-5xl mx-auto text-center mb-20 fade-in-up"
    >
      <h1 class="text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
        Featured In.
      </h1>
      <p class="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
        Discover articles, interviews, and mentions about my work.
      </p>
    </section>

    <section
      class="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto fade-in-up"
    >
      <template v-if="data">
        <div
          v-for="(article, index) in data.results"
          :key="index"
          class="border border-gray-200 rounded-2xl bg-white p-6 shadow-sm hover:shadow-lg transition transform hover:-translate-y-1 hover:border-gray-400 flex flex-col justify-between min-h-[220px] group"
        >
          <div>
            <h3
              class="font-bold text-lg mb-4 text-gray-800 group-hover:underline"
            >
              {{ article.title }}
            </h3>
            <p class="text-sm text-gray-500 mb-4">{{ article.snippet }}</p>
          </div>
          <div class="mt-auto text-right">
            <a
              :href="article.link"
              target="_blank"
              class="text-sm text-gray-400 group-hover:text-black transition"
              >Read More →</a
            >
          </div>
        </div>
      </template>

      <div
        v-else-if="error"
        class="flex flex-col items-center justify-center text-center text-red-500 col-span-full mb-12 space-y-4"
      >
        <i class="fas fa-exclamation-triangle text-4xl"></i>
        <p class="text-lg font-semibold">Failed to load articles.</p>
        <p class="text-sm text-gray-500">
          Please try refreshing or check back later.
        </p>
      </div>

      <div v-else class="col-span-full flex justify-center">
        <i class="fas fa-spinner fa-spin text-4xl text-gray-400"></i>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
const { data, error } = await useFetch('/api/mentions')
</script>

<style scoped>
.fade-in-up {
  animation: fadeInUp 0.8s ease-out both;
}
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
