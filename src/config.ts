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

export const assetsAddress = import.meta.env.DEV?'/src/assets/':import.meta.env.VITE_WEB_ADDRESS + 'assets/';
export const profile={
    avatar: `${assetsAddress}/avatar.svg`,
        name: 'Rise Zeng',
    bio: '一分技术一分生活',
    socialLinks: () => [
            { icon: 'GithubOutlined', url: 'https://github.com/iszengmh', label: 'GitHub' },
            // { icon: 'WechatOutlined', url: '#', label: '微信' },
            // { icon: 'MailOutlined', url: 'mailto:blog@example.com', label: '邮箱' },
    ],
}
export const menuItems=[
    { key: 'home', label: '首页', path: '/' },
    { key: 'archives', label: '归档', path: '/archives'},
    { key: 'about', label: '关于', path: '/about' },
]