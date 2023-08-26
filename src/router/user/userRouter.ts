import { Router } from 'express'
import schemeValidator from '../../middleware/schemeValidator'
import { signupSchema } from '../../schema/authSchema'

const userRouter = Router()

userRouter.get('/profile', (_req, res) => {
  res.send('Successfully validated')
})
userRouter.put('/profile', schemeValidator(signupSchema), (_req, _res) => {})
userRouter.post('/reset-password/request', (_req, _res) => {})
userRouter.post('/reset-password/confirm', (_req, _res) => {})
userRouter.get('/api/verify-email/:token', (_req, _res) => {})

export default userRouter
