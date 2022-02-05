import { getRoutesCreatedByUser } from '../../usecases/userUsecases/getRoutesCreatedByUser.js'

const getRoutesByUser = async (req, res, next) => {
  const { userId } = req.params

  try {
    const routesByUser = getRoutesCreatedByUser(userId)

    res.json({
      message: 'success',
      statusCode: 200,
      data: routesByUser,
    })
  } catch (err) {
    console.error(err)
    next({})
  }
}

export { getRoutesByUser }
