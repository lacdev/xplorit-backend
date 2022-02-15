import { ApiError } from '../../errors/ApiError.js'
import validator from 'express-validator'
const { body, validationResult } = validator

const validateUserLogin = async (req, res, next) => {
  try {
    const userEmailChain = body('email')
      .exists({ checkFalsy: true, checkNull: true })
      .withMessage('Email is required and must be filled.')
      .isEmail()
      .withMessage('Email is not a valid email.')
      .normalizeEmail()
      .run(req)

    const userPasswordChain = body('password')
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

    await Promise.all([userEmailChain, userPasswordChain])

    const result = validationResult(req)

    if (!result.isEmpty()) {
      next(
        ApiError.badRequest({ message: 'Bad Request', errors: result.array() })
      )
      return
    }

    next()
  } catch (err) {
    console.log(err)
    next({})
  }
}

export { validateUserLogin }
