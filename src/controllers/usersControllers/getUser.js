import { getSingleUser } from '../../usecases/userUsecases/getSingleUser.js'
import { ApiError } from '../../errors/ApiError.js'
import { isEmptyObject } from '../../utils/checkForEmpyObject.js'

const getUser = async (req, res, next) => {
  try {
    const { userId } = req.params

    if (!userId) {
      next(ApiError.badRequest('user ID is required.'))
      return
    }

    const foundUser = await getSingleUser(userId)

    if (isEmptyObject(foundUser)) {
      next(ApiError.notFound('User not found.'))
      console.log(foundUser)
    }

    res.json({
      message: 'success',
      description: 'User found',
      statusCode: 200,
      foundUser,
    })
  } catch (err) {
    console.error(err)
    next({})
  }
}

export { getUser }
