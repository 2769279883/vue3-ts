import { createApp } from 'vue'
import { globalRegister } from './global'

// 全局引入
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'

import 'normalize.css'
import './assets/css/index.less'

// import liuRequest from './serve'

import App from './App.vue'

import router from './router'
import store from './store'
import { setupStore } from './store'

const app = createApp(App)

app.use(globalRegister)
app.use(store)
setupStore()
app.use(router)

// app.use(ElementPlus)

app.mount('#app')

// interface DataType {
//   data: any
//   returnCode: string
//   success: boolean
// }

// liuRequest
//   .request<DataType>({
//     url: '/get',
//     method: 'GET',
//     interceptors: {
//       requestInterceptor: (config) => {
//         console.log('当前调用请求成功拦截器')
//         return config
//       },
//       requestInterceptorCatch: (error) => {
//         console.log('当前调用请求失败拦截器')
//         return error
//       },
//       responseInterceptor: (config) => {
//         console.log('当前调用响应成功拦截器')
//         return config
//       },
//       responseInterceptorCatch: (error) => {
//         console.log('当前调用响应失败拦截器')
//         return error
//       }
//     }
//   })
//   .then((res) => {
//     console.log(res)
//   })
//   .catch((error) => {
//     console.log(error)
//   })
