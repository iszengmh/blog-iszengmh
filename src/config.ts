/**
 * 图片路径前缀
 *
 * 开发环境：Vite dev server 从项目根目录 serve 文件，
 * 所以 /src/posts/assets/images/xxx.png 可直接访问。
 *
 * 生产环境：图片部署在 https://iszengmh.pages.dev/posts/ 下。
 */
export const postAddress = import.meta.env.DEV
    ? '/src/posts/'
    : import.meta.env.VITE_WEB_ADDRESS + 'posts/'
