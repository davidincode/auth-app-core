import { Router } from 'express'

import authController from '@controller/authController'

import { schemeValidator, hashPassword } from '@middleware/index'
import { signupSchema, signinSchema } from '@schema/authSchema'

const authRouter = Router()

authRouter.post(
  '/register',
  schemeValidator(signupSchema),
  hashPassword,
  authController.registerUserLocally,
)

authRouter.post(
  '/login',
  schemeValidator(signinSchema),
  authController.loginUserLocally,
)

authRouter.post('/logout', (_req, _res) => {})
authRouter.post('/refresh', (_req, _res) => {})

export default authRouter
