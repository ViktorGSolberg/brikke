# Brikke

A small React component library, built on [Base UI](https://base-ui.com) primitives
and styled with Tailwind CSS v4. Headless behaviour, own styling, SPA and SSR alike.

## Consuming it

```tsx
import { Button, Field } from 'brikke';
import 'brikke/styles.css'; // once, at your app root
```

The stylesheet is prebuilt and self-contained: consuming apps do **not** need to
add Brikke to a Tailwind `content`/`@source` config, do not need Tailwind at all,
and the package makes no network request — the two typefaces ship with it.

Brikke installs as a git dependency rather than from npm:

```jsonc
"brikke": "github:ViktorGSolberg/brikke#v0.0.2"
```

Installing runs a `prepare` build on your machine, which **requires pnpm on your
PATH**.

## Theming

Every token is a plain CSS variable on `:root`, namespaced `bk-` so it can't
collide with your own Tailwind theme. Rebrand by redefining them — no rebuild of
this package:

```css
:root {
  --color-bk-primary: #3f6f52;
}
```

Dark mode is opt-in via `.dark` or `[data-theme="dark"]` on the document element.

## Scripts

| Command | What it does |
| --- | --- |
| `pnpm storybook` | Component workshop on :6006 |
| `pnpm build` | Emit `dist/index.js`, `dist/index.d.ts`, `dist/styles.css`, `dist/fonts/` |
| `pnpm typecheck` | `tsc --noEmit` across src, stories, and config |
| `pnpm test:ssr` | Render the built package in Node with no DOM |
| `pnpm verify` | All of the above — run before tagging a release |

## Contributing

Start at [AGENTS.md](AGENTS.md), which links to the detailed guides in
[`docs/`](docs/) — [architecture](docs/architecture.md),
[authoring components](docs/components.md), [styling and tokens](docs/styling.md),
[testing](docs/testing.md), and [releasing](docs/releasing.md).
