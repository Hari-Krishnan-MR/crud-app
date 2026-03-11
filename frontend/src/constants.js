export const BASE_URL = "http://127.0.0.1:8000"

export const API_ENDPOINTS = {
  GET_ALL_STUDENTS:   `${BASE_URL}/students`,
  GET_STUDENT_BY_ID:  (id) => `${BASE_URL}/students/${id}`,
  SEARCH_BY_NAME:     (name) => `${BASE_URL}/students/search/by-name?name=${name}`,
  CREATE_STUDENT:     `${BASE_URL}/students`,
  UPDATE_STUDENT:     (id) => `${BASE_URL}/students/${id}`,
  DELETE_STUDENT:     (id) => `${BASE_URL}/students/${id}`,
}