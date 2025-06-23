import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
  build: {
    rollupOptions: {
      external: ['prop-types'],
      output: {
        globals: {
          'prop-types': 'PropTypes'
        },
        manualChunks: {
          vendor: ['react', 'react-dom'],
          mui: ['@mui/material']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
})