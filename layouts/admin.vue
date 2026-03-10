<template>
  <div class="admin-shell min-h-screen bg-slate-100 text-slate-900">
    <div class="flex min-h-screen">
      <aside
        class="hidden w-72 shrink-0 px-4 py-4 lg:block xl:w-80 xl:px-5 xl:py-5"
      >
        <div class="flex h-full flex-col rounded-3xl bg-white/95 p-5 shadow-sm">
          <NuxtLink
            :to="localePath('/admin')"
            class="flex items-center gap-3 px-3 py-3"
          >
            <div
              class="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-sm font-semibold text-white"
            >
              AG
            </div>
            <div>
              <p class="text-sm font-semibold text-slate-900">Administration</p>
              <p class="text-xs text-slate-500">Gestion des articles</p>
            </div>
          </NuxtLink>

          <nav class="mt-8 space-y-3">
            <NuxtLink
              :to="localePath('/admin')"
              :class="sidebarLinkClass(isDashboard)"
            >
              <i class="fas fa-gauge-high w-4 text-center"></i>
              <span :class="linkLabelClass(isDashboard)">Tableau de bord</span>
            </NuxtLink>

            <section class="p-1">
              <div
                class="mb-2 flex items-center gap-2 px-2 text-xs uppercase tracking-wide text-slate-500"
              >
                <i class="fas fa-newspaper w-4 text-center"></i>
                <span>Articles</span>
              </div>
              <div class="space-y-1 pl-2">
                <NuxtLink
                  :to="localePath('/admin/articles')"
                  :class="sidebarSubLinkClass(isArticlesIndex)"
                >
                  <span :class="linkLabelClass(isArticlesIndex)"
                    >Liste des articles</span
                  >
                </NuxtLink>
                <NuxtLink
                  :to="localePath('/admin/articles/new')"
                  :class="sidebarSubLinkClass(isCreate)"
                >
                  <span :class="linkLabelClass(isCreate)"
                    >Creer un article</span
                  >
                </NuxtLink>
              </div>
            </section>
          </nav>

          <button
            class="group mt-auto flex w-full items-center gap-2 px-3 py-2.5 text-sm text-slate-600 transition-colors hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
            :disabled="isLoggingOut"
            @click="logout"
          >
            <i class="fas fa-right-from-bracket w-4 text-center"></i>
            <span :class="linkLabelClass(false)">{{
              isLoggingOut ? 'Deconnexion...' : 'Deconnexion'
            }}</span>
          </button>
        </div>
      </aside>

      <div class="flex min-w-0 flex-1 flex-col p-3 lg:p-4 xl:p-5">
        <header class="rounded-2xl bg-white px-4 py-3 shadow-sm lg:hidden">
          <div class="flex items-center justify-between">
            <NuxtLink
              :to="localePath('/admin')"
              class="text-sm font-semibold text-slate-900"
            >
              Administration
            </NuxtLink>
            <button
              class="rounded-lg bg-slate-100 px-3 py-1.5 text-sm text-slate-700"
              @click="mobileMenu = !mobileMenu"
            >
              <i class="fas fa-bars"></i>
            </button>
          </div>

          <nav v-if="mobileMenu" class="mt-3 space-y-1.5">
            <NuxtLink
              :to="localePath('/admin')"
              :class="sidebarLinkClass(isDashboard)"
              @click="mobileMenu = false"
            >
              <i class="fas fa-gauge-high w-4 text-center"></i>
              <span :class="linkLabelClass(isDashboard)">Tableau de bord</span>
            </NuxtLink>
            <section class="p-1">
              <div
                class="mb-1.5 flex items-center gap-2 px-2 text-xs uppercase tracking-wide text-slate-500"
              >
                <i class="fas fa-newspaper w-4 text-center"></i>
                <span>Articles</span>
              </div>
              <div class="space-y-1 pl-2">
                <NuxtLink
                  :to="localePath('/admin/articles')"
                  :class="sidebarSubLinkClass(isArticlesIndex)"
                  @click="mobileMenu = false"
                >
                  <span :class="linkLabelClass(isArticlesIndex)"
                    >Liste des articles</span
                  >
                </NuxtLink>
                <NuxtLink
                  :to="localePath('/admin/articles/new')"
                  :class="sidebarSubLinkClass(isCreate)"
                  @click="mobileMenu = false"
                >
                  <span :class="linkLabelClass(isCreate)"
                    >Creer un article</span
                  >
                </NuxtLink>
              </div>
            </section>
            <button
              class="group mt-2 flex w-full items-center gap-2 px-3 py-2 text-sm text-slate-600 transition-colors hover:text-slate-900"
              :disabled="isLoggingOut"
              @click="logout"
            >
              <i class="fas fa-right-from-bracket w-4 text-center"></i>
              <span :class="linkLabelClass(false)">{{
                isLoggingOut ? 'Deconnexion...' : 'Deconnexion'
              }}</span>
            </button>
          </nav>
        </header>

        <main class="mt-3 flex-1 lg:mt-0">
          <div class="h-full rounded-3xl bg-white p-5 shadow-sm md:p-6">
            <slot />
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const localePath = useLocalePath()

const mobileMenu = ref(false)
const isLoggingOut = ref(false)

const normalizePath = (path: string) =>
  path.replace(/^\/(fr|en|es)(?=\/|$)/, '') || '/'

const currentPath = computed(() => normalizePath(route.path))
const isDashboard = computed(() => currentPath.value === '/admin')
const isArticlesIndex = computed(() => currentPath.value === '/admin/articles')
const isCreate = computed(() => currentPath.value === '/admin/articles/new')

const sidebarLinkClass = (active: boolean) => [
  'group flex items-center gap-2 px-3 py-2 text-sm transition-colors',
  active ? 'font-medium text-slate-900' : 'text-slate-600 hover:text-slate-900',
]

const sidebarSubLinkClass = (active: boolean) => [
  'group flex items-center px-3 py-2 text-sm transition-colors',
  active ? 'font-medium text-slate-900' : 'text-slate-600 hover:text-slate-900',
]

const linkLabelClass = (active: boolean) => [
  "relative inline-block pb-0.5 after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-slate-900 after:transition-transform after:duration-200 group-hover:after:scale-x-100",
  active ? 'after:scale-x-100' : '',
]

const logout = async () => {
  isLoggingOut.value = true
  try {
    await $fetch('/api/articles/admin-logout', { method: 'POST' })
  } finally {
    isLoggingOut.value = false
    await navigateTo(localePath('/admin/login'))
  }
}
</script>
