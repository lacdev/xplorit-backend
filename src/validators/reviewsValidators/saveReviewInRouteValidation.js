import { ApiError } from '../../errors/ApiError.js'
import validator from 'express-validator'
const { param, body, validationResult } = validator
import { isEmptyArray } from '../../utils/checkForEmptyArray.js'
import { getSingleRoute } from '../../usecases/routeUsecases/getSingleRoute.js'
import { getSingleUser } from '../../usecases/userUsecases/getSingleUser.js'
import { getAllReviewsFromRoute } from '../../usecases/reviewUsecases/getAllReviewsFromRoute.js'
import { sanitizeInput } from '../../utils/inputSanitizer.js'

const validateSaveReviewInRoute = async (req, res, next) => {
  try {
    const { routeId } = req.params

    const { id } = req.user

    const userExists = await getSingleUser({ _id: id })

    if (!userExists) {
      next(ApiError.badRequest('User not found.'))
      return
    }

    const routeIdChain = param('routeId')
      .exists()
      .withMessage('Please provide a route ID.')
      .isMongoId()
      .withMessage('Please provide a valid route ID.')
      .run(req)

    const commentChain = body('comment')
      .exists({ checkFalsy: true, checkNull: true })
      .withMessage('Please provide a comment for your review.')
      .not()
      .isEmpty()
      .trim()
      .withMessage("Comment in the review can't be empty.")
      .run(req)

    const starsChain = body('stars')
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

    await Promise.all([routeIdChain, commentChain, starsChain])

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
      userId: id,
      routeId: routeId,
    })

    if (!isEmptyArray(reviewExists.reviews)) {
      next(ApiError.badRequest('You can only post one review per route.'))
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

export { validateSaveReviewInRoute }
