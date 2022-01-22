import { getSinglePlace } from '../../usecases/placeUsecases/getSinglePlace.js'
import { deleteReviewFromPlace } from '../../usecases/reviewUsecases/deleteReviewFromPlace.js'

const deleteReviewInPlace = async (req, res) => {
  const { placeId, reviewId } = req.params

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
    res.json({
      message: 'failure',
      error: {
        err,
        description: 'Route not found.',
        statusCode: 404,
      },
    })
  }
}

export { deleteReviewInPlace }
