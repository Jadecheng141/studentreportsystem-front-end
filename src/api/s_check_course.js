import request from '@/utils/request'
import axios from 'axios'

export function getlist(data) {
  return axios.get('/api/coursemanage', data);
}
export function searchCourses(query) {
  return axios.post('/api/coursemanage/courseselect', query, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
