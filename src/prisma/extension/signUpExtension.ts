import { SignupData } from '../../schema/authSchema'
import { prisma, User } from '../'

import { ConflictError } from '../../error/conflictError'

const signUpExtension = {
  model: {
    user: {
      async signUp ({ name, email, password }: SignupData): Promise<User> {
        const existingUser = await prisma.user.findUnique({ where: { email } })

        if (existingUser !== null) {
          throw new ConflictError('User is already registered')
        }

        const createdUser = await prisma.user.create(
          { data: { name, email, password } }
        )
        return createdUser
      }
    }
  }
}

export default signUpExtension
