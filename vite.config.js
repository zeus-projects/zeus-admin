import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  server: {
    port: 8080, //端口号
    open: true, //启动后是否自动打开浏览器
    proxy: {
      '/api': {
        target: 'http://ceshi13.dishait.cn',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  resolve: {
    alias: {
      // 指定 ~ 为 src 目录的别名
      "@": path.resolve(__dirname, "src")
    }
  },
   plugins: [
      vue(),
      WindiCSS(),
      AutoImport({
         resolvers: [ElementPlusResolver()],
      }),
      Components({
         resolvers: [ElementPlusResolver()],
      }),
   ]
})
