<template>
  <main
    ref="container"
    class="relative font-sans text-aink"
    @contextmenu.prevent="openContext"
  >
    <!-- ═══ Écran d'accueil iOS (mobile) ═══ -->
    <section
      class="flex min-h-[calc(100svh-90px)] flex-col px-7 pb-6 pt-16 lg:hidden"
    >
      <ClientOnly>
        <div class="mx-auto grid w-full max-w-sm grid-cols-2 gap-4">
          <!-- Widget Calendrier -->
          <button
            class="flex aspect-square flex-col rounded-[22px] bg-white/90 p-4 text-left shadow-lg backdrop-blur-2xl"
            @click="go('/about')"
          >
            <p
              class="text-[12px] font-semibold uppercase tracking-wide text-[#FF453A]"
            >
              {{ sbWeekday }}
            </p>
            <p class="text-[42px] font-semibold leading-none text-aink">
              {{ sbDay }}
            </p>
            <div class="mt-auto space-y-1">
              <div
                class="rounded-md border-l-[3px] border-[#1273DE] bg-[#1273DE]/15 px-1.5 py-0.5"
              >
                <p class="truncate text-[10px] font-semibold text-[#0B4FA0]">
                  Digitaleo · 2024—26
                </p>
              </div>
              <div
                class="rounded-md border-l-[3px] border-[#0E9F6E] bg-[#0E9F6E]/15 px-1.5 py-0.5"
              >
                <p class="truncate text-[10px] font-semibold text-[#086A49]">
                  Epitech · 2023—26
                </p>
              </div>
            </div>
          </button>

          <!-- Widget Météo (live) -->
          <button
            class="flex aspect-square flex-col rounded-[22px] bg-gradient-to-b from-[#2E67BE] to-[#4A86D8] p-4 text-left text-white shadow-lg"
            @click="desktop.state.value.apps.weather = true"
          >
            <p class="truncate text-[14px] font-semibold">
              {{ wxWidget.city }}
            </p>
            <p class="text-[40px] font-thin leading-tight">
              {{
                wxWidget.temp !== null ? Math.round(wxWidget.temp) + '°' : '—'
              }}
            </p>
            <div class="mt-auto">
              <p v-if="wxWidget.code !== null" class="text-[24px] leading-none">
                <DesktopWxIcon :code="wxWidget.code" />
              </p>
              <p class="mt-1 text-[11px] font-medium text-white/85">
                <template v-if="wxWidget.max !== null"
                  >↑{{ Math.round(wxWidget.max!) }}° ↓{{
                    Math.round(wxWidget.min!)
                  }}°</template
                >
              </p>
            </div>
          </button>
        </div>
      </ClientOnly>

      <div
        class="mx-auto mt-9 grid w-full max-w-sm grid-cols-4 gap-x-4 gap-y-6"
      >
        <component
          :is="app.to ? NuxtLinkComponent : app.href ? 'a' : 'button'"
          v-for="app in springboard"
          :key="app.id"
          v-bind="
            app.to
              ? { to: localePath(app.to) }
              : app.href
                ? { href: app.href, target: '_blank' }
                : {}
          "
          class="flex flex-col items-center gap-1.5"
          @click="app.action && app.action()"
        >
          <span class="block h-14 w-14">
            <DesktopMacAppIcon :name="app.icon" />
          </span>
          <span
            class="max-w-full truncate text-[11px] font-medium text-white drop-shadow"
            >{{ app.raw ?? $t(app.label!) }}</span
          >
        </component>
      </div>
    </section>

    <!-- ═══ Bureau (desktop) ═══ -->
    <section ref="heroEl" class="relative hidden min-h-[92vh] w-full lg:block">
      <!-- Icônes du bureau -->
      <div
        class="absolute right-6 top-14 z-[5] hidden flex-col items-center gap-5 lg:flex"
      >
        <button
          v-for="icon in deskIcons"
          :key="icon.id"
          class="desk-icon group flex w-24 flex-col items-center gap-1.5"
          :data-icon-id="icon.id"
          @click.stop="selectedIcon = icon.id"
          @dblclick="icon.action"
        >
          <span
            class="rounded-xl p-1.5 transition-colors"
            :class="selectedIcon === icon.id ? 'bg-white/25' : ''"
          >
            <span class="block h-12 w-12">
              <DesktopMacAppIcon :name="icon.icon" />
            </span>
          </span>
          <span
            class="max-w-full truncate rounded px-1.5 text-[12px] font-medium text-white drop-shadow"
            :class="selectedIcon === icon.id ? 'bg-ablue' : ''"
            >{{ $t(icon.label) }}</span
          >
        </button>
      </div>

      <!-- Fenêtre "À propos" -->
      <div
        v-show="!desktop.state.value.wins.about?.min"
        ref="aboutEl"
        class="win absolute left-12 top-28 z-10 w-[500px] xl:left-[7%]"
        :style="{ zIndex: desktop.state.value.wins.about?.z ?? 10 }"
        @pointerdown="desktop.focus('about')"
      >
        <UiMacWindow
          :title="$t('macos.aboutTitle')"
          :active="desktop.state.value.activeWin === 'about'"
          @close="animateMinimize('about')"
          @minimize="animateMinimize('about')"
          @zoom="go('/about')"
        >
          <div class="px-8 pb-8 pt-7 text-center">
            <AgLogo class="mx-auto h-16 w-20 text-aink" />
            <h1 class="mt-4 text-[22px] font-bold tracking-tight">
              Antoine Gourgue
            </h1>
            <p class="mt-0.5 text-[13px] text-agray">
              {{ $t('home.subtitle') }} — Anglet, France
            </p>

            <div
              class="mx-auto mt-6 grid max-w-[360px] grid-cols-[110px_1fr] gap-x-4 gap-y-1.5 text-left text-[13px]"
            >
              <span class="text-right font-semibold">{{
                $t('macos.specStack')
              }}</span>
              <span class="text-agray">Vue · Nuxt · TypeScript</span>
              <span class="text-right font-semibold">{{
                $t('macos.specBackend')
              }}</span>
              <span class="text-agray">Node.js · PHP · MongoDB</span>
              <span class="text-right font-semibold">{{
                $t('macos.specTools')
              }}</span>
              <span class="text-agray"
                >Docker · GitLab CI/CD · Claude Code</span
              >
              <span class="text-right font-semibold">{{
                $t('macos.specTraining')
              }}</span>
              <span class="text-agray">{{ $t('macos.specTrainingVal') }}</span>
              <span class="text-right font-semibold">{{
                $t('macos.specStatus')
              }}</span>
              <span class="text-agray"
                ><span
                  class="mr-1.5 inline-block h-2 w-2 rounded-full bg-emerald-500"
                ></span
                >{{ $t('macos.specStatusVal') }}</span
              >
            </div>

            <div class="mt-7 flex items-center justify-center gap-3">
              <NuxtLink
                :to="localePath('/contact')"
                class="rounded-md bg-ablue px-4 py-1.5 text-[13px] font-medium text-white shadow-sm transition-colors duration-200 hover:bg-[#0077ed]"
              >
                {{ $t('home.contactMe') }}
              </NuxtLink>
              <a
                href="/assets/antoinegourgue-cv.pdf"
                download
                class="rounded-md border border-black/15 bg-white px-4 py-1.5 text-[13px] font-medium text-aink shadow-sm transition-colors duration-200 hover:bg-black/5"
              >
                {{ $t('home.downloadCV') }}
              </a>
            </div>
          </div>
        </UiMacWindow>
      </div>

      <!-- Fenêtre Terminal -->
      <div
        v-show="!desktop.state.value.wins.terminal?.min"
        ref="termEl"
        class="win absolute right-36 top-60 z-10 w-[440px] xl:right-[12%]"
        :style="{ zIndex: desktop.state.value.wins.terminal?.z ?? 10 }"
        @pointerdown="desktop.focus('terminal')"
      >
        <UiMacWindow
          title="antoine — zsh"
          dark
          :active="desktop.state.value.activeWin === 'terminal'"
          @close="animateMinimize('terminal')"
          @minimize="animateMinimize('terminal')"
          @zoom="animateZoom('terminal')"
        >
          <DesktopTerminalShell @exit="animateMinimize('terminal')" />
        </UiMacWindow>
      </div>

      <p
        class="pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-[12px] font-medium tracking-wide text-white/50 lg:block"
      >
        {{ $t('macos.dragHint') }}
      </p>
    </section>

    <!-- ═══ Projets : fenêtre Finder + Quick Look ═══ -->
    <section
      v-show="!desktop.state.value.wins.finder?.min"
      class="mx-auto hidden w-full max-w-5xl px-5 pt-20 lg:block lg:px-8"
    >
      <div ref="finderEl" data-reveal>
        <UiMacWindow
          @close="animateMinimize('finder')"
          @minimize="animateMinimize('finder')"
          @zoom="go('/projects')"
        >
          <!-- Barre d'outils Finder, intégrée à la barre de titre -->
          <template #toolbar>
            <div class="flex items-center gap-3">
              <div class="flex items-center gap-1 text-black/45">
                <button class="tb-btn text-[15px]">
                  <DesktopSfIcon name="chevron-left" />
                </button>
                <button class="tb-btn text-[15px] text-black/20">
                  <DesktopSfIcon name="chevron-right" />
                </button>
              </div>
              <span class="text-[14px] font-semibold">{{
                $t('macos.finderProjects')
              }}</span>
              <div class="ml-auto flex items-center gap-2 text-black/45">
                <!-- Vue grille / liste -->
                <div
                  class="hidden overflow-hidden rounded-md border border-black/10 sm:flex"
                >
                  <button
                    class="px-2 py-1 text-[13px]"
                    :class="
                      finderView === 'grid' ? 'bg-black/10 text-aink' : ''
                    "
                    @click="finderView = 'grid'"
                  >
                    <DesktopSfIcon name="grid" />
                  </button>
                  <button
                    class="px-2 py-1 text-[13px]"
                    :class="
                      finderView === 'list' ? 'bg-black/10 text-aink' : ''
                    "
                    @click="finderView = 'list'"
                  >
                    <DesktopSfIcon name="list" />
                  </button>
                </div>

                <!-- Tri -->
                <div class="relative hidden sm:block">
                  <button
                    class="tb-btn text-[14px]"
                    :class="sortMenuOpen ? 'bg-black/10 text-aink' : ''"
                    :title="$t('macos.sortBy')"
                    @click.stop="sortMenuOpen = !sortMenuOpen"
                  >
                    <DesktopSfIcon name="sort" />
                  </button>
                  <transition name="dropdown">
                    <div
                      v-if="sortMenuOpen"
                      class="absolute right-0 top-full z-30 mt-1.5 min-w-[170px] rounded-lg border border-black/10 bg-white/90 p-1 shadow-xl backdrop-blur-xl"
                      @click.stop
                    >
                      <p
                        class="px-2.5 pb-0.5 pt-1 text-[10px] font-semibold text-black/35"
                      >
                        {{ $t('macos.sortBy') }}
                      </p>
                      <button
                        v-for="opt in sortOptions"
                        :key="opt.key"
                        class="sort-item"
                        @click="setSort(opt.key)"
                      >
                        {{ $t(opt.labelKey) }}
                        <span v-if="sortKey === opt.key">✓</span>
                      </button>
                      <div class="mx-2 my-1 border-t border-black/10"></div>
                      <button
                        class="sort-item"
                        @click="((sortAsc = true), (sortMenuOpen = false))"
                      >
                        {{ $t('macos.asc') }}
                        <span v-if="sortAsc">✓</span>
                      </button>
                      <button
                        class="sort-item"
                        @click="((sortAsc = false), (sortMenuOpen = false))"
                      >
                        {{ $t('macos.desc') }}
                        <span v-if="!sortAsc">✓</span>
                      </button>
                    </div>
                  </transition>
                </div>

                <span class="hidden text-[14px] md:block"
                  ><DesktopSfIcon name="share"
                /></span>

                <!-- Recherche réelle -->
                <div
                  class="hidden items-center gap-1.5 rounded-md bg-black/5 px-2.5 py-1 md:flex"
                >
                  <span class="text-[12px] text-black/35"
                    ><DesktopSfIcon name="search"
                  /></span>
                  <input
                    v-model="finderQuery"
                    type="text"
                    :placeholder="$t('macos.search')"
                    class="w-24 bg-transparent text-[12px] text-aink outline-none transition-all placeholder:text-black/35 focus:w-36"
                  />
                </div>
              </div>
            </div>
          </template>

          <div class="flex min-h-[380px]">
            <!-- Sidebar Finder -->
            <aside
              class="hidden w-48 shrink-0 border-r border-black/5 bg-white/40 px-3 py-4 sm:block"
            >
              <p class="px-2 pb-1.5 text-[11px] font-semibold text-black/35">
                {{ $t('macos.finderFavorites') }}
              </p>
              <div class="sidebar-item">
                <span class="sf"><DesktopSfIcon name="airdrop" /></span>
                {{ $t('macos.finderAirdrop') }}
              </div>
              <div class="sidebar-item">
                <span class="sf"><DesktopSfIcon name="clock" /></span>
                {{ $t('macos.finderRecents') }}
              </div>
              <div class="sidebar-item">
                <span class="sf"><DesktopSfIcon name="grid" /></span>
                {{ $t('macos.finderApps') }}
              </div>
              <div class="sidebar-item">
                <span class="sf"><DesktopSfIcon name="desktop" /></span>
                {{ $t('macos.finderDesktop') }}
              </div>
              <div class="sidebar-item">
                <span class="sf"><DesktopSfIcon name="doc" /></span>
                {{ $t('macos.finderDocs') }}
              </div>
              <div class="sidebar-item">
                <span class="sf"><DesktopSfIcon name="download" /></span>
                {{ $t('macos.finderDownloads') }}
              </div>
              <div
                class="mt-0.5 flex items-center gap-2 rounded-md bg-black/10 px-2 py-1 text-[13px] font-medium text-aink"
              >
                <span class="sf"><DesktopSfIcon name="folder" /></span>
                {{ $t('macos.finderProjects') }}
              </div>

              <p
                class="px-2 pb-1.5 pt-4 text-[11px] font-semibold text-black/35"
              >
                {{ $t('macos.finderLocations') }}
              </p>
              <div class="sidebar-item">
                <span class="sf"><DesktopSfIcon name="laptop" /></span>
                {{ $t('macos.finderMac') }}
              </div>
            </aside>

            <!-- Contenu (grille ou liste) + barre de statut -->
            <div class="flex min-w-0 flex-1 flex-col">
              <!-- Vue grille -->
              <div v-if="finderView === 'grid'" class="flex-1 p-6">
                <div
                  v-if="finderProjects.length"
                  class="grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3 lg:grid-cols-4"
                >
                  <button
                    v-for="project in finderProjects"
                    :key="project.key"
                    class="group flex flex-col items-center gap-2"
                    @click.stop="finderSelected = project.key"
                    @dblclick="quicklook = project.key"
                  >
                    <span
                      class="block h-16 w-16 rounded-2xl p-1 transition-transform duration-300 group-hover:scale-105"
                      :class="
                        finderSelected === project.key ? 'bg-black/10' : ''
                      "
                    >
                      <DesktopProjectIcon
                        :icon="project.icon"
                        :name="project.name"
                        :bg="project.iconBg"
                        :pad="project.iconPad"
                        :letter="project.letter"
                        :color-top="project.colorTop"
                        :color-bottom="project.colorBottom"
                      />
                    </span>
                    <span
                      class="max-w-full truncate rounded px-1.5 text-[12.5px] font-medium"
                      :class="
                        finderSelected === project.key
                          ? 'bg-ablue text-white'
                          : 'text-aink'
                      "
                      >{{ project.name }}</span
                    >
                  </button>
                </div>
                <p v-else class="py-14 text-center text-[13px] text-black/35">
                  {{ $t('macos.spotlightEmpty') }}
                </p>
                <p
                  v-if="finderProjects.length"
                  class="mt-8 text-center text-[12px] text-black/35"
                >
                  {{ $t('macos.projectsSub') }}
                </p>
              </div>

              <!-- Vue liste (colonnes triables) -->
              <div v-else class="flex-1 py-2">
                <div class="finder-cols text-[11px] font-medium text-black/45">
                  <button class="text-left" @click="setSort('name')">
                    {{ $t('macos.sortName') }}
                    <span v-if="sortKey === 'name'">{{
                      sortAsc ? '▲' : '▼'
                    }}</span>
                  </button>
                  <button class="text-left" @click="setSort('category')">
                    {{ $t('macos.category') }}
                    <span v-if="sortKey === 'category'">{{
                      sortAsc ? '▲' : '▼'
                    }}</span>
                  </button>
                  <button class="text-left" @click="setSort('year')">
                    {{ $t('macos.year') }}
                    <span v-if="sortKey === 'year'">{{
                      sortAsc ? '▲' : '▼'
                    }}</span>
                  </button>
                </div>
                <button
                  v-for="(project, i) in finderProjects"
                  :key="project.key"
                  class="finder-cols w-full border-0 text-left text-[13px]"
                  :class="
                    finderSelected === project.key
                      ? 'bg-ablue text-white'
                      : i % 2 === 1
                        ? 'bg-black/[0.03] text-aink'
                        : 'text-aink'
                  "
                  @click.stop="finderSelected = project.key"
                  @dblclick="quicklook = project.key"
                >
                  <span class="flex min-w-0 items-center gap-2.5 font-medium">
                    <span class="block h-6 w-6 shrink-0">
                      <DesktopProjectIcon
                        :icon="project.icon"
                        :name="project.name"
                        :bg="project.iconBg"
                        :pad="project.iconPad"
                        :letter="project.letter"
                      />
                    </span>
                    <span class="truncate">{{ project.name }}</span>
                  </span>
                  <span
                    :class="
                      finderSelected === project.key
                        ? 'text-white/80'
                        : 'text-black/45'
                    "
                    >{{ $t(project.categoryKey) }}</span
                  >
                  <span
                    :class="
                      finderSelected === project.key
                        ? 'text-white/80'
                        : 'text-black/45'
                    "
                    >{{ project.year }}</span
                  >
                </button>
                <p
                  v-if="!finderProjects.length"
                  class="py-14 text-center text-[13px] text-black/35"
                >
                  {{ $t('macos.spotlightEmpty') }}
                </p>
              </div>

              <div
                class="border-t border-black/5 bg-white/60 px-4 py-1.5 text-center text-[11px] text-black/40"
              >
                {{ $t('macos.finderStatus', { count: finderProjects.length }) }}
              </div>
            </div>
          </div>
        </UiMacWindow>
      </div>
    </section>

    <!-- ═══ Parcours (Calendrier) ═══ -->
    <section
      v-show="!desktop.state.value.wins.notes?.min"
      class="mx-auto hidden w-full max-w-4xl px-5 pt-20 lg:block lg:px-8"
    >
      <div ref="notesEl" data-reveal>
        <UiMacWindow
          @close="animateMinimize('notes')"
          @minimize="animateMinimize('notes')"
          @zoom="go('/about')"
        >
          <template #toolbar>
            <div class="flex items-center gap-3">
              <span class="text-[14px] font-semibold">{{
                $t('home.journey')
              }}</span>
              <span class="text-[13px] text-black/40">2016 — 2026</span>
              <div
                class="ml-auto hidden overflow-hidden rounded-md border border-black/10 text-[12px] sm:flex"
              >
                <span class="px-2.5 py-0.5 text-black/45">{{
                  $t('macos.calDay')
                }}</span>
                <span class="px-2.5 py-0.5 text-black/45">{{
                  $t('macos.calWeek')
                }}</span>
                <span class="px-2.5 py-0.5 text-black/45">{{
                  $t('macos.calMonth')
                }}</span>
                <span class="bg-black/10 px-2.5 py-0.5 font-medium">{{
                  $t('macos.calYear')
                }}</span>
              </div>
            </div>
          </template>

          <div class="flex min-h-[300px]">
            <!-- Sidebar des calendriers (checkboxes fonctionnelles) -->
            <aside
              class="hidden w-44 shrink-0 border-r border-black/5 bg-white/40 px-4 py-4 sm:block"
            >
              <p class="pb-2 text-[11px] font-semibold text-black/35">
                {{ $t('macos.calTitle') }}
              </p>
              <button
                v-for="cat in calCategories"
                :key="cat.id"
                class="flex w-full items-center gap-2 rounded-md px-1 py-1 text-left text-[13px] text-aink transition-colors hover:bg-black/5"
                @click.stop="toggleCat(cat.id)"
              >
                <span
                  class="flex h-3.5 w-3.5 items-center justify-center rounded-[4px] text-[8px] font-bold text-white transition-colors"
                  :style="{
                    background: activeCats[cat.id] ? cat.color : 'transparent',
                    boxShadow: `inset 0 0 0 1.5px ${cat.color}`,
                  }"
                  >{{ activeCats[cat.id] ? '✓' : '' }}</span
                >
                {{ $t(cat.labelKey) }}
              </button>
            </aside>

            <!-- Événements (cliquables : popover de détail) -->
            <div class="min-w-0 flex-1 space-y-3 p-5 sm:p-6">
              <button
                v-for="step in visibleSteps"
                :key="step.id"
                class="relative block w-full overflow-hidden rounded-lg px-4 py-3 text-left transition-[filter] duration-200 hover:brightness-95"
                :style="{ background: step.tint }"
                @click.stop="openEvent($event, step.id)"
              >
                <span
                  class="absolute bottom-0 left-0 top-0 w-1"
                  :style="{ background: step.color }"
                ></span>
                <div class="flex items-baseline justify-between gap-3">
                  <h3
                    class="min-w-0 truncate text-[14px] font-semibold"
                    :style="{ color: step.colorDark }"
                  >
                    {{ $t(step.titleKey) }}
                  </h3>
                  <span
                    class="shrink-0 text-[12px] font-medium"
                    :style="{ color: step.color }"
                    >{{
                      step.periodKey ? $t(step.periodKey) : step.period
                    }}</span
                  >
                </div>
                <p class="mt-1 text-[13px] leading-relaxed text-black/55">
                  {{ $t(step.descKey) }}
                </p>
              </button>
              <p
                v-if="!visibleSteps.length"
                class="py-10 text-center text-[13px] text-black/35"
              >
                {{ $t('macos.spotlightEmpty') }}
              </p>
            </div>
          </div>
        </UiMacWindow>
      </div>
    </section>

    <!-- ═══ Contact (Mail) ═══ -->
    <section
      v-show="!desktop.state.value.wins.mail?.min"
      class="mx-auto hidden w-full max-w-2xl px-5 pb-36 pt-20 lg:block lg:px-8"
    >
      <div ref="mailEl" data-reveal>
        <UiMacWindow
          :title="$t('macos.mailTitle')"
          @close="animateMinimize('mail')"
          @minimize="animateMinimize('mail')"
          @zoom="go('/contact')"
        >
          <div
            class="flex items-center gap-5 border-b border-black/5 bg-white/60 px-5 py-2.5 text-black/35"
          >
            <i class="fas fa-paper-plane text-[15px] text-ablue"></i>
            <i class="fas fa-paperclip text-[14px]"></i>
            <i class="fas fa-font text-[14px]"></i>
          </div>
          <div class="p-7 pt-5">
            <p class="border-b border-black/5 pb-2.5 text-sm text-agray">
              {{ $t('macos.mailTo') }}
            </p>
            <p class="border-b border-black/5 py-2.5 text-sm font-medium">
              {{ $t('macos.mailSubject') }}
            </p>
            <p class="pb-2 pt-5 text-[15px] leading-relaxed">
              {{ $t('macos.mailBody') }}
            </p>
            <p class="pb-5 text-[15px] text-agray">— Antoine</p>
            <div class="flex flex-wrap items-center gap-5">
              <NuxtLink
                :to="localePath('/contact')"
                class="rounded-full bg-ablue px-5 py-2.5 text-sm font-medium text-white transition-colors duration-300 hover:bg-[#0077ed]"
              >
                {{ $t('macos.mailSend') }}
              </NuxtLink>
              <a
                href="/assets/antoinegourgue-cv.pdf"
                download
                class="text-sm font-medium text-ablue hover:underline"
                >{{ $t('home.downloadCV') }} ›</a
              >
            </div>
          </div>
        </UiMacWindow>
      </div>
    </section>

    <!-- ═══ Popover d'événement (Calendrier) ═══ -->
    <Teleport to="body">
      <Transition name="ql">
        <div
          v-if="evtStep"
          class="ql-panel fixed z-[92] w-[300px] overflow-hidden rounded-xl border border-black/10 bg-white shadow-2xl ring-1 ring-white/40"
          :style="{ left: evt.x + 'px', top: evt.y + 'px' }"
          @click.stop
        >
          <div class="h-1.5" :style="{ background: evtStep.color }"></div>
          <div class="p-4">
            <h3 class="text-[15px] font-bold leading-snug text-aink">
              {{ $t(evtStep.titleKey) }}
            </h3>
            <div class="mt-2 space-y-1 text-[12.5px] text-agray">
              <p class="flex items-center gap-2">
                <span class="text-[12px]"><DesktopSfIcon name="clock" /></span>
                {{ evtStep.periodKey ? $t(evtStep.periodKey) : evtStep.period }}
              </p>
              <p class="flex items-center gap-2">
                <span class="text-[12px]"><DesktopSfIcon name="folder" /></span>
                {{ evtStep.location }}
              </p>
            </div>
            <p
              class="mt-3 border-t border-black/5 pt-3 text-[13px] leading-relaxed text-black/60"
            >
              {{ $t(evtStep.descKey) }}
            </p>
            <NuxtLink
              :to="{
                path: localePath('/about'),
                query: { c: evtStep.aboutId },
              }"
              class="mt-3 inline-block rounded-md bg-ablue px-3.5 py-1.5 text-[12.5px] font-medium text-white shadow-sm transition-colors hover:bg-[#0077ed]"
            >
              {{ $t('macos.openInContacts') }} ›
            </NuxtLink>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- ═══ Quick Look ═══ -->
    <Teleport to="body">
      <Transition name="ql">
        <div
          v-if="qlProject"
          class="fixed inset-0 z-[95] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
          @click.self="quicklook = ''"
        >
          <div
            class="ql-panel w-full max-w-3xl overflow-hidden rounded-2xl border border-white/20 bg-[#f5f5f7] shadow-2xl"
          >
            <div
              class="relative flex items-center justify-between border-b border-black/5 bg-white/80 px-4 py-2.5"
            >
              <button
                class="flex h-3 w-3 items-center justify-center rounded-full bg-[#ff5f57] text-[8px] text-black/50"
                aria-label="close"
                @click="quicklook = ''"
              ></button>
              <span
                class="absolute left-1/2 -translate-x-1/2 text-[13px] font-medium text-black/50"
                >{{ qlProject.name }}</span
              >
              <a
                :href="qlProject.url"
                target="_blank"
                class="text-[13px] font-medium text-ablue hover:underline"
                >{{ $t('macos.openInSafari') }} ↗</a
              >
            </div>
            <img
              :src="qlProject.image"
              :alt="qlProject.name"
              class="max-h-[52vh] w-full bg-white object-contain"
            />
            <div
              class="flex flex-col gap-3 border-t border-black/5 bg-white/80 px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div class="min-w-0">
                <p class="text-sm leading-relaxed text-agray">
                  {{ $t(`projects.items.${qlProject.key}.description`) }}
                </p>
                <p class="mt-2 text-[12px] font-medium text-black/40">
                  {{ qlProject.stack }}
                </p>
              </div>
              <NuxtLink
                :to="localePath('/projects')"
                class="shrink-0 rounded-md bg-ablue px-4 py-1.5 text-[13px] font-medium text-white shadow-sm hover:bg-[#0077ed]"
              >
                {{ $t('macos.aboutApp') }} ›
              </NuxtLink>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- ═══ Menu contextuel du bureau ═══ -->
    <Teleport to="body">
      <div
        v-if="ctx.show"
        class="fixed z-[90] min-w-[220px] rounded-lg border border-black/10 bg-white/80 p-1 shadow-2xl backdrop-blur-2xl"
        :style="{ left: ctx.x + 'px', top: ctx.y + 'px' }"
      >
        <button
          class="ctx-item"
          @click="(desktop.cycleWallpaper(), closeContext())"
        >
          {{ $t('macos.ctxWallpaper') }}
        </button>
        <button class="ctx-item" @click="(arrangeIcons(), closeContext())">
          {{ $t('macos.ctxArrange') }}
        </button>
        <div class="mx-2.5 my-1 border-t border-black/10"></div>
        <button class="ctx-item" @click="(downloadCv(), closeContext())">
          {{ $t('macos.ctxCv') }}
        </button>
        <button
          class="ctx-item"
          @click="((desktop.state.value.apps.airdrop = true), closeContext())"
        >
          {{ $t('macos.ctxAirdrop') }}
        </button>
        <button
          class="ctx-item"
          @click="
            (openUrl('https://github.com/antoine-gourgue'), closeContext())
          "
        >
          {{ $t('macos.ctxGithub') }}
        </button>
      </div>
    </Teleport>
  </main>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import AgLogo from '~/components/ui/AGLogo.vue'

