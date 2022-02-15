import { getAllReviewsFromPlace } from '../../usecases/reviewUsecases/getAllReviewsFromPlace.js'
import { ApiError } from '../../errors/ApiError.js'
import { isEmptyArray } from '../../utils/checkForEmptyArray.js'

const getReviewsInPlace = async (req, res, next) => {
  try {
    const { placeId } = req.params

    const allReviewsInPlace = await getAllReviewsFromPlace({
      placeId: placeId,
    })

    console.log('What is this?', allReviewsInPlace)

    if (isEmptyArray(allReviewsInPlace)) {
      next(
        ApiError.notFound({
          message: 'No reviews for this place were found.',
          data: allReviewsInPlace,
        })
      )
      return
    }

    res.json({
      message: 'Reviews for this place found successfully',
      statusCode: 200,
      data: allReviewsInPlace,
    })
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

export { getReviewsInPlace }
