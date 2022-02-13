import { deleteReviewFromPlace } from '../../usecases/reviewUsecases/deleteReviewFromPlace.js'
import { ApiError } from '../../errors/ApiError.js'

const deleteReviewInPlace = async (req, res, next) => {
  const { reviewId } = req.params

  try {
    const deletedReview = await deleteReviewFromPlace(reviewId)

    if (deletedReview) {
      res.json({
        message: 'success',
        statusCode: 204,
        data: 'Deleted review successfully',
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

export { deleteReviewInPlace }