const localePath = useLocalePath()
const { gsap } = useGsap()
const desktop = useDesktop()

const container = ref<HTMLElement | null>(null)
const heroEl = ref<HTMLElement | null>(null)
const aboutEl = ref<HTMLElement | null>(null)
const termEl = ref<HTMLElement | null>(null)
const finderEl = ref<HTMLElement | null>(null)
const notesEl = ref<HTMLElement | null>(null)
const mailEl = ref<HTMLElement | null>(null)
let ctxGsap: gsap.Context | undefined

desktop.register('about')
desktop.register('terminal')
desktop.register('finder')
desktop.register('notes')
desktop.register('mail')

const winEls: Record<string, Ref<HTMLElement | null>> = {
  about: aboutEl,
  terminal: termEl,
  finder: finderEl,
  notes: notesEl,
  mail: mailEl,
}

const router = useRouter()
const go = (path: string) => router.push(localePath(path))

// Parcours façon Calendrier : catégories cochables et événements cliquables
const calCategories = [
  { id: 'work', labelKey: 'macos.calWork', color: '#1273DE' },
  { id: 'studies', labelKey: 'macos.calStudies', color: '#0E9F6E' },
  { id: 'training', labelKey: 'macos.calTraining', color: '#EA580C' },
]

const activeCats = reactive<Record<string, boolean>>({
  work: true,
  studies: true,
  training: true,
})
const toggleCat = (id: string) => {
  activeCats[id] = !activeCats[id]
}

