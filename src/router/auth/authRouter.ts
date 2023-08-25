import { Router } from 'express'

const authRouter = Router()

authRouter.post('/register', (_req, _res) => {})
authRouter.post('/login', (_req, _res) => {})
authRouter.post('/logout', (_req, _res) => {})
authRouter.post('/refresh', (_req, _res) => {})

export default authRouter
