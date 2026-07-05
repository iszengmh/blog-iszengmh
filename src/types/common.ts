/** 通用 API 响应格式 */
export interface CommonResult<T = any> {
  code: number
  message: string
  data: T
}
