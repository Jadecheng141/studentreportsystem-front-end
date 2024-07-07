import request from '@/utils/request'
import axios from 'axios'

export function getlist() {
  return axios.get('/api/AdmInfo');
}
export function searchCourses(query) {
  const formData = new FormData();
  for (const key in query) {
    if (query.hasOwnProperty(key)) {
      formData.append(key, query[key]);
    }
  }
  return axios.post('/api/AdmInfo/filterTeachers', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}
export function createCourse(courseData) {
  const formData = new FormData();
  for (const key in courseData) {
    if (courseData.hasOwnProperty(key)) {
      formData.append(key, courseData[key]);
    }
  }
  return axios.post('/api/AdmInfo/Addteacher', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}
export function deleteCourse(teacherId) {
  const formData = new FormData();
  formData.append('teacherId', teacherId);

  return axios.post('/api/AdmInfo/Delteacher', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}
export function updateCourse(courseData) {
  const formData = new FormData();
  for (const key in courseData) {
    if (courseData.hasOwnProperty(key)) {
      formData.append(key, courseData[key]);
    }
  }
  return axios.post('/api/AdmInfo/EditTeacherDetail', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}
export function uploadImage(file) {
  const formData = new FormData();
  formData.append('file', file);
  return axios.post('/api/AdmInfo/Addteacher/uploadTeacherPhoto', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}
export function detailCourses(teacherId) {
  const formData = new FormData();
  formData.append('teacherId', teacherId);

  return axios.post('/api/AdmInfo/teacherDetails', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}
