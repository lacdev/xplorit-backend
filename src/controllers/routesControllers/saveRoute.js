import { ApiError } from '../../errors/ApiError.js'
import { createRoute } from '../../usecases/routeUsecases/createRoute.js'

const saveRoute = async (req, res, next) => {
  try {
    const newRoute = req.body

    const savedRoute = await createRoute(newRoute)

    if (savedRoute) {
      res.json({
        message: 'success',
        statusCode: 200,
        description: 'Route created successfully',
        data: savedRoute,
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

export { saveRoute }
