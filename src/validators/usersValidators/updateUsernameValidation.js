import { getSingleUser } from '../../usecases/userUsecases/getSingleUser.js'
import { ApiError } from '../../errors/ApiError.js'
import validator from 'express-validator'
const { body, validationResult } = validator

const validateUsernameUpdate = async (req, res, next) => {
  try {
    const { username } = req.body

    const { id } = req.user

    const foundUser = await getSingleUser({ _id: id })

    if (!foundUser) {
      next(ApiError.notFound('User not found.'))
      return
    }

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

    await Promise.all([usernameChain])

    const result = validationResult(req)

    if (!result.isEmpty()) {
      next(
        ApiError.badRequest({ message: 'Bad Request', errors: result.array() })
      )
      return
    }

    const usernameExists = await getSingleUser({
      username: username,
    })

    if (usernameExists) {
      next(ApiError.badRequest('Username already in use.'))
      return
    }

    next()
  } catch (e) {
    console.error(e)
    next(ApiError.badRequest(e))
  }
}

export { validateUsernameUpdate }
