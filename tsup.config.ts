import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  clean: true,
  // Rollup's treeshake pass strips module-level directives, which would drop the
  // "use client" banner below and break every SSR consumer. Consumers still get
  // treeshaking via ESM output + the `sideEffects` field in package.json.
  treeshake: false,
  // Every component in Brikke is interactive, so the whole bundle is a client
  // module. Consumers on React Server Components import it from client code.
  banner: { js: '"use client";' },
  external: ['react', 'react-dom'],
});