// Popover de détail d'un événement
const evt = reactive({ id: '', x: 0, y: 0 })
const openEvent = (e: MouseEvent, id: string) => {
  sfx.click()
  evt.id = evt.id === id ? '' : id
  evt.x = Math.min(Math.max(e.clientX - 150, 12), window.innerWidth - 312)
  evt.y = Math.min(e.clientY + 14, window.innerHeight - 300)
}
const evtStep = computed(() => journeySteps.find((s) => s.id === evt.id))

const journeySteps = [
  {
    id: 'digitaleo',
    cat: 'work',
    location: 'Rennes, France',
    aboutId: 'digitaleo',
    color: '#1273DE',
    colorDark: '#0B4FA0',
    tint: 'rgba(18, 115, 222, 0.10)',
    titleKey: 'home.journey2024.title',
    periodKey: 'home.journey2024.period',
    period: '',
    descKey: 'home.journey2024.description',
  },
  {
    id: 'epitech',
    cat: 'studies',
    location: 'Rennes, France',
    aboutId: 'epitech',
    color: '#0E9F6E',
    colorDark: '#086A49',
    tint: 'rgba(14, 159, 110, 0.10)',
    titleKey: 'home.journey2023.title',
    periodKey: 'home.journey2023.period',
    period: '',
    descKey: 'home.journey2023.description',
  },
  {
    id: 'kpme',
    cat: 'work',
    location: 'Boucau, France',
    aboutId: 'kpme',
    color: '#1273DE',
    colorDark: '#0B4FA0',
    tint: 'rgba(18, 115, 222, 0.10)',
    titleKey: 'about.kpme.title',
    periodKey: 'about.kpme.period',
    period: '',
    descKey: 'about.kpme.description',
  },
  {
    id: 'bts',
    cat: 'studies',
    location: 'Hasparren, France',
    aboutId: 'education',
    color: '#0E9F6E',
    colorDark: '#086A49',
    tint: 'rgba(14, 159, 110, 0.10)',
    titleKey: 'about.education.title',
    periodKey: 'about.education.period',
    period: '',
    descKey: 'about.education.description',
  },
  {
    id: 'bac',
    cat: 'training',
    location: 'Biarritz, France',
    aboutId: 'bac',
    color: '#EA580C',
    colorDark: '#9A3908',
    tint: 'rgba(234, 88, 12, 0.10)',
    titleKey: 'about.bac.title',
    periodKey: 'about.bac.period',
    period: '',
    descKey: 'about.bac.description',
  },
]

