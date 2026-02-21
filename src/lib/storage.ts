import type { UserProfile } from '../types'

const TOKEN_KEY = 'auth_token'
const USER_KEY = 'user_profile'

export const authStorage = {
  getToken: () => localStorage.getItem(TOKEN_KEY),
  setToken: (token: string) => localStorage.setItem(TOKEN_KEY, token),
  clearToken: () => localStorage.removeItem(TOKEN_KEY),
  getUser: (): UserProfile | null => {
    const raw = localStorage.getItem(USER_KEY)
    return raw ? (JSON.parse(raw) as UserProfile) : null
  },
  setUser: (user: UserProfile) => localStorage.setItem(USER_KEY, JSON.stringify(user)),
  clearUser: () => localStorage.removeItem(USER_KEY),
  clearAll: () => {
    authStorage.clearToken()
    authStorage.clearUser()
  },
}
