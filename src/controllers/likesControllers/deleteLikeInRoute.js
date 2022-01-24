import { getSingleRoute } from '../../usecases/routeUsecases/getSingleRoute.js'
import { deleteLikeFromRoute } from '../../usecases/likeUsecases/deleteLikeFromRoute.js'
import { ApiError } from '../../errors/ApiError.js'

const deleteLikeInRoute = async (req, res) => {
  try {
    const { routeId, likeId } = req.params

    const foundRoute = await getSingleRoute(routeId)

    const deletedLike = await deleteLikeFromRoute(foundRoute._id, likeId)

    if (deletedLike) {
      res.json({
        message: 'success',
        payload: {
          data: 'No content',
          description: 'Deleted like successfully',
          statusCode: 204,
        },
      })
    }
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

export { deleteLikeInRoute }
