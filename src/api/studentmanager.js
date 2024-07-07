import request from '@/utils/request'
import axios from 'axios';

export function updateFeeStatus(studentId, state3) {
  const formData = new FormData();
  formData.append('id', studentId);
  formData.append('state3', state3);

  return axios.post('/api/manage/findStudents/state', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}
export function searchCourses(query) {
  const formData = new FormData();
  for (const key in query) {
    if (query.hasOwnProperty(key)) {
      formData.append(key, query[key]);
    }
  }
  // Convert filled to boolean if it's not already
  return axios.post('/api/manage/findStudents', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}
export function getStudentDetails(studentId) {
  const formData = new FormData();
  formData.append('id', studentId);

  return axios.post('/api/manage/findStudents/details', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}
