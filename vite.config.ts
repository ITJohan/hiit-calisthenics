import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: 'src/hiit-calisthenics.ts',
      formats: ['es'],
    },
    rollupOptions: {
      external: /^lit/,
    },
  },
});
