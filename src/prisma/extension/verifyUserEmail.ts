import { prisma, User } from '@xprisma/index'
import { ConflictError } from '@error/conflictError'
import { verifyToken } from '@util/jwt'

const signInExtension = {
  model: {
    user: {
      async signIn ({ userId, validationToken }: { userId: string, validationToken: string }): Promise<User> {
        const userToken = await prisma.authToken.findFirst({
          where: { userId, token: validationToken }
        })

        if (userToken !== null) {
          const { validToken } = verifyToken(userToken.token)

          if (validToken) {
            const updatedUser = await prisma.user.update({
              where: { id: userId },
              data: { emailVerified: true }
            })
            return updatedUser
          }

          throw new ConflictError('Token has expired')
        }
        throw new ConflictError('Token or user ID is invalid')
      }
    }
  }
}

export default signInExtension
