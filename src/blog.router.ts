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
    // 手机端：滚动到内容区域，让标签云在上方，而不是标题栏
    if (window.innerWidth < 768) {
      return false // 不改变滚动，由 App.vue 控制滚动位置
    }
    return { top: 0 }
  },
})
