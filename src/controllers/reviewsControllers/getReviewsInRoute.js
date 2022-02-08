import { getAllReviewsFromRoute } from '../../usecases/reviewUsecases/getAllReviewsFromRoute.js'
import { ApiError } from '../../errors/ApiError.js'
import { isEmptyArray } from '../../utils/checkForEmptyArray.js'

const getReviewsInRoute = async (req, res, next) => {
  try {
    const { routeId } = req.params

    let page = parseInt(req.query.page) || 1
    let limit = parseInt(req.query.limit) || 5

    const allReviewsInRoute = await getAllReviewsFromRoute(routeId, {
      page,
      limit,
    })

    if (isEmptyArray(allReviewsInRoute.reviews)) {
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
