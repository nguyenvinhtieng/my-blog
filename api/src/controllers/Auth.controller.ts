import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import logger from '@/utils/logger'
import userServices from '@/services/user.service'
import { JWT_SECRET } from '@/configs/env.config'
import { EXPIRE_REFRESH_TOKEN, EXPIRE_TOKEN, HTTP_STATUS } from '@/constants/CommonConstant'

class AuthController {
  /**
   * @description Login endpoint to authenticate user
   * @endpoint /api/auth/login
   */
  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body
    try {
      const user = await userServices.checkLogin(email, password)

      if (!user) {
        res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: 'Invalid credentials' })
        return
      }

      const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: EXPIRE_TOKEN })
      const refreshToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: EXPIRE_REFRESH_TOKEN })

      res.status(HTTP_STATUS.OK).json({ message: 'Login successful', token, user, refreshToken })
      return
    } catch (error) {
      logger.error('Login failed: ' + error)
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' })
      return
    }
  }

  /**
   * @description Refresh token endpoint
   * @endpoint /api/auth/refresh-token
   */
  async refreshToken(req: Request, res: Response): Promise<void> {
    const { refreshToken } = req.body
    try {
      const decoded = jwt.verify(refreshToken, JWT_SECRET)

      if (typeof decoded === 'object') {
        const token = jwt.sign({ userId: decoded?.userId }, JWT_SECRET, { expiresIn: EXPIRE_TOKEN })
        const newRefreshToken = jwt.sign({ userId: decoded?.userId }, JWT_SECRET, { expiresIn: EXPIRE_REFRESH_TOKEN })
        res.status(HTTP_STATUS.OK).json({ message: 'Token refreshed', token, refreshToken: newRefreshToken })
      } else {
        res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: 'Invalid token' })
      }
    } catch (error) {
      logger.error('Refresh token failed: ' + error)
      res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: 'Unauthorized' })
    }
  }
}

export default new AuthController()
