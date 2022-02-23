import { updateReviewFromRoute } from '../../usecases/reviewUsecases/updateReviewFromRoute.js'
import { getReviewsInRouteBeforeCalculation } from '../../usecases/reviewUsecases/getReviewsInRoute.js'
import { updateSingleRoute } from '../../usecases/routeUsecases/updateSingleRoute.js'
import { averageReducer } from '../../utils/averageReducer.js'
import { ApiError } from '../../errors/ApiError.js'

const updateReviewInRoute = async (req, res, next) => {
  try {
    const { routeId, reviewId } = req.params

    const updatedContent = req.body

    const updatedReview = await updateReviewFromRoute(reviewId, updatedContent)

    if (updatedReview) {
      const reviews = await getReviewsInRouteBeforeCalculation({
        routeId: routeId,
      })

      const starsArray = reviews.map((review) => review.stars)

      const weightedAverage = starsArray.reduce(averageReducer, 0).toFixed(1)

      const filter = { _id: routeId }

      const update = { average: weightedAverage }

      const routeUpdated = await updateSingleRoute(filter, update)

      if (routeUpdated) {
        res.json({
          message: 'Review updated in the route successfully',
          statusCode: 200,
          data: updatedReview,
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

export { updateReviewInRoute }
