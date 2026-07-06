<script setup lang="ts">
/**
 * 文章分类组件
 * 展示所有文章分类及其文章数量，超出数量限制时显示"显示更多"按钮
 */
import { ref, computed } from 'vue'

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
  /** 超出此数量时折叠 */
  limit?: number
}

const props = withDefaults(defineProps<Props>(), {
  categories: () => [],
  activeCategory: '',
  limit: 4,
})

const emit = defineEmits<{
  select: [category: Category]
}>()

const expanded = ref(false)

/** 是否折叠（分类数超过 limit 且未展开） */
const isCollapsible = computed(() => props.categories.length > props.limit)

/** 实际显示的列表 */
const visibleCategories = computed(() => {
  if (expanded.value || !isCollapsible.value) {
    return props.categories
  }
  return props.categories.slice(0, props.limit)
})

function toggle() {
  expanded.value = !expanded.value
}
</script>

<template>
  <a-card :bordered="false" class="categories-card" title="文章分类">
    <div class="categories-list">
      <div
        v-for="cat in visibleCategories"
        :key="cat.key"
        class="category-item"
        :class="{ active: cat.key === activeCategory }"
        @click="emit('select', cat)"
      >
        <span class="category-label">{{ cat.label }}</span>
        <a-tag class="category-count">{{ cat.count }}</a-tag>
      </div>

      <!-- 展开/收起按钮 -->
      <a-button
        v-if="isCollapsible"
        type="link"
        size="small"
        class="toggle-btn"
        @click="toggle"
      >
        {{ expanded ? '收起 ▲' : `显示更多 (${categories.length - props.limit}) ▼` }}
      </a-button>
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

.toggle-btn {
  margin-top: 4px;
  padding: 4px 0;
  font-size: 13px;
}
</style>
