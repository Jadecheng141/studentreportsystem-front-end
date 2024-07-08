import axios from '@/utils/request'

export function submitReportInfo(data) {
  return axios.post('/information/updateStudent', data)
}

