import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/mystery-choice/' : '/',
  resolve:{
    alias: {
      '@' : path.resolve(__dirname, './src'),
      '@components' : path.resolve(__dirname, './src/components'),
      '@pages' : path.resolve(__dirname, './src/pages'),
      '@assets' : path.resolve(__dirname, './src/assets'),
    }
  },
  plugins: [vue()],
})
