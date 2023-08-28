
import { Request, Response } from 'express'
import { createUser } from '../../service/authService'

const registerUserLocally = async (req: Request, res: Response): Promise<void> => {
  const createdUser = await createUser({ ...req.body })
  res.status(200).json(createdUser)
}

export default {
  registerUserLocally
}
