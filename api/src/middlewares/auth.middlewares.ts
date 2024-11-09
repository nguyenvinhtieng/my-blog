import jwt from 'jsonwebtoken'
import { HTTP_STATUS } from '@/constants/CommonConstant'
import { NextFunction, Request, Response } from 'express'
import { JWT_SECRET } from '@/configs/env.config'

const authMiddlewares = {
  isAuth: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // get bearer token from header
      const bearerToken = req.headers.authorization
      if (!bearerToken) {
        res.status(HTTP_STATUS.UNAUTHORIZED).send({ message: 'Unauthorized' })
        return
      }

      // get token from bearer token
      const token = bearerToken.split(' ')[1]
      if (!token) {
        res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: 'Unauthorized' })
        return
      }

      // verify token
      const decoded = jwt.verify(token, JWT_SECRET)
      if (typeof decoded === 'object') {
        req.user = {
          userId: decoded?.userId
        }
        next()
        return
      }

      res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: 'Unauthorized' })
      return
    } catch (_: unknown) {
      res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: 'Unauthorized' })
      return
    }
  }
}

export default authMiddlewares
