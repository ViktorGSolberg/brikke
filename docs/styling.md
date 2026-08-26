# Styling and tokens

Two files: `src/styles/theme.css` holds the tokens, `src/styles/index.css`
assembles the shipped stylesheet. Components consume tokens only.

## Every token is `bk-` namespaced

Brikke's stylesheet coexists with a consuming app's own Tailwind build, so an
unprefixed `bg-primary` would collide. There are no exceptions to the prefix.

Tokens land on `:root` as plain CSS variables, so an app rebrands by redefining
`--color-bk-primary` without rebuilding this package. That's a supported use —
don't introduce styling that can't be retargeted this way.

## Never hard-code a value in a component

If a component needs a colour, radius, shadow, or font that isn't a token, add
the token. A raw hex or `rounded-[12px]` in a component file is a bug: it can't
be rebranded and it won't follow dark mode.

The exception already in the codebase is small type sizes (`text-[13px]`,
`text-[11px]`) where the Tailwind scale has no matching step. Keep that
exception narrow.

## The palette is Organic

A cream-and-sand ground, terracotta accent, sage second voice, Caprasimo over
Figtree, radii from 16px containers up to full pills. Values are read straight
off the design system, and each token carries a comment naming its Organic
source.

**Two things are derived, not read** — both marked `DERIVED` in `theme.css`:

- **`--color-bk-danger`.** Organic has no destructive role. Built in the same
  OKLCH lightness band as `accent-500`, chroma raised and hue pulled to red, so
  it warns without leaving the palette's temperature.
- **The whole dark theme.** Organic is a light system and warns against
  desaturating into greys, so dark mode reads its neutral ramp from the dark end
  rather than inverting: ink becomes `neutral-900`, the accent lifts to
  `accent-400`.

Keep that annotation habit. A future reader needs to know which values are
authoritative and which are judgement calls.

## Dark mode

Opt-in via `.dark` or `[data-theme="dark"]`, wrapped in `:where()` so
specificity stays at zero and consumer overrides on `:root` still win. Preserve
the `:where()` — without it, rebranding breaks in dark mode only.

Portalled popups mount on `<body>`, so the attribute has to live on
`document.documentElement`, not a wrapper div. `.storybook/preview.ts` does this
in a decorator.

## Geometry

Three radii, and the choice is semantic rather than by size:

| Token | Value | Used for |
| --- | --- | --- |
| `--radius-bk-pill` | `999px` | Controls — buttons, inputs, tags, select trigger, select items |
| `--radius-bk` | `1rem` | Containers and popups |
| `--radius-bk-lg` | `2rem` | Dialogs |

Organic asks for air around rounded shapes, so horizontal padding runs one step
wider than a square-cornered equivalent would need.

Elevation is tuned to the warm ground rather than to black — shadows are OKLCH
browns, not neutral greys. Overlays lift with shadow alone, no hairline border.

## Type

`--font-bk-display` (Caprasimo, one weight) for titles and button faces;
`--font-bk-sans` (Figtree, variable 400–700) for everything else.

The woff2 subsets live in `src/styles/fonts/` and are declared with `@font-face`
in `index.css`. Nothing is fetched at runtime.

Figtree is variable: one file per subset spans the whole 400–700 range, which is
what the `font-weight: 400 700` range on the `@font-face` unlocks. Adding a
weight needs no new file — narrowing that range would break 600 and 700.

`scripts/copy-fonts.mjs` copies the directory into `dist/fonts/` after the CSS
build, because Tailwind emits `url(./fonts/…)` into `dist/styles.css` verbatim.
If you move the fonts, update both the `@font-face` URLs and that script.

Refreshing the files: re-request the CSS from `fonts.googleapis.com` with a
browser `User-Agent` — that header is what makes Google serve woff2 rather than
ttf — then download the URLs it lists. Details in
`src/styles/fonts/LICENSE.md`.

## No Preflight

`index.css` takes Tailwind's theme and utility layers only, never
`@import "tailwindcss"`. See [architecture](architecture.md#no-preflight) for
why, and for the UA-default papercuts it causes.
