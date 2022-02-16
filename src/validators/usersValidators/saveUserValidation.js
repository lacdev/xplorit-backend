import { getSingleUser } from '../../usecases/userUsecases/getSingleUser.js'
import { ApiError } from '../../errors/ApiError.js'
import validator from 'express-validator'
const { body, validationResult } = validator

const validateUserSignup = async (req, res, next) => {
  try {
    const { username, email } = req.body

    // const { id } = req.user

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

    await Promise.all([
      usernameChain,
      userEmailChain,
      userPasswordChain,
      avatarChain,
      coverPhotoChain,
    ])

    const result = validationResult(req)

    if (!result.isEmpty()) {
      next(
        ApiError.badRequest({ message: 'Bad Request', errors: result.array() })
      )
      return
    }

    // const foundUser = await getSingleUser({ _id: id })

    const usernameExists = await getSingleUser({
      username: username,
    })

    if (usernameExists) {
      next(ApiError.badRequest('Username or email already registered.'))
      return
    }

    const emailExists = await getSingleUser({ email: email })

    if (emailExists) {
      next(ApiError.badRequest('Username or email already registered.'))
      return
    }

    next()
  } catch (err) {
    console.error(err)
    next(ApiError.badRequest(err))
  }
}

export { validateUserSignup }
