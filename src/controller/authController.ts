import { Request, Response } from 'express'
import { xprisma } from '@xprisma/index'
import { tokenLifetimeInSeconds } from '@util/jwt'

const registerUserLocally = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { createdUser, emailSent, sessionToken } = await xprisma.user.signUp({
    ...req.body,
  })

  res.cookie('session', sessionToken, {
    httpOnly: true,
    maxAge: tokenLifetimeInSeconds * 1000,
    secure: false,
    sameSite: 'none',
  })
  res.status(201).json({ user: createdUser, emailSent })
}

const loginUserLocally = async (req: Request, res: Response): Promise<void> => {
  const { authenticatedUser, sessionToken } = await xprisma.user.signIn({
    ...req.body,
  })

  res.cookie('session', sessionToken, {
    httpOnly: true,
    maxAge: tokenLifetimeInSeconds * 1000,
    sameSite: 'none',
  })
  res.status(200).json({ user: authenticatedUser })
}

export default {
  registerUserLocally,
  loginUserLocally,
}
