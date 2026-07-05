/**
 * 图片路径前缀
 *
 * 开发环境：Vite dev server 从项目根目录 serve 文件，
 * 所以 /src/posts/assets/images/xxx.png 可直接访问。
 *
 * 生产环境：图片部署在 https://iszengmh.pages.dev/posts/ 下。
 */
export const postAddress = import.meta.env.DEV?'/src/posts/':import.meta.env.VITE_WEB_ADDRESS + 'posts/';

/*
markdown本地地址的相对路径，例如你的图片地址是![](assets/images/2025-09-15-12-00-37.png)，
那就设置“assets/images/”为地址，build完之后，会生成完整的web地址
* */
export const markdownImageSuffix="assets/images/";