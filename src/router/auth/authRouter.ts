import { Router } from 'express'

import schemeValidator from '../../middleware/schemeValidator'
import hashPassword from '../../middleware/hashPassword'
import { signupSchema } from '../../schema/authSchema'

import authController from '../../controller/auth/authController'

const authRouter = Router()

authRouter.post('/register',
  schemeValidator(signupSchema),
  hashPassword,
  authController.registerUserLocally
)

authRouter.post('/login', (_req, _res) => {})
authRouter.post('/logout', (_req, _res) => {})
authRouter.post('/refresh', (_req, _res) => {})

export default authRouter
