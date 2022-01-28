import { getSinglePlace } from '../../usecases/placeUsecases/getSinglePlace.js'
import { deleteReviewFromPlace } from '../../usecases/reviewUsecases/deleteReviewFromPlace.js'

const deleteReviewInPlace = async (req, res, next) => {
  const { placeId, reviewId } = req.params
  console.log(placeId, reviewId)

  try {
    const foundPlace = await getSinglePlace(placeId)

    const deletedReview = await deleteReviewFromPlace(foundPlace._id, reviewId)

    if (deletedReview) {
      res.json({
        message: 'success',
        payload: {
          data: 'No content',
          description: 'Deleted review successfully',
          statusCode: 204,
        },
      })
    }
  } catch (err) {
    console.error(err)
    next({})
  }
}

export { deleteReviewInPlace }
