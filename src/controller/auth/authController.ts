
import { Request, Response } from 'express'
import { xprisma } from '../../prisma'

const registerUserLocally = async (req: Request, res: Response): Promise<void> => {
  const createdUser = await xprisma.user.signUp({ ...req.body })
  res.status(201).json(createdUser)
}

export default {
  registerUserLocally
}
