import { ApiError } from '../../errors/ApiError.js'
import { createRoute } from '../../usecases/routeUsecases/createRoute.js'

const saveRoute = async (req, res, next) => {
  const newRoute = req.body

  // const { id } = req.user

  //Validate payload equals to the user in the database they need to match.
  //Otherwise throw an error.

  // const foundUser = await getSingleUser({ _id: id })

  try {
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
