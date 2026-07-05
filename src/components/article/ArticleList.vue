<script setup lang="ts">
/**
 * 文章列表组件
 * 包含列表渲染、加载状态、空状态、分页
 */
defineOptions({ name: 'ArticleList' })

import ArticleCard from './ArticleCard.vue'
import type { Article } from './ArticleCard.vue'

interface Props {
  /** 文章列表 */
  articles?: Article[]
  /** 是否正在加载 */
  loading?: boolean
  /** 是否还有更多 */
  hasMore?: boolean
  /** 分页配置 */
  pagination?: {
    current: number
    pageSize: number
    total: number
  }
}

const props = withDefaults(defineProps<Props>(), {
  articles: () => [],
  loading: false,
  hasMore: true,
  pagination: undefined,
})

const emit = defineEmits<{
  /** 点击文章 */
  'article-click': [article: Article]
  /** 分页变化 */
  'page-change': [page: number, pageSize: number]
  /** 加载更多 */
  'load-more': []
}>()

/** 判断是否需要分页（外部有 pagination 时使用 Ant Design 分页） */
const usePagination = props.pagination !== undefined

function onPageChange(page: number) {
  if (props.pagination) {
    emit('page-change', page, props.pagination.pageSize)
  }
}
</script>

<template>
  <div class="article-list">
    <!-- 加载状态 -->
    <div v-if="loading && articles.length === 0" class="list-status">
      <a-spin size="large" tip="加载中..." />
    </div>

    <!-- 空状态 -->
    <div v-else-if="!loading && articles.length === 0" class="list-status">
      <a-empty description="暂无文章" />
    </div>

    <!-- 文章列表 -->
    <template v-else>
      <ArticleCard
        v-for="article in articles"
        :key="article.id"
        :article="article"
        @click="emit('article-click', article)"
      />

      <!-- 加载更多（滚动加载模式） -->
      <div v-if="loading && articles.length > 0" class="loading-more">
        <a-spin />
        <span>加载中...</span>
      </div>

      <!-- 分页器 -->
      <div v-if="usePagination" class="pagination-wrapper">
        <a-pagination
          v-bind="pagination"
          show-size-changer
          show-quick-jumper
          :show-total="(total: number) => `共 ${total} 篇`"
          @change="onPageChange"
        />
      </div>

      <!-- 加载更多按钮 -->
      <div v-else-if="hasMore && !loading" class="load-more-btn">
        <a-button type="dashed" block @click="emit('load-more')">
          加载更多
        </a-button>
      </div>
    </template>
  </div>
</template>

<style scoped>
.article-list {
  min-height: 200px;
}

.list-status {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
}

.loading-more {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 24px;
  color: #999;
}

.pagination-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 24px;
}

.load-more-btn {
  margin-top: 16px;
}
</style>
