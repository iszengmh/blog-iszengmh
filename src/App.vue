<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
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
import ArticleViewer from './components/views/ArticleViewer.vue'
import { useArticles } from './composables/useArticles'

const route = useRoute()
const router = useRouter()
const { articles: allArticles, toArticleCard } = useArticles()

const articleCards = computed<Article[]>(() =>
  allArticles.map((meta) => toArticleCard(meta)),
)

/** 当前选中的文章 ID（从 URL 路径中提取） */
const activeArticleId = ref<string | null>(null)
const showArticleList = computed(() => !activeArticleId.value)

// 监听路由变化，从 URL 中提取文章 ID
watch(() => route.path, (path) => {
  // 去掉开头的 /，剩下的就是文章 ID
  const id = path.slice(1)
  console.log(id)
  activeArticleId.value = id || null
}, { immediate: true })

const currentPage = ref(1)
const pageSize = ref(10)
const activeCategory = ref('')
const activeTag = ref('')

const filteredArticles = computed(() => {
  let list = articleCards.value
  if (activeCategory.value) {
    list = list.filter((a) => a.category === activeCategory.value)
  }
  if (activeTag.value) {
    list = list.filter((a) => a.tags.includes(activeTag.value))
  }
  return list
})

const totalArticles = computed(() => filteredArticles.value.length)
const pagedArticles = computed(() => {
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
          <a-button
            v-if="!showArticleList"
            type="link"
            @click="router.push('/')"
          >
            ← 返回列表
          </a-button>
          <a-input-search
            v-else
            placeholder="搜索文章..."
            style="width: 200px"
          />
        </template>
      </BlogHeader>
    </template>

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

    <ArticleViewer
      v-else
      :id="activeArticleId!"
    />

    <template #footer>
      <BlogFooter
        site-name="iszengmh 的博客"
        :year="2026"
        :extra="['用 ❤️ 和 Vue 构建']"
      />
    </template>
  </BlogLayout>
</template>
