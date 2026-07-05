<script setup lang="ts">
/**
 * 博客首页
 *
 * 使用 import.meta.glob 读取 markdown 文件 frontmatter，
 * 取代旧的 mock 数据。
 */
import {ref, computed, watch} from 'vue'
import BlogLayout from './components/layout/BlogLayout.vue'
import BlogHeader from './components/Header.vue'
import BlogFooter from './components/Footer.vue'
import AuthorAvatar from './components/sidebar/AuthorAvatar.vue'
import ArticleCategories from './components/sidebar/ArticleCategories.vue'
import type { Category } from './components/sidebar/ArticleCategories.vue'
import ArticleTags from './components/sidebar/ArticleTags.vue'
import type { Tag } from './components/sidebar/ArticleTags.vue'
import ArticleList from './components/article/ArticleList.vue'
import type { Article } from './components/article/ArticleCard.vue'
import { useArticles } from './composables/useArticles'

/* ---------- 从 markdown 读取文章数据 ---------- */

const { articles: allArticles, toArticleCard } = useArticles()

// 直接转换为 ArticleCard 可用的格式
const articleCards = computed<Article[]>(() =>
    allArticles.map((meta) => toArticleCard(meta)),
)

/* ---------- 状态管理 ---------- */

const currentPage = ref(1)
const pageSize = ref(10)
const loading = ref(false)
const activeCategory = ref('')
const activeTag = ref('')

// 按筛选条件过滤
const filteredArticles = computed(() => {
  let list = articleCards.value
  if (activeCategory.value) {
    const cat = activeCategory.value
    list = list.filter((a) => a.category === cat)
  }
  if (activeTag.value) {
    const tag = activeTag.value
    list = list.filter((a) => a.tags.includes(tag))
  }
  return list
})

// 分页
const totalArticles = computed(() => filteredArticles.value.length)

const pagedArticles = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return filteredArticles.value.slice(start, start + pageSize.value)
})

watch(articleCards,(newValue,oldValue)=>{
  console.log("newValue",newValue);
  console.log("oldValue",oldValue);

},{immediate:true})
const handlePageChange = (page: number) => {
  currentPage.value = page
}

const handleCategorySelect = (category: Category) => {
  activeCategory.value = category.key
  activeTag.value = ''
  currentPage.value = 1
}

const handleTagSelect = (tag: Tag) => {
  activeTag.value = tag.key
  activeCategory.value = ''
  currentPage.value = 1
}

const handleArticleClick = (article: Article) => {
  console.log('点击文章:', article.title)
  // TODO: 跳转到文章详情页（可用 vue-router）
}
</script>

<template>
  <BlogLayout>
    <!-- ====== Header ====== -->
    <template #header>
      <BlogHeader
          title="iszengmh 的博客"
          active-key="home"
          @menu-click="(item) => console.log('导航:', item)"
      >
        <template #right>
          <a-input-search
              placeholder="搜索文章..."
              style="width: 200px"
          />
        </template>
      </BlogHeader>
    </template>

    <!-- ====== 侧边栏 ====== -->
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

    <!-- ====== 文章列表 ====== -->
    <ArticleList
        :articles="pagedArticles"
        :loading="loading"
        :pagination="{
        current: currentPage,
        pageSize: pageSize,
        total: totalArticles,
      }"
        @article-click="handleArticleClick"
        @page-change="handlePageChange"
    />

    <!-- ====== Footer ====== -->
    <template #footer>
      <BlogFooter
          site-name="iszengmh 的博客"
          :year="2026"
          :extra="['用 ❤️ 和 Vue 构建']"
      />
    </template>
  </BlogLayout>
</template>
