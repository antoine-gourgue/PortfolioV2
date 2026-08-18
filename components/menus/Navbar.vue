<template>
  <!-- Navigation mobile uniquement — sur desktop, MacMenuBar + MacDock prennent le relais -->
  <nav
    class="lg:hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-80 backdrop-blur-md shadow-xl rounded-full px-6 py-3 flex justify-between items-center w-[90%] max-w-md border border-gray-200 z-50"
  >
    <NuxtLink
      :to="localePath('/')"
      class="bottom-link"
      :class="isActiveMobile('/')"
    >
      <i
        class="fa-solid fa-house w-5 h-5 mb-1 transition-transform duration-300"
      ></i>
      <span class="text-xs transition-transform duration-300">{{
        $t('nav.home')
      }}</span>
    </NuxtLink>
    <NuxtLink
      class="bottom-link"
      :class="isActiveMobile('/about')"
      :to="localePath('/about')"
    >
      <i class="fa-solid fa-address-card w-5 h-5 mb-1"></i>
      <span class="text-xs">{{ $t('nav.about') }}</span>
    </NuxtLink>
    <NuxtLink
      :to="localePath('/blog')"
      class="bottom-link"
      :class="isActiveMobile('/blog')"
    >
      <i class="fa-solid fa-file w-5 h-5 mb-1"></i>
      <span class="text-xs">{{ $t('nav.blog') }}</span>
    </NuxtLink>
    <NuxtLink
      :to="localePath('/projects')"
      class="bottom-link"
      :class="isActiveMobile('/projects')"
    >
      <i class="fa-solid fa-laptop-code w-5 h-5 mb-1"></i>
      <span class="text-xs">{{ $t('nav.projects') }}</span>
    </NuxtLink>
    <NuxtLink
      :to="localePath('/contact')"
      class="bottom-link"
      :class="isActiveMobile('/contact')"
    >
      <i class="fa-solid fa-address-book w-5 h-5 mb-1"></i>
      <span class="text-xs">{{ $t('nav.contact') }}</span>
    </NuxtLink>
    <div class="relative language-dropdown">
      <button
        class="bottom-link"
        @click.stop="showLangDropdownMobile = !showLangDropdownMobile"
      >
        <i class="fas fa-globe w-5 h-5 mb-1"></i>
        <span class="text-xs">{{ $t('nav.language') }}</span>
      </button>
      <transition name="dropdown">
        <div
          v-if="showLangDropdownMobile"
          class="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[120px] z-50"
          @click.stop
        >
          <button
            v-for="loc in availableLocales"
            :key="loc.code"
            class="w-full text-left px-4 py-2 text-sm transition hover:bg-gray-100 flex items-center justify-between"
            :class="
              currentLocale === loc.code
                ? 'text-black font-medium'
                : 'text-gray-600'
            "
            @click="selectLanguage(loc.code)"
          >
            <span>{{ loc.name }}</span>
            <i
              v-if="currentLocale === loc.code"
              class="fas fa-check text-black"
            ></i>
          </button>
        </div>
      </transition>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from '#imports'

const route = useRoute()
const { locale, locales } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
const router = useRouter()
const showLangDropdownMobile = ref(false)

const currentLocale = computed(() => locale.value)
const availableLocales = computed(() => locales.value)

const selectLanguage = (code: string) => {
  const path = switchLocalePath(code as 'fr' | 'es' | 'en')
  router.push(path)
  showLangDropdownMobile.value = false
}

const isActiveMobile = (path: string) => {
  const currentPath = route.path.replace(/^\/[a-z]{2}(\/|$)/, '/')
  return currentPath === path ? 'text-black scale-95' : 'text-gray-500'
}

onMounted(() => {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement
    if (!target.closest('.language-dropdown')) {
      showLangDropdownMobile.value = false
    }
  })
})
</script>

<style scoped>
.bottom-link {
  @apply flex flex-col items-center transition-all duration-300;
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
