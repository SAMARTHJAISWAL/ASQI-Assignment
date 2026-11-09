import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // Same port Create React App used, so existing bookmarks/docs keep working.
    port: 3000,
  },
  preview: {
    port: 3000,
  },
  build: {
    // Keep CRA's output folder.
    outDir: 'build',
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.js',
  },
});
