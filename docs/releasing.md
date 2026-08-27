# Releasing

Brikke is consumed as a **git dependency**, not from npm. `private: true` in
`package.json` enforces that by blocking an accidental publish.

```jsonc
"brikke": "github:ViktorGSolberg/brikke#v0.0.3"
```

## Cutting a version

1. `pnpm verify` — must be fully green.
2. Bump `version` in `package.json`.
3. Commit, then tag: `git tag -a vX.Y.Z -m "Brikke X.Y.Z — <what changed>"`.
4. `git push origin main && git push origin vX.Y.Z`.

**Never move a published tag.** Consumers pin to it; repointing means anyone who
already installed keeps different code under the same ref while fresh installs
get the new one. Cut a new version instead.

## The `prepare` hook

`"prepare": "pnpm run build"` runs on the *consumer's* machine when they install
the git dependency — that's what produces `dist/`, since `dist/` is gitignored
and never committed.

**This requires pnpm on the consumer's PATH.** It's a deliberate choice to keep
the toolchain uniform, and it reverses commit `50aa26a`, which had made these
scripts package-manager agnostic for exactly this reason. If a consumer reports
a failing install, `prepare` is the first place to look, and switching that one
line back to `npm run build` is the fix.

## Build output

`pnpm build` runs three steps in order, and the order matters — `tsup` cleans
`dist/` first, so anything that runs before it is discarded:

| Step | Produces |
| --- | --- |
| `build:js` (tsup) | `dist/index.js`, `dist/index.d.ts` |
| `build:css` (tailwind) | `dist/styles.css` |
| `build:fonts` (node) | `dist/fonts/*.woff2` |

`build:fonts` exists because Tailwind writes `url(./fonts/…)` into
`dist/styles.css` verbatim, so the woff2 files must sit beside it. It uses
Node's `fs.cp` rather than `cp` so the build works on Windows.

The `files` field ships `dist` only. If you add a build artifact outside
`dist/`, it will not reach consumers.
