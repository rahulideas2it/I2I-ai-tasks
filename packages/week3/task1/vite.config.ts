import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/shopping-cart/',
  plugins: [react()],
  server: {
    port: 3002
  },
  build: {
    assetsDir: 'assets'
  }
});
