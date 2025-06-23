import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || '/notesapi'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export interface Note {
  id: string
  title: string
  content: string
  user_id: string
  created_at: string
  updated_at: string
}

export interface AuthResponse {
  message: string
  token: string
  user: {
    id: number
    email: string
  }
}

export const authAPI = {
  login: (email: string, password: string) =>
    api.post<AuthResponse>('/auth/login', { email, password }),
  
  signup: (email: string, password: string) =>
    api.post<AuthResponse>('/auth/signup', { email, password }),
}

export const notesAPI = {
  getAll: () => api.get<Note[]>('/notes'),
  
  getById: (id: string) => api.get<Note>(`/notes/${id}`),
  
  create: (title: string, content: string) =>
    api.post<Note>('/notes', { title, content }),
  
  update: (id: string, title: string, content: string) =>
    api.put<Note>(`/notes/${id}`, { title, content }),
  
  delete: (id: string) => api.delete<{ message: string }>(`/notes/${id}`),
}

export default api