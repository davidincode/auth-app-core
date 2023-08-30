import { prisma, User } from '@xprisma/index'
import { SigninData } from '@schema/authSchema'
import { UnauthorizedError } from '@error/unauthorizedError'
import bcrypt from 'bcrypt'

const signInExtension = {
  model: {
    user: {
      async signIn ({ email, password }: SigninData): Promise<User> {
        const registeredUser = await prisma.user.findUnique({ where: { email } })

        if (registeredUser !== null) {
          const authenticated = await bcrypt.compare(password, registeredUser.password)

          if (authenticated) {
            return registeredUser
          }
          throw new UnauthorizedError('Incorrect password')
        }
        throw new UnauthorizedError('This user is not registered')
      }
    }
  }
}

export default signInExtension
