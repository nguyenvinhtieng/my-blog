import mongoose from 'mongoose'
import { MONGO_URI } from '@/configs/env.config'
import logger from '@/utils/logger'
import seedUsers from '@/seed/user.seed'

export async function connectToDatabase() {
  try {
    await mongoose.connect(MONGO_URI)
    logger.info('Connect successfully')

    // Seed users
    seedUsers()
  } catch (e) {
    logger.info('Connect failure: ' + e)
  }
}
