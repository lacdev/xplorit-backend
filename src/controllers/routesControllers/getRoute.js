import { getSingleRoute } from '../../usecases/routeUsecases/getSingleRoute.js'
import { ApiError } from '../../errors/ApiError.js'

const getRoute = async (req, res, next) => {
  const { routeId } = req.params

  try {
    const singleRoute = await getSingleRoute(routeId)

    if (singleRoute) {
      res.json({
        description: 'Route found',
        statusCode: 200,
        data: singleRoute,
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
      console.log(err)
      next({})
    }
  }
}

export { getRoute }
