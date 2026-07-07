<script setup lang="ts">
/**
 * 文章查看器
 *
 * 通过 ?raw 动态加载 .md 文件的原始内容，
 * 用 marked 在运行时渲染为 HTML。
 */
import { ref, watch } from 'vue'
import { Marked } from 'marked'

const props = defineProps<{ id: string }>()

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
  console.log("loadArticle",id)
  try {
    const mod = await import(`../../posts/${id}.md?raw`)
    const raw = mod.default as string
    const body = raw.replace(/^---[\s\S]*?---\n*/, '')
    html.value = marked.parse(body.trim()) as string
  } catch (e: any) {
    console.error('加载文章失败:', e)
    error.value = e.message || '加载失败'
  } finally {
    loading.value = false
  }
}

watch(()=>props.id, (id) => {
    if (id) loadArticle(id)
  },
    { immediate: true }
)
</script>

<template>
  <div class="article-viewer">
    <div v-if="loading" class="viewer-state">
      <a-spin size="large" tip="加载文章中..." />
    </div>

    <a-result v-else-if="error" status="error" title="加载失败" :sub-title="error">
      <template #extra>
        <a-button @click="loadArticle(id)">重试</a-button>
      </template>
    </a-result>

    <div v-else class="markdown-body" v-html="html" />
  </div>
</template>

<style scoped>
.article-viewer {
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

@media (max-width: 768px) {
  .article-viewer {
    padding: 12px;
  }
}
</style>

<style>
.markdown-body h1, .markdown-body h2, .markdown-body h3 {
  margin-top: 1.5em; margin-bottom: 0.5em;
  font-weight: 600; color: #1a1a1a;
}
.markdown-body p { margin: 0.8em 0; line-height: 1.8; color: #333; }
.markdown-body code {
  padding: 2px 6px; border-radius: 4px;
  background: #f5f5f5; font-size: 0.9em;
}
.markdown-body pre {
  padding: 16px; border-radius: 6px;
  background: #f6f8fa; overflow-x: auto;
}
.markdown-body pre code { padding: 0; background: none; }
.markdown-body img { max-width: 100%; border-radius: 4px; }
.markdown-body table { width: 100%; border-collapse: collapse; margin: 1em 0; }
.markdown-body th, .markdown-body td {
  padding: 8px 12px; border: 1px solid #e0e0e0; text-align: left;
}
.markdown-body th { background: #f5f5f5; font-weight: 600; }
.markdown-body blockquote {
  margin: 1em 0; padding: 8px 16px;
  border-left: 4px solid #1890ff; background: #f0f5ff; color: #555;
}
.markdown-body a { color: #1890ff; }
.markdown-body ul, .markdown-body ol { padding-left: 2em; line-height: 1.8; }
.markdown-body hr { margin: 2em 0; border: none; border-top: 1px solid #e8e8e8; }

@media (max-width: 768px) {
  .markdown-body {
    max-width: 100%;
    overflow-x: auto;
  }
  .markdown-body table {
    display: block;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  .markdown-body pre {
    max-width: 100%;
  }
}
</style>
