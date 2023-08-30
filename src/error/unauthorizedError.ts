import CustomError from './customError'

export class UnauthorizedError extends CustomError {
  code = 401
  type = 'Unauthorized Error'

  constructor (message: string) {
    super(message)

    Object.setPrototypeOf(this, UnauthorizedError.prototype)
  }

  serializeError (): Array<{ message: string }> {
    return [{ message: this.message }]
  }
}
