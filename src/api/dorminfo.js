import axios from '@/utils/request'

export function getDorminfo() {
  return axios.post('/dormitory/myDormitory')
}
export function getDormselectinfo() {
  return axios.post('/information/dormitories')
}
export function getselectinfo(data) {
  return axios.post('/information/search', data)
}
export function submitSelectDorm(data) {
  return axios.post('/information/apply', data)
}
