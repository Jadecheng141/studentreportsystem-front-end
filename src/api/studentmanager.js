import request from '@/utils/request'
import axios from 'axios';

export function getlist() {
  return axios.post('/api/manage/findStudents');
}

export function searchCourses(query) {
  const formData = new FormData();
  for (const key in query) {
    if (query.hasOwnProperty(key)) {
      formData.append(key, query[key]);
    }
  }
  // Convert filled to boolean if it's not already
  if (formData.has('filled')) {
    formData.set('filled', formData.get('filled') === '1' ? 'true' : 'false');
  }
  return axios.post('/api/manage/findStudents', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}
