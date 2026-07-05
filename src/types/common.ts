
/** 通用返回结果封装类 */
export type CommonResult<T> = {
    /** 状态码 */
    code: number
    /** 提示信息 */
    message: string
    /** 封装数据 */
    data: T
}