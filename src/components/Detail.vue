<script setup lang="ts">
/**
 * Detail 布局容器
 *
 * 作为路由父组件，提供统一的博客布局（Header + 侧边栏 + 内容区）。
 * ArticleList 只在首页显示，进入文章详情时自动隐藏。
 *
 * 路由结构：
 *   /           → 显示 ArticleList（首页）
 *   /vue3-api   → 显示文章正文，ArticleList 隐藏
 */
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import BlogLayout from './layout/BlogLayout.vue'
import BlogHeader from './Header.vue'
import BlogFooter from './Footer.vue'
import AuthorAvatar from './sidebar/AuthorAvatar.vue'
import ArticleCategories from './sidebar/ArticleCategories.vue'
import type { Category } from './sidebar/ArticleCategories.vue'
import ArticleTags from './sidebar/ArticleTags.vue'
import type { Tag } from './sidebar/ArticleTags.vue'
import ArticleList from './article/ArticleList.vue'
import type { Article } from './article/ArticleCard.vue'
import { useArticles } from '../composables/useArticles'

const route = useRoute()
const { articles: allArticles, toArticleCard } = useArticles()

/** 当 path 为 / 时，显示首页的 ArticleList */
const showArticleList = computed(() => route.path === '/')

/* ---------- ArticleList 所需的交互逻辑 ---------- */

import { ref, computed as vueComputed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const articleCards = vueComputed<Article[]>(() =>
  allArticles.map((meta) => toArticleCard(meta)),
)

const currentPage = ref(1)
const pageSize = ref(10)
const activeCategory = ref('')
const activeTag = ref('')

const filteredArticles = vueComputed(() => {
  let list = articleCards.value
  if (activeCategory.value) {
    list = list.filter((a) => a.category === activeCategory.value)
  }
  if (activeTag.value) {
    list = list.filter((a) => a.tags.includes(activeTag.value))
  }
  return list
})

const totalArticles = vueComputed(() => filteredArticles.value.length)

const pagedArticles = vueComputed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return filteredArticles.value.slice(start, start + pageSize.value)
})

function handlePageChange(page: number) {
  currentPage.value = page
}

function handleCategorySelect(category: Category) {
  activeCategory.value = category.key
  activeTag.value = ''
  currentPage.value = 1
}

function handleTagSelect(tag: Tag) {
  activeTag.value = tag.key
  activeCategory.value = ''
  currentPage.value = 1
}

function handleArticleClick(article: Article) {
  router.push(`/${article.id}`)
}
</script>

<template>
  <BlogLayout>
    <template #header>
      <BlogHeader
        title="iszengmh 的博客"
        :active-key="showArticleList ? 'home' : route.path"
        @menu-click="(item: any) => console.log('导航:', item)"
      >
        <template #right>
          <a-input-search placeholder="搜索文章..." style="width: 200px" />
        </template>
      </BlogHeader>
    </template>

    <!-- 侧边栏（首页显示分类标签，文章详情页显示博主信息） -->
    <template #sidebar>
      <AuthorAvatar
        avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=iszengmh"
        name="iszengmh"
        bio="全栈工程师 / 开源爱好者"
        :socialLinks="[
          { icon: 'GithubOutlined', url: 'https://github.com', label: 'GitHub' },
          { icon: 'WechatOutlined', url: '#', label: '微信' },
          { icon: 'MailOutlined', url: 'mailto:iszengmh@example.com', label: '邮箱' },
        ]"
      />
      <ArticleCategories
        :activeCategory="activeCategory"
        @select="handleCategorySelect"
      />
      <ArticleTags
        :activeTag="activeTag"
        @select="handleTagSelect"
      />
    </template>

    <!-- 主内容区：首页显示 ArticleList，文章详情显示 router-view -->
    <ArticleList
      v-if="showArticleList"
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
    <router-view v-else />

    <template #footer>
      <BlogFooter
        site-name="iszengmh 的博客"
        :year="2026"
        :extra="['用 ❤️ 和 Vue 构建']"
      />
    </template>
  </BlogLayout>
</template>
