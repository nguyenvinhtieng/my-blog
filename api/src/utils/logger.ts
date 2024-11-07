import { createLogger, format, transports } from 'winston'
import path from 'path'
import { MODE } from '@/configs/env.config'
import { RUNTIME_MODE } from '@/constants/CommonConstant'

const { combine, timestamp, printf, errors } = format

// Define Log Format
const logFormat = printf(({ timestamp, level, message, stack }) => {
  return `${timestamp} ${level}: ${stack || message}`
})

/**
 * @description Logger instance for logging
 * @property {string} level - Log level: info | debug
 * @params {string} format - Log format
 */
const logger = createLogger({
  level: MODE === RUNTIME_MODE.PRODUCTION ? 'info' : 'debug',
  format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), errors({ stack: true }), logFormat),
  transports: [
    new transports.Console({
      silent: MODE === RUNTIME_MODE.PRODUCTION
    })
  ]
})

if (MODE === RUNTIME_MODE.PRODUCTION) {
  logger.add(
    new transports.File({
      filename: path.join(__dirname, 'logs', 'app.log'),
      maxsize: 5 * 1024 * 1024,
      maxFiles: 5,
      tailable: true
    })
  )
}

export default logger