const visibleSteps = computed(() =>
  journeySteps.filter((st) => activeCats[st.cat])
)

const NuxtLinkComponent = resolveComponent('NuxtLink')

// Écran d'accueil iOS (mobile)
const { locale } = useI18n()
const now = new Date()
const sbWeekday = new Intl.DateTimeFormat(locale.value, {
  weekday: 'long',
}).format(now)
const sbDay = now.getDate()

// Widget météo de l'écran d'accueil : position IP uniquement (aucune permission)
const wxWidget = reactive<{
  city: string
  temp: number | null
  code: number | null
  min: number | null
  max: number | null
}>({ city: '…', temp: null, code: null, min: null, max: null })

onMounted(async () => {
  if (window.innerWidth >= 1024) return
  let lat = 43.4832
  let lon = -1.514
  wxWidget.city = 'Anglet'

  // 1. Position précise mémorisée par l'app Météo (24 h)
  let located = false
  try {
    const cached = JSON.parse(localStorage.getItem('ag-geo') || 'null')
    if (cached && Date.now() - cached.ts < 24 * 3600 * 1000) {
      lat = cached.lat
      lon = cached.lon
      wxWidget.city = cached.city
      located = true
    }
  } catch {
    /* cache illisible */
  }

  // 2. Permission déjà accordée ? Position GPS silencieuse (aucun popup)
  if (!located && 'permissions' in navigator) {
    try {
      const perm = await navigator.permissions.query({ name: 'geolocation' })
      if (perm.state === 'granted') {
        const pos = await new Promise<GeolocationPosition>((resolve, reject) =>
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            timeout: 6000,
            maximumAge: 600000,
          })
        )
        lat = pos.coords.latitude
        lon = pos.coords.longitude
        located = true
        try {
          const rev = await $fetch<{ locality?: string; city?: string }>(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=${locale.value}`
          )
          wxWidget.city = rev.locality || rev.city || wxWidget.city
        } catch {
          /* nom de ville indisponible */
        }
      }
    } catch {
      /* API Permissions indisponible */
    }
  }

  // 3. Repli : estimation par IP
  if (!located) {
    try {
      const geo = await $fetch<{
        latitude: string
        longitude: string
        city?: string
      }>('https://get.geojs.io/v1/ip/geo.json')
      if (geo.latitude && geo.longitude) {
        lat = parseFloat(geo.latitude)
        lon = parseFloat(geo.longitude)
        if (geo.city) wxWidget.city = geo.city
      }
    } catch {
      /* repli Anglet */
    }
  }
  try {
    const res = await $fetch<{
      current: { temperature_2m: number; weather_code: number }
      daily: { temperature_2m_max: number[]; temperature_2m_min: number[] }
    }>(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=1`
    )
    wxWidget.temp = res.current.temperature_2m
    wxWidget.code = res.current.weather_code
    wxWidget.max = res.daily.temperature_2m_max[0]
    wxWidget.min = res.daily.temperature_2m_min[0]
  } catch {
    /* le widget reste sobre en cas d'échec */
  }
})

interface SpringboardApp {
  id: string
  icon: string
  label?: string
  raw?: string
  to?: string
  href?: string
  action?: () => void
}

const springboard: SpringboardApp[] = [
  { id: 'projects', icon: 'appstore', label: 'nav.projects', to: '/projects' },
  { id: 'about', icon: 'contacts', label: 'nav.about', to: '/about' },
  { id: 'blog', icon: 'notes', label: 'nav.blog', to: '/blog' },
  { id: 'contact', icon: 'mail', label: 'nav.contact', to: '/contact' },
  {
    id: 'messages',
    icon: 'messages',
    label: 'macos.messagesTitle',
    action: () => (desktop.state.value.apps.messages = true),
  },
  {
    id: 'weather',
    icon: 'weather',
    label: 'macos.weatherTitle',
    action: () => (desktop.state.value.apps.weather = true),
  },
  {
    id: 'calculator',
    icon: 'calculator',
    label: 'macos.calcTitle',
    action: () => (desktop.state.value.apps.calculator = true),
  },
  {
    id: 'music',
    icon: 'music',
    label: 'macos.musicTitle',
    action: () => (desktop.state.value.apps.music = true),
  },
  {
    id: 'settings',
    icon: 'settings',
    label: 'macos.settingsTitle',
    action: () => (desktop.state.value.apps.settings = true),
  },
  {
    id: 'maps',
    icon: 'maps',
    label: 'macos.mapsTitle',
    action: () => (desktop.state.value.apps.maps = true),
  },
  {
    id: 'siri',
    icon: 'siri',
    raw: 'Siri',
    action: () => (desktop.state.value.apps.siri = true),
  },
  {
    id: 'github',
    icon: 'github',
    raw: 'GitHub',
    href: 'https://github.com/antoine-gourgue',
  },
  {
    id: 'linkedin',
    icon: 'linkedin',
    raw: 'LinkedIn',
    href: 'https://linkedin.com/in/antoine-gourgue',
  },
  { id: 'cv', icon: 'pdf', label: 'macos.deskCv', action: () => downloadCv() },
]

// L'accueil (Finder) ne montre que les projets perso ; l'App Store montre tout
const projects = useProjects().filter((p) => !p.pro)
const { t } = useI18n()

// ── Finder fonctionnel : recherche, tri, vue, sélection ──
const finderView = ref<'grid' | 'list'>('grid')
const finderQuery = ref('')
const finderSelected = ref('')
const sortMenuOpen = ref(false)
const sortKey = ref<'name' | 'category' | 'year'>('name')
const sortAsc = ref(true)

const sortOptions = [
  { key: 'name' as const, labelKey: 'macos.sortName' },
  { key: 'category' as const, labelKey: 'macos.category' },
  { key: 'year' as const, labelKey: 'macos.year' },
]

const setSort = (key: 'name' | 'category' | 'year') => {
  if (sortKey.value === key) {
    sortAsc.value = !sortAsc.value
  } else {
    sortKey.value = key
    sortAsc.value = true
  }
  sortMenuOpen.value = false
}

const finderProjects = computed(() => {
  const q = finderQuery.value.trim().toLowerCase()
  const list = projects.filter(
    (p) =>
      !q ||
      p.name.toLowerCase().includes(q) ||
      t(p.categoryKey).toLowerCase().includes(q)
  )
  const field = (p: (typeof projects)[number]) =>
    sortKey.value === 'name'
      ? p.name
      : sortKey.value === 'year'
        ? p.year
        : t(p.categoryKey)
  return [...list].sort(
    (a, b) => field(a).localeCompare(field(b)) * (sortAsc.value ? 1 : -1)
  )
})

// Quick Look
const quicklook = ref('')
const qlProject = computed(() =>
  projects.find((p) => p.key === quicklook.value)
)
const sfx = useSfx()
watch(quicklook, (v) => {
  if (v) sfx.pop()
})

// ── Icônes du bureau ──
const selectedIcon = ref('')
const downloadCv = () => {
  const a = document.createElement('a')
  a.href = '/assets/antoinegourgue-cv.pdf'
  a.download = ''
  a.click()
}
const openUrl = (url: string) => window.open(url, '_blank')

const deskIcons = [
  { id: 'cv', label: 'macos.deskCv', icon: 'pdf', action: downloadCv },
  {
    id: 'projects',
    label: 'macos.deskProjects',
    icon: 'folder',
    action: () => router.push(localePath('/projects')),
  },
  {
    id: 'github',
    label: 'macos.deskGithub',
    icon: 'github',
    action: () => openUrl('https://github.com/antoine-gourgue'),
  },
  {
    id: 'linkedin',
    label: 'macos.deskLinkedin',
    icon: 'linkedin',
    action: () => openUrl('https://linkedin.com/in/antoine-gourgue'),
  },
  {
    id: 'weather',
    label: 'macos.weatherTitle',
    icon: 'weather',
    action: () => (desktop.state.value.apps.weather = true),
  },
  {
    id: 'calculator',
    label: 'macos.calcTitle',
    icon: 'calculator',
    action: () => (desktop.state.value.apps.calculator = true),
  },
  {
    id: 'music',
    label: 'macos.musicTitle',
    icon: 'music',
    action: () => (desktop.state.value.apps.music = true),
  },
  {
    id: 'settings',
    label: 'macos.settingsTitle',
    icon: 'settings',
    action: () => (desktop.state.value.apps.settings = true),
  },
]

// Remet les icônes du bureau à leur place d'origine
const arrangeIcons = () => {
  localStorage.removeItem('ag-icon-pos')
  gsap.to('.desk-icon', { x: 0, y: 0, duration: 0.35, ease: 'power2.out' })
}

// ── Menu contextuel ──
const onEsc = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    quicklook.value = ''
    evt.id = ''
  }
}

