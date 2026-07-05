/// <reference types="vite/client" />

/** 文章索引虚模块 — 由 vite.config.ts 中的 articleIndexPlugin 提供 */
declare module 'virtual:articles-index' {
  export interface ArticleMeta {
    id: string
    title: string
    description: string
    published: string
    category: string
    tags: string[]
    cover?: string
    draft?: boolean
  }

  const articles: ArticleMeta[]
  export default articles
}
