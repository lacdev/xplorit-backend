import { deleteLikeFromRoute } from '../../usecases/likeUsecases/deleteLikeFromRoute.js'
import { ApiError } from '../../errors/ApiError.js'

const deleteLikeInRoute = async (req, res, next) => {
  const { likeId } = req.params
  try {
    const deletedLike = await deleteLikeFromRoute(likeId)

    if (deletedLike) {
      res.json({
        message: 'success',
        statusCode: 204,
        data: 'Deleted like in route successfully',
      })
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
      next({})
    }
  }
}

export { deleteLikeInRoute }
