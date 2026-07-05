import { createRouter, createWebHistory } from 'vue-router'
import Detail from './components/Detail.vue'

// 页面路由（.vue 文件，放在 src/pages）
const vuePages = import.meta.glob('/src/pages/*.vue')
const vueRoutes = Object.keys(vuePages).map((path) => {
  const routePath = path.replace('/src/pages/', '/')
      .replace('.vue', '')
  return {
    path: routePath,
    component: vuePages[path]
  }
})

const routes = [
  {
    path: '/',
    component: Detail,
    children: [
      // 文章动态路由：由 ArticleViewer 按需加载 .md 文件
      { path: ':id', component: () => import('./views/ArticleViewer.vue') },
    ],
  },
  ...vueRoutes,
]
console.log(vueRoutes)
export const blogRouter = createRouter({
  history: createWebHistory(),
  routes,
  // 前进/后退保持滚动位置，新导航滚到顶部
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
})
