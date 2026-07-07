/**
 * 文章筛选/分页共享状态（单例）
 *
 * 模块级 state，多个组件调用 useArticleFilter() 操作同一份数据。
 * App.vue（侧栏筛选）和 HomePage.vue（文章列表）共享。
 */
import { computed, ref } from 'vue'
import type { Category } from '../components/sidebar/ArticleCategories.vue'
import type { Tag } from '../components/sidebar/ArticleTags.vue'
import type { Article } from '../components/article/ArticleCard.vue'
import { useArticles } from './useArticles'

/* ── 模块级单例状态 ── */
const currentPage = ref(1)
const pageSize = ref(10)
const activeCategory = ref('')
const activeTag = ref('')

const { articles: allArticles, toArticleCard } = useArticles()

const articleCards = computed<Article[]>(() =>
  allArticles.map((meta) => toArticleCard(meta)),
)

const categories = computed(() => {
  const countMap: Record<string, Category> = {}
  articleCards.value.forEach((item) => {
    const cat = item.category
    if (cat) {
      countMap[cat] = { key: cat, label: cat, count: (countMap[cat]?.count || 0) + 1 }
    }
  })
  return Object.values(countMap)
})

const tags = computed(() => {
  const tagMap: Record<string, { key: string; label: string; count: number }> = {}
  articleCards.value.forEach((item) => {
    item.tags?.forEach((tag) => {
      if (tag) {
        tagMap[tag] = { key: tag, label: tag, count: (tagMap[tag]?.count || 0) + 1 }
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

export function useArticleFilter() {
  return {
    currentPage,
    pageSize,
    activeCategory,
    activeTag,
    articleCards,
    categories,
    tags,
    filteredArticles,
    totalArticles,
    pagedArticles,
    handlePageChange,
    handleCategorySelect,
    handleTagSelect,
  }
}
