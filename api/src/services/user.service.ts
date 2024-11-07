import bcrypt from 'bcrypt'

import UserModel from '@/models/User.model'
import { OrNull } from '@/types/Common.types'
import { CreateAccountInterface, User } from '@/types/User.types'
import logger from '@/utils/logger'
import { USER_ROLE, USER_SENSITIVE_FIELDS } from '@/constants/UserConstant'

const userServices = {
  /**
   * @description Check if there is an admin account in the database
   * @returns boolean
   */
  checkHaveAdminAccount: async (): Promise<boolean> => {
    try {
      const adminExists = await UserModel.exists({ role: USER_ROLE.ADMIN })
      return Boolean(adminExists)
    } catch (e) {
      logger.error('Check for admin account failed: ' + e)
      return false
    }
  },

  /**
   * @description Create a new account with hashed password
   * @param body CreateAccountInterface
   * @returns User | null
   */
  createAccount: async (body: CreateAccountInterface): Promise<OrNull<User>> => {
    try {
      const { password, ...rest } = body
      const hashPassword = await bcrypt.hash(password, 10)

      const user = new UserModel({ ...rest, password: hashPassword })
      return await user.save()
    } catch (e) {
      logger.error('Create account failed: ' + e)
      return null
    }
  },

  /**
   * @description Get user by id
   * @param id string
   * @returns User | null
   */
  getUser: async (id: string): Promise<OrNull<User>> => {
    try {
      return await UserModel.findById(id).select(USER_SENSITIVE_FIELDS)
    } catch (e) {
      logger.error('Get user failed: ' + e)
      return null
    }
  },

  /**
   * @description Check login account
   * @param email string
   * @param password string
   * @returns User | null
   */
  checkLogin: async (email: string, password: string): Promise<OrNull<User>> => {
    try {
      const user = await UserModel.findOne({
        email
      })

      if (!user) {
        return null
      }

      const isMatch = await bcrypt.compare(password, user.password)

      return isMatch ? await userServices.getUser(user._id) : null
    } catch (e) {
      logger.error('Check login failed: ' + e)
      return null
    }
  }
}

export default userServices
