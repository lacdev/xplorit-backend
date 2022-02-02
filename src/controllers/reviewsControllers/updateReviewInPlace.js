import { updateReviewFromPlace } from '../../usecases/reviewUsecases/updateReviewFromPlace.js'

const updateReviewInPlace = async (req, res, next) => {
  const { reviewId } = req.params
  const updatedContent = req.body
  try {
    const updatedReview = await updateReviewFromPlace(reviewId, updatedContent)

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

export { updateReviewInPlace }
