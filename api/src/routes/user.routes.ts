import userController from '@/controllers/User.controller'
import authMiddlewares from '@/middlewares/auth.middlewares'
import { Router } from 'express'

const authRouter = Router()

authRouter.get('/info', authMiddlewares.isAuth, userController.getUserInfo)

export default authRouter
