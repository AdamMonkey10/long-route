import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/long-route/',
  build: {
    target: 'es2020',
    sourcemap: false,
  },
  server: {
    port: 5173,
    host: true,
  },
})
