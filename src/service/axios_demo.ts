import axios from 'axios' // axios的实例对象

// 4. axios的配置选项
// 4.1. 全局配置
axios.defaults.baseURL = 'http://httpbin.org'
axios.defaults.timeout = 10000
// axios.defaults.headers = {}

// 4.2. 每一个请求的单独配置
axios
  .get('/get', {
    params: {
      name: 'liu',
      age: 12
    },
    timeout: 5000,
    headers: {}
  })
  .then((res) => {
    console.log(res)
  })

axios
  .post('/post', {
    data: {
      name: '舸',
      age: 16
    }
  })
  .then((res) => {
    console.log(res)
  })

// 5. axios.all -> 其实内部用的就是promise.all
axios
  .all([
    axios.get('/get', { params: { name: 'xiu', age: 18 } }),
    axios.post('/post', { data: { name: 'xiu', age: 18 } })
  ])
  .then((res) => {
    console.log(res)
  })

// 6. axios的拦截器
// fn1: 请求发送成功会执行的函数
// fn2: 请求发送失败会执行的函数
axios.interceptors.request.use(
  (config) => {
    // 想做的操作
    // 1. 给请求添加token
    // 2. isloading动画
    console.log('请求发送成功')
    return config
  },
  (error) => {
    console.log('请求发送错误')
    return error
  }
)

// fn1: 数据响应成功（服务器正常的返回了数据20x）
// fn2: 数据响应失败（服务器返回数据异常40x、50x）
axios.interceptors.response.use(
  (res) => {
    console.log('响应成功的拦截')
    return res
  },
  (error) => {
    console.log('响应失败的拦截')
    return error
  }
)
