import { deleteReviewFromPlace } from '../../usecases/reviewUsecases/deleteReviewFromPlace.js'

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
    console.error(err)
    next({})
  }
}

export { deleteReviewInPlace }
