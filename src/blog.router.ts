import { createRouter, createWebHistory } from 'vue-router'

// 页面路由（.vue 文件，放在 src/pages）
const vuePages = import.meta.glob('/src/components/**/*.vue')
console.log("vuePages",vuePages)
const vueRoutes = Object.keys(vuePages).map((path) => {
  const routePath = path.replace('/src/components/', '/')
      .replace('.vue', '')
  return { path: routePath, component: vuePages[path] }
})

const routes = [
  // 博客页面由 App.vue 根据 route.params.id 直接控制显示，
  // 不需要在此定义路由。
  ...vueRoutes,
]
console.log("routes",routes)
export const blogRouter = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
})
