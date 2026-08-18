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
    <!-- Barre de titre -->
    <div
      class="drag-handle relative flex items-center px-4 py-2.5 select-none"
      :class="
        dark
          ? 'border-b border-white/10 bg-[#2c2c2e]'
          : 'border-b border-black/5 bg-white/70'
      "
    >
      <div class="group flex items-center gap-2">
        <button
          class="flex h-3 w-3 items-center justify-center rounded-full text-[8px] text-black/50 transition-colors"
          :class="active ? 'bg-[#ff5f57]' : lightOff"
          :aria-label="'close'"
          @click.stop="$emit('close')"
          @pointerdown.stop
        >
          <span class="opacity-0 transition-opacity group-hover:opacity-100"
            >×</span
          >
        </button>
        <button
          class="flex h-3 w-3 items-center justify-center rounded-full text-[8px] text-black/50 transition-colors"
          :class="active ? 'bg-[#febc2e]' : lightOff"
          :aria-label="'minimize'"
          @click.stop="$emit('minimize')"
          @pointerdown.stop
        >
          <span class="opacity-0 transition-opacity group-hover:opacity-100"
            >−</span
          >
        </button>
        <button
          class="flex h-3 w-3 items-center justify-center rounded-full text-[8px] text-black/50 transition-colors"
          :class="active ? 'bg-[#28c840]' : lightOff"
          :aria-label="'zoom'"
          @click.stop="$emit('zoom')"
          @pointerdown.stop
        >
          <span class="opacity-0 transition-opacity group-hover:opacity-100"
            >+</span
          >
        </button>
      </div>
      <span
        v-if="title"
        class="pointer-events-none absolute left-1/2 -translate-x-1/2 text-[13px] font-medium"
        :class="[
          dark ? 'text-white/50' : 'text-black/50',
          active ? '' : 'opacity-60',
        ]"
        >{{ title }}</span
      >
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

const lightOff = 'bg-black/20 dark-light-off'
</script>
