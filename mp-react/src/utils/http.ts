import Taro from '@tarojs/taro'
import queryString from 'query-string'

interface TaroResponse<T> {
  data: T
  statusCode: number
}

function getToken() {
  return 'a-token'
}

// 公共请求方式
async function requestAsync<R>(options: {
  url: string
  header?: TaroGeneral.IAnyObject
  method?: keyof Taro.request.method
  data?: Record<string, unknown>
  params?: Record<string, unknown>
}) {
  const token = getToken()

  const requestOptions: Taro.request.Option = {
    url: queryString.stringifyUrl({
      url: process.env.BASE_URL + options.url,
      query: options.params as queryString.StringifiableRecord,
    }),
    method: options.method,
    header: Object.assign({ Authorization: token }, options.header),
    data: options.data,
  }

  try {
    // res 是请求的整体返回数据，其中的 data 才是接口返回的逻辑数据
    const res = (await Taro.request(requestOptions)) as unknown as TaroResponse<R>
    return res.data
  } catch (error) {
    console.error('請求失敗', error)
    return Promise.reject(error)
  }
}

// 目前只考虑这两种请求方式（小程序不完全符合 restful 風格）
export const http = {
  get: <R>(url: string, params?: Record<string, unknown>, config?: Record<string, unknown>) =>
    requestAsync<R>({ url, method: 'GET', params, ...config }),

  post: <R>(
    url: string,
    data?: Record<string, unknown>,
    params?: Record<string, unknown>,
    config?: Record<string, unknown>
  ) => requestAsync<R>({ url, method: 'POST', data, params, ...config }),
}