const ctx = reactive({ show: false, x: 0, y: 0 })
const openContext = (e: MouseEvent) => {
  ctx.show = true
  ctx.x = Math.min(e.clientX, window.innerWidth - 240)
  ctx.y = Math.min(e.clientY, window.innerHeight - 160)
}
const closeContext = () => (ctx.show = false)

// ── Fenêtres : réduction / restauration / zoom animés ──
const animateMinimize = (id: string) => {
  const el = winEls[id]?.value
  if (!el) return desktop.minimize(id)
  const r = el.getBoundingClientRect()
  gsap.to(el, {
    x: window.innerWidth / 2 - (r.left + r.width / 2),
    y: window.innerHeight - r.top,
    scale: 0.15,
    autoAlpha: 0,
    duration: 0.45,
    ease: 'power2.in',
    transformOrigin: 'center bottom',
    onComplete: () => {
      desktop.minimize(id)
      gsap.set(el, { clearProps: 'x,y,scale,opacity,visibility' })
      useGsap().ScrollTrigger.refresh()
    },
  })
}

const animateZoom = (id: string) => {
  desktop.toggleZoom(id)
  const el = winEls[id]?.value
  if (!el) return
  gsap.to(el, {
    scale: desktop.state.value.wins[id]?.zoom ? 1.08 : 1,
    duration: 0.35,
    ease: 'power2.inOut',
  })
}

