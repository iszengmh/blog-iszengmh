<script setup lang="ts">
defineOptions({ name: 'BlogLayout' })

interface Props {
  showSidebar?: boolean
  sidebarWidth?: number
  contentMaxWidth?: number
}

withDefaults(defineProps<Props>(), {
  showSidebar: true,
  sidebarWidth: 300,
  contentMaxWidth: 1200,
})
</script>

<template>
  <div class="blog-layout">
    <!-- 顶部导航栏（全宽，白色卡片效果） -->
    <header class="blog-header">
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
    </header>

    <!-- 主体内容区 -->
    <main class="blog-content">
      <div class="content-wrapper" :style="{ maxWidth: contentMaxWidth + 'px' }">
        <!-- 侧边栏（卡片组） -->
        <aside
          v-if="showSidebar"
          class="blog-sidebar"
          :style="{ width: sidebarWidth + 'px' }"
        >
          <slot name="sidebar" />
        </aside>

        <!-- 主内容区（卡片容器） -->
        <section class="blog-main">
          <slot />
        </section>
      </div>
    </main>

    <!-- 底部 Footer（全宽） -->
    <footer class="blog-footer">
      <div class="footer-inner" :style="{ maxWidth: contentMaxWidth + 'px' }">
        <slot name="footer">
          <p>© 2026 My Blog. All rights reserved.</p>
          <p>Powered by Vue & Ant Design</p>
        </slot>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.blog-layout {
  min-height: 100vh;
  background: #f0f2f5;
  display: flex;
  flex-direction: column;
}

/* ---------- Header ---------- */
.blog-header {
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: center;
}

.header-inner {
  width: 100%;
  padding: 0 24px;
  height: 64px;
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
  flex: 1;
  padding: 24px 16px;
  display: flex;
  justify-content: center;
}

.content-wrapper {
  width: 100%;
  display: flex;
  gap: 24px;
  align-items: flex-start;
}

/* ---------- Sidebar ---------- */
.blog-sidebar {
  flex-shrink: 0;
  position: sticky;
  top: 88px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* ---------- Main ---------- */
.blog-main {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* ---------- Footer ---------- */
.blog-footer {
  width: 100%;
  background: #fff;
  border-top: 1px solid #f0f0f0;
  display: flex;
  justify-content: center;
}

.footer-inner {
  width: 100%;
  max-width: v-bind(contentMaxWidth + 'px');
  padding: 24px;
  text-align: center;
}

.footer-inner p {
  margin: 4px 0;
  font-size: 14px;
  color: #999;
}

/* ---------- Responsive ---------- */
@media (max-width: 768px) {
  .blog-content {
    padding: 12px 8px;
  }

  .content-wrapper {
    flex-direction: column;
    gap: 12px;
  }

  .blog-sidebar {
    width: 100% !important;
    position: static;
  }

  .header-inner {
    padding: 0 12px;
  }
}
</style>
