import { RUNTIME_MODE } from '@/constants/CommonConstant'
import 'dotenv/config'

export const PORT = process.env.PORT || 4000
export const HOST = process.env.HOST || 'localhost'
export const MODE = process.env.NODE_ENV || RUNTIME_MODE.DEV
export const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/my-blog'
export const DEFAULT_ADMIN_PASSWORD = process.env.DEFAULT_ADMIN_PASSWORD || ''
export const DEFAULT_ADMIN_EMAIL = process.env.DEFAULT_ADMIN_EMAIL || ''
export const JWT_SECRET = process.env.JWT_SECRET || 'my-secret'
