<template>
  <Teleport to="body">
    <div
      v-if="desktop.state.value.apps.trash"
      ref="winEl"
      class="fixed inset-0 z-40 overflow-hidden lg:inset-auto lg:left-[26%] lg:top-40 lg:w-[520px] lg:rounded-xl lg:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.45)] lg:ring-1 lg:ring-black/10"
      :style="{ zIndex: z }"
      @pointerdown="bringToFront"
    >
      <div class="flex h-full flex-col bg-white lg:h-[380px]">
        <!-- Barre de titre -->
        <div
          class="trash-drag flex items-center gap-2 border-b border-black/10 bg-[#F5F5F7]/90 px-4 pb-2 pt-12 backdrop-blur lg:px-3 lg:py-2.5"
        >
          <button
            class="group hidden h-3 w-3 items-center justify-center rounded-full border border-[#E0443E] bg-[#FF5F57] lg:flex"
            aria-label="close"
            @click.stop="(sfx.minimize(), desktop.closeApp('trash'))"
            @pointerdown.stop
          >
            <svg
              viewBox="0 0 12 12"
              class="h-full w-full p-[1px] opacity-0 group-hover:opacity-100"
            >
              <path
                d="M3.6 3.6 L8.4 8.4 M8.4 3.6 L3.6 8.4"
                stroke="#820005"
                stroke-width="1.2"
                stroke-linecap="round"
              />
            </svg>
          </button>
          <button
            class="group hidden h-3 w-3 items-center justify-center rounded-full border border-[#D89E24] bg-[#FEBC2E] lg:flex"
            aria-label="minimize"
            @click.stop="(sfx.minimize(), desktop.minimizeApp('trash'))"
            @pointerdown.stop
          >
            <svg
              viewBox="0 0 12 12"
              class="h-full w-full p-[1px] opacity-0 group-hover:opacity-100"
            >
              <path
                d="M2.6 6 L9.4 6"
                stroke="#985712"
                stroke-width="1.4"
                stroke-linecap="round"
              />
            </svg>
          </button>
          <span
            class="hidden h-3 w-3 rounded-full border border-black/10 bg-[#DDDDDF] lg:block"
          ></span>
          <button
            class="flex items-center gap-0.5 text-[15px] font-medium text-[#0A84FF] lg:hidden"
            @click="desktop.closeApp('trash')"
          >
            <span class="text-xl leading-none">‹</span>
            {{ $t('macos.close') }}
          </button>
          <span
            class="absolute left-1/2 -translate-x-1/2 text-[13px] font-semibold text-aink"
          >
            {{ $t('macos.trash') }}
          </span>
          <button
            v-if="!emptied"
            class="ml-auto rounded-md border border-black/10 bg-white px-2.5 py-1 text-[11.5px] font-medium text-aink shadow-sm transition hover:bg-black/5"
            @click="emptyTrash"
          >
            {{ $t('macos.trashEmptyBtn') }}
          </button>
        </div>

        <!-- Contenu -->
        <div class="flex-1 overflow-y-auto p-4">
          <!-- Corbeille vide -->
          <div
            v-if="emptied"
            class="flex h-full flex-col items-center justify-center gap-2 text-center"
          >
            <span class="block h-16 w-16 opacity-60">
              <DesktopMacAppIcon name="trash" />
            </span>
            <p class="text-[14px] font-semibold text-aink">
              {{ $t('macos.trashEmptyState') }}
            </p>
            <p class="max-w-[280px] text-[12px] text-black/45">
              {{ $t('macos.trashEmptyHint') }}
            </p>
          </div>

          <!-- Fichiers rejetés -->
          <div v-else class="grid grid-cols-3 gap-x-2 gap-y-4 sm:grid-cols-4">
            <button
              v-for="item in items"
              :key="item.name"
              class="trash-file group flex flex-col items-center gap-1 rounded-lg p-2 text-center transition"
              :class="
                selected === item.name
                  ? 'bg-[#0A84FF]/10'
                  : 'hover:bg-black/[0.04]'
              "
              @click="selected = item.name"
            >
              <span
                class="flex h-11 w-11 items-center justify-center text-[34px] text-[#8E8E93]"
              >
                <i
                  aria-hidden="true"
                  class="f7-icons"
                  style="font-size: 34px"
                  >{{ item.icon }}</i
                >
              </span>
              <span
                class="w-full break-words rounded px-1 text-[11px] font-medium leading-tight text-aink"
                :class="selected === item.name ? 'bg-[#0A84FF] text-white' : ''"
              >
                {{ item.name }}
              </span>
              <span class="text-[10px] text-black/40">{{ item.size }}</span>
            </button>
          </div>
        </div>

        <!-- Barre d'état : motif du rejet -->
        <div
          class="border-t border-black/10 bg-[#F5F5F7] px-4 py-2 text-center text-[11.5px] text-black/55"
        >
          <template v-if="emptied">
            {{ $t('macos.trashStatusEmpty') }}
          </template>
          <template v-else-if="selectedItem">
            💬 {{ $t(selectedItem.reasonKey) }}
          </template>
          <template v-else>
            {{ items.length }} {{ $t('macos.trashStatusItems') }}
          </template>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
