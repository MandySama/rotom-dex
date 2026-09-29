import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from '@vant/auto-import-resolver'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    // vueDevTools(),
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia'],
      resolvers: [VantResolver()],
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.js',
      },
    }),
    Components({
      include: [/\.vue/, /\.jsx/],
      resolvers: [
        VantResolver(),
        IconsResolver({
          enabledCollections: ['lucide'],
          customCollections: ['svg'],
        }),
      ],
    }),
    Icons({
      autoInstall: true,
      customCollections: {
        svg: FileSystemIconLoader('./src/assets/icons'),
      },
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: '0.0.0.0',
    strictPort: true,
    // open: true,
  },
})
