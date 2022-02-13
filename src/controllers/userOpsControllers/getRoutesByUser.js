import { getRoutesCreatedByUser } from '../../usecases/userUsecases/getRoutesCreatedByUser.js'
import { ApiError } from '../../errors/ApiError.js'
import { isEmptyArray } from '../../utils/checkForEmptyArray.js'

const getRoutesByUser = async (req, res, next) => {
  const { userId } = req.params

  try {
    const routesByUser = await getRoutesCreatedByUser(userId)

    if (isEmptyArray(routesByUser)) {
      next(ApiError.notFound('No routes created by this user were found.'))
      return
    }

    res.json({
      message: 'success',
      statusCode: 200,
      data: routesByUser,
    })
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
      console.log(err)
      next({})
    }
  }
}

export { getRoutesByUser }
