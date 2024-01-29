export default [
  {
    path: '/',
    redirect: {
      name: 'Home',
    },
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/home/index.vue'),
  },
  {
    path: '/mall',
    name: 'Mall',
    component: () => import('@/views/mall/index.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/about/index.vue'),
  },
  {
    path: '/recharge',
    name: 'Recharge',
    component: () => import('@/views/recharge/index.vue'),
  },
  {
    path: '/agreement',
    name: 'agreement',
    component: () => import('@/views/mall/agreement.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/error404/error404.vue'),
  },
]
