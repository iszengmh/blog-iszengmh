<script setup lang="ts">
/**
 * 归档页面
 * 展示所有文章的归档列表（按年份/月份分组）
 */
import type { Article } from './article/ArticleCard.vue'

defineProps<{
  articles: Article[]
}>()

const emit = defineEmits<{
  'article-click': [article: Article]
}>()
</script>

<template>
  <div class="archives-page">
    <a-card :bordered="false">
      <template #title>
        <h2 style="margin: 0">归档</h2>
      </template>
      <p>共 {{ articles.length }} 篇文章</p>
      <div class="archives-list">
        <div
          v-for="article in articles"
          :key="article.id"
          class="archive-item"
          @click="emit('article-click', article)"
        >
          <span class="archive-date">{{ article.date.slice(0,10) }}</span>
          <span class="archive-title">{{ article.title }}</span>
        </div>
      </div>
    </a-card>
  </div>
</template>

<style scoped>
.archives-page {
  min-height: 60vh;
}

.archives-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.archive-item {
  display: flex;
  gap: 16px;
  padding: 10px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
}

.archive-item:hover {
  background: #f0f5ff;
}

.archive-date {
  flex-shrink: 0;
  color: #999;
  font-size: 14px;
  font-family: monospace;
}

.archive-title {
  color: #1a1a1a;
  font-size: 15px;
}

.archive-item:hover .archive-title {
  color: #1890ff;
}
</style>
