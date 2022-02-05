import { createRoute } from '../../usecases/routeUsecases/createRoute.js'

const saveRoute = async (req, res, next) => {
  const newRoute = req.body

  try {
    const savedRoute = await createRoute(newRoute)

    if (savedRoute) {
      res.json({
        message: 'success',
        statusCode: 200,
        description: 'Route created successfully',
      })
    }
  } catch (err) {
    console.error(err)
    next({})
  }
}

export { saveRoute }
