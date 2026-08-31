<template>
  <Teleport to="body">
    <div
      v-if="desktop.state.value.apps.calculator"
      ref="winEl"
      data-window="calculator"
      class="app-cal fixed inset-0 z-40 overflow-hidden lg:inset-auto lg:right-[16%] lg:top-32 lg:w-[232px] lg:rounded-xl lg:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.55)] lg:ring-1 lg:ring-white/10"
      :style="{ zIndex: z }"
      @pointerdown="bringToFront"
    >
      <div class="flex h-full flex-col bg-black lg:h-auto lg:bg-[#2a2a2c]">
        <div
          class="cal-drag flex items-center gap-2 px-4 pb-1 pt-10 lg:px-3 lg:pt-2.5"
        >
          <button
            class="group hidden h-3 w-3 items-center justify-center rounded-full border border-[#E0443E] bg-[#FF5F57] lg:flex"
            aria-label="close"
            @click.stop="(sfx.minimize(), desktop.closeApp('calculator'))"
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
            @click.stop="(sfx.minimize(), desktop.minimizeApp('calculator'))"
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
            class="hidden h-3 w-3 rounded-full border border-black/20 bg-[#4a4a4c] lg:block"
          ></span>
        </div>

        <div
          class="cal-drag flex flex-1 select-none items-end justify-end truncate px-6 pb-3 pt-3 text-[76px] font-light leading-none text-white lg:flex-none lg:px-4 lg:pb-2 lg:text-[38px]"
        >
          {{ display }}
        </div>

        <div
          class="grid grid-cols-4 gap-3 p-4 pb-8 lg:gap-px lg:bg-[#2a2a2c] lg:p-px lg:pt-0"
          @click.capture="sfx.key()"
        >
          <button class="key key-fn" @click="clear">
            {{ display === '0' && !op ? 'AC' : 'C' }}
          </button>
          <button class="key key-fn" @click="negate">⁺∕₋</button>
          <button class="key key-fn" @click="percent">%</button>
          <button class="key key-op" :class="opActive('÷')" @click="setOp('÷')">
            ÷
          </button>

          <button class="key" @click="digit('7')">7</button>
          <button class="key" @click="digit('8')">8</button>
          <button class="key" @click="digit('9')">9</button>
          <button class="key key-op" :class="opActive('×')" @click="setOp('×')">
            ×
          </button>

          <button class="key" @click="digit('4')">4</button>
          <button class="key" @click="digit('5')">5</button>
          <button class="key" @click="digit('6')">6</button>
          <button class="key key-op" :class="opActive('−')" @click="setOp('−')">
            −
          </button>

          <button class="key" @click="digit('1')">1</button>
          <button class="key" @click="digit('2')">2</button>
          <button class="key" @click="digit('3')">3</button>
          <button class="key key-op" :class="opActive('+')" @click="setOp('+')">
            +
          </button>

          <button
            class="key key-zero col-span-2 !text-left !pl-8 lg:!pl-6"
            @click="digit('0')"
          >
            0
          </button>
          <button class="key" @click="digit(',')">,</button>
          <button class="key key-op" @click="equals">=</button>
        </div>
      </div>
      <!-- Swipe up to return to the home screen -->
      <DesktopIosHomeBar
        app="calculator"
        dark
        @close="desktop.closeApp('calculator')"
      />
    </div>
  </Teleport>
</template>

<script setup lang="ts">
const desktop = useDesktop()
const { gsap, Draggable } = useGsap()
const sfx = useSfx()

const winEl = ref<HTMLElement | null>(null)
const z = ref(40)
const bringToFront = () => {
  z.value = desktop.focusApp('calculator')
}

const display = ref('0')
const prev = ref<number | null>(null)
const op = ref<string | null>(null)
const fresh = ref(true)

const toNumber = (s: string) => parseFloat(s.replace(',', '.'))
const format = (n: number) => {
  if (!isFinite(n)) return 'Erreur'
  const r = Math.round(n * 1e10) / 1e10
  return String(r).replace('.', ',')
}

const digit = (d: string) => {
  if (display.value === 'Erreur') clear()
  if (fresh.value) {
    display.value = d === ',' ? '0,' : d
    fresh.value = false
    return
  }
  if (d === ',' && display.value.includes(',')) return
  if (display.value === '0' && d !== ',') display.value = d
  else if (display.value.length < 12) display.value += d
}

const applyOp = (a: number, b: number, o: string) =>
  o === '+' ? a + b : o === '−' ? a - b : o === '×' ? a * b : a / b

const setOp = (o: string) => {
  if (op.value && prev.value !== null && !fresh.value) {
    const r = applyOp(prev.value, toNumber(display.value), op.value)
    display.value = format(r)
    prev.value = isFinite(r) ? r : null
  } else {
    prev.value = toNumber(display.value)
  }
  op.value = o
  fresh.value = true
}

const equals = () => {
  if (op.value === null || prev.value === null) return
  const cur = fresh.value ? prev.value : toNumber(display.value)
  display.value = format(applyOp(prev.value, cur, op.value))
  prev.value = null
  op.value = null
  fresh.value = true
}

const clear = () => {
  display.value = '0'
  prev.value = null
  op.value = null
  fresh.value = true
}

const negate = () => {
  if (display.value === 'Erreur') return
  display.value = format(-toNumber(display.value))
  fresh.value = false
}

const percent = () => {
  if (display.value === 'Erreur') return
  display.value = format(toNumber(display.value) / 100)
  fresh.value = false
}

const opActive = (o: string) =>
  op.value === o && fresh.value ? 'bg-white !text-[#FF9F0A]' : ''

let drags: ReturnType<typeof Draggable.create> = []
watch(
  () => desktop.state.value.apps.calculator,
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
          trigger: winEl.value.querySelectorAll('.cal-drag'),
          cursor: 'grab',
          activeCursor: 'grabbing',
        })
      }
    })
  }
)
</script>

<style scoped>
/* Mobile-first: round iOS keys; desktop (lg:): macOS tiles */
.key {
  @apply aspect-square rounded-full bg-[#333336] text-center text-[30px] font-normal text-white transition-colors duration-100 active:bg-[#7d7d83] lg:aspect-auto lg:rounded-none lg:bg-[#5A5A5E] lg:py-3 lg:text-[17px] lg:hover:bg-[#6b6b70];
}
.key-zero {
  @apply aspect-auto rounded-full lg:rounded-none;
}
.key-fn {
  @apply bg-[#A5A5A5] text-black active:bg-[#d4d4d2] lg:bg-[#3F3F42] lg:text-white lg:hover:bg-[#4d4d51] lg:active:bg-[#5b5b60];
}
.key-op {
  @apply bg-[#FF9F0A] text-[34px] text-white active:bg-[#ffc463] lg:text-[20px] lg:hover:bg-[#ffb340];
}
</style>
