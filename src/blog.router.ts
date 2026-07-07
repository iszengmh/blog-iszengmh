import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('./pages/HomePage.vue'),
  },
  {
    path: '/archives',
    name: 'archives',
    component: () => import('./pages/ArchivesPage.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('./pages/AboutPage.vue'),
  },
  {
    // 文章详情 — 放最后以免抢在其他路由前面
    path: '/:id',
    name: 'article',
    component: () => import('./pages/ArticlePage.vue'),
  },
]

export const blogRouter = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
})
