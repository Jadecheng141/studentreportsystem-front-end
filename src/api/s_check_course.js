import axios from 'axios'

export function getlist(data) {
  return axios.post('/api/coursemanage', data)
}
export function searchCourses(query) {
  return axios.post('/api/coursemanage/courseselect', query, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
export function detailCourses(courseId) {
  const formData = new FormData()
  // Add courseId to FormData
  formData.append('courseId', courseId)

  return axios.post('/api/coursemanage/coursedetail', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

