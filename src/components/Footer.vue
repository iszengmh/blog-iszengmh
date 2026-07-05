<script setup lang="ts">
/**
 * 页脚组件
 */
defineOptions({ name: 'BlogFooter' })

interface Props {
  /** 网站名称 */
  siteName?: string
  /** 年份 */
  year?: number
  /** ICP 备案号（中国大陆） */
  icp?: string
  /** 附加信息 */
  extra?: string[]
}

withDefaults(defineProps<Props>(), {
  siteName: 'My Blog',
  year: 2026,
  extra: () => [],
})
</script>

<template>
  <div class="footer-content">
    <slot name="content">
      <div class="footer-links">
        <a href="#">关于我们</a>
        <a href="#">隐私政策</a>
        <a href="#">友情链接</a>
        <a href="#">联系我们</a>
      </div>
      <div class="footer-copyright">
        <p>© {{ year }} {{ siteName }}. All rights reserved.</p>
        <p v-if="icp" class="footer-icp">{{ icp }}</p>
        <p v-for="text in extra" :key="text">{{ text }}</p>
      </div>
    </slot>
  </div>
</template>

<style scoped>
.footer-content {
  text-align: center;
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-bottom: 16px;
}

.footer-links a {
  color: #666;
  font-size: 14px;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-links a:hover {
  color: #1890ff;
}

.footer-copyright p {
  margin: 4px 0;
  font-size: 13px;
  color: #999;
}

.footer-icp {
  color: #bbb;
}
</style>
