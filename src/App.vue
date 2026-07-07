<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
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
import Archives from './components/Archives.vue'
import About from './components/About.vue'
import { useArticles } from './composables/useArticles'
import { menuItems,profile } from './config.ts'


const route = useRoute()
const router = useRouter()
const { articles: allArticles, toArticleCard } = useArticles()

const articleCards = computed<Article[]>(() =>
  allArticles.map((meta) => toArticleCard(meta)),
)

/** 不需要当作文章 ID 处理的系统路径 */
const SYSTEM_ROUTES = ['/archives', '/about']

/** 当前路由类型 */
const pageType = computed(() => {
  const path = route.path
  if (path === '/') return 'home'
  if (SYSTEM_ROUTES.includes(path)) return path.slice(1) // 'archives' | 'about'
  return 'article' // 其他路径当作文章 ID
})

/** 文章 ID（仅在 pageType === 'article' 时有值） */
const activeArticleId = computed(() => {
  if (pageType.value === 'article') return route.path.slice(1)
  return null
})

watch(() => route.path, () => {
  // 切换页面时重置分类/标签筛选
  activeCategory.value = ''
  activeTag.value = ''
  currentPage.value = 1

  // 手机端进入文章时，滚动到内容区（内容优先，main 在前）
  if (window.innerWidth < 768 && route.path !== '/') {
    nextTick(() => {
      const mainEl = document.querySelector('.blog-main')
      if (mainEl) {
        mainEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
        window.scrollBy(0, -16)
      }
    })
  }
})

const currentPage = ref(1)
const pageSize = ref(10)
const activeCategory = ref('')
const activeTag = ref('')

const categories = computed(() => {
  const countMap: Record<string, Category> = {}
  articleCards.value.forEach(item => {
    const cat = item.category
    if (cat) {
      countMap[cat] = { key: cat, label: cat, count: ((countMap[cat]?.count || 0) + 1) }
    }
  })
  return Object.values(countMap)
})

const tags = computed(() => {
  const tagMap: Record<string, Category> = {}
  articleCards.value.forEach(item => {
    item.tags?.forEach((tag) => {
      if (tag) {
        tagMap[tag] = { key: tag, label: tag, count: ((tagMap[tag]?.count || 0) + 1) }
      }
    })
  })
  return Object.values(tagMap)
})

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
  activeCategory.value = category.label
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

function goHome() {
  router.push('/')
}

/** 导航栏菜单点击 */
function handleMenuClick(event: any) {
  // Ant Design Menu @click 返回 { key, keyPath, item, domEvent }
  const target = menuItems.find((m) => m.key === event.key)
  if (!target) return
  router.push(target.path)
}
</script>

<template>
  <BlogLayout>
    <template #header>
      <BlogHeader
        :title="profile.name+'的博客'"
        :menu-items="menuItems"
        :active-key="pageType === 'home' ? 'home' : route.path"
        @menu-click="handleMenuClick"
      >
        <template #right>
          <a-button
            v-if="pageType !== 'home'"
            type="link"
            @click="goHome"
          >
            ← 返回首页
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
      <AuthorAvatar />
      <ArticleCategories
        :categories="categories"
        :active-category="activeCategory"
        @select="handleCategorySelect"
      />
      <ArticleTags
        :tags="tags"
        :active-tag="activeTag"
        @select="handleTagSelect"
      />
    </template>

    <!-- 内容区：根据路由显示不同页面 -->
    <ArticleList
      v-if="pageType === 'home'"
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
      v-else-if="pageType === 'article'"
      :id="activeArticleId!"
    />
    <Archives
      v-else-if="pageType === 'archives'"
      :articles="articleCards"
      @article-click="handleArticleClick"
    />
    <About v-else-if="pageType === 'about'" />

    <template #footer>
      <BlogFooter
        site-name="iszengmh 的博客"
        :year="2026"
        :extra="['用 ❤️ 和 Vue 构建']"
      />
    </template>
  </BlogLayout>
</template>
