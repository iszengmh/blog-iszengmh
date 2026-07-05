import { defineConfig, loadEnv, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import Markdown from 'unplugin-vue-markdown/vite'
import { readFileSync, readdirSync } from 'fs'
import { resolve } from 'path'
import { parseFrontmatter } from './src/utils/parse-frontmatter.js'

/**
 * 文章索引虚模块
 *
 * 在构建时扫描所有 .md 文件，只提取 frontmatter（不包含正文），
 * 避免完整文章内容被打包进 JS 导致体积膨胀。
 */
function articleIndexPlugin(): Plugin {
  const VIRTUAL_ID = 'virtual:articles-index'
  const RESOLVED_ID = '\0' + VIRTUAL_ID

  return {
    name: 'article-index',
    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID
    },
    load(id) {
      if (id !== RESOLVED_ID) return

      const postsDir = resolve(__dirname, 'src/posts')

      // 扫描所有 .md 文件
      const files = readdirSync(postsDir).filter(
        (f: string) => f.endsWith('.md'),
      )

      const articles = files
        .map((file: string) => {
          const raw = readFileSync(resolve(postsDir, file), 'utf-8')
          const frontmatter = parseFrontmatter(raw)
          const id = file.replace(/\.md$/, '')

          return {
            id,
            title: frontmatter.title ?? id,
            description: frontmatter.description ?? '',
            published: frontmatter.published ?? '1970-01-01',
            category: frontmatter.category ?? '未分类',
            tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
            cover: resolveImagePath(frontmatter.cover || frontmatter.image),
            draft: frontmatter.draft === true,
          }
        })
        .filter((a: any) => !a.draft)
        .sort((a: any, b: any) => {
          const da = new Date(a.published).getTime()
          const db = new Date(b.published).getTime()
          return Number.isNaN(db) || Number.isNaN(da) ? 0 : db - da
        })

      return `export default ${JSON.stringify(articles)}`
    },
  }
}

/**
 * 解析图片路径：如果是 assets/images/ 开头的相对路径，补全为绝对 URL
 * 这里只用于构建时（vite.config.ts），通过 loadEnv 获取 postAddress
 */
function resolveImagePath(
  path: string | undefined,
  postAddress?: string,
): string | undefined {
  if (!path) return undefined
  if (path.startsWith('assets/images/')) {
    return (postAddress ?? '') + path
  }
  return path
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const postAddress =
    mode === 'development'
      ? '/src/posts/'
      : (env.VITE_WEB_ADDRESS || 'http://localhost:5173/') + 'posts/'

  return {
    build: {
      sourcemap: process.env.NODE_ENV === 'development',
    },
    plugins: [
      articleIndexPlugin(),
      vue({ include: [/\.vue$/, /\.md$/] }),
      Markdown({
        exportFrontmatter: true,
        markdownOptions: {
          html: true,
          linkify: true,
          typographer: true,
        },
        markdownSetup(md) {
          const defaultImageRenderer =
            md.renderer.rules.image ||
            function (tokens, idx, options, _env, self) {
              return self.renderToken(tokens, idx, options)
            }

          md.renderer.rules.image = function (
            tokens,
            idx,
            options,
            _env,
            self,
          ) {
            const token = tokens[idx]
            const srcAttr = token.attrIndex('src')
            if (srcAttr >= 0 && token.attrs) {
              const src = token.attrs[srcAttr][1]
              if (src.startsWith('assets/images/')) {
                token.attrs[srcAttr][1] = postAddress + src
              }
            }
            return defaultImageRenderer(tokens, idx, options, _env, self)
          }
        },
      }),
    ],
  }
})
