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
        return res.status(HTTP_STATUS.UNAUTHORIZED).send({ message: 'Unauthorized' })
      }

      // get token from bearer token
      const token = bearerToken.split(' ')[1]
      if (!token) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).send({ message: 'Unauthorized' })
      }

      // verify token
      const decoded: any = jwt.verify(token, JWT_SECRET)

      next()
    } catch (_: unknown) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).send({ message: 'Unauthorized' })
    }
  }
}

export default authMiddlewares
