import { prisma, User } from '@xprisma/index'
import { SigninData } from '@schema/authSchema'
import { UnauthorizedError } from '@error/unauthorizedError'
import bcrypt from 'bcrypt'
import { generateUserTokenTuple } from '@util/jwt'

const signInExtension = {
  model: {
    user: {
      async signIn ({ email, password }: SigninData): Promise<{ authenticatedUser: User, sessionToken: string }> {
        const registeredUser = await prisma.user.findUnique({ where: { email } })

        if (registeredUser !== null) {
          const authenticated = await bcrypt.compare(password, registeredUser.password)

          if (authenticated) {
            const [sessionToken] = generateUserTokenTuple(registeredUser.id)
            return { authenticatedUser: registeredUser, sessionToken }
          }
          throw new UnauthorizedError('Incorrect password')
        }
        throw new UnauthorizedError('This user is not registered')
      }
    }
  }
}

export default signInExtension
