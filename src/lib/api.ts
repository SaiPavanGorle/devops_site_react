import axios from 'axios'
import { authStorage } from './storage'

const baseURL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000'

export const api = axios.create({
  baseURL,
})

api.interceptors.request.use((config) => {
  const token = authStorage.getToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})
