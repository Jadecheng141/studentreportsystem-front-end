import request from '@/utils/request'
/* import axios from 'axios'

export function getCourses() {
  return axios.get('/api//CourseSel');
}

// 保存选中的课程
export function saveSelectedCourses(selectedCourses) {
  const formData = new FormData();
  selectedCourses.forEach(courseId => {
    formData.append('courseId', courseId);
  });
  return axios.post('/api/CourseSel/selectCourse', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
} */

import axios from 'axios'

export function getCourses(data) {
  return axios.post('/api/CourseSel', data)
}

export function getSelectedCourses() {
  return axios.get('/api/CourseSel/selectedCourses')
}

export function saveSelectedCourses(selectedCourses) {
  const formData = new FormData()
  selectedCourses.forEach(courseId => {
    formData.append('courseIds', courseId)
  })
  return axios.post('/api/CourseSel/selectCourse', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export function deleteCourse(courseId) {
  const formData = new FormData()
  formData.append('courseId', courseId)
  return axios.post('/api/CourseSel/dropCourse', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export function updateCourse(courseData) {
  const formData = new FormData()
  for (const key in courseData) {
    if (courseData.hasOwnProperty(key)) {
      formData.append(key, courseData[key])
    }
  }
  return axios.post('/api/AdmInfo/EditTeacherDetail', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
