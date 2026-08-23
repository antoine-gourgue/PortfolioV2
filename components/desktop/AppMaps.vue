<template>
  <Teleport to="body">
    <div
      v-if="desktop.state.value.apps.maps"
      ref="winEl"
      data-window="maps"
      class="fixed inset-0 z-40 overflow-hidden lg:inset-auto lg:left-[22%] lg:top-32 lg:w-[620px] lg:rounded-xl lg:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.45)] lg:ring-1 lg:ring-black/10"
      :style="{ zIndex: z }"
      @pointerdown="bringToFront"
    >
      <div class="flex h-full flex-col bg-[#f5f5f7] lg:h-[420px]">
        <!-- Barre de titre -->
        <div
          class="maps-drag relative hidden items-center gap-2 border-b border-black/10 bg-[#F5F5F7]/90 backdrop-blur lg:flex lg:px-3 lg:py-2.5"
        >
          <button
            class="group hidden h-3 w-3 items-center justify-center rounded-full border border-[#E0443E] bg-[#FF5F57] lg:flex"
            aria-label="close"
            @click.stop="(sfx.minimize(), desktop.closeApp('maps'))"
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
            @click.stop="(sfx.minimize(), desktop.minimizeApp('maps'))"
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
          <span class="text-[13px] font-semibold text-aink">
            {{ $t('macos.mapsTitle') }}
          </span>
        </div>

        <div class="relative min-h-0 flex-1">
          <!-- Carte plein cadre -->
          <div ref="mapEl" class="absolute inset-0"></div>

          <!-- Panneau flottant façon Apple Maps -->
          <aside
            class="absolute inset-x-0 bottom-0 z-[500] rounded-t-2xl bg-white/85 px-3 pb-[calc(26px+env(safe-area-inset-bottom,0px))] pt-2 shadow-[0_-10px_30px_-8px_rgba(0,0,0,0.35)] ring-1 ring-black/10 backdrop-blur-xl lg:inset-x-auto lg:bottom-auto lg:left-3 lg:top-3 lg:w-[230px] lg:rounded-xl lg:p-2 lg:shadow-[0_10px_30px_-8px_rgba(0,0,0,0.35)]"
          >
            <!-- Poignée de la feuille, comme sur une sheet iOS -->
            <span
              class="mx-auto mb-2 block h-[5px] w-9 rounded-full bg-black/20 lg:hidden"
            ></span>
            <p
              class="px-2 pb-1.5 pt-1 text-[11px] font-semibold uppercase tracking-wider text-black/40"
            >
              {{ $t('macos.mapsMyPlaces') }}
            </p>
            <div
              class="flex max-h-[34vh] flex-col gap-0.5 overflow-y-auto lg:max-h-none lg:overflow-visible"
            >
              <button
                v-for="place in places"
                :key="place.id"
                class="flex items-center gap-2.5 rounded-lg px-2 py-2 text-left transition lg:py-1.5"
                :class="
                  selected === place.id
                    ? 'bg-[#0A84FF] text-white'
                    : 'hover:bg-black/5'
                "
                @click="flyTo(place)"
              >
                <span
                  class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white"
                  :style="{ background: place.color }"
                >
                  <i
                    aria-hidden="true"
                    class="f7-icons"
                    style="font-size: 13px"
                    >{{ place.icon }}</i
                  >
                </span>
                <span class="min-w-0">
                  <span
                    class="block truncate text-[12px] font-semibold"
                    :class="selected === place.id ? 'text-white' : 'text-aink'"
                  >
                    {{ $t(place.nameKey) }}
                  </span>
                  <span
                    class="block truncate text-[10.5px]"
                    :class="
                      selected === place.id ? 'text-white/75' : 'text-black/45'
                    "
                  >
                    {{ place.address }}
                  </span>
                </span>
              </button>
            </div>
            <div
              class="mt-1.5 hidden items-center gap-1.5 rounded-lg bg-emerald-500/10 px-2.5 py-1.5 lg:flex"
            >
              <i
                aria-hidden="true"
                class="f7-icons text-emerald-700"
                style="font-size: 13px"
                >car_fill</i
              >
              <span
                class="text-[10.5px] font-semibold leading-tight text-emerald-700"
              >
                {{ $t('macos.mapsMobility') }}
              </span>
            </div>
          </aside>
        </div>
      </div>
      <!-- Balayer vers le haut pour revenir à l'écran d'accueil -->
      <DesktopIosHomeBar app="maps" @close="desktop.closeApp('maps')" />
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import type { Map as LeafletMap } from 'leaflet'

const desktop = useDesktop()
const sfx = useSfx()
const { gsap, Draggable } = useGsap()

const winEl = ref<HTMLElement | null>(null)
const mapEl = ref<HTMLElement | null>(null)
const z = ref(40)
const bringToFront = () => {
  z.value = desktop.focusApp('maps')
}

