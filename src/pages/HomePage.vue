<script setup lang="ts">
/**
 * 首页 — 文章列表
 */
import { useRouter } from 'vue-router'
import ArticleList from '../components/article/ArticleList.vue'
import type { Article } from '../components/article/ArticleCard.vue'
import { useArticleFilter } from '../composables/useArticleFilter'

const router = useRouter()
const { pagedArticles, totalArticles, currentPage, pageSize, handlePageChange } =
  useArticleFilter()

function handleArticleClick(article: Article) {
  router.push(`/${article.id}`)
}
</script>

<template>
  <ArticleList
    :articles="pagedArticles"
    :loading="false"
    :pagination="{
      current: currentPage,
      pageSize: pageSize,
      total: totalArticles,
    }"
    @article-click="handleArticleClick"
    @page-change="handlePageChange"
  />
</template>
