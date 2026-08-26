/*
 * Tailwind emits `url(./fonts/…)` into dist/styles.css verbatim, so the woff2
 * files have to sit next to the built stylesheet. Node's fs rather than `cp`
 * so the build works on Windows too.
 */
import { cp } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const from = fileURLToPath(new URL('../src/styles/fonts', import.meta.url));
const to = fileURLToPath(new URL('../dist/fonts', import.meta.url));

await cp(from, to, { recursive: true });
console.log('fonts → dist/fonts');
