import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),  // 不再需要 include .md，改用 ?raw + marked 运行时渲染
  ],
})
