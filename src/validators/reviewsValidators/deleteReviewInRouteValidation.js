import { ApiError } from '../../errors/ApiError.js'
import { getAllReviewsFromRoute } from '../../usecases/reviewUsecases/getAllReviewsFromRoute.js'
import { getSingleRoute } from '../../usecases/routeUsecases/getSingleRoute.js'
import { isEmptyArray } from '../../utils/checkForEmptyArray.js'
import validator from 'express-validator'
const { param, validationResult } = validator

const validateReviewDeleteInRoute = async (req, res, next) => {
  const { routeId, reviewId } = req.params

  // const { id } = req.user

  //Validate payload equals to the user in the database they need to match.
  //Otherwise throw an error.

  // const foundUser = await getSingleUser({ _id: id })

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

    //Validate that the userId of the review is equal to the payload of the token.
    //PENDING

    const routeExists = await getSingleRoute(routeId)

    if (!routeExists) {
      next(ApiError.badRequest('Route not found.'))
      return
    }

    const reviewExists = await getAllReviewsFromRoute({
      _id: reviewId,
    })

    console.log('review in route exists?', reviewExists)

    if (isEmptyArray(reviewExists.reviews)) {
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
