import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Use '/' for local development, '/challenge/' for production builds
  // This ensures local dev works correctly while production builds work on GitHub Pages
  const base = command === 'build' ? '/challenge/' : '/'
  
  return {
    plugins: [react()],
    base: base,
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
    }
  }
})

