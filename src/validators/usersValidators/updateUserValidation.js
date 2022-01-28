import { ApiError } from '../../errors/ApiError.js'
import validator from 'express-validator'
const { param, body, validationResult } = validator
import { searchForUserBeforeCreation } from '../../usecases/userUsecases/searchUserBeforeCreation.js'
import { isEmptyArray } from '../../utils/checkForEmptyArray.js'

const validateUserUpdate = async (req, res, next) => {
  try {
    const { userId } = req.params

    const userIDChain = param('userId')
      .exists()
      .withMessage('Please provide a user ID.')
      .isMongoId()
      .withMessage('Please provide a valid ID.')
      .run(req)

    const passwordChain = body('password')
      .exists({ checkFalsy: true, checkNull: true })
      .withMessage(
        'Password is required and must be at least 8 characters and should contain a number.'
      )
      .not()
      .isEmpty()
      .isLength({ min: 8 })
      .withMessage(
        'Password needs to be at least 8 Characters and should contain at least 1 number.'
      )
      .matches(/\d/)
      .withMessage('must contain a number')
      .run(req)

    const avatarChain = body('avatar')
      .optional()
      .isURL()
      .withMessage('Please provide a valid avatar URL')
      .trim()
      .escape()
      .run(req)

    const coverPhotoChain = body('coverPhoto')
      .optional()
      .isURL()
      .withMessage('Please provide a valid cover photo URL')
      .trim()
      .escape()
      .run(req)

    await userIDChain
    await passwordChain
    await avatarChain
    await coverPhotoChain

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
      next(ApiError.badRequest('User not found.'))
      return
    }
    next()
  } catch (err) {
    console.error(err)

    next(ApiError.badRequest('No valid request to query a specific user.'))
  }
}

export { validateUserUpdate }
