import { updateSingleRoute } from '../../usecases/routeUsecases/updateSingleRoute.js'
import { getSingleRoute } from '../../usecases/routeUsecases/getSingleRoute.js'

const updateRoute = async (req, res, next) => {
  try {
    const { routeId } = req.params
    const { updatedContentForRoute } = req.body

    const foundRoute = await getSingleRoute(routeId)

    const updatedRoute = await updateSingleRoute(
      foundRoute,
      updatedContentForRoute
    )

    if (updatedRoute) {
      res.json({
        message: 'success',
        description: 'Updated route successfully',
        statusCode: 200,
        data: updatedRoute,
      })
    }
  } catch (err) {
    console.error(err)
    next({})
  }
}

export { updateRoute }
