import { getSingleUser } from '../../usecases/userUsecases/getSingleUser.js'
import { ApiError } from '../../errors/ApiError.js'
import validator from 'express-validator'
const { param, body, validationResult } = validator

const validateUsernameUpdate = async (req, res, next) => {
  try {
    const { userId } = req.params
    const { username } = req.body

    // const { id } = req.user

    //Validate payload equals to the user in the database they need to match.
    //Otherwise throw an error.

    // const foundUser = await getSingleUser({ _id: id })

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

    // const foundUser = await getSingleUser({ _id: id })

    const userExists = await getSingleUser({
      _id: userId,
    })

    if (!userExists) {
      next(ApiError.notFound('User not found.'))
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
