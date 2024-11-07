export const USER_ROLE = {
  ADMIN: 'ADMIN',
  USER: 'USER'
} as const

export const USER_SENSITIVE_FIELDS = ['password'].map((field) => `-${field}`).join(' ')
