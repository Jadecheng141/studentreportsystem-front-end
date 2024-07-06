import axios from '@/utils/request'

export function login(data) {
  console.log('登录进行：')
  return axios.post('/login', data)
}
export function signup(data) {
  return axios.post('/login/activate', data)
}
export function sendVerificationCode(email) {
  return axios.post('/login/sendVerificationCode', email)
}
export function findPassword(data) {
  return axios.post('/login/findpasswordback', data)
}
export function logout() {
  return axios.get('/login/logout')
}

// export function getInfo(token) {
//   return request({
//     url: '/vue-admin-template/user/info',
//     method: 'get',
//     params: { token }
//   })
// }

// export function getList(params) {
//   return request({
//     url: '/vue-admin-template/user/list',
//     method: 'get',
//     params
//   })
// }

// export function logout() {
//   return request({
//     url: '/vue-admin-template/user/logout',
//     method: 'post'
//   })
// }
