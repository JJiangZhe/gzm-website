import { defineConfig } from 'vite'
// import styleImport from 'vite-plugin-style-import'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VueBmapGlResolver } from '@vuemap/unplugin-resolver'
import compressPlugin from 'vite-plugin-compression'
const { resolve } = require('path')

/*
 * vite 配置文档
 * https://vitejs.dev/config/
 * */

export default defineConfig({
  root: './',
  base: './',
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, 'src') }],
  },
  server: {
    host: '0.0.0.0',
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  plugins: [
    vue(),
    legacy({
      targets: ['ie >= 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
    }),
    AutoImport({
      resolvers: [VueBmapGlResolver()],
    }),
    Components({
      resolvers: [VueBmapGlResolver()],
    }),
    compressPlugin({
      // gzip静态资源压缩
      verbose: true, // 默认即可
      disable: false, // 开启压缩(不禁用)，默认即可
      deleteOriginFile: false, // 删除源文件
      threshold: 10240, // 压缩前最小文件大小 10K
      algorithm: 'gzip', // 压缩算法
      ext: '.gz', // 文件类型
    }),
  ],
  build: {
    assetsInlineLimit: 8192,
    brotliSize: true,
    chunkSizeWarningLimit: 50,
  },
})
