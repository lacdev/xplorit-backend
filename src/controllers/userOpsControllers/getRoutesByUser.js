import { getSingleUser } from '../../usecases/userUsecases/getSingleUser.js'
import { getRoutesCreatedByUser } from '../../usecases/userUsecases/getRoutesCreatedByUser.js'

const getRoutesByUser = async (req, res, next) => {
  const { userId } = req.params

  try {
    const foundUser = await getSingleUser(userId)

    const routesByUser = getRoutesCreatedByUser(foundUser._id)

    res.json({
      message: 'success',
      payload: {
        data: routesByUser,
        statusCode: 200,
      },
    })
  } catch (err) {
    console.error(err)
    next({})
  }
}

export { getRoutesByUser }
