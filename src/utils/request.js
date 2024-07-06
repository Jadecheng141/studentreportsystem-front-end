import axios from 'axios'
import { Message } from 'element-ui'

const instance = axios.create({
  baseURL: ' /api', // 使用代理
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})

// // 3. 配置信息
// const config = {
//   // 每次请求的协议、IP地址。  设置该配置后，每次请求路径都可以使用相对路径，例如"/admin/login"
//   baseURL: ' https://bfe5-113-249-231-182.ngrok-free.app',
//   // 请求超时时间
//   timeout: 10000,
//   // 每次请求携带cookie
//   withCredentials: true,
//   headers: {
//     'Content-Type': 'application/x-www-form-urlencoded' // 设置请求头为 x-www-form-urlencoded
//   }
// }
instance.defaults.headers.post['Content-Type'] = 'multipart/form-data'
instance.defaults.headers.get['Content-Type'] = 'multipart/form-data'
// request interceptor
instance.interceptors.request.use(
  config => {
    // do something before request is sent
    // if (!config.data) {
    //   config.data = true
    //   console.log('请求拦截:', config.headers)// 解决请求没有参数时添加不上Content-Type问题
    // }
    // if (store.getters.token) {
    //   // let each request carry token
    //   // ['X-Token'] is a custom headers key
    //   // please modify it according to the actual situation
    //   config.headers['X-Token'] = getToken()
    // }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  function (response) { // 成功的回调
    console.log('response:', response)
    return response
  },
  function (error) { // 失败的回调
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    if (error.response.status === 401) {
    //   $router.push('/login')

      // 弹窗提示
      Message.error('用户身份已过期，请重新登录!')
    }
    return Promise.reject(error)
  }
)

// response interceptor
// instance.interceptors.response.use(
/**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

/**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
//    */
//   response => {
//     const res = response.data

//     // if the custom code is not 20000, it is judged as an error.
//     if (res.code !== 20000) {
//       Message({
//         message: res.message || 'Error',
//         type: 'error',
//         duration: 5 * 1000
//       })

//       // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
//       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
//         // to re-login
//         MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
//           confirmButtonText: 'Re-Login',
//           cancelButtonText: 'Cancel',
//           type: 'warning'
//         }).then(() => {
//           store.dispatch('user/resetToken').then(() => {
//             location.reload()
//           })
//         })
//       }
//       return Promise.reject(new Error(res.message || 'Error'))
//     } else {
//       return res
//     }
//   },
//   error => {
//     console.log('err' + error) // for debug
//     Message({
//       message: error.message,
//       type: 'error',
//       duration: 5 * 1000
//     })
//     return Promise.reject(error)
//   }
// )

export default instance
