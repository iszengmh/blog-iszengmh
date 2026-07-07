<script setup lang="ts">
/**
 * 顶部导航栏组件
 *
 * 支持两种模式：
 * 1. 默认模式：显示站点名称 + 水平导航菜单
 * 2. 自定义模式：通过 slots 完全自定义
 */
defineOptions({ name: 'BlogHeader' })

interface MenuItem {
  key: string
  label: string
  icon?: string
  path?: string
}

interface Props {
  /** 站点标题 */
  title?: string
  /** 导航菜单项 */
  menuItems?: MenuItem[]
  /** 当前选中的菜单 key */
  activeKey?: string
}

withDefaults(defineProps<Props>(), {
  title: 'My Blog',
  menuItems: () => [],
  activeKey: 'home',
})

const emit = defineEmits<{
  /** 菜单点击 */
  'menu-click': [item: MenuItem]
}>()
</script>

<template>
  <div class="header-container">
    <!-- 左侧：Logo + 站点名 -->
    <div class="header-left">
      <slot name="left">
        <div class="site-brand">
          <a :href="menuItems[0]?.path || '/'" class="site-title">
            {{ title }}
          </a>
        </div>
      </slot>
    </div>

    <!-- 中间：导航菜单 -->
    <div class="header-center">
      <slot name="center">
        <a-menu
          :selectedKeys="[activeKey]"
          mode="horizontal"
          :items="menuItems"
          @click="emit('menu-click', $event)"
          style="border-bottom: none; flex: 1; min-width: 0"
        />
      </slot>
    </div>

    <!-- 右侧：搜索/操作区 -->
    <div class="header-right">
      <slot name="right" />
    </div>
  </div>
</template>

<style scoped>
.header-container {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 24px;
}

@media (max-width: 768px) {
  .header-container {
    flex-wrap: wrap;
    gap: 8px;
  }
}

.header-left {
  flex-shrink: 0;
}

.site-title {
  font-size: 20px;
  font-weight: 700;
  color: #1a1a1a;
  text-decoration: none;
  white-space: nowrap;
}

.site-title:hover {
  color: #1890ff;
}

.header-center {
  flex: 1;
  display: flex;
  justify-content: center;
  min-width: 0;
}

.header-right {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 12px;
}
</style>
