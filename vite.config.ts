/*
 * :file description: 
 * :name: /vue/vite.config.ts
 * :author:张德志
 * :copyright: (c) 2025, Xiaozhi
 * :date created: 2025-01-11 14:06:39
 * :last editor: 张德志
 * :date last edited: 2025-01-11 15:33:15
 */
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    VueSetupExtend(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
