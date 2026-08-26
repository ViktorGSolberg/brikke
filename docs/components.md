# Authoring components

## Adding one

1. `src/components/<name>/<name>.tsx` — wrap the Base UI part, style with `cn()`.
2. `src/components/<name>/<name>.stories.tsx` — cover every variant and the
   disabled state.
3. `src/components/<name>/index.ts` — export the component **and every prop
   type** you declared.
4. Re-export the folder from `src/index.ts`.
5. Add a case to `scripts/ssr-smoke.mjs` — see [testing](testing.md).
6. `pnpm verify`.

Step 3 is the one that gets missed: a `SelectIconProps` that exists in
`select.tsx` but not in `index.ts` is invisible to consumers, and typecheck
won't catch it.

## `cn()`, always

`src/lib/cn.ts` wraps `clsx` + `tailwind-merge`. Compose classes through it so a
caller's `className` beats the component's own defaults by merge order rather
than by stylesheet order:

```tsx
className={cn('h-10 rounded-bk-pill border', className)}
```

Never concatenate class strings by hand, and never put the caller's `className`
anywhere but last.

## Narrow `className` with `Styled<T>`

Base UI accepts `className` as either a string or a function of component state.
Brikke narrows it to a string so `cn()` can merge predictably:

```tsx
type Styled<T> = Omit<T, 'className'> & { className?: string };

export type SelectPopupProps = Styled<React.ComponentProps<typeof BaseSelect.Popup>>;
```

This applies to components wrapping a Base UI part. A plain intrinsic wrapper
like `Button` already has a `string` className from
`React.ComponentPropsWithoutRef<'button'>` and needs no helper.

The helper is currently redeclared at the top of `field.tsx`, `dialog.tsx`, and
`select.tsx`. Copy it into a new file rather than inventing a variant; if you
find yourself writing it a fourth time, lifting all four into `src/lib/` is a
welcome cleanup.

## State goes through `data-*`, not props

Because `className` is a string, state-dependent styling is expressed as
variants on Base UI's data attributes:

```tsx
'data-[highlighted]:bg-bk-primary data-[highlighted]:text-bk-primary-fg'
'data-[disabled]:opacity-45'
'data-[starting-style]:opacity-0 data-[ending-style]:opacity-0'
```

Don't reach for `useState` to track hover, focus, or open state that Base UI
already exposes as an attribute.

## Two shapes of component

**Compound parts** — `Field`, `Dialog`, `Select`. Style the parts that need it as
local functions, then export one frozen namespace object that passes the
untouched Base UI parts straight through:

```tsx
export const Dialog = {
  Root: BaseDialog.Root,      // unstyled, passed through
  Popup: DialogPopup,         // styled locally
  Close: BaseDialog.Close,
};
```

Pass a part through unchanged unless it needs styling. Re-wrapping for symmetry
adds a layer that has to be maintained.

**Single elements** — `Button`. Use `cva` for the variant matrix and export the
`buttonVariants` function alongside the component, so consumers can apply the
same styling to a link or a custom trigger.

## Conventions worth matching

- Comments explain *why*, especially where a rule looks arbitrary — the
  `bg-transparent` line in `button.tsx` is the model.
- Arrays of class strings in `cva` base, grouped by concern with a blank line or
  comment between groups.
- `type` defaults to `'button'` on button elements.
