import { ApiError } from '../../errors/ApiError.js'
import { getAllReviewsFromRoute } from '../../usecases/reviewUsecases/getAllReviewsFromRoute.js'
import { getSingleRoute } from '../../usecases/routeUsecases/getSingleRoute.js'
import { isEmptyArray } from '../../utils/checkForEmptyArray.js'
import validator from 'express-validator'
const { param, validationResult } = validator

const validateReviewDeleteInRoute = async (req, res, next) => {
  const { routeId, reviewId } = req.params

  // const { id } = req.user

  try {
    const routeIdChain = param('routeId')
      .exists()
      .withMessage('Please provide a route Id.')
      .isMongoId()
      .withMessage('Please provide a valid route Id.')
      .run(req)

    const reviewIdChain = param('reviewId')
      .exists()
      .withMessage('Please provide a review Id.')
      .isMongoId()
      .withMessage('Please provide a valid review Id.')
      .run(req)

    await Promise.all([routeIdChain, reviewIdChain])

    const result = validationResult(req)

    if (!result.isEmpty()) {
      next(
        ApiError.badRequest({ message: 'Bad Request', errors: result.array() })
      )
      return
    }

    const routeExists = await getSingleRoute(routeId)

    if (!routeExists) {
      next(ApiError.badRequest('Route not found.'))
      return
    }

    const reviewExists = await getAllReviewsFromRoute({
      _id: reviewId,
    })

    if (isEmptyArray(reviewExists)) {
      next(ApiError.badRequest('Review not found'))
      return
    }
    next()
  } catch (err) {
    console.error(err)
    next(ApiError.badRequest('No valid request to query a specific review.'))
  }
}

export { validateReviewDeleteInRoute }
