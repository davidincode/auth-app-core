
import { Request, Response } from 'express'
import { xprisma } from '@xprisma/index'
import { generateUserToken, tokenLifetimeInSeconds } from '@util/jwt'
import { sendVerificationMail } from '@util/mail'

const registerUserLocally = async (req: Request, res: Response): Promise<void> => {
  const createdUser = await xprisma.user.signUp({ ...req.body })
  const [sessionToken, validationToken] = generateUserToken(createdUser.id)
  const { emailSent } = await sendVerificationMail({
    id: createdUser.id,
    name: createdUser.name,
    email: createdUser.email,
    validationToken
  })

  res.cookie('session', sessionToken, { httpOnly: true, maxAge: tokenLifetimeInSeconds * 1000 })
  res.status(201).json({ user: createdUser, emailSent })
}

const loginUserLocally = async (req: Request, res: Response): Promise<void> => {
  const authenticatedUser = await xprisma.user.signIn({ ...req.body })
  const [sessionToken] = generateUserToken(authenticatedUser.id)

  res.cookie('session', sessionToken, { httpOnly: true, maxAge: tokenLifetimeInSeconds * 1000 })
  res.status(200).json({ user: authenticatedUser })
}

export default {
  registerUserLocally,
  loginUserLocally
}
