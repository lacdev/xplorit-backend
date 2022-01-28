import { ApiError } from '../../errors/ApiError.js'
import validator from 'express-validator'
import { isEmptyObject } from '../../utils/checkForEmpyObject.js'
import { getSingleUser } from '../../usecases/userUsecases/getSingleUser.js'
const { param, validationResult } = validator

const validateUserRoutes = async (req, res, next) => {
  try {
    const { userId } = req.params

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

    const foundUser = await getSingleUser(userId)

    if (isEmptyObject(foundUser)) {
      next(ApiError.notFound('User not found.'))
      return
    }

    next()
  } catch (err) {
    console.error(err)

    next(ApiError.badRequest('No valid request to query a specific user.'))
  }
}

export { validateUserRoutes }
