# Bundled typefaces

Both families ship under the SIL Open Font License 1.1, which permits bundling
and redistribution as part of this package.

| Family | Weights | Source | License |
| --- | --- | --- | --- |
| Caprasimo | 400 | [Google Fonts](https://fonts.google.com/specimen/Caprasimo) | [OFL 1.1](https://openfontlicense.org) |
| Figtree | 400–700 (variable) | [Google Fonts](https://fonts.google.com/specimen/Figtree) | [OFL 1.1](https://openfontlicense.org) |

Files are the `latin` and `latin-ext` subsets as served by Google Fonts, taken
from Caprasimo v6 and Figtree v9. Figtree is a variable font: one file per
subset covers the whole 400–700 range, so weights 400, 600, and 700 all resolve
from the same file.

To refresh them, re-request the CSS from `fonts.googleapis.com` with a browser
`User-Agent` (that header is what makes Google serve woff2), then download the
URLs it lists and update `@font-face` in `../index.css` if the version path
changed.
