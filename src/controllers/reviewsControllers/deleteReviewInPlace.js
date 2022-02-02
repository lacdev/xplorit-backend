import { deleteReviewFromPlace } from '../../usecases/reviewUsecases/deleteReviewFromPlace.js'

const deleteReviewInPlace = async (req, res, next) => {
  const { reviewId } = req.params

  try {
    const deletedReview = await deleteReviewFromPlace(reviewId)

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

export { deleteReviewInPlace }
