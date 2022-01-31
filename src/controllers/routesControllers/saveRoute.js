import { createRoute } from '../../usecases/routeUsecases/createRoute.js'

const saveRoute = async (req, res, next) => {
  const newRoute = req.body

  try {
    const savedRoute = await createRoute(newRoute)

    if (savedRoute) {
      res.json({
        message: 'success',
        description: 'Route created successfully',
        statusCode: 200,
      })
    }
  } catch (err) {
    console.error(err)
    next({})
  }
}

export { saveRoute }
