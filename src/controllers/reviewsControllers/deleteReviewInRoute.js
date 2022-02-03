import { deleteReviewFromRoute } from '../../usecases/reviewUsecases/deleteReviewFromRoute.js'

const deleteReviewInRoute = async (req, res, next) => {
  const { reviewId } = req.params

  try {
    const deletedReview = await deleteReviewFromRoute(reviewId)

    if (deletedReview) {
      res.json({
        message: 'success',
        data: 'No content',
        description: 'Deleted review successfully',
        statusCode: 204,
      })
    }
  } catch (err) {
    console.error(err)
    next({})
  }
}

export { deleteReviewInRoute }
