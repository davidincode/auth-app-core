import { Request, Response } from 'express'
import { xprisma } from '@xprisma/index'

const verifyEmail = async (req: Request, res: Response): Promise<void> => {
  const { userId, validationToken } = req.params
  const updatedUser = await xprisma.user.verifyEmail({
    userId,
    validationToken,
  })
  res.status(201).json({ user: updatedUser })
}

export default {
  verifyEmail,
}
