import { deleteSingleRoute } from '../../usecases/routeUsecases/deleteSingleRoute.js'
import { ApiError } from '../../errors/ApiError.js'

const deleteRoute = async (req, res, next) => {
  try {
    const { routeId } = req.params

    // const { id } = req.user

    //Validate payload equals to the user in the database they need to match.
    //Otherwise throw an error.

    // const foundUser = await getSingleUser({ _id: id })

    const deletedRoute = await deleteSingleRoute(routeId)

    if (deletedRoute) {
      res.json({
        message: 'success',
        statusCode: 204,
        data: 'Deleted route successfully',
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

export { deleteRoute }
