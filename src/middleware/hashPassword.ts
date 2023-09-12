import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcrypt'

const hashPassword = async (
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> => {
  const salt = await bcrypt.genSalt()
  req.body.password = await bcrypt.hash(req.body.password, salt)

  next()
}

export default hashPassword