// Le dock appelle desktop.restore() : on intercepte pour animer
watch(
  () =>
    Object.entries(desktop.state.value.wins)
      .map(([id, w]) => `${id}:${w.min}`)
      .join(','),
  (val, old) => {
    if (!old) return
    const oldMin = new Set(old.split(',').filter((s) => s.endsWith('true')))
    val.split(',').forEach((s) => {
      const [id, min] = s.split(':')
      if (min === 'false' && oldMin.has(`${id}:true`)) {
        nextTick(() => {
          const el = winEls[id]?.value
          if (!el) return
          const r = el.getBoundingClientRect()
          gsap.from(el, {
            x: window.innerWidth / 2 - (r.left + r.width / 2),
            y: window.innerHeight - r.top,
            scale: 0.15,
            autoAlpha: 0,
            duration: 0.5,
            ease: 'power3.out',
            transformOrigin: 'center bottom',
            clearProps: 'x,y,scale,opacity,visibility',
            onComplete: () => useGsap().ScrollTrigger.refresh(),
          })
        })
      }
    })
  }
)

onMounted(() => {
  if (!container.value) return

  const { Draggable } = useGsap()

  document.addEventListener('click', closeContext)
  document.addEventListener('click', () => {
    selectedIcon.value = ''
    sortMenuOpen.value = false
    evt.id = ''
  })
  document.addEventListener('keydown', onEsc)

  ctxGsap = gsap.context(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.win', {
        autoAlpha: 0,
        scale: 0.92,
        y: 34,
        duration: 0.7,
        ease: 'back.out(1.3)',
        stagger: 0.18,
      })

      gsap.from('.term-line', {
        autoAlpha: 0,
        duration: 0.25,
        stagger: 0.22,
        delay: 0.7,
      })

      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          autoAlpha: 0,
          y: 30,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        })
      })
    })

    mm.add('(min-width: 1024px)', () => {
      const draggables = gsap.utils
        .toArray<HTMLElement>('.win')
        .map((el) =>
          Draggable.create(el, {
            trigger: el.querySelector('.drag-handle'),
            bounds: heroEl.value,
            cursor: 'grab',
            activeCursor: 'grabbing',
          })
        )
        .flat()

      // ── Icônes du bureau déplaçables, position mémorisée ──
      let iconPos: Record<string, { x: number; y: number }> = {}
      try {
        iconPos = JSON.parse(localStorage.getItem('ag-icon-pos') || '{}')
      } catch {
        iconPos = {}
      }
      const iconEls = gsap.utils.toArray<HTMLElement>('.desk-icon')
      iconEls.forEach((el) => {
        const pos = iconPos[el.dataset.iconId ?? '']
        if (pos) gsap.set(el, { x: pos.x, y: pos.y })
      })
      const iconDrags = iconEls
        .map((el) =>
          Draggable.create(el, {
            bounds: heroEl.value,
            cursor: 'grab',
            activeCursor: 'grabbing',
            zIndexBoost: false,
            onPress() {
              selectedIcon.value = el.dataset.iconId ?? ''
            },
            onDragEnd() {
              iconPos[el.dataset.iconId ?? ''] = { x: this.x, y: this.y }
              localStorage.setItem('ag-icon-pos', JSON.stringify(iconPos))
            },
          })
        )
        .flat()

      return () => [...draggables, ...iconDrags].forEach((d) => d.kill())
    })
  }, container.value)
})

