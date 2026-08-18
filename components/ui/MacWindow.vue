<template>
  <div
    class="overflow-hidden rounded-2xl border backdrop-blur-2xl transition-shadow duration-300"
    :class="[
      dark
        ? 'border-white/10 bg-[#1e1e20] ring-1 ring-white/10'
        : 'border-black/10 bg-white/80 ring-1 ring-white/40',
      active
        ? 'shadow-[0_30px_70px_-15px_rgba(0,0,0,0.5)]'
        : 'shadow-[0_15px_40px_-15px_rgba(0,0,0,0.3)]',
    ]"
  >
    <!-- Barre de navigation iOS (mobile uniquement) -->
    <div
      class="relative flex items-center justify-between px-3 py-2.5 lg:hidden"
      :class="
        dark
          ? 'border-b border-white/10 bg-[#2c2c2e]'
          : 'border-b border-black/5 bg-white/70'
      "
    >
      <NuxtLink
        :to="localePath('/')"
        class="flex items-center gap-0.5 text-[15px] font-medium text-ablue"
      >
        <span class="text-[19px] leading-none">‹</span> {{ $t('nav.home') }}
      </NuxtLink>
      <span
        v-if="title"
        class="pointer-events-none absolute left-1/2 -translate-x-1/2 text-[15px] font-semibold"
        :class="dark ? 'text-white/80' : 'text-aink'"
        >{{ title }}</span
      >
      <span class="flex w-16 justify-end">
        <slot name="ios-action" />
      </span>
    </div>

    <!-- Barre de titre (desktop) -->
    <div
      class="drag-handle relative hidden items-center px-4 py-2.5 select-none lg:flex"
      :class="
        dark
          ? 'border-b border-white/10 bg-[#2c2c2e]'
          : 'border-b border-black/5 bg-white/70'
      "
    >
      <div class="group flex items-center gap-2">
        <!-- Fermer -->
        <button
          class="light border"
          :class="
            active ? 'border-[#E0443E] bg-[#FF5F57]' : lightOff
          "
          aria-label="close"
          @click.stop="sfx.minimize(), $emit('close')"
          @pointerdown.stop
        >
          <svg viewBox="0 0 12 12" class="glyph">
            <path
              d="M3.6 3.6 L8.4 8.4 M8.4 3.6 L3.6 8.4"
              stroke="#820005"
              stroke-width="1.2"
              stroke-linecap="round"
            />
          </svg>
        </button>
        <!-- Réduire -->
        <button
          class="light border"
          :class="
            active ? 'border-[#D89E24] bg-[#FEBC2E]' : lightOff
          "
          aria-label="minimize"
          @click.stop="sfx.minimize(), $emit('minimize')"
          @pointerdown.stop
        >
          <svg viewBox="0 0 12 12" class="glyph">
            <path
              d="M2.8 6 H9.2"
              stroke="#985712"
              stroke-width="1.4"
              stroke-linecap="round"
            />
          </svg>
        </button>
        <!-- Agrandir -->
        <button
          class="light border"
          :class="
            active ? 'border-[#1AAB29] bg-[#28C840]' : lightOff
          "
          aria-label="zoom"
          @click.stop="sfx.pop(), $emit('zoom')"
          @pointerdown.stop
        >
          <svg viewBox="0 0 12 12" class="glyph">
            <path d="M3 6.4 V3 h3.4 Z" fill="#006500" />
            <path d="M9 5.6 V9 H5.6 Z" fill="#006500" />
          </svg>
        </button>
      </div>
      <span
        v-if="title && !$slots.toolbar"
        class="pointer-events-none absolute left-1/2 -translate-x-1/2 text-[13px] font-medium"
        :class="[
          dark ? 'text-white/50' : 'text-black/50',
          active ? '' : 'opacity-60',
        ]"
        >{{ title }}</span
      >

      <!-- Barre d'outils intégrée (style Finder/Calendrier) -->
      <div v-if="$slots.toolbar" class="ml-4 min-w-0 flex-1">
        <slot name="toolbar" />
      </div>
    </div>

    <!-- Barre d'adresse (mode Safari) -->
    <div v-if="url" class="border-b border-black/5 bg-white/60 px-4 py-2">
      <div
        class="mx-auto flex max-w-[420px] items-center justify-center gap-1.5 rounded-lg bg-black/5 px-3 py-1.5 text-xs text-black/60"
      >
        <i class="fas fa-lock text-[9px] text-black/40"></i>
        {{ url }}
      </div>
    </div>

    <slot />
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string
    url?: string
    dark?: boolean
    active?: boolean
  }>(),
  { title: '', url: '', dark: false, active: true }
)

defineEmits<{
  close: []
  minimize: []
  zoom: []
}>()

const lightOff = 'border-black/10 bg-[#DBDBDB] dark:bg-[#4a4a4c]'
const sfx = useSfx()
const localePath = useLocalePath()
</script>

<style scoped>
.light {
  @apply flex h-3 w-3 items-center justify-center rounded-full transition-colors;
}
.glyph {
  @apply h-full w-full p-[1px] opacity-0 transition-opacity duration-150 group-hover:opacity-100;
}
</style>
