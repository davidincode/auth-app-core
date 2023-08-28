import { z } from 'zod'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const signupSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email().refine(async (email) => {
    const existingUser = await prisma.user.findUnique({ where: { email } })
    return existingUser === null
  }, { message: 'Email already exists' }),
  password: z.string().min(6)
})

export type SignupData = z.infer<typeof signupSchema>

export const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

export type SigninData = z.infer<typeof signinSchema>
