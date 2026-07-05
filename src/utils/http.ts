/**
 * 1.拼接基础地址
 * 2.设置超时时间
 * 3.添加请求头标识
 * 4.添加 token
 */
import type {CommonResult} from "../types/common.ts";

/**
 * 扩展的请求选项类型
 */
export interface HttpRequestOptions  {
    /** 查询参数（会自动拼接到 URL 后面） */
    params?: Record<string, any>
}
export const loadMarkdownFiles=<T>(options: HttpRequestOptions):Promise<CommonResult<T>> =>{
    // 处理 params 参数，拼接到 URL?
    if (options.params) {
        // const queryString = buildQueryString(options.params)
        // 检查 URL 是否已经包含查询参数
        // const separator = options.url.includes('?') ? '&' : ''
        // options.url = options.url + separator + queryString
        // 删除 params 属性，避免传递给 uni.request
        delete options.params
    }
    return new Promise<CommonResult<T>>((_resolve, _reject)=>{

    })


}