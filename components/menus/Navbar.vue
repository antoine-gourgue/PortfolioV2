<template>
  <nav
    class="hidden lg:flex fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-white bg-opacity-80 backdrop-blur-md text-black rounded-full px-6 py-3 items-center space-x-9 border border-gray-200 shadow-md"
  >
    <div class="flex items-center space-x-4">
      <NuxtLink :to="localePath('/')" class="nav-link" :class="isActive('/')">{{
        $t('nav.home')
      }}</NuxtLink>
      <NuxtLink
        :to="localePath('/about')"
        class="nav-link"
        :class="isActive('/about')"
        >{{ $t('nav.about') }}</NuxtLink
      >
      <NuxtLink
        :to="localePath('/services')"
        class="nav-link"
        :class="isActive('/services')"
        >{{ $t('nav.services') }}</NuxtLink
      >
    </div>

    <NuxtLink :to="localePath('/')">
      <div
        class="relative flex items-center group cursor-pointer"
        @mouseenter="hovered = true"
        @mouseleave="hovered = false"
      >
        <AgLogo
          class="w-12 h-10 transition-transform duration-300 ease-in-out"
          :class="{ '-translate-x-8': hovered }"
        />
        <transition name="fade-slide">
          <div
            v-if="hovered"
            class="absolute left-0 ml-2 flex flex-col text-gray-700 text-xs font-light whitespace-nowrap transition-all duration-300 ease-in-out"
          >
            <span>Made by</span>
            <span class="font-semibold">Antoine</span>
          </div>
        </transition>
      </div>
    </NuxtLink>

    <div class="flex items-center space-x-4">
      <NuxtLink
        :to="localePath('/blog')"
        class="nav-link"
        :class="isActive('/blog')"
        >{{ $t('nav.blog') }}</NuxtLink
      >
      <NuxtLink
        :to="localePath('/projects')"
        class="nav-link"
        :class="isActive('/projects')"
        >{{ $t('nav.projects') }}</NuxtLink
      >
      <NuxtLink
        :to="localePath('/contact')"
        class="nav-link"
        :class="isActive('/contact')"
        >{{ $t('nav.contact') }}</NuxtLink
      >
      <div
        class="relative ml-4 language-dropdown"
        @mouseenter="showLangDropdown = true"
        @mouseleave="showLangDropdown = false"
      >
        <button
          class="nav-link flex items-center space-x-1"
          @click.stop="showLangDropdown = !showLangDropdown"
        >
          <span>{{ $t('nav.language') }}</span>
          <i
            class="fas fa-chevron-down text-xs transition-transform duration-200"
            :class="{ 'rotate-180': showLangDropdown }"
          ></i>
        </button>
        <transition name="dropdown">
          <div
            v-if="showLangDropdown"
            class="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[120px] z-50"
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
    </div>
  </nav>

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
      class="bottom-link"
      :class="isActiveMobile('/services')"
      :to="localePath('/services')"
    >
      <i class="fa-solid fa-keyboard w-5 h-5 mb-1"></i>
      <span class="text-xs">{{ $t('nav.services') }}</span>
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
import AgLogo from '~/components/ui/AGLogo.vue'

const route = useRoute()
const { locale, locales } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
const router = useRouter()
const hovered = ref(false)
const showLangDropdown = ref(false)
const showLangDropdownMobile = ref(false)

const currentLocale = computed(() => locale.value)
const availableLocales = computed(() => locales.value)

const selectLanguage = (code: string) => {
  const path = switchLocalePath(code as 'fr' | 'es' | 'en')
  router.push(path)
  showLangDropdown.value = false
  showLangDropdownMobile.value = false
}

const isActive = (path: string) => {
  const currentPath = route.path.replace(/^\/[a-z]{2}(\/|$)/, '/')
  return currentPath === path ? 'active-link' : ''
}

const isActiveMobile = (path: string) => {
  const currentPath = route.path.replace(/^\/[a-z]{2}(\/|$)/, '/')
  return currentPath === path ? 'text-black scale-95' : 'text-gray-500'
}

const closeDropdowns = () => {
  showLangDropdown.value = false
  showLangDropdownMobile.value = false
}

onMounted(() => {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement
    if (!target.closest('.language-dropdown')) {
      closeDropdowns()
    }
  })
})
</script>

<style scoped>
.nav-link {
  @apply relative px-4 py-2 rounded-full text-sm transition duration-300;
}

.nav-link::after {
  content: '';
  @apply absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-black transition-all duration-300;
}

.nav-link:hover::after,
.nav-link.active-link::after {
  @apply w-6;
}

.bottom-link {
  @apply flex flex-col items-center transition-all duration-300;
}

.bottom-link.active-link {
  @apply text-black;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
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
