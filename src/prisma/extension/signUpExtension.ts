import { prisma, User } from '@xprisma/index'
import { SignupData } from '@schema/authSchema'
import { ConflictError } from '@error/conflictError'
import { generateUserTokenTuple } from '@util/jwt'
import { sendVerificationMail } from '@util/mail'

const signUpExtension = {
  model: {
    user: {
      async signUp({
        name,
        email,
        password,
      }: SignupData): Promise<{
        createdUser: User
        emailSent: boolean
        sessionToken: string
      }> {
        const existingUser = await prisma.user.findUnique({ where: { email } })

        if (existingUser !== null) {
          throw new ConflictError('User is already registered')
        }

        const createdUser = await prisma.user.create({
          data: { name, email, password },
        })
        const [sessionToken, validationToken] = generateUserTokenTuple(
          createdUser.id,
        )

        const validationEmailToken = await prisma.authToken.create({
          data: {
            type: 'emailValidation',
            token: validationToken,
            userId: createdUser.id,
          },
        })

        const { emailSent } = await sendVerificationMail({
          id: createdUser.id,
          name: createdUser.name,
          email: createdUser.email,
          validationToken: validationEmailToken.token,
        })
        return { createdUser, emailSent, sessionToken }
      },
    },
  },
}

export default signUpExtension
