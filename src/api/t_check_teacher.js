import axios from '@/utils/request'

export function getlist(data) {
  return axios.post('/AdmInfo', data)
}
export function searchCourses(query) {
  return axios.post('AdmInfo/filterTeachers', query, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
export function createCourse(courseData) {
  const formData = new FormData()
  for (const key in courseData) {
    if (Object.prototype.hasOwnProperty.call(courseData, key)) {
      formData.append(key, courseData[key])
    }
  }
  return axios.post('/AdmInfo/Addteacher', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
export function deleteCourse(teacherId) {
  const formData = new FormData()
  formData.append('teacherId', teacherId)

  return axios.post('AdmInfo/Delteacher', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
export function updateCourse(courseData) {
  const formData = new FormData()
  for (const key in courseData) {
    if (Object.prototype.hasOwnProperty.call(courseData, key)) {
      formData.append(key, courseData[key])
    }
  }
  return axios.post('/AdmInfo/EditTeacherDetail', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
export function uploadImage(file) {
  const formData = new FormData()
  formData.append('file', file)
  return axios.post('AdmInfo/Addteacher/uploadTeacherPhoto', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
