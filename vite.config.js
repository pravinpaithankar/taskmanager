import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      // Check your chunk splitting here, and adjust if needed
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.split('node_modules/')[1].split('/')[0];
          }
        }
      }
    }
  }
});
