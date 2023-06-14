import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        // Entrypoints
        main: resolve(__dirname, 'src/popup/popup.html'),
        overlay: resolve(__dirname, 'src/overlay/overlay.html'),

        // Static scripts files
        background: resolve(__dirname, 'src/static/background.ts'),
        content: resolve(__dirname, 'src/static/content.ts'),
      },
      output: {
        entryFileNames: "src/scripts/[name].js"
      }
    }
  }
})
