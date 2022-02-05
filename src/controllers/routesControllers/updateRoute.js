import { updateSingleRoute } from '../../usecases/routeUsecases/updateSingleRoute.js'

const updateRoute = async (req, res, next) => {
  try {
    const { routeId } = req.params
    const { updatedContentForRoute } = req.body

    const updatedRoute = await updateSingleRoute(
      routeId,
      updatedContentForRoute
    )

    if (updatedRoute) {
      res.json({
        message: 'success',
        statusCode: 200,
        description: 'Updated route successfully',
      })
    }
  } catch (err) {
    console.error(err)
    next({})
  }
}

export { updateRoute }
