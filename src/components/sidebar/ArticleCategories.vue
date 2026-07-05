<script setup lang="ts">
/**
 * 文章分类组件
 * 展示所有文章分类及其文章数量
 */
defineOptions({ name: 'ArticleCategories' })

export interface Category {
  key: string
  label: string
  count: number
}

interface Props {
  /** 分类列表 */
  categories?: Category[]
  /** 当前选中的分类 */
  activeCategory?: string
}

const props = withDefaults(defineProps<Props>(), {
  categories: () => [
    { key: 'frontend', label: '前端开发', count: 12 },
    { key: 'backend', label: '后端开发', count: 8 },
    { key: 'devops', label: '运维部署', count: 5 },
    { key: 'design', label: '设计教程', count: 3 },
    { key: 'life', label: '生活随笔', count: 7 },
  ],
  activeCategory: '',
})

const emit = defineEmits<{
  /** 点击分类时触发 */
  select: [category: Category]
}>()
</script>

<template>
  <a-card :bordered="false" class="categories-card" title="文章分类">
    <div class="categories-list">
      <div
        v-for="cat in categories"
        :key="cat.key"
        class="category-item"
        :class="{ active: cat.key === activeCategory }"
        @click="emit('select', cat)"
      >
        <span class="category-label">{{ cat.label }}</span>
        <a-tag class="category-count">{{ cat.count }}</a-tag>
      </div>
    </div>
  </a-card>
</template>

<style scoped>
.categories-card {
  border-radius: 8px;
  margin-bottom: 16px;
}

.categories-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.category-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.category-item:hover {
  background: #f0f5ff;
  color: #1890ff;
}

.category-item.active {
  background: #e6f7ff;
  color: #1890ff;
  font-weight: 500;
}

.category-label {
  font-size: 14px;
}

.category-count {
  font-size: 12px;
  border-radius: 10px;
  min-width: 24px;
  text-align: center;
}
</style>
