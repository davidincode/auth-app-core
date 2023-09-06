import { PrismaClient, User } from '@prisma/client'
import signUpExtension from './extension/signUpExtension'
import signInExtension from './extension/signInExtension'
import verifyEmailExtension from './extension/verifyEmailExtension'

const prisma = new PrismaClient()

// Extended Prisma
const xprisma = prisma
  .$extends(signUpExtension)
  .$extends(signInExtension)
  .$extends(verifyEmailExtension)

export { prisma, xprisma, User }
