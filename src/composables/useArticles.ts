import type { Article } from '../components/article/ArticleCard.vue'

/** 文章元数据（由构建时的 virtual:articles-index 虚模块提供） */
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

// 构建时由 Vite 插件生成，只包含 frontmatter（不含正文），体积极小
// 源文件：vite.config.ts → articleIndexPlugin()
import articleIndex from 'virtual:articles-index'

/**
 * 读取所有文章的 frontmatter 元数据
 *
 * 列表页：只使用此函数返回的 frontmatter，体积极小。
 * 详情页：点击文章后通过 getArticleComponent() 动态加载正文。
 */
export function useArticles() {
  const articles = articleIndex as ArticleMeta[]

  function toArticleCard(meta: ArticleMeta, summary?: string): Article {
    return {
      id: meta.id,
      title: meta.title,
      summary: summary ?? meta.description,
      category: meta.category,
      tags: meta.tags,
      date: meta.published,
      cover: meta.cover,
    }
  }

  /**
   * 获取文章的 Vue 组件（用于详情页）
   *
   * 使用动态 import()，Vite 会自动把每篇 .md 拆成独立的 chunk。
   * 直到用户点击某篇文章时，才会加载对应的 chunk，
   * 不会影响列表页的打包体积。
   */
  function getArticleComponent(id: string) {
    return () => import(`/src/posts/${id}.md`)
  }

  return { articles, toArticleCard, getArticleComponent }
}
