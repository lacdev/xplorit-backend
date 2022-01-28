import { ApiError } from '../../errors/ApiError.js'
import validator from 'express-validator'
const { param, validationResult } = validator

const validateUserRetrieve = async (req, res, next) => {
  try {
    const userIDChain = param('userId')
      .exists()
      .withMessage('Please provide a user ID.')
      .isMongoId()
      .withMessage('Please provide a valid ID.')
      .run(req)

    await userIDChain

    const result = validationResult(req)

    if (!result.isEmpty()) {
      next(
        ApiError.badRequest({ message: 'Bad Request', errors: result.array() })
      )
      return
    }

    next()
  } catch (err) {
    console.error(err)

    next(ApiError.badRequest('No valid request to query a specific user.'))
  }
}

export { validateUserRetrieve }
