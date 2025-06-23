import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/notes/',
  plugins: [react()],
  server: {
    port: 3001
  },
  build: {
    assetsDir: 'assets'
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          mui: ['@mui/material']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
})