import { ApiError } from '../../errors/ApiError.js'
import { getAllReviewsFromRoute } from '../../usecases/reviewUsecases/getAllReviewsFromRoute.js'
import { getSingleRoute } from '../../usecases/routeUsecases/getSingleRoute.js'
import { getSingleUser } from '../../usecases/userUsecases/getSingleUser.js'
import { isEmptyArray } from '../../utils/checkForEmptyArray.js'
import validator from 'express-validator'
const { param, body, validationResult } = validator

const validateReviewUpdateInRoute = async (req, res, next) => {
  const { routeId, reviewId } = req.params
  const { userId } = req.body

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

    const commentChain = body('comment')
      .optional()
      .exists({ checkFalsy: true, checkNull: true })
      .withMessage('Please provide a valid comment update for your review.')
      .not()
      .isEmpty()
      .trim()
      .escape()
      .withMessage("Comment in your review can't be empty.")
      .run(req)

    const starsChain = body('stars')
      .optional()
      .exists({ checkNull: true, checkFalsy: true })
      .not()
      .isEmpty()
      .isFloat({ min: 1, max: 5 })
      .withMessage('Stars must be a valid number between 1 and 5.')
      .run(req)

    const userIdChain = body('userId')
      .exists()
      .withMessage('Please provide a user ID.')
      .isMongoId()
      .withMessage('Please provide a valid user ID.')
      .run(req)

    await Promise.all([
      routeIdChain,
      reviewIdChain,
      commentChain,
      starsChain,
      userIdChain,
    ])

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

    const userExists = await getSingleUser(userId)

    if (!userExists) {
      next(ApiError.badRequest('User not found.'))
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
  } catch (e) {
    console.error(e)
    next({})
  }
}

export { validateReviewUpdateInRoute }
