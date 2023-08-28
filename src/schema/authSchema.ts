import { z } from 'zod'

export const signupSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(6)
})

export type SignupData = z.infer<typeof signupSchema>

export const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

export type SigninData = z.infer<typeof signinSchema>
