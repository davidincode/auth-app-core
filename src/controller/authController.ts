
import { Request, Response } from 'express'
import { xprisma } from '@xprisma/index'
import { createJwt, JWT_LIFETIME_IN_SECONDS } from '@util/jwt'

const registerUserLocally = async (req: Request, res: Response): Promise<void> => {
  const createdUser = await xprisma.user.signUp({ ...req.body })
  const jwt = createJwt(createdUser.id)

  res.cookie('jwt', jwt, { httpOnly: true, maxAge: JWT_LIFETIME_IN_SECONDS * 1000 })
  res.status(201).json({ user: createdUser })
}

const loginUserLocally = async (req: Request, res: Response): Promise<void> => {
  const authenticatedUser = await xprisma.user.signIn({ ...req.body })
  const jwt = createJwt(authenticatedUser.id)

  res.cookie('jwt', jwt, { httpOnly: true, maxAge: JWT_LIFETIME_IN_SECONDS * 1000 })
  res.status(200).json({ user: authenticatedUser })
}

export default {
  registerUserLocally,
  loginUserLocally
}
