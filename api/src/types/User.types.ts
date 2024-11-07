import { USER_ROLE } from '@/constants/UserConstant'

export type UserRole = keyof typeof USER_ROLE

export interface User extends Document {
  _id: string
  email: string
  password: string
  name: string
  role: UserRole
}

export interface CreateAccountInterface {
  email: string
  password: string
  name: string
  role: UserRole
}
