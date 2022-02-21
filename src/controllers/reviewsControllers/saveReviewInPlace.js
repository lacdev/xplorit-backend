import { postReviewToPlace } from '../../usecases/reviewUsecases/postReviewToPlace.js'
import { ApiError } from '../../errors/ApiError.js'
import { updateSinglePlace } from '../../usecases/placeUsecases/updateSinglePlace.js'
import { getReviewsInPlaceBeforeCalculation } from '../../usecases/reviewUsecases/getReviewsInPlace.js'
import { averageReducer } from '../../utils/averageReducer.js'

const saveReviewInPlace = async (req, res, next) => {
  try {
    const { placeId } = req.params

    const newReview = req.body

    const savedReview = await postReviewToPlace(newReview)

    if (savedReview) {
      const reviews = await getReviewsInPlaceBeforeCalculation({
        placeId: placeId,
      })

      const starsArray = reviews.map((review) => review.stars)

      const weightedAverage = starsArray.reduce(averageReducer, 0).toFixed(1)

      const filter = { _id: placeId }

      const update = { average: weightedAverage }

      const placeUpdated = await updateSinglePlace(filter, update)

      if (placeUpdated) {
        res.json({
          description: 'Review created in the place successfully',
          statusCode: 200,
          data: savedReview,
        })
      }
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
      console.log(err)
      next({})
    }
  }
}

export { saveReviewInPlace }
