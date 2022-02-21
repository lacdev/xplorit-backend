import { updateSingleRoute } from '../../usecases/routeUsecases/updateSingleRoute.js'
import { ApiError } from '../../errors/ApiError.js'

const updateRoute = async (req, res, next) => {
  try {
    const { routeId } = req.params

    const body = req.body

    const updatedRoute = await updateSingleRoute(routeId, body)

    if (updatedRoute) {
      res.json({
        message: 'success',
        statusCode: 200,
        description: 'Updated route successfully',
        data: updatedRoute,
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

export { updateRoute }
