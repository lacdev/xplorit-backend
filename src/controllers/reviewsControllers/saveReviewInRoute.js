import { postReviewToRoute } from '../../usecases/reviewUsecases/postReviewToRoute.js'
import { ApiError } from '../../errors/ApiError.js'

const saveReviewInRoute = async (req, res, next) => {
  const { routeId } = req.params
  const newReview = req.body

  try {
    newReview.routeId = routeId

    const savedReview = await postReviewToRoute(newReview)

    if (savedReview) {
      res.json({
        description: 'Review created in the route successfully',
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

export { saveReviewInRoute }
