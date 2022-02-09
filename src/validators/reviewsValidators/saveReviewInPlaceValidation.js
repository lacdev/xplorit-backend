import { ApiError } from '../../errors/ApiError.js'
import validator from 'express-validator'
const { param, body, validationResult } = validator
import { isEmptyArray } from '../../utils/checkForEmptyArray.js'
import { getSinglePlace } from '../../usecases/placeUsecases/getSinglePlace.js'
import { getSingleUser } from '../../usecases/userUsecases/getSingleUser.js'
import { getAllReviewsFromPlace } from '../../usecases/reviewUsecases/getAllReviewsFromPlace.js'

const validateSaveReviewInPlace = async (req, res, next) => {
  try {
    const { placeId } = req.params
    const review = req.body
    const { userId } = review

    const placeIdChain = param('placeId')
      .exists()
      .withMessage('Please provide a place ID.')
      .isMongoId()
      .withMessage('Please provide a valid place ID.')
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

    await Promise.all([placeIdChain, commentChain, starsChain, userIdChain])

    const result = validationResult(req)

    if (!result.isEmpty()) {
      next(
        ApiError.badRequest({ message: 'Bad Request', errors: result.array() })
      )
      return
    }

    const placeExists = await getSinglePlace({ _id: placeId })

    if (isEmptyArray(placeExists)) {
      next(ApiError.badRequest('Place not found.'))
      return
    }

    const userExists = await getSingleUser(userId)

    if (isEmptyArray(userExists)) {
      next(ApiError.badRequest('User not found.'))
      return
    }

    const reviewExists = await getAllReviewsFromPlace({
      userId: userId,
      placeId: placeId,
    })

    if (!isEmptyArray(reviewExists)) {
      next(ApiError.badRequest('You can only post one review per place.'))
      return
    }

    next()
  } catch (e) {
    console.error(e)
    next({})
  }
}

export { validateSaveReviewInPlace }
