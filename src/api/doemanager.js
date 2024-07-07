import request from '@/utils/request'
import axios from 'axios';

export function searchCourses(query) {
  const formData = new FormData();
  for (const key in query) {
    if (query.hasOwnProperty(key)) {
      formData.append(key, query[key]);
    }
  }
  return axios.post('/api/management/searchDormitories', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}
export function deleteCourse(areano, dormno, roomno) {
  const formData = new FormData();
  formData.append('areano', areano);
  formData.append('dormno', dormno);
  formData.append('roomno', roomno);

  return axios.post('/api/management/delete', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}
export function getStudentDetails(roomno, dormno, areano) {
  const formData = new FormData();
  formData.append('roomno', roomno);
  formData.append('dormno', dormno);
  formData.append('areano', areano);

  return axios.post('/apimanagement/findStusByDormitory', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

