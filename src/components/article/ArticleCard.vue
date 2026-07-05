<script setup lang="ts">
/**
 * 单篇文章卡片组件
 */
defineOptions({ name: 'ArticleCard' })

export interface Article {
  id: string | number
  title: string
  summary: string
  category: string
  tags: string[]
  date: string
  cover?: string
  views?: number
  likes?: number
}

interface Props {
  article: Article
}

defineProps<Props>()

const emit = defineEmits<{
  click: [article: Article]
}>()
</script>

<template>
  <a-card
    :bordered="false"
    class="article-card"
    hoverable
    @click="emit('click', article)"
  >
    <div class="article-content">
      <!-- 文章信息 -->
      <div class="article-body">
        <h2 class="article-title">{{ article.title }}</h2>

        <div class="article-meta">
          <span class="meta-item">
            <CalendarOutlined />
            {{ article.date }}
          </span>
          <span v-if="article.views" class="meta-item">
            <EyeOutlined />
            {{ article.views }}
          </span>
          <span v-if="article.likes" class="meta-item">
            <LikeOutlined />
            {{ article.likes }}
          </span>
        </div>

        <p class="article-summary">{{ article.summary }}</p>

        <div class="article-footer">
          <a-tag color="blue">{{ article.category }}</a-tag>
          <a-tag v-for="tag in article.tags" :key="tag" class="article-tag">
            {{ tag }}
          </a-tag>
        </div>
      </div>
      <!-- 封面图 -->
      <div v-if="article.cover" class="article-cover">
        <img :src="article.cover" :alt="article.title" />
      </div>
    </div>
  </a-card>
</template>

<style scoped>
.article-card {
  border-radius: 8px;
  margin-bottom: 16px;
  cursor: pointer;
  transition: all 0.3s;
}

.article-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.article-content {
  display: flex;
  gap: 20px;
}

.article-cover {
  flex-shrink: 0;
  width: 200px;
  height: 140px;
  border-radius: 6px;
  overflow: hidden;
}

.article-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.article-card:hover .article-cover img {
  transform: scale(1.05);
}

.article-body {
  flex: 1;
  min-width: 0;
}

.article-title {
  margin: 0 0 8px;
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
}

.article-meta {
  display: flex;
  gap: 16px;
  margin-bottom: 10px;
  font-size: 13px;
  color: #999;
}

.meta-item {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.article-summary {
  margin: 0 0 12px;
  font-size: 14px;
  line-height: 1.7;
  color: #666;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  //-webkit-box-orient: vertical;
  overflow: hidden;
}

.article-footer {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.article-tag {
  font-size: 12px;
}

@media (max-width: 768px) {
  .article-content {
    flex-direction: column;
  }
  .article-cover {
    width: 100%;
    height: 180px;
  }
}
</style>
