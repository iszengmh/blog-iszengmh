import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import Markdown from 'unplugin-vue-markdown/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    // 在配置加载阶段手动加载 .env 文件
    const env = loadEnv(mode, process.cwd(), '')
    const postAddress = mode === 'development'
        ? '/src/posts/'
        : (env.VITE_WEB_ADDRESS || 'http://localhost:5173/') + 'posts/'

    return {
        build: {
            // 开发阶段启用源码映射：https://uniapp.dcloud.net.cn/tutorial/migration-to-vue3.html#需主动开启-sourcemap
            sourcemap: process.env.NODE_ENV === 'development',
        },
        plugins: [
            vue({ include: [/\.vue$/, /\.md$/] }),
            Markdown({
                exportFrontmatter: true,
                markdownOptions: {
                    html: true,
                    linkify: true,
                    typographer: true,
                },
                markdownSetup(md) {
                    const defaultImageRenderer = md.renderer.rules.image || function (tokens, idx, options, _env, self) {
                        return self.renderToken(tokens, idx, options)
                    }

                    md.renderer.rules.image = function (tokens, idx, options, _env, self) {
                        const token = tokens[idx]
                        const srcAttr = token.attrIndex('src')
                        if (srcAttr >= 0 && token.attrs) {
                            const src = token.attrs[srcAttr][1]
                            if (src.startsWith('assets/images/')) {
                                token.attrs[srcAttr][1] = postAddress + src
                            }
                        }
                        return defaultImageRenderer(tokens, idx, options, _env, self)
                    }
                },
            }),
        ],
    }
})
