import { ApiError } from '../../errors/ApiError.js'
import validator from 'express-validator'
import { isEmptyArray } from '../../utils/checkForEmptyArray.js'
import { getLikesFromPlace } from '../../usecases/likeUsecases/getLikesFromPlace.js'
import { getSinglePlace } from '../../usecases/placeUsecases/getSinglePlace.js'
import { getSingleUser } from '../../usecases/userUsecases/getSingleUser.js'

const { body, param, validationResult } = validator

const validateLikeDeletionInPlace = async (req, res, next) => {
  try {
    const { placeId } = req.params
    const { userId } = req.body

    // const { id } = req.user

    const placeIdChain = param('placeId')
      .exists()
      .withMessage('Please provide a place ID.')
      .isMongoId()
      .withMessage('Please provide a valid place ID.')
      .run(req)

    const userIdChain = body('userId')
      .exists()
      .withMessage('Please provide a user ID.')
      .isMongoId()
      .withMessage('Please provide a valid user ID.')
      .run(req)

    await Promise.all([placeIdChain, userIdChain])

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

    const userExists = await getSingleUser({
      _id: userId,
    })

    if (!userExists) {
      next(ApiError.badRequest('User not found.'))
      return
    }

    const totalLikesInPlace = await getLikesFromPlace({
      placeId: placeId,
      userId: userId,
    })

    console.log('What is this returning likes?', totalLikesInPlace)

    if (isEmptyArray(totalLikesInPlace)) {
      next(ApiError.badRequest('No like found to delete.'))
      return
    }

    next()
  } catch (err) {
    console.error(err)
    next(ApiError.badRequest(err))
  }
}

export { validateLikeDeletionInPlace }
