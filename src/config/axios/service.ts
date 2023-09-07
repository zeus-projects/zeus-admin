import axios from 'axios'
import config from './config'
import {
  AxiosInstance,
  AxiosRequestHeaders,
  InternalAxiosRequestConfig,
  RequestConfig,
  AxiosResponse,
  AxiosError
} from './types'

import { ElMessage } from 'element-plus'
import qs from 'qs'

const { baseUrl } = config
export const PATH_URL = baseUrl[import.meta.env.VITE_API_BASE_PATH]

const abortControllerMap: Map<string, AbortController> = new Map()

export const axiosInstance: AxiosInstance = axios.create({
  ...config,
  baseURL: PATH_URL
})

// 请求拦截器
axiosInstance.interceptors.request.use(
  (request: InternalAxiosRequestConfig) => {
    // 处理 abortController
    const controller = new AbortController()
    const url = request.url || ''
    request.signal = controller.signal
    abortControllerMap.set(url, controller)

    // 处理 post 请求，使用 qs 编码
    if (
      request.method === 'post' &&
      (request.headers as AxiosRequestHeaders)['Content-Type'] ===
        'application/x-www-form-urlencoded'
    ) {
      request.data = qs.stringify(request.data)
    }

    // 处理 get 请求，使用 ? 拼接到路径中
    if (request.method === 'get' && request.params) {
      let url = request.url as string
      url += '?'
      const keys = Object.keys(request.params)
      for (const key of keys) {
        if (request.params[key] !== void 0 && request.params[key] !== null) {
          url += `${key}=${encodeURIComponent(request.params[key])}&`
        }
      }
      url = url.substring(0, url.length - 1)
      request.params = {}
      request.url = url
    }
    return request
  },
  (error: AxiosError) => {
    console.log('axios request error', error)
    Promise.reject(error)
  }
)

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    // 处理 abortController
    const url = response.config.url || ''
    abortControllerMap.delete(url)

    response = response.data

    // 如果是文件流，直接返回
    if (response?.config?.responseType === 'blob') {
      return response
    }
    // 后端响应成功状态码
    if (response.data?.code === config.code) {
      return response.data
    }
    // 后端响应错误状态码
    ElMessage.error(response.data.message)
  },
  (error: AxiosError) => {
    console.log('axios response error', error)
    ElMessage.error(error.message)
    return Promise.reject(error)
  }
)

const service = {
  request: (config: RequestConfig) => {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config as any)
      }
      axiosInstance
        .request(config)
        .then((res) => {
          resolve(res)
        })
        .catch((err: any) => {
          reject(err)
        })
    })
  },
  cancelRequest: (url: string | string[]) => {
    const urlList = Array.isArray(url) ? url : [url]
    for (const _url of urlList) {
      abortControllerMap.get(_url)?.abort()
      abortControllerMap.delete(_url)
    }
  },
  cancelAllRequest() {
    for (const [_, controller] of abortControllerMap) {
      controller.abort()
    }
    abortControllerMap.clear()
  }
}

export default service
