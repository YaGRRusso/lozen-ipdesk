import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api/v2/help_center': 'https://frontend-importacao.zendesk.com',
    },
  },
  plugins: [react(), tsconfigPaths()],
})
