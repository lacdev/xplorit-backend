import { getSingleRoute } from '../../usecases/routeUsecases/getSingleRoute.js'
import { ApiError } from '../../errors/ApiError.js'

const getRoute = async (req, res, next) => {
  // const { id } = req.user

  //Validate payload equals to the user in the database they need to match.
  //Otherwise throw an error.

  // const foundUser = await getSingleUser({ _id: id })

  try {
    const { routeId } = req.params

    const singleRoute = await getSingleRoute({ _id: routeId })

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
