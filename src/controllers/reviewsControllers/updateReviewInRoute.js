import { updateReviewFromRoute } from '../../usecases/reviewUsecases/updateReviewFromRoute.js'

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
    console.error(err)
    next({})
  }
}

export { updateReviewInRoute }
