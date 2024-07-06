import request from '@/utils/request'
import axios from 'axios'

export function getlist(data) {
  return axios.get('/api/coursemanage', data);
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
    formData.set('filled', formData.get('filled') === 'true');
  }
  return axios.post('/api/coursemanage/courseselect', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}
export function detailCourses(courseId) {
  const formData = new FormData();
  // Add courseId to FormData
  formData.append('courseId', courseId);

  return axios.post('/api/coursemanage/coursedetail', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}



