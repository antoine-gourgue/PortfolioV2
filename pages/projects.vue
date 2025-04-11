<template>
  <main
    class="bg-gray-50 min-h-screen flex flex-col justify-between px-6 lg:px-20 py-32 relative overflow-hidden"
  >
    <div class="absolute inset-0 opacity-70 pointer-events-none fade-in-up">
      <img
        src="/assets/shape.svg"
        alt="background"
        class="w-full h-full object-cover"
      />
    </div>

    <div class="relative z-10 fade-in-up">
      <h1 class="text-6xl font-extrabold text-center mb-6">My Projects.</h1>

      <p
        class="text-center text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed"
      >
        A curated collection of personal and academic projects showcasing my
        journey as a Fullstack Developer. From web applications to technical
        experiments, each project reflects my passion and progression.
      </p>

      <div class="flex flex-wrap justify-center gap-4 mb-12 fade-in-up">
        <button
          v-for="lang in languages"
          :key="lang"
          :class="[
            'px-4 py-2 rounded-full border transition',
            selectedLang === lang
              ? 'bg-black text-white border-black'
              : 'border-gray-300 text-gray-700 hover:bg-gray-100',
          ]"
          @click="selectLanguage(lang)"
        >
          {{ lang }}
        </button>
      </div>
    </div>

    <div
      v-if="error"
      class="flex flex-col items-center justify-center text-center text-red-500 mb-12 space-y-4"
    >
      <i class="fas fa-exclamation-triangle text-4xl"></i>
      <p class="text-lg font-semibold">Failed to load projects.</p>
      <p class="text-sm text-gray-500">
        Please try refreshing or check back later.
      </p>
    </div>

    <div
      v-else-if="!projects"
      class="flex flex-col items-center justify-center text-center text-gray-400 mb-12 space-y-4 animate-pulse"
    >
      <i class="fas fa-spinner fa-spin text-4xl"></i>
      <p class="text-lg font-semibold">Loading projects...</p>
      <p class="text-sm text-gray-500">
        Fetching the latest repositories from GitHub.
      </p>
    </div>

    <div
      v-else
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 fade-in-up min-h-[calc(100vh-480px)]"
    >
      <a
        v-for="project in paginatedProjects"
        :key="project.id"
        :href="project.html_url"
        target="_blank"
        class="border border-gray-200 rounded-2xl bg-white p-6 shadow-sm hover:shadow-lg transition transform hover:-translate-y-1 hover:border-gray-400 flex flex-col justify-between min-h-[220px] group"
      >
        <div>
          <h3
            class="font-bold text-lg mb-6 text-gray-800 truncate group-hover:underline"
          >
            {{ project.name }}
          </h3>
        </div>

        <div class="flex justify-between items-center">
          <div class="flex items-center space-x-3">
            <div class="w-7 h-7 flex items-center justify-center rounded">
              <img
                v-if="project.language && languageSVGs[project.language]"
                :src="`/assets/${languageSVGs[project.language]}`"
                :alt="project.language"
                class="w-5 h-5 object-contain"
              />
            </div>
            <span class="text-sm text-gray-500">{{
              project.language || 'Other'
            }}</span>
          </div>

          <div
            class="flex items-center space-x-1 text-gray-400 group-hover:text-black"
          >
            <i class="fab fa-github text-lg"></i>
          </div>
        </div>
      </a>
    </div>

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

    <div
      v-if="projects && totalPages > 1"
      class="flex justify-center mt-20 space-x-4"
    >
      <button
        :disabled="currentPage === 1"
        class="px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
        @click="prevPage"
      >
        Previous
      </button>
      <button
        :disabled="currentPage === totalPages"
        class="px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
        @click="nextPage"
      >
        Next
      </button>
    </div>

    <div class="relative z-10 fade-in-up mt-20">
      <h2 class="text-4xl font-bold text-center mb-10">Online Projects</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        <a
          v-for="project in onlineProjects"
          :key="project.url"
          :href="project.url"
          target="_blank"
          class="border border-gray-200 rounded-2xl bg-white p-6 shadow-sm hover:shadow-lg transition transform hover:-translate-y-1 hover:border-gray-400 flex flex-col justify-between min-h-[220px] group"
        >
          <div>
            <h3
              class="font-bold text-lg mb-4 text-gray-800 group-hover:underline"
            >
              {{ project.name }}
            </h3>
            <p class="text-sm text-gray-600">{{ project.description }}</p>
          </div>

          <div v-if="project.image" class="mt-4">
            <img
              :src="project.image"
              :alt="project.name"
              class="rounded-lg w-full object-cover"
            />
          </div>
        </a>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface GithubRepo {
  id: number
  name: string
  html_url: string
  language: string | null
  updated_at: string
}
interface OnlineProject {
  name: string
  url: string
  description: string
  image?: string
}

const onlineProjects = ref<OnlineProject[]>([
  {
    name: 'Medical-AI-Detection',
    url: 'https://medical-ai.antoinegourgue.dev/',
    description:
      'A deep learning-powered web application that assists in detecting medical conditions from chest X-ray images. Built for research and educational purposes.',
    image: '/assets/medical-ai-thumb.png',
  },
  {
    name: 'Portfolio',
    url: 'https://antoinegourgue.dev/',
    description:
      'My personal developer portfolio showcasing projects, skills, and experience. Built with Vue.js, Nuxt, and Tailwind CSS for a clean and modern design.',
    image: '/assets/portfolio-thumb.png',
  },
  {
    name: 'Trinity Shop',
    url: 'https://trinity.antoinegourgue.dev/',
    description:
      'An e-commerce platform built with Vue.js and Tailwind CSS, featuring a modern design and user-friendly interface. Explore products, manage your cart, and enjoy a seamless shopping experience.',
    image: '/assets/trinity-shop-thumb.png',
  },
])

const selectedLang = ref('All')
const languages = ref(['All', 'Vue', 'TypeScript', 'Other'])

const languageSVGs: Record<string, string> = {
  Vue: 'vuedotjs.svg',
  TypeScript: 'typescript.svg',
  Elixir: 'elixir.svg',
  Python: 'python.svg',
  PHP: 'php.svg',
  Docker: 'docker.svg',
  'Jupyter Notebook': 'jupyter.svg',
  JavaScript: 'javascript.svg',
  'C++': 'cplusplus.svg',
  Java: 'java.svg',
  Twig: 'twig.svg',
}

const currentPage = ref(1)
const itemsPerPage = 6
const { data: projects, error } = useFetch<GithubRepo[]>('/api/github', {
  server: true,
})

const sortedProjects = computed(() => {
  if (!projects.value) return []
  return [...projects.value].sort(
    (a, b) =>
      new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  )
})

const filteredProjects = computed(() => {
  if (!sortedProjects.value) return []
  if (selectedLang.value === 'All') return sortedProjects.value
  return sortedProjects.value.filter(
    (p) =>
      p.language === selectedLang.value ||
      (!languages.value.includes(p.language || '') &&
        selectedLang.value === 'Other')
  )
})

const showIndicator = ref(true)
const handleScroll = () => {
  showIndicator.value = window.scrollY < 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const totalPages = computed(() =>
  Math.ceil(filteredProjects.value.length / itemsPerPage)
)
const paginatedProjects = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredProjects.value.slice(start, start + itemsPerPage)
})

const selectLanguage = (lang: string) => {
  selectedLang.value = lang
  currentPage.value = 1
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}
const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}
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
