import { getAllRoutes } from '../../usecases/routeUsecases/getAllRoutes.js'
import { ApiError } from '../../errors/ApiError.js'
import { isEmptyArray } from '../../utils/checkForEmptyArray.js'

const getRoutes = async (req, res, next) => {
  try {
    const allRoutes = await getAllRoutes(req.query)

    // console.log('All routes is returning what? ', allRoutes.routes)

    if (isEmptyArray(allRoutes.routes)) {
      next(ApiError.notFound('No routes were found.'))
      return
    }

    res.json({
      message: 'success',
      description: 'Routes found successfully',
      statusCode: 200,
      data: allRoutes,
    })
  } catch (err) {
    if (err.name === 'MongoServerError') {
      next(
        ApiError.badRequest({
          message: 'Error',
          errors: err.message,
        })
      )
      return
    } else {
      console.log(err)
      next({})
    }
  }
}

export { getRoutes }
