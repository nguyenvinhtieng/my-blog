import authController from '@/controllers/Auth.controller'
import { Router } from 'express'

const authRouter = Router()

authRouter.post('/login', authController.login)
authRouter.post('/refresh-token', authController.refreshToken)

export default authRouter
