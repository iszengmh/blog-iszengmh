<script setup lang="ts">
/**
 * 文章查看器
 *
 * 通过 ?raw 动态加载 .md 文件的原始内容，
 * 用 marked 在运行时渲染为 HTML。
 * 完全绕过 Markdown/Vue 编译插件，杜绝编译错误。
 */
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Marked } from 'marked'

const route = useRoute()
const html = ref('')
const loading = ref(true)
const error = ref('')

const marked = new Marked({
  breaks: true,
  gfm: true,
})

async function loadArticle(id: string) {
  loading.value = true
  error.value = ''
  html.value = ''

  try {
    // ?raw 导入 — 获取纯文本，不经任何插件编译
    const mod = await import(`../posts/${id}.md?raw`)
    const raw = mod.default as string

    // 提取 frontmatter 和正文
    const body = raw.replace(/^---[\s\S]*?---\n*/, '')

    // 渲染 markdown → HTML
    html.value = marked.parse(body.trim()) as string
  } catch (e: any) {
    console.error('加载文章失败:', e)
    error.value = e.message || '加载失败'
  } finally {
    loading.value = false
  }
}

// 路由变化时重新加载
watch(() => route.params.id, (id) => {
  if (id && typeof id === 'string') loadArticle(id)
}, { immediate: true })
</script>

<template>
  <div class="article-viewer">
    <!-- 加载中 -->
    <div v-if="loading" class="viewer-state">
      <a-spin size="large" tip="加载文章中..." />
    </div>

    <!-- 加载失败 -->
    <a-result v-else-if="error" status="error" title="加载失败" :sub-title="error">
      <template #extra>
        <a-button @click="loadArticle(route.params.id as string)">重试</a-button>
      </template>
    </a-result>

    <!-- 文章正文 -->
    <div v-else class="markdown-body" v-html="html" />
  </div>
</template>

<style scoped>
.article-viewer {
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
  background: #fff;
  border-radius: 8px;
  min-height: 60vh;
}

.viewer-state {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 40vh;
}
</style>

<!-- 全局 Markdown 样式（非 scoped，作用到 v-html 内容） -->
<style>
.markdown-body h1,
.markdown-body h2,
.markdown-body h3 {
  margin-top: 1.5em;
  margin-bottom: 0.5em;
  font-weight: 600;
  color: #1a1a1a;
}

.markdown-body p {
  margin: 0.8em 0;
  line-height: 1.8;
  color: #333;
}

.markdown-body code {
  padding: 2px 6px;
  border-radius: 4px;
  background: #f5f5f5;
  font-size: 0.9em;
}

.markdown-body pre {
  padding: 16px;
  border-radius: 6px;
  background: #f6f8fa;
  overflow-x: auto;
}

.markdown-body pre code {
  padding: 0;
  background: none;
}

.markdown-body img {
  max-width: 100%;
  border-radius: 4px;
}

.markdown-body table {
  width: 100%;
  border-collapse: collapse;
  margin: 1em 0;
}

.markdown-body th,
.markdown-body td {
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
  text-align: left;
}

.markdown-body th {
  background: #f5f5f5;
  font-weight: 600;
}

.markdown-body blockquote {
  margin: 1em 0;
  padding: 8px 16px;
  border-left: 4px solid #1890ff;
  background: #f0f5ff;
  color: #555;
}

.markdown-body a {
  color: #1890ff;
}

.markdown-body ul,
.markdown-body ol {
  padding-left: 2em;
  line-height: 1.8;
}

.markdown-body hr {
  margin: 2em 0;
  border: none;
  border-top: 1px solid #e8e8e8;
}
</style>
