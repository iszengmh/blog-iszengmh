import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { cloudflare } from "@cloudflare/vite-plugin";

// https://vite.dev/config/
export default defineConfig({
  plugins: [// 不再需要 include .md，改用 ?raw + marked 运行时渲染
  vue(), cloudflare()],
})