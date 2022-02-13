import { deleteReviewFromRoute } from '../../usecases/reviewUsecases/deleteReviewFromRoute.js'
import { ApiError } from '../../errors/ApiError.js'

const deleteReviewInRoute = async (req, res, next) => {
  const { reviewId } = req.params

  try {
    const deletedReview = await deleteReviewFromRoute(reviewId)

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

export { deleteReviewInRoute }
