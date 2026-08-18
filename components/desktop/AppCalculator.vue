<template>
  <Teleport to="body">
    <div
      v-if="desktop.state.value.apps.calculator"
      ref="winEl"
      class="app-cal fixed left-1/2 top-24 z-40 w-[232px] -translate-x-1/2 overflow-hidden rounded-xl shadow-[0_30px_70px_-15px_rgba(0,0,0,0.55)] ring-1 ring-white/10 lg:left-auto lg:right-[16%] lg:top-32 lg:translate-x-0"
      :style="{ zIndex: z }"
      @pointerdown="bringToFront"
    >
      <div class="bg-[#2a2a2c]">
        <!-- Barre de titre translucide (pastilles seules, comme la vraie app) -->
        <div class="cal-drag flex items-center gap-2 px-3 pb-1 pt-2.5">
          <button
            class="group flex h-3 w-3 items-center justify-center rounded-full border border-[#E0443E] bg-[#FF5F57]"
            aria-label="close"
            @click.stop="sfx.minimize(), desktop.closeApp('calculator')"
            @pointerdown.stop
          >
            <svg viewBox="0 0 12 12" class="h-full w-full p-[1px] opacity-0 group-hover:opacity-100">
              <path d="M3.6 3.6 L8.4 8.4 M8.4 3.6 L3.6 8.4" stroke="#820005" stroke-width="1.2" stroke-linecap="round" />
            </svg>
          </button>
          <span class="h-3 w-3 rounded-full border border-black/20 bg-[#4a4a4c]"></span>
          <span class="h-3 w-3 rounded-full border border-black/20 bg-[#4a4a4c]"></span>
        </div>

        <!-- Affichage -->
        <div
          class="cal-drag select-none truncate px-4 pb-2 pt-3 text-right text-[38px] font-light leading-none text-white"
        >
          {{ display }}
        </div>

        <!-- Clavier -->
        <div
          class="grid grid-cols-4 gap-px bg-[#2a2a2c] p-px pt-0"
          @click.capture="sfx.key()"
        >
          <button class="key key-fn" @click="clear">
            {{ display === '0' && !op ? 'AC' : 'C' }}
          </button>
          <button class="key key-fn" @click="negate">⁺∕₋</button>
          <button class="key key-fn" @click="percent">%</button>
          <button class="key key-op" :class="opActive('÷')" @click="setOp('÷')">÷</button>

          <button class="key" @click="digit('7')">7</button>
          <button class="key" @click="digit('8')">8</button>
          <button class="key" @click="digit('9')">9</button>
          <button class="key key-op" :class="opActive('×')" @click="setOp('×')">×</button>

          <button class="key" @click="digit('4')">4</button>
          <button class="key" @click="digit('5')">5</button>
          <button class="key" @click="digit('6')">6</button>
          <button class="key key-op" :class="opActive('−')" @click="setOp('−')">−</button>

          <button class="key" @click="digit('1')">1</button>
          <button class="key" @click="digit('2')">2</button>
          <button class="key" @click="digit('3')">3</button>
          <button class="key key-op" :class="opActive('+')" @click="setOp('+')">+</button>

          <button class="key col-span-2 !text-left !pl-6" @click="digit('0')">0</button>
          <button class="key" @click="digit(',')">,</button>
          <button class="key key-op" @click="equals">=</button>
        </div>
      </div>
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
  z.value = ++desktop.state.value.topZ + 40
}

// ── Logique ──
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

// ── Ouverture : animation + déplacement ──
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
.key {
  @apply bg-[#5A5A5E] py-3 text-center text-[17px] font-normal text-white transition-colors duration-100 hover:bg-[#6b6b70] active:bg-[#7d7d83];
}
.key-fn {
  @apply bg-[#3F3F42] hover:bg-[#4d4d51] active:bg-[#5b5b60];
}
.key-op {
  @apply bg-[#FF9F0A] text-[20px] hover:bg-[#ffb340] active:bg-[#ffc463];
}
</style>
