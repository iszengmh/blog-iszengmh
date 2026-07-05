// router/index.ts
import {createMemoryHistory, createRouter} from 'vue-router'

// 扫描 docs 目录下所有 .md 文件[reference:2]
const postPages = import.meta.glob('/src/posts/*.md')
const vuePages = import.meta.glob('/src/components/*.vue')

const postRoutes =
    Object.keys(postPages).map((path) => {
      const routePath = path.
      replace('/src/posts', '')
          .replace('.md', '')
          .replace(/\s+/g, '-')//空格转连字符
          .toLowerCase()
      return {
        path: routePath,
        // ✅ 直接赋值这个函数，Vue Router 在跳转时会自动执行它加载组件
        component: postPages[path]
      }
    })
  const vueRoutes=Object.keys(vuePages).map((path)=>{
      console.log(path)
      const vuePath=path.replace('/src/components', '')
          .replace('.vue', '')
      return {
        path: vuePath,
        // ✅ 直接赋值这个函数，Vue Router 在跳转时会自动执行它加载组件
        component: vuePages[path]
      }
  })

const routes = [
  ...postRoutes,
  ...vueRoutes
]
console.log(routes)
export const blogRouter = createRouter({
  history: createMemoryHistory(),
  routes,
})