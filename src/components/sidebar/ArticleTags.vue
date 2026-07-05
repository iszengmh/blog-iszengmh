<script setup lang="ts">
/**
 * 文章标签云组件
 * 展示所有文章标签，支持点击筛选
 */
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
}

withDefaults(defineProps<Props>(), {
  tags: () => [
    { key: 'vue', label: 'Vue.js', weight: 5 },
    { key: 'react', label: 'React', weight: 4 },
    { key: 'ts', label: 'TypeScript', weight: 4 },
    { key: 'node', label: 'Node.js', weight: 3 },
    { key: 'css', label: 'CSS', weight: 3 },
    { key: 'docker', label: 'Docker', weight: 2 },
    { key: 'git', label: 'Git', weight: 2 },
    { key: 'rust', label: 'Rust', weight: 1 },
    { key: 'ai', label: 'AI', weight: 1 },
  ],
  activeTag: '',
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
</script>

<template>
  <a-card :bordered="false" class="tags-card" title="标签云">
    <div class="tags-cloud">
      <a-tag
        v-for="tag in tags"
        :key="tag.key"
        :class="{ 'tag-active': tag.key === activeTag }"
        :style="{ fontSize: fontSizeMap[tag.weight ?? 1] }"
        @click="emit('select', tag)"
      >
        {{ tag.label }}
      </a-tag>
    </div>
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
