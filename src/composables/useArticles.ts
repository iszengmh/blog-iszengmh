import type { Article } from '../components/article/ArticleCard.vue'
import { postAddress } from '../config'

/** 文章元数据 */
export interface ArticleMeta {
  id: string
  path: string
  title: string
  description: string
  published: string
  category: string
  tags: string[]
  cover?: string
  /** frontmatter 中的 image 字段（已补全 URL） */
  image?: string
  /** frontmatter 中的 images 字段（已补全 URL） */
  images?: string[]
  draft?: boolean
}

/**
 * 从原始 markdown 文本中提取 YAML frontmatter
 *
 * 手动解析而非 gray-matter，避免 YAML 解析错误拖垮整个页面。
 * 只解析我们关心的字段，不对外部文件做完整 YAML 校验。
 */
function parseFrontmatter(raw: string): Record<string, any> {
  const result: Record<string, any> = {}

  // 匹配 ---\n...\n--- 之间的内容
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---/)
  if (!match) return result

  const yaml = match[1]

  for (const line of yaml.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue

    // 匹配 key: value
    const colonIdx = trimmed.indexOf(':')
    if (colonIdx === -1) continue

    const key = trimmed.slice(0, colonIdx).trim()
    let value: any = trimmed.slice(colonIdx + 1).trim()

    if (!key) continue

    // 跳过已存在的字段（处理重复 key）
    if (key in result) continue

    // 解析数组 [a, b, c]
    if (value.startsWith('[') && value.endsWith(']')) {
      value = value.slice(1, -1)
        .split(',')
        .map((item:String) => item.trim().replace(/^['"]|['"]$/g, ''))
        .filter(Boolean)
    }
    // 解析布尔值
    else if (value === 'true') value = true
    else if (value === 'false') value = false
    // 去除引号
    else value = value.replace(/^['"]|['"]$/g, '')

    result[key] = value
  }

  return result
}

/**
 * 解析图片路径：如果是 assets/images/ 开头的相对路径，补全为绝对 URL
 * 支持字符串和数组两种格式
 */
function resolveImagePath(path: string | string[] | undefined): string | string[] | undefined {
  if (!path) return undefined

  if (Array.isArray(path)) {
    return path.map((p) =>
      typeof p === 'string' && p.startsWith('assets/images/')
        ? postAddress + p
        : p,
    )
  }

  if (path.startsWith('assets/images/')) {
    return postAddress + path
  }
  return path
}

/**
 * 读取所有 markdown 文章的 frontmatter，返回文章元数据列表
 *
 * 核心思路：
 * - 使用 `query: '?raw'` 将 .md 文件作为纯文本导入
 *   （完全绕开 unplugin-vue-markdown 和 vue 的插件流水线）
 * - 手动解析 YAML frontmatter，任意文件出错不影响整体
 * - 按 published 日期倒序排列
 */
export function useArticles() {
  // 以纯文本方式读取所有 .md 文件 — 无插件转换，零编译错误
  const rawModules: Record<string, string> = import.meta.glob(
    '/src/posts/*.md',
    { eager: true, query: '?raw', import: 'default' },
  )

  const articles: ArticleMeta[] = Object.entries(rawModules)
    .map(([filepath, raw]) => {
      const id = filepath.split('/').pop()?.replace(/\.md$/, '') ?? ''
      const frontmatter = parseFrontmatter(raw)

      return {
        id,
        path: filepath,
        title: frontmatter.title ?? id,
        description: frontmatter.description ?? '',
        published: frontmatter.published ?? '1970-01-01',
        category: frontmatter.category ?? '未分类',
        tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
        cover: resolveImagePath(frontmatter.cover || frontmatter.image || undefined) as string | undefined,
        image: resolveImagePath(frontmatter.image || undefined) as string | undefined,
        images: resolveImagePath(frontmatter.images) as string[] | undefined,
        draft: frontmatter.draft === true,
      }
    })
    // 过滤草稿
    .filter((a) => !a.draft)
    // 按发布时间倒序
    .sort((a, b) => {
      const da = new Date(a.published).getTime()
      const db = new Date(b.published).getTime()
      return Number.isNaN(db) || Number.isNaN(da) ? 0 : db - da
    })

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


  return { articles, toArticleCard }
}
