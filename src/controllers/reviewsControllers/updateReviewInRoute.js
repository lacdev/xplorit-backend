import { updateReviewFromRoute } from '../../usecases/reviewUsecases/updateReviewFromRoute.js'
import { ApiError } from '../../errors/ApiError.js'

const updateReviewInRoute = async (req, res, next) => {
  const { reviewId } = req.params
  const updatedContent = req.body
  try {
    const updatedReview = await updateReviewFromRoute(reviewId, updatedContent)

    if (updatedReview) {
      res.json({
        message: 'Review updated successfully',
        statusCode: 200,
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

export { updateReviewInRoute }
