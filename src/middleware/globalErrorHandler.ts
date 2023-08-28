import { Request, Response, NextFunction } from 'express'
import CustomError from '../error/customError'

const errorHandler = (error: Error, _req: Request, res: Response, _next: NextFunction): Response => {
  if (error instanceof CustomError) {
    return res.status(error.code).json({ type: error.type, issue: error.serializeError() })
  }

  return res.status(500).json({ error: error.message })
}

export default errorHandler
