import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dns from 'dns';

dns.setDefaultResultOrder('verbatim');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve:{
    alias:{
      '@': '/src'
    },
  },
  server:{
    //localhost:3000
    host: 'localhost',
    port: 3000,
    strictPort: true,
  }
})
