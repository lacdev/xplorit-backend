import { getSingleRoute } from '../../usecases/routeUsecases/getSingleRoute.js'

const getRoute = async (req, res, next) => {
  const { routeId } = req.params

  try {
    const singleRoute = await getSingleRoute(routeId)

    res.json({
      message: 'success',
      payload: {
        data: singleRoute,
        description: 'Route found',
        statusCode: 200,
      },
    })
  } catch (err) {
    console.error(err)
    next({})
  }
}

export { getRoute }
