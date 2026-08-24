# Brikke

A small React component library, built on [Base UI](https://base-ui.com) primitives
and styled with Tailwind CSS v4. Headless behaviour, own styling, SPA and SSR alike.

## Consuming it

```tsx
import { Button, Field } from 'brikke';
import 'brikke/styles.css'; // once, at your app root
```

The stylesheet is prebuilt and self-contained — consuming apps do **not** need to
add Brikke to a Tailwind `content`/`@source` config, and do not need Tailwind at all.

## Scripts

| Command | What it does |
| --- | --- |
| `pnpm storybook` | Component workshop on :6006 |
| `pnpm build` | Emit `dist/index.js`, `dist/index.d.ts`, `dist/styles.css` |
| `pnpm typecheck` | `tsc --noEmit` across src, stories, and config |
| `pnpm test:ssr` | Render the built package in Node with no DOM |
| `pnpm verify` | All of the above — run before publishing |

## Decisions worth knowing

**Base UI directly, not shadcn/ui.** shadcn/ui made Base UI its default primitive in
July 2026, so the two are the same stack at different layers. Brikke ships as a
versioned package rather than copy-in source, so consuming apps upgrade through one
lever instead of drifting per-app copies.

**React only.** Base UI is React-only by construction. If Vue or Svelte ever become
real, the migration target is Ark UI — one Zag.js state machine drives every adapter,
so parity is structural instead of hand-maintained. Nothing here is named `*-react`,
so a `brikke-react` / `brikke-vue` split stays available.

**Zero-runtime CSS.** This is the load-bearing choice, not the choice of primitive —
every headless option is SSR-safe on React 19. Runtime CSS-in-JS (Emotion, and so
MUI/Chakra) is what degrades under streaming SSR. Tailwind compiles away entirely.

**No Preflight.** `src/styles/index.css` imports Tailwind's theme and utility layers
only. A library has no business resetting a consuming app's global styles.

**Tokens are namespaced `bk-`.** Brikke's stylesheet coexists with a consuming app's
own Tailwind build, so unprefixed `bg-primary` would collide. Tokens are plain CSS
variables on `:root`, so an app rebrands by redefining `--color-bk-primary` — no
rebuild of this package required.

**The bundle is one client module.** `tsup.config.ts` prepends `"use client"` and
disables rollup treeshaking, because that pass strips module-level directives.
Consumers still treeshake via ESM output plus `sideEffects`. The tradeoff: a purely
presentational component here cannot be imported into a React Server Component.
Splitting server-safe entry points is the fix if that ever bites.

## Adding a component

1. `src/components/<name>/<name>.tsx` — wrap the Base UI part, style with `cn()`.
2. Narrow `className` to `string` via the local `Styled<T>` helper so `cn()` merges
   predictably; express state-dependent styling with `data-*` variants.
3. Add `<name>.stories.tsx`, export from `index.ts`, re-export in `src/index.ts`.
4. `pnpm verify`.
