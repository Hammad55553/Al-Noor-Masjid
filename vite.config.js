import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api/sunni': {
        target: 'https://hadithapi.pages.dev/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/sunni/, '')
      },
      '/api/shia': {
        target: 'https://www.thaqalayn-api.net/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/shia/, '')
      }
    }
  }
})
