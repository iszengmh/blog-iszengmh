<script setup lang="ts">
/**
 * 文章详情页
 */
import { useRoute } from 'vue-router'
import ArticleViewer from '../components/views/ArticleViewer.vue'

const route = useRoute()
const articleId = route.params.id as string
</script>

<template>
  <ArticleViewer :id="articleId" />
</template>
