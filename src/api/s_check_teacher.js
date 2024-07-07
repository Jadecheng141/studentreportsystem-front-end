import axios from 'axios'

export function getlist(data) {
  return axios.post('/api/StuInfo', data)
}
export function searchCourses(formData) {
  return axios.post('/api/StuInfo/filterTeachers', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export function detailCourses(teacherId) {
  const formData = new FormData()
  // Add courseId to FormData
  formData.append('teacherId', teacherId)

  return axios.post('/api/StuInfo/teacherDetails', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
