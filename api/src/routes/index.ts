import { Router } from 'express'
import authRouter from '@/routes/auth.routes'
import userRouter from '@/routes/user.routes'
import blogRouter from '@/routes/blog.routes'

const router = Router()

router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/blog', blogRouter)

export default router
