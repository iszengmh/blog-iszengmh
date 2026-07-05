<script setup lang="ts">
/**
 * 博客整体布局组件
 *
 * 使用 Ant Design Layout 实现的标准博客布局：
 * ┌──────────────────────────────┐
 * │          Header              │
 * ├──────────┬───────────────────┤
 * │          │                   │
 │  Sidebar  │    Content        │
 │  (头像/   │   (文章列表)       │
 │   分类/   │                   │
 │   标签)   │                   │
 │          │                   │
 ├──────────┴───────────────────┤
 │          Footer              │
 └──────────────────────────────┘
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
      <slot name="header">
        <div class="header-inner">
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
        </div>
      </slot>
    </a-layout-header>

    <!-- 主体内容区 -->
    <a-layout-content class="blog-content">
      <div class="content-wrapper" :style="{ maxWidth: contentMaxWidth + 'px' }">
        <!-- 侧边栏 -->
        <aside
          v-if="showSidebar"
          class="blog-sidebar"
          :style="{ width: sidebarWidth + 'px' }"
        >
          <slot name="sidebar" />
        </aside>

        <!-- 主内容区 -->
        <main class="blog-main">
          <slot />
        </main>
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
  top: 0;
  z-index: 100;
  height: 64px;
  padding: 0;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  display: flex;
  align-items: center;
}

.header-inner {
  width: 100%;
  max-width: v-bind(contentMaxWidth + 'px');
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  .content-wrapper {
    flex-direction: column;
  }

  .blog-sidebar {
    width: 100% !important;
    position: static;
  }
}
</style>
