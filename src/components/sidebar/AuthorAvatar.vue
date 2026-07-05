<script setup lang="ts">
/**
 * 博主头像卡片组件
 * 展示博主头像、姓名、简介和社交链接
 */
defineOptions({ name: 'AuthorAvatar' })

import { GithubOutlined, WechatOutlined, MailOutlined } from '@ant-design/icons-vue'


interface SocialLink {
  /** 图标组件名称 */
  icon: string
  url: string
  label: string
}

interface Props {
  avatar?: string
  name?: string
  bio?: string
  socialLinks?: SocialLink[]
}

withDefaults(defineProps<Props>(), {
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=blogger',
  name: '博主名称',
  bio: '热爱技术，分享生活。专注于 Web 开发与前端工程化。',
  socialLinks: () => [
    { icon: 'GithubOutlined', url: 'https://github.com', label: 'GitHub' },
    { icon: 'WechatOutlined', url: '#', label: '微信' },
    { icon: 'MailOutlined', url: 'mailto:blog@example.com', label: '邮箱' },
  ],
})

/** 图标字符串到组件引用的映射 */
const iconMap: Record<string, any> = {
  GithubOutlined,
  WechatOutlined,
  MailOutlined,
}
</script>

<template>
  <a-card :bordered="false" class="author-card">
    <div class="author-info">
      <a-avatar :src="avatar" :size="80" class="author-avatar" />
      <h3 class="author-name">{{ name }}</h3>
      <p class="author-bio">{{ bio }}</p>
      <div class="social-links">
        <a
          v-for="link in socialLinks"
          :key="link.label"
          :href="link.url"
          :title="link.label"
          target="_blank"
          rel="noopener noreferrer"
          class="social-link"
        >
          <component :is="iconMap[link.icon]" />
        </a>
      </div>
    </div>
  </a-card>
</template>

<style scoped>
.author-card {
  border-radius: 8px;
  margin-bottom: 16px;
}

.author-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.author-avatar {
  margin-bottom: 12px;
  border: 2px solid #e8e8e8;
  padding: 2px;
  background: #fff;
}

.author-name {
  margin: 0 0 8px;
  font-size: 18px;
  font-weight: 600;
}

.author-bio {
  margin: 0 0 16px;
  font-size: 14px;
  color: #999;
  line-height: 1.6;
}

.social-links {
  display: flex;
  gap: 12px;
}

.social-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #f5f5f5;
  color: #666;
  font-size: 18px;
  transition: all 0.3s;
}

.social-link:hover {
  background: #1890ff;
  color: #fff;
}
</style>
