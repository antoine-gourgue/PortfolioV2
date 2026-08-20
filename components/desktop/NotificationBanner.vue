<template>
  <Teleport to="body">
    <Transition name="notif">
      <button
        v-if="current"
        :key="current.id"
        class="fixed left-1/2 top-11 z-[420] w-[calc(100%-24px)] max-w-[360px] -translate-x-1/2 text-left lg:left-auto lg:right-3 lg:translate-x-0"
        @click="dismiss"
      >
        <div
          class="flex items-center gap-3 rounded-2xl border border-white/40 bg-white/75 p-3 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.35)] ring-1 ring-black/5 backdrop-blur-2xl"
        >
          <span class="block h-9 w-9 shrink-0">
            <DesktopMacAppIcon :name="current.icon" />
          </span>
          <span class="min-w-0 flex-1">
            <span class="flex items-baseline justify-between gap-2">
              <span class="truncate text-[13px] font-semibold text-aink">{{
                current.title
              }}</span>
              <span class="shrink-0 text-[11px] text-black/40">{{
                $t('macos.notifNow')
              }}</span>
            </span>
            <span
              class="block text-[13px] leading-snug text-aink/75"
              style="
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
              "
              >{{ current.message }}</span
            >
          </span>
        </div>
      </button>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const { current, dismiss } = useNotify()
</script>

<style scoped>
/* Mobile : descend du haut (iOS) — Desktop : glisse depuis la droite (macOS) */
.notif-enter-active,
.notif-leave-active {
  transition:
    transform 0.45s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.35s ease;
}
.notif-enter-from,
.notif-leave-to {
  opacity: 0;
  transform: translate(-50%, -120%);
}
@media (min-width: 1024px) {
  .notif-enter-from,
  .notif-leave-to {
    transform: translate(120%, 0);
  }
}
</style>
