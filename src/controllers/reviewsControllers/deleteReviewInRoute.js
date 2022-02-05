import { deleteReviewFromRoute } from '../../usecases/reviewUsecases/deleteReviewFromRoute.js'

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
    console.error(err)
    next({})
  }
}

export { deleteReviewInRoute }
