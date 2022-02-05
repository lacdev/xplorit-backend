import { getAllRoutes } from '../../usecases/routeUsecases/getAllRoutes.js'
import { ApiError } from '../../errors/ApiError.js'
import { isEmptyArray } from '../../utils/checkForEmptyArray.js'

const getRoutes = async (req, res, next) => {
  try {
    const allRoutes = await getAllRoutes()
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
    console.error(err)
    next({})
  }
}

export { getRoutes }
