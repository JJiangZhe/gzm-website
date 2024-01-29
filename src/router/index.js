import { createRouter, createWebHashHistory } from 'vue-router'
import routes from '@/router/routes'

const router = createRouter({
  history: createWebHashHistory('/'),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { top: 0 }
  },
})

/*
 * 全局前置路由钩子
 * */
router.beforeEach((to, from, next) => {
  next()
})

/*
 * 全局解析守卫
 *   做一些全局检查
 * */
router.beforeResolve(async (to) => {})

/*
 * 全局后置钩子
 * 你也可以注册全局后置钩子，然而和守卫不同的是，这些钩子不会接受 next 函数也不会改变导航本身
 * 它们对于分析、更改页面标题、声明页面等辅助功能以及许多其他事情都很有用。
 * */
router.afterEach((to, from, failure) => {})

export default router
