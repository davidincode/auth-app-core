import { PrismaClient, User } from '@prisma/client'
import signUpExtension from './extension/signUpExtension'

const prisma = new PrismaClient()

// Extended Prisma
const xprisma = prisma.$extends(signUpExtension)

export { prisma, xprisma, User }
