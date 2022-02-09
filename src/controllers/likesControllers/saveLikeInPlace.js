import { postLikeToPlace } from '../../usecases/likeUsecases/postLikeToPlace.js'
import { ApiError } from '../../errors/ApiError.js'

const saveLikeInPlace = async (req, res, next) => {
  const { placeId } = req.params
  const { userId } = req.body

  try {
    const savedLike = await postLikeToPlace({
      placeId: placeId,
      userId: userId,
    })

    if (savedLike) {
      res.json({
        message: 'success',
        statusCode: 200,
        data: 'Like saved in place successfully',
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

export { saveLikeInPlace }
