import { deleteSingleRoute } from '../../usecases/routeUsecases/deleteSingleRoute.js'

const deleteRoute = async (req, res) => {
  try {
    const { routeId } = req.params

    const deletedRoute = await deleteSingleRoute(routeId)

    if (deletedRoute) {
      res.json({
        message: 'success',
        payload: {
          data: 'No content',
          description: 'Deleted route successfully',
          statusCode: 204,
        },
      })
    }
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

export { deleteRoute }
