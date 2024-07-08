/* import request from '@/utils/request'
import axios from 'axios'

export function getlist() {
  return axios.get('/api/coursemanage/teacherinitial');
}

export function searchCourses(query) {
  const formData = new FormData();
  for (const key in query) {
    if (query.hasOwnProperty(key)) {
      formData.append(key, query[key]);
    }
  }
  // Convert filled to boolean if it's not already
  if (formData.has('statusempty')) {
    formData.set('statusempty', formData.get('statusempty') === '1' ? 'true' : 'false');
  }
  if (formData.has('filled')) {
    formData.set('filled', formData.get('filled') === 'true');
  }
  return axios.post('/api/coursemanage/courseteacherselect', formData, {
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
  return axios.post('/api/coursemanage/coursecreate', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}
export function detailCourses(courseId) {
  const formData = new FormData();
  formData.append('courseId', courseId);

  return axios.post('/api/coursemanage/beforeupdate', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

// 修改更新课程的函数以包含课程ID和状态
export function updateCourse(courseId, courseData) {
  const formData = new FormData();
  formData.append('courseId', courseId); // 添加课程ID到FormData
  for (const key in courseData) {
    if (courseData.hasOwnProperty(key)) {
      formData.append(key, courseData[key]);
    }
  }
  return axios.post('/api/coursemanage/update', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

export function deleteCourse(courseId) {
  const formData = new FormData();
  formData.append('courseId', courseId);

  return axios.post('/api/coursemanage/coursedelete', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}
 */
import request from '@/utils/request'
import axios from 'axios'

export function getlist() {
  return axios.get('/api/coursemanage/teacherinitial')
}

export function searchCourses(query) {
  return axios.post('/api/coursemanage/courseteacherselect', query, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export function createCourse(courseData) {
  const formData = new FormData()
  for (const key in courseData) {
    if (courseData.hasOwnProperty(key)) {
      formData.append(key, courseData[key])
    }
  }
  return axios.post('/api/coursemanage/coursecreate', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export function detailCourses(courseId) {
  const formData = new FormData()
  formData.append('courseId', courseId)

  return axios.post('/api/coursemanage/beforeupdate', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export function updateCourse(courseId, courseData) {
  const formData = new FormData()
  formData.append('courseId', courseId) // 添加课程ID到FormData
  for (const key in courseData) {
    if (courseData.hasOwnProperty(key)) {
      formData.append(key, courseData[key])
    }
  }
  return axios.post('/api/coursemanage/update', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export function deleteCourse(courseId) {
  const formData = new FormData()
  formData.append('courseId', courseId)

  return axios.post('/api/coursemanage/coursedelete', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
