import axios from '@/utils/request'

export function submitReportInfo() {
  return axios.post('/information/updateStudent')
}

