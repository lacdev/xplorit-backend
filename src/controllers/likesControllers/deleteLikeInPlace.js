import { deleteLikeFromPlace } from '../../usecases/likeUsecases/deleteLikeFromPlace.js'
import { ApiError } from '../../errors/ApiError.js'

const deleteLikeInPlace = async (req, res, next) => {
  const { likeId } = req.params
  try {
    const deletedLike = await deleteLikeFromPlace(likeId)

    if (deletedLike) {
      res.json({
        message: 'success',
        statusCode: 204,
        data: 'Deleted like in place successfully',
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
      console.log(err)
      next({})
    }
  }
}

export { deleteLikeInPlace }
