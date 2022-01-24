import { updateSingleRoute } from '../../usecases/routeUsecases/updateSingleRoute.js'
import { getSingleRoute } from '../../usecases/routeUsecases/getSingleRoute.js'
import { ApiError } from '../../errors/ApiError.js'

const updateRoute = async (req, res) => {
  try {
    const { routeId } = req.params
    const { updatedContentForRoute } = req.body

    const foundRoute = await getSingleRoute(routeId)

    const updatedRoute = await updateSingleRoute(
      foundRoute,
      updatedContentForRoute
    )

    res.json({
      message: 'success',
      payload: {
        data: updatedRoute,
        description: 'Updated route successfully',
        statusCode: 200,
      },
    })
  } catch (err) {
    console.error(err)
    res.json({
      message: 'failure',
      error: {
        err,
        description: 'Route not found.',
        statusCode: 404,
      },
    })
  }
}

export { updateRoute }
