import { getSingleRoute } from '../../usecases/routeUsecases/getSingleRoute.js'

const getRoute = async (req, res) => {
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

export { getRoute }
