import { getSingleUser } from '../../usecases/userUsecases/getSingleUser.js'
import { ApiError } from '../../errors/ApiError.js'

const getUser = async (req, res, next) => {
  try {
    const { userId } = req.params

    const foundUser = await getSingleUser({
      _id: userId,
    })

    if (foundUser) {
      res.json({
        message: 'success',
        description: 'User found',
        statusCode: 200,
        foundUser,
      })
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(
        ApiError.badRequest({
          message: 'Validation Error',
          errors: err,
        })
      )
      return
    } else {
      next({})
    }
  }
}

export { getUser }
