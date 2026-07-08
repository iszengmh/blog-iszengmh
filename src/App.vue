<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import BlogLayout from './components/layout/BlogLayout.vue'
import BlogHeader from './components/Header.vue'
import BlogFooter from './components/Footer.vue'
import AuthorAvatar from './components/sidebar/AuthorAvatar.vue'
import ArticleCategories from './components/sidebar/ArticleCategories.vue'
import ArticleTags from './components/sidebar/ArticleTags.vue'
import { menuItems, profile } from './config.ts'
import { useArticleFilter } from './composables/useArticleFilter'

const router = useRouter()
const route = useRoute()
const {
  categories,
  tags,
  activeCategory,
  activeTag,
  handleCategorySelect,
  handleTagSelect,
} = useArticleFilter()


/** 导航栏高亮 key */
const activeMenuKey = computed(() => {
  const name = route.name
  if (name === 'home' || name === 'archives' || name === 'about') return name as string
  return ''
})

function handleMenuClick(event: any) {
  const target = menuItems.find((m) => m.key === event.key)
  if (!target) return
  router.push(target.path)
}
</script>

<template>
  <BlogLayout>
    <template #header>
      <BlogHeader
        :title="profile.name+' 的博客'"
        :menuItems="menuItems"
        :activeKey="activeMenuKey"
        @menu-click="handleMenuClick"
      >
        <template #right>
          <a-button
            v-if="route.name === 'article'"
            type="link"
            @click="router.push('/')"
          >
            ← 返回列表
          </a-button>
          <a-input-search
            v-else-if="route.name === 'home'"
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
        :activeCategory="activeCategory"
        @select="handleCategorySelect"
      />
      <ArticleTags
        :tags="tags"
        :activeTag="activeTag"
        @select="handleTagSelect"
      />
    </template>

    <!-- 路由自动渲染当前页面组件 -->
    <RouterView />

    <template #footer>
      <BlogFooter
        :site-name="profile.name+' 的博客'"
        :year="2025"
      />
    </template>
  </BlogLayout>
</template>