const desktop = useDesktop()
const sfx = useSfx()
const { gsap, Draggable } = useGsap()

const winEl = ref<HTMLElement | null>(null)
const z = ref(40)
const bringToFront = () => {
  z.value = ++desktop.state.value.topZ + 40
}

// Les vrais rejets de la conception de ce portfolio 🪦
const items = [
  {
    name: 'drapeaux-emoji.zip',
    icon: 'archivebox_fill',
    size: '4 Ko',
    reasonKey: 'macos.trashR1',
  },
  {
    name: 'icones-meteo-dessinees.sketch',
    icon: 'paintbrush_fill',
    size: '87 Ko',
    reasonKey: 'macos.trashR2',
  },
  {
    name: 'design-blog-v1.fig',
    icon: 'doc_fill',
    size: '1,2 Mo',
    reasonKey: 'macos.trashR3',
  },
  {
    name: 'mockups-iframe.html',
    icon: 'chevron_left_slash_chevron_right',
    size: '9 Ko',
    reasonKey: 'macos.trashR4',
  },
  {
    name: 'son-fermeture-whoosh.aiff',
    icon: 'waveform',
    size: '212 Ko',
    reasonKey: 'macos.trashR5',
  },
  {
    name: 'curseur-custom-projets.css',
    icon: 'doc_text_fill',
    size: '2 Ko',
    reasonKey: 'macos.trashR6',
  },
  {
    name: 'resize-fenetres.ts',
    icon: 'doc_text_fill',
    size: '6 Ko',
    reasonKey: 'macos.trashR7',
  },
]

const selected = ref('')
const emptied = ref(false)
const selectedItem = computed(() =>
  items.find((i) => i.name === selected.value)
)

const emptyTrash = () => {
  sfx.trash()
  selected.value = ''
  // Les fichiers s'envolent avant de disparaître
  gsap.to('.trash-file', {
    scale: 0.3,
    autoAlpha: 0,
    y: -14,
    duration: 0.32,
    stagger: 0.04,
    ease: 'power2.in',
    onComplete: () => {
      emptied.value = true
    },
  })
}

// ── Ouverture : animation + déplacement ──
let drags: ReturnType<typeof Draggable.create> = []
watch(
  () => desktop.state.value.apps.trash,
  (open) => {
    if (!open) {
      drags.forEach((d) => d.kill())
      drags = []
      return
    }
    sfx.pop()
    nextTick(() => {
      if (!winEl.value) return
      bringToFront()
      gsap.from(winEl.value, {
        scale: 0.85,
        autoAlpha: 0,
        y: 20,
        duration: 0.35,
        ease: 'back.out(1.4)',
      })
      if (window.matchMedia('(min-width: 1024px)').matches) {
        drags = Draggable.create(winEl.value, {
          trigger: winEl.value.querySelectorAll('.trash-drag'),
          cursor: 'grab',
          activeCursor: 'grabbing',
        })
      }
    })
  }
)
</script>
