import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// Used by Storybook only — the publishable bundle is built by tsup.
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
