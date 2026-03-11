import axios from "axios"
import { API_ENDPOINTS } from "../constants"

export const studentService = {

  getAll: async () => {
    const res = await axios.get(API_ENDPOINTS.GET_ALL_STUDENTS)
    return res.data
  },

  getById: async (id) => {
    const res = await axios.get(API_ENDPOINTS.GET_STUDENT_BY_ID(id))
    return res.data
  },

  searchByName: async (name) => {
    const res = await axios.get(API_ENDPOINTS.SEARCH_BY_NAME(name))
    return res.data
  },

  create: async (studentData) => {
    const res = await axios.post(API_ENDPOINTS.CREATE_STUDENT, studentData)
    return res.data
  },

  update: async (id, studentData) => {
    const res = await axios.put(API_ENDPOINTS.UPDATE_STUDENT(id), studentData)
    return res.data
  },

  delete: async (id) => {
    const res = await axios.delete(API_ENDPOINTS.DELETE_STUDENT(id))
    return res.data
  },
}