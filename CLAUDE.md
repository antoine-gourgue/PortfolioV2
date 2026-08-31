# PortfolioV2 — engineering conventions

macOS/iOS desktop clone built with Nuxt 3, Tailwind CSS and GSAP. Every window is a
real feature; the mobile experience mirrors iOS app for app.

## Code style

- **All code comments are written in English.** User-facing content (i18n strings,
  page copy, CV) stays in French — it is content, not code.
- **No noise comments.** A comment must explain _why_ — a non-obvious constraint,
  a browser quirk, a deliberate trade-off. Never restate what the code already
  says, never label a block whose name makes it obvious.
- **No decorative section banners** (`── Section ──`, `══ Title ══`). Files are
  structured by extraction and naming, not by ASCII art.
- **JSDoc where it earns its place:**
  - composables (`composables/*`): document the exported function, its
    non-obvious parameters and return shape;
  - server routes and server utils (`server/*`): document the endpoint contract,
    rate limits, upstream services;
  - shared component props/emits (`components/ui/*`, reused desktop components):
    a one-liner per prop whose name is not self-explanatory.
  - Plain typed signatures need no JSDoc when the types already tell the story.
- Keep `eslint-disable` directives — they are instructions, not comments — but
  each must carry the reason next to it if not obvious.

## Commits and PRs

- Conventional commits, **English**, lowercase subject (commitlint enforces the
  types). No `Co-Authored-By` lines.
- CI runs on pushes and PRs to `main` only; the Vercel deploy job is chained to
  a green CI run.

## Verification

- `npm run lint`, `npx prettier --check .` and `npm run build` must pass before
  pushing — the same three gates CI enforces.
- Mobile work is verified at real Safari viewport heights (the toolbar eats
  190–270px; emulators do not simulate it) and, when gestures are involved, on
  a physical iPhone: the bottom and top screen edges belong to iOS, not to the
  page.
