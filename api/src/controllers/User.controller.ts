import { Request, Response } from 'express'

import logger from '@/utils/logger'
import userServices from '@/services/user.service'
import { HTTP_STATUS } from '@/constants/CommonConstant'

class UserController {
  /**
   * @description Get User Information
   * @endpoint /api/user/info
   */
  async getUserInfo(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.userId

      if (!userId) {
        res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: 'Unauthorized' })
        return
      }

      const user = await userServices.getUser(userId)

      if (!user) {
        res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'User not found' })
        return
      }

      res.status(HTTP_STATUS.OK).json({ user })
      return
    } catch (error) {
      logger.error('Get user info failed: ' + error)
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' })
      return
    }
  }
}

export default new UserController()
