import { createSingleUser } from '../../usecases/userUsecases/createSingleUser.js'
import { searchForUserBeforeCreation } from '../../usecases/userUsecases/searchUserBeforeCreation.js'
import { hashPassword } from '../../lib/bcrypt.js'
import { ApiError } from '../../errors/ApiError.js'

const saveUser = async (req, res, next) => {
  try {
    const { username, password, email } = req.body

    if (!email) {
      next(ApiError.badRequest('email is required and must be non blank'))
      return
    }

    if (!password) {
      next(ApiError.badRequest('password is required and must be non blank'))
      return
    }

    if (!username) {
      next(ApiError.badRequest('username is required and must be non blank'))
      return
    }

    const userNameExists = await searchForUserBeforeCreation({
      username: username,
      email: email,
    })

    if (userNameExists) {
      next(ApiError.badRequest('Username or email already registered.'))
    }

    // const emailExists = await searchForUserBeforeCreation({ email: email })

    // if (emailExists) {
    //   next(ApiError.badRequest('Email already registered.'))
    // }

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
    // res.json({
    //   message: 'failure',
    //   error: {
    //     description: 'Bad Request',
    //     statusCode: 400,
    //   },
    // })
  }
}

export { saveUser }
