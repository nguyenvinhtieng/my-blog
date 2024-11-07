import authController from '@/controllers/Auth.controller'
import { Router } from 'express'

const authRouter = Router()

authRouter.post('/login', authController.login)

export default authRouter
