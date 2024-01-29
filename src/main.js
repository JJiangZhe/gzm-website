import App from './App.vue'
import { createApp } from 'vue'
import router from '@/router'

import useVueGlobalConfig from '@/vue.config'

import '@/style/main.scss'
/* 导入全局样式 */
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import { initBMapApiLoader } from 'vue-bmap-gl'
import 'vue-bmap-gl/dist/style.css'
initBMapApiLoader({
  ak: 'Q4a9KW0Zk6jkQcwIRspYmqS1O0ONhOtP',
})

const app = createApp(App)

;(() => {
  /* @desc: 加载全局配置 */
  useVueGlobalConfig(app)

  app.use(router).use(ElementPlus).mount('#app')
})()
