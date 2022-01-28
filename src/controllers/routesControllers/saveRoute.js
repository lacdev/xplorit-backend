import { createRoute } from '../../usecases/routeUsecases/createRoute.js'

const saveRoute = async (req, res, next) => {
  const { newRoute } = req.body

  try {
    const savedRoute = await createRoute(newRoute)

    res.json({
      message: 'success',
      payload: {
        data: savedRoute,
        description: 'Route created successfully',
        statusCode: 200,
      },
    })
  } catch (err) {
    console.error(err)
    next({})
  }
}

export { saveRoute }
