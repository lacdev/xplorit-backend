import { ApiError } from '../../errors/ApiError.js'
import validator from 'express-validator'
const { param, body, validationResult } = validator
import { searchForUserBeforeCreation } from '../../usecases/userUsecases/searchUserBeforeCreation.js'
import { isEmptyArray } from '../../utils/checkForEmptyArray.js'

const validateUsernameUpdate = async (req, res, next) => {
  try {
    const { userId } = req.params
    const { password } = req.body

    const userIDChain = param('userId')
      .exists()
      .withMessage('Please provide a user ID.')
      .isMongoId()
      .withMessage('Please provide a valid ID.')
      .run(req)

    const usernameChain = body('username')
      .exists({ checkFalsy: true, checkNull: true })
      .withMessage('Username is required and must be at least 4 characters.')
      .not()
      .isEmpty()
      .custom((value) => !/\s/.test(value))
      .withMessage('No spaces are allowed in the username')
      .trim()
      .escape()
      .run(req)

    await Promise.all([usernameChain, userIDChain])

    const result = validationResult(req)

    if (!result.isEmpty()) {
      next(
        ApiError.badRequest({ message: 'Bad Request', errors: result.array() })
      )
      return
    }

    const userNameExists = await searchForUserBeforeCreation({
      _id: userId,
    })

    if (isEmptyArray(userNameExists)) {
      next(ApiError.badRequest('Username not found.'))
      return
    }

    next()
  } catch (e) {
    console.error(err)
    next(ApiError.badRequest(err))
  }
}

export { validateUsernameUpdate }
