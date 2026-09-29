import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/pokemon',
    },
    {
      path: '/pokemon',
      component: () => import('@/views/pokemon/index.vue'),
      meta: { title: '全国图鉴' },
    },
    {
      path: '/item',
      component: () => import('@/views/item/index.vue'),
      meta: { title: '道具列表' },
    },
    {
      path: '/tool',
      component: () => import('@/views/tool/index.vue'),
      meta: { title: '功能大全' },
    },
    {
      path: '/move',
      component: () => import('@/views/move/index.vue'),
      meta: { title: '招式列表' },
    },
    {
      path: '/about',
      component: () => import('@/views/about/index.vue'),
    },
  ],
})

export default router
