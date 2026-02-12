<template>
  <main class="min-h-screen bg-slate-100 px-4 py-8">
    <div
      class="mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-sm lg:grid-cols-2"
    >
      <section class="hidden bg-slate-900 p-10 text-white lg:block">
        <p class="text-xs uppercase tracking-[0.16em] text-slate-300">
          Administration
        </p>
        <h1 class="mt-3 text-3xl font-semibold leading-tight">
          Espace editorial
        </h1>
        <p class="mt-4 max-w-sm text-sm leading-relaxed text-slate-300">
          Gere les articles multilingues, les brouillons et la publication
          depuis un seul back-office.
        </p>
        <div class="mt-8 space-y-3">
          <div class="rounded-xl bg-white/10 px-4 py-3">
            <p class="text-xs uppercase tracking-wide text-slate-300">
              Securite
            </p>
            <p class="mt-1 text-sm text-slate-100">Session admin protegee</p>
          </div>
          <div class="rounded-xl bg-white/10 px-4 py-3">
            <p class="text-xs uppercase tracking-wide text-slate-300">
              Productivite
            </p>
            <p class="mt-1 text-sm text-slate-100">
              Flux de creation et edition rapide
            </p>
          </div>
        </div>
      </section>

      <section class="flex items-center p-6 md:p-10">
        <div class="w-full max-w-md">
          <p class="text-xs uppercase tracking-[0.16em] text-slate-500">
            Connexion
          </p>
          <h2 class="mt-2 text-2xl font-semibold text-slate-900">
            Acces au back-office
          </h2>
          <p class="mt-2 text-sm text-slate-600">
            Saisis ton mot de passe admin pour continuer.
          </p>

          <label class="mt-6 block text-sm font-medium text-slate-700">
            Mot de passe
          </label>
          <input
            v-model="password"
            type="password"
            class="mt-2 w-full rounded-xl bg-slate-100 px-4 py-2.5 outline-none transition focus:bg-white focus:ring-2 focus:ring-slate-300"
            placeholder="Mot de passe"
            @keyup.enter="login"
          />

          <button
            class="mt-4 w-full rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:opacity-60"
            :disabled="isLoading"
            @click="login"
          >
            {{ isLoading ? 'Connexion...' : 'Se connecter' }}
          </button>

          <p
            v-if="errorMessage"
            class="mt-4 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-600"
          >
            {{ errorMessage }}
          </p>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
})

const localePath = useLocalePath()
const password = ref('')
const isLoading = ref(false)
const errorMessage = ref('')

const login = async () => {
  errorMessage.value = ''

  if (!password.value.trim()) {
    errorMessage.value = 'Mot de passe requis.'
    return
  }

  isLoading.value = true
  try {
    await $fetch('/api/articles/admin-login', {
      method: 'POST',
      body: { password: password.value },
    })
    await navigateTo(localePath('/admin'))
  } catch {
    errorMessage.value = 'Mot de passe invalide.'
  } finally {
    isLoading.value = false
  }
}
</script>
