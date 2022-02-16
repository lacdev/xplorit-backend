import { getSingleUser } from '../../usecases/userUsecases/getSingleUser.js'
import { ApiError } from '../../errors/ApiError.js'
import validator from 'express-validator'
const { param, body, validationResult } = validator

const validatePasswordUpdate = async (req, res, next) => {
  try {
    const { userId } = req.params

    // const { id } = req.user

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

    await Promise.all([passwordChain, userIDChain])

    const result = validationResult(req)

    if (!result.isEmpty()) {
      next(
        ApiError.badRequest({ message: 'Bad Request', errors: result.array() })
      )
      return
    }

    // const foundUser = await getSingleUser({ _id: id })

    const userExists = await getSingleUser({
      _id: userId,
    })

    if (!userExists) {
      next(ApiError.notFound('User not found.'))
      return
    }

    next()
  } catch (e) {
    console.error(e)
    next(ApiError.badRequest(e))
  }
}

export { validatePasswordUpdate }
