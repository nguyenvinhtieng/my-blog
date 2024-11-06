import { RUNTIME_MODE } from '@/constants/CommonConstant'
import 'dotenv/config'

export const PORT = process.env.PORT || 4000
export const HOST = process.env.HOST || 'localhost'
export const MODE = process.env.NODE_ENV || RUNTIME_MODE.DEV
