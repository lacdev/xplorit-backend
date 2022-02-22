import { deleteLikeFromRoute } from '../../usecases/likeUsecases/deleteLikeFromRoute.js'
import { updateSingleRoute } from '../../usecases/routeUsecases/updateSingleRoute.js'
import { ApiError } from '../../errors/ApiError.js'

const deleteLikeInRoute = async (req, res, next) => {
  try {
    const { routeId } = req.params

    const { id } = req.user

    const deletedLike = await deleteLikeFromRoute({
      routeId: routeId,
      userId: id,
    })

    if (deletedLike) {
      const updatedRoute = await updateSingleRoute(routeId, {
        $inc: { likes: -1 },
      })

      if (updatedRoute) {
        res.json({
          message: 'success',
          statusCode: 204,
          data: 'Deleted like in place successfully',
        })
      }
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(
        ApiError.badRequest({
          message: 'Validation Error',
          errors: err,
        })
      )
      return
    } else {
      console.log(err)
      next({})
    }
  }
}

export { deleteLikeInRoute }
