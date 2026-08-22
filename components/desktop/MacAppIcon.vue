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
  <svg
    v-else-if="name === 'finder'"
    viewBox="0 0 100 100"
    class="h-full w-full drop-shadow-sm"
  >
    <defs>
      <clipPath :id="`sq-${uid}`">
        <rect width="100" height="100" rx="22" />
      </clipPath>
      <linearGradient :id="`fa-${uid}`" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#63C6F7" />
        <stop offset="1" stop-color="#2E7DE9" />
      </linearGradient>
      <linearGradient :id="`fb-${uid}`" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#2A6FE0" />
        <stop offset="1" stop-color="#1450B8" />
      </linearGradient>
    </defs>
    <g :clip-path="`url(#sq-${uid})`">
      <rect width="100" height="100" :fill="`url(#fa-${uid})`" />
      <path
        d="M57 0 C48 33 48 67 57 100 L100 100 L100 0 Z"
        :fill="`url(#fb-${uid})`"
      />
      <line
        x1="33"
        y1="34"
        x2="33"
        y2="50"
        stroke="#fff"
        stroke-width="4.5"
        stroke-linecap="round"
      />
      <line
        x1="67"
        y1="34"
        x2="67"
        y2="50"
        stroke="#fff"
        stroke-width="4.5"
        stroke-linecap="round"
      />
      <path
        d="M28 64 Q50 80 72 64"
        stroke="#fff"
        stroke-width="4.5"
        fill="none"
        stroke-linecap="round"
      />
    </g>
  </svg>

  <!-- Safari -->
  <svg
    v-else-if="name === 'safari'"
    viewBox="0 0 100 100"
    class="h-full w-full drop-shadow-sm"
  >
    <defs>
      <linearGradient :id="`sa-${uid}`" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#F8F9FB" />
        <stop offset="1" stop-color="#D9DDE3" />
      </linearGradient>
      <linearGradient :id="`sb-${uid}`" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#3DA5F5" />
        <stop offset="1" stop-color="#0D5FD8" />
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

  <!-- Contacts (carnet d'adresses) -->
  <svg
    v-else-if="name === 'contacts'"
    viewBox="0 0 100 100"
    class="h-full w-full drop-shadow-sm"
  >
    <defs>
      <linearGradient :id="`ca-${uid}`" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#FFFFFF" />
        <stop offset="1" stop-color="#EAECEF" />
      </linearGradient>
      <linearGradient :id="`cb-${uid}`" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#C98F55" />
        <stop offset="1" stop-color="#A6713C" />
      </linearGradient>
      <linearGradient :id="`cs-${uid}`" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#AAB1BC" />
        <stop offset="1" stop-color="#8A919D" />
      </linearGradient>
      <clipPath :id="`cc-${uid}`">
        <rect width="100" height="100" rx="22" />
      </clipPath>
    </defs>
    <g :clip-path="`url(#cc-${uid})`">
      <rect width="100" height="100" :fill="`url(#ca-${uid})`" />
      <!-- Bande cuir + couture -->
      <rect width="100" height="17" :fill="`url(#cb-${uid})`" />
      <line
        x1="6"
        y1="13"
        x2="94"
        y2="13"
        stroke="#8A5A2B"
        stroke-width="1.4"
        stroke-dasharray="3 3.4"
        stroke-linecap="round"
      />
      <!-- Silhouette (glyphe SF person_fill, Framework7 Icons MIT) -->
      <path
        transform="translate(17 24) scale(1.18)"
        :fill="`url(#cs-${uid})`"
        d="M 28.0117 27.3672 C 33.0508 27.3672 37.3867 22.8672 37.3867 17.0078 C 37.3867 11.2187 33.0274 6.9297 28.0117 6.9297 C 22.9961 6.9297 18.6367 11.3125 18.6367 17.0547 C 18.6367 22.8672 22.9961 27.3672 28.0117 27.3672 Z M 13.2930 49.0703 L 42.7305 49.0703 C 46.4101 49.0703 47.7226 48.0156 47.7226 45.9531 C 47.7226 39.9062 40.1523 31.5625 28.0117 31.5625 C 15.8477 31.5625 8.2774 39.9062 8.2774 45.9531 C 8.2774 48.0156 9.5898 49.0703 13.2930 49.0703 Z"
      />
      <!-- Onglets colorés sur la tranche -->
      <rect x="91" y="26" width="9" height="13" rx="2.5" fill="#F87171" />
      <rect x="91" y="44" width="9" height="13" rx="2.5" fill="#FBBF24" />
      <rect x="91" y="62" width="9" height="13" rx="2.5" fill="#34D399" />
      <rect x="91" y="80" width="9" height="13" rx="2.5" fill="#60A5FA" />
    </g>
  </svg>

  <!-- Notes -->
  <svg
    v-else-if="name === 'notes'"
    viewBox="0 0 100 100"
    class="h-full w-full drop-shadow-sm"
  >
    <defs>
      <clipPath :id="`nc-${uid}`">
        <rect width="100" height="100" rx="22" />
      </clipPath>
      <linearGradient :id="`na-${uid}`" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#FDD44D" />
        <stop offset="1" stop-color="#FBBF24" />
      </linearGradient>
    </defs>
    <g :clip-path="`url(#nc-${uid})`">
      <rect width="100" height="100" fill="#FDFDFD" />
      <rect width="100" height="27" :fill="`url(#na-${uid})`" />
      <line
        x1="10"
        y1="33"
        x2="90"
        y2="33"
        stroke="#E3E4E8"
        stroke-width="2.5"
        stroke-dasharray="4 5"
      />
      <rect x="20" y="46" width="60" height="5" rx="2.5" fill="#C9CBD1" />
      <rect x="20" y="60" width="46" height="5" rx="2.5" fill="#D7D9DE" />
      <rect x="20" y="74" width="53" height="5" rx="2.5" fill="#D7D9DE" />
    </g>
  </svg>

  <!-- Mail -->
  <svg
    v-else-if="name === 'mail'"
    viewBox="0 0 100 100"
    class="h-full w-full drop-shadow-sm"
  >
    <defs>
      <linearGradient :id="`ma-${uid}`" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#2CA8F6" />
        <stop offset="1" stop-color="#0A5BCB" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="22" :fill="`url(#ma-${uid})`" />
    <rect x="20" y="30" width="60" height="42" rx="7" fill="#FBFCFE" />
    <path
      d="M23 35 L50 57 L77 35"
      fill="none"
      stroke="#C4D2E4"
      stroke-width="3"
      stroke-linejoin="round"
    />
    <path
      d="M25 69 L41 53 M75 69 L59 53"
      fill="none"
      stroke="#C4D2E4"
      stroke-width="3"
      stroke-linecap="round"
    />
  </svg>

  <!-- Terminal -->
  <svg
    v-else-if="name === 'terminal'"
    viewBox="0 0 100 100"
    class="h-full w-full drop-shadow-sm"
  >
    <defs>
      <linearGradient :id="`ta-${uid}`" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#3A3B40" />
        <stop offset="1" stop-color="#131316" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="22" :fill="`url(#ta-${uid})`" />
    <path
      d="M22 32 L38 47 L22 62"
      fill="none"
      stroke="#FFFFFF"
      stroke-width="6"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <line
      x1="46"
      y1="64"
      x2="72"
      y2="64"
      stroke="#FFFFFF"
      stroke-width="6"
      stroke-linecap="round"
    />
  </svg>

  <!-- GitHub -->
  <svg
    v-else-if="name === 'github'"
    viewBox="0 0 100 100"
    class="h-full w-full drop-shadow-sm"
  >
    <defs>
      <linearGradient :id="`ga-${uid}`" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#2F3136" />
        <stop offset="1" stop-color="#101114" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="22" :fill="`url(#ga-${uid})`" />
    <path
      transform="translate(18 18) scale(4)"
      fill="#fff"
      d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"
    />
  </svg>

  <!-- Messages -->
  <svg
    v-else-if="name === 'messages'"
    viewBox="0 0 100 100"
    class="h-full w-full drop-shadow-sm"
  >
    <defs>
      <linearGradient :id="`ms-${uid}`" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#6BE36F" />
        <stop offset="1" stop-color="#18B663" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="22" :fill="`url(#ms-${uid})`" />
    <path
      d="M50 22 C31 22 17 34 17 49 C17 58 22 66 30 71 C30 76 27 81 24 84 C31 84 38 81 42 77 C45 77.6 47.5 78 50 78 C69 78 83 66 83 51 C83 35 69 22 50 22 Z"
      fill="#FFFFFF"
    />
  </svg>

  <!-- News -->
  <svg
    v-else-if="name === 'news'"
    viewBox="0 0 100 100"
    class="h-full w-full drop-shadow-sm"
  >
    <defs>
      <linearGradient :id="`nwl-${uid}`" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#FF6E7A" />
        <stop offset="1" stop-color="#FC4B57" />
      </linearGradient>
      <linearGradient :id="`nwd-${uid}`" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#FB3B4E" />
        <stop offset="1" stop-color="#E01B37" />
      </linearGradient>
      <linearGradient :id="`nwr-${uid}`" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#F6293F" />
        <stop offset="1" stop-color="#D40E2C" />
      </linearGradient>
      <filter :id="`nws-${uid}`" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow
          dx="0"
          dy="1.2"
          stdDeviation="1.6"
          flood-color="#8E0018"
          flood-opacity="0.35"
        />
      </filter>
    </defs>
    <rect width="100" height="100" rx="22" fill="#FFFFFF" />
    <rect x="23" y="23" width="15" height="54" :fill="`url(#nwl-${uid})`" />
    <rect x="62" y="23" width="15" height="54" :fill="`url(#nwr-${uid})`" />
    <path
      d="M23 23 H38 L77 77 H62 Z"
      :fill="`url(#nwd-${uid})`"
      :filter="`url(#nws-${uid})`"
    />
  </svg>

  <!-- Sports : terrain de foot, réplique de l'icône Apple Sports -->
  <svg
    v-else-if="name === 'sports'"
    viewBox="0 0 100 100"
    class="h-full w-full drop-shadow-sm"
  >
    <defs>
      <linearGradient :id="`spb-${uid}`" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#1E9E37" />
        <stop offset="1" stop-color="#0A691E" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="22.5" :fill="`url(#spb-${uid})`" />
    <g fill="none" stroke="#FFFFFF" stroke-width="3.6" stroke-linecap="round">
      <rect x="13" y="24.5" width="74" height="51" rx="10.5" />
      <path d="M50 24.5 V75.5" />
      <circle cx="50" cy="50" r="13.2" />
      <path
        d="M13 35.5 H21.5 A7.5 7.5 0 0 1 29 43 V57 A7.5 7.5 0 0 1 21.5 64.5 H13"
      />
      <path
        d="M87 35.5 H78.5 A7.5 7.5 0 0 0 71 43 V57 A7.5 7.5 0 0 0 78.5 64.5 H87"
      />
    </g>
    <circle cx="50" cy="50" r="3.4" fill="#FFFFFF" />
  </svg>

  <!-- Siri -->
  <svg
    v-else-if="name === 'siri'"
    viewBox="0 0 100 100"
    class="h-full w-full drop-shadow-sm"
  >
    <defs>
      <clipPath :id="`sio-${uid}`"><circle cx="50" cy="50" r="47" /></clipPath>
      <filter :id="`sif-${uid}`" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="10" />
      </filter>
      <radialGradient :id="`sis-${uid}`" cx="0.38" cy="0.25" r="0.6">
        <stop offset="0" stop-color="#FFFFFF" stop-opacity="0.95" />
        <stop offset="1" stop-color="#FFFFFF" stop-opacity="0" />
      </radialGradient>
    </defs>
    <circle cx="50" cy="50" r="47" fill="#EAF6FF" />
    <g :clip-path="`url(#sio-${uid})`" :filter="`url(#sif-${uid})`">
      <ellipse cx="22" cy="39" rx="31" ry="28" fill="#12D8F5" />
      <ellipse cx="73" cy="27" rx="31" ry="26" fill="#2E6DF6" />
      <ellipse cx="81" cy="67" rx="28" ry="26" fill="#8A44F2" />
      <ellipse cx="47" cy="87" rx="34" ry="23" fill="#E9538F" />
      <ellipse cx="16" cy="78" rx="23" ry="18" fill="#FF7A5C" />
      <ellipse cx="50" cy="53" rx="23" ry="20" fill="#7CE7F5" opacity="0.75" />
    </g>
    <circle cx="50" cy="50" r="47" :fill="`url(#sis-${uid})`" />
  </svg>

  <!-- Plans -->
  <svg
    v-else-if="name === 'maps'"
    viewBox="0 0 100 100"
    class="h-full w-full drop-shadow-sm"
  >
    <defs>
      <clipPath :id="`mp-${uid}`">
        <rect width="100" height="100" rx="22" />
      </clipPath>
    </defs>
    <g :clip-path="`url(#mp-${uid})`">
      <rect width="100" height="100" fill="#F3F1EA" />
      <path
        d="M-5 -5 H34 C30 20 34 40 26 62 C22 74 14 88 8 105 H-5 Z"
        fill="#AFDB88"
      />
      <path
        d="M-5 -5 H30 C27 16 30 36 23 56 C19 68 12 84 6 105 H-5 Z"
        fill="#9ED273"
        opacity="0.7"
      />
      <path
        d="M62 -5 C58 8 70 14 82 12 C92 10 98 14 105 12 V-5 Z"
        fill="#9AD2F2"
      />
      <path
        d="M34 22 H105 M38 44 H105 M30 66 H105 M26 84 H105"
        stroke="#E2DFD5"
        stroke-width="3"
      />
      <path d="M56 -5 V105 M78 8 V105" stroke="#E2DFD5" stroke-width="3" />
      <path
        d="M44 -6 C40 22 56 34 52 58 C49 76 38 88 40 106"
        stroke="#F7B500"
        stroke-width="11"
        fill="none"
      />
      <path
        d="M44 -6 C40 22 56 34 52 58 C49 76 38 88 40 106"
        stroke="#FFD54D"
        stroke-width="7.5"
        fill="none"
      />
      <path
        d="M-6 52 C18 46 40 58 66 52 C82 48 94 52 106 48"
        stroke="#FFFFFF"
        stroke-width="8"
        fill="none"
      />
      <path
        d="M-6 52 C18 46 40 58 66 52 C82 48 94 52 106 48"
        stroke="#D9D6CC"
        stroke-width="0.8"
        fill="none"
        stroke-dasharray="4 4"
      />
      <g transform="translate(70 70) rotate(40)">
        <path
          d="M0 -16 L11 12 L0 5 L-11 12 Z"
          fill="#2F7CF6"
          stroke="#FFFFFF"
          stroke-width="2.6"
          stroke-linejoin="round"
        />
      </g>
    </g>
  </svg>

  <!-- Réglages -->
  <svg
    v-else-if="name === 'settings'"
    viewBox="0 0 100 100"
    class="h-full w-full drop-shadow-sm"
  >
    <defs>
      <linearGradient :id="`st-${uid}`" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#83858C" />
        <stop offset="1" stop-color="#54565C" />
      </linearGradient>
      <linearGradient :id="`stg-${uid}`" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#FAFBFC" />
        <stop offset="0.55" stop-color="#D2D4D9" />
        <stop offset="1" stop-color="#A9ACB3" />
      </linearGradient>
      <linearGradient :id="`sth-${uid}`" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#43454B" />
        <stop offset="1" stop-color="#5C5E65" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="22" :fill="`url(#st-${uid})`" />
    <circle cx="50" cy="50" r="41.5" fill="#3E4046" opacity="0.35" />
    <path
      d="M42.88,20.34 L44.16,10.93 L55.84,10.93 L57.12,20.34 L63.61,22.70 L70.64,16.32 L79.58,23.83 L74.52,31.86 L77.97,37.84 L87.46,37.47 L89.49,48.97 L80.44,51.86 L79.24,58.66 L86.75,64.48 L80.91,74.59 L72.12,70.99 L66.83,75.43 L68.85,84.71 L57.88,88.71 L53.45,80.30 L46.55,80.30 L42.12,88.71 L31.15,84.71 L33.17,75.43 L27.88,70.99 L19.09,74.59 L13.25,64.48 L20.76,58.66 L19.56,51.86 L10.51,48.97 L12.54,37.47 L22.03,37.84 L25.48,31.86 L20.42,23.83 L29.36,16.32 L36.39,22.70 Z"
      :fill="`url(#stg-${uid})`"
      :stroke="`url(#stg-${uid})`"
      stroke-width="5"
      stroke-linejoin="round"
    />
    <circle cx="50" cy="50" r="26" :fill="`url(#stg-${uid})`" />
    <circle
      cx="50"
      cy="50"
      r="21.5"
      fill="none"
      stroke="#8F929A"
      stroke-width="1"
      opacity="0.6"
    />
    <circle cx="50" cy="50" r="12.5" :fill="`url(#sth-${uid})`" />
    <circle
      cx="50"
      cy="50"
      r="12.5"
      fill="none"
      stroke="#33353A"
      stroke-width="1"
      opacity="0.5"
    />
  </svg>

  <!-- Musique -->
  <svg
    v-else-if="name === 'music'"
    viewBox="0 0 100 100"
    class="h-full w-full drop-shadow-sm"
  >
    <defs>
      <linearGradient :id="`mu-${uid}`" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#FB5C74" />
        <stop offset="1" stop-color="#FA233B" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="22" :fill="`url(#mu-${uid})`" />
    <path
      d="M68 22 L40 28 q-3 .8 -3 4 v28.5 a10 10 0 1 0 4 8 V40 l24 -5.2 v17.7 a10 10 0 1 0 4 8 V26 q0 -4.8 -1 -4 z"
      fill="#FFFFFF"
    />
  </svg>

  <!-- Météo -->
  <svg
    v-else-if="name === 'weather'"
    viewBox="0 0 100 100"
    class="h-full w-full drop-shadow-sm"
  >
    <defs>
      <linearGradient :id="`wx-${uid}`" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#3F9BF4" />
        <stop offset="1" stop-color="#1263C9" />
      </linearGradient>
      <linearGradient :id="`wxs-${uid}`" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#FFE066" />
        <stop offset="1" stop-color="#FFB300" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="22" :fill="`url(#wx-${uid})`" />
    <circle cx="40" cy="40" r="16" :fill="`url(#wxs-${uid})`" />
    <path
      d="M34 72 a11 11 0 0 1 1.5-21.9 a14 14 0 0 1 27 -0.5 a10.5 10.5 0 0 1 3.5 20.8 q-1 .6 -3 .6 h-26 q-2 0 -3 0 z"
      fill="#FDFDFE"
    />
  </svg>

  <!-- Calculatrice -->
  <svg
    v-else-if="name === 'calculator'"
    viewBox="0 0 100 100"
    class="h-full w-full drop-shadow-sm"
  >
    <defs>
      <linearGradient :id="`cc-${uid}`" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#2E2E30" />
        <stop offset="1" stop-color="#151517" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="22" :fill="`url(#cc-${uid})`" />
    <rect x="24" y="20" width="52" height="16" rx="4" fill="#3A3A3D" />
    <g>
      <rect x="24" y="44" width="14" height="14" rx="4" fill="#5A5A5E" />
      <rect x="43" y="44" width="14" height="14" rx="4" fill="#5A5A5E" />
      <rect x="62" y="44" width="14" height="14" rx="4" fill="#FF9F0A" />
      <rect x="24" y="63" width="14" height="14" rx="4" fill="#5A5A5E" />
      <rect x="43" y="63" width="14" height="14" rx="4" fill="#5A5A5E" />
      <rect x="62" y="63" width="14" height="14" rx="4" fill="#FF9F0A" />
    </g>
  </svg>

  <!-- LinkedIn -->
  <svg
    v-else-if="name === 'linkedin'"
    viewBox="0 0 100 100"
    class="h-full w-full drop-shadow-sm"
  >
    <defs>
      <linearGradient :id="`li-${uid}`" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#1B84D6" />
        <stop offset="1" stop-color="#0A66C2" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="22" :fill="`url(#li-${uid})`" />
    <text
      x="50"
      y="68"
      text-anchor="middle"
      font-size="46"
      font-weight="700"
      fill="#fff"
      font-family="-apple-system, BlinkMacSystemFont, sans-serif"
    >
      in
    </text>
  </svg>

  <!-- App Store -->
  <svg
    v-else-if="name === 'appstore'"
    viewBox="0 0 100 100"
    class="h-full w-full drop-shadow-sm"
  >
    <defs>
      <linearGradient :id="`as-${uid}`" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#1D9BF6" />
        <stop offset="1" stop-color="#0D5FE3" />
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
  <svg
    v-else-if="name === 'calendar'"
    viewBox="0 0 100 100"
    class="h-full w-full drop-shadow-sm"
  >
    <defs>
      <clipPath :id="`cal-${uid}`">
        <rect width="100" height="100" rx="22" />
      </clipPath>
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
  <svg
    v-else-if="name === 'trash'"
    viewBox="0 0 100 100"
    class="h-full w-full drop-shadow-sm"
  >
    <defs>
      <linearGradient :id="`tr-${uid}`" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#EDEFF2" />
        <stop offset="1" stop-color="#C3C9D1" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="22" :fill="`url(#tr-${uid})`" />
    <rect
      x="43"
      y="22"
      width="14"
      height="7"
      rx="3.5"
      fill="none"
      stroke="#8B939F"
      stroke-width="3"
    />
    <rect x="28" y="30" width="44" height="6" rx="3" fill="#8B939F" />
    <path
      d="M32 40 L36 78 Q36.5 82 41 82 H59 Q63.5 82 64 78 L68 40 Z"
      fill="#A5ADB8"
    />
    <line
      x1="43"
      y1="46"
      x2="44.5"
      y2="74"
      stroke="#EDEFF2"
      stroke-width="2.5"
      stroke-linecap="round"
    />
    <line
      x1="50"
      y1="46"
      x2="50"
      y2="74"
      stroke="#EDEFF2"
      stroke-width="2.5"
      stroke-linecap="round"
    />
    <line
      x1="57"
      y1="46"
      x2="55.5"
      y2="74"
      stroke="#EDEFF2"
      stroke-width="2.5"
      stroke-linecap="round"
    />
  </svg>

  <!-- Dossier -->
  <svg
    v-else-if="name === 'folder'"
    viewBox="0 0 100 84"
    class="h-full w-full drop-shadow-md"
  >
    <defs>
      <linearGradient :id="`fo-${uid}`" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#4FB0F8" />
        <stop offset="1" stop-color="#1E7BE8" />
      </linearGradient>
      <linearGradient :id="`fp-${uid}`" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#77C4FA" />
        <stop offset="1" stop-color="#3D95F2" />
      </linearGradient>
    </defs>
    <path
      d="M4 20 Q4 12 12 12 H34 L42 20 H88 Q96 20 96 28 V66 Q96 74 88 74 H12 Q4 74 4 66 Z"
      :fill="`url(#fo-${uid})`"
    />
    <path
      d="M4 30 H96 V66 Q96 74 88 74 H12 Q4 74 4 66 Z"
      :fill="`url(#fp-${uid})`"
    />
  </svg>

  <!-- Launchpad : grille 3 × 3 de pastilles colorées sur fond blanc -->
  <svg
    v-else-if="name === 'launchpad'"
    viewBox="0 0 100 100"
    class="h-full w-full drop-shadow-sm"
  >
    <defs>
      <linearGradient :id="`lpbg-${uid}`" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#FFFFFF" />
        <stop offset="1" stop-color="#EFF0F2" />
      </linearGradient>
      <!-- Reflet unique, réappliqué sur chaque pastille -->
      <linearGradient :id="`lpgl-${uid}`" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#fff" stop-opacity="0.3" />
        <stop offset="0.55" stop-color="#fff" stop-opacity="0.04" />
        <stop offset="1" stop-color="#000" stop-opacity="0.05" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="23" :fill="`url(#lpbg-${uid})`" />
    <template v-for="(tile, i) in LAUNCHPAD_TILES" :key="i">
      <rect
        :x="13.5 + (i % 3) * 26.5"
        :y="13.5 + Math.floor(i / 3) * 26.5"
        width="20"
        height="20"
        rx="5.6"
        :fill="tile"
      />
      <rect
        :x="13.5 + (i % 3) * 26.5"
        :y="13.5 + Math.floor(i / 3) * 26.5"
        width="20"
        height="20"
        rx="5.6"
        :fill="`url(#lpgl-${uid})`"
      />
    </template>
  </svg>

  <!-- Fichier PDF -->
  <svg
    v-else-if="name === 'pdf'"
    viewBox="0 0 80 100"
    class="h-full w-full drop-shadow-md"
  >
    <path
      d="M8 8 Q8 2 14 2 H50 L72 24 V92 Q72 98 66 98 H14 Q8 98 8 92 Z"
      fill="#FDFDFE"
      stroke="#D5D7DC"
      stroke-width="1.5"
    />
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

// Pastilles du Launchpad, dans l'ordre de lecture
const LAUNCHPAD_TILES = [
  '#43CB58',
  '#FFC42E',
  '#FF9A22',
  '#EE3B37',
  '#C6CAD1',
  '#FF4B67',
  '#AE55EE',
  '#2C95FF',
  '#2FD1A5',
]
</script>
