import { USER_ROLE } from '@/constants/UserConstant'
import { User } from '@/types/User.types'
import { Schema, model } from 'mongoose'

const userSchema = new Schema<User>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: false },
  role: { type: String, enum: USER_ROLE, default: USER_ROLE.USER }
})

const UserModel = model<User>('User', userSchema)

export default UserModel
