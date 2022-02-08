import { ApiError } from '../../errors/ApiError.js'
import { createRoute } from '../../usecases/routeUsecases/createRoute.js'

const saveRoute = async (req, res, next) => {
  const newRoute = req.body

  try {
    const savedRoute = await createRoute(newRoute)

    if (!savedRoute) {
      next(
        ApiError.internalError(
          'Something bad happened while uploading the route.'
        )
      )
    }

    res.json({
      message: 'success',
      statusCode: 200,
      description: 'Route created successfully',
    })
  } catch (err) {
    console.error(err)
    next({})
  }
}

export { saveRoute }
