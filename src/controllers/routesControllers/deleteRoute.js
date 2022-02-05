import { deleteSingleRoute } from '../../usecases/routeUsecases/deleteSingleRoute.js'

const deleteRoute = async (req, res, next) => {
  try {
    const { routeId } = req.params

    const deletedRoute = await deleteSingleRoute(routeId)

    if (deletedRoute) {
      res.json({
        message: 'success',
        statusCode: 204,
        data: 'Deleted route successfully',
      })
    }
  } catch (err) {
    console.error(err)
    next({})
  }
}

export { deleteRoute }
