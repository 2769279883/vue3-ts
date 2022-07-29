import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface LiuRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}

export interface LiuRequestConfig<T = AxiosResponse>
  extends AxiosRequestConfig {
  interceptors?: LiuRequestInterceptors<T>
  showLoading?: boolean
}
