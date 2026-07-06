import { createRouter, createWebHistory } from 'vue-router'
import Archives from './components/Archives.vue'
import About from './components/About.vue'

// 页面路由（.vue 文件，放在 src/pages）
const vuePages = import.meta.glob('/src/components/**/*.vue')
const vueRoutes = Object.keys(vuePages).map((path) => {
  const routePath = path.replace('/src/components/', '/')
      .replace('.vue', '')
  return { path: routePath, component: vuePages[path] }
})

const routes = [
  ...vueRoutes,
  // 非首页的菜单路由（首页 / 由 App.vue 直接处理，不需路由定义）
  { path: '/archives', component: Archives,props: { isMenu: true }},
  { path: '/about', component: About,props: { isMenu: true, }},
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
