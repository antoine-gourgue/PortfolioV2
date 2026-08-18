<template>
  <!-- Icônes style SF Symbols : trait fin arrondi, currentColor -->
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="h-[1em] w-[1em]"
  >
    <template v-if="name === 'chevron-left'"><path d="M14.5 5.5 L8.5 12 L14.5 18.5" /></template>
    <template v-else-if="name === 'chevron-right'"><path d="M9.5 5.5 L15.5 12 L9.5 18.5" /></template>
    <template v-else-if="name === 'share'">
      <path d="M8 9.5 H6.5 A1.5 1.5 0 0 0 5 11 V18 A1.5 1.5 0 0 0 6.5 19.5 H17.5 A1.5 1.5 0 0 0 19 18 V11 A1.5 1.5 0 0 0 17.5 9.5 H16" />
      <path d="M12 14.5 V3.5 M8.8 6.5 L12 3.3 L15.2 6.5" />
    </template>
    <template v-else-if="name === 'grid'">
      <rect x="4" y="4" width="7" height="7" rx="1.5" />
      <rect x="13" y="4" width="7" height="7" rx="1.5" />
      <rect x="4" y="13" width="7" height="7" rx="1.5" />
      <rect x="13" y="13" width="7" height="7" rx="1.5" />
    </template>
    <template v-else-if="name === 'list'">
      <path d="M9 6 H20 M9 12 H20 M9 18 H20" />
      <circle cx="5" cy="6" r="0.9" fill="currentColor" />
      <circle cx="5" cy="12" r="0.9" fill="currentColor" />
      <circle cx="5" cy="18" r="0.9" fill="currentColor" />
    </template>
    <template v-else-if="name === 'sort'"><path d="M4 7 H20 M4 12 H15 M4 17 H10" /></template>
    <template v-else-if="name === 'search'">
      <circle cx="10.5" cy="10.5" r="6" />
      <path d="M15 15 L20 20" />
    </template>
    <template v-else-if="name === 'wifi'">
      <path d="M4 10.5 A11 11 0 0 1 20 10.5" />
      <path d="M7 13.8 A7 7 0 0 1 17 13.8" />
      <path d="M10 17 A3.2 3.2 0 0 1 14 17" />
      <circle cx="12" cy="19.4" r="1" fill="currentColor" stroke="none" />
    </template>
    <template v-else-if="name === 'battery'">
      <rect x="2.5" y="8" width="16" height="8" rx="2.5" />
      <rect x="4.3" y="9.8" width="9.5" height="4.4" rx="1.2" fill="currentColor" stroke="none" />
      <path d="M20.5 10.5 V13.5" />
    </template>
    <template v-else-if="name === 'airdrop'">
      <path d="M5.5 8 A8 8 0 0 1 18.5 8" />
      <path d="M7.8 11 A5 5 0 0 1 16.2 11" />
      <path d="M12 14.5 L15 20 H9 Z" fill="currentColor" stroke="none" />
    </template>
    <template v-else-if="name === 'clock'">
      <circle cx="12" cy="12" r="8" />
      <path d="M12 7.5 V12 L15 14" />
    </template>
    <template v-else-if="name === 'desktop'">
      <rect x="3.5" y="5" width="17" height="11" rx="1.8" />
      <path d="M9.5 19 H14.5 M12 16 V19" />
    </template>
    <template v-else-if="name === 'doc'">
      <path d="M6 3.5 H13.5 L18 8 V20.5 H6 Z" transform="translate(0 -0.5)" />
      <path d="M13.5 3.5 V8 H18" transform="translate(0 -0.5)" />
    </template>
    <template v-else-if="name === 'download'">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 8 V15.5 M9 13 L12 16 L15 13" />
    </template>
    <template v-else-if="name === 'folder'">
      <path d="M3.5 7 A1.5 1.5 0 0 1 5 5.5 H9 L11 7.5 H19 A1.5 1.5 0 0 1 20.5 9 V17 A1.5 1.5 0 0 1 19 18.5 H5 A1.5 1.5 0 0 1 3.5 17 Z" />
    </template>
    <template v-else-if="name === 'laptop'">
      <rect x="5" y="5.5" width="14" height="9.5" rx="1.5" />
      <path d="M3 18 H21" />
    </template>
    <template v-else-if="name === 'tag'">
      <path d="M4 5.5 A1.5 1.5 0 0 1 5.5 4 H11 L20 13 A1.6 1.6 0 0 1 20 15.2 L15.2 20 A1.6 1.6 0 0 1 13 20 L4 11 Z" />
      <circle cx="8.6" cy="8.6" r="1" fill="currentColor" stroke="none" />
    </template>
  </svg>
</template>

<script setup lang="ts">
defineProps<{ name: string }>()
</script>
