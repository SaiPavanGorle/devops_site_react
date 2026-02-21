export const ROLES = ['Developer', 'DevOps', 'Tester', 'Manager', 'BA'] as const

export type Role = (typeof ROLES)[number]

export type UserProfile = {
  name: string
  email: string
  role: Role
}

export type AuthResponse = {
  token: string
  user: UserProfile
}
