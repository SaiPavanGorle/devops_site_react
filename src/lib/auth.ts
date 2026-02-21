import { api } from './api'
import { authStorage } from './storage'
import type { AuthResponse, Role } from '../types'

export type LoginPayload = {
  email: string
  password: string
}

export type SignupPayload = {
  name: string
  email: string
  password: string
  role: Role
}

const persistAuth = (response: AuthResponse) => {
  authStorage.setToken(response.token)
  authStorage.setUser(response.user)
  return response.user
}

export const login = async (payload: LoginPayload) => {
  const { data } = await api.post<AuthResponse>('/auth/login', payload)
  return persistAuth(data)
}

export const signup = async (payload: SignupPayload) => {
  const { data } = await api.post<AuthResponse>('/auth/signup', payload)
  return persistAuth(data)
}
