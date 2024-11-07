import { DEFAULT_ADMIN_EMAIL, DEFAULT_ADMIN_PASSWORD } from '@/configs/env.config'
import { USER_ROLE } from '@/constants/UserConstant'
import userServices from '@/services/user.service'
import logger from '@/utils/logger'

const seedUsers = async () => {
  const adminExists = await userServices.checkHaveAdminAccount()

  if (!adminExists) {
    await userServices.createAccount({
      email: DEFAULT_ADMIN_EMAIL,
      password: DEFAULT_ADMIN_PASSWORD,
      name: 'Admin',
      role: USER_ROLE.ADMIN
    })
    logger.info('Admin account created')
  }
}

export default seedUsers
