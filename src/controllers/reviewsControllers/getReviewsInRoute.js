import { getAllReviewsFromRoute } from '../../usecases/reviewUsecases/getAllReviewsFromRoute.js'
import { ApiError } from '../../errors/ApiError.js'
import { isEmptyArray } from '../../utils/checkForEmptyArray.js'

const getReviewsInRoute = async (req, res, next) => {
  const { routeId } = req.params

  try {
    const allReviewsInRoute = await getAllReviewsFromRoute({ routeId: routeId })

    if (isEmptyArray(allReviewsInRoute)) {
      next(ApiError.notFound('No reviews for this route were found.'))
      return
    }

    res.json({
      message: 'Reviews for this route found successfully',
      statusCode: 200,
      data: allReviewsInRoute,
    })
  } catch (err) {
    console.log(err)

    next({})
  }
}

export { getReviewsInRoute }
