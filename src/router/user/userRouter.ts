import { Router } from 'express'
import userController from '@controller/userController'

const userRouter = Router()

userRouter.get('/profile', (_req, res) => {
  res.send('Successfully validated')
})
userRouter.put('/profile', (_req, _res) => {})
userRouter.post('/reset-password/request', (_req, _res) => {})
userRouter.post('/reset-password/confirm', (_req, _res) => {})
userRouter.get('/:userId/verify/:validationToken', userController.verifyEmail)

export default userRouter
