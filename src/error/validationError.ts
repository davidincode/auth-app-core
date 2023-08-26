import CustomError from './customError'

class ValidationError extends CustomError {
  code = 400
  type = 'ValidationError'

  constructor (message: string, private readonly property?: string) {
    super(message)

    Object.setPrototypeOf(this, ValidationError.prototype)
  }

  serializeError (): Array<{ message: string, property?: string }> {
    return [{ message: this.message, property: this.property }]
  }
}

export default ValidationError
