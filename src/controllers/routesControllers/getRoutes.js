import { getAllRoutes } from '../../usecases/routeUsecases/getAllRoutes.js'
import { ApiError } from '../../errors/ApiError.js'
import { isEmptyArray } from '../../utils/checkForEmptyArray.js'

const getRoutes = async (req, res, next) => {
  try {
    let page = parseInt(req.query.page) || 1
    let limit = parseInt(req.query.limit) || 9

    //Filters object pending
    //Example getAllRoutes({filters}, {query})

    const allRoutes = await getAllRoutes({ page, limit })
    if (isEmptyArray(allRoutes)) {
      next(ApiError.notFound('No routes were found.'))
    }

    res.json({
      message: 'success',
      description: 'Routes found successfully',
      statusCode: 200,
      data: allRoutes,
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

export { getRoutes }
