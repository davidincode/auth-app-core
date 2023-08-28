import { SignupData } from '../schema/authSchema'
import { prisma, User } from '../config/database'

export const createUser = async ({ name, email, password }: SignupData): Promise<User> => {
  const createUser = await prisma.user.create({
    data: { name, email, password }
  })
  return createUser
}
