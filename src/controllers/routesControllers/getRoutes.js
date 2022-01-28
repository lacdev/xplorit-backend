import { getAllRoutes } from '../../usecases/routeUsecases/getAllRoutes.js'

const getRoutes = async (req, res, next) => {
  try {
    const allRoutes = await getAllRoutes()

    res.json({
      message: 'success',
      payload: {
        data: allRoutes,
        description: 'Routes found successfully',
        statusCode: 200,
      },
    })
  } catch (err) {
    console.error(err)
    next({})
  }
}

export { getRoutes }
