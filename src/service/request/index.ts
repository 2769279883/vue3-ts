import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { LiuRequestInterceptors, LiuRequestConfig } from './type'

import { ElLoading } from 'element-plus'
import { LoadingInstance } from 'element-plus/es/components/loading/src/loading'

const DEFAULT_LOADING = true

class LiuRequest {
  instance: AxiosInstance
  interceptors?: LiuRequestInterceptors
  loading?: LoadingInstance
  showLoading: boolean

  // 从config中取出的拦截器是对应实例的拦截器
  constructor(config: LiuRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config)
    // 保存基本信息
    this.interceptors = config.interceptors
    this.showLoading = config.showLoading ?? DEFAULT_LOADING

    // 使用拦截器
    // 1. 从config中取出的拦截器是对应实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 2. 添加所有实例公共的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // console.log('全部实例请求成功拦截器')
        this.loading = ElLoading.service({
          lock: true,
          text: '正在请求数据~',
          background: 'rgba(0,0,0,0.5 )'
        })
        return config
      },
      (error) => {
        // console.log('全部实例请求失败拦截器')
        return error
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        // console.log('全部实例响应拦成功拦截器')
        // 将loading移除
        this.loading?.close()

        const data = res.data
        if (data.returnCode === '-1001') {
          console.log('请求失败，错误信息~')
        } else {
          return data
        }
      },
      (error) => {
        // console.log('全部实例响应拦失败拦截器')
        // 将loading移除
        this.loading?.close()

        // 例子: 判断不同的HttpErrorCode显示不同的错误信息
        if (error.response.status === 404) {
          console.log('404错误~')
        }
        return error
      }
    )
  }

  request<T = any>(config: LiuRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 1.单个请求对请求config的处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      // 2. 判断是否需要显示loading
      if (config.showLoading === false) {
        this.showLoading = false
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 1. 单个请求对数据的处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          // 2. 将showLoading设置为true，这样不会影响下一个请求
          this.showLoading = DEFAULT_LOADING
          // 3.将结果resolve返回出去
          resolve(res)
        })
        .catch((error) => {
          // 将showLoading设置为true，这样不会影响下一个请求
          this.showLoading = DEFAULT_LOADING
          console.log(error)
          reject(error)
        })
    })
  }

  get<T = any>(config: LiuRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T = any>(config: LiuRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T = any>(config: LiuRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T = any>(config: LiuRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default LiuRequest
