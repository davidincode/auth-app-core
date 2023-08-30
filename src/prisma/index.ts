import { PrismaClient, User } from '@prisma/client'
import signUpExtension from './extension/signUpExtension'
import signInExtension from './extension/signInExtension'

const prisma = new PrismaClient()

// Extended Prisma
const xprisma = prisma.$extends(signUpExtension).$extends(signInExtension)

export { prisma, xprisma, User }
