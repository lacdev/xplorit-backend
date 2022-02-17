import { postReviewToPlace } from '../../usecases/reviewUsecases/postReviewToPlace.js'
import { ApiError } from '../../errors/ApiError.js'
// import { getSinglePlace } from 'usecases/placeUsecases/getSinglePlace.js'
import { updateSinglePlace } from '../../usecases/placeUsecases/updateSinglePlace.js'
import { getReviewsInPlaceBeforeCalculation } from '../../usecases/reviewUsecases/getReviewsInPlace.js'

const saveReviewInPlace = async (req, res, next) => {
  try {
    const { placeId } = req.params
    const newReview = req.body

    // const { id } = req.user

    //Validate payload equals to the user in the database they need to match.
    //Otherwise throw an error.

    // const foundUser = await getSingleUser({ _id: id })

    // console.log('Are these my reviews?', reviews)

    newReview.placeId = placeId

    const savedReview = await postReviewToPlace(newReview)

    if (savedReview) {
      // Search for all the reviews in a place.

      const reviews = await getReviewsInPlaceBeforeCalculation({
        placeId: placeId,
      })

      const sumOfReviews = reviews.map((review) => review.stars)

      console.log('Are these my sum', sumOfReviews)

      // const average = sumOfReviews.reduce((number) => number)

      // const arr = [129, 139, 155, 176]

      const reducer = (acc, value, index, array) => {
        var calculatedValue = acc + value

        if (index === array.length - 1) {
          return calculatedValue / array.length
        }

        return calculatedValue
      }

      const weightedAverage = sumOfReviews.reduce(reducer, 0)

      console.log('Weighted result?', weightedAverage)

      const averageWithDecimals = weightedAverage.toFixed(1)

      console.log('Average with decimals?', averageWithDecimals)

      //Update the place with the new average.

      const filter = { _id: placeId }
      const update = { average: averageWithDecimals }

      const placeFound = await updateSinglePlace(filter, update)

      // await MyModel.updateMany({}, { $set: { name: 'foo' } })
      // const placeFound = await getSinglePlace({ _id: placeId })

      console.log('Is my place updated with the new average?', placeFound)

      res.json({
        description: 'Review created in the place successfully',
        statusCode: 200,
        data: savedReview,
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
      console.log(err)
      next({})
    }
  }
}

export { saveReviewInPlace }