interface Place {
  id: string
  nameKey: string
  address: string
  icon: string
  color: string
  lat: number
  lon: number
  zoom: number
}

const places: Place[] = [
  {
    id: 'home',
    nameKey: 'macos.mapsHome',
    address: 'Anglet, Pays basque',
    icon: 'house_fill',
    color: '#0A84FF',
    lat: 43.4832,
    lon: -1.5146,
    zoom: 12,
  },
  {
    id: 'digitaleo',
    nameKey: 'macos.mapsDigitaleo',
    address: 'Rue Pierre Herbart, Rennes',
    icon: 'briefcase_fill',
    color: '#5E5CE6',
    lat: 48.0985,
    lon: -1.6989,
    zoom: 14,
  },
  {
    id: 'epitech',
    nameKey: 'macos.mapsEpitech',
    address: '12 rue Jean-Louis Bertrand, Rennes',
    icon: 'book_fill',
    color: '#FF9F0A',
    lat: 48.125,
    lon: -1.6974,
    zoom: 14,
  },
]

const selected = ref('home')

let map: LeafletMap | null = null
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let L: any = null

const initMap = async () => {
  if (map || !mapEl.value) return
  L = (await import('leaflet')).default
  // @ts-expect-error import CSS sans types
  await import('leaflet/dist/leaflet.css')

  map = L.map(mapEl.value, { zoomControl: false, attributionControl: true })
  map!.attributionControl.setPrefix(false)
  // En haut à droite comme dans Plans : en bas, les contrôles passaient
  // derrière la feuille des lieux sur mobile
  L.control.zoom({ position: 'topright' }).addTo(map)
  L.tileLayer(
    'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    {
      attribution: '© OpenStreetMap · © CARTO',
      maxZoom: 19,
    }
  ).addTo(map)

  for (const place of places) {
    const icon = L.divIcon({
      className: '',
      html: `<div class="map-pin" style="background:${place.color}"><i aria-hidden="true" class="f7-icons">${place.icon}</i></div>`,
      iconSize: [34, 42],
      iconAnchor: [17, 40],
    })
    L.marker([place.lat, place.lon], { icon })
      .addTo(map)
      .on('click', () => flyTo(place))
  }

  const home = places[0]
  map!.setView([home.lat, home.lon], home.zoom)
}

const flyTo = (place: Place) => {
  selected.value = place.id
  map?.flyTo([place.lat, place.lon], place.zoom, { duration: 1.1 })
}

// ── Ouverture : animation + carte + déplacement ──
let drags: ReturnType<typeof Draggable.create> = []
watch(
  () => desktop.state.value.apps.maps,
  (open) => {
    if (!open) {
      drags.forEach((d) => d.kill())
      drags = []
      // Le v-if détruit le conteneur : on détruit aussi l'instance Leaflet,
      // sinon la réouverture retrouve une carte liée à un élément mort (écran blanc)
      map?.remove()
      map = null
      return
    }
    sfx.pop()
    nextTick(async () => {
      if (!winEl.value) return
      bringToFront()
      gsap.from(winEl.value, {
        scale: 0.85,
        autoAlpha: 0,
        y: 20,
        duration: 0.35,
        ease: 'back.out(1.4)',
      })
      await initMap()
      setTimeout(() => map?.invalidateSize(), 380)
      if (window.matchMedia('(min-width: 1024px)').matches) {
        drags = Draggable.create(winEl.value, {
          trigger: winEl.value.querySelectorAll('.maps-drag'),
          cursor: 'grab',
          activeCursor: 'grabbing',
        })
      }
    })
  }
)

onUnmounted(() => {
  map?.remove()
  map = null
})
</script>

<style>
/* Mobile : les contrôles passent sous la barre d'état, qui recouvre la carte */
.leaflet-top {
  top: 2rem !important;
}
@media (min-width: 1024px) {
  .leaflet-top {
    top: 0 !important;
  }
}

/* Attribution licence OSM/CARTO : obligatoire mais discrète */
.leaflet-control-attribution {
  font-size: 8.5px !important;
  background: rgba(255, 255, 255, 0.6) !important;
  color: rgba(0, 0, 0, 0.45) !important;
  padding: 1px 5px !important;
  border-radius: 6px 0 0 0;
}
.leaflet-control-attribution a {
  color: rgba(0, 0, 0, 0.45) !important;
}

/* Épingle façon Plans (globale : injectée par Leaflet hors du composant) */
.map-pin {
  width: 34px;
  height: 34px;
  border-radius: 50% 50% 50% 0;
  transform: rotate(-45deg);
  border: 2.5px solid #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
}
.map-pin i {
  transform: rotate(45deg);
  font-size: 15px;
  color: #fff;
}
</style>
