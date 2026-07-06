<script setup lang="ts">/**
 * 文章标签云组件
 * 展示所有文章标签，支持点击筛选
 */
import {computed, ref} from "vue";

defineOptions({ name: 'ArticleTags' })

export interface Tag {
  key: string
  label: string
  /** 标签权重（影响大小）1-5 */
  weight?: number
}

interface Props {
  /** 标签列表 */
  tags?: Tag[]
  /** 当前选中的标签 */
  activeTag?: string
  /** 超出此数量时折叠 */
  limit?: number
}

const props=withDefaults(defineProps<Props>(), {
  tags: () => [],
  activeTag: '',
  limit: 10,
})

const emit = defineEmits<{
  /** 点击标签时触发 */
  select: [tag: Tag]
}>()

const fontSizeMap: Record<number, string> = {
  1: '12px',
  2: '13px',
  3: '14px',
  4: '16px',
  5: '18px',
}

const expanded = ref(false)

/** 是否折叠（分类数超过 limit 且未展开） */
const isCollapsible = computed(() => props.tags.length > props.limit)

/** 实际显示的列表 */
const visibleTags = computed(() => {
  if (expanded.value || !isCollapsible.value) {
    return props.tags
  }
  return props.tags.slice(0, props.limit)
})

function toggle() {
  expanded.value = !expanded.value
}
</script>

<template>
  <a-card :bordered="false" class="tags-card" title="标签云">
    <div class="tags-cloud">
      <a-tag
        v-for="tag in visibleTags"
        :key="tag.key"
        :class="{ 'tag-active': tag.key === activeTag }"
        :style="{ fontSize: fontSizeMap[tag.weight ?? 1] }"
        @click="emit('select', tag)"
      >
        {{ tag.label }}
      </a-tag>
    </div>
    <!-- 展开/收起按钮 -->
    <a-button
        v-if="isCollapsible"
        type="link"
        size="small"
        class="toggle-btn"
        @click="toggle"
    >
      {{ expanded ? '收起 ▲' : `显示更多 (${tags.length - props.limit}) ▼` }}
    </a-button>
  </a-card>
</template>

<style scoped>
.tags-card {
  border-radius: 8px;
}

.tags-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tags-cloud :deep(.ant-tag) {
  cursor: pointer;
  padding: 4px 12px;
  border-radius: 4px;
  transition: all 0.2s;
  margin: 0;
}

.tags-cloud .ant-tag:hover {
  color: #1890ff;
  border-color: #1890ff;
}

.tag-active {
  color: #1890ff !important;
  border-color: #1890ff !important;
  background: #e6f7ff !important;
}
</style>
