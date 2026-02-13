import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/C2B/',  // اسم الريبو على GitHub
  plugins: [react()],
})
