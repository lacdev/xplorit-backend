import { getLikesFromRoute } from '../../usecases/likeUsecases/getLikesFromRoute.js'
import { ApiError } from '../../errors/ApiError.js'
import { isEmptyArray } from '../../utils/checkForEmptyArray.js'

const getLikesInRoute = async (req, res, next) => {
  const { routeId } = req.params
  try {
    const allLikesInRoute = await getLikesFromRoute({ routeId: routeId })

    if (isEmptyArray(allLikesInRoute)) {
      next(ApiError.notFound('No likes for this route were found.'))
      return
    }

    res.json({
      message: 'success',
      statusCode: 200,
      data: allLikesInRoute,
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
      next({})
    }
  }
}

export { getLikesInRoute }
