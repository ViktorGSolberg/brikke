# Testing

There is no unit test suite. Two things stand in for one, and both are cheap to
extend — extend them rather than adding a test runner without discussing it.

## The SSR smoke test

`scripts/ssr-smoke.mjs`, run by `pnpm test:ssr`.

It imports from **`../dist/index.js`**, not from source. That's deliberate: it
tests the artifact a consumer actually installs, including the `"use client"`
banner and the externalised React. Two consequences:

- Build before you test. `pnpm verify` sequences this correctly; running
  `pnpm test:ssr` alone tests whatever was last built.
- A source-only change that isn't rebuilt will pass while being broken.

Each case renders with `renderToString` in Node with no DOM and asserts
non-empty output. Add a case for every new component:

```js
Button: h(Button, { variant: 'danger', size: 'lg' }, 'Delete project'),
```

Use `createElement` — the file is plain `.mjs`, not JSX.

### Beyond "it rendered"

Two cases assert something sharper, and they're the interesting ones:

- **Dialog** is rendered closed, so it must produce its trigger and nothing
  else. No portal on the server.
- **Select** asserts the selected item's *label* appears in the server HTML.
  Without that, a closed Select flashes empty before hydration — which renders
  fine and is still a real bug.

When you add a component, ask what its equivalent failure is. A component that
holds a value, defers to a portal, or renders differently by state deserves an
assertion beyond byte count.

## Storybook

`pnpm storybook` on :6006. Stories are the visual review surface, so cover the
full variant matrix, not just the happy path — `button.stories.tsx` has an
`AllVariants` story rendering every variant across every size.

The theme toolbar switches light/dark. Check both when touching styling; dark
mode is derived rather than read off the design system, so it's where colour
mistakes surface.

`.storybook/preview.css` supplies the minimal reset a consuming app would
already have, because Brikke ships without Preflight. It is Storybook-only
chrome — nothing there ships.

## Typecheck

`pnpm typecheck` covers `src`, `.storybook`, and the config files. Notable
strictness: `noUncheckedIndexedAccess`, `noUnusedLocals`, and
`verbatimModuleSyntax` — so type-only imports need the `type` keyword.
