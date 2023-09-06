import { prisma, User } from '@xprisma/index'
import { ConflictError } from '@error/conflictError'
import { verifyToken } from '@util/jwt'

const verifyEmailExtension = {
  model: {
    user: {
      async verifyEmail ({ userId, validationToken }: { userId: string, validationToken: string }): Promise<User> {
        const userToken = await prisma.authToken.findUnique({
          where: { token: validationToken }
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

export default verifyEmailExtension
