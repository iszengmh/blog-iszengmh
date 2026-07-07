<script setup lang="ts">
/**
 * 博客整体布局组件
 *
 * 使用 Ant Design Layout 实现的标准博客布局：
 ┌──────────────────────────────┐
 │          Header              │
 ├──────────┬───────────────────┤
 │          │                   │
 │  Sidebar │    Content       │
 │  (头像/   │   (文章列表)       │
 │   分类/   │                   │
 │   标签)   │                   │
 │          │                   │
 ├──────────┴───────────────────┤
 │          Footer              │
 └──────────────────────────────┘
 *
 * 移动端：内容优先，sidebar 排在 main 下方
 */
defineOptions({ name: 'BlogLayout' })

interface Props {
  /** 是否显示侧边栏 */
  showSidebar?: boolean
  /** 侧边栏宽度 */
  sidebarWidth?: number
  /** 内容区域最大宽度 */
  contentMaxWidth?: number
}

withDefaults(defineProps<Props>(), {
  showSidebar: true,
  sidebarWidth: 300,
  contentMaxWidth: 1200,
})
</script>

<template>
  <a-layout class="blog-layout">
    <!-- 顶部导航栏 -->
    <a-layout-header class="blog-header">
      <div class="header-inner" :style="{ maxWidth: contentMaxWidth + 'px' }">
        <slot name="header">
          <div class="header-left">
            <slot name="header-left">
              <a href="/" class="logo">
                <span class="logo-text">My Blog</span>
              </a>
            </slot>
          </div>
          <div class="header-right">
            <slot name="header-right" />
          </div>
        </slot>
      </div>
    </a-layout-header>

    <!-- 主体内容区 -->
    <a-layout-content class="blog-content">
      <div class="content-wrapper" :style="{ maxWidth: contentMaxWidth + 'px' }">
        <!-- 主内容区（内容优先，DOM 排在 sidebar 前面） -->
        <main class="blog-main">
          <slot />
        </main>

        <!-- 侧边栏 -->
        <aside
          v-if="showSidebar"
          class="blog-sidebar"
          :style="{ width: sidebarWidth + 'px' }"
        >
          <slot name="sidebar" />
        </aside>
      </div>
    </a-layout-content>

    <!-- 底部 Footer -->
    <a-layout-footer class="blog-footer">
      <slot name="footer">
        <div class="footer-inner">
          <p>© 2026 My Blog. All rights reserved.</p>
          <p>Powered by Vue & Ant Design</p>
        </div>
      </slot>
    </a-layout-footer>
  </a-layout>
</template>

<style scoped>
.blog-layout {
  min-height: 100vh;
  background: #f0f2f5;
}

/* ---------- Header ---------- */
.blog-header {
  position: sticky;
  top: 16px;
  z-index: 100;
  padding: 0;
  background: transparent;
  display: flex;
  justify-content: center;
}

.header-inner {
  width: 100%;
  max-width: v-bind(contentMaxWidth + 'px');
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  border-radius: 8px;
}

.header-left,
.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.logo {
  text-decoration: none;
}

.logo-text {
  font-size: 22px;
  font-weight: 700;
  background: linear-gradient(135deg, #1890ff, #096dd9);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ---------- Content ---------- */
.blog-content {
  padding: 24px 16px;
}

.content-wrapper {
  margin: 0 auto;
  display: flex;
  gap: 24px;
  align-items: flex-start;
}

/* ---------- Sidebar ---------- */
.blog-sidebar {
  flex-shrink: 0;
  position: sticky;
  top: 88px;
  /* 桌面端保持在左侧（即使 DOM 中 main 在前） */
  order: -1;
}

/* ---------- Main ---------- */
.blog-main {
  flex: 1;
  min-width: 0;
}

/* ---------- Footer ---------- */
.blog-footer {
  text-align: center;
  padding: 24px 50px;
  background: #fff;
  border-top: 1px solid #f0f0f0;
}

.footer-inner p {
  margin: 4px 0;
  font-size: 14px;
  color: #999;
}

/* ---------- Responsive ---------- */
@media (max-width: 768px) {
  .blog-content {
    overflow-x: hidden;
  }

  .content-wrapper {
    flex-direction: column;
    gap: 12px;
  }

  .blog-main {
    max-width: 100%;
  }

  .blog-sidebar {
    width: 100% !important;
    position: static;
    order: 0;
    max-width: 100%;
  }

  .blog-header {
    top: 8px;
  }

  .header-inner {
    padding: 0 12px;
    min-height: 56px;
    height: auto;
  }
}
</style>
