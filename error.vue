<template>
  <div
    class="flex min-h-screen items-center justify-center px-5 font-sans"
    :style="{
      backgroundImage:
        'radial-gradient(110% 85% at 12% 8%, rgba(94,158,240,0.75) 0%, rgba(94,158,240,0) 52%), radial-gradient(130% 100% at 50% 108%, rgba(6,26,74,0.95) 0%, rgba(6,26,74,0) 62%), linear-gradient(165deg, #0b1f4d 0%, #1d4fa8 55%, #3f7fdc 100%)',
    }"
  >
    <!-- Boîte de dialogue Finder -->
    <div
      class="w-full max-w-sm overflow-hidden rounded-2xl bg-white/85 text-center shadow-[0_30px_70px_-15px_rgba(0,0,0,0.5)] ring-1 ring-white/40 backdrop-blur-2xl"
    >
      <div class="px-8 pb-7 pt-8">
        <div class="relative mx-auto h-20 w-24">
          <DesktopMacAppIcon name="folder" />
          <span
            class="absolute inset-0 flex items-center justify-center pt-2 text-3xl font-bold text-white/90"
            >?</span
          >
        </div>
        <p class="mt-4 text-[17px] font-bold text-[#1d1d1f]">
          {{ error?.statusCode === 404 ? $t('macos.errTitle') : `Erreur ${error?.statusCode}` }}
        </p>
        <p class="mt-1.5 text-[13px] leading-relaxed text-[#1d1d1f]/60">
          {{ $t('macos.errDesc') }}
        </p>
        <p
          v-if="route.fullPath"
          class="mx-auto mt-3 max-w-full truncate rounded-md bg-black/5 px-3 py-1 font-mono text-[11px] text-[#1d1d1f]/50"
        >
          {{ route.fullPath }}
        </p>
        <button
          class="mt-6 w-full rounded-lg bg-[#0071e3] py-2 text-[13px] font-medium text-white shadow-sm transition-colors hover:bg-[#0077ed]"
          @click="goHome"
        >
          {{ $t('macos.errBack') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{ error?: NuxtError }>()

const route = useRoute()

const goHome = () => clearError({ redirect: '/' })
</script>
