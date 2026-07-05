// router/index.ts
import { createRouter, createWebHistory } from 'vue-router'

// 扫描 docs 目录下所有 .md 文件[reference:2]
const pages = import.meta.glob('/src/posts/*.md',{

})

console.log(pages)
// 生成路由配置
const routes = Object.keys(pages).map((path) => {
  // 例如: /docs/about.md -> /about
  const routePath = path
      .replace(/^\/src\/docs/, '')      // 去掉前缀
      .replace(/\.md$/, '')              // 去掉扩展名
      .replace(/\/index$/, '')           // index 文件映射到父路径
      .replace(/\/_/, '/:')              // 支持动态参数（如 _id -> :id）

  return {
    path: routePath,
    component: pages[path],        // 异步加载组件
  }
})

export const blogRouter = createRouter({
  history: createWebHistory(),
  routes,
})