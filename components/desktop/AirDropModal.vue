<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300"
      enter-from-class="opacity-0"
      leave-active-class="transition duration-200"
      leave-to-class="opacity-0"
    >
      <div
        v-if="desktop.state.value.apps.airdrop"
        class="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 p-6 backdrop-blur-sm"
        @click.self="close"
      >
        <div
          class="w-full max-w-[340px] overflow-hidden rounded-2xl bg-[#f5f5f7]/95 text-center shadow-2xl ring-1 ring-black/10 backdrop-blur-2xl"
        >
          <!-- Radar -->
          <div class="relative mx-auto mt-8 h-32 w-32">
            <span
              v-for="n in 3"
              :key="n"
              class="airdrop-ring absolute inset-0 rounded-full border-2 border-[#0A84FF]/40"
              :style="{ animationDelay: `${(n - 1) * 0.7}s` }"
            ></span>
            <span
              class="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-b from-[#3b4048] to-[#17181b] shadow-lg"
            >
              <AgLogo class="h-9 w-10 text-white" />
            </span>
          </div>

          <div class="px-6 pb-6 pt-4">
            <template v-if="!accepted">
              <p class="text-[15px] font-semibold text-aink">
                {{ $t('macos.airdropFrom') }}
              </p>
              <p class="mt-1 text-[12.5px] leading-snug text-black/55">
                {{ $t('macos.airdropWants') }}
              </p>
              <div
                class="mx-auto mt-3 flex w-fit items-center gap-2 rounded-lg bg-white px-3 py-2 shadow-sm ring-1 ring-black/5"
              >
                <span class="text-[20px]">📄</span>
                <span class="text-left">
                  <span class="block text-[12px] font-semibold text-aink"
                    >antoinegourgue-cv.pdf</span
                  >
                  <span class="block text-[10.5px] text-black/40"
                    >PDF · 1 {{ $t('macos.airdropFile') }}</span
                  >
                </span>
              </div>
              <div class="mt-5 flex gap-2.5">
                <button
                  class="flex-1 rounded-lg bg-black/5 py-2 text-[13.5px] font-semibold text-aink transition hover:bg-black/10"
                  @click="close"
                >
                  {{ $t('macos.airdropDecline') }}
                </button>
                <button
                  class="flex-1 rounded-lg bg-[#0A84FF] py-2 text-[13.5px] font-semibold text-white transition hover:bg-[#0071e3]"
                  @click="accept"
                >
                  {{ $t('macos.airdropAccept') }}
                </button>
              </div>
            </template>
            <template v-else>
              <p class="text-[15px] font-semibold text-aink">
                ✅ {{ $t('macos.airdropDone') }}
              </p>
              <p class="mt-1 text-[12.5px] text-black/55">
                {{ $t('macos.airdropDoneHint') }}
              </p>
              <button
                class="mt-4 w-full rounded-lg bg-black/5 py-2 text-[13.5px] font-semibold text-aink transition hover:bg-black/10"
                @click="close"
              >
                {{ $t('macos.close') }}
              </button>
            </template>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import AgLogo from '~/components/ui/AGLogo.vue'

const desktop = useDesktop()
const sfx = useSfx()

const accepted = ref(false)

const close = () => {
  desktop.closeApp('airdrop')
  setTimeout(() => (accepted.value = false), 300)
}

const accept = () => {
  sfx.send()
  accepted.value = true
  const a = document.createElement('a')
  a.href = '/assets/antoinegourgue-cv.pdf'
  a.download = ''
  a.click()
}

watch(
  () => desktop.state.value.apps.airdrop,
  (open) => {
    if (open) sfx.pop()
  }
)
</script>

<style scoped>
.airdrop-ring {
  animation: airdrop-pulse 2.1s ease-out infinite;
}
@keyframes airdrop-pulse {
  0% {
    transform: scale(0.55);
    opacity: 1;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}
</style>
