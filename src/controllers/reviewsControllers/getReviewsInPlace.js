import { getAllReviewsFromPlace } from '../../usecases/reviewUsecases/getAllReviewsFromPlace.js'
import { ApiError } from '../../errors/ApiError.js'
import { isEmptyArray } from '../../utils/checkForEmptyArray.js'

const getReviewsInPlace = async (req, res, next) => {
  const { placeId } = req.params

  try {
    const allReviewsInPlace = await getAllReviewsFromPlace(placeId)

    console.log('Reviews in place found????', allReviewsInPlace.reviews)

    if (isEmptyArray(allReviewsInPlace.reviews)) {
      next(ApiError.notFound('No reviews for this place were found.'))
      return
    }

    res.json({
      message: 'Reviews for this place found successfully',
      statusCode: 200,
      data: allReviewsInPlace,
    })
  } catch (err) {
    console.log(err)

    next({})
  }
}

export { getReviewsInPlace }
