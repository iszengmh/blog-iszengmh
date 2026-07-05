import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import App from './App.vue'
import './style.css'
import { blogRouter } from './blog.router.ts'

const app = createApp(App)
app.use(Antd).use(blogRouter)
app.mount('#app')
