# Brikke

A React component library wrapping [Base UI](https://base-ui.com) primitives with
Tailwind v4 styling, published as a versioned package for SPA and SSR alike.

## Before you start

- **Package manager is pnpm.** Every script, including `prepare`, shells out to
  `pnpm run`. Do not rewrite them to `npm`.
- **`pnpm verify` is the gate.** It runs typecheck → build → SSR smoke test.
  Run it before you call any change done; the SSR test only sees `dist/`, so a
  change that isn't built isn't tested.

## Two invariants

Everything else is a preference. These two are load-bearing, and breaking either
one is a bug even when the build passes:

1. **Every component renders to a string in Node with no DOM.** SPA/SSR parity is
   the reason this library exists.
2. **No runtime CSS.** Styling compiles away to a static stylesheet. No
   CSS-in-JS, no style objects computed during render.

## Deeper guidance

Read the one that matches your task — you don't need the rest.

| Doc | Read it when |
| --- | --- |
| [Architecture](docs/architecture.md) | Choosing a dependency, or wondering why the bundle is shaped this way |
| [Authoring components](docs/components.md) | Adding or changing anything under `src/components/` |
| [Styling and tokens](docs/styling.md) | Touching colours, spacing, radii, type, or `src/styles/` |
| [Testing](docs/testing.md) | Adding a component, or changing what the SSR smoke test covers |
| [Releasing](docs/releasing.md) | Cutting a version or changing the build output |
