import { ApiError } from '../../errors/ApiError.js'
import { getAllReviewsFromRoute } from '../../usecases/reviewUsecases/getAllReviewsFromRoute.js'
import { getSingleRoute } from '../../usecases/routeUsecases/getSingleRoute.js'
import { getSingleUser } from '../../usecases/userUsecases/getSingleUser.js'
import { isEmptyArray } from '../../utils/checkForEmptyArray.js'
import { sanitizeInput } from '../../utils/inputSanitizer.js'
import validator from 'express-validator'
const { param, body, validationResult } = validator

const validateReviewUpdateInRoute = async (req, res, next) => {
  const { routeId, reviewId } = req.params

  const { id } = req.user

  const userExists = await getSingleUser({ _id: id })

  if (!userExists) {
    next(ApiError.badRequest('User not found.'))
    return
  }

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

    // const userIdChain = body('userId')
    //   .exists()
    //   .withMessage('Please provide a user ID.')
    //   .isMongoId()
    //   .withMessage('Please provide a valid user ID.')
    //   .run(req)

    await Promise.all([routeIdChain, reviewIdChain, commentChain, starsChain])

    const result = validationResult(req)

    if (!result.isEmpty()) {
      next(
        ApiError.badRequest({ message: 'Bad Request', errors: result.array() })
      )
      return
    }

    const routeExists = await getSingleRoute({ _id: routeId })

    if (!routeExists) {
      next(ApiError.badRequest('Route not found.'))
      return
    }

    const reviewExists = await getAllReviewsFromRoute({
      _id: reviewId,
    })

    if (isEmptyArray(reviewExists.reviews)) {
      next(ApiError.badRequest('Review not found'))
      return
    }

    const sanitizedComment = sanitizeInput(req.body?.comment)

    req.body.comment = sanitizedComment
    req.body.userId = id
    req.body.routeId = routeId

    next()
  } catch (e) {
    console.error(e)
    next({})
  }
}

export { validateReviewUpdateInRoute }
