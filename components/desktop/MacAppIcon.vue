<template>
  <!-- Icône "lettre" générique (projets, liens) -->
  <svg v-if="letter" viewBox="0 0 100 100" class="h-full w-full drop-shadow-sm">
    <defs>
      <linearGradient :id="`lg-${uid}`" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" :stop-color="colorTop" />
        <stop offset="1" :stop-color="colorBottom" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="22" :fill="`url(#lg-${uid})`" />
    <text
      x="50"
      y="65"
      text-anchor="middle"
      :font-size="letter.length > 1 ? 36 : 44"
      font-weight="700"
      fill="#fff"
      font-family="-apple-system, BlinkMacSystemFont, sans-serif"
    >
      {{ letter }}
    </text>
  </svg>

  <!-- Finder -->
  <svg v-else-if="name === 'finder'" viewBox="0 0 100 100" class="h-full w-full drop-shadow-sm">
    <defs>
      <clipPath :id="`sq-${uid}`"><rect width="100" height="100" rx="22" /></clipPath>
      <linearGradient :id="`fa-${uid}`" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#63C6F7" /><stop offset="1" stop-color="#2E7DE9" />
      </linearGradient>
      <linearGradient :id="`fb-${uid}`" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#2A6FE0" /><stop offset="1" stop-color="#1450B8" />
      </linearGradient>
    </defs>
    <g :clip-path="`url(#sq-${uid})`">
      <rect width="100" height="100" :fill="`url(#fa-${uid})`" />
      <path d="M57 0 C48 33 48 67 57 100 L100 100 L100 0 Z" :fill="`url(#fb-${uid})`" />
      <line x1="33" y1="34" x2="33" y2="50" stroke="#fff" stroke-width="4.5" stroke-linecap="round" />
      <line x1="67" y1="34" x2="67" y2="50" stroke="#fff" stroke-width="4.5" stroke-linecap="round" />
      <path d="M28 64 Q50 80 72 64" stroke="#fff" stroke-width="4.5" fill="none" stroke-linecap="round" />
    </g>
  </svg>

  <!-- Safari -->
  <svg v-else-if="name === 'safari'" viewBox="0 0 100 100" class="h-full w-full drop-shadow-sm">
    <defs>
      <linearGradient :id="`sa-${uid}`" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#F8F9FB" /><stop offset="1" stop-color="#D9DDE3" />
      </linearGradient>
      <linearGradient :id="`sb-${uid}`" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#3DA5F5" /><stop offset="1" stop-color="#0D5FD8" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="22" :fill="`url(#sa-${uid})`" />
    <circle cx="50" cy="50" r="36" :fill="`url(#sb-${uid})`" />
    <circle
      cx="50"
      cy="50"
      r="31"
      fill="none"
      stroke="rgba(255,255,255,0.75)"
      stroke-width="3.5"
      stroke-dasharray="1.6 6.5"
    />
    <g transform="rotate(-45 50 50)">
      <polygon points="50,22 56,50 44,50" fill="#FF4B40" />
      <polygon points="44,50 56,50 50,78" fill="#F5F6F8" />
    </g>
  </svg>

  <!-- Contacts -->
  <svg v-else-if="name === 'contacts'" viewBox="0 0 100 100" class="h-full w-full drop-shadow-sm">
    <defs>
      <linearGradient :id="`ca-${uid}`" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#FFFFFF" /><stop offset="1" stop-color="#E6E8EC" />
      </linearGradient>
      <clipPath :id="`cc-${uid}`"><rect width="100" height="100" rx="22" /></clipPath>
    </defs>
    <g :clip-path="`url(#cc-${uid})`">
      <rect width="100" height="100" :fill="`url(#ca-${uid})`" />
      <rect x="0" y="0" width="100" height="14" fill="#B7BdC6" />
      <circle cx="50" cy="46" r="14" fill="#9098A3" />
      <path d="M22 88 Q50 58 78 88 L78 100 L22 100 Z" fill="#9098A3" />
    </g>
  </svg>

  <!-- Notes -->
  <svg v-else-if="name === 'notes'" viewBox="0 0 100 100" class="h-full w-full drop-shadow-sm">
    <defs>
      <clipPath :id="`nc-${uid}`"><rect width="100" height="100" rx="22" /></clipPath>
      <linearGradient :id="`na-${uid}`" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#FDD44D" /><stop offset="1" stop-color="#FBBF24" />
      </linearGradient>
    </defs>
    <g :clip-path="`url(#nc-${uid})`">
      <rect width="100" height="100" fill="#FDFDFD" />
      <rect width="100" height="27" :fill="`url(#na-${uid})`" />
      <line x1="10" y1="33" x2="90" y2="33" stroke="#E3E4E8" stroke-width="2.5" stroke-dasharray="4 5" />
      <rect x="20" y="46" width="60" height="5" rx="2.5" fill="#C9CBD1" />
      <rect x="20" y="60" width="46" height="5" rx="2.5" fill="#D7D9DE" />
      <rect x="20" y="74" width="53" height="5" rx="2.5" fill="#D7D9DE" />
    </g>
  </svg>

  <!-- Mail -->
  <svg v-else-if="name === 'mail'" viewBox="0 0 100 100" class="h-full w-full drop-shadow-sm">
    <defs>
      <linearGradient :id="`ma-${uid}`" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#2CA8F6" /><stop offset="1" stop-color="#0A5BCB" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="22" :fill="`url(#ma-${uid})`" />
    <rect x="20" y="30" width="60" height="42" rx="7" fill="#FBFCFE" />
    <path d="M23 35 L50 57 L77 35" fill="none" stroke="#C4D2E4" stroke-width="3" stroke-linejoin="round" />
    <path d="M25 69 L41 53 M75 69 L59 53" fill="none" stroke="#C4D2E4" stroke-width="3" stroke-linecap="round" />
  </svg>

  <!-- Terminal -->
  <svg v-else-if="name === 'terminal'" viewBox="0 0 100 100" class="h-full w-full drop-shadow-sm">
    <defs>
      <linearGradient :id="`ta-${uid}`" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#3A3B40" /><stop offset="1" stop-color="#131316" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="22" :fill="`url(#ta-${uid})`" />
    <path d="M22 32 L38 47 L22 62" fill="none" stroke="#FFFFFF" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
    <line x1="46" y1="64" x2="72" y2="64" stroke="#FFFFFF" stroke-width="6" stroke-linecap="round" />
  </svg>

  <!-- GitHub -->
  <svg v-else-if="name === 'github'" viewBox="0 0 100 100" class="h-full w-full drop-shadow-sm">
    <defs>
      <linearGradient :id="`ga-${uid}`" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#2F3136" /><stop offset="1" stop-color="#101114" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="22" :fill="`url(#ga-${uid})`" />
    <path
      transform="translate(18 18) scale(4)"
      fill="#fff"
      d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"
    />
  </svg>

  <!-- App Store -->
  <svg v-else-if="name === 'appstore'" viewBox="0 0 100 100" class="h-full w-full drop-shadow-sm">
    <defs>
      <linearGradient :id="`as-${uid}`" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#1D9BF6" /><stop offset="1" stop-color="#0D5FE3" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="22" :fill="`url(#as-${uid})`" />
    <g stroke="#fff" stroke-width="7.5" stroke-linecap="round" fill="none">
      <path d="M34 70 L52 32" />
      <path d="M66 70 L48 32" />
      <path d="M30 58 H70" />
    </g>
  </svg>

  <!-- Calendrier -->
  <svg v-else-if="name === 'calendar'" viewBox="0 0 100 100" class="h-full w-full drop-shadow-sm">
    <defs>
      <clipPath :id="`cal-${uid}`"><rect width="100" height="100" rx="22" /></clipPath>
    </defs>
    <g :clip-path="`url(#cal-${uid})`">
      <rect width="100" height="100" fill="#FDFDFD" />
      <rect width="100" height="26" fill="#FF3B30" />
      <text
        x="50"
        y="19"
        text-anchor="middle"
        font-size="12"
        font-weight="600"
        fill="#fff"
        font-family="-apple-system, BlinkMacSystemFont, sans-serif"
      >
        MAR
      </text>
      <text
        x="50"
        y="76"
        text-anchor="middle"
        font-size="46"
        font-weight="300"
        fill="#1d1d1f"
        font-family="-apple-system, BlinkMacSystemFont, sans-serif"
      >
        18
      </text>
    </g>
  </svg>

  <!-- Corbeille -->
  <svg v-else-if="name === 'trash'" viewBox="0 0 100 100" class="h-full w-full drop-shadow-sm">
    <defs>
      <linearGradient :id="`tr-${uid}`" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#EDEFF2" /><stop offset="1" stop-color="#C3C9D1" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="22" :fill="`url(#tr-${uid})`" />
    <rect x="43" y="22" width="14" height="7" rx="3.5" fill="none" stroke="#8B939F" stroke-width="3" />
    <rect x="28" y="30" width="44" height="6" rx="3" fill="#8B939F" />
    <path d="M32 40 L36 78 Q36.5 82 41 82 H59 Q63.5 82 64 78 L68 40 Z" fill="#A5ADB8" />
    <line x1="43" y1="46" x2="44.5" y2="74" stroke="#EDEFF2" stroke-width="2.5" stroke-linecap="round" />
    <line x1="50" y1="46" x2="50" y2="74" stroke="#EDEFF2" stroke-width="2.5" stroke-linecap="round" />
    <line x1="57" y1="46" x2="55.5" y2="74" stroke="#EDEFF2" stroke-width="2.5" stroke-linecap="round" />
  </svg>

  <!-- Dossier -->
  <svg v-else-if="name === 'folder'" viewBox="0 0 100 84" class="h-full w-full drop-shadow-md">
    <defs>
      <linearGradient :id="`fo-${uid}`" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#4FB0F8" /><stop offset="1" stop-color="#1E7BE8" />
      </linearGradient>
      <linearGradient :id="`fp-${uid}`" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#77C4FA" /><stop offset="1" stop-color="#3D95F2" />
      </linearGradient>
    </defs>
    <path d="M4 20 Q4 12 12 12 H34 L42 20 H88 Q96 20 96 28 V66 Q96 74 88 74 H12 Q4 74 4 66 Z" :fill="`url(#fo-${uid})`" />
    <path d="M4 30 H96 V66 Q96 74 88 74 H12 Q4 74 4 66 Z" :fill="`url(#fp-${uid})`" />
  </svg>

  <!-- Fichier PDF -->
  <svg v-else-if="name === 'pdf'" viewBox="0 0 80 100" class="h-full w-full drop-shadow-md">
    <path d="M8 8 Q8 2 14 2 H50 L72 24 V92 Q72 98 66 98 H14 Q8 98 8 92 Z" fill="#FDFDFE" stroke="#D5D7DC" stroke-width="1.5" />
    <path d="M50 2 L72 24 H55 Q50 24 50 19 Z" fill="#E4E7EC" />
    <rect x="14" y="56" width="52" height="22" rx="5" fill="#E5484D" />
    <text
      x="40"
      y="72"
      text-anchor="middle"
      font-size="14"
      font-weight="700"
      fill="#fff"
      font-family="-apple-system, BlinkMacSystemFont, sans-serif"
    >
      PDF
    </text>
  </svg>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    name?: string
    letter?: string
    colorTop?: string
    colorBottom?: string
  }>(),
  { name: '', letter: '', colorTop: '#4FB0F8', colorBottom: '#1E7BE8' }
)

// Identifiant unique pour les défs SVG (évite les collisions d'id entre instances)
const uid = useId().replace(/[^a-zA-Z0-9]/g, '')
</script>
