import { createSingleUser } from '../../usecases/userUsecases/createSingleUser.js'
import { searchForUserBeforeCreation } from '../../usecases/userUsecases/searchUserBeforeCreation.js'
import { hashPassword } from '../../lib/bcrypt.js'
import { ApiError } from '../../errors/ApiError.js'
import { isEmptyArray } from '../../utils/checkForEmptyArray.js'
import validator from 'express-validator'

const { check, validationResult } = validator

const saveUser = async (req, res, next) => {
  try {
    const { username, password, email } = req.body

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

    //Sanitization and validator chains on user registration.

    const userEmailChain = check('email').isEmail().normalizeEmail().run(req)
    const userPasswordChain = check('password').isLength({ min: 8 }).run(req)
    const usernameChain = check('username')
      .not()
      .isEmpty()
      .trim()
      .escape()
      .run(req)

    //Express validators array
    await userEmailChain
    await userPasswordChain
    await usernameChain

    const result = validationResult(req)
    if (!result.isEmpty()) {
      next(
        ApiError.badRequest({ message: 'Bad Request', errors: result.array() })
      )
      return
    }

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

    const hashedPassword = await hashPassword(password)

    const savedUser = await createSingleUser({
      username,
      password: hashedPassword,
      email,
    })

    if (savedUser) {
      res.json({
        success: true,
        description: 'User created successfully',
        statusCode: 201,
      })
    }
  } catch (err) {
    console.error(err)
    next({})
  }
}

export { saveUser }
