# Architecture

Why the project is shaped the way it is. These are settled decisions — if you
want to change one, that's a conversation, not a refactor.

## Base UI directly, not shadcn/ui

shadcn/ui made Base UI its default primitive in July 2026, so the two are the
same stack at different layers. Brikke ships as a versioned package rather than
copy-in source, so consuming apps upgrade through one lever instead of drifting
per-app copies.

## React only

Base UI is React-only by construction. If Vue or Svelte ever become real, the
migration target is Ark UI — one Zag.js state machine drives every adapter, so
parity is structural instead of hand-maintained.

Nothing here is named `*-react`, which keeps a `brikke-react` / `brikke-vue`
split available. Preserve that: don't bake `react` into public export names.

## Zero-runtime CSS is the load-bearing choice

Not the choice of primitive — every headless option is SSR-safe on React 19.
Runtime CSS-in-JS (Emotion, and therefore MUI and Chakra) is what degrades under
streaming SSR. Tailwind compiles away entirely.

This is why the invariant in `AGENTS.md` is "no runtime CSS" rather than "use
Tailwind". A styling approach that compiles to a static stylesheet is fine; one
that computes styles during render is not.

## No Preflight

`src/styles/index.css` imports Tailwind's theme and utility layers only. A
library has no business resetting a consuming app's global styles.

The cost shows up in components: nothing zeroes the UA's
`background-color: buttonface`, which is why `button.tsx` sets `bg-transparent`
in its base classes. Expect similar UA-default papercuts on any new form
control, and fix them in the component rather than by adding a reset.

## The bundle is one client module

`tsup.config.ts` prepends `"use client"` and disables Rollup treeshaking,
because that pass strips module-level directives. Consumers still treeshake via
ESM output plus the `sideEffects` field.

The tradeoff: a purely presentational component here cannot be imported into a
React Server Component. If that ever bites, the fix is a separate server-safe
entry point — not removing the banner.

## Fonts are vendored

`src/styles/fonts/` holds the woff2 subsets for Caprasimo and Figtree, declared
with `@font-face` in `src/styles/index.css`. The package makes no network
request and works under a strict CSP. See [styling](styling.md#type) for the
mechanics and `src/styles/fonts/LICENSE.md` for provenance.
