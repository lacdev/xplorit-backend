import { getSingleUser } from '../../usecases/userUsecases/getSingleUser.js'
import { ApiError } from '../../errors/ApiError.js'
import validator from 'express-validator'
const { param, validationResult } = validator

const validateUserDeletion = async (req, res, next) => {
  try {
    const { userId } = req.params

    // const { id } = req.user

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

    // const foundUser = await getSingleUser({ _id: id })

    const foundUser = await getSingleUser({ _id: userId })

    if (!foundUser) {
      next(ApiError.notFound('User not found.'))
      return
    }

    next()
  } catch (err) {
    console.error(err)
    next(ApiError.badRequest('No valid request to query a specific user.'))
  }
}

export { validateUserDeletion }
