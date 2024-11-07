import logger from '@/utils/logger'
import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'
import userServices from '@/services/user.service'
import { JWT_SECRET } from '@/configs/env.config'
import { EXPIRE_REFRESH_TOKEN, EXPIRE_TOKEN, HTTP_STATUS } from '@/constants/CommonConstant'

class AuthController {
  /**
   * @description Login endpoint to authenticate user
   * @endpoint /api/auth/login
   */
  async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body
    try {
      const user = await userServices.checkLogin(email, password)

      if (!user) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).send({ message: 'Invalid credentials' })
      }

      const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: EXPIRE_TOKEN })
      const refreshToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: EXPIRE_REFRESH_TOKEN })

      return res.status(HTTP_STATUS.OK).send({ message: 'Login successful', token, user, refreshToken })
    } catch (error) {
      logger.error('Login failed: ' + error)
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({ message: 'Internal Server Error' })
    }
  }
}

export default new AuthController()
