abstract class CustomError extends Error {
  abstract code: number
  abstract type: string

  constructor (message: string) {
    super(message)

    Object.setPrototypeOf(this, CustomError.prototype)
  }

  abstract serializeError (): Array<{ message: string, property?: string }>
}

export default CustomError
