import CustomError from './customError'

export class ConflictError extends CustomError {
  code = 409
  type = 'Conflict Error'

  constructor (message: string) {
    super(message)

    Object.setPrototypeOf(this, ConflictError.prototype)
  }

  serializeError (): Array<{ message: string }> {
    return [{ message: this.message }]
  }
}
