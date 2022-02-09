import { postReviewToPlace } from '../../usecases/reviewUsecases/postReviewToPlace.js'
import { ApiError } from '../../errors/ApiError.js'

const saveReviewInPlace = async (req, res, next) => {
  try {
    const { placeId } = req.params
    const newReview = req.body

    newReview.placeId = placeId

    const savedReview = await postReviewToPlace(newReview)

    if (savedReview) {
      res.json({
        description: 'Review created in the place successfully',
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

export { saveReviewInPlace }
