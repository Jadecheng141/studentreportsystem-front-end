import request from '@/utils/request'
import axios from 'axios'

export function getlist() {
  return axios.get('/api/StuInfo');
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
  return axios.post('/api/StuInfo/filterTeachers', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

export function detailCourses(teacherId) {
  const formData = new FormData();
  // Add courseId to FormData
  formData.append('teacherId', teacherId);

  return axios.post('/api/StuInfo/teacherDetails', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}
