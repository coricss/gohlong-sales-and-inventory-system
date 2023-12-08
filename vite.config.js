import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dns from 'dns';
import path from 'path';

dns.setDefaultResultOrder('verbatim');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve:{
    alias:{
      '@': path.resolve(__dirname, './src'),
    },
  },
  server:{
    //localhost:3000
    host: 'localhost',
    port: 3000,
    strictPort: true,
  },
  build: {
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html')
      },
    }
  }
})
