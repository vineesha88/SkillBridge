import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// For GitHub Pages deployment, replace YOUR-REPOSITORY-NAME below
// with your actual repository name (e.g. '/skillbridge/').
// If running locally, you can also use './' or remove the base entirely.
export default defineConfig({
  plugins: [react()],
  base: '/YOUR-REPOSITORY-NAME/',
})
