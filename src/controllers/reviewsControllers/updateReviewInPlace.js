import { getSinglePlace } from '../../usecases/placeUsecases/getSinglePlace.js'
import { updateReviewFromPlace } from '../../usecases/reviewUsecases/updateReviewFromPlace.js'

const updateReviewInPlace = async (req, res, next) => {
  const { placeId } = req.params
  const { updatedContent } = req.body
  try {
    const foundPlace = await getSinglePlace(placeId)

    const updatedReview = await updateReviewFromPlace(
      foundPlace._id,
      updatedContent
    )

    res.json({
      message: 'success',
      payload: {
        data: updatedReview,
        description: 'Updated review successfully',
        statusCode: 200,
      },
    })
  } catch (err) {
    console.error(err)
    next({})
  }
}

export { updateReviewInPlace }
