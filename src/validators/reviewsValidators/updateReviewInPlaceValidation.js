import { ApiError } from '../../errors/ApiError.js'
import { getAllReviewsFromPlace } from '../../usecases/reviewUsecases/getAllReviewsFromPlace.js'
import { getSinglePlace } from '../../usecases/placeUsecases/getSinglePlace.js'
import { getSingleUser } from '../../usecases/userUsecases/getSingleUser.js'
import { isEmptyArray } from '../../utils/checkForEmptyArray.js'
import validator from 'express-validator'
const { param, body, validationResult } = validator

const validateReviewUpdateInPlace = async (req, res, next) => {
  const { placeId, reviewId } = req.params
  const { userId } = req.body

  // const { id } = req.user

  try {
    const placeIdChain = param('placeId')
      .exists()
      .withMessage('Please provide a place Id.')
      .isMongoId()
      .withMessage('Please provide a valid place Id.')
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
      placeIdChain,
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

    const placeExists = await getSinglePlace({ _id: placeId })

    if (!placeExists) {
      next(ApiError.badRequest('Place not found.'))
      return
    }

    // const foundUser = await getSingleUser({ _id: id })

    const userExists = await getSingleUser({ _id: userId })

    if (!userExists) {
      next(ApiError.badRequest('User not found.'))
      return
    }

    const reviewExists = await getAllReviewsFromPlace({
      _id: reviewId,
    })

    if (isEmptyArray(reviewExists.reviews)) {
      next(ApiError.badRequest('Review not found'))
      return
    }

    next()
  } catch (e) {
    console.error(e)
    next({})
  }
}

export { validateReviewUpdateInPlace }
