import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true, // Clear the `dist` folder on every build
  },
  plugins: [react()],
  base: '/MedPal-WebApp/',
})