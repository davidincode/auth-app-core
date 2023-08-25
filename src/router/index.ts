import { Router } from 'express'

import authRouter from './auth/authRouter'
import userRouter from './user/userRouter'

const appRouter = Router()

appRouter.use('/auth', authRouter)
appRouter.use('/user', userRouter)

export default appRouter
