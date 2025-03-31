<template>
  <main
    class="bg-gray-50 min-h-screen px-6 lg:px-20 py-32 relative overflow-hidden"
  >
    <div class="absolute inset-0 opacity-70 pointer-events-none">
      <img
        src="/assets/shape.svg"
        alt="background"
        class="w-full h-full object-cover"
      />
    </div>

    <section
      class="relative z-10 max-w-5xl mx-auto text-center mb-20 fade-in-up"
    >
      <h1 class="text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
        Services.
      </h1>
      <p class="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
        Currently focused on my studies and role at Digitaleo. I’m not available
        for freelance projects at the moment, but feel free to get in touch for
        future opportunities.
      </p>
    </section>

    <section
      class="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto fade-in-up"
    >
      <div
        class="border border-gray-200 rounded-2xl bg-white p-6 shadow-sm flex flex-col items-center text-center"
      >
        <i class="fas fa-laptop-code text-4xl text-gray-700 mb-4"></i>
        <h3 class="font-bold text-xl mb-3">Fullstack Development</h3>
        <p class="text-gray-500">
          Vue.js, AngularJS, TypeScript, PHP, REST APIs
        </p>
      </div>
      <div
        class="border border-gray-200 rounded-2xl bg-white p-6 shadow-sm flex flex-col items-center text-center"
      >
        <i class="fas fa-cogs text-4xl text-gray-700 mb-4"></i>
        <h3 class="font-bold text-xl mb-3">DevOps & CI/CD</h3>
        <p class="text-gray-500">Docker, GitLab CI, Vercel, GitHub Actions</p>
      </div>
      <div
        class="border border-gray-200 rounded-2xl bg-white p-6 shadow-sm flex flex-col items-center text-center"
      >
        <i class="fas fa-envelope text-4xl text-gray-700 mb-4"></i>
        <h3 class="font-bold text-xl mb-3">Email Integration</h3>
        <p class="text-gray-500">
          VML, Outlook-specific integration, responsive emails
        </p>
      </div>
      <div
        class="border border-gray-200 rounded-2xl bg-white p-6 shadow-sm flex flex-col items-center text-center"
      >
        <i class="fas fa-brain text-4xl text-gray-700 mb-4"></i>
        <h3 class="font-bold text-xl mb-3">AI & Data Projects</h3>
        <p class="text-gray-500">
          Machine Learning, CNN models, Data exploration
        </p>
      </div>
      <div
        class="border border-gray-200 rounded-2xl bg-white p-6 shadow-sm flex flex-col items-center text-center"
      >
        <i class="fas fa-palette text-4xl text-gray-700 mb-4"></i>
        <h3 class="font-bold text-xl mb-3">Design System Integration</h3>
        <p class="text-gray-500">
          Custom components, theming, internal design systems
        </p>
      </div>
      <div
        class="border border-gray-200 rounded-2xl bg-white p-6 shadow-sm flex flex-col items-center text-center"
      >
        <i class="fas fa-tasks text-4xl text-gray-700 mb-4"></i>
        <h3 class="font-bold text-xl mb-3">Collaboration & Tools</h3>
        <p class="text-gray-500">
          Git, Jira, Agile methods, efficient teamwork practices
        </p>
      </div>
    </section>

    <section class="relative z-10 text-center mt-20 fade-in-up">
      <p class="text-gray-500 text-sm">
        Interested in working together in the future? Don’t hesitate to
        <NuxtLink to="/contact" class="text-black underline">reach out</NuxtLink
        >.
      </p>
    </section>
  </main>
</template>

<style scoped>
.fade-in-up {
  animation: fadeInUp 0.8s ease-out both;
}
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
