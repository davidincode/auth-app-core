import { Request, Response, NextFunction } from 'express'

import { AnyZodObject } from 'zod'
import { generateErrorMessage, ErrorMessageOptions } from 'zod-error'

import { ZodValidationError } from '../error/validationError'

const errorConfig: ErrorMessageOptions = {
  delimiter: {
    error: ' * '
  },
  transform: ({ errorMessage, index }): string =>
    `Error #${index + 1}: ${errorMessage}`
}
const schemeValidator =
  (scheme: AnyZodObject) =>
    async (req: Request, _res: Response, next: NextFunction) => {
      const validatedScheme = await scheme.safeParseAsync(req.body)

      if (!validatedScheme.success) {
        const errorMessage = generateErrorMessage(
          validatedScheme.error.issues,
          errorConfig
        )
        throw new ZodValidationError(errorMessage, validatedScheme.error.issues)
      }

      next()
    }

export default schemeValidator
