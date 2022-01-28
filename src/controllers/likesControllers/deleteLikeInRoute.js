import { getSingleRoute } from '../../usecases/routeUsecases/getSingleRoute.js'
import { deleteLikeFromRoute } from '../../usecases/likeUsecases/deleteLikeFromRoute.js'

const deleteLikeInRoute = async (req, res, next) => {
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
    next({})
  }
}

export { deleteLikeInRoute }
