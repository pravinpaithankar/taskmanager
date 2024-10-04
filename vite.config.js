import { defineConfig } from 'vite';

export default defineConfig({
  root: 'public', // Specify the correct root directory
  build: {
    outDir: '../dist', // Output build files to the correct location
    rollupOptions: {
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
