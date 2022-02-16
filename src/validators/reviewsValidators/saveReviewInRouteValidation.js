import { ApiError } from '../../errors/ApiError.js'
import validator from 'express-validator'
const { param, body, validationResult } = validator
import { isEmptyArray } from '../../utils/checkForEmptyArray.js'
import { getSingleRoute } from '../../usecases/routeUsecases/getSingleRoute.js'
import { getSingleUser } from '../../usecases/userUsecases/getSingleUser.js'
import { getAllReviewsFromRoute } from '../../usecases/reviewUsecases/getAllReviewsFromRoute.js'

const validateSaveReviewInRoute = async (req, res, next) => {
  try {
    const { routeId } = req.params
    const review = req.body
    const { userId } = review

    // const { id } = req.user

    //Validate payload equals to the user in the database they need to match.
    //Otherwise throw an error.

    // const foundUser = await getSingleUser({ _id: id })

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
      .escape()
      .withMessage("Comment in the review can't be empty.")
      .run(req)

    const starsChain = body('stars')
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

    await Promise.all([routeIdChain, commentChain, starsChain, userIdChain])

    const result = validationResult(req)

    if (!result.isEmpty()) {
      next(
        ApiError.badRequest({ message: 'Bad Request', errors: result.array() })
      )
      return
    }

    const routeExists = await getSingleRoute({ _id: routeId })

    if (isEmptyArray(routeExists)) {
      next(ApiError.badRequest('Route not found.'))
      return
    }

    // const foundUser = await getSingleUser({ _id: id })

    const userExists = await getSingleUser({ _id: userId })

    if (!userExists) {
      next(ApiError.badRequest('User not found.'))
      return
    }

    const reviewExists = await getAllReviewsFromRoute({
      userId: userId,
      routeId: routeId,
    })

    console.log('What is all reviews returning?', reviewExists)

    if (!isEmptyArray(reviewExists.reviews)) {
      next(ApiError.badRequest('You can only post one review per route.'))
      return
    }

    next()
  } catch (e) {
    console.error(e)
    next({})
  }
}

export { validateSaveReviewInRoute }
