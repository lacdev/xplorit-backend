import { getLikesFromRoute } from '../../usecases/likeUsecases/getLikesFromRoute.js'
import { getSingleRoute } from '../../usecases/routeUsecases/getSingleRoute.js'
import { ApiError } from '../../errors/ApiError.js'

const getLikesInRoute = async (req, res) => {
  const { routeId } = req.params

  try {
    const foundRoute = await getSingleRoute(routeId)

    const allLikesInRoute = await getLikesFromRoute(foundRoute._id)

    res.json({
      message: 'success',
      payload: {
        data: allLikesInRoute,
        description: 'Likes found successfully',
        statusCode: 200,
      },
    })
  } catch (err) {
    console.log(err)

    res.json({
      message: 'failure',
      error: {
        err,
        description: 'Could not get likes.',
        statusCode: 404,
      },
    })
  }
}

export { getLikesInRoute }
