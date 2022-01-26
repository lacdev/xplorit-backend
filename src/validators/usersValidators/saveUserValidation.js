/* eslint-disable no-unused-vars */
import { ApiError } from '../../errors/ApiError.js'
import validator from 'express-validator'
import { searchForUserBeforeCreation } from '../../usecases/userUsecases/searchUserBeforeCreation.js'
import { isEmptyArray } from '../../utils/checkForEmptyArray.js'

const { check, validationResult } = validator

const validateUserSignup = async (req, res, next) => {
  try {
    const { username, password, email, avatar, coverPhoto } = req.body

    //Validation on request body. Information needs to provided.

    if (!email) {
      next(ApiError.badRequest('email is required and must be filled.'))
      return
    }

    if (!password) {
      next(ApiError.badRequest('password is required and must be filled.'))
      return
    }

    if (!username) {
      next(ApiError.badRequest('username is required and must be filled.'))
      return
    }

    //Sanitization and validator chains on user registration requested information from body.

    const userEmailChain = check('email')
      .isEmail()
      .withMessage('Email is not a valid email.')
      .normalizeEmail()
      .run(req)

    const userPasswordChain = check('password')
      .not()
      .isEmpty()
      .isLength({ min: 8 })
      .withMessage('Password needs to be at least 8 Characters.')
      .matches(/\d/)
      .withMessage('must contain a number')
      .run(req)

    const usernameChain = check('username')
      .not()
      .isEmpty()
      .custom((value) => !/\s/.test(value))
      .withMessage('No spaces are allowed in the username')
      .trim()
      .escape()
      .run(req)

    const avatarChain = check('avatar')
      .optional()
      .isURL()
      .withMessage('Please provide a valid avatar URL')
      .trim()
      .escape()
      .run(req)

    const coverPhotoChain = check('coverPhoto')
      .optional()
      .isURL()
      .withMessage('Please provide a valid cover photo URL')
      .trim()
      .escape()
      .run(req)

    //Async Express validators array validation

    await usernameChain
    await userEmailChain
    await userPasswordChain
    await avatarChain
    await coverPhotoChain

    const result = validationResult(req)

    if (!result.isEmpty()) {
      next(
        ApiError.badRequest({ message: 'Bad Request', errors: result.array() })
      )
      return
    }

    //Async Validation whether or not a username or an email exists already in the database.

    const userNameExists = await searchForUserBeforeCreation({
      username: username,
    })

    const emailExists = await searchForUserBeforeCreation({ email: email })

    if (!isEmptyArray(userNameExists)) {
      next(ApiError.badRequest('Username already registered.'))
      return
    }

    if (!isEmptyArray(emailExists)) {
      next(ApiError.badRequest('Email already registered.'))
      return
    }

    next()
  } catch (err) {
    console.error(err)
    next(ApiError.badRequest(err))
  }
}

export { validateUserSignup }