onUnmounted(() => {
  ctxGsap?.revert()
  document.removeEventListener('click', closeContext)
  document.removeEventListener('keydown', onEsc)
})
</script>

<style scoped>
.caret {
  animation: blink 1s steps(1) infinite;
}
@keyframes blink {
  50% {
    opacity: 0;
  }
}
.ctx-item {
  @apply flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-left text-[13px] text-aink transition-colors hover:bg-ablue hover:text-white;
}
.sidebar-item {
  @apply mt-0.5 flex items-center gap-2 rounded-md px-2 py-1 text-[13px] text-aink/70;
}

/* Barre d'outils Finder */
.tb-btn {
  @apply rounded px-1.5 py-0.5 transition-colors hover:bg-black/5;
}
.sf {
  @apply text-[14px] text-ablue;
}
.sort-item {
  @apply flex w-full items-center justify-between rounded-md px-2.5 py-1 text-left text-[13px] text-aink transition-colors hover:bg-ablue hover:text-white;
}
.finder-cols {
  @apply grid grid-cols-[1fr_130px_60px] items-center gap-3 border-b border-black/5 px-4 py-1.5;
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.15s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

.ql-enter-active,
.ql-leave-active {
  transition: opacity 0.22s ease;
}
.ql-enter-active .ql-panel,
.ql-leave-active .ql-panel {
  transition:
    transform 0.22s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.22s ease;
}
.ql-enter-from,
.ql-leave-to {
  opacity: 0;
}
.ql-enter-from .ql-panel,
.ql-leave-to .ql-panel {
  opacity: 0;
  transform: scale(0.94);
}
</style>
