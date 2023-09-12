import CustomError from './customError'
import { ZodIssue } from 'zod'

export class ZodValidationError extends CustomError {
  code = 400
  type = 'ZodValidationError'

  constructor(message: string, private readonly zodIssue: ZodIssue[]) {
    super(message)

    Object.setPrototypeOf(this, ZodValidationError.prototype)
  }

  serializeError(): Array<{ message: string; property?: string | number }> {
    return this.zodIssue.map(issue => {
      return { message: issue.message, property: issue.path[0] }
    })
  }
}
