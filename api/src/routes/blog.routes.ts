import blogController from '@/controllers/Blog.controller'
import authMiddlewares from '@/middlewares/auth.middlewares'
import { Router } from 'express'

const authRouter = Router()

authRouter.post('/', authMiddlewares.isAuth, blogController.create)
authRouter.put('/:id', authMiddlewares.isAuth, blogController.update)
authRouter.delete('/', authMiddlewares.isAuth, blogController.delete)
authRouter.get('/:slug', blogController.get)
authRouter.get('/', blogController.list)

export default authRouter
