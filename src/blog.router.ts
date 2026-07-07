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
  // 首页 / 由 App.vue 直接渲染内容，路由仅占位用
  { path: '/', component: { template: '' } },
  ...vueRoutes,
  { path: '/archives', component: Archives },
  { path: '/about', component: About },
  // 文章页 /:id 也由 App.vue 处理，同样加个占位（必须放最后，以免抢在其他路由前面）
  { path: '/:pathMatch(.*)*', component: { template: '' } },
]
console.log("routes",routes)
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
