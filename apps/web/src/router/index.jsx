import { createRouter, createWebHistory } from 'vue-router'

export const tabRoutes = [
  {
    path: '/pokemon',
    component: () => import('@/views/pokemon/index.vue'),
    meta: { title: '全国图鉴', name: '图鉴', icon: () => <i-svg-pokeball /> },
  },
  {
    path: '/item',
    component: () => import('@/views/item/index.vue'),
    meta: { title: '道具列表', name: '道具', icon: () => <i-svg-bag /> },
  },
  {
    path: '/tool',
    component: () => import('@/views/tool/index.vue'),
    meta: { title: '功能大全', name: '功能', icon: () => <i-svg-badge /> },
  },
  {
    path: '/move',
    component: () => import('@/views/move/index.vue'),
    meta: { title: '招式列表', name: '招式', icon: () => <i-svg-power /> },
  },
  {
    path: '/about',
    component: () => import('@/views/about/index.vue'),
    meta: { name: '关于', icon: () => <i-svg-settings /> },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/pokemon',
    },
    ...tabRoutes,
  ],
})

export default router
